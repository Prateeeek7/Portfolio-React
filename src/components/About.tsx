import { motion } from 'framer-motion';
import type { Personal, Experience, Education, Project } from '../types';
import { Timeline } from './Timeline';
import { getProjectImage } from '../utils/images';

interface AboutProps {
  personal: Personal;
  experience: Experience[];
  education: Education[];
  projects?: Project[];
}

const About = ({ personal: _personal, experience, education, projects = [] }: AboutProps) => {
  const featuredProjects = projects.filter(p => p.featured).slice(0, 4);

  const timelineData = [
    ...experience.map((exp) => ({
      title: exp.startDate,
      content: (
        <div className="space-y-4">
          <p className="text-zinc-400 font-tech text-xs sm:text-sm leading-relaxed">
            {exp.description}
          </p>
          <div className="p-4 bg-zinc-950 border border-zinc-800 rounded-lg">
            <h4 className="font-tech text-xs font-semibold text-white mb-1">{exp.position}</h4>
            <p className="text-[10px] font-tech text-cyan-400 mb-2">{exp.company}</p>
            {exp.technologies && (
              <div className="flex flex-wrap gap-1.5 mt-2">
                {exp.technologies.map((tech, idx) => (
                  <span key={idx} className="px-2 py-0.5 text-[9px] font-tech bg-zinc-900 border border-zinc-800 rounded text-zinc-400">
                    {tech}
                  </span>
                ))}
              </div>
            )}
            {exp.url && (
              <div className="mt-4 pt-3 border-t border-zinc-900/60 flex justify-start">
                <a
                  href={exp.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1 text-[9px] font-tech text-pink-400 border border-pink-500/20 hover:border-pink-400 hover:bg-pink-500/10 rounded transition-all duration-200 cursor-pointer pointer-events-auto flex items-center gap-1 uppercase tracking-widest select-none hover:shadow-[0_0_8px_rgba(255,42,109,0.25)]"
                >
                  <span>Visit {exp.company}</span>
                  <span className="text-[8px]">↗</span>
                </a>
              </div>
            )}
          </div>
        </div>
      ),
    })),
    {
      title: "2024 - Project Ingestions",
      content: (
        <div className="space-y-4">
          <p className="text-zinc-400 font-tech text-xs sm:text-sm leading-relaxed">
            Architected and launched full-stack software combining AI agents, REST telemetry, and responsive interfaces.
          </p>
          <div className="grid grid-cols-2 gap-3 mt-4">
            {featuredProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                className="relative group rounded-lg overflow-hidden border border-zinc-800"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
              >
                <img
                  src={getProjectImage(project.title, project.category)}
                  alt={project.title}
                  className="h-20 w-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2">
                  <p className="text-white text-[9px] font-tech truncate w-full">{project.title}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      ),
    },
    {
      title: education[0] ? `${education[0].startYear} - ${education[0].endYear}` : "2024 - 2028",
      content: (
        <div className="space-y-4">
          <p className="text-zinc-400 font-tech text-xs sm:text-sm leading-relaxed">
            {education[0] ? (
              <>
                Pursuing <strong>{education[0].degree} in {education[0].field}</strong> at {education[0].institution}. 
                GPA: {education[0].gpa}/10. Active member in CSI - Design Domain.
              </>
            ) : (
              "Pursuing higher education while building innovative projects."
            )}
          </p>
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-zinc-950 border border-zinc-800 rounded">
              <span className="text-[9px] font-tech text-zinc-500 block uppercase">INSTITUTION</span>
              <span className="text-xs font-tech text-zinc-300">{education[0]?.institution || "VIT Vellore"}</span>
            </div>
            <div className="p-3 bg-zinc-950 border border-zinc-800 rounded">
              <span className="text-[9px] font-tech text-zinc-500 block uppercase">ACADEMIC SCORE</span>
              <span className="text-xs font-tech text-zinc-300">GPA {education[0]?.gpa || "9.2"} / 10</span>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <section id="about" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-transparent bg-grid relative overflow-hidden border-t border-zinc-900">
      {/* Background spotlights */}
      <div className="absolute top-[30%] right-[5%] w-[400px] h-[400px] rounded-full bg-cyan-500/[0.02] blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-24">
        {/* About Info & Pillars layout */}
        <div className="grid lg:grid-cols-12 gap-12 sm:gap-16 items-start">
          {/* Left Column: Serif statements and story */}
          <motion.div 
            className="lg:col-span-7 space-y-6"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-[10px] font-tech text-zinc-500 tracking-widest block uppercase">ABOUT ME</span>
            <h2 className="text-3xl sm:text-5xl font-serif-display font-extrabold text-white tracking-tight leading-tight">
              Interfaces are code. Systems are architecture.
            </h2>
            <div className="text-zinc-400 font-tech text-xs sm:text-sm leading-relaxed space-y-4 max-w-2xl">
              <p>
                Pursuing electrical engineering at VIT while teaching myself the nuances of full-stack design and ML integrations. I believe that digital platforms should be fast, visually rich, and engineered with absolute structural performance.
              </p>
              <p>
                My focus lies in building clean frontend environments in React and Next.js, scripting Flask/Node REST servers, and collecting telemetry coordinate tracking or computer vision inputs from microcontrollers and camera models.
              </p>
            </div>
          </motion.div>

          {/* Right Column: Architectural value cards */}
          <motion.div 
            className="lg:col-span-5 space-y-4"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {[
              {
                title: 'Full-Stack Layouts',
                desc: 'Frontend design isn\'t just UI components. It is state alignment, request load limits, and performance telemetry. I develop using clean TypeScript interfaces and lightweight bundles.'
              },
              {
                title: 'Edge & Sensor Integrations',
                desc: 'Programming ESP32 and ESP8266 devices to transmit real-time telemetry sensors (air quality, temperature, pose coordinates) over rest endpoints to visual dashboards.'
              },
              {
                title: 'AI Pipelines',
                desc: 'Training and optimizing neural networks using PyTorch, Keras, and TensorFlow for edge deployment, computer vision, and real-time inference pipelines.'
              }
            ].map((pillar, idx) => (
              <div 
                key={idx}
                className="p-5 bg-zinc-950 border border-zinc-800/80 rounded-lg hover:border-zinc-700 transition-all select-none"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                  <h3 className="text-xs font-tech font-bold text-white uppercase tracking-wider">{pillar.title}</h3>
                </div>
                <p className="text-[10px] sm:text-xs font-tech text-zinc-400 leading-relaxed">{pillar.desc}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Timeline trajectories */}
        <div className="pt-12 border-t border-zinc-900">
          <motion.h3 
            className="text-2xl sm:text-4xl font-serif-display font-extrabold text-white text-center mb-10 tracking-tight"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            The trajectory.
          </motion.h3>
          <div className="max-w-4xl mx-auto">
            <Timeline data={timelineData} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
