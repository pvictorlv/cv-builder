"use client";

import { useReducer, useCallback } from "react";
import {
  type CVData,
  type ContactInfo,
  type ProfessionalSummary,
  type WorkExperienceItem,
  type EducationItem,
  type CertificationItem,
  type LanguageItem,
  EMPTY_CV_DATA,
} from "@/types/cv";

type Action =
  | { type: "SET_ALL"; payload: CVData }
  | { type: "SET_CONTACT"; payload: Partial<ContactInfo> }
  | { type: "SET_SUMMARY"; payload: string }
  | { type: "ADD_WORK"; payload: WorkExperienceItem }
  | { type: "UPDATE_WORK"; payload: { id: string; data: Partial<WorkExperienceItem> } }
  | { type: "REMOVE_WORK"; payload: string }
  | { type: "REORDER_WORK"; payload: { fromIndex: number; toIndex: number } }
  | { type: "ADD_EDUCATION"; payload: EducationItem }
  | { type: "UPDATE_EDUCATION"; payload: { id: string; data: Partial<EducationItem> } }
  | { type: "REMOVE_EDUCATION"; payload: string }
  | { type: "SET_SKILLS"; payload: string[] }
  | { type: "ADD_CERTIFICATION"; payload: CertificationItem }
  | { type: "UPDATE_CERTIFICATION"; payload: { id: string; data: Partial<CertificationItem> } }
  | { type: "REMOVE_CERTIFICATION"; payload: string }
  | { type: "ADD_LANGUAGE"; payload: LanguageItem }
  | { type: "UPDATE_LANGUAGE"; payload: { id: string; data: Partial<LanguageItem> } }
  | { type: "REMOVE_LANGUAGE"; payload: string };

function cvReducer(state: CVData, action: Action): CVData {
  switch (action.type) {
    case "SET_ALL":
      return action.payload;

    case "SET_CONTACT":
      return {
        ...state,
        contactInfo: { ...state.contactInfo, ...action.payload },
      };

    case "SET_SUMMARY":
      return {
        ...state,
        professionalSummary: { summary: action.payload },
      };

    case "ADD_WORK":
      return {
        ...state,
        workExperience: {
          items: [action.payload, ...state.workExperience.items],
        },
      };

    case "UPDATE_WORK":
      return {
        ...state,
        workExperience: {
          items: state.workExperience.items.map((item) =>
            item.id === action.payload.id
              ? { ...item, ...action.payload.data }
              : item,
          ),
        },
      };

    case "REMOVE_WORK":
      return {
        ...state,
        workExperience: {
          items: state.workExperience.items.filter((item) => item.id !== action.payload),
        },
      };

    case "REORDER_WORK": {
      const { fromIndex, toIndex } = action.payload;
      const items = [...state.workExperience.items];
      const [moved] = items.splice(fromIndex, 1);
      items.splice(toIndex, 0, moved);
      return {
        ...state,
        workExperience: { items },
      };
    }

    case "ADD_EDUCATION":
      return {
        ...state,
        education: {
          items: [...state.education.items, action.payload],
        },
      };

    case "UPDATE_EDUCATION":
      return {
        ...state,
        education: {
          items: state.education.items.map((item) =>
            item.id === action.payload.id
              ? { ...item, ...action.payload.data }
              : item,
          ),
        },
      };

    case "REMOVE_EDUCATION":
      return {
        ...state,
        education: {
          items: state.education.items.filter((item) => item.id !== action.payload),
        },
      };

    case "SET_SKILLS":
      return {
        ...state,
        skills: { items: action.payload },
      };

    case "ADD_CERTIFICATION":
      return {
        ...state,
        certifications: {
          items: [...state.certifications.items, action.payload],
        },
      };

    case "UPDATE_CERTIFICATION":
      return {
        ...state,
        certifications: {
          items: state.certifications.items.map((item) =>
            item.id === action.payload.id
              ? { ...item, ...action.payload.data }
              : item,
          ),
        },
      };

    case "REMOVE_CERTIFICATION":
      return {
        ...state,
        certifications: {
          items: state.certifications.items.filter((item) => item.id !== action.payload),
        },
      };

    case "ADD_LANGUAGE":
      return {
        ...state,
        languages: {
          items: [...state.languages.items, action.payload],
        },
      };

    case "UPDATE_LANGUAGE":
      return {
        ...state,
        languages: {
          items: state.languages.items.map((item) =>
            item.id === action.payload.id
              ? { ...item, ...action.payload.data }
              : item,
          ),
        },
      };

    case "REMOVE_LANGUAGE":
      return {
        ...state,
        languages: {
          items: state.languages.items.filter((item) => item.id !== action.payload),
        },
      };

    default:
      return state;
  }
}

export function useCvForm(initialData: CVData = EMPTY_CV_DATA) {
  const [cvData, dispatch] = useReducer(cvReducer, initialData);

  const setAll = useCallback((data: CVData) => {
    dispatch({ type: "SET_ALL", payload: data });
  }, []);

  const setContact = useCallback((data: Partial<ContactInfo>) => {
    dispatch({ type: "SET_CONTACT", payload: data });
  }, []);

  const setSummary = useCallback((summary: string) => {
    dispatch({ type: "SET_SUMMARY", payload: summary });
  }, []);

  const addWork = useCallback((item: WorkExperienceItem) => {
    dispatch({ type: "ADD_WORK", payload: item });
  }, []);

  const updateWork = useCallback((id: string, data: Partial<WorkExperienceItem>) => {
    dispatch({ type: "UPDATE_WORK", payload: { id, data } });
  }, []);

  const removeWork = useCallback((id: string) => {
    dispatch({ type: "REMOVE_WORK", payload: id });
  }, []);

  const reorderWork = useCallback((fromIndex: number, toIndex: number) => {
    dispatch({ type: "REORDER_WORK", payload: { fromIndex, toIndex } });
  }, []);

  const addEducation = useCallback((item: EducationItem) => {
    dispatch({ type: "ADD_EDUCATION", payload: item });
  }, []);

  const updateEducation = useCallback((id: string, data: Partial<EducationItem>) => {
    dispatch({ type: "UPDATE_EDUCATION", payload: { id, data } });
  }, []);

  const removeEducation = useCallback((id: string) => {
    dispatch({ type: "REMOVE_EDUCATION", payload: id });
  }, []);

  const setSkills = useCallback((items: string[]) => {
    dispatch({ type: "SET_SKILLS", payload: items });
  }, []);

  const addCertification = useCallback((item: CertificationItem) => {
    dispatch({ type: "ADD_CERTIFICATION", payload: item });
  }, []);

  const updateCertification = useCallback((id: string, data: Partial<CertificationItem>) => {
    dispatch({ type: "UPDATE_CERTIFICATION", payload: { id, data } });
  }, []);

  const removeCertification = useCallback((id: string) => {
    dispatch({ type: "REMOVE_CERTIFICATION", payload: id });
  }, []);

  const addLanguage = useCallback((item: LanguageItem) => {
    dispatch({ type: "ADD_LANGUAGE", payload: item });
  }, []);

  const updateLanguage = useCallback((id: string, data: Partial<LanguageItem>) => {
    dispatch({ type: "UPDATE_LANGUAGE", payload: { id, data } });
  }, []);

  const removeLanguage = useCallback((id: string) => {
    dispatch({ type: "REMOVE_LANGUAGE", payload: id });
  }, []);

  return {
    cvData,
    setAll,
    setContact,
    setSummary,
    addWork,
    updateWork,
    removeWork,
    reorderWork,
    addEducation,
    updateEducation,
    removeEducation,
    setSkills,
    addCertification,
    updateCertification,
    removeCertification,
    addLanguage,
    updateLanguage,
    removeLanguage,
  };
}
