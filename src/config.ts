export interface Project {
  id: number;
  title: string;
  category: string;
  technologies: string;
  image: string;
  description: string;
  capabilities: string[];
  github: string;
  liveDemo?: string;
  link?: string;
}

export interface Experience {
  position: string;
  company: string;
  period: string;
  location: string;
  description: string;
  responsibilities: string[];
  technologies: string[];
}

export interface Certification {
  title: string;
  issuer: string;
  year?: string;
  url?: string;
}

export interface EducationItem {
  degree: string;
  institution: string;
  location: string;
  period: string;
  grade: string;
  details: string;
}

export const config = {
  developer: {
    name: "Narasimha",
    fullName: "Narasimha Manam",
    monogram: "NM",
    title: "Full Stack Developer | Generative AI Engineer",
    headline: "Building Intelligent Digital Experiences",
    description:
      "I'm Narasimha Manam — a Full Stack Developer and Generative AI Engineer passionate about building intelligent applications, useful AI systems, and immersive web experiences.",
    location: "Guntur, Andhra Pradesh, India",
    resumeUrl:
      "https://drive.google.com/file/d/1LDugxBj8h2SxtT2SgBOz6XXlQ8gmiS5v/view?usp=drive_link",
  },
  social: {
    github: "https://github.com/Narasimhamanam",
    linkedin: "https://www.linkedin.com/in/narasimha-manam-032a9634b",
    email: "narasimhamanam6014@gmail.com",
    location: "Guntur, Andhra Pradesh, India",
    resumeUrl:
      "https://drive.google.com/file/d/1LDugxBj8h2SxtT2SgBOz6XXlQ8gmiS5v/view?usp=drive_link",
  },
  contact: {
    email: "narasimhamanam6014@gmail.com",
    github: "https://github.com/Narasimhamanam",
    linkedin: "https://www.linkedin.com/in/narasimha-manam-032a9634b",
    location: "Guntur, Andhra Pradesh, India",
    resumeUrl:
      "https://drive.google.com/file/d/1LDugxBj8h2SxtT2SgBOz6XXlQ8gmiS5v/view?usp=drive_link",
  },
  about: {
    title: "About Me",
    headline: "B.Tech Computer Science & Engineering Undergraduate",
    description:
      "I am an undergraduate in Computer Science & Engineering at R.V.R & J.C College of Engineering (Expected 2027) with a CGPA of 9.41. I specialize in full-stack development and generative AI architectures, building Retrieval-Augmented Generation (RAG) pipelines, interactive user interfaces, and machine-learning systems. I focus on solving real-world challenges through rigorous engineering and clean, scalable code.",
    highlights: [
      { label: "Institution", value: "R.V.R & J.C College of Engineering" },
      { label: "Degree", value: "B.Tech in Computer Science & Engineering" },
      { label: "Period", value: "2023 – Present (Expected 2027)" },
      { label: "Academic CGPA", value: "9.41 / 10.0" },
    ],
    interests: [
      "Full-Stack Web Application Development (MERN Stack)",
      "Generative AI & LLM-Powered Systems",
      "Retrieval-Augmented Generation (RAG) Pipelines",
      "Machine Learning & Predictive Data Analytics",
      "Interactive Frontend & 3D Web Graphics",
      "Data Structures & Algorithmic Problem Solving",
    ],
  },
  education: [
    {
      degree: "Bachelor of Technology, Computer Science & Engineering",
      institution: "R.V.R & J.C College of Engineering",
      location: "Guntur, Andhra Pradesh",
      period: "2023 – Present",
      grade: "CGPA: 9.41 / 10",
      details:
        "Department of Computer Science & Engineering. Coursework in Data Structures & Algorithms, DBMS, Operating Systems, Computer Networks, and Artificial Intelligence. Expected Graduation: 2027.",
    },
    {
      degree: "Intermediate Education (Class XII)",
      institution: "Sri Saraswathi Junior College",
      location: "Guntur, Andhra Pradesh",
      period: "2021 – 2023",
      grade: "Percentage: 97.2%",
      details:
        "Focused study in Mathematics, Physics, and Chemistry (MPC) with academic distinction.",
    },
  ] as EducationItem[],
  internships: [
    {
      role: "AICTE EduSkills Virtual Internship — MERN Stack",
      company: "AICTE EduSkills",
      period: "April 2026 – July 2026",
      description:
        "Completed hands-on virtual internship focused on full-stack web development using MERN technologies (MongoDB, Express, React, Node.js).",
    },
    {
      role: "Web Development Intern — CodSoft",
      company: "CodSoft",
      period: "May 2025 – June 2025",
      description:
        "Developed responsive web pages and interactive user interfaces using HTML, CSS, and JavaScript.",
    },
  ],
  certifications: [
    {
      title: "NPTEL Certification in Internet of Things (IoT)",
      issuer: "NPTEL / IIT",
    },
    {
      title: "Career Essentials in Generative AI",
      issuer: "Microsoft and LinkedIn",
    },
    {
      title: "GEN AI Certification",
      issuer: "Google",
    },
  ] as Certification[],
  activities: [
    "Participated in technical events, coding contests, and college hackathons.",
    "Organized technical events as an active member of the ACM Student Chapter and Computer Science Tech Club.",
    "Collaborated in student technical communities promoting innovation, leadership, and peer learning.",
  ],
  experiences: [
    {
      position: "MERN Stack Virtual Intern",
      company: "AICTE EduSkills",
      period: "April 2026 – July 2026",
      location: "Virtual / India",
      description:
        "Hands-on full-stack development specializing in MongoDB, Express.js, React, and Node.js REST API architectures.",
      responsibilities: [
        "Constructing full-stack MERN application components and stateful client interfaces",
        "Developing secure RESTful endpoints and integrating MongoDB database schemas",
        "Practicing version control workflows and modular architectural patterns",
      ],
      technologies: ["MongoDB", "Express.js", "React", "Node.js", "Git"],
    },
    {
      position: "Web Development Intern",
      company: "CodSoft",
      period: "May 2025 – June 2025",
      location: "Virtual / India",
      description:
        "Designed and implemented responsive web pages and interactive user experiences with clean HTML, CSS, and modern JavaScript.",
      responsibilities: [
        "Developing responsive web pages across desktop, tablet, and mobile viewports",
        "Implementing interactive interface elements and accessible DOM structures",
        "Optimizing page layout performance and cross-browser consistency",
      ],
      technologies: ["HTML5", "CSS3", "JavaScript", "Responsive Design"],
    },
    {
      position: "B.Tech in Computer Science & Engineering",
      company: "R.V.R & J.C College of Engineering",
      period: "2023 – Present",
      location: "Guntur, Andhra Pradesh",
      description:
        "Undergraduate studies in Computer Science (Expected Graduation: 2027) with strong academic standing (CGPA: 9.41 / 10).",
      responsibilities: [
        "Maintained 9.41 CGPA across Data Structures, Algorithms, DBMS, and AI coursework",
        "Active member of the ACM Student Chapter and Computer Science Tech Club",
        "Participated in collegiate hackathons, technical contests, and coding competitions",
      ],
      technologies: ["Python", "SQL", "DBMS", "DSA", "Machine Learning"],
    },
    {
      position: "Intermediate (Class XII - MPC)",
      company: "Sri Saraswathi Junior College",
      period: "2021 – 2023",
      location: "Guntur, Andhra Pradesh",
      description:
        "Completed pre-university education in Mathematics, Physics, and Chemistry with high academic distinction (97.2%).",
      responsibilities: [
        "Achieved 97.2% overall aggregate score",
        "Built strong mathematical, analytical, and logical problem-solving foundations",
      ],
      technologies: ["Mathematics", "Physics", "Chemistry", "Analytical Problem Solving"],
    },
  ],
  skills: {
    develop: {
      title: "FULL STACK & AI ENGINEERING",
      description: "MERN Stack, FastAPI & Machine Learning Systems",
      details:
        "Building robust web applications with MERN Stack (MongoDB, Express, React, Node.js) and FastAPI, integrating RAG vector pipelines and predictive ML models.",
      tools: [
        "Python",
        "SQL",
        "React",
        "Node.js",
        "Express.js",
        "MongoDB",
        "FastAPI",
        "HTML",
        "CSS",
        "JavaScript",
        "Machine Learning",
        "RAG Pipelines",
        "Scikit-learn",
        "Streamlit",
        "Git/GitHub",
      ],
    },
    design: {
      title: "DATA ANALYTICS & CS FUNDAMENTALS",
      description: "Data Structures, DBMS & Predictive Visualization",
      details:
        "Applying core computer science fundamentals in Data Structures, Algorithms, and DBMS, backed by analytical Python libraries and interactive visualization dashboards.",
      tools: [
        "Data Structures & Algorithms",
        "DBMS",
        "Pandas",
        "NumPy",
        "Matplotlib",
        "Seaborn",
        "Streamlit",
        "Three.js",
        "Postman",
        "Problem-Solving",
        "Team Collaboration",
        "Adaptability",
      ],
    },
  },
  projects: [
    {
      id: 1,
      title: "Simha AI",
      category: "Multi-Agent LLM Platform / Generative AI",
      technologies: "LLaMA 3.3, FastAPI, React, MongoDB, RAG",
      image: "/projects/simha-ai-1.jpg",
      description:
        "An AI-powered multi-agent assistant platform combining conversational intelligence, document understanding, and automated task workflows.",
      capabilities: [
        "Context-aware response generation powered by LLaMA 3.3",
        "RAG-based PDF question answering with vector similarity retrieval",
        "Real-time streaming and persistent chat memory",
        "Intelligent task automation, calendar operations, and email drafting",
        "OCR document analysis and multimodal input workflows",
      ],
      github: "https://github.com/Narasimhamanam/Simha-AI",
      liveDemo: "https://simha-ai.vercel.app",
      link: "https://simha-ai.vercel.app",
    },
    {
      id: 2,
      title: "ADAM-1 Enhanced",
      category: "AI Research / Data Analysis Platform",
      technologies: "React, FastAPI, PostgreSQL, pgvector, LLM Integration",
      image: "/projects/adam1-research.jpg",
      description:
        "An AI-powered Alzheimer’s disease and microbiome research platform designed to support scientific data exploration, computational analysis, and research-oriented insights.",
      capabilities: [
        "Metagenomic gut-brain axis correlation visualization network",
        "Neural biomarker distribution heatmaps and progression curves",
        "3D brain hippocampus anatomical exploration viewport",
        "pgvector similarity clustering for multi-cohort scientific datasets",
      ],
      github: "https://github.com/Narasimhamanam",
      liveDemo: "",
    },
    {
      id: 3,
      title: "Smart Loan Approval Prediction System",
      category: "Machine Learning / Predictive Analytics",
      technologies: "Python, Scikit-learn, Pandas, Streamlit",
      image: "/projects/smart-loan.jpg",
      description:
        "A machine-learning application that predicts loan approval outcomes using classification algorithms and financial risk factors.",
      capabilities: [
        "Loan approval prediction using supervised classification algorithms",
        "Feature engineering and exploratory data analysis (credit score, income, DTI ratio)",
        "Interactive applicant analytics visualization dashboard",
        "Real-time risk assessment and probability waterfall attribution",
      ],
      github: "https://github.com/Narasimhamanam",
      liveDemo: "",
    },
  ] as Project[],
};
