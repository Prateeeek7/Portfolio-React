// Dark-themed images from Unsplash for projects - optimized for dark backgrounds
export const getProjectImage = (projectTitle: string, category: string): string => {
  const imageMap: Record<string, string> = {
    'World of Cell': 'https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?w=800&q=80&fit=crop&auto=format',
    'Zero Waste Lifestyle': 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&q=80&fit=crop&auto=format',
    'EMS - Environmental Monitoring System': 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80&fit=crop&auto=format',
    'BiomechAI': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80&fit=crop&auto=format',
    'Travelian India': 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&q=80&fit=crop&auto=format',
    'FloatChat - AI-Powered ARGO Ocean Data Analysis': '/projects/floatchat.png',
    'DocuMind - RAG-Powered Document Q&A': '/projects/documind.png',
    'SentimentScope - Social Media Sentiment Analysis': '/projects/sentimentscope.png',
    'Swastify': '/projects/swastify.png',
    'PrepMate': '/projects/prepmate.png',
    'Moodify': '/projects/moodify.png',
    'CaSScade 2025': '/projects/casscade_2025.png',
    'Antex': '/projects/antex.png',
    'Chakra - 3D Educational Visualization': '/projects/chakra.png',
    'Antenna Parameter Calculator': 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&q=80&fit=crop&auto=format',
    'MED-Estation': 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80&fit=crop&auto=format',
    'Human Digital Twinning': 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&q=80&fit=crop&auto=format',
    'Antenna Digital Twin': 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80&fit=crop&auto=format',
    'Veda-AI': '/projects/veda_ai.png',
    'Astraeus': '/projects/astraeus.png',
    'Demeure AI': '/projects/demeure_ai.png',
    'XAI - Trust Lab': '/projects/xai_trust_lab.png',
    'upLIFT': '/projects/uplift_hackwise.png',
    'Munyongo': '/projects/munyongo.png',
    'CaSScade2.O': '/projects/casscade2_0.png',
  };

  // Use specific image if available, otherwise use category-based image
  if (imageMap[projectTitle]) {
    return imageMap[projectTitle];
  }

  // Fallback to category-based dark images with darker themes
  const categoryImages: Record<string, string> = {
    web: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&q=80&fit=crop&auto=format',
    iot: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80&fit=crop&auto=format',
    design: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80&fit=crop&auto=format',
    mobile: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80&fit=crop&auto=format',
    'ai-ml': 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80&fit=crop&auto=format',
  };

  return categoryImages[category] || 'https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=800&q=80&fit=crop&auto=format';
};

// Avatar/Profile image - using local portfolio.png
export const getProfileImage = (): string => {
  return '/portfolio.png';
};

