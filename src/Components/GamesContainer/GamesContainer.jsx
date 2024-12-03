import React, { useRef, useState } from 'react'
import './GamesContainer.css';
import EditGame from '../EditGame/EditGame';


const GamesContainer = ({games, setGames, editGame, setEditGame, setSelectMode}) => {

    const tableBody = useRef();


    const handleDeleteGame = (id,e) => {

        const selectedGame = games.find(game => game.id === id);

        if( confirm(`Are you sure you want to delete the game "${selectedGame.title}" from the database?`)) {

            const newGames = [...games].filter(game => game.id !== id);
            localStorage.setItem('gameDb', JSON.stringify(newGames));
            setGames(newGames);

            if(editGame?.id === id) {
            setEditGame({});
            }
        }else {
            return;
        }
    }

    const handleEditGame = (e,id) => {
  
        const selectedGame = games.find(game => game.id === id);
       
        setEditGame(selectedGame);
        setSelectMode('edit');
    }

    const handleMouseOver = (e) => {

        const trChildren = Array.from(e.target.closest('tr').children);
        trChildren.forEach((child,index) => {

            if(e.target.classList.contains('delete-game')) {
                child.style.backgroundColor = 'white';
                return;
            }

            if(index === trChildren.length-1) {
                child.style.backgroundColor = 'white';
            }else {
                child.style.backgroundColor = 'rgb(194, 223, 248)';
            }
        })
    }

    const handleTrClick = (e) => {
        const previouslySelected = Array.from(tableBody.current.children).find(tableRow => {
            if(tableRow.classList.contains('selected')) {
                tableRow.classList.remove('selected');
                return true;
            }
        })
        e.target.closest('tr').classList.add('selected');
    }


  return (
    <div className='games-container container-width'>
        <table className="games-table">

            <thead>
                <tr>
                    <th>Title</th>
                    <th>Year</th>
                    <th>Score</th>
                    <th>Platform</th>
                </tr>
            </thead>

            <tbody className='games-table-body' ref={tableBody}>
                {games.map( ({title,year,score,platform, id}) => {
                    return (
                        <tr key={id} 
                        onClick={(e) => {

                                if(!e.target.classList.contains('delete-game')) {
                                    handleEditGame(e,id);
                                    handleTrClick(e);
                                }
                        }}
                        onMouseOver={(e) => {
                            handleMouseOver(e);
                        }}
                        onMouseLeave={(e) => {
                            Array.from(e.target.closest('tr').children).forEach(child => {
                                child.style.backgroundColor = 'white';
                            })
                        }}
                        >
                            <td className='game-title'
                            >{title}</td>
                            <td>{year}</td>
                            <td>{score}</td>
                            <td>{platform}</td>
                            <td className='delete-game'
                            onClick={(e) => handleDeleteGame(id,e)}
                            >&#10006;</td>
                        </tr>
                    )
                })}
                
            </tbody>
        </table>
    </div>
  )
}

export default GamesContainer
