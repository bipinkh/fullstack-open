import anecdoteService from '../services/anecdotes'


export const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = [].map(asObject)

const reducer = (state = initialState, action) => {
  switch (action.type){
    case 'VOTE':
      const id = action.data.id
      const anecdoteToVote = state.filter( ad => ad.id === id)
      if(anecdoteToVote && anecdoteToVote[0]){
        const updatedAnecdote = {...anecdoteToVote[0], votes: anecdoteToVote[0].votes+1}
        return state.map( a => a.id ===  id ? updatedAnecdote : a)
      }
      return state

    case 'CREATE':
      return state.concat(action.data)

    case 'INIT':
      return action.data

    default:
      return state

  }
}

export const initialAnecdotesAction = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({ type: 'INIT', data: anecdotes })
  }
}

export const voteAction = (id) =>  {
  return async dispatch => {
    await anecdoteService.vote(id)
    dispatch({type: 'VOTE', data: {id: id}})
  }
}

export const createAction = (anecdote) =>  {
  return async dispatch => {
    const newAnecdote = await anecdoteService.create(anecdote)
    dispatch({ type: 'CREATE', data: newAnecdote })
  }
}

export default reducer