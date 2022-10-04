import { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import People from "./components/People";

const ALL_PERSONS = gql`
  query {
    allPersons {
      name
      phone
      id
    }
  }
`;

function App() {
  const result = useQuery(ALL_PERSONS);

  if (result.loading) {
    return <div>loading...</div>;
  }

  return (
    <div>
      <People persons={result.data.allPersons} />
    </div>
  );
}

export default App;
