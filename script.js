const previousPlayButton = document.getElementById("previous");
const playButton = document.getElementById("play");
const stopButton = document.getElementById("stop");
const nextPlayButton = document.getElementById("next");
const shuffleButtton = document.getElementById("shuffle");
const playlist = document.getElementById("playlistUl");
const BACKEND = "https://music-provider.onrender.com/songs";
const allSongs = [
  {
    id: 0,
    title: "Scratching The Surface",
    artist: "Quincy Larson",
    duration: "4:25",
    src: "https://cdn.freecodecamp.org/curriculum/js-music-player/scratching-the-surface.mp3",
  },
  {
    id: 1,
    title: "Can't Stay Down",
    artist: "Quincy Larson",
    duration: "4:15",
    src: "https://cdn.freecodecamp.org/curriculum/js-music-player/can't-stay-down.mp3",
  },
  {
    id: 2,
    title: "Still Learning",
    artist: "Quincy Larson",
    duration: "3:51",
    src: "https://cdn.freecodecamp.org/curriculum/js-music-player/still-learning.mp3",
  },
  {
    id: 3,
    title: "Cruising for a Musing",
    artist: "Quincy Larson",
    duration: "3:34",
    src: "https://cdn.freecodecamp.org/curriculum/js-music-player/cruising-for-a-musing.mp3",
  },
  {
    id: 4,
    title: "Never Not Favored",
    artist: "Quincy Larson",
    duration: "3:35",
    src: "https://cdn.freecodecamp.org/curriculum/js-music-player/never-not-favored.mp3",
  },
  {
    id: 5,
    title: "From the Ground Up",
    artist: "Quincy Larson",
    duration: "3:12",
    src: "https://cdn.freecodecamp.org/curriculum/js-music-player/from-the-ground-up.mp3",
  },
  {
    id: 6,
    title: "Walking on Air",
    artist: "Quincy Larson",
    duration: "3:25",
    src: "https://cdn.freecodecamp.org/curriculum/js-music-player/walking-on-air.mp3",
  },
  {
    id: 7,
    title: "Can't Stop Me. Can't Even Slow Me Down.",
    artist: "Quincy Larson",
    duration: "3:52",
    src: "https://cdn.freecodecamp.org/curriculum/js-music-player/cant-stop-me-cant-even-slow-me-down.mp3",
  },
  {
    id: 8,
    title: "The Surest Way Out is Through",
    artist: "Quincy Larson",
    duration: "3:10",
    src: "https://cdn.freecodecamp.org/curriculum/js-music-player/the-surest-way-out-is-through.mp3",
  },
  {
    id: 9,
    title: "Chasing That Feeling",
    artist: "Quincy Larson",
    duration: "2:43",
    src: "https://cdn.freecodecamp.org/curriculum/js-music-player/chasing-that-feeling.mp3",
  },
  {
    id: 10,
    title: "Photograph",
    artist: "Ed sheeran",
    duration: "4:17",
    src: `${BACKEND}/photograph-edsheeran.mp3`,
  },
  {
    id: 11,
    title: "Agitation tropicales",
    artist: "L'Impératrice",
    duration: "4:10",
    src: `${BACKEND}/agitation-tropicales.mp3`,
  },
  {
    id: 12,
    title: "Amour plastique",
    artist: "Adèle Castillon, Mattyeux, and Videoclub",
    duration: "4:10",
    src: `${BACKEND}/agitation-tropicales.mp3`,
  },
  {
    id: 13,
    title: "Birds of a feather",
    artist: "Billie Eillish",
    duration: "3:31",
    src: `${BACKEND}/birds-of-a-bird.mp3`,
  },
  {
    id: 14,
    title: "Je pense a toi",
    artist: "Lewis ofman",
    duration: "4:20",
    src: `${BACKEND}/je-pense-a-toi.mp3`,
  },
  {
    id: 15,
    title: "Perfect",
    artist: "Ed sheeran",
    duration: "4:23",
    src: `${BACKEND}/perfect.mp3`,
  },
  {
    id: 16,
    title: "Plein de bisous",
    artist: "Lewis ofman",
    duration: "3:10",
    src: `${BACKEND}/plein-de-bisous.mp3`,
  },
  {
    id: 17,
    title: "Put it all on me",
    artist: "Ed sheeran",
    duration: "3:37",
    src: `${BACKEND}/put-it-all-on-me.mp3`,
  },
  {
    id: 18,
    title: "Thank you",
    artist: "Su lee",
    duration: "3:01",
    src: `${BACKEND}/thank-you.mp3`,
  },
  {
    id: 19,
    title: "Thinking out loud",
    artist: "Ed sheeran",
    duration: "4:41",
    src: `${BACKEND}/thinking-out-loud.mp3`,
  },
];
const userData = {
  songs: [...allSongs],
  currentSong: null,
  songCurrentTime: 0,
};
const audio = new Audio();
const highlightCurrentSong = (id) => {
  const songElements = document.querySelectorAll(".playing");

  songElements?.forEach((song) => {
    song.classList.remove("playing");
  });
  const songToHighlight = document.getElementById(`${id}`);
  songToHighlight?.classList.add("playing");
};
const getCurrentSongIndex = () => userData.songs?.indexOf(userData.currentSong);
const playPreviousSong = () => {
  stopButton.classList.remove("playing-button");
  const currentSongIndex = getCurrentSongIndex();
  if (0 == currentSongIndex) {
    playSong(userData.songs[userData.songs.length - 1].id);
  }
  playSong(userData.songs[currentSongIndex - 1].id);
};
const playNextSong = () => {
  stopButton.classList.remove("playing-button");
  const currentSongIndex = getCurrentSongIndex();
  if (currentSongIndex === userData.songs.length - 1) {
    playSong(userData.songs[0].id);
  }
  playSong(userData.songs[currentSongIndex + 1].id);
};
const stopSong = () => {
  userData.songCurrentTime = audio.currentTime;
  playButton.classList.remove("playing-button");
  stopButton.classList.add("playing-button");
  audio.pause();
};
const deleteSong = (id) => {
  if (userData.currentSong?.id === id) {
    stopSong();
    userData.currentSong = null;
    userData.songCurrentTime = 0;
  }
  userData.songs = userData.songs.filter((song) => {
    return song.id !== id;
  });
  renderSongs(sortSongs());
  highlightCurrentSong(userData.currentSong?.id);
  showPlayingSongInformation();
  if (userData.songs.length === 0) {
    const resetButton = document.createElement("button");
    resetButton.classList.add("reset-button");
    const resetText = document.createTextNode("Reset Playlist");
    resetButton.appendChild(resetText);
    playlist.appendChild(resetButton);
    resetButton.addEventListener("click", () => {
      userData.songs = [...allSongs];
      userData.currentSong = null;
      userData.songCurrentTime = 0;
      renderSongs(sortSongs());
    });
  }
};
const showPlayingSongInformation = () => {
  const titleNameShowingElement = document.getElementById("songName");
  const artistNameShowingElement = document.getElementById("songerName");
  const songTitle = userData?.currentSong?.title;
  const songArtist = userData?.currentSong?.artist;
  titleNameShowingElement.textContent = `${songTitle ? songTitle : ""}`;
  artistNameShowingElement.textContent = `${songArtist ? songArtist : ""}`;
};

const playSong = (id) => {
  const song = userData.songs.find((song) => song.id === id);
  audio.src = song?.src;
  audio.title = song?.title;
  if (userData.currentSong === null || userData.currentSong.id !== id) {
    audio.currentTime = 0;
  } else {
    audio.currentTime = userData.songCurrentTime;
  }
  userData.currentSong = song;
  playButton.classList.add("playing-button");
  highlightCurrentSong(id);
  showPlayingSongInformation(song);
  audio.play();
};

const sortSongs = () => {
  return userData.songs.sort((a, b) => {
    if (a.title < b.title) {
      return -1;
    }
    if (a.title > b.title) {
      return 1;
    }
    return 0;
  });
};
const shuffleSongs = () => {
  userData.songs.sort(() => Math.random() - 0.5);
  renderSongs(userData.songs);
  highlightCurrentSong(userData.currentSong.id);
};
const renderSongs = (arr) => {
  const HTML = arr
    .map(
      ({ title, artist, duration, id }) => `
    <div class="LiContainer">
        <li id="${id}" onclick="playSong(${id})" class="">
                    <h5>${title}</h5>
                    <div class="liLastSection">
                        <p>${artist}</p>
                        <p>${duration}</p>
                    </div>
        </li>
        <button class="buttonDelete" onclick="deleteSong(${id})">X</button>
    </div>
    `
    )
    .join("");
  playlist.innerHTML = HTML;
};

shuffleButtton.addEventListener("click", shuffleSongs);
playButton.addEventListener("click", () => {
  if (userData.currentSong === null) {
    stopButton.classList.remove("playing-button");
    playSong(userData.songs[0].id);
  } else {
    stopButton.classList.remove("playing-button");

    playSong(userData.currentSong.id);
  }
});
previousPlayButton.addEventListener("click", playPreviousSong);
nextPlayButton.addEventListener("click", playNextSong);
stopButton.addEventListener("click", stopSong);
audio.addEventListener("ended", () => {
  playButton.classList.remove("playing-button");
  playNextSong();
});
renderSongs(sortSongs());
