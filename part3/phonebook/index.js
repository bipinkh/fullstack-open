require("dotenv").config()

const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')

const Person = require('./src/models/person')

// middlewares
app.use(cors()) // enable cors
app.use(express.static('build')) // serve static contents from build folder
app.use( express.json() ) // transform every json request to json
morgan.token('reqbody', req => JSON.stringify(req.body) ) // morgan token
app.use( morgan(':method :url :status :res[content-length] - :response-time ms :reqbody') ) // print all requests

// port binding
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})


// endpoints

app.get("/api/persons", (request, response)=>{
    Person.find({}).then( result => response.json(result) )
})

app.get("/info", (request, response)=>{
    response.send(
        `<p>Phonebook has info for ${entries.length} people</p><p>${new Date()}</p>`
    )
})

app.get("/api/persons/:id", (request, response)=>{
    Person.findById(request.params.id).then( person => {
        response.json(person)
    }).catch( error => response.status(404).send(`Person with id ${id} not found.`) )
})

app.delete("/api/persons/:id", (request, response)=> {
    const id = Number(request.params.id)
    entries = entries.filter( e => e.id !== id)
    response.status(204).end()
})

app.post("/api/persons", (request, response)=>{
    const newEntry = request.body
    if (newEntry === undefined) response.status(400).json( {error:"Content missing"} )
    if (!newEntry.name) return response.status(400).json({error:"Missing name property"})
    if (!newEntry.number) return response.status(400).json({error:"Missing number property"})

    const person = new Person( {
        name: newEntry.name,
        number: newEntry.number
    } )
    person.save().then( savedPerson => response.json(savedPerson) )
})