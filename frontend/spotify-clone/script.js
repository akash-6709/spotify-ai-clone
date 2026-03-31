console.log("Script loaded");

let songs = [
    {
        name: "ALL THE STARS",
        file: "song-1.mp3"
    },
    {
        name: "BIG DAWGS",
        file: "song-2.mp3"
    }
];

let currentSongIndex = -1;
let audioPlayer = document.getElementById("audioPlayer");
let playBtn = document.getElementById("playBtn");
let leftBtn = document.getElementById("leftBtn");
let rightBtn = document.getElementById("rightBtn");
let songInfo = document.querySelector(".songinfo");
let currentPlayButton = null;

function resetPlayButtons() {
    const playButtons = document.querySelectorAll(".play-button svg path");
    playButtons.forEach(path => {
        path.setAttribute("d", "M8 5v14l11-7z");
    });
}

function playSong(index) {
    resetPlayButtons();

    currentSongIndex = index;
    audioPlayer.src = songs[index].file;
    audioPlayer.play();
    songInfo.innerText = songs[index].name;

    currentPlayButton = document.getElementById(`play-btn-${index}`);
    if (currentPlayButton) {
        currentPlayButton.querySelector("path").setAttribute("d", "M6 19h4V5H6v14zm8-14v14h4V5h-4z");
    }

    playBtn.src = "pause2-button.png";
}

let cardPlayButtons = document.querySelectorAll(".play-button");
cardPlayButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
        if (currentSongIndex === index && !audioPlayer.paused) {
            audioPlayer.pause();
            playBtn.src = "play-button.png";
            if (currentPlayButton) {
                currentPlayButton.querySelector("path").setAttribute("d", "M8 5v14l11-7z");
            }
        } else {
            playSong(index);
        }
    });
});

playBtn.addEventListener("click", () => {
    if (audioPlayer.paused) {
        if (currentSongIndex === -1) {
            playSong(0);
        } else {
            audioPlayer.play();
            playBtn.src = "pause2-button.png";
            if (currentPlayButton) {
                currentPlayButton.querySelector("path").setAttribute("d", "M6 19h4V5H6v14zm8-14v14h4V5h-4z");
            }
        }
    } else {
        audioPlayer.pause();
        playBtn.src = "play-button.png";
        if (currentPlayButton) {
            currentPlayButton.querySelector("path").setAttribute("d", "M8 5v14l11-7z");
        }
    }
});

leftBtn.addEventListener("click", () => {
    if (currentSongIndex !== -1) {
        audioPlayer.pause();
    }
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    playSong(currentSongIndex);
});

rightBtn.addEventListener("click", () => {
    if (currentSongIndex !== -1) {
        audioPlayer.pause();
    }
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    playSong(currentSongIndex);
});