import React from 'react';
import { useSetRecoilState } from 'recoil';
import { playersStore } from '../../../store/players-store';
import { Player } from '../../../types/player';
import Button from '../../button/button';
import HeartIcon from '../../icon/heart-icon';
import Icon from '../../icon/icon';
import immer from 'immer';

interface Props {
  player: Player;
}

export default function PlayerCard({ player }: Props) {
  const { first_name, last_name, favorite } = player;
  const setPlayersStore = useSetRecoilState(playersStore);

  const toggleFavorite = () => {
    setPlayersStore((curr) => {
      const updateFavorite = { ...player, favorite: !player.favorite };

      const newState = [...curr.filter(({ id }) => id !== player.id)];

      return [...newState, updateFavorite];
    });
  };

  const handleFavorite = () => {
    toggleFavorite();
  };

  return (
    <div className="flex px-2 py-4 my-2 border bg-white border-gray-200 hover:border-gray-400 hover:shadow-sm cursor-pointer ">
      {first_name}, {last_name}
      <Button className="ml-auto bg-none" onClick={handleFavorite}>
        <Icon>
          <HeartIcon isFavorite={favorite}></HeartIcon>
        </Icon>
      </Button>
    </div>
  );
}
