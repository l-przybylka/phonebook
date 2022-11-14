import React from "react";
import Person from "./Person";

function List({ array, serached }) {
  if (serached) {
    return (
      <ul>
        {array
          .filter((person) =>
            person.name.toLowerCase().includes(serached.toLowerCase())
          )
          .map((person) => (
            <Person key={person.name} name={person.name} phone={person.phone} />
          ))}
      </ul>
    );
  } else {
    return (
      <ul>
        {array.map((person) => (
          <Person key={person.name} name={person.name} phone={person.phone} />
        ))}
      </ul>
    );
  }
}

export default List;
