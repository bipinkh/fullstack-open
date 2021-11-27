import axios from "axios";

const baseUrl = "http://localhost:3001/persons"

const addEntry = newEntry => {
    return axios.post(baseUrl, newEntry).then( response => response.data )
        .catch( error => console.log("Failed to add new person", error) )
}

const updateEntry = (id, person) => {
    return axios.put(`${baseUrl}/${id}`, person)
        .then(response => response.data)
        .catch( error => console.log("Failed to update the person") )
}

const getAllEntries = () => {
    return axios.get(baseUrl).then(response => response.data)
}

const deleteEntry = (id) => {
  return axios.delete(`${baseUrl}/${id}`)
      .then( response => response.data )
      .catch( error => console.log("Failed to delete") )
}

const exports = {addEntry, getAllEntries, deleteEntry, updateEntry}
export default exports