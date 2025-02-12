import { IItem } from "../FormField/formFieldNames";

export function getIdByText(entety: IItem[], text: string) {
  return entety.find((item) => item.text === text)?.id || "";
}
