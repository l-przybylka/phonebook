import React from "react";

function AddNew({ handleChange, handleSubmit, person }) {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          name:{" "}
          <input name="name" value={person.name} onChange={handleChange} />
        </div>
        <div>
          phone:{" "}
          <input name="phone" value={person.phone} onChange={handleChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  );
}

export default AddNew;
