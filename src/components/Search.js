import React from "react";

const Search = ({ handleChange, person }) => {
  return (
    <div>
      Serach: <input value={person.name} onChange={handleChange} />
    </div>
  );
};

export default Search;
