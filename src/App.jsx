'use strict';

import { useState } from 'react'

import GamesContainer from './Components/GamesContainer/GamesContainer'
import Modes from './Components/Modes/Modes';

import gameDb from './Data/gameDb.js';


function App() {


  const [games,setGames] = useState(gameDb);
  const [selectMode, setSelectMode] = useState('add');
  const [editGame,setEditGame] = useState({});

  return (
    <>
    <div className="configuration">

      <Modes
      games={games}
      setGames={setGames}
      selectMode={selectMode}
      setSelectMode={setSelectMode}
      editGame={editGame}
      setEditGame={setEditGame}
      />

    </div>

    <GamesContainer
    games={games}
    editGame={editGame}
    setGames={setGames}
    setSelectMode={setSelectMode}
    setEditGame={setEditGame}
    />
    </>
  )
}

export default App
