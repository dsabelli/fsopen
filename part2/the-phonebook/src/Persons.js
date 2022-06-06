const Persons = ({ persons, deleteName }) => {
  return (
    <>
      {persons.map((person) => (
        <li key={person.name}>
          {person.name} {person.number}{" "}
          <button onClick={() => deleteName(person.id)}>delete</button>
        </li>
      ))}
    </>
  );
};

export default Persons;
