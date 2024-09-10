import { useEffect, useState } from "react";
import axios from "axios";
function usePokemonList(){
    const [pokemonListState , setPokemonListState] = useState({
        isLoading : true,
        pokemonList : [],
        pokedexURL : 'https://pokeapi.co/api/v2/pokemon',
        nextURL : '',
        prevURL : ''
    })


    async function downloadPokemon(){
        setPokemonListState({...pokemonListState, isLoading : true})
        const response = await axios.get(pokemonListState.pokedexURL);
        const pokemonResults = response.data.results;

        setPokemonListState((state)=>({
            ...state,
            nextURL : response.data.next,
            prevURL : response.data.previous
        }))

        const pokemmonResultPromise = pokemonResults.map((pokemon) => axios.get(pokemon.url))
        const pokemonData = await axios.all(pokemmonResultPromise)
        console.log(pokemonData);
        const res = pokemonData.map((pokeData) => {
            const pokemon = pokeData.data;
            return{id : pokemon.id,
                   name : pokemon.name , 
                   image : (pokemon.sprites.other) ? pokemon.sprites.other.dream_world.front_default : pokemon.sprites.front_shiny , 
                   types : pokemon.types}
            }
        )

        console.log(res);
        setPokemonListState((state)=>({
            ...state, 
            pokemonList:res,
            isLoading:false
        }));
    }

    useEffect(()=>{
        downloadPokemon();
    } , [pokemonListState.pokedexURL])

    return {pokemonListState , setPokemonListState}
}

export default usePokemonList;