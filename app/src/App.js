import { useEffect, useState } from "react";
import Search from "./components/Search";
import Header from "./components/Header";
import List from "./components/List";
import AddNew from "./components/AddNew";
import personService from "./services/persons";
import Notification from "./components/Notification";

const App = () => {

  // @DATA FROM THE SERVER

  useEffect(() => {
    personService
      .getAll()
      .then(data => {
        setPersons(data)
      })
  }, []);


  // @STATE

  const [persons, setPersons] = useState([]);
  const [newPerson, setNewPerson] = useState({
    name: "",
    phone: "",
  });
  const [serachedPerson, setSerachedPerson] = useState("");
  const [notification, setNotification] = useState(null)

  // @EVENT HANDLERS

  // on the form submission we prevent the default behaviour of the event and then we create a new object with the name from the input
  // next we will add that name to the state Persons
  const handleSubmit = (event) => {
    event.preventDefault(); // stops pages from refreshing amongst other things
    const personObject = {
      name: newPerson.name,
      phone: newPerson.phone,
    };
    const existingUser = persons.find((person) => person.name === personObject.name)

    if (existingUser) {
      if (window.confirm(`${personObject.name} is already added to phonebook, replace the old number with a new one?`)) {
        const updatedUser = { ...existingUser, phone: personObject.phone }
        personService
          .updateOne(existingUser.id, updatedUser)
          .then(returnedPerson => setPersons(persons.map(person => person.id !== existingUser.id ? person : returnedPerson.data)))
          .then(notify => {
            setNotification(`The  ${personObject.name} entry has been updated`)

            setTimeout(() => {
              setNotification(null)
            }, 5000)
          })
          .catch(e => {
            alert("Entry couldn't be added")
          })
      }
    } else {
      personService
        .addOne(personObject)
        .then(returnedPerson => setPersons(persons.concat(returnedPerson)))
        .then(notify => {
          setNotification(`The new entry for ${personObject.name} has been added`)

          setTimeout(() => {
            setNotification(null)
          }, 5000)
        })
        .catch(e => {
          alert("Entry couldn't be added")
        })
      // why is this not considered mutating?
      setNewPerson({
        name: "",
        phone: "",
      });
    }
  };

  const deletePerson = (id) => {
    const user = persons.find(person => person.id === id)
    if (window.confirm(`Delete ${user.name}?`)) {
      personService
        .deleteOne(id)
        .then(data => {
          setPersons(data)
        })
        .catch(e => {
          alert("Entry not found or already deleted")
          setPersons(persons.filter(person => person.id !== id))
        })
    }
  }
  // I gave input names and now they are pulling to the event and are accesible via target.name which we can use to create dynamic name in the object
  // might be a good read on the subject https://www.pluralsight.com/guides/handling-multiple-inputs-with-single-onchange-handler-react
  const handleChange = (event) =>
    // spread operator syntax ensures that the object is replaced rather than mutated
    setNewPerson({ ...newPerson, [event.target.name]: event.target.value });
  const handleSearchChange = (event) => setSerachedPerson(event.target.value);

  return (
    <div>
      <Notification message={notification} />
      <Header text="Phonebook" />
      <Search person={serachedPerson} handleChange={handleSearchChange} />
      <Header text="Add new:" />
      <AddNew
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        person={newPerson}
      />

      <Header text="Entries:" />
      <List array={persons} serached={serachedPerson} deletePerson={deletePerson} />
      {/* <button onClick={deletePerson()} ></button> */}
    </div>
  );
};

export default App;
