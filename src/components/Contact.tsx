import { MdArrowOutward, MdCopyright, MdContentCopy, MdCheck, MdSend } from "react-icons/md";
import "./styles/Contact.css";
import { config } from "../config";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useState } from "react";

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "sent" | "error">("idle");
  const [formError, setFormError] = useState("");

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(config.contact.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setFormError("Please fill out all fields before sending.");
      return;
    }
    if (!formData.email.includes("@")) {
      setFormError("Please enter a valid email address.");
      return;
    }
    setFormError("");
    setFormStatus("submitting");

    // Seamless mailto trigger for direct email client opening with prefilled details
    const subject = encodeURIComponent(`Portfolio Inquiry from ${formData.name}`);
    const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`);
    const mailtoUrl = `mailto:${config.contact.email}?subject=${subject}&body=${body}`;

    setTimeout(() => {
      window.location.href = mailtoUrl;
      setFormStatus("sent");
      setTimeout(() => setFormStatus("idle"), 5000);
    }, 600);
  };

  useEffect(() => {
    const contactTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".contact-section",
        start: "top 80%",
        end: "bottom center",
        toggleActions: "play none none none",
      },
    });

    // Animate title from bottom
    contactTimeline.fromTo(
      ".contact-section h3",
      {
        opacity: 0,
        y: 40,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
      }
    );

    // Animate contact boxes with stagger from bottom
    contactTimeline.fromTo(
      ".contact-box",
      {
        opacity: 0,
        y: 40,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: "power3.out",
      },
      "-=0.4"
    );

    // Clean up
    return () => {
      contactTimeline.kill();
    };
  }, []);

  return (
    <div className="contact-section section-container" id="contact">
      <div className="contact-container">
        <h3>{config.developer.fullName}</h3>
        <div className="contact-flex">
          {/* Box 1: Direct Contact & Location */}
          <div className="contact-box" style={{ flex: 1 }}>
            <h4>Email</h4>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "8px", marginBottom: "15px" }}>
              <a
                href={`mailto:${config.contact.email}`}
                data-cursor="disable"
                style={{
                  color: "var(--textPrimary)",
                  fontSize: "15px",
                  textDecoration: "none",
                  fontWeight: 500,
                  transition: "color 0.2s",
                }}
              >
                {config.contact.email}
              </a>
              <button
                onClick={handleCopyEmail}
                data-cursor="disable"
                title="Copy email to clipboard"
                style={{
                  background: "rgba(37, 99, 255, 0.15)",
                  border: "1px solid rgba(34, 211, 238, 0.3)",
                  color: "var(--cyanHighlight)",
                  borderRadius: "6px",
                  padding: "4px 8px",
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "4px",
                  fontSize: "12px",
                  transition: "all 0.2s",
                }}
              >
                {copied ? <><MdCheck /> Copied</> : <><MdContentCopy /> Copy</>}
              </button>
            </div>

            <h4>Location</h4>
            <p>
              <span>{config.social.location}</span>
            </p>

            <h4>Connect</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "8px" }}>
              <a
                href={config.contact.github}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="disable"
                className="contact-social"
                style={{
                  color: "var(--textPrimary)",
                  borderBottom: "1px solid rgba(37, 99, 255, 0.3)",
                  paddingBottom: "4px",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  width: "fit-content",
                  textDecoration: "none",
                }}
              >
                GitHub <MdArrowOutward />
              </a>
              <a
                href={config.contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="disable"
                className="contact-social"
                style={{
                  color: "var(--textPrimary)",
                  borderBottom: "1px solid rgba(37, 99, 255, 0.3)",
                  paddingBottom: "4px",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  width: "fit-content",
                  textDecoration: "none",
                }}
              >
                LinkedIn <MdArrowOutward />
              </a>
              <a
                href={config.developer.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="disable"
                className="contact-social"
                style={{
                  color: "var(--cyanHighlight)",
                  borderBottom: "1px solid rgba(34, 211, 238, 0.3)",
                  paddingBottom: "4px",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  width: "fit-content",
                  textDecoration: "none",
                  fontWeight: 500,
                }}
              >
                Resume (Google Drive) <MdArrowOutward />
              </a>
            </div>
          </div>

          {/* Box 2: Interactive Contact Form */}
          <div className="contact-box" style={{ flex: 1.3, padding: "0 20px" }}>
            <h4>Send a Direct Message</h4>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "12px" }}>
              <input
                type="text"
                placeholder="Your Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                data-cursor="disable"
                style={{
                  padding: "10px 14px",
                  background: "rgba(11, 21, 51, 0.6)",
                  border: "1px solid rgba(37, 99, 255, 0.25)",
                  borderRadius: "8px",
                  color: "#F4F7FF",
                  fontSize: "14px",
                  outline: "none",
                  fontFamily: "inherit",
                }}
              />
              <input
                type="email"
                placeholder="Your Email Address"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                data-cursor="disable"
                style={{
                  padding: "10px 14px",
                  background: "rgba(11, 21, 51, 0.6)",
                  border: "1px solid rgba(37, 99, 255, 0.25)",
                  borderRadius: "8px",
                  color: "#F4F7FF",
                  fontSize: "14px",
                  outline: "none",
                  fontFamily: "inherit",
                }}
              />
              <textarea
                rows={3}
                placeholder="Your Message or Project Vision..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                data-cursor="disable"
                style={{
                  padding: "10px 14px",
                  background: "rgba(11, 21, 51, 0.6)",
                  border: "1px solid rgba(37, 99, 255, 0.25)",
                  borderRadius: "8px",
                  color: "#F4F7FF",
                  fontSize: "14px",
                  outline: "none",
                  resize: "vertical",
                  fontFamily: "inherit",
                }}
              />
              {formError && (
                <div style={{ color: "#EF4444", fontSize: "12px" }}>{formError}</div>
              )}
              {formStatus === "sent" && (
                <div style={{ color: "#22D3EE", fontSize: "12px" }}>
                  Opening your email client with your message drafted to {config.contact.email}...
                </div>
              )}
              <button
                type="submit"
                disabled={formStatus === "submitting"}
                data-cursor="disable"
                style={{
                  padding: "10px 20px",
                  background: "linear-gradient(90deg, #2563FF 0%, #22D3EE 100%)",
                  color: "#050816",
                  fontWeight: 600,
                  fontSize: "14px",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  transition: "opacity 0.2s, transform 0.2s",
                }}
              >
                {formStatus === "submitting" ? "Preparing..." : <><MdSend /> Send Message</>}
              </button>
            </form>
          </div>

          {/* Box 3: Credits & Footer Identity */}
          <div className="contact-box" style={{ flex: 1 }}>
            <h2>
              Designed and Developed <br /> by <span>{config.developer.fullName}</span>
            </h2>
            <p className="footer-quote" style={{ fontStyle: "italic", color: "var(--textSecondary)", fontSize: "13px", marginTop: "12px", lineHeight: "1.6" }}>
              "Engineering intelligent systems with architectural rigor and creative precision."
            </p>
            <div style={{ marginTop: "14px", display: "flex", gap: "16px", fontSize: "13px" }}>
              <a href="#about" style={{ color: "var(--cyanHighlight)", textDecoration: "none" }} data-cursor="disable">About</a>
              <a href="#work" style={{ color: "var(--cyanHighlight)", textDecoration: "none" }} data-cursor="disable">Projects</a>
              <a href="/#" style={{ color: "var(--cyanHighlight)", textDecoration: "none" }} data-cursor="disable">Top ↑</a>
            </div>
            <h5 style={{ marginTop: "20px" }}>
              <MdCopyright /> {new Date().getFullYear()} {config.developer.fullName} • All Rights Reserved
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
