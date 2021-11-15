import React from 'react'

const Header = (props) => ( <h1>{props.course}</h1> )

const Part = (props) => { return <p>{props.title} {props.point}</p> }

const Content = (props) => {
    return (
        <div>
            <Part title= {props.titles[0]} point = {props.points[0]} />
            <Part title= {props.titles[1]} point = {props.points[1]} />
            <Part title= {props.titles[2]} point = {props.points[2]} />
        </div>
    )
}

const Total = (props) => <p>Number of exercises {props.total}</p>

const App = () => {
    const course = 'Half Stack application development'
    const part1 = 'Fundamentals of React'
    const exercises1 = 10
    const part2 = 'Using props to pass data'
    const exercises2 = 7
    const part3 = 'State of a component'
    const exercises3 = 14

  return (
      <div>
          <Header course={course} />
          <Content titles={[part1, part2, part3]} points={[exercises1, exercises2, exercises3]} />
          <Total total={exercises1 + exercises2 + exercises3} />
      </div>
  )
}

export default App