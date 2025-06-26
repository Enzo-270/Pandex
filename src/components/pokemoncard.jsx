import React from 'react'
import { useNavigate } from 'react-router-dom'

const tipoCor = {
    fire: "bg-red-300",
    water: "bg-blue-300",
    ghost: "bg-indigo-300",
    grass: "bg-green-300",
    bug: "bg-lime-300",
    dragon: "bg-purple-600",
    ground: "bg-yellow-600",
    rock: "bg-yellow-700",
    psychic: "bg-pink-600",
    dark: "bg-gray-700",
    ice: "bg-blue-200",
    eletric: "bg-yellow-300",
    fairy: "bg-pink-300",
    steel: "bg-gray-300",
    flying: "bg-sky-300",
    normal: "bg-gray-200",
    poison: "bg-purple-300",
    fighting: "bg-red-600",
}

export default function Pokemoncard({ pokemon }) {
    const navigate = useNavigate()

    return (
        <div className='card bg-base-200 shadow-md p-4 flex flex-col items-center text-center hover:shadow-lg transition-all duration-200'>
            <img src={pokemon.image} alt={pokemon.name} className="w-20 h-20 mb-2" />
            <h2 className="flex gap-2 flex-wrap justify-center mb-2">
                {pokemon.name}
            </h2>
            <div className="flex gap-2 flex-wrap justify-center mb-2">
                {pokemon.types.map((type) => (
                    <span key={type}
                        className={`badge text-sm font-semibold ${tipoCor[type] || "bg-gray-300"}`} >
                        {type}
                    </span>
                ))}
            </div>
            <button onClick={() => navigate(`/pokemon/${pokemon.name}`)} className="btn btn-primary btn-sm mt-auto">
               Ver detalhes
            </button>
        </div>
    )
}
