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

const updateOne = (id, newPerson) => {
   return axios.put(`${baseUrl}/${id}`, newPerson)
}

export default { getAll, addOne, deleteOne, updateOne }