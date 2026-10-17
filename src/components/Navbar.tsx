import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HoverLinks from "./HoverLinks";
import { gsap } from "gsap";
import Lenis from "lenis";
import { config } from "../config";
import "./styles/Navbar.css";

gsap.registerPlugin(ScrollTrigger);
export let lenis: Lenis | null = null;

const Navbar = () => {
  useEffect(() => {
    const isMobile = window.innerWidth <= 768;
    // Keep touch scrolling native and responsive; use gentle smoothing only
    // for mouse/wheel input on larger screens.
    lenis = new Lenis({
      duration: isMobile ? 0.35 : 1.05,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: !isMobile,
      wheelMultiplier: isMobile ? 1 : 1.7,
      touchMultiplier: isMobile ? 1 : 1.4,
      syncTouch: false,
      infinite: false,
    });

    lenis.on("scroll", ScrollTrigger.update);
    (window as any).lenis = lenis;

    // Drive Lenis via GSAP's synchronized ticker
    const tickerCallback = (time: number) => {
      lenis?.raf(time * 1000);
    };
    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    // Keep Lenis scroll limit in sync with ScrollTrigger pin spacer dimensions
    const refreshCallback = () => {
      lenis?.resize();
    };
    ScrollTrigger.addEventListener("refresh", refreshCallback);

    // Handle navigation links
    let links = document.querySelectorAll(".header ul a");
    links.forEach((elem) => {
      let element = elem as HTMLAnchorElement;
      element.addEventListener("click", (e) => {
        if (window.innerWidth > 1024) {
          e.preventDefault();
          let elem = e.currentTarget as HTMLAnchorElement;
          let section = elem.getAttribute("data-href");
          if (section && lenis) {
            const target = document.querySelector(section) as HTMLElement;
            if (target) {
              lenis.scrollTo(target, {
                offset: 0,
                duration: 1.2,
              });
            }
          }
        }
      });
    });

    // Handle resize
    const resizeCallback = () => {
      lenis?.resize();
    };
    window.addEventListener("resize", resizeCallback);

    return () => {
      gsap.ticker.remove(tickerCallback);
      ScrollTrigger.removeEventListener("refresh", refreshCallback);
      window.removeEventListener("resize", resizeCallback);
      lenis?.destroy();
    };
  }, []);
  return (
    <>
      <div className="header">
        <a href="/#" className="navbar-title" data-cursor="disable">
          {config.developer.monogram}
        </a>
        <a
          href={`mailto:${config.contact.email}`}
          className="navbar-connect"
          data-cursor="disable"
        >
          Portfolio
        </a>
        <ul>
          <li>
            <a data-href="#about" href="#about">
              <HoverLinks text="ABOUT" />
            </a>
          </li>
          <li>
            <a data-href="#work" href="#work">
              <HoverLinks text="WORK" />
            </a>
          </li>
          <li>
            <a data-href="#contact" href="#contact">
              <HoverLinks text="CONTACT" />
            </a>
          </li>
          <li>
            <a
              href={config.developer.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="disable"
            >
              <HoverLinks text="RESUME" />
            </a>
          </li>
        </ul>
      </div>

      <div className="landing-circle1"></div>
      <div className="landing-circle2"></div>
      <div className="nav-fade"></div>
    </>
  );
};

export default Navbar;
