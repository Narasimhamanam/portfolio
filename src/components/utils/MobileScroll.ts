import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function setupMobileScroll() {
  if (window.innerWidth > 768) return () => undefined;
  const ctx = gsap.context(() => {
    gsap.fromTo(".mobile-photo", { y: 12, scale: 0.97 }, { y: -12, scale: 1.01, ease: "none", scrollTrigger: { trigger: ".landing-section", start: "top top", end: "bottom top", scrub: 0.35 } });
    gsap.utils.toArray<HTMLElement>(".about-section, .whatIDO, .career-section, .work-section, .techstack-new, .cta-section, .contact-section").forEach((section) => {
      gsap.fromTo(section, { opacity: 0, y: 22 }, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out", scrollTrigger: { trigger: section, start: "top 90%", end: "top 68%", scrub: 0.3 } });
    });
    gsap.fromTo(".work-box", { opacity: 0, x: 16 }, { opacity: 1, x: 0, stagger: 0.08, ease: "power2.out", scrollTrigger: { trigger: ".work-flex", start: "top 88%", end: "bottom 74%", scrub: 0.3 } });
  });
  return () => ctx.revert();
}
