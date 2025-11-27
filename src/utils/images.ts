// Dark-themed images from Unsplash for projects - optimized for dark backgrounds
export const getProjectImage = (projectTitle: string, category: string): string => {
  const imageMap: Record<string, string> = {
    'World of Human Cells': 'https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?w=800&q=80&fit=crop&auto=format',
    'Zero Waste Lifestyle': 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&q=80&fit=crop&auto=format',
    'EMS - Environmental Monitoring System': 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80&fit=crop&auto=format',
    'BiomechAI': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80&fit=crop&auto=format',
    'Travelian India': 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&q=80&fit=crop&auto=format',
    'FloatChat - AI-Powered ARGO Ocean Data Analysis': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80&fit=crop&auto=format',
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
  };

  return categoryImages[category] || 'https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=800&q=80&fit=crop&auto=format';
};

// Avatar/Profile image - using local portfolio.png
export const getProfileImage = (): string => {
  return '/portfolio.png';
};

