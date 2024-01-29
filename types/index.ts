import { MouseEventHandler } from "react";

export interface CustomButtonProps {
    title: string;
    containerStyles?: string;
    handleClick?: MouseEventHandler<HTMLButtonElement>;
    btnType?: "button" | "submit";
    textStyles?: string;
    rightIcon?: string;
    isDisabled?: boolean;
}

export interface SearchPokemonProps {
    pokemons: Array<string>; 
    pokemon: string;
    setPokemon: (pokemon: string) => void;
}

export interface PokemonProps {
    name:string;
    url: string;
}

export interface PokemonDetailsProps {
    id: string;
    name:string;
    weight: number;
    imageUrl: string;
    stats: Array<PokemonStatsProps>;
    types: Array<PokemonTypesProps>;
}

export interface PokemonStatsProps {
    name:string;
    value: number
}

export interface PokemonTypesProps {
    name:string;
    imageUrl: string
}