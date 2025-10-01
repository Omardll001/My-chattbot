import React from "react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { motion } from "framer-motion";

export default function PortfolioLanding() {
  return (
    
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white flex flex-col items-center justify-center px-6">
      <div className="text-3xl font-bold text-red-500 mt-8">Tailwind is working!</div>

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-3xl"
      >
        <h1 className="text-5xl font-extrabold mb-4">
          Hi, I’m <span className="text-indigo-400">Omar Dalal</span>
        </h1>
        <p className="text-lg text-gray-300 mb-6">
          AI & Machine Learning Engineer | Builder of Intelligent Solutions
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Button className="px-6 py-3 rounded-2xl">View Projects</Button>
          <Button variant="outline" className="px-6 py-3 rounded-2xl">
            Meet My AI Twin 🤖
          </Button>
          <Button className="px-6 py-3 rounded-2xl">Leave Feedback</Button>
        </div>
      </motion.div>

      {/* Three Pillars Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 max-w-5xl w-full"
      >
        {/* Projects Card */}
        <Card className="hover:shadow-indigo-500/40 transition">
          <CardContent className="text-center">
            <h2 className="text-2xl font-bold mb-2 text-indigo-400">Projects Showcase</h2>
            <p className="text-gray-300 mb-4">Explore my AI/ML projects with live demos you can try out.</p>
            <Button>Explore</Button>
          </CardContent>
        </Card>

        {/* Mini-Me Chatbot Card */}
        <Card className="hover:shadow-indigo-500/40 transition">
          <CardContent className="text-center">
            <h2 className="text-2xl font-bold mb-2 text-indigo-400">Mini-Me Chatbot</h2>
            <p className="text-gray-300 mb-4">Ask questions about me, my skills, and projects through my AI twin.</p>
            <Button>Chat Now</Button>
          </CardContent>
        </Card>

        {/* Feedback Card */}
        <Card className="hover:shadow-indigo-500/40 transition">
          <CardContent className="text-center">
            <h2 className="text-2xl font-bold mb-2 text-indigo-400">Feedback & Ideas</h2>
            <p className="text-gray-300 mb-4">Share feedback or suggest new AI project ideas I could implement.</p>
            <Button>Submit</Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
