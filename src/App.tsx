import React from 'react';
import Button from './components/button/button';
import PlayerListContainer from './components/players-section/players-section';


function App() {

  return (
    <div className="App w-1/2 h-screen">
      <header className="App-header"> Application</header>

      <PlayerListContainer />

      <div className="flex flex-row  mt-5 border border-gray-100 p-3 m-1 shadow rounded-md">
        Features:
       <Button className="rounded-full bg-pink-300 hover:bg-pink-500">
         strick
       </Button>
       <Button className="rounded-full bg-blue-300 hover:bg-blue-500">
         lose
       </Button>
      </div>
    </div>
  );
}

export default App;

