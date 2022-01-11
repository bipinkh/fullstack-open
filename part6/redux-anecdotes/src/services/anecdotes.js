import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const create = async (anecdote) => {
    const response = await axios.post(baseUrl, anecdote)
    return response.data
}

const vote = async (id) => {
    let response =  await axios.get(`${baseUrl}/${id}`)
    let anecdote = response.data
    anecdote = { ...anecdote, votes: anecdote.votes+1 }
    response = await axios.put(`${baseUrl}/${id}`, anecdote)
    return response.data
}

export default { getAll, create, vote }