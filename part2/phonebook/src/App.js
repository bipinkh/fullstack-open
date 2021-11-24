import React, { useState } from 'react'


const App = () => {
  const [persons, setPersons] = useState([{ name: 'Arto Hellas', number: '040-1234567'}])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

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

  return (
      <div>
        <h2>Phonebook</h2>
        <form>
            <div>name: <input value={newName} onChange={handleNewNameChange}/></div>
            <div>number: <input value={newNumber} onChange={handleNewNumberChange}/></div>
            <div><button type="submit" onClick={addName}>add</button></div>
        </form>
        <h2>Numbers</h2>
          {persons.map( p => <div key={p.name}>{p.name} {p.number}</div> )}
      </div>
  )
}

export default App