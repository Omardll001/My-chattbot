import { RevealOnScroll } from "../RevealOnScroll";

export const Projects = () => {
  return (
    <section id="projects" className="min-h-screen flex items-center justify-center py-8 px-4 sm:p-20">
      <RevealOnScroll>
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent text-center">
            Featured Projects
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {/* 4. AI Chatbot for Recruiters (Portfolio Integration) */}
            <div className="rounded-xl p-4 sm:p-6 border-white/10 border hover:-translate-y-1 transition-all hover:border-blue-500/30 hover:shadow-[0_2px_8px_rgba(59,130,246,0.1)]">
              <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">AI Chatbot for Recruiters</h3>
              <p className="text-gray-300 mb-3 sm:mb-4 text-sm sm:text-base">
                Integrated an interactive AI chatbot into the portfolio to assist recruiters and visitors. The chatbot answers questions about skills, projects, and background, providing a conversational and engaging experience.
              </p>
              <div className="flex flex-wrap gap-2 mb-3 sm:mb-4">
                {["Python", "Ollama", "API Gateway", "React", "JavaScript", "UI/UX", "Frontend"].map((skill, index) => (
                  <span
                    key={index}
                    className="bg-blue-500/10 text-blue-300 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm hover:bg-blue-500/20 hover:shadow-[0_2px_8px_rgba(59,130,246,0.2)]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
              <div className="flex justify-between items-center">
                <a href="#Mini_Chatbot" className="text-blue-400 hover:underline text-sm sm:text-base">
                  Try it Now! →
                </a>
              </div>
            </div>

            {/* 2. Object Tracking of Football Players */}
            <div className="rounded-xl p-4 sm:p-6 border-white/10 border hover:-translate-y-1 transition-all hover:border-blue-500/30 hover:shadow-[0_2px_8px_rgba(59,130,246,0.1)]">
              <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Object Tracking of Football Players</h3>
              <p className="text-gray-300 mb-3 sm:mb-4 text-sm sm:text-base">
                Developed a software tool for small football clubs to track player positions and performance during matches using the YOLO algorithm. The system analyzes player movements and provides actionable insights for coaches and players.
              </p>
              <div className="flex flex-wrap gap-2 mb-3 sm:mb-4">
                {["Python", "YOLO", "Object Tracking", "Dataset Management"].map((skill, index) => (
                  <span
                    key={index}
                    className="bg-blue-500/10 text-blue-300 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm hover:bg-blue-500/20 hover:shadow-[0_2px_8px_rgba(59,130,246,0.2)]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* 3. Rasts – The Service for Swimrunners */}
            <div className="rounded-xl p-4 sm:p-6 border-white/10 border hover:-translate-y-1 transition-all hover:border-blue-500/30 hover:shadow-[0_2px_8px_rgba(59,130,246,0.1)]">
              <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Rasts – The Service for Swimrunners</h3>
              <p className="text-gray-300 mb-3 sm:mb-4 text-sm sm:text-base">
                Built a website and app for a swimrun sports club. Users can track performance, register for events, and use a chip-based timing system. Backend API developed in Python and PHP, with MySQL for data storage and HTML/CSS for the frontend.
              </p>
              <div className="flex flex-wrap gap-2 mb-3 sm:mb-4">
                {["PHP", "Python", "MySQL", "HTML", "CSS", "phpMyAdmin"].map((skill, index) => (
                  <span
                    key={index}
                    className="bg-blue-500/10 text-blue-300 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm hover:bg-blue-500/20 hover:shadow-[0_2px_8px_rgba(59,130,246,0.2)]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* 4. RAG System for IKEA */}
            <div className="rounded-xl p-4 sm:p-6 border-white/10 border hover:-translate-y-1 transition-all hover:border-blue-500/30 hover:shadow-[0_2px_8px_rgba(59,130,246,0.1)]">
              <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">RAG System for IKEA</h3>
              <p className="text-gray-300 mb-3 sm:mb-4 text-sm sm:text-base">
                Designed a Retrieval-Augmented Generation (RAG) tool with a knowledge base of engineering standards to help IKEA developers adopt standard workflows and reusable components. Features include contextual recommendations, security compliance, and scalable architecture supporting 4000+ users.
              </p>
              <div className="flex flex-wrap gap-2 mb-3 sm:mb-4">
                {["Python", "JavaScript", "GCP", "MCP Server", "LLM", "API Gateway"].map((skill, index) => (
                  <span
                    key={index}
                    className="bg-blue-500/10 text-blue-300 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm hover:bg-blue-500/20 hover:shadow-[0_2px_8px_rgba(59,130,246,0.2)]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* 5. Cloud-based AI Image Recognizer with Flask APIs */}
            <div className="rounded-xl p-4 sm:p-6 border-white/10 border hover:-translate-y-1 transition-all hover:border-blue-500/30 hover:shadow-[0_2px_8px_rgba(59,130,246,0.1)]">
              <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Cloud-based AI Image Recognizer</h3>
              <p className="text-gray-300 mb-3 sm:mb-4 text-sm sm:text-base">
                Developed a cloud-based image recognition service using Flask APIs and a convolutional neural network. The system classifies fashion images into categories, and includes security features to defend against model extraction and adversarial attacks.
              </p>
              <div className="flex flex-wrap gap-2 mb-3 sm:mb-4">
                {["Python", "Flask", "CNN", "API Security", "Adversarial Defense"].map((skill, index) => (
                  <span
                    key={index}
                    className="bg-blue-500/10 text-blue-300 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm hover:bg-blue-500/20 hover:shadow-[0_2px_8px_rgba(59,130,246,0.2)]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* 6. Brain Tumor Detector */}
            <div className="rounded-xl p-4 sm:p-6 border-white/10 border hover:-translate-y-1 transition-all hover:border-blue-500/30 hover:shadow-[0_2px_8px_rgba(59,130,246,0.1)]">
              <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Brain Tumor Detector</h3>
              <p className="text-gray-300 mb-3 sm:mb-4 text-sm sm:text-base">
                Developed a deep learning pipeline for brain tumor detection using custom and standard CNN architectures. The project involved preprocessing MRI images, designing and training convolutional neural networks, and evaluating model performance. Achieved robust classification results and visualized learned features to interpret model decisions.
              </p>
              <div className="flex flex-wrap gap-2 mb-3 sm:mb-4">
                {["Python", "Keras", "TensorFlow", "CNN", "Data Augmentation", "Model Evaluation"].map((skill, index) => (
                  <span
                    key={index}
                    className="bg-blue-500/10 text-blue-300 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm hover:bg-blue-500/20 hover:shadow-[0_2px_8px_rgba(59,130,246,0.2)]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* 7. Sensor Classification Algorithm for Meliox AB */}
            <div className="rounded-xl p-4 sm:p-6 border-white/10 border hover:-translate-y-1 transition-all hover:border-blue-500/30 hover:shadow-[0_2px_8px_rgba(59,130,246,0.1)]">
              <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Sensor Classification Algorithm for Meliox AB</h3>
              <p className="text-gray-300 mb-3 sm:mb-4 text-sm sm:text-base">
                Applied the CRISP-DM methodology to classify sensor data (temperature vs. humidity) from smart buildings managed by Meliox AB. The project included data cleaning, feature engineering, and evaluation of multiple machine learning models. The Random Forest classifier achieved over 99% accuracy on test data and 91% on unseen data, supporting robust deployment for automated sensor monitoring.
              </p>
              <div className="flex flex-wrap gap-2 mb-3 sm:mb-4">
                {["Python", "Data Mining", "Random Forest", "CRISP-DM", "Jupyter Notebook", "Feature Engineering"].map((skill, index) => (
                  <span
                    key={index}
                    className="bg-blue-500/10 text-blue-300 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm hover:bg-blue-500/20 hover:shadow-[0_2px_8px_rgba(59,130,246,0.2)]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </RevealOnScroll>
    </section>
  );
};