import { useState } from "react";

const App = () => {

  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', phone: '040-123456', id: 1 },
    { name: 'Ada Lovelace', phone: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', phone: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', phone: '39-23-6423122', id: 4 }
  ])

  const [newPerson, setNewPerson] = useState({
    name: "",
    phone: "",
  });

const [serachedPerson, setSerachedPerson] = useState({
  name: "",
  phone: ""
})
  

  // on the form submission we prevent the default behaviour of the event and then we create a new object with the name from the input
  // next we will add that name to the state Persons
  const addName = (event) => {
    event.preventDefault(); // stops pages from refreshing amongst other things
    const nameObject = {
      name: newPerson.name,
      phone: newPerson.phone,
    };
    if (persons.find((person) => person.name === newPerson.name)) {
      alert(`${newPerson.name} is already added to phonebook`);
    } else {
      setPersons(persons.concat(nameObject));
      setNewPerson({
        name: "New name",
        phone: "New phonenumber",
      });
    }
  };


  // https://www.pluralsight.com/guides/handling-multiple-inputs-with-single-onchange-handler-react refactor changeHandler functions to 1
  const handleNameChange = (event) => {
    console.log(event.target.value);
    setNewPerson({ ...newPerson, name: event.target.value });
  };
  const handlePhoneChange = (event) => {
    console.log(event.target.value);
    setNewPerson({ ...newPerson, phone: event.target.value });
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        <input value={serachedPerson.name}/>
      </div>
      <h2>add a new:</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newPerson.name} onChange={handleNameChange} />
        </div>
        <div>
          phone: <input value={newPerson.phone} onChange={handlePhoneChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
        <ul>
        {persons.map((person) => (
          <li key={person.id}>
            <strong>Name:</strong> {person.name} <strong>Phone:</strong>{" "}
            {person.phone}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
