import React from "react";

const PersonForm = ({newName, newNumber, addName, newNameChangeHandler, newNumberChangeHandler}) =>
    <form>
        <div>name: <input value={newName} onChange={newNameChangeHandler}/></div>
        <div>number: <input value={newNumber} onChange={newNumberChangeHandler}/></div>
        <div><button type="submit" onClick={addName}>add</button></div>
    </form>

export default PersonForm