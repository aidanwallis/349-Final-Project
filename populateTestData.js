const mongoose = require('mongoose');
const Rating = require('./models/Rating');

// Connect to MongoDB 
mongoose.connect('mongodb://localhost:27017/gameRatingDB')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Connection failed:', err));

// Test data for game ratings
const gameRatings = [
    {name: 'Elden Ring', rating: 10, genre: 'Action RPG', datePlayed: '2026-10-11'},
    {name: 'Valorant', rating: 7, genre: 'FPS', datePlayed: '2021-1-11'},
    {name: 'Rust', rating: 9, genre: 'PvPvE', datePlayed: '2020-5-27'},
    {name: 'GTA V', rating: 9, genre: 'Open World', datePlayed: '2018-3-5'}, 
];

const populateData = async () => {
    try {
        await Rating.deleteMany();
        const insertedRatings = await Rating.insertMany(gameRatings);
        console.log(`Inserted ${insertedRatings.length} ratings`);
        console.log('All data populated successfully');
    } catch (error) {
        console.error('Error populating data:', err);
    } finally {
        mongoose.connection.close()
    }
};

populateData();
