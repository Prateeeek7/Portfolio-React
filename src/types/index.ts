export interface Skill {
  name: string;
  proficiency: number;
}

export interface Skills {
  technical: Skill[];
  ai: Skill[];
  design: Skill[];
  tools: Skill[];
}

export interface Project {
  id: number;
  title: string;
  category: 'web' | 'iot' | 'design' | 'mobile';
  description: string;
  technologies: string[];
  image: string;
  featured: boolean;
  links: {
    demo?: string;
    github?: string;
  };
}

export interface Experience {
  company: string;
  position: string;
  startDate: string;
  endDate: string | null;
  current: boolean;
  description: string;
  technologies: string[];
}

export interface Education {
  institution: string;
  degree: string;
  field: string;
  startYear: string;
  endYear: string;
  gpa: string;
  current: boolean;
}

export interface Personal {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  bio: string;
}

export interface Social {
  linkedin: string;
  github: string;
  twitter: string;
  dribbble: string;
}

export interface PortfolioData {
  personal: Personal;
  skills: Skills;
  projects: Project[];
  experience: Experience[];
  education: Education[];
  social: Social;
}




