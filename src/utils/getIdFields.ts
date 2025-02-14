import { CategoriesValues } from '../general/FormField/Categories';
import {
  CommonFields,
  FieldsByType,
} from '../general/FormField/formFieldNames';

export function getIdFields(type: CategoriesValues | 'commonFields') {
  let id: string[] | null = null;
  if (type === 'commonFields') id = CommonFields.map((el) => el.id);
  else {
    const additionalFieldsByType = FieldsByType[type];
    id = additionalFieldsByType.map((el) => el.id);
  }

  return id;
}
