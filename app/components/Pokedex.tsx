"use client";

import React, { useState ,useEffect } from "react";

import { PokemonDetailsProps } from "@/types";
import { PokemonCard } from ".";

const getPokedexFromLS = () => {
  const data = localStorage.getItem("Pokedex");
  if (data) {
    return JSON.parse(data);
  } else {
    return [];
  }
};

const Pokedex = () => {
  const [pokedex, setPokedex] = useState([]);

  useEffect(()=>{
    setPokedex(getPokedexFromLS());

    window.addEventListener("PokedexUpdate", () => {
      console.log("Change to local storage!");
      setPokedex(getPokedexFromLS());
    });
    },[])

  return (
    <div className="mt-12 padding-x padding-y max-width" id="discover">
      {pokedex.length > 0 ? (
        <section>
          <div className="home__cars-wrapper">
            {pokedex?.map((pokemon: PokemonDetailsProps) => (
              <PokemonCard pokemon={pokemon} />
            ))}
          </div>
        </section>
      ) : (
        <div className="home__error-container">
          <h2 className="text-black text-xl font-bold">Oops, you do not have any pokemons!</h2>
        </div>
      )}
    </div>
  );
};

export default Pokedex;
