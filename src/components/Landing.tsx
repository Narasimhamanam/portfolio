import { PropsWithChildren } from "react";
import "./styles/Landing.css";
import { config } from "../config";
import { MdArrowOutward } from "react-icons/md";
import { FaLinkedinIn } from "react-icons/fa6";

const Landing = ({ children }: PropsWithChildren) => {
  const nameParts = config.developer.fullName.split(" ");
  const firstName = nameParts[0] || config.developer.name;
  const lastName = nameParts.slice(1).join(" ") || "";

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    const target = document.querySelector(targetId) as HTMLElement;
    if (!target) return;
    e.preventDefault();
    try {
      const lenisInstance = (window as any).lenis;
      if (lenisInstance && typeof lenisInstance.scrollTo === "function") {
        lenisInstance.scrollTo(target, { offset: 0, duration: 1.2 });
      } else {
        target.scrollIntoView({ behavior: "smooth" });
      }
    } catch {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <div className="landing-section" id="landingDiv">
        <div className="landing-container">
          <div className="landing-intro">
            <h2>Building Intelligent Digital Experiences</h2>
            <h1>
              {firstName.toUpperCase()}
              {' '}
              <br />
              {lastName && <span>{lastName.toUpperCase()}</span>}
            </h1>
            <p
              className="landing-bio"
              style={{
                fontSize: "14px",
                lineHeight: "1.6",
                color: "var(--textSecondary)",
                maxWidth: "520px",
                marginTop: "14px",
                fontWeight: 400,
              }}
            >
              {config.developer.description}
            </p>
            <div
              className="landing-actions"
              style={{
                display: "flex",
                gap: "12px",
                marginTop: "20px",
                flexWrap: "wrap",
                alignItems: "center",
                position: "relative",
                zIndex: 60,
              }}
            >
              <a
                href="#work"
                onClick={(e) => handleScrollTo(e, "#work")}
                className="landing-btn-primary"
                data-cursor="disable"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "10px 22px",
                  fontSize: "14px",
                  fontWeight: 600,
                  backgroundColor: "var(--accentColor)",
                  color: "#050816",
                  borderRadius: "6px",
                  transition: "all 0.3s ease",
                  textDecoration: "none",
                  cursor: "pointer",
                  pointerEvents: "auto",
                }}
              >
                View My Work <MdArrowOutward />
              </a>
              <a
                href="#contact"
                onClick={(e) => handleScrollTo(e, "#contact")}
                className="landing-btn-secondary"
                data-cursor="disable"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "10px 20px",
                  fontSize: "14px",
                  fontWeight: 500,
                  backgroundColor: "rgba(11, 21, 51, 0.6)",
                  color: "#F4F7FF",
                  border: "1px solid rgba(37, 99, 255, 0.35)",
                  borderRadius: "6px",
                  transition: "all 0.3s ease",
                  textDecoration: "none",
                  cursor: "pointer",
                  pointerEvents: "auto",
                }}
              >
                Contact Me
              </a>
              <a
                href={config.developer.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="landing-btn-resume"
                data-cursor="disable"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "10px 20px",
                  fontSize: "14px",
                  fontWeight: 600,
                  backgroundColor: "rgba(34, 211, 238, 0.12)",
                  color: "var(--cyanHighlight)",
                  border: "1px solid rgba(34, 211, 238, 0.35)",
                  borderRadius: "6px",
                  transition: "all 0.3s ease",
                  textDecoration: "none",
                  cursor: "pointer",
                  pointerEvents: "auto",
                }}
              >
                Resume <MdArrowOutward />
              </a>
              <a
                href={config.contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="disable"
                title="LinkedIn Profile"
                style={{
                  color: "var(--textSecondary)",
                  fontSize: "20px",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "8px",
                  transition: "color 0.2s, transform 0.2s",
                  cursor: "pointer",
                  pointerEvents: "auto",
                }}
              >
                <FaLinkedinIn />
              </a>
            </div>
          </div>
          <div className="landing-info">
            <h3>Specialization</h3>
            <h2 className="landing-info-h2">Generative AI Engineer</h2>
            <h2>
              <span className="landing-h2-info">Full-Stack Developer</span>
            </h2>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "8px",
                marginTop: "16px",
              }}
            >
              {["MERN Stack", "RAG Pipelines", "LLMs", "FastAPI", "Python"].map(
                (tag) => (
                  <span
                    key={tag}
                    style={{
                      fontSize: "12px",
                      padding: "4px 10px",
                      background: "rgba(37, 99, 255, 0.15)",
                      border: "1px solid rgba(37, 99, 255, 0.3)",
                      borderRadius: "12px",
                      color: "rgba(244, 247, 255, 0.85)",
                      fontWeight: 500,
                    }}
                  >
                    {tag}
                  </span>
                )
              )}
            </div>
          </div>
          {/* Mobile photo - shows only on mobile when 3D character is hidden */}
          <div className="mobile-photo">
            <img
              src="/portrait.jpeg"
              alt={config.developer.fullName}
              style={{
                borderRadius: "16px",
                border: "1px solid rgba(37, 99, 255, 0.3)",
                boxShadow: "0 10px 30px rgba(5, 8, 22, 0.8)",
              }}
            />
          </div>
        </div>
        {children}
      </div>
    </>
  );
};

export default Landing;
