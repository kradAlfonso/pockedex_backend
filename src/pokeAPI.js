const fetch = require("node-fetch")

module.exports.fetchPokemons = async (generation) => {
    let pokemons = []
    let pokeNum = 0
    let pokeOffset = 0

    switch(generation)
    {
        case 1:
            pokeNum = 151
            pokeOffset = 0
            break
        case 2:
            pokeNum = 100
            pokeOffset = 151
            break

        case 3:
            pokeNum = 135
            pokeOffset = 251
            break
            
        case 4:
            pokeNum = 107
            pokeOffset = 386
            break
            
        case 5:
            pokeNum = 156
            pokeOffset = 493
            break
        
        case 6:
            pokeNum = 72
            pokeOffset = 649
            break
        
        case 7:
            pokeNum = 88
            pokeOffset = 721
            break

        case 8:
            pokeNum = 84
            pokeOffset = 809
            break

    }

    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${pokeNum}&offset=${pokeOffset}`)
    const pokemonURLs = await response.json()

    await Promise.all(pokemonURLs.results.map(async (pokemonURLs) =>{
        const pokemon = await fetch(pokemonURLs.url)
        pokemons.push(await pokemon.json())
    }))

    return pokemonsStoraged(pokemons)
}

const pokemonsStoraged = (pokemons) => {
    let cleanPokemons = [];
  
    pokemons.map((pokemon) => {
      cleanPokemons.push({
        id: pokemon.id,
        name: pokemon.name,
        front_front: pokemon.sprites.front_default,
        front_back: pokemon.sprites.back_default,
        types: pokemon.types,
        moves: pokemon.moves
      })
    })

    return cleanPokemons
  };