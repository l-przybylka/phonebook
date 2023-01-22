import axios from "axios";
const baseUrl = "http://localhost:3001/persons"

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(res => res.data)
}

const addOne = newPerson => {
    const request = axios.post(baseUrl, newPerson)
    return request.then(res => res.data)
}

const deleteOne = async id => {
   await axios.delete(`${baseUrl}/${id}`)
   const request = axios.get(baseUrl)
   return request.then(res => res.data)
}

const updateOne = async (id, newPerson) => {
    await axios.put(`${baseUrl}/${id}`, newPerson)
    const request = axios.get(baseUrl)
    return request.then(res => res.data)
}

export default { getAll, addOne, deleteOne, updateOne }