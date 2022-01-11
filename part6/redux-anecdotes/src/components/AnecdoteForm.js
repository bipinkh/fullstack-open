import React from "react";
import {useDispatch} from "react-redux";
import {createAction} from "../reducers/anecdoteReducer";
import {notificationAction, clearNotificationAction} from "../reducers/notificationReducer";
import anecdoteService from '../services/anecdotes'
import {getId} from "../reducers/anecdoteReducer";

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const create = async (event) => {
        event.preventDefault()
        const newAd = event.target.newEntry.value
        event.target.newEntry.value = ''
        const anecdote = { content: newAd, id: getId(), votes: 0 }
        const savedAnecdote = await anecdoteService.create(anecdote)
        dispatch(createAction(savedAnecdote))
        dispatch( notificationAction(`you created '${newAd}'`) )
        setTimeout( () => dispatch(clearNotificationAction()), 5000)
    }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={create}>
                <div><input name='newEntry'/></div>
                <button type="submit">create</button>
            </form>
        </div>
    )
}

export default AnecdoteForm