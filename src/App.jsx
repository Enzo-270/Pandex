import React,{ useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Pokemoncard from './components/pokemoncard'

function App() {
  const [pokemons, setPokemons] = useState([])
  const [faixa, setFaixa] = useState('1-100')

  const buscarPokemon = async (inicio, fim) =>{
    try{
      const promisses = []
      for (let i = inicio; i <= fim;i++){
        promisses.push(fetch(`https://pokeapi.co/api/v2/pokemon/${i}`).then((res) => res.json()))
      }
    
       const results = await Promise.all(promisses)
    
       const formatados = results.map((data) => ({
        name: data.name,
        id: data.id,
        image: data.sprites.front_default,
        types: data.types.map((t) => t.type.name)
       }))
         setPokemons(formatados)
       } catch (error) {
        console.error("Erro ao buscar os Pokemon: ", error)
    }
  }
 
  useEffect(() => {
    const [inicio, fim] = faixa.split('-').map(Number) 
    buscarPokemon(inicio, fim)
  },)
  
  return (
    <div className='p-4'>
      <h1 className='text-2xl font-bold mb-4'>Lista de Pokemón</h1>
      <select onChange={e => setFaixa(e.target.value)} name="" id="">
        <option value="1-100">1-100</option>
        <option value="101-200">101-200</option>
        <option value="201-300">201-300</option>
        <option value="301-400">301-400</option>
        <option value="401-500">401-500</option>
        <option value="501-600">501-600</option>
        <option value="601-700">601-700</option>
        <option value="701-800">701-800</option>
        <option value="801-900">801-900</option>
        <option value="901-1000">901-1000</option>
      </select>
    
    <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4'>
      {
        pokemons.map((pokemon) => (<Pokemoncard pokemon={pokemon}/>))
      }
    </div>
    </div>

  )
}

export default App
