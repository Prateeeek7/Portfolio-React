import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import type { Skills } from '../types';

interface SkillsProps {
  skills: Skills;
}

const Skills = ({ skills }: SkillsProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const categories = [
    { name: 'Technical', icon: '💻', skills: skills.technical },
    { name: 'AI/ML', icon: '🤖', skills: skills.ai },
    { name: 'Design', icon: '🎨', skills: skills.design },
    { name: 'Tools', icon: '🛠️', skills: skills.tools },
  ];

  return (
    <section id="skills" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-cream dark:bg-black" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.h2
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-center mb-10 sm:mb-16 bg-gradient-primary bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          Skills & Expertise
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {categories.map((category, catIndex) => (
            <motion.div
              key={category.name}
              className="bg-cream-dark dark:bg-black-light p-4 sm:p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all min-h-[350px] sm:min-h-[400px]"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: catIndex * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <h3 className="text-xl font-bold text-black dark:text-cream mb-6 flex items-center gap-2">
                <span className="text-2xl">{category.icon}</span>
                {category.name} Skills
              </h3>
              <div className="space-y-5">
                {category.skills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    className="space-y-2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: catIndex * 0.1 + index * 0.05 }}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-black dark:text-cream">{skill.name}</span>
                      <span className="text-blue dark:text-blue-light font-bold">{skill.proficiency}%</span>
                    </div>
                    <div className="w-full h-2 bg-cream dark:bg-black rounded-full overflow-hidden relative">
                      <motion.div
                        className="h-full bg-gradient-primary rounded-full relative overflow-hidden"
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${skill.proficiency}%` } : {}}
                        transition={{ 
                          delay: catIndex * 0.1 + index * 0.05, 
                          duration: 1,
                          type: 'spring',
                          stiffness: 100
                        }}
                      >
                        {/* Animated flowing gradient background */}
                        <motion.div
                          className="absolute inset-0 rounded-full"
                          animate={{
                            backgroundPosition: ['0% 0%', '200% 0%'],
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: 'linear',
                          }}
                          style={{
                            background: 'linear-gradient(90deg, #4A70A9 0%, #8FABD4 25%, #4A70A9 50%, #8FABD4 75%, #4A70A9 100%)',
                            backgroundSize: '200% 100%',
                            width: '100%',
                            height: '100%',
                          }}
                        />
                        {/* Flowing shimmer overlay */}
                        <motion.div
                          className="absolute inset-0 rounded-full"
                          animate={{
                            x: ['-100%', '200%'],
                          }}
                          transition={{
                            duration: 2.5,
                            repeat: Infinity,
                            ease: 'linear',
                            delay: index * 0.15,
                          }}
                          style={{
                            width: '50%',
                            height: '100%',
                            background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent)',
                          }}
                        />
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;



