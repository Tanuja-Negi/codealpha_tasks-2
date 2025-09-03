const songs = [
  {
    name: "music/_Mere_Yaaraa_Song__Akshay_Kumar,_Katrina_Kaif,_Rohit_Shetty,_Arijit_S_Neeti__JAM8_KAG(128k).mp3",
    title: "Mere Yaara",
    artist: "Arijit S, Neeti M"
  },
  {
    name: "music/BAARISHEIN_(Studio)_Anuv_Jain(128k).mp3",
    title: "Baarishein",
    artist: "Anuv Jain"
  },
  {
    name: "music/Kooch_Na_Karin_-_Load_Wedding_[_Slowed_&_Reverbed_]__SLOWED_LO-FI(128k).mp3",
    title: "Kooch Na Karin",
    artist: "Fahad M, Mehwish H"
  }
];

let songIndex = 0;
let isPlaying = false;

const audio = document.getElementById("music");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const progress = document.getElementById("progress");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
const volume = document.getElementById("volume");
const playlistEl = document.getElementById("playlist");

// Load Song
function loadSong(song) {
  title.textContent = song.title;
  artist.textContent = song.artist;
  audio.src = song.name; // ✅ Correct
  highlightPlaylist();
}

// Play Song
function playSong() {
  isPlaying = true;
  audio.play();
  playBtn.textContent = "⏸️";
}

// Pause Song
function pauseSong() {
  isPlaying = false;
  audio.pause();
  playBtn.textContent = "▶️";
}

// Toggle Play
playBtn.addEventListener("click", () => {
  isPlaying ? pauseSong() : playSong();
});

// Next Song
function nextSong() {
  songIndex = (songIndex + 1) % songs.length;
  loadSong(songs[songIndex]);
  playSong();
}

// Prev Song
function prevSong() {
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  loadSong(songs[songIndex]);
  playSong();
}

// Time update
audio.addEventListener("timeupdate", () => {
  if (audio.duration) {
    progress.value = (audio.currentTime / audio.duration) * 100;

    // Current Time
    let currentMin = Math.floor(audio.currentTime / 60);
    let currentSec = Math.floor(audio.currentTime % 60);
    if (currentSec < 10) currentSec = "0" + currentSec;
    currentTimeEl.textContent = `${currentMin}:${currentSec}`;

    // Duration
    let durationMin = Math.floor(audio.duration / 60);
    let durationSec = Math.floor(audio.duration % 60);
    if (durationSec < 10) durationSec = "0" + durationSec;
    durationEl.textContent = `${durationMin}:${durationSec}`;
  }
});

// Seek
progress.addEventListener("input", () => {
  audio.currentTime = (progress.value * audio.duration) / 100;
});

// Volume
volume.addEventListener("input", () => {
  audio.volume = volume.value;
});

// Auto-play next
audio.addEventListener("ended", nextSong);

// Controls
nextBtn.addEventListener("click", nextSong);
prevBtn.addEventListener("click", prevSong);

// Playlist
function populatePlaylist() {
  playlistEl.innerHTML = "";
  songs.forEach((song, index) => {
    const li = document.createElement("li");
    li.textContent = song.title;
    li.addEventListener("click", () => {
      songIndex = index;
      loadSong(songs[songIndex]);
      playSong();
    });
    playlistEl.appendChild(li);
  });
}

function highlightPlaylist() {
  const lis = playlistEl.querySelectorAll("li");
  lis.forEach((li, index) => {
    li.classList.toggle("active", index === songIndex);
  });
}

// Initialize
loadSong(songs[songIndex]);
populatePlaylist();
