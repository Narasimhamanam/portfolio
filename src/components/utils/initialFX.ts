import { TextSplitter } from "../../utils/textSplitter";
import gsap from "gsap";
import { lenis } from "../Navbar";

export function initialFX() {
  document.body.style.overflowY = "auto";
  const activeLenis = lenis || (window as any).lenis;
  if (activeLenis) {
    activeLenis.start();
    activeLenis.resize();
  }
  const mainEl = document.getElementsByTagName("main")[0];
  if (mainEl) {
    mainEl.classList.add("main-active");
  }
  gsap.to("body", {
    backgroundColor: "#050816",
    duration: 0.5,
    delay: 0.2,
  });

  const selectors = [".landing-info h3", ".landing-intro h2", ".landing-intro h1"];
  const elements = selectors.flatMap(selector => Array.from(document.querySelectorAll(selector)));
  if (elements.length > 0) {
    var landingText = new TextSplitter(elements, {
      type: "chars,lines",
      linesClass: "split-line",
    });
    if (landingText.chars && landingText.chars.length > 0) {
      gsap.fromTo(
        landingText.chars,
        { opacity: 0, y: 80, filter: "blur(5px)" },
        {
          opacity: 1,
          duration: 1.2,
          filter: "blur(0px)",
          ease: "power3.inOut",
          y: 0,
          stagger: 0.025,
          delay: 0.3,
        }
      );
    }
  }

  let TextProps = { type: "chars,lines", linesClass: "split-h2" };

  const infoEl = document.querySelector(".landing-h2-info");
  if (infoEl) {
    var landingText2 = new TextSplitter(infoEl, TextProps);
    if (landingText2.chars && landingText2.chars.length > 0) {
      gsap.fromTo(
        landingText2.chars,
        { opacity: 0, y: 80, filter: "blur(5px)" },
        {
          opacity: 1,
          duration: 1.2,
          filter: "blur(0px)",
          ease: "power3.inOut",
          y: 0,
          stagger: 0.025,
          delay: 0.3,
        }
      );
    }
  }

  const h2El = document.querySelector(".landing-info-h2");
  if (h2El) {
    gsap.fromTo(
      h2El,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        duration: 1.2,
        ease: "power1.inOut",
        y: 0,
        delay: 0.8,
      }
    );
  }

  const navElements = [".header", ".icons-section", ".nav-fade"].filter(s => !!document.querySelector(s));
  if (navElements.length > 0) {
    gsap.fromTo(
      navElements,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 1.2,
        ease: "power1.inOut",
        delay: 0.1,
      }
    );
  }
}
