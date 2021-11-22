import React, { useState } from 'react'

const Header = ( {title} ) => <h1>{title}</h1>

const Button = ( {clickHandler, text} ) => <button onClick={clickHandler}> {text} </button>

const StatisticLine = ( {text, value, symbol} ) => <p>{text} {value} {symbol}</p>

const Statistics = ({ goodCount, neutralCount, badCount}) => {
    const total = goodCount + neutralCount + badCount;
    const average = total/3;
    const positive = goodCount / total * 100;
    if (total === 0){
        return <div>
            <h1>statistics</h1>
            <p>No feedback given</p>
        </div>
    }
    return <div>
        <h1>statistics</h1>
        <StatisticLine text="good" value={goodCount} />
        <StatisticLine text="neutral" value={neutralCount} />
        <StatisticLine text="bad" value={badCount} />
        <StatisticLine text="average" value={average} />
        <StatisticLine text="positive" value={positive} symbol="%" />
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
