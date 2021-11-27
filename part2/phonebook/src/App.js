import React, {useState, useEffect} from 'react'
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import phonebookService from "./services/Phonebook";

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filter, setFilter] = useState('')

    // use effect hook
    useEffect( () =>{
        phonebookService.getAllEntries()
            .then( allEntries => setPersons(allEntries) )
        }, [])

    // event handlers
    const addName = (event) => {
        event.preventDefault()
        const data = {name: newName.trim(), number: newNumber}
        const duplicates = persons.filter(p => p.name === newName.trim())
        if (
            duplicates.length > 0 &&
            window.confirm(`${duplicates[0].name} is already added to phonebook, replace the old number with a new one?`)
        ){
            phonebookService.updateEntry(duplicates[0].id, data)
                .then( updatedPerson => setPersons( persons.map( p => p.id === duplicates[0].id ? updatedPerson : p ) ) )
        }else {
            phonebookService.addEntry( data )
                .then( newPerson => setPersons( persons.concat(newPerson) ) )
        }

        setNewName("")
        setNewNumber("")
    }

    const removeName = (id) => {
        const person = persons.find( p => p.id === id )
        if ( window.confirm(`Delete ${person.name}?`) )
            phonebookService.deleteEntry(id)
                .then( response => setPersons( persons.filter(p => p.id !== id)) )
    }

    const handleNewNameChange = (event) => setNewName(event.target.value)
    const handleNewNumberChange = (event) => setNewNumber(event.target.value)
    const handleFilterChange = (event) => setFilter(event.target.value)

    // processing the state to get useful data for display
    const personsToShow = persons.filter(p => p.name.toLowerCase().startsWith(filter.toLowerCase()))

    // return
    return (
        <div>
            <h2>Phonebook</h2>
            <Filter filter={filter} changeHandler={handleFilterChange}/>
            <h3>Add a new</h3>
            <PersonForm
                newName={newName}
                newNameChangeHandler={handleNewNameChange}
                newNumber={newNumber}
                newNumberChangeHandler={handleNewNumberChange}
                addName={addName}/>
            <h3>Numbers</h3>
            <Persons personsToShow={personsToShow} deleteHandler={removeName}/>
        </div>
    )
}

export default App