import { Link } from "react-router-dom";
import { config } from "../config";
import "./MyWorks.css";
import { MdArrowOutward } from "react-icons/md";
import { FaGithub } from "react-icons/fa6";

const MyWorks = () => {
  return (
    <div className="myworks-page">
      <div className="myworks-header">
        <Link to="/" className="back-button" data-cursor="disable">
          ← Back to Portfolio
        </Link>
        <h1>
          Featured <span>Works</span>
        </h1>
        <p>A curated collection of full-stack applications, generative AI systems, and machine learning platforms</p>
      </div>

      <div className="myworks-grid">
        {config.projects.map((project, index) => (
          <div className="myworks-card" key={project.id} data-cursor="disable">
            <div className="myworks-card-number">0{index + 1}</div>
            <div className="myworks-card-image">
              <img src={project.image} alt={project.title} />
            </div>
            <div className="myworks-card-info">
              <h3>{project.title}</h3>
              <p className="myworks-card-category">{project.category}</p>
              <p className="myworks-card-description">{project.description}</p>
              
              {project.capabilities && project.capabilities.length > 0 && (
                <div style={{ marginBottom: "16px" }}>
                  <div style={{ fontSize: "12px", textTransform: "uppercase", letterSpacing: "1px", color: "var(--cyanHighlight)", marginBottom: "6px", fontWeight: 600 }}>Key Capabilities</div>
                  <ul style={{ margin: 0, paddingLeft: "18px", fontSize: "13px", color: "var(--textSecondary)", lineHeight: "1.6" }}>
                    {project.capabilities.slice(0, 4).map((cap, i) => (
                      <li key={i}>{cap}</li>
                    ))}
                  </ul>
                </div>
              )}

              <p className="myworks-card-tech">
                <strong style={{ color: "#F4F7FF" }}>Stack:</strong> {project.technologies}
              </p>

              <div style={{ display: "flex", gap: "10px", marginTop: "16px", flexWrap: "wrap" }}>
                {(project.link || project.liveDemo) && (
                  <a
                    href={project.link || project.liveDemo}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="disable"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                      fontSize: "13px",
                      color: "#050816",
                      background: "var(--cyanHighlight)",
                      textDecoration: "none",
                      fontWeight: 600,
                      padding: "6px 14px",
                      borderRadius: "6px",
                    }}
                  >
                    Live Demo <MdArrowOutward />
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
                      fontSize: "13px",
                      color: "var(--cyanHighlight)",
                      textDecoration: "none",
                      fontWeight: 500,
                      padding: "6px 12px",
                      borderRadius: "6px",
                      background: "rgba(34, 211, 238, 0.1)",
                      border: "1px solid rgba(34, 211, 238, 0.25)",
                    }}
                  >
                    <FaGithub /> Repository <MdArrowOutward />
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyWorks;
