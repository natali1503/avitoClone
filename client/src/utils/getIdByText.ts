import { IItem } from '../general/FormField/formFieldNames';

export function getIdByText(entity: IItem[], text: string) {
  return entity.find((item) => item.text === text)?.id || '';
}
