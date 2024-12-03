import React, { useEffect, useState } from 'react'
import './EditGame.css';

const EditGame = ({gameDb, games, setGames, editGame, setEditGame, setSelectMode}) => {

    const formObj = {
        title: editGame?.title,
        year: editGame?.year,
        score: editGame?.score,
        platform: editGame?.platform,
        id: editGame?.id,
    }

    const [form,setForm] = useState(formObj);

    useEffect(() => {
        setForm(formObj)
    },[editGame])

    const handleChange = (e) => {
        setForm(prev => {
            return {
                ...prev,
                [e.target.name] : e.target.value,
            }
        })
    }

    const scoreValidation = () => {
        if(/^(\d{1}|10)\/10$/.test(form.score)) {
            return true;
        }else {
            return false;
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if(!scoreValidation()) {
            alert(`Please provide a score in the correct format. Example: 9/10`);
            return;
        }

        // Om titel inte finns tillgänglig
        if(!editGame?.title) {
            setForm({});
            setEditGame({});
            setSelectMode('edit');
            return;
        }

        
        const editedGames = games.map(game => {
            if(game.id === form.id) {
                return form;
            }else{
                return game;
            }
        })

        setGames(editedGames);
        localStorage.setItem('gameDb', JSON.stringify(editedGames));
        alert(`Selected game "${form.title}" successfully edited!`);   
    }

    const handleIsRequired = () => {
        return Object.keys(editGame).length > 0 ? true : false;
    }

  return (
    <>
    <div className='edit-game container-width'>
        <h1>{editGame.title ? 'Edit selected game:' : 'Please click on a game in the database to edit'}<span>{editGame.title}</span></h1>
          <form action="" onSubmit={(e) => {
            if(Object.keys(editGame).length > 0) {
                handleSubmit(e)
            }else {
                e.preventDefault()
                alert('Please select a game to edit first!')
            }
          }
        }
           autoComplete="off">
              <label htmlFor="title">Title:</label><input type="text" name='title' id='title' value={form.title || ''} onChange={handleChange} required={handleIsRequired()}/>
              <label htmlFor="year">Year:</label><input type="number" name='year' id='year' value={form.year || ''} onChange={handleChange} required={handleIsRequired()}/>
              <label htmlFor="score">Score:</label><input type="text" name='score' id='score' value={form.score || ''} onChange={handleChange} required={handleIsRequired()}/>
              <label htmlFor="platform">Platform:</label><input type="text" name='platform' id='platform' value={form.platform || ''} onChange={handleChange} required={handleIsRequired()}/>
              <button type="submit" className="edit-selected-game-button button">{editGame.title ? 'Edit selected game' : 'First select game!'}</button>
          </form>
            
      </div>
      </>
  )
}

export default EditGame
