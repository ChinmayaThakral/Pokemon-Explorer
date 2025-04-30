import React from 'react';
import PokemonCard from './PokemonCard';
import './PokemonGrid.css';
import { useEffect } from 'react';

interface Pokemon {
  id: number;
  name: string;
  types: string[];
  image: string;
}

interface PokemonGridProps {
  pokemon: Pokemon[];
  loading: boolean;
  error: string | null;
}

const PokemonGrid: React.FC<PokemonGridProps> = ({ pokemon, loading, error }) => {
  const pokemonList = pokemon;

  useEffect(() => {
    console.log('Pokemon list updated', pokemonList.length);
  }, [pokemon]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading Pokémon...</p>
      </div>
    );
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (pokemonList.length === 0) {
    return <div className="no-results">No Pokémon found. Try adjusting your search.</div>;
  }

  return (
    <div className="pokemon-grid">
      {pokemonList.map((poke) => (
        <PokemonCard
          key={poke.id}
          id={poke.id}
          name={poke.name}
          types={poke.types}
          image={poke.image}
        />
      ))}
    </div>
  );
};

export default PokemonGrid; 