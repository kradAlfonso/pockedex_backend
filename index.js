require("dotenv").config();
const pokeAPI = require("./src/pokeAPI");
const express = require("express");
const app = express();
const port = process.env.PORT;
const environment = process.env.ENVIROMENT;

const genRequested = [false, false, false, false, false, false, false, false];

app.get("/pokemons/:generation", async (request, response) => {
  let generation = Number(request.params.generation);
  
  console.log(genRequested[generation]);
  
  if (genRequested[generation] === true) {
    console.log("Using Cache");
    let pokemons = await pokeAPI.pokemonsInCache(generation);
    response.setHeader("Access-Control-Allow-Origin", "*").send(pokemons);
  } else {
    genRequested[generation] = true;
    console.log(genRequested[generation]);
    console.log("Reaching new info");
    let pokemons = await pokeAPI.fetchPokemons(generation || 1);
    response.setHeader("Access-Control-Allow-Origin", "*").send(pokemons);
  }
});

app.listen(port, () =>
  console.log(`Server listening on ${environment}:${port}`)
);
