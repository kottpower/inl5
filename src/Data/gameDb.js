

const gameDb = localStorage.getItem('gameDb') ? 
JSON.parse(localStorage.getItem('gameDb')).sort((a,b) => {
    return a.title.toLowerCase().charCodeAt(0) - b.title.toLowerCase().charCodeAt(0);
}) : [
    {
        title: 'Elden Ring',
        year: 2022,
        score: '9/10',
        platform: 'multiple',
        id: 0
    },
    {
        title: 'Donkey Kong Country',
        year: 1994,
        score: '7/10',
        platform: 'SNES',
        id: 1,
    },
    {
        title: 'Super Smash Bros Ultimate',
        year: 2018,
        score: '8/10',
        platform: 'Switch',
        id: 2,
    },
]

export default gameDb;