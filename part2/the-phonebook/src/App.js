import { useState, useEffect } from "react";
import Filter from "./Filter";
import PersonForm from "./PersonForm";
import Persons from "./Persons";
import dbService from "./services/persons";
import "./App.css";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newSearch, setNewSearch] = useState(persons);
  const [errMsg, setErrMsg] = useState();
  const [successMsg, setSuccessMsg] = useState();

  const addName = (e) => {
    e.preventDefault();
    const newPerson = { name: newName, number: newNumber };
    const person = persons.find(
      (person) => person.name.toLowerCase() === newPerson.name.toLowerCase()
    );
    if (person) {
      if (
        window.confirm(
          `${newPerson.name} is already added to the phonebook, replace the old number with a new one?`
        )
      ) {
        dbService
          .update(person.id, newPerson)
          .then((res) => {
            setPersons((prevPersons) =>
              prevPersons.map((p) => (p.id === person.id ? res.data : p))
            );
            setSuccessMsg(
              `${newPerson.name}'s number was successfully updated to ${newPerson.number}!`
            );
            setTimeout(() => {
              setSuccessMsg(null);
            }, 3000);
          })
          .catch((err) => {
            console.log(err);
            setErrMsg(
              `Information for ${newPerson.name} has already been removed from the server`
            );
            setTimeout(() => {
              setErrMsg(null);
            }, 3000);
          });
      }
    } else if (newPerson.number === "") {
      alert("enter a phone number");
    } else {
      dbService.create(newPerson).then((res) => {
        setPersons((prevVal) => prevVal.concat(res.data));
        setNewSearch((prevVal) => prevVal.concat(res.data));
        setSuccessMsg(`${newPerson.name}'s number was successfully added!`);
        setTimeout(() => {
          setSuccessMsg(null);
        }, 3000);
      });
      setNewName("");
      setNewNumber("");
    }
  };

  const deleteName = (id) => {
    for (let person of persons) {
      if (person.id === id) {
        if (window.confirm(`Delete ${person.name}?`)) {
          dbService.del(id);
          setPersons(persons.filter((person) => person.id !== id));
        }
      }
    }
  };

  const handleSearchEvent = (e) => {
    let searchValue = e.target.value.toLowerCase();
    setPersons(
      newSearch.filter((person) =>
        person.name.toLowerCase().includes(searchValue)
      )
    );
  };

  const handleNameEvent = (e) => {
    setNewName(e.target.value);
  };

  const handleNumberEvent = (e) => {
    setNewNumber(e.target.value);
  };

  useEffect(() => {
    dbService.getAll().then((res) => {
      setPersons(res.data);
    });
  }, []);

  return (
    <div>
      <h2>Phonebook</h2>
      <h3 className={errMsg ? "error" : ""}>{errMsg}</h3>
      <h3 className={successMsg ? "success" : ""}>{successMsg}</h3>
      <Filter handleSearch={handleSearchEvent} />
      <h3>Add a new</h3>
      <PersonForm
        name={newName}
        number={newNumber}
        handleName={handleNameEvent}
        handleNumber={handleNumberEvent}
        addName={addName}
      />
      <h3>Numbers</h3>
      <Persons persons={persons} deleteName={deleteName} />
    </div>
  );
};

export default App;
