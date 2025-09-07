import { useNavigate, useNavigationType } from 'react-router-dom';

import { TypeFormData } from '../../../general/TypeFormData';
import { IDataToDisplay } from '../../../store/adInfoSlice';
import { useDraft } from '../../../hooks/useDraft';
import { deleteAdById } from '../../../api/api-actions';
import { RouterPath } from '../../../router/routerPath';

export const useAdDetails = (dataToDisplay: IDataToDisplay, id: string) => {
  const navigate = useNavigate();
  const initValue = dataToDisplay.data.reduce(
    (acc, el) => {
      const typedKey = el.id as keyof TypeFormData;
      acc[typedKey] = el.value;
      return acc;
    },
    {} as Record<keyof TypeFormData, string | number>,
  ) as TypeFormData;
  const { initEditMode, finishingEditing } = useDraft();

  const navigationType = useNavigationType();
  // useEffect(() => {
  //   if (navigationType === 'POP') {
  //     console.log('POP');

  //     finishingEditing();
  //   }
  // }, [navigationType, finishingEditing]);

  const handleDeleteAd = async () => {
    const controller = new AbortController();
    const signal = controller.signal;
    await deleteAdById(id, signal);
    navigate(RouterPath.List);
  };

  const handleEditAd = () => {
    navigate(RouterPath.Form, { state: { id } });
    initEditMode(initValue);
  };
  return { handleDeleteAd, handleEditAd };
};
