import React, { useState } from 'react'


const App = () => {
  const [persons, setPersons] = useState([{ name: 'Arto Hellas' }])
  const [newName, setNewName] = useState('')

    const addName = (event) => {
      event.preventDefault()
         if (persons.filter( p => p.name === newName ).length > 0){
             alert(`${newName} is already added to phonebook`);
             return
         }
      setPersons( persons.concat( {name: newName} ))
      setNewName("")
    }

    const handleNewNameChange = (event) => setNewName(event.target.value)

  return (
      <div>
        <h2>Phonebook</h2>
        <form>
          <div>
            name: <input value={newName} onChange={handleNewNameChange}/>
          </div>
          <div>
            <button type="submit" onClick={addName}>add</button>
          </div>
        </form>
        <h2>Numbers</h2>
          {persons.map( p => <div key={p.name}>{p.name}</div> )}
      </div>
  )
}

export default App