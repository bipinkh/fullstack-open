import React, {useEffect} from 'react'
import AnecdoteForm from "./components/AnecdoteForm";
import AnecdoteList from "./components/AnecdoteList";
import Notification from "./components/Notification";
import anecdotesService from "./services/anecdotes"
import {initialAnecdotesAction} from "./reducers/anecdoteReducer";
import {useDispatch} from "react-redux";
import Filter from "./components/Filter";

const App = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initialAnecdotesAction())
    }, [dispatch])

  return (
    <div>
        <Notification />
        <h2>Anecdotes</h2>
        <Filter />
        <AnecdoteList />
        <AnecdoteForm />
    </div>
  )
}

export default App