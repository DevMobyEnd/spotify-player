import React from 'react';

const TrackList = ({ tracks, onPlay }) => {
  return (
    <div className="space-y-4 max-w-2xl mx-auto p-4">
      {tracks.map(track => (
        <div 
          key={track.id}
          className="flex items-center gap-4 bg-gray-800 p-4 rounded-lg hover:bg-gray-700 cursor-pointer"
          onClick={() => onPlay(track.uri)}
        >
          <img 
            src={track.album.images[2]?.url} 
            alt={track.name}
            className="w-12 h-12 rounded"
          />
          <div>
            <h3 className="font-bold">{track.name}</h3>
            <p className="text-gray-400">{track.artists[0].name}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TrackList;