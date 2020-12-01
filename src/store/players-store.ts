import { atom, selector } from 'recoil';
import { Player } from '../types/player';

export const playersStore = atom({
  key: 'players',
  default: [] as Player[],
});

export const favoritesPlayersStore = selector({
  key: 'favoritesPlayersStore',
  get: ({ get }) => {
        const players: Player[] = get(playersStore);
        return players.filter(player => player.favorite);
      },
});

export const draftPlayersStore = selector({
  key: 'draftPlayersStore',
  get: ({ get }) => {
        const players: Player[] = get(playersStore);
        return players.filter(player => !player.favorite);
      },
});
