import React from "react";

const Persons = ({personsToShow, deleteHandler}) =>
    <div>
        {personsToShow.map( p =>
            <div key={p.id}>
                {p.name} {p.number}>
                <button onClick={() => deleteHandler(p.id)}>delete</button>
            </div>

        )}
    </div>

export default Persons