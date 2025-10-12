import { useState, useEffect, useCallback } from 'react';

import { TypeFormData } from '../general/TypeFormData';

export type TDraft = TypeFormData | null;

export type TUseDraftReturn = {
  draft: TDraft;
  setDraft: React.Dispatch<React.SetStateAction<TDraft>>;
  clearDraft: () => void;
};

export const useDraft = (originValueAd?: TypeFormData): TUseDraftReturn => {
  const DRAFT_AD = 'draftAd';

  const [draft, setDraft] = useState<TDraft>(() => {
    const savedDraft = localStorage.getItem(DRAFT_AD);
    if (savedDraft) return JSON.parse(savedDraft);
    else return originValueAd || null;
  });

  useEffect(() => {
    if (draft) {
      localStorage.setItem(DRAFT_AD, JSON.stringify(draft));
    }
  }, [draft]);

  const clearDraft = useCallback(() => {
    localStorage.removeItem(DRAFT_AD);
    setDraft(null);
  }, []);

  return { draft, setDraft, clearDraft };
};
