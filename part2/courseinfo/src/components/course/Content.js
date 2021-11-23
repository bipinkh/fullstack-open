import React from "react";
import Part from "./Part";

const Content = ({ parts }) => {
    return (
        <div>
            { parts.map( p => <Part key={p.id} part={p}/> ) }
        </div>
    )
}

export default Content