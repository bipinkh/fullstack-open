import React, { useState } from 'react'

const Header = ( {title} ) => <h1>{title}</h1>

const Button = ( {clickHandler, text} ) => <button onClick={clickHandler}> {text} </button>

const Statistics = ({ goodCount, neutralCount, badCount}) => {
    const total = goodCount + neutralCount + badCount;
    const average = total/3;
    const positive = goodCount / total * 100;
    return <div>
        <h1>statistics</h1>
        <p>good {goodCount}</p>
        <p>neutral {neutralCount}</p>
        <p>bad {badCount}</p>
        <p>average { average }</p>
        <p>positive { positive } %</p>
    </div>
}

const App = () => {
    // save clicks of each button to its own state
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    return (
        <div>
            <Header title="give feedback"/>
           <Button clickHandler={ () => setGood(good+1)} text="good" />
           <Button clickHandler={ () => setNeutral(neutral+1)} text="neutral" />
           <Button clickHandler={ () => setBad(bad+1)} text="bad" />
            <Statistics
                goodCount={good}
                neutralCount={neutral}
                badCount={bad}
            />
        </div>
    )
}

export default App
