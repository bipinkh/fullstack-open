import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {voteAction} from "../reducers/anecdoteReducer";
import {notificationAction, clearNotificationAction} from "../reducers/notificationReducer";

const AnecdoteList = () => {
    const anecdotes = useSelector(state => state.anecdotes)
    const filter = useSelector(state => state.filter)
    const dispatch = useDispatch()

    const vote = (id) => {
        dispatch(voteAction(id))
        const title = anecdotes.filter( a => a.id===id )[0].content
        dispatch( notificationAction(`you voted '${title}'`) )
        setTimeout( () => dispatch(clearNotificationAction()), 5000)
    }

    let anecdotesToDisplay = filter.length > 0
        ? anecdotes.filter( a => a.content.includes(filter) )
        : anecdotes
    anecdotesToDisplay = anecdotesToDisplay.sort( (a,b) => b.votes - a.votes )

    return (
        <div>
            {anecdotesToDisplay
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