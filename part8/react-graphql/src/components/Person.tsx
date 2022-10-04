import React, { MouseEventHandler } from "react";
import { Persons } from "../types";

const Person = ({
  person,
  onClose,
}: {
  person: Persons;
  onClose: MouseEventHandler;
}) => {
  return (
    <div>
      <h2>{person.name}</h2>
      <div>
        {person.address.street} {person.address.city}
      </div>
      <div>{person.phone}</div>
      <button onClick={onClose}>close</button>
    </div>
  );
};

export default Person;
