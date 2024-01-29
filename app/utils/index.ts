import { PokemonDetailsProps } from "@/types";

export async function fetchPokemons() {  // fetch pokemon here instead
 
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=20"')

    const result = await response.json()

    return result.results.map((pokemon) => pokemon.name);
}

export async function getPokemonDetails(name: string) {

    const pokemonResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)

    const result = await pokemonResponse.json()

    return {
      name: name,
      weight: result.weight,
      imageUrl: `https://img.pokemondb.net/artwork/${name}.jpg`,
    }
}
