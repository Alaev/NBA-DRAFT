import React, { useEffect, useState } from 'react';
import { Player } from '../../../types/player';
import PlayerCard from '../player-card/player-card';
import Button from '../../button/button';
import Icon from '../../icon/icon';
import ColorModal from '../../color-modal/color-modal';
import GearIcon from '../../icon/gear-icon';
import Input from '../../input/input';

interface Props {
  players: Player[];
  isFilterable?: boolean;
  isEditable?: boolean;
  isLoading: boolean;
}

export default function FavoritesList({ players, isFilterable, isEditable, isLoading }: Props) {
  const [modal, setModal] = useState(false);
  const [uiColor, setUiColor] = useState('#FFF');
  const [searchTherm, setSearchTherm] = useState('');
  const [filterablePlayers, setFilterablePlayers] = useState(players);

  useEffect(() => {
    setFilterablePlayers((prev) => players);
  }, [players]);

  const filterPlayersByText = (text: string) => {
    if (searchTherm === '') {
      return setFilterablePlayers(players);
    }

    const filteredPlayers: Player[] = players.filter((player: Player) => {
      const foundFirstName = player.first_name.toLowerCase().includes(text);
      const foundLastName = player.last_name.toLowerCase().includes(text);
      return foundFirstName || foundLastName;
    });

    return setFilterablePlayers(filteredPlayers);
  };

  const handleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTherm(() => {
      filterPlayersByText(e.target.value);
      return e.target.value;
    });
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => setUiColor(e.target.value);
  const toggleEdit = () => setModal((prev) => !prev);

  return (
    <div className="relative flex flex-col w-1/2 mx-1 border-2 border-blue-900 shadow-sm rounded-t-md">
      <div className="sticky top-0 h-11 px-4 py-2 bg-yellow-400 border-b-2 border-blue-900 font-medium text-blue-900 uppercase rounded-t-md">
        {isFilterable ? <Input value={searchTherm} onChange={handleFilter} /> : <div> Favorites</div>}
        {isEditable && (
          <>
            <Button
              className="absolute top-1 right-1 bg-blue-900 text-white hover:bg-blue-700 rounded-full  hover:border-yellow-100"
              onClick={toggleEdit}
            >
              <Icon>
                <GearIcon />
              </Icon>
            </Button>

            {modal && <ColorModal value={uiColor} onChange={handleColorChange} toggle={toggleEdit} />}
          </>
        )}
        {isLoading && <div className="absolute top-12 right-3 font-light text-yellow-500">loading...</div>}
      </div>

      <div className="h-96 px-4 overflow-y-auto bg-gray-100" style={{ backgroundColor: isEditable ? uiColor : undefined }}>
        {filterablePlayers.map((player: Player) => (
          <PlayerCard key={player.id} player={player} />
        ))}
      </div>
    </div>
  );
}

FavoritesList.defaultProps = {
  isFilterable: false,
  isEditable: false,
  isLoading: false,
};
