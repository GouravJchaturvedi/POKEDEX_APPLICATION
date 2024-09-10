import PokemonList from "../PokemonList/PokemonList";
import Search from "../Search/Search";
import './Pokedex.css'
function pokedex(){
    return(
        <div className="pokedex-wrapper"> 
            <Search/>
            <PokemonList/>
        </div>

    )
}

export default pokedex;