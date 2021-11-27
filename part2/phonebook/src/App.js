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
        if (persons.filter(p => p.name === newName).length > 0) {
            alert(`${newName} is already added to phonebook`);
            return
        }

        phonebookService.addEntry( {name: newName, number: newNumber, id: persons.length+1} )
            .then( newPerson => setPersons( persons.concat(newPerson) ) )

        setNewName("")
        setNewNumber("")
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
            <Persons personsToShow={personsToShow}/>
        </div>
    )
}

export default App