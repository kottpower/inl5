import React, { useEffect, useRef, useState } from 'react'
import './AddGame.css';

const AddGame = ({gameDb, games, setGames, setEditGame}) => {

    const initialForm = {
        title: '',
        year: '',
        score: '',
        platform: '',
    }

    const [form,setForm] = useState(initialForm)

    useEffect(() => {

        // Om användaren tidigare har varit i redigeringsläge för ett specifikt spel, nollställ detta.
        setEditGame({});
        // Är medveten om att nedan lösning inte är någon bra lösning i react, men som nybörjare här valde jag att göra såhär.
        const gamesTableBody = document.querySelector('.games-table-body');
        Array.from(gamesTableBody.children).forEach(child => {
            if(child.classList.contains('selected')) {
                child.classList.remove('selected');
            }
        })

    },[])

    const scoreValidation = () => {
        if(/^(\d{1}|10)\/10$/.test(form.score)) {
            return true;
        }else {
            return false;
        }
    }

    const addGame = (e) => {
        e.preventDefault();

        if(!scoreValidation()) {
            alert(`Please provide a score in the correct format. Example: 9/10`);
            return;
        }
        
        //Säkerställer att Id alltid är unikt även om vi tar bort spel från lista.
        const nextGameId = games.length > 0 ? Math.max(...games.map(game => game.id)) + 1 : 0;
        const newGame = {
            title: form.title,
            year: form.year,
            score: form.score,
            platform: form.platform,
            id: nextGameId,
        }

        const newGames = [...games, newGame]
        setGames(newGames);
        localStorage.setItem('gameDb', JSON.stringify(newGames)); 
        
        setForm(initialForm);
        alert(`New game "${newGame.title}" successfully added to the database!`);        
    }

    const handleFormChange = (e) => {
        setForm(prev => {
            return {
                ...prev,
                [e.target.name] : e.target.value,
            }
        })
    }

  return (
    <div className='add-game container-width'>
      <h1>Add a game to the database</h1>
        <form action="" onSubmit={addGame} autoComplete="off">
            <label htmlFor="title" >Title:</label>
            <input value={form.title} type="text" name='title' id='title' placeholder='Add new Title' onChange={handleFormChange} required/>
    
            <label htmlFor="year" >Year:</label>
            <input value={form.year} type="number" name='year' id='year' placeholder='Enter year' onChange={handleFormChange} required/>

            <label htmlFor="score" >Score:</label>
            <input value={form.score} type="text" name='score' id='score' placeholder='Enter score' onChange={handleFormChange} required/>

            <label htmlFor="platform" >Platform:</label>
            <input value={form.platform} type="text" name='platform' id='platform' placeholder='Enter Platform' onChange={handleFormChange} required/>

            <button className="add-game-button button" type='submit'>Add game to database</button>
        </form>
        
    </div>
  )
}

export default AddGame
