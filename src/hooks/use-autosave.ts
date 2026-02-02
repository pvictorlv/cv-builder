"use client";

import { useEffect, useRef } from "react";
import { type CVData } from "@/types/cv";
import { saveCVData } from "@/lib/storage";

export function useAutosave(cvData: CVData, delayMs = 1000) {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      saveCVData(cvData);
    }, delayMs);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [cvData, delayMs]);
}
