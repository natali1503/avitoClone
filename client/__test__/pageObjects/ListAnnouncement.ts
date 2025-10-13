import { screen } from '../test-utils';

export class ListAnnouncement {
  static async getCreatingAdButton() {
    return await screen.findByText('Разместить объявление');
  }
}
