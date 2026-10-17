import "./styles/Career.css";
import { config } from "../config";
import { FaCertificate, FaUsers } from "react-icons/fa6";

const getDisplayYear = (period: string) => {
  if (period.includes("Present")) return "Present";
  if (period.includes("2026")) return "2026";
  if (period.includes("2025")) return "2025";
  if (period.includes("2023")) return "2023";
  if (period.includes("2021")) return "2021";
  return period;
};

const Career = () => {
  return (
    <div className="career-section section-container" id="career">
      <div className="career-container">
        <h2>
          Education <span>&</span>
          <br /> Journey
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          {config.experiences.map((exp, index) => (
            <div key={index} className="career-info-box">
              <div className="career-info-in">
                <div className="career-role">
                  <h4>{exp.position}</h4>
                  <h5>{exp.company}</h5>
                </div>
                <h3>{getDisplayYear(exp.period)}</h3>
              </div>
              <p>{exp.description}</p>
            </div>
          ))}
        </div>

        {/* Certifications & Activities Grid */}
        <div
          className="career-extras"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
            gap: "24px",
            marginTop: "60px",
            width: "100%",
            maxWidth: "1100px",
          }}
        >
          {/* Certifications Card */}
          <div
            style={{
              background: "rgba(11, 21, 51, 0.45)",
              border: "1px solid rgba(37, 99, 255, 0.25)",
              borderRadius: "14px",
              padding: "24px 28px",
              backdropFilter: "blur(12px)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                color: "var(--cyanHighlight)",
                fontSize: "18px",
                fontWeight: 600,
                marginBottom: "16px",
              }}
            >
              <FaCertificate /> Certifications
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              {config.certifications.map((cert, idx) => (
                <div key={idx} style={{ borderLeft: "2px solid rgba(34, 211, 238, 0.4)", paddingLeft: "12px" }}>
                  <div style={{ color: "#F4F7FF", fontSize: "14px", fontWeight: 500 }}>
                    {cert.title}
                  </div>
                  <div style={{ color: "var(--textSecondary)", fontSize: "12px", marginTop: "2px" }}>
                    Issuer: {cert.issuer}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Activities Card */}
          <div
            style={{
              background: "rgba(11, 21, 51, 0.45)",
              border: "1px solid rgba(37, 99, 255, 0.25)",
              borderRadius: "14px",
              padding: "24px 28px",
              backdropFilter: "blur(12px)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                color: "var(--cyanHighlight)",
                fontSize: "18px",
                fontWeight: 600,
                marginBottom: "16px",
              }}
            >
              <FaUsers /> Activities & Leadership
            </div>
            <ul style={{ margin: 0, paddingLeft: "18px", display: "flex", flexDirection: "column", gap: "10px" }}>
              {config.activities.map((act, idx) => (
                <li key={idx} style={{ color: "var(--textSecondary)", fontSize: "13px", lineHeight: "1.6" }}>
                  {act}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
