import React, { MouseEventHandler, useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { Persons } from "../types";
import Person from "./Person";

const FIND_PERSON = gql`
  query findPersonByName($nameToSearch: String!) {
    findPerson(name: $nameToSearch) {
      name
      phone
      id
      address {
        street
        city
      }
    }
  }
`;

const People = ({ persons }: { persons: Persons[] }) => {
  const [nameToSearch, setNameToSearch] = useState("");
  const result = useQuery(FIND_PERSON, {
    variables: { nameToSearch },
    skip: !nameToSearch,
  });
  if (nameToSearch && result.data) {
    return (
      <Person
        person={result.data.findPerson}
        onClose={() => setNameToSearch("")}
      />
    );
  }
  return (
    <div>
      <h2>Persons</h2>
      {persons.map((p: Persons) => (
        <div key={p.name}>
          {p.name} {p.phone}
          <button onClick={() => setNameToSearch(p.name)}>show address</button>
        </div>
      ))}
    </div>
  );
};

export default People;
