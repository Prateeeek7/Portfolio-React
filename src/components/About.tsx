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
  // Get featured projects for timeline
  const featuredProjects = projects.filter(p => p.featured).slice(0, 4);

  const timelineData = [
    {
      title: experience[0]?.current ? experience[0].startDate : "2024",
      content: (
        <div>
          <p className="mb-6 text-sm font-normal text-black/70 dark:text-cream/70 leading-relaxed">
            {experience[0]?.description || "Leading design initiatives and mentoring members in UI/UX design."}
          </p>
          <div className="space-y-4">
            {experience[0] && (
              <div className="flex items-start gap-3 p-4 bg-cream dark:bg-black-light rounded-lg">
                <div className="mt-1">
                  <div className="h-3 w-3 rounded-full bg-blue dark:bg-blue-light" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-black dark:text-cream mb-1">{experience[0].position}</h4>
                  <p className="text-sm text-blue/80 dark:text-blue-light/80 mb-2">{experience[0].company}</p>
                  {experience[0].technologies && experience[0].technologies.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {experience[0].technologies.slice(0, 5).map((tech, idx) => (
                        <span key={idx} className="px-2 py-1 text-xs bg-blue-light/20 dark:bg-blue/30 rounded text-black dark:text-cream">
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
            {experience[1] && (
              <div className="flex items-start gap-3 p-4 bg-cream dark:bg-black-light rounded-lg">
                <div className="mt-1">
                  <div className="h-3 w-3 rounded-full bg-blue dark:bg-blue-light" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-black dark:text-cream mb-1">{experience[1].position}</h4>
                  <p className="text-sm text-blue/80 dark:text-blue-light/80 mb-2">{experience[1].company}</p>
                  {experience[1].technologies && experience[1].technologies.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {experience[1].technologies.slice(0, 5).map((tech, idx) => (
                        <span key={idx} className="px-2 py-1 text-xs bg-blue-light/20 dark:bg-blue/30 rounded text-black dark:text-cream">
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      ),
    },
    {
      title: "2024 - Projects & Achievements",
      content: (
        <div>
          <p className="mb-6 text-sm font-normal text-black/70 dark:text-cream/70 leading-relaxed">
            Built and launched multiple innovative projects combining AI, IoT, and web technologies. 
            Developed full-stack applications with modern frameworks and cutting-edge AI integration.
          </p>
          <div className="mb-6 space-y-3">
            <div className="flex items-center gap-2 text-sm text-black dark:text-cream">
              <span className="text-blue dark:text-blue-light">✅</span>
              <span>Developed 6+ production-ready projects</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-black dark:text-cream">
              <span className="text-blue dark:text-blue-light">✅</span>
              <span>Integrated AI/ML models (OpenAI, Gemini, LangChain)</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-black dark:text-cream">
              <span className="text-blue dark:text-blue-light">✅</span>
              <span>Built IoT systems with ESP32/ESP8266</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-black dark:text-cream">
              <span className="text-blue dark:text-blue-light">✅</span>
              <span>Participated in Samsung PRISM GenAI Hackathon 2025</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-black dark:text-cream">
              <span className="text-blue dark:text-blue-light">✅</span>
              <span>Open-source contributions on GitHub</span>
            </div>
          </div>
          {featuredProjects.length > 0 && (
            <div className="grid grid-cols-2 gap-4 mt-6">
              {featuredProjects.slice(0, 4).map((project, idx) => (
                <motion.div
                  key={project.id}
                  className="relative group"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <img
                    src={getProjectImage(project.title, project.category)}
                    alt={project.title}
                    className="h-28 w-full rounded-lg object-cover shadow-lg group-hover:shadow-xl transition-shadow"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                    <p className="text-white text-xs font-medium truncate w-full">{project.title}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      ),
    },
    {
      title: education[0] ? `${education[0].startYear} - ${education[0].endYear}` : "2024 - 2028",
      content: (
        <div>
          <p className="mb-6 text-sm font-normal text-black/70 dark:text-cream/70 leading-relaxed">
            {education[0] ? (
              <>
                Pursuing <strong>{education[0].degree} in {education[0].field}</strong> at {education[0].institution}. 
                Maintaining a GPA of {education[0].gpa}/10 while actively participating in technical societies and building projects.
              </>
            ) : (
              "Pursuing higher education while building innovative projects and gaining practical experience."
            )}
          </p>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-cream dark:bg-black-light rounded-lg">
              <span className="text-2xl">🎓</span>
              <div>
                <p className="font-semibold text-black dark:text-cream text-sm">{education[0]?.institution || "Vellore Institute of Technology"}</p>
                <p className="text-xs text-black/60 dark:text-cream/60">{education[0]?.degree || "Bachelor of Technology"}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-cream dark:bg-black-light rounded-lg">
              <span className="text-2xl">⭐</span>
              <div>
                <p className="font-semibold text-black dark:text-cream text-sm">Academic Excellence</p>
                <p className="text-xs text-black/60 dark:text-cream/60">GPA: {education[0]?.gpa || "9.2"}/10</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-cream dark:bg-black-light rounded-lg">
              <span className="text-2xl">🔬</span>
              <div>
                <p className="font-semibold text-black dark:text-cream text-sm">Technical Societies</p>
                <p className="text-xs text-black/60 dark:text-cream/60">Active member in CSI - Design Domain</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-cream dark:bg-black-light rounded-lg">
              <span className="text-2xl">💡</span>
              <div>
                <p className="font-semibold text-black dark:text-cream text-sm">Continuous Learning</p>
                <p className="text-xs text-black/60 dark:text-cream/60">AI/ML, Full-Stack Development, IoT</p>
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 bg-cream dark:bg-black">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-center mb-4 bg-gradient-primary bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          My Journey
        </motion.h2>
        
        <motion.p
          className="text-center text-lg text-black/70 dark:text-cream/70 mb-16 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          A timeline of my professional growth, achievements, and the projects that shaped my career
        </motion.p>

        <div className="max-w-4xl mx-auto">
          <Timeline data={timelineData} />
        </div>
      </div>
    </section>
  );
};

export default About;



