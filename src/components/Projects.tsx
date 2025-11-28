import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import type { Project } from '../types';
import { getProjectImage } from '../utils/images';

interface ProjectsProps {
  projects: Project[];
}

const Projects = ({ projects }: ProjectsProps) => {
  const [filter, setFilter] = useState<string>('all');
  const categories = ['all', 'web', 'iot', 'design', 'mobile'];

  const filteredProjects = filter === 'all'
    ? projects.filter(p => p.featured).slice(0, 6) // Show only top 6 featured projects
    : projects.filter(p => p.category === filter);

  return (
    <section id="projects" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-cream-dark dark:bg-black-light">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-center mb-8 sm:mb-12 bg-gradient-primary bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          My Projects
        </motion.h2>

        <motion.div
          className="flex justify-center gap-2 sm:gap-3 mb-8 sm:mb-12 flex-wrap px-2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {categories.map((cat, index) => (
            <motion.button
              key={cat}
              className={`px-4 py-2.5 sm:px-6 sm:py-3 text-sm sm:text-base rounded-full font-semibold transition-all min-h-[44px] touch-manipulation ${
                filter === cat
                  ? 'bg-gradient-primary text-cream shadow-lg shadow-blue/30'
                  : 'bg-cream dark:bg-black border-2 border-blue-light/30 text-black dark:text-cream hover:border-blue'
              }`}
              onClick={() => setFilter(cat)}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </motion.button>
          ))}
        </motion.div>

        <motion.div
                className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8"
          layout
        >
          <AnimatePresence mode="wait">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                className="group bg-cream dark:bg-black rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-blue/20 transition-all flex flex-col"
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -10, scale: 1.02 }}
                layout
              >
                <div className="relative h-64 overflow-hidden">
                  <motion.img
                    src={getProjectImage(project.title, project.category)}
                    alt={project.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  />
                  {/* Desktop hover overlay - hidden on mobile */}
                  <motion.div
                    className="hidden sm:flex absolute inset-0 bg-gradient-primary items-center justify-center gap-6 z-10 pointer-events-none"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 0.95 }}
                    transition={{ duration: 0.3 }}
                  >
                    {project.links.demo && (
                      <motion.a
                        href={project.links.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-14 h-14 bg-cream rounded-full flex items-center justify-center text-blue shadow-lg pointer-events-auto"
                        whileHover={{ scale: 1.15, rotate: 360 }}
                        whileTap={{ scale: 0.9 }}
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ delay: 0.1, type: 'spring' }}
                      >
                        <FaExternalLinkAlt className="text-xl" />
                      </motion.a>
                    )}
                    {project.links.github && (
                      <motion.a
                        href={project.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-14 h-14 bg-cream rounded-full flex items-center justify-center text-blue shadow-lg pointer-events-auto"
                        whileHover={{ scale: 1.15, rotate: 360 }}
                        whileTap={{ scale: 0.9 }}
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ delay: 0.2, type: 'spring' }}
                      >
                        <FaGithub className="text-xl" />
                      </motion.a>
                    )}
                  </motion.div>
                </div>
                
                <div className="p-6">
                  <motion.span
                    className="inline-block px-3 py-1 bg-blue-light/20 dark:bg-blue/30 text-blue dark:text-blue-light rounded-full text-sm font-medium mb-3"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    {project.category}
                  </motion.span>
                  <h3 className="text-2xl font-bold text-black dark:text-cream mb-2">{project.title}</h3>
                  <p className="text-black/70 dark:text-cream/70 mb-4 line-clamp-3">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.slice(0, 4).map((tech, techIndex) => (
                      <motion.span
                        key={tech}
                        className="px-3 py-1 bg-cream-dark dark:bg-black-light rounded-md text-sm text-black dark:text-cream"
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: techIndex * 0.1 + 0.3, type: 'spring' }}
                        whileHover={{ scale: 1.1 }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                  {/* Project Links - Always visible on mobile, hidden on desktop (desktop uses hover overlay on image) */}
                  <div className="flex gap-3 sm:hidden">
                    {project.links.demo && (
                      <motion.a
                        href={project.links.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 px-4 py-2.5 bg-gradient-primary text-cream rounded-full flex items-center justify-center gap-2 shadow-lg font-semibold text-sm"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        <FaExternalLinkAlt className="text-base" />
                        <span>View Project</span>
                      </motion.a>
                    )}
                    {project.links.github && (
                      <motion.a
                        href={project.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 px-4 py-2.5 bg-cream dark:bg-black border-2 border-blue text-blue rounded-full flex items-center justify-center gap-2 shadow-lg font-semibold text-sm"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                      >
                        <FaGithub className="text-base" />
                        <span>GitHub</span>
                      </motion.a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;

