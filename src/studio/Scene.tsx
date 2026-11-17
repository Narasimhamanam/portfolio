import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader, DRACOLoader } from 'three-stdlib';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { decryptFile } from '../components/Character/utils/decrypt';
type Props={paused:boolean;onReady:()=>void;onError:()=>void};
function disposeObject(object:THREE.Object3D){const textures=new Set<THREE.Texture>();object.traverse(obj=>{if(!(obj instanceof THREE.Mesh))return;obj.geometry.dispose();const materials:THREE.Material[]=Array.isArray(obj.material)?obj.material:[obj.material];materials.forEach(m=>{Object.values(m).forEach(v=>{if(v instanceof THREE.Texture)textures.add(v)});m.dispose()})});textures.forEach(t=>t.dispose())}
export default function Scene({paused,onReady,onError}:Props){
 const host=useRef<HTMLDivElement>(null),pause=useRef(paused);
 useEffect(()=>{pause.current=paused},[paused]);
 useEffect(()=>{
  const el=host.current;if(!el)return;
  let disposed=false,frame=0,visible=true,dirty=true,model:THREE.Group|undefined,mixer:THREE.AnimationMixer|undefined;
  let renderer:THREE.WebGLRenderer;
  try{renderer=new THREE.WebGLRenderer({alpha:true,antialias:true,powerPreference:'low-power'})}catch{onError();return}
  renderer.setPixelRatio(Math.min(devicePixelRatio,innerWidth<768?1.3:1.7));renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.1;el.appendChild(renderer.domElement);
  const scene=new THREE.Scene(),camera=new THREE.PerspectiveCamera(33,1,.1,250),target=new THREE.Vector3(0,9.1,0);camera.position.set(15,15,30);camera.lookAt(target);
  const environment=new RoomEnvironment(),pmrem=new THREE.PMREMGenerator(renderer),env=pmrem.fromScene(environment,.04);scene.environment=env.texture;scene.environmentIntensity=.8;environment.dispose();pmrem.dispose();
  const key=new THREE.DirectionalLight('#fff5e5',3.1);key.position.set(8,20,10);scene.add(key);const fill=new THREE.DirectionalLight('#c4d6e6',1.8);fill.position.set(-12,12,2);scene.add(fill);scene.add(new THREE.AmbientLight('#ffffff',.65));
  const loader=new GLTFLoader(),draco=new DRACOLoader();draco.setDecoderPath('/draco/');draco.setDecoderConfig({type:'js'});loader.setDRACOLoader(draco);
  const mouse={x:0,y:0},clock=new THREE.Clock();let scroll=0;
  const resize=()=>{const {width,height}=el.getBoundingClientRect();if(!width||!height)return;renderer.setSize(width,height);camera.aspect=width/height;camera.updateProjectionMatrix();dirty=true};
  const ro=new ResizeObserver(resize);ro.observe(el);resize();
  const pointer=(e:PointerEvent)=>{if(e.pointerType!=='mouse')return;const r=el.getBoundingClientRect();mouse.x=(e.clientX-r.left)/r.width-.5;mouse.y=(e.clientY-r.top)/r.height-.5};
  const leave=()=>{mouse.x=0;mouse.y=0};const scrolling=()=>{scroll=Math.min(window.scrollY/innerHeight,1)};
  el.addEventListener('pointermove',pointer);el.addEventListener('pointerleave',leave);window.addEventListener('scroll',scrolling,{passive:true});
  const io=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;dirty=true});io.observe(el);
  const lost=(e:Event)=>{e.preventDefault();onError()};renderer.domElement.addEventListener('webglcontextlost',lost);
  decryptFile('/models/character.enc','Character3D#@').then(b=>loader.parseAsync(b,'/models/')).then(gltf=>{
   if(disposed){disposeObject(gltf.scene);return}model=gltf.scene;
   model.traverse(obj=>{if(!(obj instanceof THREE.Mesh))return;obj.frustumCulled=false;const mats=Array.isArray(obj.material)?obj.material:[obj.material];mats.forEach(m=>{if(m instanceof THREE.MeshStandardMaterial){m.envMapIntensity=.65;if(m.emissiveIntensity>0){m.emissive.set('#a5b7c8');m.emissiveIntensity=.12}}})});
   for(const name of ['ground','screenlight']){const o=model.getObjectByName(name);if(o)o.visible=false}
   mixer=new THREE.AnimationMixer(model);for(const name of ['typing','Blink']){const clip=THREE.AnimationClip.findByName(gltf.animations,name);if(clip)mixer.clipAction(clip).play()}
   scene.add(model);renderer.render(scene,camera);dirty=true;onReady();
  }).catch(()=>{if(!disposed)onError()});
  let last=0;
  const animate=(time:number)=>{frame=requestAnimationFrame(animate);const delta=Math.min(clock.getDelta(),.05);if(!visible||document.hidden||time-last<(innerWidth<768?32:16)||(pause.current&&!dirty))return;last=time;dirty=false;if(!pause.current){mixer?.update(delta);camera.position.x=THREE.MathUtils.lerp(camera.position.x,15+mouse.x*4-scroll*4,.04);camera.position.y=THREE.MathUtils.lerp(camera.position.y,15-mouse.y*2+scroll,.04);camera.lookAt(target)}renderer.render(scene,camera)};frame=requestAnimationFrame(animate);
  return()=>{disposed=true;cancelAnimationFrame(frame);ro.disconnect();io.disconnect();el.removeEventListener('pointermove',pointer);el.removeEventListener('pointerleave',leave);window.removeEventListener('scroll',scrolling);renderer.domElement.removeEventListener('webglcontextlost',lost);mixer?.stopAllAction();if(model){mixer?.uncacheRoot(model);disposeObject(model)}env.dispose();draco.dispose();renderer.dispose();renderer.domElement.remove()};
 },[onReady,onError]);
 return <div ref={host} className="scene-canvas" aria-hidden="true"/>;
}
