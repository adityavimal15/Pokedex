import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Search.css";

function Search({ updateSearchTerm }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPokemon, setFilteredPokemon] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    updateSearchTerm(searchTerm); // Update search term in Pokedex.js

    if (searchTerm.length === 0) {
      setFilteredPokemon([]);
      return;
    }

    async function fetchFilteredPokemon() {
      try {
        const listResponse = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=1000");
        const matchingPokemon = listResponse.data.results.filter((p) =>
          p.name.startsWith(searchTerm.toLowerCase())
        );

        if (matchingPokemon.length === 0) {
          setFilteredPokemon([]);
          return;
        }

        const pokemonDetails = await Promise.all(
          matchingPokemon.map(async (p) => {
            const res = await axios.get(p.url);
            return {
              id: res.data.id,
              name: res.data.name,
              image: res.data.sprites.other.dream_world.front_default || res.data.sprites.front_default,
            };
          })
        );

        setFilteredPokemon(pokemonDetails);
      } catch (error) {
        console.error("Error fetching Pokémon details:", error);
        setFilteredPokemon([]);
      }
    }

    const debounce = setTimeout(fetchFilteredPokemon, 300);
    return () => clearTimeout(debounce);
  }, [searchTerm, updateSearchTerm]);

  return (
    <div className="pokemon-wrapper">
      <input
        id="pokemon-name-search"
        type="text"
        placeholder="Search Pokémon..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="pokemon-list">
        {filteredPokemon.length > 0 ? (
          filteredPokemon.map((pokemon) => (
            <div key={pokemon.id} className="pokemon-card" onClick={() => navigate(`/pokemon/${pokemon.id}`)}>
              <h3>{pokemon.name}</h3>
              <img src={pokemon.image} alt={pokemon.name} />
            </div>
          ))
        ) : (
          searchTerm.length > 0 && <p>No Pokémon found</p>
        )}
      </div>
    </div>
  );
}

export default Search;
