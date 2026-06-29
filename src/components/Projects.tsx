import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaTimes, FaCheck, FaTimesCircle } from 'react-icons/fa';
import type { Project } from '../types';
import { getProjectImage } from '../utils/images';

interface ProjectsProps {
  projects: Project[];
}

interface CaseStudyDetails {
  metrics: { label: string; value: string }[];
  before: string;
  after: string;
  broken: string;
  solution: string;
}

// Project case studies detail mapper - matching IDs in data.json perfectly
const projectDetailsMap: Record<number, CaseStudyDetails> = {
  1: {
    metrics: [
      { label: 'PWA AUDIT', value: '100%' },
      { label: 'QUERY SPEED', value: '<200ms' },
      { label: 'DATA NODES', value: '700+' },
    ],
    before: 'Static biology textbook illustrations, manual search indexing, zero interactive timelines.',
    after: 'PWA-optimized offline application with vector search and animated biological cell timelines.',
    broken: 'Traditional biology education platforms are flat, dry, and lack contextual intelligence for student cell exploration.',
    solution: 'Designed React platform with local browser cache systems, mapping dynamic biological data nodes and Groq API chatbot answers.',
  },
  2: {
    metrics: [
      { label: 'GEMINI CLASSIFICATION', value: '92%' },
      { label: 'DATABASE LOCKS', value: 'Real-time' },
      { label: 'CLASSIFY LATENCY', value: '0.8s' },
    ],
    before: 'Guesswork on local recycling categories, manual Google lookups, no progress metrics.',
    after: 'Gemini Vision classifies garbage photos instantly, updating impact statistics in a Supabase backend.',
    broken: 'Recycling classification instructions are convoluted and localized. Users abandon sorting due to friction.',
    solution: 'Wired Next.js platform to Google Gemini Vision pipelines, saving user impact stats to Supabase with real-time analytics.',
  },
  3: {
    metrics: [
      { label: 'Telemetry Sensors', value: '4 channels' },
      { label: 'POLL FREQUENCY', value: '5s' },
      { label: 'REST PROTOCOLS', value: 'Flask / REST' },
    ],
    before: 'Manual temperature logs, analog reading, no historical visual dashboards.',
    after: 'ESP8266 telemetry node logs environment data every 5s to a REST Flask server and SQLite backend.',
    broken: 'Industrial environmental telemetry setups are expensive, proprietary, and lack immediate alerts.',
    solution: 'Configured C++ Arduino firmware on ESP8266, routing JSON telemetry frames to Streamlit visuals.',
  },
  4: {
    metrics: [
      { label: 'SKELETAL COORDINATES', value: '33 points' },
      { label: 'FRAME VELOCITY', value: '30 FPS' },
      { label: 'RECO LATENCY', value: '0.2s' },
    ],
    before: 'Manual clinic posture assessment, requiring specialized sensors.',
    after: 'Camera captures 30 FPS skeletal coordinates, translating them to Gemini correction inputs.',
    broken: 'Skeletal telemetry diagnostics require expensive optical suits and proprietary medical hardware.',
    solution: 'Deployed React platform running client-side MediaPipe pose detectors, tracking coordinates dynamically in the browser.',
  },
  5: {
    metrics: [
      { label: 'COMPILING SPEED', value: '10s' },
      { label: 'ORCHESTRATION', value: 'LangChain' },
      { label: 'GEOSPATIAL INDEX', value: 'MongoDB' },
    ],
    before: 'Hours spent browsing mapping websites, compiling itineraries manually.',
    after: 'LangChain multi-agent orchestration generates multi-destination itinerary grids in seconds.',
    broken: 'Travel planning requires combining maps, schedules, and budgets, resulting in decision fatigue.',
    solution: 'Engineered LangChain agent graphs executing Gemini pipelines, Nominated for Samsung PRISM excellence.',
  },
  6: {
    metrics: [
      { label: 'FILES INGESTED', value: '6,514' },
      { label: 'LOCAL RAM BOUND', value: '16GB M4' },
      { label: 'QUERY ROUTER', value: 'RAG-to-SQL' },
    ],
    before: 'Downloading large ocean data arrays, running slow local analytical models.',
    after: 'Memory-efficient chunked pipeline parses files, querying results via conversational SQL.',
    broken: 'Analyzing NetCDF arrays consumes massive memory, causing local laptops to crash under search loads.',
    solution: 'Engineered Python file chunking pipeline, SQLite vector index, and local PyTorch analytical networks.',
  },
  7: {
    metrics: [
      { label: 'VECTOR INDEX', value: 'FAISS' },
      { label: 'ORCHESTRATION', value: 'LangChain' },
      { label: 'INGEST TIME', value: '<2s' },
    ],
    before: 'Sifting through pages of documents manually to find answers.',
    after: 'Upload documents and get instant RAG-powered citations.',
    broken: 'Parsing dense documents is exhausting and time-consuming.',
    solution: 'Developed LangChain RAG pipeline with OpenAI embeddings.'
  },
  8: {
    metrics: [
      { label: 'ACCURACY', value: '94.2%' },
      { label: 'TRANSFORMERS', value: 'BERT' },
      { label: 'LATENCY', value: '80ms' },
    ],
    before: 'Manual reading of customer reviews and feedback datasets.',
    after: 'Real-time classification and dashboard analytics streaming.',
    broken: 'Analyzing sentiment at scale leads to delays and high human error.',
    solution: 'Fine-tuned Hugging Face transformers with custom visualization.'
  },
  9: {
    metrics: [
      { label: 'VECTOR FIDELITY', value: '100% Figma' },
      { label: 'CONTRAST SLO', value: 'WCAG AAA' },
      { label: 'PROTOTYPE NODES', value: '45 flows' },
    ],
    before: 'Rough sketches, whiteboard concepts with layout inconsistencies.',
    after: 'High-fidelity dark-themed design system optimized for mobile healthcare workflows.',
    broken: 'Mobile health platforms suffer from visual clutter, confusing senior patients during layout routing.',
    solution: 'Architected custom Figma components and contrast guidelines for dark-mode clinical UI.',
  },
  10: {
    metrics: [
      { label: 'VECTOR FIDELITY', value: '100% Figma' },
      { label: 'CONTRAST SLO', value: 'WCAG AA' },
      { label: 'PROTOTYPE NODES', value: '30 flows' },
    ],
    before: 'Scattered study notes, disjointed homework timelines.',
    after: 'Sleek study tracking companion focusing on low anxiety visual flows.',
    broken: 'Education dashboards are overwhelming, leading to student study blockages and anxiety.',
    solution: 'Designed simplified workspace screens and dashboard components in Figma.',
  },
  11: {
    metrics: [
      { label: 'VECTOR FIDELITY', value: '100% Figma' },
      { label: 'CONTRAST SLO', value: 'WCAG AAA' },
      { label: 'PROTOTYPE NODES', value: '40 flows' },
    ],
    before: 'Static track playlists, standard music app designs.',
    after: 'Emotion-focused music player mockup with interactive playlist mapping.',
    broken: 'Existing music players ignore user sentiment, forcing manual search scrolling.',
    solution: 'Designed emotion slider UI components and responsive layout schemes in Figma.',
  },
  12: {
    metrics: [
      { label: 'VECTOR FIDELITY', value: '100% Figma' },
      { label: 'PROTOTYPE NODES', value: '15 flows' },
      { label: 'ASSETS AUTHORED', value: '12 vectors' },
    ],
    before: 'No online visual assets, empty marketing grids.',
    after: 'High-tech custom web template mockup for the CaSScade event.',
    broken: 'Academic chapters struggle to attract registrations due to standard, boring layouts.',
    solution: 'Engineered engaging dark futuristic vector mockups and schedules in Figma.',
  },
  13: {
    metrics: [
      { label: 'OPTIMIZATION', value: 'GA / PSO' },
      { label: 'EM SIMULATION', value: 'FDTD' },
      { label: 'REPORTS', value: 'AI PDF' },
    ],
    before: 'Days of manual adjustments in electromagnetic simulators for optimal shapes.',
    after: 'Fast optimization with Smith Chart mapping and automatic PDF report generation.',
    broken: 'Designing microstrip antennas is highly iterative and mathematically complex.',
    solution: 'Engineered GA and PSO algorithm ensembles with Python and FastAPI backend.'
  },
  14: {
    metrics: [
      { label: 'RENDER FRAME', value: '60 FPS' },
      { label: '3D LAYERS', value: '7 chakras' },
      { label: 'TECH DESIGN', value: 'R3F/Three' },
    ],
    before: 'Textbooks explaining chakra points with static, hard-to-visualize graphics.',
    after: 'Interactive 3D model with smooth zoom camera animations and glassmorphic telemetry cards.',
    broken: 'Spiritual anatomy correlations lack interactive visual tools for spatial understanding.',
    solution: 'Designed React Three Fiber interactive scene with modular anatomical markers.'
  },
  15: {
    metrics: [
      { label: 'CALC SPEED', value: 'Instant' },
      { label: 'FORMULAS', value: 'Cavity Model' },
      { label: 'PLATFORM', value: 'Vite React' },
    ],
    before: 'Manual calculation of width, length, and feed points using complex math formulas.',
    after: 'Instant dimensions mapping and parameter calculations in browser.',
    broken: 'RF design calculations are repetitive and prone to manual calculation errors.',
    solution: 'Wired cavity model equations into a fast client-side TypeScript calculator.'
  },
  16: {
    metrics: [
      { label: 'CONTAINERS', value: 'Docker' },
      { label: 'API LATENCY', value: '<50ms' },
      { label: 'DB SHARDS', value: 'Relational' },
    ],
    before: 'Scattered healthcare services running on localized server scripts.',
    after: 'Decoupled dockerized medical backend with production APIs and databases.',
    broken: 'Deploying secure clinical telemetry data scripts requires massive configuration overhead.',
    solution: 'Architected dockerized Python backend with relational schema models.'
  },
  17: {
    metrics: [
      { label: 'PHYSIOLOGY MOD', value: 'Windkessel' },
      { label: 'OCR PARSER', value: 'Tesseract' },
      { label: 'DRUG SEARCH', value: 'RxNorm' },
    ],
    before: 'Manually translating complex cardiology values and medication history.',
    after: 'Hospital-grade patient modeling dashboard with clinical OCR parsing.',
    broken: 'Cardiology recommendations fail to combine mechanistic physiology equations with ML predictions.',
    solution: 'Wired multi-tier Windkessel mechanical models and Tesseract pipelines with FastAPI.'
  },
  18: {
    metrics: [
      { label: 'SURROGATES', value: 'GP Ensembles' },
      { label: 'SAMPLES TRAINED', value: '1000+' },
      { label: 'DB LOGS', value: 'InfluxDB' },
    ],
    before: 'Waiting hours for FDTD simulators to calculate scattering parameters.',
    after: 'Millisecond predictions of VSWR and gain using Gaussian Process surrogate networks.',
    broken: 'Electromagnetic simulations consume massive compute, preventing real-time antenna tuning.',
    solution: 'Built Gaussian Process surrogate model ensembles training on Meep FDTD datasets.'
  },
  19: {
    metrics: [
      { label: 'TEXTS INDEXED', value: '18 Ch / 700 Vs' },
      { label: 'QUERY SPEED', value: '<350ms' },
      { label: 'GEMINI ACCURACY', value: '98.5%' },
    ],
    before: 'Browsing scattered PDFs or manual searches across multiple scriptures with slow citation verification.',
    after: 'Futuristic decoupled digital ashram with RAG guidance engine mapping sacred text telemetry instantly.',
    broken: 'Traditional spiritual scripture websites are archaic, non-interactive, and lack modular context-based intelligence.',
    solution: 'Architected a high-fidelity Cosmic Guidance Portal using Vite, React, and Gemini API to model real-time scripture search.'
  },
  20: {
    metrics: [
      { label: 'POLL FREQUENCY', value: '10ms' },
      { label: 'VECTOR COMPONENT', value: '3D Trajectory' },
      { label: 'INTEGRATOR ERR', value: '<0.01%' },
    ],
    before: 'Standard flight simulation environments with high lag and manual parameter recalculation.',
    after: 'Real-time physical thrust flight trajectory mapping and telemetry visualization dashboard.',
    broken: 'Aerospace calculation setups are proprietary, run on legacy code, and lack interactive visual outputs.',
    solution: 'Engineered Python math engine with Runge-Kutta flight integrator models and real-time Streamlit HUD.'
  },
  21: {
    metrics: [
      { label: 'EVALUATION LATENCY', value: '1.2s' },
      { label: 'VECTORS ACCURACY', value: '95%' },
      { label: 'PROTOTYPE SPECS', value: 'Figma 150-41' },
    ],
    before: 'Static real estate listings, requiring manual market research and spreadsheets.',
    after: 'Intelligent virtual property assistant with predictive valuation grids and visual search matches.',
    broken: 'Traditional real estate listings ignore spatial telemetry and historical campus market data.',
    solution: 'Architected a smart campus webathon recommendation interface combining React, Convex, and Gemini.'
  },
  22: {
    metrics: [
      { label: 'TRUST SCORES', value: 'Composite' },
      { label: 'DETECTION LATENCY', value: '45ms' },
      { label: 'MODEL DRIFT', value: '<2%' },
    ],
    before: 'Standard black-box intrusion detection with zero explainability for security alerts.',
    after: 'Uncertainty-aware threat monitoring HUD showing feature importance values and SHAP analysis.',
    broken: 'Cybersecurity models fail to provide explainable indicators, leading to false alarms and trust issues.',
    solution: 'Built Explainable AI (XAI) composite scoring framework with Python backend and React frontend.'
  },
  23: {
    metrics: [
      { label: 'RISK SCORE', value: '76/100' },
      { label: 'VALIDATION RATE', value: 'Instant' },
      { label: 'GEOSPATIAL GRID', value: 'MongoDB' },
    ],
    before: 'Weeks of manual pitch desk research and database lookups to validate business market fit.',
    after: 'Instant data-backed startup validation dashboard analyzing execution strategies via LLMs.',
    broken: 'Founders suffer from execution anxiety and lack historical startup datasets to de-risk ideas.',
    solution: 'Engineered AI startup validation engine combining Python LangChain agent networks and Gemini.'
  },
  24: {
    metrics: [
      { label: 'PERFORMANCE INDEX', value: '98/100' },
      { label: 'LAYOUT LAYERS', value: 'Glassmorphic' },
      { label: 'ANIMATION ACCURACY', value: '100% Fluid' },
    ],
    before: 'Static corporate template design with clunky scrolling and no interactive elements.',
    after: 'High-fidelity Afro-tech theme dashboard with modular glassmorphic layers and GSAP animations.',
    broken: 'Regional connectivity portals suffer from dry visual design, reducing user interaction.',
    solution: 'Rebuilt Munyongo platform using React, Vite, and custom CSS styling for fluid layout transition.'
  },
  25: {
    metrics: [
      { label: 'PRIZE POOL', value: '$50,000' },
      { label: 'REGISTRATION SPEED', value: 'Real-time' },
      { label: 'CONTAINERS RENDERED', value: 'Fluid Grid' },
    ],
    before: 'Static university hackathon announcement page with boring schedules and tables.',
    after: 'Futuristic hackathon landing page with animated letters and high-contrast glow grids.',
    broken: 'Technical academic events struggle to stand out, failing to grab designer-developer attention.',
    solution: 'Designed "Divs Gone Wild" portal with animated grids and interactive countdown schedules.'
  }
};

const categories = ['web', 'iot', 'ai-ml', 'design'] as const;
const categoryLabels: Record<(typeof categories)[number], string> = {
  web: 'Web Apps',
  iot: 'IoT & Telemetry',
  'ai-ml': 'AI & Machine Learning',
  design: 'Figma Mockups',
};

const Projects = ({ projects }: ProjectsProps) => {
  const [filter, setFilter] = useState<(typeof categories)[number]>('web');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [visibleCount, setVisibleCount] = useState(6);

  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedProject]);

  const filteredProjects = projects.filter(p => p.category === filter);
  const visibleProjects = filteredProjects.slice(0, visibleCount);
  const activeCaseStudy = selectedProject ? projectDetailsMap[selectedProject.id] : null;

  return (
    <section id="projects" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-transparent bg-grid relative overflow-hidden border-t border-zinc-900">
      <div className="absolute top-[10%] left-[5%] w-[350px] h-[350px] rounded-full bg-blue-500/[0.01] blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section title */}
        <div className="text-center space-y-2">
          <span className="text-[10px] font-tech text-zinc-500 tracking-widest block uppercase">SELECTED WORK</span>
          <h2 className="text-3xl sm:text-5xl font-serif-display font-extrabold text-white tracking-tight">
            Systems Case Studies
          </h2>
        </div>

        {/* Tab Filters */}
        <div className="flex justify-center gap-3 select-none flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`px-5 py-2 text-xs font-tech font-bold rounded-full transition-all border ${
                filter === cat
                  ? 'bg-white text-black border-white'
                  : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-500'
              }`}
              onClick={() => {
                setFilter(cat);
                setVisibleCount(6);
              }}
            >
              {categoryLabels[cat]}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleProjects.map((project) => (
            <motion.div
              key={project.id}
              className="group bg-zinc-950 border border-zinc-900 rounded-lg overflow-hidden flex flex-col hover:border-zinc-700 transition-all select-none cursor-pointer"
              onClick={() => setSelectedProject(project)}
              whileHover={{ y: -4 }}
              layoutId={`proj-card-${project.id}`}
            >
              {/* Image Frame */}
              <div className="relative h-48 overflow-hidden bg-zinc-900 border-b border-zinc-900">
                <img
                  src={getProjectImage(project.title, project.category)}
                  alt={project.title}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                />
              </div>

              {/* Title ONLY - Hiding description and tech stack in closed state */}
              <div className="p-5 text-center flex items-center justify-center min-h-[70px]">
                <h3 className="text-xs font-tech font-bold text-white uppercase group-hover:text-cyan-400 transition-colors tracking-widest leading-normal">
                  {project.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Load More Button */}
        {filteredProjects.length > visibleCount && (
          <div className="flex justify-center pt-4">
            <button
              onClick={() => setVisibleCount((prev) => prev + 6)}
              className="px-6 py-2.5 bg-zinc-950 hover:bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-white text-[10px] font-tech font-bold rounded-lg transition-all uppercase tracking-widest select-none cursor-pointer flex items-center gap-1.5"
            >
              <span>Load More Projects</span>
              <span className="text-[8px] animate-bounce">▼</span>
            </button>
          </div>
        )}
      </div>

      {/* Case Study Detail Drawer (Overlay) */}
      <AnimatePresence>
        {selectedProject && activeCaseStudy && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black z-50 pointer-events-auto"
              onClick={() => setSelectedProject(null)}
            />

            {/* Case Study Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 26, stiffness: 200 }}
              className="fixed top-0 right-0 h-screen w-full sm:max-w-2xl bg-zinc-950 border-l border-zinc-800/80 z-50 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto pointer-events-auto"
            >
              <div className="space-y-8">
                {/* Header: Back CTA */}
                <div className="flex justify-between items-center">
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="text-[10px] font-tech text-zinc-500 hover:text-white transition-colors flex items-center gap-1.5 uppercase"
                  >
                    <FaTimes />
                    BACK TO WORK
                  </button>
                  <span className="text-[9px] font-tech text-zinc-600 uppercase">CASE STUDY TELEMETRY</span>
                </div>

                {/* Main titles */}
                <div className="space-y-2">
                  <span className="text-[9px] font-tech text-cyan-400 tracking-wider uppercase block">
                    {selectedProject.category.toUpperCase()} DELIVERY
                  </span>
                  <h3 className="text-2xl sm:text-4xl font-serif-display font-bold text-white leading-tight">
                    {selectedProject.title}
                  </h3>
                  <p className="text-[11px] sm:text-xs font-tech text-zinc-400 leading-relaxed max-w-xl">
                    {selectedProject.description}
                  </p>
                  {/* Tech stack inside drawer */}
                  <div className="flex flex-wrap gap-1.5 pt-3">
                    {selectedProject.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-0.5 bg-zinc-900 border border-zinc-800 rounded text-[9px] font-tech text-zinc-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Metrics highlights row */}
                <div className="grid grid-cols-3 gap-3 border-t border-b border-zinc-900 py-6 text-left select-none">
                  {activeCaseStudy.metrics.map((metric) => (
                    <div key={metric.label}>
                      <span className="text-[8px] sm:text-[9px] font-tech text-zinc-500 tracking-widest block uppercase">
                        {metric.label}
                      </span>
                      <span className="text-sm sm:text-lg font-serif-display font-bold text-cyan-400">
                        {metric.value}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Incident post-mortem: Challenge vs Solution */}
                <div className="space-y-5">
                  <div className="space-y-2">
                    <span className="text-[10px] font-tech text-zinc-500 tracking-wider uppercase block">
                      WHAT WAS ACTUALLY BROKEN
                    </span>
                    <p className="text-[11px] sm:text-xs font-tech text-zinc-400 leading-relaxed bg-zinc-950 border border-zinc-900 p-4 rounded-lg flex gap-2">
                      <FaTimesCircle className="text-red-500 mt-0.5 shrink-0" />
                      <span>{activeCaseStudy.broken}</span>
                    </p>
                  </div>
                  <div className="space-y-2">
                    <span className="text-[10px] font-tech text-zinc-500 tracking-wider uppercase block">
                      HOW IT WAS ENGINEERED
                    </span>
                    <p className="text-[11px] sm:text-xs font-tech text-zinc-400 leading-relaxed bg-zinc-950 border border-zinc-900 p-4 rounded-lg flex gap-2">
                      <FaCheck className="text-emerald-500 mt-0.5 shrink-0" />
                      <span>{activeCaseStudy.solution}</span>
                    </p>
                  </div>
                </div>

                {/* Before vs After specs comparison */}
                <div className="grid grid-cols-2 gap-4 border-t border-zinc-900 pt-6">
                  <div className="space-y-1 text-left">
                    <span className="text-[9px] font-tech text-zinc-500 block tracking-widest uppercase">BEFORE</span>
                    <p className="text-[10px] sm:text-xs font-tech text-zinc-400 leading-relaxed">{activeCaseStudy.before}</p>
                  </div>
                  <div className="space-y-1 text-left">
                    <span className="text-[9px] font-tech text-cyan-400 block tracking-widest uppercase">AFTER</span>
                    <p className="text-[10px] sm:text-xs font-tech text-zinc-300 leading-relaxed">{activeCaseStudy.after}</p>
                  </div>
                </div>
              </div>

              {/* Footer action buttons */}
              <div className="flex gap-3 border-t border-zinc-900 pt-6 mt-8">
                {selectedProject.links.demo && (
                  <a
                    href={selectedProject.links.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 px-4 py-2.5 bg-white hover:bg-zinc-200 text-black text-xs font-tech font-bold rounded-lg flex items-center justify-center gap-1.5 transition-colors select-none"
                  >
                    <FaExternalLinkAlt />
                    VIEW DEPLOYMENT
                  </a>
                )}
                {selectedProject.links.github && (
                  <a
                    href={selectedProject.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 px-4 py-2.5 bg-zinc-950 border border-zinc-800 hover:border-zinc-650 text-white text-xs font-tech font-bold rounded-lg flex items-center justify-center gap-1.5 transition-colors select-none"
                  >
                    <FaGithub />
                    GITHUB REPO
                  </a>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
