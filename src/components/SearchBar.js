import React from 'react';
import { Search } from 'lucide-react';

const SearchBar = ({ searchInput, setSearchInput, onSearch }) => {
  return (
    <div className="flex gap-4 max-w-2xl mx-auto p-4">
      <input
        type="text"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        placeholder="Buscar canciones..."
        className="flex-1 bg-gray-800 px-4 py-2 rounded-full text-white"
      />
      <button 
        onClick={onSearch}
        className="bg-green-500 p-2 rounded-full hover:bg-green-600"
      >
        <Search className="w-6 h-6" />
      </button>
    </div>
  );
};

export default SearchBar;