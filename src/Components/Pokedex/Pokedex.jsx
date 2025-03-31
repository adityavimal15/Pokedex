import { useState } from 'react';
import PokemonList from '../PokemonList/PokemonList';
import Search from '../Search/Search';
import './Pokedex.css';

function Pokedex() {
    const [searchTerm, setSearchTerm] = useState("");

    return (
        <div className='pokeDex-wrapper'>
            <Search updateSearchTerm={setSearchTerm} />
            {searchTerm.length === 0 && <PokemonList />} {/* Hide PokemonList when searching */}
        </div>
    );
}

export default Pokedex;

