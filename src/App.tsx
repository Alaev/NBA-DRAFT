import React from 'react';
import PlayersListContainer from './components/players-container/players-container';

function App() {
  return (
    <div className="mx-auto w-1/2">
      <header className="bg-blue-900 text-gray-50 px-4 py-6 mx-1 mt-12 mb-4 border border-yellow-500 uppercase rounded-lg text-center text-6xl">
        nba draft
      </header>
      <PlayersListContainer />
    </div>
  );
}

export default App;
