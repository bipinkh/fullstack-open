import React from "react";
import {useDispatch} from "react-redux";
import {createAction} from "../reducers/anecdoteReducer";
import {setNotificationAction} from "../reducers/notificationReducer";
import {getId} from "../reducers/anecdoteReducer";

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const create = async (event) => {
        event.preventDefault()
        const newAd = event.target.newEntry.value
        event.target.newEntry.value = ''
        const anecdote = { content: newAd, id: getId(), votes: 0 }
        dispatch(createAction(anecdote))
        dispatch( setNotificationAction(`you created '${newAd}'`) )
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