import React, {useState} from 'react'
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
    const [persons, setPersons] = useState([
        {name: 'Arto Hellas', number: '040-123456', id: 1},
        {name: 'Ada Lovelace', number: '39-44-5323523', id: 2},
        {name: 'Dan Abramov', number: '12-43-234345', id: 3},
        {name: 'Mary Poppendieck', number: '39-23-6423122', id: 4}
    ])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filter, setFilter] = useState('')

    const addName = (event) => {
        event.preventDefault()
        if (persons.filter(p => p.name === newName).length > 0) {
            alert(`${newName} is already added to phonebook`);
            return
        }
        setPersons(persons.concat({name: newName, number: newNumber, id: persons.length+1}))
        setNewName("")
        setNewNumber("")
    }

    const handleNewNameChange = (event) => setNewName(event.target.value)
    const handleNewNumberChange = (event) => setNewNumber(event.target.value)
    const handleFilterChange = (event) => setFilter(event.target.value)

    const personsToShow = persons.filter(p => p.name.toLowerCase().startsWith(filter.toLowerCase()))

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