require("dotenv").config()

const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')

const Person = require('./src/models/person')

// setup morgan
morgan.token('reqbody', req => JSON.stringify(req.body) ) // morgan token
const requestLogger = morgan(':method :url :status :res[content-length] - :response-time ms :reqbody')

// middlewares
app.use(cors()) // enable cors
app.use(express.static('build')) // serve static contents from build folder
app.use( express.json() ) // transform every json request to json
app.use( requestLogger ) // print all requests

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
        if (person) response.json(person)
        else response.status(404).send(`Person with id ${id} not found.`)
    }).catch( error => {
        console.log(error)
        response.status(400).send("malformatted id")
    } )
})

app.delete("/api/persons/:id", (request, response)=> {
    Person.findByIdAndRemove( request.params.id ).then( result => {
        response.status(204).end()
    }).catch( error => response.status(500).end() )
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