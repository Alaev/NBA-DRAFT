import React from 'react';
import PlayersListContainer from './components/players-container/players-container';

function App() {
  return (
    <div className="w-1/2 mx-auto">
      <header className="px-4 py-6 mx-1 mt-12 mb-4 text-6xl text-center uppercase bg-blue-900 border border-yellow-500 rounded-lg text-gray-50">
        nba draft
      </header>
      <PlayersListContainer />
    </div>
  );
}

export default App;
