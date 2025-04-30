import { useState, useEffect } from 'react';

// Define Pokemon type interface
interface Pokemon {
  id: number;
  name: string;
  types: string[];
  image: string;
}

const usePokemonData = () => {
  const [allPokemon, setAllPokemon] = useState<Pokemon[]>([]);
  const [filteredPokemon, setFilteredPokemon] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedType, setSelectedType] = useState<string>('');
  const [pokemonTypes, setPokemonTypes] = useState<string[]>([]);
  const [dataLoaded, setDataLoaded] = useState<boolean>(false);

  // Fetch Pokemon data
  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=150');
        
        if (!response.ok) {
          throw new Error('Failed to fetch Pokemon data');
        }
        
        const data = await response.json();
        
        // Get detailed data for each Pokemon
        const pokemonDetails = await Promise.all(
          data.results.map(async (pokemon: { url: string, name: string }) => {
            const detailResponse = await fetch(pokemon.url);
            return await detailResponse.json();
          })
        );
        
        // Transform data to our format
        const pokeList: Pokemon[] = pokemonDetails.map((pokemon) => {
          return {
            id: pokemon.id,
            name: pokemon.name,
            types: pokemon.types.map((type: { type: { name: string } }) => type.type.name),
            image: pokemon.sprites.front_default
          };
        });
        
        // Extract all unique Pokemon types
        const allTypes = new Set<string>();
        pokeList.forEach(pokemon => {
          pokemon.types.forEach(type => {
            allTypes.add(type);
          });
        });
        
        setPokemonTypes(Array.from(allTypes).sort());
        setAllPokemon(pokeList);
        setFilteredPokemon(pokeList);
        setDataLoaded(true);
        
      } catch (err) {
        console.error('Error fetching Pokemon:', err);
        setError('Failed to load Pokemon. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchPokemon();
    // TODO: Maybe add a way to cancel fetch if component unmounts?
  }, []);

  // Filter Pokemon based on search term and type
  useEffect(() => {
    let result = allPokemon;
    
    if (searchTerm) {
      result = result.filter(pokemon => 
        pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (selectedType) {
      result = result.filter(pokemon => 
        pokemon.types.includes(selectedType)
      );
    }
    
    setFilteredPokemon(result);
    // not sure if this is the best way to filter, works for now
  }, [searchTerm, selectedType, allPokemon]);

  return {
    pokemon: filteredPokemon,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    selectedType,
    setSelectedType,
    pokemonTypes,
    dataLoaded
  };
};

export default usePokemonData; 