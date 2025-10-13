import { TUseFormAdReturn } from './useFormAd';

export type TFormManagement = {
  control: TUseFormAdReturn['formManagement']['control'];
  type: TUseFormAdReturn['formManagement']['type'];
  errors: TUseFormAdReturn['formManagement']['errors'];
  handleSubmit: TUseFormAdReturn['formManagement']['handleSubmit'];
};

export type THandleClickNextStep = () => Promise<void>;

export type THandleStepForm = (step: number) => void;
