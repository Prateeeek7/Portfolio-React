import { useState } from 'react';
import { motion as framerMotion } from 'framer-motion';

interface NodeData {
  id: string;
  label: string;
  value: string;
  description: string;
  x: number;
  y: number;
}

interface ClusterData {
  name: string;
  color: string;
  glowColor: string;
  nodes: NodeData[];
}

const interClusterLinks = [
  { from: 'fs4', to: 'mm5', color: 'rgba(0, 229, 255, 0.35)' },
  { from: 'ds4', to: 'mm3', color: 'rgba(255, 145, 0, 0.35)' },
  { from: 'ai2', to: 'mm6', color: 'rgba(41, 121, 255, 0.35)' },
  { from: 'hw4', to: 'mm2', color: 'rgba(213, 0, 249, 0.35)' },
  { from: 'ac1', to: 'mm7', color: 'rgba(0, 230, 118, 0.35)' },
  { from: 'fs4', to: 'ds1', color: 'rgba(255, 255, 255, 0.15)' },
  { from: 'fs3', to: 'ai2', color: 'rgba(255, 255, 255, 0.15)' },
  { from: 'ai4', to: 'hw3', color: 'rgba(255, 255, 255, 0.15)' },
  { from: 'hw4', to: 'ac1', color: 'rgba(255, 255, 255, 0.15)' },
  { from: 'ds2', to: 'ac3', color: 'rgba(255, 255, 255, 0.15)' },
];

export const ImpactGraph = () => {
  const [activeNode, setActiveNode] = useState<NodeData | null>(null);
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);

  // Spaced-out coordinates for clusters filling the 1300x700 viewport
  const clusters: ClusterData[] = [
    {
      name: 'MMEW3 STARTUP & STUDIO',
      color: '#FF2A6D', // Neon Pink/Rose
      glowColor: 'rgba(255, 42, 109, 0.4)',
      nodes: [
        { id: 'mm1', label: 'FOUNDER & LEAD DEV', value: 'MMEW3 (mmew3.xyz)', description: 'Founder and Lead Developer of Make me world wide web studio (www.mmew3.xyz), designing custom apps and brand architectures.', x: 650, y: 350 },
        { id: 'mm2', label: 'STUDIO ENGINEERS', value: '6 Team Members', description: 'Coordinated and led a design-engineering team of 6 at MMEW3 delivering bespoke client platforms.', x: 800, y: 380 },
        { id: 'mm3', label: 'DELIVERED SERVICES', value: 'Web, SEO & Brands', description: 'Building high-conversion SEO structures, custom applications, and digital presences at www.mmew3.xyz.', x: 500, y: 380 },
        { id: 'mm4', label: 'CONVERSION METRICS', value: '100% SEO Growth', description: 'Engineered search-engine ranking structures that accelerated client conversions at www.mmew3.xyz.', x: 620, y: 180 },
        { id: 'mm5', label: 'UI/UX DESIGN', value: 'Aesthetic UX', description: 'Crafting high-fidelity mockups, glassmorphic themes, and responsive design systems with standard-setting visuals.', x: 480, y: 250 },
        { id: 'mm6', label: 'DEVELOPMENT STACK', value: 'Vite & React', description: 'Architecting fast web application foundations using Vite, React, and modular styling structures for high-performance frontend delivery.', x: 790, y: 230 },
        { id: 'mm7', label: 'CLIENT SUCCESS', value: '15+ Projects', description: 'Engineered and shipped modern, highly performant software products for international clients and startups.', x: 640, y: 480 },
      ],
    },
    {
      name: 'FULL-STACK SYSTEMS',
      color: '#00E5FF', // Neon Cyan
      glowColor: 'rgba(0, 229, 255, 0.4)',
      nodes: [
        { id: 'fs1', label: 'COMPLETED PROJECTS', value: '10+ Deployed', description: 'Deployed production-ready web and embedded software systems.', x: 160, y: 80 },
        { id: 'fs2', label: 'ARCHITECTURE', value: 'Next.js & React', description: 'Engineered responsive frontends using modern TypeScript and state management.', x: 60, y: 200 },
        { id: 'fs3', label: 'INTEGRATED DBs', value: 'Supabase & Convex', description: 'Real-time database synchronizations and serverless backend pipelines.', x: 280, y: 120 },
        { id: 'fs4', label: 'LATENCY SLO', value: '<300ms Delay', description: 'Maintained low load latency for heavy data visualization dashboards.', x: 160, y: 260 },
      ],
    },
    {
      name: 'AI & INTELLIGENCE',
      color: '#2979FF', // Neon Blue
      glowColor: 'rgba(41, 121, 255, 0.4)',
      nodes: [
        { id: 'ai1', label: 'DEEP LEARNING', value: 'Keras & TensorFlow', description: 'Trained and optimized convolutional neural networks (CNNs) for real-time computer vision models.', x: 1140, y: 80 },
        { id: 'ai2', label: 'IMAGE SEGMENTATION', value: 'U-Net & Mask R-CNN', description: 'Developed custom deep learning architectures for dense pixel-level image masking.', x: 1020, y: 150 },
        { id: 'ai3', label: 'MODEL DEPLOYMENT', value: 'PyTorch & ONNX', description: 'Compiled deep vision models for low-latency edge deployment and video stream processing.', x: 1220, y: 180 },
        { id: 'ai4', label: 'REAL-TIME TRACKING', value: 'YOLOv8 & OpenCV', description: 'Engineered high-frequency object detection, tracking, and spatial coordinate mapping pipelines.', x: 1100, y: 260 },
      ],
    },
    {
      name: 'HARDWARE & IoT',
      color: '#D500F9', // Neon Purple
      glowColor: 'rgba(213, 0, 249, 0.4)',
      nodes: [
        { id: 'hw1', label: 'MICROCONTROLLERS', value: 'ESP32 & ESP8266', description: 'Programmed microcontrollers for environment and pose telemetry sensors.', x: 1140, y: 380 },
        { id: 'hw2', label: 'COMPUTER VISION', value: 'MediaPipe Pose', description: 'Calculated real-time skeletal telemetry coordinates in BiomechAI.', x: 1220, y: 500 },
        { id: 'hw3', label: 'DATA CAPTURE', value: 'Rest API logs', description: 'Designed Flask REST servers to ingest telemetry sensor streams.', x: 1200, y: 280 },
        { id: 'hw4', label: 'FIRMWARE', value: 'C++ & Arduino', description: 'Optimized driver protocols and communication layers for raw sensors.', x: 1050, y: 460 },
      ],
    },
    {
      name: 'DESIGN & LEADERSHIP',
      color: '#FF9100', // Neon Orange
      glowColor: 'rgba(255, 145, 0, 0.4)',
      nodes: [
        { id: 'ds1', label: 'UX FRAMEWORKS', value: 'Figma UI/UX', description: 'Authored interactive wireframes and prototype mockups.', x: 160, y: 480 },
        { id: 'ds2', label: 'CSI SOCIETY', value: 'Senior Member', description: 'Led CSI design domain, mentoring 20+ junior core team members.', x: 300, y: 620 },
        { id: 'ds3', label: 'MOCKUPS', value: '4 Published Apps', description: 'Swastify, PrepMate, Moodify, and CaSScade 2025 figma prototypes.', x: 60, y: 580 },
        { id: 'ds4', label: 'EXPERIENCE', value: 'Jurident Intern', description: 'Spearheaded mobile layouts and interface user research sprints.', x: 260, y: 490 },
      ],
    },
    {
      name: 'ACADEMIC & EXCELLENCE',
      color: '#00E676', // Neon Green
      glowColor: 'rgba(0, 230, 118, 0.4)',
      nodes: [
        { id: 'ac1', label: 'ACADEMICS', value: '9.2 GPA', description: 'Vellore Institute of Technology academic rank telemetry.', x: 780, y: 560 },
        { id: 'ac2', label: 'DEGREE CORE', value: 'ECE VIT', description: 'Electronics and Communication Engineering theory and circuit models.', x: 920, y: 640 },
        { id: 'ac3', label: 'HACKATHONS', value: 'Samsung PRISM', description: 'Developed GenAI multi-agent travel planner, nominated for excellence.', x: 620, y: 620 },
      ],
    },
  ];

  // Flat map of all nodes for easy lookup of coordinates
  const nodeMap = new Map<string, { x: number; y: number; color: string }>();
  clusters.forEach(cluster => {
    cluster.nodes.forEach(node => {
      nodeMap.set(node.id, { x: node.x, y: node.y, color: cluster.color });
    });
  });

  return (
    <div className="relative w-full h-[450px] sm:h-[550px] md:h-[650px] lg:h-[750px] bg-black/40 dark:bg-black/60 rounded-2xl border border-zinc-800/40 p-4 sm:p-6 flex flex-col items-center justify-between select-none overflow-hidden hud-glow">
      <div className="w-full text-center sm:text-left">
        <h3 className="text-[10px] sm:text-xs font-tech text-zinc-500 tracking-widest uppercase">CLUSTER METRIC SYSTEM</h3>
        <p className="text-[8px] sm:text-[10px] font-tech text-zinc-650">TAP/HOVER A POINT - TELEMETRY SCORES VERIFIED AT DESIGN-TIME</p>
      </div>

      <div className="relative w-full flex-1 max-w-[1300px] mt-2 sm:mt-0">
        {/* Constellation SVG layout */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1300 700" preserveAspectRatio="xMidYMid meet">
          {/* Inter-cluster connections with moving data pulses */}
          {interClusterLinks.map((link, idx) => {
            const fromNode = nodeMap.get(link.from);
            const toNode = nodeMap.get(link.to);
            if (!fromNode || !toNode) return null;
            return (
              <g key={`inter-${idx}`}>
                <line
                  x1={fromNode.x}
                  y1={fromNode.y}
                  x2={toNode.x}
                  y2={toNode.y}
                  stroke="#27272a"
                  strokeWidth="0.5"
                  strokeOpacity="0.22"
                  strokeDasharray="4 4"
                />
                
                {/* Translucent inter-cluster data packet pulse */}
                <framerMotion.circle
                  cx={fromNode.x}
                  cy={fromNode.y}
                  r="2"
                  fill={link.color}
                  style={{ filter: `drop-shadow(0 0 4px ${link.color})` }}
                  animate={{
                    cx: [fromNode.x, toNode.x, fromNode.x],
                    cy: [fromNode.y, toNode.y, fromNode.y],
                  }}
                  transition={{
                    duration: 7 + Math.random() * 5,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                />
              </g>
            );
          })}

          {/* Connection paths and animated pulses */}
          {clusters.map((cluster) => (
            <g key={`lines-${cluster.name}`}>
              {/* Internal cluster connections */}
              {cluster.nodes.map((node, i) =>
                cluster.nodes.slice(i + 1).map((nextNode) => (
                  <g key={`${node.id}-${nextNode.id}`}>
                    {/* Connection Line */}
                    <line
                      x1={node.x}
                      y1={node.y}
                      x2={nextNode.x}
                      y2={nextNode.y}
                      stroke={hoveredNodeId === node.id || hoveredNodeId === nextNode.id ? cluster.color : '#27272a'}
                      strokeWidth={hoveredNodeId === node.id || hoveredNodeId === nextNode.id ? 1.2 : 0.6}
                      strokeOpacity={hoveredNodeId === node.id || hoveredNodeId === nextNode.id ? 0.35 : 0.18}
                    />
                    
                    {/* Animated "data packet" pulse travelling along the line */}
                    <framerMotion.circle
                      cx={node.x}
                      cy={node.y}
                      r="2.5"
                      fill={cluster.color}
                      style={{ filter: `drop-shadow(0 0 4px ${cluster.color})` }}
                      animate={{
                        cx: [node.x, nextNode.x, node.x],
                        cy: [node.y, nextNode.y, node.y],
                      }}
                      transition={{
                        duration: 4 + Math.random() * 4,
                        repeat: Infinity,
                        ease: 'linear',
                      }}
                    />
                  </g>
                ))
              )}
            </g>
          ))}

          {/* Central text prompt */}
          <text
            x="650"
            y="370"
            textAnchor="middle"
            fill="rgba(255,255,255,0.12)"
            className="text-[9px] font-tech tracking-wider uppercase animate-pulse"
          >
            {activeNode ? 'CONNECTED SENSOR ACTIVE' : 'TELEMETRY STATUS: WAITING FOR HOVER'}
          </text>

          {/* Nodes */}
          {clusters.map((cluster) => (
            <g key={`nodes-${cluster.name}`}>
              {/* Cluster central label (made larger: text-[11px] and y shifted up) */}
              {cluster.nodes.length > 0 && (
                <text
                  x={cluster.nodes[0].x}
                  y={cluster.nodes[0].y - 30}
                  fill={cluster.color}
                  opacity={0.7}
                  className="text-[11px] font-tech font-bold tracking-widest uppercase"
                >
                  {cluster.name}
                </text>
              )}

              {cluster.nodes.map((node) => (
                <g
                  key={node.id}
                  className="cursor-pointer pointer-events-auto"
                  onMouseEnter={() => {
                    setActiveNode(node);
                    setHoveredNodeId(node.id);
                  }}
                  onMouseLeave={() => {
                    setHoveredNodeId(null);
                  }}
                  onClick={() => {
                    setActiveNode(node);
                    setHoveredNodeId(node.id);
                  }}
                >
                  {/* Outer glow ring on hover (made larger: r=30) */}
                  {hoveredNodeId === node.id && (
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r="30"
                      fill="none"
                      stroke={cluster.color}
                      strokeWidth="1.5"
                      strokeOpacity="0.4"
                      className="animate-ping"
                    />
                  )}

                  {/* Core node dot (resting size from 7 to 10, hover from 10 to 14) */}
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={hoveredNodeId === node.id ? '14' : '10'}
                    fill={hoveredNodeId === node.id ? '#ffffff' : cluster.color}
                    style={{ filter: `drop-shadow(0 0 8px ${cluster.color})` }}
                  />

                  {/* Telemetry value tag (made larger: text-[10px], shifted down to y+26) */}
                  <text
                    x={node.x}
                    y={node.y + 26}
                    textAnchor="middle"
                    fill="#e4e4e7"
                    className="text-[10px] font-tech font-semibold tracking-wide"
                  >
                    {node.value}
                  </text>
                </g>
              ))}
            </g>
          ))}
        </svg>
      </div>

      {/* Floating HUD detail box (enlarged text sizing) */}
      <div className="w-full min-h-[145px] py-4 px-3 sm:px-4 border border-zinc-800/40 bg-zinc-950/60 backdrop-blur-md rounded-lg flex flex-col justify-center items-center text-center max-w-[620px] mt-4 relative z-10 select-none">
        {activeNode ? (
          <framerMotion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="space-y-1.5"
          >
            <div className="text-[11px] font-tech text-cyan-400 uppercase tracking-widest font-bold">
              {activeNode.label}
            </div>
            <div className="text-xl font-serif-display font-extrabold text-white tracking-wide">
              {activeNode.value}
            </div>
            <div className="text-xs font-sans-body text-zinc-300 leading-relaxed max-w-xl mx-auto">
              {activeNode.description}
            </div>
            {/* Clickable link specifically for MMEW3 startup nodes */}
            {activeNode.id.startsWith('mm') && (
              <div className="pt-1 select-none pointer-events-auto">
                <a
                  href="https://www.mmew3.xyz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] font-tech text-pink-400 hover:text-white underline cursor-pointer transition-colors"
                >
                  VISIT STUDIO: WWW.MMEW3.XYZ
                </a>
              </div>
            )}
          </framerMotion.div>
        ) : (
          <div className="text-zinc-500 font-tech text-[11px] tracking-wide animate-pulse">
            PLACE CURSOR OVER AN ACHIEVED METRIC NODE TO MAP ITS TELEMETRY DATA
          </div>
        )}
      </div>
    </div>
  );
};

export default ImpactGraph;
