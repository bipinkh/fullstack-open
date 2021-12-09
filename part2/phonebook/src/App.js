import React, {useState, useEffect} from 'react'
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import phonebookService from "./services/Phonebook";
import Notification from "./components/Notification";

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filter, setFilter] = useState('')
    const [message, setMessage] = useState(null)
    const [error, setError] = useState(null)

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
                .then( updatedPerson => {
                    if (updatedPerson == null){
                        setNotification(`Information of ${duplicates[0].name} has already been removed from server`, true)
                        return
                    }
                    console.log("updating person now..")
                    setPersons( persons.map( p => p.id === duplicates[0].id ? updatedPerson : p ) )
                    setNotification(`Updated number of ${updatedPerson.name}`, false)
                })
                .catch( error => setNotification(error.response.data.error, true) )

        }else {
            phonebookService.addEntry( data )
                .then( newPerson => {
                    setPersons( persons.concat(newPerson) )
                    setNotification(`Added ${newPerson.name}`, false)
                })
                .catch( error => setNotification(error.response.data.error, true) )
        }

        setNewName("")
        setNewNumber("")
    }

    const removeName = (id) => {
        const person = persons.find( p => p.id === id )
        if ( window.confirm(`Delete ${person.name}?`) )
            phonebookService.deleteEntry(id)
                .then( response => {
                    if (response == null){
                        setNotification(`Information of ${person.name} has already been removed from server`, true)
                        return
                    }
                    setPersons( persons.filter(p => p.id !== id))
                    setNotification(`Removed person ${person.name}`, false)
                })
    }

    const setNotification = (message, isError) => {
        // update state for message or error
        if (isError) setError(message)
        else setMessage(message)
        // in 20 seconds, remove the message or error
        setTimeout( () => isError ? setError(null) : setMessage(null), 5000 )
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
            <Notification message={message} isError={false} />
            <Notification message={error} isError={true} />
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