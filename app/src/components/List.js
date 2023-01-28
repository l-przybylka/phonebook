import React from "react";
import Person from "./Person";

function List({ array, serached, deletePerson }) {
  if (serached) {
    return (
      <ul>
        {array
          .filter((person) =>
            person.name.toLowerCase().includes(serached.toLowerCase())
          )
          .map((person) => (
            <Person key={person.id} id={person.id} name={person.name} phone={person.phone} deletePerson={deletePerson} />
          ))}
      </ul>
    );
  } else {
    return (
      <ul>
        {array.map((person) => (
          <Person key={person.id} id={person.id} name={person.name} phone={person.phone} deletePerson={deletePerson}/>
        ))}
      </ul>
    );
  }
}

export default List;
