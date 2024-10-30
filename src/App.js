import React, { useState, useEffect } from 'react';
import SpotifyAuth from './components/SpotifyAuth';
import SearchBar from './components/SearchBar';
import TrackList from './components/TrackList';
import Player from './components/Player';

const App = () => {
  const [token, setToken] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [player, setPlayer] = useState(null);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPaused, setIsPaused] = useState(true);
  const [deviceId, setDeviceId] = useState('');

  const CLIENT_ID = "960ffbb356cd4014a5d43dfa8995240a"; // Reemplaza con tu Client ID
  const REDIRECT_URI = "http://localhost:3000";
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";
  const SCOPES = [
    "streaming",
    "user-read-email",
    "user-read-private",
    "user-modify-playback-state",
    "user-read-playback-state"
  ];

  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("spotify_token");

    if (!token && hash) {
      token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1];
      window.location.hash = "";
      window.localStorage.setItem("spotify_token", token);
    }

    setToken(token);

    if (token) {
      initializePlayer(token);
    }
  }, []);

  const initializePlayer = (token) => {
    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;
    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => {
      const spotifyPlayer = new window.Spotify.Player({
        name: 'Mi Reproductor Web',
        getOAuthToken: cb => { cb(token) }
      });

      spotifyPlayer.addListener('ready', ({ device_id }) => {
        setDeviceId(device_id);
      });

      spotifyPlayer.addListener('player_state_changed', state => {
        if (!state) return;
        setCurrentTrack(state.track_window.current_track);
        setIsPaused(state.paused);
      });

      spotifyPlayer.connect();
      setPlayer(spotifyPlayer);
    };
  };

  const handleLogin = () => {
    window.location.href = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPES.join("%20")}`;
  };

  const handleLogout = () => {
    setToken("");
    window.localStorage.removeItem("spotify_token");
  };

  const searchTracks = async () => {
    if (!searchInput) return;

    const response = await fetch(`https://api.spotify.com/v1/search?q=${searchInput}&type=track&limit=10`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    
    const data = await response.json();
    setSearchResults(data.tracks.items);
  };

  const playTrack = async (uri) => {
    await fetch(`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        uris: [uri]
      })
    });
  };

  const handlePlayPause = () => {
    if (!player) return;
    player.togglePlay();
  };

  const handlePrevious = () => {
    if (!player) return;
    player.previousTrack();
  };

  const handleNext = () => {
    if (!player) return;
    player.nextTrack();
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <SpotifyAuth 
        token={token}
        onLogin={handleLogin}
        onLogout={handleLogout}
      />

      {token && (
        <>
          <SearchBar 
            searchInput={searchInput}
            setSearchInput={setSearchInput}
            onSearch={searchTracks}
          />

          <TrackList 
            tracks={searchResults}
            onPlay={playTrack}
          />

          <Player 
            currentTrack={currentTrack}
            isPaused={isPaused}
            onPlayPause={handlePlayPause}
            onPrevious={handlePrevious}
            onNext={handleNext}
          />
        </>
      )}
    </div>
  );
};

export default App;