import React, { useEffect } from 'react';
import PlayerList from './players-list/players-list';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { draftPlayersStore, favoritesPlayersStore, playersStore } from '../../store/players-store';
import { URL } from '../../config';
export default function PlayersListContainer() {
  const setPlayers = useSetRecoilState(playersStore);
  const favoritePlayers = useRecoilValue(favoritesPlayersStore);
  const draftPlayers = useRecoilValue(draftPlayersStore);

  useEffect(() => {
    const playersResponse = async () => {
      const res = await fetch(URL);
      const body = await res.json();

      setPlayers(body.data);
    };
    playersResponse();
  }, [setPlayers]);

  return (
    <div className="flex flex-row justify-between">
      <PlayerList players={draftPlayers} isFilterable />

      <PlayerList players={favoritePlayers} isEditable />
    </div>
  );
}
