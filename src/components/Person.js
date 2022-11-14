import React from 'react'

function Person({name,phone}) {
  return (
    <li>
        <strong>Name:</strong> {name}
        <strong>Phone:</strong> {phone}
    </li>
  )
}

export default Person