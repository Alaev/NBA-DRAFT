import React from 'react';
import produce from 'immer';
import { useSetRecoilState } from 'recoil';
import { playersStore } from '../../../store/players-store';
import { Player } from '../../../types/player';
import Button from '../../button/button';
import HeartIcon from '../../icon/heart-icon';
import Icon from '../../icon/icon';

interface Props {
  player: Player;
}

export default function PlayerCard({ player }: Props) {
  const { first_name, last_name, favorite } = player;
  const setPlayersStore = useSetRecoilState(playersStore);

  const toggleFavorite = () => {
    setPlayersStore((curr) => {
      const nextState = produce(curr, (draftState) => {
        const draft = draftState.find(({ id }) => id === player.id);
        if (draft) {
          draft.favorite = !player.favorite;
        }
      });
      return nextState;
    });
  };

  const handleFavorite = () => {
    toggleFavorite();
  };

  return (
    <div className="flex px-2 py-4 my-2 border bg-white border-gray-200 hover:border-gray-400 hover:shadow-sm cursor-pointer ">
      {first_name}, {last_name}
      <Button className="ml-auto bg-none" onClick={handleFavorite}>
        <Icon className="shadow-sm hover:shadow-md hover:bg-yellow-400 rounded-full">
          <HeartIcon isFavorite={favorite}></HeartIcon>
        </Icon>
      </Button>
    </div>
  );
}
