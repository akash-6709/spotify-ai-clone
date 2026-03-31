const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 8080;

app.use(cors());
app.use(express.json());
app.use('/songs', express.static(path.join(__dirname, 'songs')));

const songs = [
    { name: "ALL THE STARS", file: "/songs/song-1.mp3" },
    { name: "BIG DAWGS", file: "/songs/song-2.mp3" }
];

app.get('/api/songs', (req, res) => {
    res.json(songs);
});

app.listen(PORT, () => {
    console.log(`Backend running at http://localhost:${PORT}`);
});