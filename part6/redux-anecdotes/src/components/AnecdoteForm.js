import React from "react";
import {useDispatch} from "react-redux";
import {createAction} from "../reducers/anecdoteReducer";


const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const create = (event) => {
        event.preventDefault()
        const newAd = event.target.newEntry.value
        event.target.newEntry.value = ''
        dispatch(createAction(newAd))
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