import PokemonList from '../PokemonList/PokemonList';
import Search from '../Search/Search';

function Pokedex(){
    return(
        <div className='pokeDex-wrapper'>
            POKEDEX
            <Search/>
            <PokemonList/>
        </div>
    );
}

export default Pokedex; 