"use client";

import Image from "next/image";
import { Fragment } from "react";

import { CustomButton } from ".";

import { Dialog, Transition } from "@headlessui/react";

import { PokemonDetailsProps, PokemonStatsProps } from "@/types";

interface PokemonDetailProps {
  // need to change this name
  isOpen: boolean;
  isCaptureMode: boolean;
  closeModal: () => void;
  pokemon: PokemonDetailsProps;
  // here I might have to add one more for where it is for catching pokemons or view details
}

const getPokedexFromLS = () => {
  const data = localStorage.getItem("Pokedex");
  if (data) {
    return JSON.parse(data);
  } else {
    return [];
  }
};

const PokemonDetails = ({
  isOpen,
  isCaptureMode,
  closeModal,
  pokemon,
}: PokemonDetailProps) => {
  const capturePokemon = () => {
    const pokedex = getPokedexFromLS();
    localStorage.setItem("Pokedex", JSON.stringify([...pokedex, pokemon]));

    window.dispatchEvent(new Event("PokedexUpdate"));
    closeModal();
  };

  const releasePokemon = () => {
    const pokedex = getPokedexFromLS();
    const updatedPokedex = pokedex.filter(
      (item: PokemonDetailsProps) => item.id !== pokemon.id
    );
    localStorage.setItem("Pokedex", JSON.stringify(updatedPokedex));

    window.dispatchEvent(new Event("PokedexUpdate"));
    closeModal();
  };

  console.log("PokemonDetailProps");
  console.log(pokemon);

  return isOpen ? (
    <>
      {" "}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25 " />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto transform rounded-2xl bg-white p-6 text-left shadow-xl transition-all flex flex-col gap-5">
                  <button
                    type="button"
                    className="absolute top-2 right-2 z-10 w-fit p-2 bg-primary-blue-100 rounded-full"
                    onClick={closeModal}
                  >
                    <Image
                      src="/close.svg"
                      alt="close"
                      width={20}
                      height={20}
                      className="object-contain"
                    />
                  </button>

                  <div className="flex-1 flex flex-col gap-3">
                    <div className="relative w-full h-40 bg-pattern bg-cover bg-center rounded-lg">
                      <Image
                        src={pokemon.imageUrl}
                        alt="car model"
                        fill
                        priority
                        className="object-contain"
                      />
                    </div>

                    <div className="flex gap-3">
                      {pokemon.types.length > 0 ? (
                        <div className="flex-1 relative w-full h-24 bg-primary-blue-100 rounded-lg">
                          <Image
                            src={pokemon.types[0].imageUrl}
                            alt="car model"
                            fill
                            priority
                            className="object-contain"
                          />
                        </div>
                      ) : (
                        <></>
                      )}

                      {pokemon.types.length > 1 ? (
                        <div className="flex-1 relative w-full h-24 bg-primary-blue-100 rounded-lg">
                          <Image
                            src={pokemon.types[1].imageUrl}
                            alt="car model"
                            fill
                            priority
                            className="object-contain"
                          />
                        </div>
                      ) : (
                        <></>
                      )}

                      {pokemon.types.length > 2 ? (
                        <div className="flex-1 relative w-full h-24 bg-primary-blue-100 rounded-lg">
                          <Image
                            src={pokemon.types[2].imageUrl}
                            alt="car model"
                            fill
                            priority
                            className="object-contain"
                          />
                        </div>
                      ) : (
                        <></>
                      )}

                      {/* <div className="flex-1 relative w-full h-24 bg-primary-blue-100 rounded-lg">
                        <Image
                          src={pokemon.imageUrl}
                          alt="car model"
                          fill
                          priority
                          className="object-contain"
                        />
                      </div>

                      <div className="flex-1 relative w-full h-24 bg-primary-blue-100 rounded-lg">
                        <Image
                          src={pokemon.imageUrl}
                          alt="car model"
                          fill
                          priority
                          className="object-contain"
                        />
                      </div>

                      <div className="flex-1 relative w-full h-24 bg-primary-blue-100 rounded-lg">
                        <Image
                          src={pokemon.imageUrl}
                          alt="car model"
                          fill
                          priority
                          className="object-contain"
                        />
                      </div> */}
                    </div>
                  </div>

                  <div className="flex-1 flex flex-col gap-2">
                    <h2 className="font-semibold text-xl capitalize">
                      {pokemon.name}
                    </h2>

                    <div className="mt-3 flex flex-wrap gap-4">
                      {pokemon.stats.map((stat) => (
                        <div
                          className="flex justify-between gap-5 w-full text-right"
                          key={stat.name}
                        >
                          <h4 className="text-grey capitalize">{stat.name}</h4>
                          <p className="text-black-100 font-semibold">
                            {stat.value}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-4">
                    {isCaptureMode ? (
                      <CustomButton
                        title="Capture Pokemon"
                        containerStyles="w-full py-[16px] rounded-full bg-primary-blue"
                        textStyles="text-white text-[14px] leading-[17px] font-bold"
                        handleClick={() => capturePokemon()}
                      />
                    ) : (
                      <CustomButton
                        title="Release Pokemon"
                        containerStyles="w-full py-[16px] rounded-full bg-primary-blue"
                        textStyles="text-white text-[14px] leading-[17px] font-bold"
                        handleClick={() => releasePokemon()}
                      />
                    )}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  ) : (
    <></>
  );
};

export default PokemonDetails;
