import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./PokemonDetails.css"

function PokemonDetails() {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [relatedPokemon, setRelatedPokemon] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPokemonDetails() {
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const pokemonData = {
          id: response.data.id,
          name: response.data.name,
          image: response.data.sprites.other.dream_world.front_default || response.data.sprites.front_default,
          weight: response.data.weight,
          height: response.data.height,
          types: response.data.types.map((t) => t.type.name),
        };
        setPokemon(pokemonData);

        // Fetch related Pokémon based on the first type
        if (pokemonData.types.length > 0) {
          fetchSimilarPokemon(pokemonData.types[0]);
        }
      } catch (error) {
        console.error("Error fetching Pokémon details:", error);
      }
    }

    async function fetchSimilarPokemon(type) {
      try {
        const typeResponse = await axios.get(`https://pokeapi.co/api/v2/type/${type}`);
        const similarPokemonList = typeResponse.data.pokemon
          .slice(0, 10)
          .map((p) => ({
            name: p.pokemon.name,
            url: p.pokemon.url,
          }));

        const detailedSimilarPokemon = await Promise.all(
          similarPokemonList.map(async (p) => {
            const res = await axios.get(p.url);
            return {
              id: res.data.id,
              name: res.data.name,
              image: res.data.sprites.other.dream_world.front_default || res.data.sprites.front_default,
            };
          })
        );

        setRelatedPokemon(detailedSimilarPokemon);
      } catch (error) {
        console.error("Error fetching similar Pokémon:", error);
      }
    }

    fetchPokemonDetails();
  }, [id]);

  if (!pokemon) return <div>Loading...</div>;

  return (
    <div className="pokemon-details-wrapper">
      <div className="pokemon-details">
      <img src={pokemon.image} alt={pokemon.name} className="pokemon-image"/>
      <h2 className="pokemon-name">{pokemon.name}</h2>
      <div className="pokemon-hw">Height: {pokemon.height}</div>
      <div className="pokemon-hw">Weight: {pokemon.weight}</div>
      <div className="pokemon-types">
        <strong>Types:</strong> {pokemon.types.join(", ")}
      </div>
      <button onClick={() => navigate("/")} style={{ marginBottom: "10px", padding: "5px 10px", cursor: "pointer" }}>
        Go to Home
      </button>
      </div>
      <div className="pokemon-similar-wrapper">
      <h3>Similar Pokémon</h3>
      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }} className="pokemon-similar-image">
        {relatedPokemon.length > 0 ? (
          relatedPokemon.map((p) => (
            <div key={p.id} onClick={() => navigate(`/pokemon/${p.id}`)} style={{ cursor: "pointer", textAlign: "center" }}>
              <img src={p.image} alt={p.name} width="80" />
              <p>{p.name}</p>
            </div>
          ))
        ) : (
          <p>No similar Pokémon found</p>
        )}
      </div>
      </div>
    </div>
  );
}

export default PokemonDetails;

