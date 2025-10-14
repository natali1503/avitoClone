import { screen, within } from '../test-utils';

export class FormAnnouncement {
  static async getInput(labelText: string) {
    const wrapper = await screen.findByLabelText(labelText);
    return wrapper.querySelector('input') as HTMLInputElement;
  }
  static async getSelect(labelText: string) {
    const wrapper = await screen.findByLabelText(labelText);
    return within(wrapper).getByRole('combobox');
  }
  static async getTextarea(labelText: string) {
    return await screen.findByLabelText(labelText);
  }
  static async getName() {
    return this.getInput('Название объявления');
  }
  static async getDescription() {
    return this.getTextarea('Описание объявления');
  }
  static async getLocation() {
    return this.getInput('Локация объявления');
  }
  static async getPhoto() {
    return this.getInput('Фото');
  }
  static async getType() {
    return this.getSelect('Тип объявления');
  }
  static async getNextStepButton() {
    return await screen.getByText('Далее');
  }
  static async getBackStepButton() {
    return await screen.getByText('Назад');
  }
  static async getSubmitButton() {
    return await screen.getByText('Отправить');
  }
  static async getPropertyType() {
    return this.getSelect('Тип недвижимости');
  }
  static async getArea() {
    return this.getInput('Площадь в м\u00B2');
  }
  static async getRooms() {
    return this.getInput('Кол-во комнат');
  }
  static async getPrice() {
    return this.getInput('Цена в рублях');
  }
  static async getBrand() {
    return this.getSelect('Марка автомобиля');
  }
  static async getModel() {
    return this.getInput('Модель автомобиля');
  }
  static async getYear() {
    return this.getInput('Год выпуска');
  }
  static async getMileage() {
    return this.getInput('Пробег в километрах');
  }
  static async getServiceType() {
    return this.getSelect('Тип услуги');
  }
  static async getExperience() {
    return this.getInput('Опыт работы в годах');
  }
  static async getCost() {
    return this.getInput('Стоимость услуги в рублях');
  }
  static async getWorkSchedule() {
    return this.getInput('График работы');
  }
}
