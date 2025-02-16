import { useState, useEffect } from 'react';

import { TypeFormData } from '../general/TypeFormData';

export function useDraft() {
  const key = 'draftAd';
  const [editMode] = useState(() => {
    const editMode = localStorage.getItem('editMode');
    return editMode ? Boolean(JSON.parse(editMode)) : false;
  });
  const [initTypeAd] = useState(() => {
    const initTypeAd = localStorage.getItem('initTypeAd');
    return initTypeAd ? JSON.parse(initTypeAd) : '';
  });
  const [draft, setDraft] = useState<TypeFormData | null>(() => {
    const savedDraft = localStorage.getItem(key);
    return savedDraft ? JSON.parse(savedDraft) : null;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(draft));
  }, [draft]);

  function clearDraft() {
    setDraft(null);
    localStorage.removeItem(key);
  }
  function initEditMode(initValue: TypeFormData) {
    if (initValue) {
      localStorage.setItem('editMode', JSON.stringify(true));
      localStorage.setItem('initTypeAd', JSON.stringify(initValue.type));
      setDraft(initValue);
    }
  }
  function finishingEditing() {
    localStorage.removeItem('editMode');
    localStorage.removeItem('initTypeAd');
    clearDraft();
  }
  return { draft, setDraft, clearDraft, editMode, initEditMode, finishingEditing, initTypeAd };
}
