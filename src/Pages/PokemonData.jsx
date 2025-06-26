import React, { useEffect, useState } from 'react'
import {useParams, useNavigate} from 'react-router-dom'
export default function PokemonData() {
  const { id } = useParams()
  const navigate = useNavigate()
  
  const [pokemon, setPokemon] = useState(null)
  const [loading, setLoading] = useState(true)

  const buscarPokemon = async () => {
    try{
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
      const data = await response.json()
      setPokemon(data)
      setLoading(false)
    }catch(error){
      console.log("Erro ao buscar Pokemón:", error)
      setLoading(false)
    }
  }
  
 useEffect(() => {
   buscarPokemon()
 }, [id])
 
  if(loading){
    return (
      <div className="flex">
        <span className='loading loading-spinner loading-lg'></span>
      </div>
    )
  }
 
 if(!pokemon){
  return<div className="text-center mt-10">Pokemón não encontrado</div>
 }

  return (
    <div className="p-6 max-w-xl mx-auto">
      <div className="card bg-base-200 shadow-xl">
        <figure className="px-10 pt-10">
          <img
            src={
              pokemon.sprites.versions["generation-v"]["black-white"].animated
                .front_default || pokemon.sprites.front_default
            }
            alt={pokemon.name}
            className="w-32 h-32"
          />
          <img
            src={
              pokemon.sprites.versions["generation-v"]["black-white"].animated
                .front_shiny || pokemon.sprites.front_shiny
            }
            alt={pokemon.name}
            className="w-32 h-32"
          />
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title capitalize text-2xl">{pokemon.name}</h2>
          <p className="text-sm text-gray-500 mb-2">ID: {pokemon.id}</p>

          <div className="flex gap-2 mb-2">
            {pokemon.types.map((tipo) => (
              <div
                key={tipo.type.name}
                className={`badge badge-outline capitalize`}
              >
                {tipo.type.name}
              </div>
            ))}
          </div>

          <p>Peso: {pokemon.weight / 10} kg</p>
          <p>Altura: {pokemon.height / 10} m</p>

          <div className="mt-4">
            <p className="font-bold">Habilidades:</p>
            <ul>
              {pokemon.abilities.map((a) => (
                <li key={a.ability.name} className="capitalize">
                  - {a.ability.name}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6">
            <button onClick={() => navigate(-1)} className="btn btn-outline">
              Voltar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
