import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {voteAction} from "../reducers/anecdoteReducer";
import {notificationAction, clearNotificationAction} from "../reducers/notificationReducer";

const AnecdoteList = () => {
    const anecdotes = useSelector(state => state.anecdotes)
    const dispatch = useDispatch()

    const vote = (id) => {
        dispatch(voteAction(id))
        const title = anecdotes.filter( a => a.id===id )[0].content
        dispatch( notificationAction(`you voted '${title}'`) )
        setTimeout( () => dispatch(clearNotificationAction()), 5000)
    }


    return (
        <div>
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
        </div>
    )


}

export default AnecdoteList