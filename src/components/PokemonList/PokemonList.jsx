import './PokemonList.css'
import Pokemon from "../Pokemon/Pokemon";
import usePokemonList from "../../hooks/usePokemonList";
function PokemonList(){
    const {pokemonListState , setPokemonListState} = usePokemonList();
    return(
        <div className="pakemon-list-wrapper">
            <div cl assName="pokemon-wrapper">
                {(pokemonListState.isLoading) ? 'Loading...' : 
                    pokemonListState.pokemonList.map((p) => <Pokemon name = {p.name} image={p.image} key={p.id} id={p.id}/>)
                }
            </div>
            <div className="controls">
                <button disabled={!pokemonListState.prevURL} onClick={() => setPokemonListState(prevState => ({ ...prevState, pokedexURL: pokemonListState.prevURL }))}>Prev</button>
                <button disabled={!pokemonListState.nextURL} onClick={() => setPokemonListState(prevState => ({ ...prevState, pokedexURL: pokemonListState.nextURL }))}>Next</button>
            </div>

        </div>
    )
}

export default PokemonList;