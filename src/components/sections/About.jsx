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
    role: "Humly Solutions AB — QA Developer & Technical Support (Workplace Solutions)",
    period: "December 2024 – June 2026",
    bullets: [
      "Responsible for quality assurance (QA) of the company's new systems and firmware, performing thorough testing of both software and hardware prior to production deployment.",
      "Acted as a technical key resource in customer support handling troubleshooting, system analysis and guidance regarding system functionality and API integrations.",
      "Contributed to problem solving and product development thanks to deep understanding of the full system stack — from cloud-based backend services to physical devices.",
    ],
    image: "/images/Humly_Logo.png",
    link: "https://humly.com",
  },
  {
    role: "Outliar — Python Developer (AI company, remote)",
    period: "February 2025 – June 2025",
    bullets: [
      "Developed advanced Python tools to improve AI models' ability to write, understand and analyze code.",
      "Worked on code generation, semantic understanding, refactoring and code analysis pipelines to increase model precision and usability.",
      "Built custom tooling and pipelines for processing and interpreting codebases, improving AI-driven software engineering workflows.",
    ],
    image: "/images/outliar_logo.png",
    link: "https://outlier.ai/",
  },
  {
    role: "Meliox AB — AI Project Collaboration / Internship",
    period: "January 2025 – June 2025",
    bullets: [
      "Led an AI project for sensor classification within building automation systems.",
      "Developed machine learning solutions for automatic identification and categorization of various sensor types.",
      "Responsibilities included data collection, preprocessing, model selection, implementation and testing, and integration into company systems for improved energy management.",
    ],
    image: "/images/meliox_logo.png",
    link: "https://meliox.se/",
  },
  {
    role: "Running own business & System Developer — Grocery Store (Östra Göinge)",
    period: "July 2021 – June 2025",
    bullets: [
      "Responsible for accounting tasks, auditor work, financial maintenance and filing of business income and expenditure.",
      "Built and maintained a custom system for the grocery store to track products, income, expenses and other store-specific functionality, including ongoing maintenance of the system.",
    ],
    image: "/images/ostragoinge_logo.png",
    link: "https://ostragoinge.se/",
  },
  {
    role: "Automotive Software & Diagnostics Specialist — (Freelance) Karlskrona",
    period: "June 2023 – June 2024",
    bullets: [
      "Diagnosed vehicles, identified and fixed problems, ordered and replaced required spare parts.",
      "Specialized in digital vehicle diagnostics and ECU programming, ensuring correct operation of electronicsystems and functionality of different car parts.",
    ],
    image: "/images/kna_logo.png",
    link: "https://www.karlskrona.se/",
  },
  {
    role: "Assistant Nurse (Night Patrol) — Karlskrona Municipality",
    period: "November 2022 – May 2023",
    bullets: [
      "Provided personal care, support and assistance to clients in their homes as part of home care services.",
    ],
    image: "/images/kna_logo.png",
    link: "https://www.karlskrona.se/",
  },
  {
    role: "Patient Guard — Hässleholm Hospital",
    period: "October 2020 – August 2021",
    bullets: [
      "Temporary employment providing assistance to patients with special needs in daily activities.",
    ],
    image: "/images/hslm_kommun.png",
    link: "https://www.hassleholm.se/",
  },
  {
    role: "Service Staff — Hässleholm Hospital",
    period: "June 2020 – August 2020",
    bullets: [
      "Responsible for transport duties in June, and cleaning and facility maintenance in July and August.",
    ],
    image: "/images/hslm_kommun.png",
    link: "https://www.hassleholm.se/",
  },
  {
    role: "Support Technician & Furniture Assembler — Hemfixarna AB",
    period: "December 2019 – August 2020",
    bullets: [
      "Assembled various types of furniture and provided technical support for hardware and software.",
    ],
    image: "/images/hemfixarna.png",
    link: "https://hemfixarna.se/",
  },
  {
    role: "Assembler — Glentons AB",
    period: "November 2019 – January 2020",
    bullets: [
      "Provided technical support for hardware and software troubleshooting.",
      "Assembled various types of sports trophies and awards.",
    ],
    image: "/images/glentons.png",
    link: "https://www.glentons.se/",
  },
  {
    role: "Seasonal Worker — Agneberg Preschool (Hanaskog)",
    period: "June 2018 – August 2018",
    bullets: [
      "Assisted in the kitchen with cleaning, dishwashing and cooking.",
    ],
    image: "/images/ostragoinge_logo.png",
    link: "https://ostragoinge.se/",
  },
  {
    role: "Intern — Vingården Pizzeria (Osby)",
    period: "November 2016 – December 2016",
    bullets: [
      "Internship as a cook and dishwasher assisting daily kitchen operations.",
    ],
    image: "/images/osby_kommun.png",
    link: "https://www.osby.se/",
  },
];


  const education = [
    {
      degree: "M.Sc. in Engineering — AI & ML",
      school: "Blekinge Institute of Technology (BTH)",
      period: "2021 – expected 2026",
      details: "Program covering AI/ML, computer science, engineering, IT security, and software development.",
    },
    {
      degree: "Technology Programme",
      school: "High School Education",
      period: "",
      details: "",
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
                  Master of Science in Engineering in AI & ML at BTH (5th and final year). Strong programming in Python, C, Java, and experience in advanced ML, AI security, genetic algorithms, and object tracking (YOLO). Experienced with cloud tools (Docker, GitHub), ERP system maintenance, and mechanical/automotive work. Fluent in Swedish, English, Arabic; basic Turkish.
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
            <div className="p-8 rounded-xl border-white/10 border hover:-translate-y-1 transition-all max-h-96 overflow-y-auto">
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

            <div className="p-8 rounded-xl border-white/10 border hover:-translate-y-1 transition-all max-h-96 overflow-y-auto">
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
