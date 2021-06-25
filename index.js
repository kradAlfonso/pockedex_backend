const { request, response } = require("express");
const express = require("express")
const app = express();
const port = process.env.PORT || 8000

app.get("/:name", (request,response) =>{
    const name = request.params.name;
    response.send(`Hello... ${name}`)
});

app.listen(port, ()=> console.log(`Server Running on port ${port}`));