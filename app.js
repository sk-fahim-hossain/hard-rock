function searchSongs () {
    const searchedSong = document.getElementById('searchInput').value;
    const url = ` https://api.lyrics.ovh/suggest/:${searchedSong}`
    fetch(url)
    .then(res => res.json())
    .then(data => displaySongs(data.data)) 
    
}

const displaySongs = songs => {
    const songContainer = document.getElementById("song-container");
    songContainer.innerHTML = '';
    const lyricsContainer = document.getElementById("lyrics-container");
    lyricsContainer.innerHTML = '';
    songs.forEach(song => {
        const songDiv = document.createElement('div')
        songDiv.addStyleClass = "search-result col-md-8 mx-auto py-4"
        songDiv.innerHTML = `
            <div class="single-result row align-items-center my-3 p-3">
                <div class="col-md-9">
                    <h3 class="lyrics-name">${song.title}</h3>
                    <p class="author lead">Album by <span>${song.artist.name}</span></p>
                    <audio controls>
                        <source src="${song.preview}" type="audio/ogg">
                    </audio>
                </div>
                <div class="col-md-3 text-md-right text-center">
                    <button onclick="getLyric('${song.artist.name}', '${song.title}')" class="btn btn-success">Get Lyrics</button>
                </div>
            </div>
        `
    songContainer.appendChild(songDiv)
    }) 
}

const getLyric =(artist, title) => {
    const url = `https://api.lyrics.ovh/v1/:${artist}/:${title}`
    fetch(url)
    .then(res => res.json())
    .then(data => displayLyric(data.lyrics))
    
}

const displayLyric = lyric => {
    console.log(lyric)
    const lyricContainer = document.getElementById("lyrics-container");
    const lyricDiv = document.createElement('div');
    lyricDiv.innerText = `${lyric}`
    lyricContainer.appendChild(lyricDiv);
}