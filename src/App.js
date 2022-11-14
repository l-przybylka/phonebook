import { useState } from "react";
import Search from "./components/Search";
import Header from "./components/Header";
import List from "./components/List";
import AddNew from "./components/AddNew";

const App = () => {
  // @STATE

  const [persons, setPersons] = useState([
    { name: "Arto Hellas", phone: "040-123456", id: 1 },
    { name: "Ada Lovelace", phone: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", phone: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", phone: "39-23-6423122", id: 4 },
    { name: "Movda Hellas", phone: "39-23-12341234", id: 5 },
  ]);

  const [newPerson, setNewPerson] = useState({
    name: "",
    phone: "",
  });

  const [serachedPerson, setSerachedPerson] = useState("");

  // @EVENT HANDLERS

  // on the form submission we prevent the default behaviour of the event and then we create a new object with the name from the input
  // next we will add that name to the state Persons
  const handleSubmit = (event) => {
    event.preventDefault(); // stops pages from refreshing amongst other things
    const nameObject = {
      name: newPerson.name,
      phone: newPerson.phone,
    };

    if (persons.find((person) => person.name === nameObject.name)) {
      alert(`${newPerson.name} is already added to phonebook`);
    } else {
      setPersons(persons.concat(nameObject));
      setNewPerson({
        name: "",
        phone: "",
      });
    }
  };

  // I gave input names and now they are pulling to the event and are accesible via target.name which we can use to create dynamic name in the object
  // might be a good read on the subject https://www.pluralsight.com/guides/handling-multiple-inputs-with-single-onchange-handler-react
  const handleChange = (event) =>
    setNewPerson({ ...newPerson, [event.target.name]: event.target.value });

  const handleSearchChange = (event) => setSerachedPerson(event.target.value);

  return (
    <div>
      <Header text="Phonebook" />
      <Search person={serachedPerson} handleChange={handleSearchChange} />
      <Header text="Add new:" />
      <AddNew
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        person={newPerson}
      />
      <Header text="Entries:" />

      <List array={persons} serached={serachedPerson} />
    </div>
  );
};

export default App;
