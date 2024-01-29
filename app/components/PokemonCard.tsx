"use client";

import { useState } from "react";
import Image from "next/image";

import { PokemonDetailsProps } from "@/types";
import { CustomButton } from ".";

import { PokemonDetails } from ".";

interface PokemonCardProps {
  pokemon: PokemonDetailsProps;
}

const PokemonCard = ({ pokemon }: PokemonCardProps) => {
  const { name, weight, imageUrl } = pokemon;
  const [isOpen, setIsOpen] = useState(false);

  console.log("saved pokemon");
  console.log(pokemon);

  return (
    <div className="car-card group">
      <div className="car-card__content">
        <h2 className="car-card__content-title">{name}</h2>
      </div>

      <p className="flex mt-6 text-[32px] leading-[38px] font-extrabold">
        {weight}
        <span className="self-end text-[14px] leading-[17px] font-medium">
          kg
        </span>
      </p>

      <div className="relative w-full h-40 my-3 object-contain">
        <Image
          src={imageUrl}
          alt="pokemon model"
          fill
          priority
          className="object-contain"
        />
      </div>

      <div className="relative flex w-full mt-2">
        <div className="flex group-hover:invisible w-full justify-between text-grey">
          {pokemon.types.length > 0 ? (
            <div className="flex flex-col justify-center items-center gap-2">
              <Image
                src={pokemon.types[0].imageUrl}
                width={40}
                height={40}
                alt="type 1"
              />
              <p className="text-[14px] leading-[17px]">
                {pokemon.types[0].name}
              </p>
            </div>
          ) : (
            <></>
          )}

          {pokemon.types.length > 1 ? (
            <div className="flex flex-col justify-center items-center gap-2">
              <Image
                src={pokemon.types[1].imageUrl}
                width={40}
                height={40}
                alt="type 1"
              />
              <p className="text-[14px] leading-[17px]">
                {pokemon.types[1].name}
              </p>
            </div>
          ) : (
            <></>
          )}

          {pokemon.types.length > 2 ? (
            <div className="flex flex-col justify-center items-center gap-2">
              <Image
                src={pokemon.types[2].imageUrl}
                width={40}
                height={40}
                alt="type 1"
              />
              <p className="text-[14px] leading-[17px]">
                {pokemon.types[2].name}
              </p>
            </div>
          ) : (
            <></>
          )}
        </div>

        <div className="car-card__btn-container">
          <CustomButton
            title="View More"
            containerStyles="w-full py-[16px] rounded-full bg-primary-blue"
            textStyles="text-white text-[14px] leading-[17px] font-bold"
            handleClick={() => setIsOpen(true)}
          />
        </div>

        <PokemonDetails
          isOpen={isOpen}
          isCaptureMode={false}
          closeModal={() => setIsOpen(false)}
          pokemon={pokemon}
        />
      </div>
    </div>
  );
};

export default PokemonCard;
