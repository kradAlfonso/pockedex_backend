const fetch = require("node-fetch");

const cleanPokemons = [];

module.exports.fetchPokemons = async (generation) => {
  let pokemons = [];

  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${
      getPokeGen(generation).pokeNum
    }&offset=${getPokeGen(generation).pokeOffset}`
  );
  const pokemonURLs = await response.json();

  await Promise.all(
    pokemonURLs.results.map(async (pokemonURLs) => {
      const pokemon = await fetch(pokemonURLs.url);
      pokemons.push(await pokemon.json());
    })
  );

  pokemonsStoraged(pokemons);

  return cleanPokemons.slice(
    getPokeGen(generation).pokeOffset,
    getPokeGen(generation).pokeNum+getPokeGen(generation).pokeOffset
  );
};

const pokemonsStoraged = (pokemons) => {
  pokemons.map((pokemon) => {
    cleanPokemons[pokemon.id-1] = {
      id: pokemon.id,
      name: pokemon.name,
      front_default: pokemon.sprites.front_default,
      back_default: pokemon.sprites.back_default,
      types: pokemon.types,
      moves: pokemon.moves,
    };
  });
  
};

module.exports.pokemonsInCache = (generation) => {
  return cleanPokemons.slice(
    getPokeGen(generation).pokeOffset,
    getPokeGen(generation).pokeNum+getPokeGen(generation).pokeOffset
  );
};

const getPokeGen = (gen) => {
  let pokeRange = { pokeNum: 0, pokeOffset: 0 };

  switch (gen) {
    case 1:
      pokeRange.pokeNum = 151;
      pokeRange.pokeOffset = 0;
      break;
    case 2:
      pokeRange.pokeNum = 100;
      pokeRange.pokeOffset = 151;
      break;

    case 3:
      pokeRange.pokeNum = 135;
      pokeRange.pokeOffset = 251;
      break;

    case 4:
      pokeRange.pokeNum = 107;
      pokeRange.pokeOffset = 386;
      break;

    case 5:
      pokeRange.pokeNum = 156;
      pokeRange.pokeOffset = 493;
      break;

    case 6:
      pokeRange.pokeNum = 72;
      pokeRange.pokeOffset = 649;
      break;

    case 7:
      pokeRange.pokeNum = 88;
      pokeRange.pokeOffset = 721;
      break;

    case 8:
      pokeRange.pokeNum = 84;
      pokeRange.pokeOffset = 809;
      break;
  }
  return pokeRange;
};

