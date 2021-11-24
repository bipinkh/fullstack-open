import React from "react";

const Persons = ({personsToShow}) =>
    <div>
        {personsToShow.map( p => <div key={p.id}> {p.name} {p.number} </div> )}
    </div>

export default Persons