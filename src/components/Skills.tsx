import { motion } from 'framer-motion';
import { 
  SiJavascript, 
  SiTypescript, 
  SiPython, 
  SiCplusplus, 
  SiReact, 
  SiNodedotjs, 
  SiPostgresql, 
  SiDocker, 
  SiFigma, 
  SiPytorch, 
  SiTensorflow, 
  SiKeras,
  SiOpencv,
  SiArduino,
  SiSupabase
} from 'react-icons/si';
import { FaDraftingCompass, FaWaveSquare, FaEye } from 'react-icons/fa';

export const Skills = () => {
  // Skill items mapped into rows just like Ashwin's stack categories
  const sections = [
    {
      id: 'languages',
      label: 'LANGUAGES',
      color: '#00E5FF', // Cyan
      items: [
        { name: 'JavaScript', desc: '(ES6+, async)', icon: SiJavascript, iconColor: '#F7DF1E' },
        { name: 'TypeScript', desc: '(strict types)', icon: SiTypescript, iconColor: '#3178C6' },
        { name: 'Python', desc: '(APIs & data)', icon: SiPython, iconColor: '#3776AB' },
        { name: 'C / C++', desc: '(firmware)', icon: SiCplusplus, iconColor: '#00599C' },
      ],
    },
    {
      id: 'backends',
      label: 'BACKEND & SYSTEMS',
      color: '#D500F9', // Purple
      items: [
        { name: 'React / Next', desc: '(SSR & state)', icon: SiReact, iconColor: '#61DAFB' },
        { name: 'Node.js', desc: '(REST APIs)', icon: SiNodedotjs, iconColor: '#339933' },
        { name: 'Supabase', desc: '(serverless)', icon: SiSupabase, iconColor: '#3ECF8E' },
        { name: 'Postgres / Mongo', desc: '(data stores)', icon: SiPostgresql, iconColor: '#4169E1' },
        { name: 'Docker', desc: '(containers)', icon: SiDocker, iconColor: '#2496ED' },
      ],
    },
    {
      id: 'ai-cog',
      label: 'AI & COGNITIVE',
      color: '#2979FF', // Blue
      items: [
        { name: 'Keras', desc: '(neural networks)', icon: SiKeras, iconColor: '#D00000' },
        { name: 'OpenCV', desc: '(computer vision)', icon: SiOpencv, iconColor: '#5C3EE8' },
        { name: 'YOLO', desc: '(object detection)', icon: FaEye, iconColor: '#00FFCC' },
        { name: 'PyTorch', desc: '(models/networks)', icon: SiPytorch, iconColor: '#EE4C2C' },
        { name: 'TensorFlow', desc: '(deep learning)', icon: SiTensorflow, iconColor: '#FF6F00' },
      ],
    },
    {
      id: 'design',
      label: 'DESIGN & UX',
      color: '#FF9100', // Orange
      items: [
        { name: 'Figma', desc: '(design systems)', icon: SiFigma, iconColor: '#F24E1E' },
        { name: 'UI/UX Design', desc: '(wireframes)', icon: FaDraftingCompass, iconColor: '#9C27B0' },
        { name: 'Prototyping', desc: '(user flows)', icon: SiFigma, iconColor: '#FFEB3B' },
      ],
    },
    {
      id: 'eng-tools',
      label: 'ENGINEERING',
      color: '#00E676', // Green
      items: [
        { name: 'PCB Design', desc: '(KiCad/Multisim)', icon: SiArduino, iconColor: '#00979D' },
        { name: 'Firmware Dev', desc: '(Keil/Arduino)', icon: SiArduino, iconColor: '#00979D' },
        { name: 'EM Simulation', desc: '(CST/FEKO)', icon: FaWaveSquare, iconColor: '#E91E63' },
      ],
    },
  ];

  return (
    <section
      id="skills"
      className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-transparent bg-grid overflow-hidden border-t border-zinc-900"
    >
      <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 sm:gap-16 items-start">
        
        {/* Left Column: Serif statements and mono labels */}
        <div className="lg:col-span-4 space-y-4 text-left select-none">
          <span className="text-[10px] font-tech text-zinc-500 tracking-widest block uppercase">STACK TELEMETRY</span>
          <h2 className="text-4xl sm:text-6xl font-serif-display font-extrabold text-white tracking-tight leading-tight">
            What I run in production.
          </h2>
          <p className="text-zinc-500 font-tech text-[10px] sm:text-xs">
            Profiled in actual code. Not just imported.
          </p>
        </div>

        {/* Right Column: Horizontal categorized lists */}
        <div className="lg:col-span-8 space-y-8 select-none">
          {sections.map((section, secIdx) => (
            <div 
              key={section.id} 
              className={`flex flex-col sm:flex-row gap-4 sm:gap-6 pb-6 border-b border-zinc-900 last:border-b-0 ${secIdx > 0 ? 'pt-2' : ''}`}
            >
              {/* Category Label (Mono vertical block) */}
              <div className="w-full sm:w-32 shrink-0 text-left pt-1">
                <span 
                  className="text-[9px] font-tech font-bold tracking-widest uppercase block"
                  style={{ color: section.color }}
                >
                  {section.label}
                </span>
              </div>

              {/* Items row */}
              <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 gap-6 text-left">
                {section.items.map((item, itemIdx) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={itemIdx}
                      className="flex items-start gap-3 group cursor-pointer"
                      whileHover={{ y: -1 }}
                      transition={{ duration: 0.15 }}
                    >
                      {/* Icon */}
                      <span className="flex h-9 w-9 items-center justify-center rounded bg-zinc-950 border border-zinc-900 group-hover:border-zinc-700 transition-colors shrink-0">
                        <Icon className="text-lg transition-transform duration-300 group-hover:scale-105" style={{ color: item.iconColor }} />
                      </span>
                      {/* Description */}
                      <div className="space-y-0.5">
                        <span className="text-xs font-tech font-bold text-zinc-200 group-hover:text-white transition-colors block leading-none">
                          {item.name}
                        </span>
                        <span className="text-[9px] font-tech text-zinc-500 block leading-none">
                          {item.desc}
                        </span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
