"use client"

import React, { useState, useEffect } from "react";
import useSWR from 'swr';

import Image from 'next/image';
import SearchPokemon from "./SearchPokemon";


import { PokemonDetailsProps } from "@/types";
import {PokemonDetails} from ".";
import { pokemonTypeImages } from "../constants";


const SearchButton = ({otherClasses}: {otherClasses: string}) => (
  <button type="submit" className={`-ml-3 z-10 ${otherClasses}`}>     
    <Image 
    src = "/magnifying-glass.svg"
    alt = "magnifying glass"
    width = {40}
    height = {40}
    className = "object-contain"/>
  </button>
)

const fetcher = (url: string) => fetch(url).then(res => res.json());

const SearchBar = () => {

    const { data: response, isValidating, error } = useSWR('https://pokeapi.co/api/v2/pokemon?limit=500', fetcher);
    const [pokemons, setPokemons] = useState([])

    const [pokemon, setPokemon] = useState('')
    const {data: capturePokemonData, isValidatingCapturePokemon, errorCapturePokemon} = useSWR(pokemon === '' ? null : `https://pokeapi.co/api/v2/pokemon/${pokemon}`, fetcher);
    const [capturePokemon, setCapturePokemon] = useState<PokemonDetailsProps>()
    const [isOpen, setIsOpen] = useState(false);

    useEffect(()=>{
      if(response) {
        const pokemons = response.results.map((pokemon) => pokemon.name)
        setPokemons(pokemons)
      }
    },[response]) // useEffect will run whenever ouseState value changes

    useEffect(()=>{
      if(error) {
        console.log('Error occured when fetching pokmenons list')
        alert('Error occured when fetching pokmenons list')
      }
    },[error])

    useEffect(()=>{
      if(capturePokemonData) {
  
        const pokemonStats = capturePokemonData.stats.map((stat) => {
          return {
            name: stat.stat.name,
            value:stat.base_stat,
          }
        })

        const pokemonTypes = pokemonTypeImages.filter((type) => {
          return capturePokemonData.types.some(t => t.type.name === type.name)
        })

        const selectedPokemon = {
          id: 'id' + (new Date()).getTime(),
          name: pokemon,
          weight: capturePokemonData.weight,
          imageUrl: `https://img.pokemondb.net/artwork/${pokemon}.jpg`,
          stats: pokemonStats,
          types: pokemonTypes,
        }

        if(selectedPokemon.name.length == 0)
          return;

        setCapturePokemon(selectedPokemon)
        setIsOpen(true)
      }
    },[capturePokemonData]) 

    useEffect(()=>{
      if(errorCapturePokemon) {
        console.log('Error occured when searching pokemon')
        alert('Error occured when searching pokemon')
      }
    },[errorCapturePokemon])

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
    }

  return (
    <div >
    <form className="searchbar" onSubmit={handleSearch}>
        <div className="searchbar__item">
            <SearchPokemon
            pokemons = {pokemons}
            pokemon = {pokemon}
            setPokemon={setPokemon}/>
            <SearchButton otherClasses="sm:hidden"/>
        </div>

        <SearchButton otherClasses="max-sm:hidden"/>
    </form>

    {!pokemon}      

    <PokemonDetails isOpen={isOpen} isCaptureMode = {true} closeModal={() => setIsOpen(false)} pokemon={capturePokemon} /> 
</div>
  )
}

export default SearchBar