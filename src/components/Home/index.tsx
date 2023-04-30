import React, { useEffect, useState } from "react";
import { Pokemon, Abilities, Types } from '../types/types'
import styles from './styles.module.css'
const Home = () => {

    const [data, setData] = useState<Pokemon | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [nextPokemon, setNextPokemon] = useState<number>(1)
    const [previousPokemon, setPreviousPokemon] = useState<number>(nextPokemon)

    const pokeAPI = `https://pokeapi.co/api/v2/pokemon/${nextPokemon}`
    const fallbackURL = 'https://c.tenor.com/I6kN-6X7nhAAAAAj/loading-buffering.gif'

    useEffect(() => {
        setIsLoading(true)
        fetch(pokeAPI)
            .then(response => response.json())
            .then(data => {
                setData(data)
                setIsLoading(false)
            })
            .catch(err => console.log(err))

    }, [pokeAPI, nextPokemon, previousPokemon])

    const handleOpenModal = () => {
        setIsOpen(!isOpen)
    }

    const handleNextPokemon = () => {
        setNextPokemon(nextPokemon + 1)
    }

    const handlePreviousPokemon = () => {
        if (nextPokemon > 1) {
            const temp = nextPokemon - 1;
            setPreviousPokemon(temp);
            setNextPokemon(temp);
        }
    }


    const pokemonImage = data?.sprites?.other?.["official-artwork"]?.front_default
    const pokemonName = data?.name
    const pokemonTypes = data?.types?.map((types: Types, index: number) => {
        return <li key={index}>{types?.type?.name}</li>
    })
    const pokemonAbilities = (data?.abilities?.map((abilities: Abilities, index: number) => {
        return <li key={index}>{abilities?.ability?.name}</li>
    }))


    return (
        <>
            <div className={styles.wrapper}>
                {isOpen ? (
                    <div>
                        <ul>
                            {isLoading &&
                                <img src={fallbackURL} width={30} height={30} alt="Carregando" />
                            }

                            {
                                data && (
                                    <div>
                                        <div>
                                            <img src={pokemonImage} alt={pokemonName} width={100} height={100} />
                                            <p>{nextPokemon}</p>
                                            <p>{pokemonName}</p>
                                        </div>

                                        <div>
                                            <ul>
                                                <p>Types:</p>
                                                {pokemonTypes}

                                            </ul>

                                            <ul>
                                                <p>Abilities:</p>
                                                {pokemonAbilities}
                                            </ul>
                                        </div>
                                    </div>
                                )
                            }
                        </ul>

                        <div>
                            <button onClick={handlePreviousPokemon}>Voltar</button>
                            <button onClick={handleNextPokemon}>Próximo</button>
                        </div>
                    </div>

                ) : <div className={styles.openButtonWrapper}>
                    <button onClick={handleOpenModal} className={styles.openButton}>Clique Aqui para abrir sua Pokedex!</button>
                </div>
                }
            </div>

        </>
    )
}

export default Home;