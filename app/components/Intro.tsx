"use client"

import Image from 'next/image';
import CustomButton  from './CustomButton';

const Intro = () => {

    const handleScroll = () => {

    }

    return (
        <div className="hero">
            <div className="flex-1 pt-36 padding-x">
                <h1 className="hero__title">
                    Find pokemons and catch them!
                </h1>

                <p className="hero__subtitle">
                    Search for pokemons you would like to add to your pokedex. You can release the ones you no longer like!
                </p>
        
            </div>

            <div className='hero__image-container'>
            <div className="hero__image">
                <Image src ="/pikachu.png" alt="pokemon intro" fill className="object-contain"/>

                </div>

                <div className="hero__image-overlay" />
            </div>

    
        </div>
    )
}

export default Intro