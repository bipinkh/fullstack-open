import React from "react";

const Total = ({ course }) => {
    const total = course.parts.reduce( (s,p) => s  + p.exercises, 0)
    return(
        <p><b>total of {total} exercises</b></p>
    )
}

export default Total