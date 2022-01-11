import React from "react";
import {connect} from "react-redux";
import {createAction} from "../reducers/anecdoteReducer";
import {setNotificationAction} from "../reducers/notificationReducer";
import {getId} from "../reducers/anecdoteReducer";

const AnecdoteForm = (props) => {

    const create = async (event) => {
        event.preventDefault()
        const newAd = event.target.newEntry.value
        event.target.newEntry.value = ''
        const anecdote = { content: newAd, id: getId(), votes: 0 }
        props.createAction(anecdote)
        props.setNotificationAction(`you created '${newAd}'`)
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

const mapDispatchToProps = {
    createAction,
    setNotificationAction
}

const ConnectedAnecdoteForm = connect(null, mapDispatchToProps)(AnecdoteForm)

export default ConnectedAnecdoteForm