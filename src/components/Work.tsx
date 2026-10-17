import "./styles/Work.css";
import WorkImage from "./WorkImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";
import { config } from "../config";

gsap.registerPlugin(ScrollTrigger);

const Work = () => {
  useEffect(() => {
    // Disable pinning on mobile to allow natural vertical scrolling
    if (window.innerWidth <= 768) return;

    const container = document.querySelector(".work-container") as HTMLElement;
    const workFlex = document.querySelector(".work-flex") as HTMLElement;
    if (!container || !workFlex) return;

    const getTranslateX = () => {
      const maxScroll = workFlex.scrollWidth - container.clientWidth;
      return Math.max(0, maxScroll);
    };

    let translateX = getTranslateX();
    if (translateX <= 20) {
      // If items fit without horizontal scrolling, do not lock scroll with a zero-distance pin
      return;
    }

    let timeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".work-section",
        start: "top top",
        end: () => `+=${getTranslateX()}`,
        scrub: 1,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        id: "work",
        invalidateOnRefresh: true,
      },
    });

    timeline.to(".work-flex", {
      x: () => -getTranslateX(),
      ease: "none",
    });

    // Handle resize
    const handleResize = () => {
      ScrollTrigger.refresh();
      if ((window as any).lenis) {
        (window as any).lenis.resize();
      }
    };
    window.addEventListener("resize", handleResize);

    // Refresh after DOM layout and image rendering settle
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
      if ((window as any).lenis) {
        (window as any).lenis.resize();
      }
    }, 300);

    // Clean up
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", handleResize);
      timeline.kill();
      ScrollTrigger.getById("work")?.kill();
    };
  }, []);

  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          Featured <span>Projects</span>
        </h2>
        <div className="work-flex">
          {config.projects.map((project, index) => {
            const demoUrl = project.link || project.liveDemo;
            return (
              <div className="work-box" key={project.id}>
                <div className="work-info">
                  <div className="work-title">
                    <h3>0{index + 1}</h3>

                    <div>
                      <h4>
                        {demoUrl ? (
                          <a
                            href={demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ color: "inherit", textDecoration: "none" }}
                            data-cursor="disable"
                          >
                            {project.title}
                          </a>
                        ) : project.github ? (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ color: "inherit", textDecoration: "none" }}
                            data-cursor="disable"
                          >
                            {project.title}
                          </a>
                        ) : (
                          project.title
                        )}
                      </h4>
                      <p>{project.category}</p>
                    </div>
                  </div>
                  <p
                    style={{
                      fontSize: "13px",
                      lineHeight: "1.6",
                      color: "var(--textSecondary)",
                      marginBottom: "12px",
                    }}
                  >
                    {project.description}
                  </p>
                  <h4>Tools & Features</h4>
                  <p>{project.technologies}</p>
                  <div
                    style={{
                      display: "flex",
                      gap: "10px",
                      marginTop: "16px",
                      flexWrap: "wrap",
                    }}
                  >
                    {demoUrl && (
                      <a
                        href={demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-cursor="disable"
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "6px",
                          padding: "6px 14px",
                          fontSize: "12px",
                          fontWeight: 600,
                          backgroundColor: "var(--accentColor)",
                          color: "#050816",
                          borderRadius: "6px",
                          textDecoration: "none",
                        }}
                      >
                        Live Demo ↗
                      </a>
                    )}
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-cursor="disable"
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "6px",
                          padding: "6px 14px",
                          fontSize: "12px",
                          fontWeight: 500,
                          backgroundColor: "rgba(11, 21, 51, 0.7)",
                          color: "#F4F7FF",
                          border: "1px solid rgba(37, 99, 255, 0.35)",
                          borderRadius: "6px",
                          textDecoration: "none",
                        }}
                      >
                        GitHub ↗
                      </a>
                    )}
                  </div>
                </div>
                <WorkImage
                  image={project.image}
                  alt={project.title}
                  link={demoUrl || project.github}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Work;
