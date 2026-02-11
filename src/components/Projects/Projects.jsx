import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Github, ExternalLink, ArrowRight, X } from 'lucide-react';
import { FaAws } from "react-icons/fa";
import { 
  SiHtml5, SiCss3, SiJavascript, SiTailwindcss, SiReact, SiNextdotjs, SiVuedotjs,
  SiPython, SiBootstrap, SiDjango, SiMysql, SiCplusplus, SiGit, SiGithub
} from "react-icons/si";
import { FaJava } from "react-icons/fa";

import { motion, AnimatePresence } from 'framer-motion';

import Container from '../UI/Container';
import { TechCarousel } from '../UI/TechCarousel'; 

// --- DATA ---
const featuredProjects = [
  {
    title: "Smart Home IoT Dashboard",
    description: "A centralized control panel for smart home devices, bridging MQTT protocols with React.",
    tags: ["React", "Node.js", "MQTT"],
    image: "https://plus.unsplash.com/premium_photo-1716999684556-f2f310f27e3a?q=80&w=800&auto=format&fit=crop",
    github: "#",
    live: "#"
  },
  {
    title: "Circuit Monitor System",
    description: "Low-level embedded system for voltage regulation and real-time circuit analysis.",
    tags: ["C++", "Hardware", "Embedded"],
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2940&auto=format&fit=crop",
    github: "#",
    live: "#"
  },
  {
    title: "E-Commerce Platform",
    description: "Scalable backend architecture handling high-volume transactions with Python.",
    tags: ["Django", "Python", "Docker"],
    image: "https://images.unsplash.com/photo-1757301714935-c8127a21abc6?q=80&w=800&auto=format&fit=crop",
    github: "#",
    live: "#"
  },
  {
    title: "Secure Net Protocol",
    description: "Implementation of a custom secure handshake protocol for industrial sensors.",
    tags: ["Cybersecurity", "Network", "Python"],
    image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=2940&auto=format&fit=crop",
    github: "#",
    live: "#"
  }
];

const allProjects = [
    ...featuredProjects,
    {
        title: "Autonomous Drone",
        description: "AI-powered drone navigation system using computer vision.",
        tags: ["Python", "OpenCV", "AI"],
        image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?q=80&w=2940&auto=format&fit=crop",
        github: "#",
        live: "#"
    },
    {
        title: "Weather Station",
        description: "Local weather data collection unit with cloud syncing.",
        tags: ["Arduino", "C++", "Cloud"],
        image: "https://images.unsplash.com/photo-1590055531615-f16d36ffe8ec?q=80&w=2832&auto=format&fit=crop",
        github: "#",
        live: "#"
    },
    {
        title: "Finance Tracker",
        description: "Personal finance management tool with data visualization.",
        tags: ["Vue.js", "Firebase"],
        image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2940&auto=format&fit=crop",
        github: "#",
        live: "#"
    },
    {
        title: "Health Tech App",
        description: "Mobile application for tracking patient vitals in real-time.",
        tags: ["Flutter", "Dart"],
        image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2940&auto=format&fit=crop",
        github: "#",
        live: "#"
    },
    {
        title: "Cyber Security Tool",
        description: "Network packet sniffer and analysis tool for security auditing.",
        tags: ["Python", "Wireshark"],
        image: "https://images.unsplash.com/photo-1584433144859-1fc3ab64a957?q=80&w=800&auto=format&fit=crop",
        github: "#",
        live: "#"
    }
];

const Projects = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const techStack = [
    { name: "HTML", icon: SiHtml5 },
    { name: "CSS", icon: SiCss3 },
    { name: "JavaScript", icon: SiJavascript },
    { name: "Bootstrap", icon: SiBootstrap },
    { name: "Tailwind", icon: SiTailwindcss },
    { name: "React.Js", icon: SiReact },
    { name: "Next.Js", icon: SiNextdotjs },
    { name: "Vue.Js", icon: SiVuedotjs },
    { name: "Python", icon: SiPython },
    { name: "Django", icon: SiDjango },
    { name: "MySQL", icon: SiMysql },
    { name: "C++", icon: SiCplusplus },
    { name: "Java", icon: FaJava },
    { name: "Git", icon: SiGit },
    { name: "GitHub", icon: SiGithub },
    
    
  ];

  useEffect(() => {
    if (isModalOpen) {
      if (window.lenis) window.lenis.stop();
      document.body.style.overflow = 'hidden';
    } else {
      if (window.lenis) window.lenis.start();
      document.body.style.overflow = 'unset';
    }
  }, [isModalOpen]);

  return (
    <>
        {/* === Main Section === */}
        <section id="projects" className="py-20 bg-[#040907] relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
              <div className="absolute top-1/4 left-0 w-64 h-64 bg-brand/5 rounded-full blur-[100px]" />
              <div className="absolute -bottom-20 right-0 w-96 h-96 bg-green-900/10 rounded-full blur-[120px]" />
            </div>

            <Container>
                <div className="flex flex-col mb-12">
                    <div className="inline-flex items-center gap-2 mb-2">
                        <span className="w-8 h-0.5 bg-brand"></span>
                        <span className="text-brand font-code text-sm tracking-widest uppercase">Selected Works</span>
                    </div>
                    <div className="flex justify-between items-end">
                        <h2 className="text-3xl md:text-5xl font-bold font-heading text-text-primary">
                            Engineering <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand to-cyan-500">Solutions</span>
                        </h2>
                        <button 
                            onClick={() => setIsModalOpen(true)}
                            className="hidden md:flex items-center gap-2 text-text-secondary hover:text-brand transition-colors text-sm font-code cursor-pointer"
                        >
                            View all projects <ArrowRight size={16} />
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[400px]">
                    {featuredProjects.map((project, index) => {
                        const isWide = index === 0 || index === 3;
                        return (
                            <ProjectCard key={index} project={project} isWide={isWide} />
                        );
                    })}
                </div>

                <div className="mt-8 flex justify-center md:hidden">
                    <button 
                        onClick={() => setIsModalOpen(true)}
                        className="flex items-center gap-2 text-text-secondary hover:text-brand transition-colors text-sm font-code cursor-pointer"
                    >
                        View all projects <ArrowRight size={16} />
                    </button>
                </div>
            </Container>
        </section>

        {/* === Tech Stack === */}
        <section id="skills" className="w-full py-24 bg-[#0b1121] border-t border-white/5">
                <TechCarousel 
                    title="My Tech Stack"       
                    highlight="Tech Stack"      
                    items={techStack}
                />
        </section>

        {/* === Modal (Rendered via Portal to document.body) === */}
        {createPortal(
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-9999 flex justify-center items-center p-4 md:p-6 h-screen w-screen">
                        
                        {/* Backdrop */}
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="absolute inset-0 bg-[#040907]/90 backdrop-blur-md"
                            onClick={() => setIsModalOpen(false)}
                        />

                        {/* Modal Content */}
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 10 }}
                            transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }} 
                            className="
                                relative w-full max-w-6xl h-[85vh] 
                                bg-[#0b1121] border border-white/10 rounded-2xl md:rounded-3xl 
                                shadow-2xl flex flex-col overflow-hidden will-change-transform
                            "
                            onClick={(e) => e.stopPropagation()} 
                        >
                            
                            <div className="flex justify-between items-center p-6 border-b border-white/5 bg-[#0b1121] z-10 shrink-0">
                                <h3 className="text-2xl font-bold text-white font-heading">
                                    All <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand to-cyan-500">Projects</span>
                                </h3>
                                <button 
                                    onClick={() => setIsModalOpen(false)}
                                    className="p-2 rounded-full bg-white/5 text-text-secondary hover:bg-brand hover:text-[#0b1121] transition-all"
                                >
                                    <X size={24} />
                                </button>
                            </div>

                            <div 
                                className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar"
                                data-lenis-prevent="true" 
                            >
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {allProjects.map((project, index) => (
                                        <div key={index} className="h-87.5"> 
                                            <ProjectCard project={project} isWide={false} />
                                        </div>
                                    ))}
                                </div>
                            </div>

                        </motion.div>
                    </div>
                )}
            </AnimatePresence>,
            document.body // This renders the modal outside of the main app container
        )}
    </>
  )
}

// Reusable Card
const ProjectCard = ({ project, isWide }) => {
    return (
        <div 
            className={`
                group relative w-full h-full rounded-3xl overflow-hidden 
                border border-white/10 bg-[#0b1121]
                transition-all duration-500 hover:shadow-[0_0_30px_rgba(52,211,153,0.15)] hover:border-brand/30
                ${isWide ? 'md:col-span-2' : 'md:col-span-1'}
            `}
        >
            <img 
                src={project.image} 
                alt={project.title} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/60 to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />
            
            <div className="absolute bottom-0 left-0 w-full p-8 flex flex-col justify-end h-full">
                <div className="transform transition-transform duration-500 group-hover:-translate-y-2">
                    <div className="flex flex-wrap gap-2 mb-3">
                        {project.tags.map((tag, i) => (
                            <span key={i} className="px-3 py-1 text-xs font-bold font-code bg-brand/20 text-brand rounded-full border border-brand/20 backdrop-blur-md">
                                {tag}
                            </span>
                        ))}
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-brand transition-colors">
                        {project.title}
                    </h3>
                    <p className="text-gray-300 text-sm line-clamp-2 mb-4 opacity-80 group-hover:opacity-100">
                        {project.description}
                    </p>
                </div>
                <div className="flex gap-4 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-100">
                    <a href={project.github} className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border border-white/20 text-white hover:bg-white/10 hover:border-white transition-all font-medium text-sm">
                        <Github size={18} /> GitHub
                    </a>
                    <a href={project.live} className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-brand text-[#0b1121] font-bold hover:bg-brand/90 hover:scale-[1.02] transition-all text-sm shadow-[0_0_15px_rgba(52,211,153,0.4)]">
                        <ExternalLink size={18} /> Live Demo
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Projects;