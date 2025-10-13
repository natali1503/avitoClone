import { CategoriesValues } from '../general/FormField/Categories';
import { TypeFormData } from '../general/TypeFormData';

import { getIdFields } from './getIdFields';

export function adaptAdDataToType(dataAd: TypeFormData, newTypeAd: string) {
  const allFieldsId = [...getIdFields(newTypeAd as CategoriesValues), ...getIdFields('commonFields')];
  const tempDraft = allFieldsId.reduce<Record<keyof TypeFormData, string | number | File[]>>(
    (acc, id) => {
      acc[id as keyof TypeFormData] = dataAd?.[id as keyof TypeFormData] ?? '';
      return acc;
    },
    {} as Record<keyof TypeFormData, string | number | File[]>,
  );
  return tempDraft as TypeFormData;
}
