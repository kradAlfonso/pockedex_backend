require("dotenv").config();
const pokeAPI = require("./src/pokeAPI");
const express = require("express");
const app = express();
const port = process.env.PORT;
const environment = process.env.ENVIRONMENT;

let pokeCache = {}
let pokemonGen = 0

app.get("/", (request,response) =>{
    response.send(`Hello... `)
});

app.get("/pokemons/:generation", async (request,response) =>{
  const generation = Number(request.params.generation)
  
  if("pokemons" in pokeCache &&  pokemonGen === generation){
    console.log("Using Cache")
    response.send(pokemons)
  }
  else{
    console.log("Reaching new info")
    const pokemons = await pokeAPI.fetchPokemons(generation || 1)
    pokemonGen = generation
    console.log(pokemons)
    pokeCache = {pokemons: pokemons}
    response.send(pokemons)}
});

app.listen(port, () => console.log(`Server listening on ${environment}:${port}`));