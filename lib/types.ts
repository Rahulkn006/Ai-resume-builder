export interface ResumeDetails {
  personalDetails: {
    fullName: string;
    email: string;
    phone: string;
    linkedin?: string;
    portfolio?: string;
  };
  education: {
    institution: string;
    degree: string;
    startDate: string;
    endDate: string;
    gpa?: string;
    description?: string;
  }[];
  skills: string[];
  projects: {
    name: string;
    description: string;
    technologies: string[];
    link?: string;
  }[];
  experience: {
    company: string;
    role: string;
    startDate: string;
    endDate: string;
    description: string;
  }[];
  targetJobRole: string;
  atsScore?: {
    score: number;
    missingKeywords: string[];
    formattingSuggestions: string[];
    contentSuggestions: string[];
  };
  activeTemplate: 'modern' | 'minimal' | 'corporate' | 'creative' | 'tech' | 'healthcare' | 'finance' | 'executive';
}

export const initialResumeState: ResumeDetails = {
  personalDetails: {
    fullName: '',
    email: '',
    phone: '',
    linkedin: '',
    portfolio: ''
  },
  education: [],
  skills: [],
  projects: [],
  experience: [],
  targetJobRole: '',
  atsScore: undefined,
  activeTemplate: 'modern'
};
