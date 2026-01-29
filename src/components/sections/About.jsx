import { useState } from "react";
import { RevealOnScroll } from "../RevealOnScroll";

export const About = () => {
  const [showAllEducation, setShowAllEducation] = useState(false);
  const [currentWorkIndex, setCurrentWorkIndex] = useState(0);

  // Skills
  const frontendSkills = ["React", "JavaScript / TypeScript", "Tailwind CSS", "HTML", "CSS", "UI/UX", "Frontend"];
  const backendSkills = ["Node.js", "Python", "PHP", "MySQL", "pgAdmin", "SQL", "RESTful APIs", "Flask", "API Gateway", "API development", "C", "C++", "Java", "MongoDB"];
  const mlAndDataSkills = ["Machine Learning", "TensorFlow", "Keras", "CNN", "YOLO", "Object Tracking", "Dataset Management", "Data Augmentation", "Model Evaluation", "Random Forest", "CRISP-DM", "Data Mining", "Feature Engineering", "Adversarial Defense", "API Security", "LLM"];
  const devopsAndTools = ["Docker", "Git / GitHub", "GCP", "MCP Server", "phpMyAdmin", "Jupyter Notebook", "SolidWorks (CSWA)"];
  const otherSkills = ["System Engineering", "Cloud management", "ERP system maintenance", "Auditing & Financial Management", "Mechanics & Vehicle Engineering"];

 // Work experience
const workExperience = [
  {
    role: "AFRY Industry — Master Thesis: Automation & AI",
    period: "Spring 2026",
    bullets: [
      "Developing AI-assisted tools to automate and optimize industrial automation projects at AFRY Industry, Malmö.",
      "Building database-driven generation of PLC/HMI logic and technical documentation using Python/C#, SQL, and AI-based information retrieval.",
      "Creating AI-based tools to prompt project status and information, improving workflow efficiency in automation projects.",
    ],
    image: "/images/afry_logo.png",
    link: "https://afry.com/",
  },
  {
    role: "Security Clearance — SAAB AB",
    period: "January 2026",
    bullets: [
      "Successfully passed SAAB security clearance, approved for work in security-classified industrial environments.",
    ],
    image: "/images/saab_logo.png",
    link: "https://www.saab.com/",
  },
  {
    role: "Humly Solutions AB — QA Developer & Technical Support (Workplace Solutions)",
    period: "December 2024 – June 2026",
    bullets: [
      "Led QA testing of firmware, software, and hardware before production.",
      "Acted as a key technical resource in customer support: troubleshooting, system analysis, API guidance.",
      "Worked across the stack from cloud-based backend to physical devices.",
    ],
    image: "/images/Humly_Logo.png",
    link: "https://humly.com",
  },
  {
    role: "IKEA (INGKA Group) — AI & Systems Engineering Project",
    period: "September 2025 – December 2025",
    bullets: [
      "Developed a Model Context Protocol (MCP) Server to improve developer productivity and observability across IKEA's engineering ecosystem.",
      "Built and deployed a Dockerized architecture ensuring consistency, scalability, and version control across environments.",
      "Engaged directly with IKEA engineers through weekly technical meetings, on-site collaboration in Malmö, and multiple demo sessions.",
    ],
    image: "/images/ikea_logo.png",
    link: "https://www.ikea.com/",
  },
  {
    role: "Meliox AB — AI Project Collaboration / Internship",
    period: "January 2025 – June 2025",
    bullets: [
      "Led ML project for smart building sensor classification.",
      "Collected, preprocessed, and modeled 3M+ sensor data points; deployed a highly accurate classifier.",
    ],
    image: "/images/meliox_logo.png",
    link: "https://meliox.se/",
  },
  {
    role: "Outliar — AI Developer (Remote)",
    period: "February 2025 – June 2025",
    bullets: [
      "Developed Python pipelines for AI code generation, semantic understanding, refactoring, and analysis.",
      "Improved precision and usability of AI models for programming tasks.",
    ],
    image: "/images/outliar_logo.png",
    link: "https://outlier.ai/",
  },
  {
    role: "Running own business & System Developer — Grocery Store (Östra Göinge)",
    period: "July 2021 – June 2025",
    bullets: [
      "Built and maintained custom ERP system for inventory, sales, and financials.",
      "Managed accounting, auditing, and financial reporting.",
    ],
    image: "/images/ostragoinge_logo.png",
    link: "https://ostragoinge.se/",
  },
  {
    role: "Automotive Software & Diagnostics Specialist — Freelance, Karlskrona",
    period: "June 2023 – June 2024",
    bullets: [
      "Specialized in digital vehicle diagnostics and ECU programming, ensuring correct operation of electronic systems and functionality of different car parts.",
    ],
    image: "/images/kna_logo.png",
    link: "https://www.karlskrona.se/",
  },
  {
    role: "Hemfixarna AB — Support Technician & Furniture Assembler",
    period: "December 2019 – August 2020",
    bullets: [
      "Provided technical support for hardware and software troubleshooting.",
      "Assembled and mounted various types of furniture.",
    ],
    image: "/images/hemfixarna.png",
    link: "https://hemfixarna.se/",
  },
];


  const education = [
    {
      degree: "M.Sc. in Engineering — AI & Machine Learning",
      school: "Blekinge Institute of Technology (BTH)",
      period: "2021 – 2026",
      details: "Key areas: Advanced Machine Learning, Deep Learning, AI Security, Software Architecture, Data Mining, Robotics, Cloud Technologies.",
    },
    {
      degree: "Master Thesis — Automation & AI (AFRY)",
      school: "AFRY Industry, Malmö",
      period: "Spring 2026",
      details: "Development of AI-assisted tools to automate and optimize industrial automation projects, including database-driven generation of PLC/HMI logic and technical documentation using Python/C#, SQL, and AI-based information retrieval.",
    },
  ];

  const languages = [
    { name: "Swedish", level: "Fluent" },
    { name: "English", level: "Fluent" },
    { name: "Arabic", level: "Fluent" },
    { name: "Turkish", level: "Basic" },
  ];

  const contact = {
    address: "Kungsmarksvägen 7, 37144 Karlskrona",
    phone: "076-9481560",
    email: "omar.dalal.2001@gmail.com",
  };

  return (
    <section id="about" className="min-h-screen flex items-center justify-center py-20">
      <RevealOnScroll>
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent text-center">
            About Me
          </h2>

          {/* Contact & Profile */}
          <div className="rounded-xl p-6 border-white/10 border hover:-translate-y-1 transition-all">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-bold mb-3">Contact</h3>
                <p className="text-gray-300 mb-1">{contact.address}</p>
                <p className="text-gray-300 mb-1">{contact.phone}</p>
                <p className="text-gray-300 mb-1">
                  <a href={`mailto:${contact.email}`} className="text-blue-400 hover:underline">{contact.email}</a>
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3">Profile</h3>
                <p className="text-gray-300">
                  M.Sc. Engineering student in AI & Machine Learning at BTH, final year. Strong foundation in Python, C, Java, software engineering principles, AI systems, automation-related programming, and data-driven solutions. Experienced in applied machine learning, AI security, genetic algorithms, computer vision, and cloud technologies (Docker, GCP).
                </p>
              </div>
            </div>
          </div>

         {/* Skills */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            {[
              { title: "Frontend", items: frontendSkills },
              { title: "Backend & Dev", items: backendSkills },
              { title: "ML & Tools", items: [...mlAndDataSkills, ...devopsAndTools, ...otherSkills] },
            ].map((group, idx) => (
              <div
                key={idx}
                className="p-6 rounded-xl border-white/10 border hover:-translate-y-1 transition-all"
              >
                <h3 className="text-xl font-bold mb-4 p-1 rounded">{group.title}</h3>
                <div className="max-h-60 overflow-y-auto scrollbar-custom">
                  <div className="flex flex-wrap gap-2 mt-2">
                    {group.items.map((s, i) => (
                      <span
                        key={i}
                        className="bg-blue-500/10 text-blue-300 px-3 py-1 rounded-full text-sm hover:bg-blue-500/20 hover:shadow-[0_2px_8px_rgba(59,130,246,0.2)]"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>




          {/* Education & Languages */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div className="p-8 rounded-xl border-white/10 border hover:-translate-y-1 transition-all">
              <h3 className="text-2xl font-bold mb-4 p-3 rounded shadow-md">Education</h3>
              <ul className="list-disc list-inside text-gray-300 space-y-4 mt-4">
                {education.map((e, i) => (
                  <li key={i}>
                    <strong>{e.degree}</strong>
                    {e.school && ` — ${e.school}`}
                    {e.period && ` (${e.period})`}
                    {e.details && <div className="text-sm text-gray-400 mt-1">{e.details}</div>}
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-8 rounded-xl border-white/10 border hover:-translate-y-1 transition-all">
              <h3 className="text-2xl font-bold mb-4 p-3 rounded shadow-md">Languages</h3>
              <ul className="list-disc list-inside text-gray-300 space-y-4 mt-4">
                {languages.map((l, i) => (
                  <li key={i}>
                    {l.name} — <span className="text-gray-400">{l.level}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>



          {/* Work Experience */}
          <div className="mt-8 p-6 rounded-xl border-white/10 border hover:-translate-y-1 transition-all">
            <h3 className="text-xl font-bold mb-4 sticky top-0 z-10 px-2">
              Work Experience
            </h3>
            <div className="flex flex-col gap-6 max-h-[600px] overflow-y-auto scrollbar-custom">
            {workExperience.map((w, idx) => (
                <a
                  key={idx}
                  href={w.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col md:flex-row gap-4 p-4 bg-gray-800/20 rounded-xl hover:bg-gray-800/30 transition-all"
                >
                  {w.image && (
                    <img
                      src={w.image}
                      alt={w.role}
                      className="w-full md:w-32 h-32 object-cover rounded-lg flex-shrink-0"
                    />
                  )}
                  <div className="flex-1">
                    <h4 className="font-semibold text-lg">{w.role}</h4>
                    <span className="text-sm text-gray-400">{w.period}</span>
                    <ul className="list-disc list-inside mt-2 text-gray-300 text-sm">
                      {w.bullets.map((b, bi) => (
                        <li key={bi}>{b}</li>
                      ))}
                    </ul>
                  </div>
                </a>
              ))}
            </div>
          </div>


          <div className="mt-8 text-gray-400 text-sm text-center">
            <p>References available upon request.</p>
          </div>
        </div>
      </RevealOnScroll>
    </section>
  );
};
