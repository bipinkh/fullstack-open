import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {voteAction, createAction} from "./reducers/anecdoteReducer";

const App = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  const vote = (id) => {
      dispatch(voteAction(id))
  }

  const create = (event) => {
      event.preventDefault()
      const newAd = event.target.newEntry.value
      event.target.newEntry.value = ''
      dispatch(createAction(newAd))
    }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes
          .sort( (a,b) => b.votes - a.votes )
          .map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      <h2>create new</h2>
      <form onSubmit={create}>
        <div><input name='newEntry'/></div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default App