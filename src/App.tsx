import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import PokemonGrid from './components/PokemonGrid';
import usePokemonData from './hooks/usePokemonData';
import './App.css';

const App: React.FC = () => {
  const { 
    pokemon, 
    loading, 
    error, 
    searchTerm, 
    setSearchTerm, 
    selectedType, 
    setSelectedType, 
    pokemonTypes,
    dataLoaded 
  } = usePokemonData();

  const [appTitle] = useState('Pokemon Explorer App');
  const [isAppReady, setIsAppReady] = useState(false);

  useEffect(() => {
    if (dataLoaded) {
      setIsAppReady(true);
    }
  }, [dataLoaded]);

  return (
    <div className="app">
      <Header />
      <main>
        <SearchBar 
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedType={selectedType}
          setSelectedType={setSelectedType}
          pokemonTypes={pokemonTypes}
        />
        <PokemonGrid 
          pokemon={pokemon}
          loading={loading}
          error={error}
        />
      </main>
      <footer className="footer">
        <p>Created by Chinmaya Thakral</p>
      </footer>
    </div>
  );
};

export default App; 