import {test,expect} from '@playwright/test';
test('portfolio loads, stays within the viewport, and project dialog works',async({page},info)=>{
 const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('/');await expect(page.getByRole('heading',{level:1})).toContainText('Thoughtful code.');
 await page.waitForTimeout(1800);
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBeTruthy();
 await page.screenshot({path:`test-results/${info.project.name}-hero.png`});
 await page.getByRole('button',{name:'Read Simha AI case study'}).click();
 await expect(page.getByRole('dialog')).toBeVisible();await expect(page.getByRole('dialog').getByRole('link',{name:/View source/})).toHaveAttribute('href','https://github.com/Narasimhamanam/Simha-AI');
 await page.getByRole('button',{name:'Close project'}).click();await expect(page.getByRole('dialog')).not.toBeVisible();
 await page.getByRole('link',{name:'Say hello'}).scrollIntoViewIfNeeded();
 await expect(page.getByRole('link',{name:'Say hello'})).toHaveAttribute('href',/^mailto:/);
 expect(errors).toEqual([]);
});
test('mobile navigation and reduced motion remain usable',async({page},info)=>{
 await page.emulateMedia({reducedMotion:'reduce'});await page.goto('/');
 if(info.project.name==='mobile'){await page.getByRole('button',{name:'Open menu'}).click();await page.getByRole('link',{name:'Selected work',exact:true}).click();await expect(page.getByRole('button',{name:'Open menu'})).toHaveAttribute('aria-expanded','false')}
 await page.getByRole('button',{name:'Read ADAM-1 Enhanced case study'}).click();await expect(page.getByRole('dialog')).toBeVisible();await page.keyboard.press('Escape');await expect(page.getByRole('dialog')).not.toBeVisible();
});
test('chess supports legal moves, opponent, undo, reset and direct routes',async({page},info)=>{
 await page.goto('/play');await expect(page.getByRole('heading',{level:1})).toContainText('chess room');
 await page.getByRole('button',{name:'e2, white pawn',exact:true}).click();await page.getByRole('button',{name:'e4, empty',exact:true}).click();
 await expect(page.getByRole('status')).toContainText('Your move');await expect(page.getByLabel('Move history')).toContainText('e4');
 await page.getByRole('button',{name:'Undo turn'}).click();await expect(page.getByRole('button',{name:'e2, white pawn',exact:true})).toBeVisible();
 await page.getByRole('button',{name:'Flip board'}).click();await page.getByRole('button',{name:'New game'}).click();expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBeTruthy();
 await page.screenshot({path:`test-results/${info.project.name}-chess.png`});
 await page.goto('/myworks');await expect(page.getByRole('heading',{name:'Ideas made real.'})).toBeVisible();
});

test('essential public assets are real files',async({request})=>{
 for(const [path,type] of [['/portrait.jpeg','image/'],['/projects/simha-ai-1.jpg','image/'],['/models/character.enc','application/octet-stream'],['/draco/draco_decoder.js','javascript']]){const response=await request.get(path);expect(response.ok()).toBeTruthy();expect(response.headers()['content-type']).toContain(type)}
});
