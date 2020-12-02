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

export default React.memo(function PlayerCard({ player }: Props) {
  const {
    first_name,
    last_name,
    favorite,
    height_feet,
    weight_pounds,
    position,
    team,
  } = player;
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
    <div className="flex flex-row p-4 my-2 bg-white border border-gray-200 cursor-pointer hover:border-gray-400 hover:shadow-sm ">
      <div className="w-full">
        <div className="flex mb-2 text-blue-900 space-x-14">
          <p>
            {' '}
            {first_name}, {last_name}{' '}
          </p>
          <p className="text-black">
            Team: <span className="text-blue-900">{team.name}</span>
          </p>
        </div>
        <div className="flex space-x-8">
          <p>
            Height:{' '}
            <span className="text-yellow-500">{height_feet || '-'}</span>{' '}
          </p>
          <p>
            Wight:{' '}
            <span className="text-yellow-500">{weight_pounds || '-'}</span>
          </p>
          <p>
            Position: <span className="text-yellow-500">{position}</span>
          </p>
        </div>
      </div>
      <Button className="ml-auto bg-none" onClick={handleFavorite}>
        <Icon className="rounded-full shadow-sm hover:shadow-md hover:bg-yellow-400">
          <HeartIcon isFavorite={favorite}></HeartIcon>
        </Icon>
      </Button>
    </div>
  );
});
