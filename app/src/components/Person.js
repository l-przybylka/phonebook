import React from 'react'

function Person({ name, phone, id, deletePerson }) {
  return (
    <li>
      <strong>Name:</strong> {name}<br />
      <strong>Phone:</strong> {phone}
      <br />
      <button onClick={() => deletePerson(id)} >Delete entry</button>
      <br />
      <br />
    </li>
  )
}

export default Person