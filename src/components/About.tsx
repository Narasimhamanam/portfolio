import "./styles/About.css";
import { config } from "../config";

const About = () => {
  return (
    <div className="about-section" id="about">
      <div className="about-me">
        <h3 className="title">{config.about.title}</h3>
        <p className="para">
          {config.about.description}
        </p>

        {/* Verified Education & Academic Highlights */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "12px",
            marginTop: "24px",
          }}
        >
          <div
            style={{
              background: "rgba(11, 21, 51, 0.55)",
              border: "1px solid rgba(37, 99, 255, 0.25)",
              borderRadius: "10px",
              padding: "12px 16px",
            }}
          >
            <div style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "1px", color: "var(--cyanHighlight)", fontWeight: 600 }}>
              Undergraduate Degree
            </div>
            <div style={{ color: "#F4F7FF", fontSize: "13px", fontWeight: 500, marginTop: "4px" }}>
              B.Tech in CSE (2023 – Present)
            </div>
            <div style={{ color: "var(--textSecondary)", fontSize: "12px" }}>
              R.V.R & J.C College of Engineering • CGPA: 9.41
            </div>
          </div>

          <div
            style={{
              background: "rgba(11, 21, 51, 0.55)",
              border: "1px solid rgba(37, 99, 255, 0.25)",
              borderRadius: "10px",
              padding: "12px 16px",
            }}
          >
            <div style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "1px", color: "var(--cyanHighlight)", fontWeight: 600 }}>
              Intermediate Education
            </div>
            <div style={{ color: "#F4F7FF", fontSize: "13px", fontWeight: 500, marginTop: "4px" }}>
              MPC (2021 – 2023)
            </div>
            <div style={{ color: "var(--textSecondary)", fontSize: "12px" }}>
              Sri Saraswathi Junior College • 97.2%
            </div>
          </div>
        </div>

        {/* Focus Areas */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "8px",
            marginTop: "18px",
          }}
        >
          {["MERN Stack", "Generative AI", "RAG Pipelines", "Machine Learning", "Streamlit"].map((skill) => (
            <span
              key={skill}
              style={{
                fontSize: "12px",
                padding: "4px 12px",
                background: "rgba(34, 211, 238, 0.08)",
                border: "1px solid rgba(34, 211, 238, 0.25)",
                borderRadius: "14px",
                color: "var(--cyanHighlight)",
                fontWeight: 500,
              }}
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
