import React, { useState } from 'react'


const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-123456', id: 1 },
        { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
        { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
        { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
    ])
    const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

    const addName = (event) => {
      event.preventDefault()
         if (persons.filter( p => p.name === newName ).length > 0){
             alert(`${newName} is already added to phonebook`);
             return
         }
      setPersons( persons.concat( {name: newName, number: newNumber} ))
      setNewName("")
        setNewNumber("")
    }

    const handleNewNameChange = (event) => setNewName(event.target.value)
    const handleNewNumberChange = (event) => setNewNumber(event.target.value)
    const handleFilterChange = (event) => setFilter(event.target.value)

    const personsToShow = persons.filter( p => p.name.toLowerCase().startsWith(filter.toLowerCase()) )

  return (
      <div>
        <h2>Phonebook</h2>
              <div>filter shown with <input value={filter} onChange={handleFilterChange}/></div>
          <h2>add a new</h2>
        <form>
            <div>name: <input value={newName} onChange={handleNewNameChange}/></div>
            <div>name: <input value={newName} onChange={handleNewNameChange}/></div>
            <div>number: <input value={newNumber} onChange={handleNewNumberChange}/></div>
            <div><button type="submit" onClick={addName}>add</button></div>
        </form>
        <h2>Numbers</h2>
          {personsToShow.map( p => <div key={p.id}>{p.name} {p.number}</div> )}
      </div>
  )
}

export default App