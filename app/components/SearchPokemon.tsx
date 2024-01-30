"use client"

import { useState, Fragment } from 'react'
import Image from 'next/image'
import { Combobox, Transition } from '@headlessui/react'

import { SearchPokemonProps } from '@/types'



const SearchPokemon = ({ pokemons, pokemon, setPokemon}: SearchPokemonProps) => {

  const [query, setQuery] = useState('')

  const filteredPokemons = query === "" ? pokemons : pokemons.filter((item) => (
    item.toLowerCase()
        .replace(/\s+/g, "")
        .includes(query.toLowerCase().replace(/\s+/g, ""))
))

  return (
    <div className="search-manufacturer">
    <Combobox value = {pokemon} onChange={setPokemon}>
        <div className='relative w-full'>

            <Combobox.Button className="absolute top-[14px]">
                <Image
                    src="/car-logo.svg"
                    width={20}
                    height={20}
                    className="ml-4"
                    alt="Car Logo"/>

            </Combobox.Button>

            <Combobox.Input className="search-manufacturer__input"
                placeholder="Bulbasaur"
                displayValue={(pokemon: any) => pokemon}
                onChange={(e:any) => setQuery(e.target.value)} />

            <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom='opacity-100'
                leaveTo='opacity-0'
                afterLeave={() => setQuery('')}>

                <Combobox.Options>
                    {
                        filteredPokemons.map((item) => (
                            <Combobox.Option
                                key={item}
                                className={({ active } : {active:any}) => `
                                    relative search=manufacturer__option
                                    ${active ? 'bg-primary-blue text-white' : 'text-gray-900'}
                                    `}
                                value={item}
                            >

                                {({ selected, active } : { selected:any, active:any }) => (
                                    <>
                                        <span className={`block truncate ${selected ? "font-medium" : "font-normal"}`}>
                                            {item}
                                        </span>

                                        {/* Show an active blue background color if the option is selected */}
                                        {selected ? (
                                            <span className={`absolute inset-y-0 left-0 flex items-center pl-3 ${active ? "text-white" : "text-pribg-primary-purple"}`}
                                            ></span>
                                        ) : null}
                                    </>
                                )}

                            </Combobox.Option>
                        )

                        )}

                </Combobox.Options>

            </Transition>

        </div>
    </Combobox>
</div>
  )
}

export default SearchPokemon
