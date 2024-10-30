import React from 'react';
import { SkipBack, SkipForward, Play, Pause } from 'lucide-react';

const Player = ({ currentTrack, isPaused, onPlayPause, onPrevious, onNext }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-800 p-4">
      <div className="max-w-4xl mx-auto flex items-center gap-4">
        {currentTrack && (
          <div className="flex items-center gap-4 flex-1">
            <img 
              src={currentTrack.album.images[2]?.url}
              alt={currentTrack.name}
              className="w-14 h-14 rounded"
            />
            <div>
              <h3 className="font-bold">{currentTrack.name}</h3>
              <p className="text-gray-400">{currentTrack.artists[0].name}</p>
            </div>
          </div>
        )}

        <div className="flex items-center gap-4">
          <button 
            className="p-2 hover:bg-gray-700 rounded-full"
            onClick={onPrevious}
          >
            <SkipBack className="w-5 h-5" />
          </button>
          
          <button 
            className="p-3 bg-white text-black rounded-full hover:scale-105 transition-transform"
            onClick={onPlayPause}
          >
            {isPaused ? <Play className="w-6 h-6" /> : <Pause className="w-6 h-6" />}
          </button>
          
          <button 
            className="p-2 hover:bg-gray-700 rounded-full"
            onClick={onNext}
          >
            <SkipForward className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Player;