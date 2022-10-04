import { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import People from "./components/People";
import PersonForm from "./components/PersonForm";
import { ALL_PERSONS } from "./queries";
import Notify from "./components/Notify";
import PhoneForm from "./components/PhoneForm";

function App() {
  const [errorMessage, setErrorMessage] = useState("");
  const result = useQuery(ALL_PERSONS);

  if (result.loading) {
    return <div>loading...</div>;
  }

  const notify = (message: string) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage("");
    }, 10000);
  };

  return (
    <div>
      <Notify errorMessage={errorMessage} />
      <People persons={result.data.allPersons} />
      <PersonForm setError={notify} />
      <PhoneForm setError={notify} />
    </div>
  );
}

export default App;
