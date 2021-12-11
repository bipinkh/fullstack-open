const personRouter = require('express').Router()
const Person = require('../models/person')


personRouter.get('', (request, response) => {
    Person.find({}).then( result => response.json(result) )
})

personRouter.get('/info', (request, response) => {
    Person.count({}, function( err, count){
        response.json(`<p>Phonebook has info for ${count} people</p><p>${new Date()}</p>`)
    })
})

personRouter.get('/:id', (request, response, next) => {
    const id = request.params.id
    Person.findById(id).then( person => {
        if (person) response.json(person)
        else response.status(404).json({ error: `Person with id ${id} not found.` })
    }).catch( error => next(error))
})

personRouter.delete('/:id', (request, response, next) => {
    Person.findByIdAndRemove( request.params.id ).then( () => {
        response.status(204).end()
    }).catch( error => next(error) )
})

personRouter.post('', (request, response, next) => {
    const newEntry = request.body
    if (newEntry === undefined) response.status(400).json( { error:'Content missing' } )
    if (!newEntry.name) return response.status(400).json({ error:'Missing name property' })
    if (!newEntry.number) return response.status(400).json({ error:'Missing number property' })

    const person = new Person( {
        name: newEntry.name,
        number: newEntry.number
    } )
    person.save()
        .then( savedPerson => response.json(savedPerson) )
        .catch( error => next(error) )
})


personRouter.put('/:id', (request, response, next) => {
    const updateRequest = {
        name: request.body.name,
        number: request.body.number
    }
    Person.findOneAndUpdate( request.params.id, updateRequest, { new: true } )
        .then( updatedPerson => response.json(updatedPerson) )
        .catch( error => next(error) )
})

module.exports = personRouter