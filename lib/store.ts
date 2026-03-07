import { create } from 'zustand';
import { ResumeDetails, initialResumeState } from './types';

interface ResumeStore {
  data: ResumeDetails;
  updatePersonalDetails: (details: Partial<ResumeDetails['personalDetails']>) => void;
  updateEducation: (education: ResumeDetails['education']) => void;
  updateSkills: (skills: string[]) => void;
  updateProjects: (projects: ResumeDetails['projects']) => void;
  updateTargetJobRole: (role: string) => void;
  updateSummary: (summary: string) => void;
  updateAtsScore: (score: ResumeDetails['atsScore']) => void;
  updateActiveTemplate: (template: ResumeDetails['activeTemplate']) => void;
  setAllData: (data: ResumeDetails) => void;
}

export const useResumeStore = create<ResumeStore>((set) => ({
  data: initialResumeState,
  
  updatePersonalDetails: (details) => 
    set((state) => ({ 
      data: { ...state.data, personalDetails: { ...state.data.personalDetails, ...details } } 
    })),
    
  updateEducation: (education) => 
    set((state) => ({ data: { ...state.data, education } })),
    
  updateSkills: (skills) => 
    set((state) => ({ data: { ...state.data, skills } })),
    
  updateProjects: (projects) => 
    set((state) => ({ data: { ...state.data, projects } })),
    
  updateExperience: (experience: ResumeDetails['experience']) => 
    set((state) => ({ data: { ...state.data, experience } })),
    
  updateTargetJobRole: (role) => 
    set((state) => ({ data: { ...state.data, targetJobRole: role } })),

  updateSummary: (summary) =>
    set((state) => ({ data: { ...state.data, summary } })),

  updateAtsScore: (score) => 
    set((state) => ({ data: { ...state.data, atsScore: score } })),

  updateActiveTemplate: (template) =>
    set((state) => ({ data: { ...state.data, activeTemplate: template } })),

  setAllData: (data) => set({ data }),
}));
