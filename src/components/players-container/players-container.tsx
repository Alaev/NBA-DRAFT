import React, { useEffect, useState } from 'react';
import PlayerList from './players-list/players-list';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { draftPlayersStore, favoritesPlayersStore, playersStore } from '../../store/players-store';
import { URL } from '../../config';
export default function PlayersListContainer() {
  const setPlayers = useSetRecoilState(playersStore);
  const favoritePlayers = useRecoilValue(favoritesPlayersStore);
  const draftPlayers = useRecoilValue(draftPlayersStore);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const playersResponse = async () => {
      const res = await fetch(URL);
      const body = await res.json();

      setPlayers(body.data);
      setIsLoading(false);
    };
    playersResponse();
  }, [setPlayers]);

  return (
    <div className="flex flex-row justify-between">
      <PlayerList players={draftPlayers} isFilterable isLoading={isLoading} />

      <PlayerList players={favoritePlayers} isEditable />
    </div>
  );
}
