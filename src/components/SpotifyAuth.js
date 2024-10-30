import React from 'react';

const SpotifyAuth = ({ token, onLogin, onLogout }) => {
  return (
    <div className="flex justify-center p-4">
      {!token ? (
        <button 
          onClick={onLogin}
          className="bg-green-500 text-white px-6 py-3 rounded-full hover:bg-green-600"
        >
          Conectar con Spotify
        </button>
      ) : (
        <button 
          onClick={onLogout}
          className="bg-red-500 px-4 py-2 rounded-full hover:bg-red-600"
        >
          Cerrar sesión
        </button>
      )}
    </div>
  );
};

export default SpotifyAuth;