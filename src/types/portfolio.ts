// ===== TYPE DEFINITIONS =====
export interface ThemeConfig {
  theme: 'light' | 'dark';
  systemPreference: boolean;
}

export interface NavigationItem {
  id: string;
  label: string;
  href: string;
  active?: boolean;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  links: {
    github?: string;
    demo?: string;
    website?: string;
  };
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  period: string;
  description: string;
  current?: boolean;
}

export interface Skill {
  id: string;
  name: string;
  icon: string;
  level: 'Básico' | 'Intermediário' | 'Avançado' | 'Especialista';
  category: 'frontend' | 'backend' | 'tools' | 'other';
}

export interface ContactInfo {
  email: string;
  linkedin: string;
  github: string;
  location: string;
}

export interface PortfolioData {
  personalInfo: {
    name: string;
    title: string;
    description: string;
    avatar: string;
    stats: {
      experience: string;
      projects: string;
      technologies: string;
    };
  };
  navigation: NavigationItem[];
  projects: Project[];
  experiences: Experience[];
  skills: Skill[];
  contact: ContactInfo;
}
