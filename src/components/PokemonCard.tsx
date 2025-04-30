import React from 'react';
import './PokemonCard.css';

interface PokemonCardProps {
  id: number;
  name: string;
  types: string[];
  image: string;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ id, name, types, image }) => {
  const getTypeColor = (type: string): string => {
    const colors: { [key: string]: string } = {
      normal: '#A8A878',
      fire: '#F08030',
      water: '#6890F0',
      electric: '#F8D030',
      grass: '#78C850',
      ice: '#98D8D8',
      fighting: '#C03028',
      poison: '#A040A0',
      ground: '#E0C068',
      flying: '#A890F0',
      psychic: '#F85888',
      bug: '#A8B820',
      rock: '#B8A038',
      ghost: '#705898',
      dragon: '#7038F8',
      dark: '#705848',
      steel: '#B8B8D0',
      fairy: '#EE99AC',
    };

    return colors[type] || '#999999';
  };

  return (
    <div className="pokemon-card">
      <div className="pokemon-id">#{id.toString().padStart(3, '0')}</div>
      <div className="pokemon-image">
        <img src={image} alt={`${name} sprite`} />
      </div>
      <h3 className="pokemon-name">{name.charAt(0).toUpperCase() + name.slice(1)}</h3>
      <div className="pokemon-types">
        {types.map((type) => (
          <span 
            key={type} 
            className="type-badge"
            style={{ backgroundColor: getTypeColor(type) }}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </span>
        ))}
      </div>
    </div>
  );
};

export default PokemonCard; 