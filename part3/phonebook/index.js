const express = require('express')
const app = express()
var morgan = require('morgan')

// middlewares
app.use( express.json() )
app.use( morgan('tiny') )

// port binding
const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

// application data
let entries = [
    {
        "id": 1,
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": 2,
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": 3,
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": 4,
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]


// endpoints

app.get("/api/persons", (request, response)=>{
    response.json(entries)
})

app.get("/info", (request, response)=>{
    response.send(
        `<p>Phonebook has info for ${entries.length} people</p><p>${new Date()}</p>`
    )
})

app.get("/api/persons/:id", (request, response)=>{
    const id = Number(request.params.id)
    const person = entries.find( e => e.id === id )
    if (person) response.json( person )
    else response.status(404).send(`Person with id ${id} not found.`)
})

app.delete("/api/persons/:id", (request, response)=> {
    const id = Number(request.params.id)
    entries = entries.filter( e => e.id !== id)
    response.status(204).end()
})

app.post("/api/persons", (request, response)=>{
    const newEntry = request.body

    if (!newEntry.name) return response.status(400).json({error:"Missing name property"})
    if (!newEntry.number) return response.status(400).json({error:"Missing number property"})
    if ( entries.find(e => e.name.toLowerCase().trim() === newEntry.name.toLowerCase().trim()) )
        return response.status(400).json({error:"name must be unique"})

    newEntry.id = Math.floor( Math.random() * 100000 )
    entries = entries.concat(newEntry)
    response.json(newEntry)
})