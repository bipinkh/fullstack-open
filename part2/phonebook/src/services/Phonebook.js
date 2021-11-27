import axios from "axios";

const baseUrl = "http://localhost:3001/persons"

const addEntry = newEntry => {
    return axios.post(baseUrl, newEntry).then( response => response.data )
}

const getAllEntries = () => {
    return axios.get(baseUrl).then(response => response.data)
}

const exports = {addEntry, getAllEntries}
export default exports