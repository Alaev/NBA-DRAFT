import React, { useEffect, useState } from 'react';
import { Player } from '../../../types/player';
import PlayerCard from '../players-list-card/players-list-card';
import ColorModal from '../../color-modal/color-modal';
import PlayersListHeader from '../players-list-header/players-list-header';
const INITIAL_UI_COLOR = '#FFF';
interface Props {
  players: Player[];
  isFilterable?: boolean;
  isEditable?: boolean;
  isLoading?: boolean;
  testId?: string;
}

export default React.memo(function PlayersList({
  players,
  isFilterable,
  isEditable,
  isLoading,
  testId,
}: Props) {
  const configuration = { isFilterable, isLoading, isEditable };
  const [uiColor, setUiColor] = useState(INITIAL_UI_COLOR);
  const [filterablePlayers, setFilterablePlayers] = useState(players);
  const [modal, setModal] = useState(false);
  const toggleModal = () => setModal((prev) => !prev);

  useEffect(() => {
    setFilterablePlayers(players);
  }, [players]);

  const filterPlayersByText = (text: string) => {
    if (text === '') {
      return setFilterablePlayers(players);
    }

    const lowerCase = text.toLocaleLowerCase();
    const filteredPlayers: Player[] = players.filter((player: Player) => {
      const foundFirstName = player.first_name
        .toLowerCase()
        .includes(lowerCase);
      const foundLastName = player.last_name.toLowerCase().includes(lowerCase);
      return foundFirstName || foundLastName;
    });

    return setFilterablePlayers(filteredPlayers);
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setUiColor(e.target.value);

  return (
    <div className="relative flex flex-col w-1/2 mx-1 border-2 border-blue-900 shadow-sm rounded-t-md">
      <PlayersListHeader
        configuration={configuration}
        toggleModal={toggleModal}
        filterPlayersByText={filterPlayersByText}
        title="Favorites"
      />

      <div
        className="px-4 overflow-y-auto bg-gray-100 h-96"
        style={{ backgroundColor: isEditable ? uiColor : undefined }}
        data-testid={testId}
      >
        {filterablePlayers.map((player: Player) => (
          <PlayerCard key={player.id} player={player} />
        ))}
      </div>
      {modal && (
        <ColorModal
          value={uiColor}
          onChange={handleColorChange}
          toggle={toggleModal}
        />
      )}
    </div>
  );
});
