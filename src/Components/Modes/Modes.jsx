import React, { useState } from 'react'
import AddGame from '../AddGame/AddGame';
import EditGame from '../EditGame/EditGame';

import './Modes.css';

const Modes = (
  {
  gameDb, 
  setGames,
  games, 
  selectMode, 
  setSelectMode,
  editGame,
  setEditGame,
}
) => {

  

  return (
    <>
    <div className='mode-container container-width'>
      <div className={`add-game-mode ${selectMode === 'add' ? 'selected' : ''}`} onClick={() => setSelectMode('add')}>New Game Mode</div>
      <div className={`edit-game-mode ${selectMode === 'edit' ? 'selected' : ''}`} onClick={() => setSelectMode('edit')}>Edit Game Mode</div>
    </div>
        {selectMode === 'add' ?
         <AddGame 
         gameDb={gameDb} 
         setGames={setGames} 
         games={games}
         setEditGame={setEditGame}
         /> : 
         <EditGame 
         gameDb={gameDb} 
         setGames={setGames} 
         games={games} 
         editGame={editGame} 
         setEditGame={setEditGame}
         setSelectMode={setSelectMode}
         />}
    </>
  )
}

export default Modes
