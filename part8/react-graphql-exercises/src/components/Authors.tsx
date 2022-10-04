import { useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import { ALL_AUTHORS, EDIT_AUTHOR } from "../queries";
import { Author } from "../types";

const Authors = ({
  show,
  handleError,
}: {
  show: boolean | string;
  handleError: Function;
}) => {
  const [name, setName] = useState("");
  const [birthYear, setBirthYear] = useState("");
  const result = useQuery(ALL_AUTHORS);
  const [setBornTo, reso] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });
  if (!show) {
    return null;
  }

  let authors;

  if (result.loading) {
    return <div>loading...</div>;
  }

  if (result.data) {
    authors = result.data.allAuthors;
  }

  if (result.error) handleError(result.error.message);

  const submit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setBornTo({ variables: { name, setBornTo: +birthYear } });
    console.log(reso);

    setName("");
    setBirthYear("");
  };

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a: Author) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <form onSubmit={submit}>
        <div>
          name
          <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div>
          year born
          <input
            value={birthYear}
            onChange={({ target }) => setBirthYear(target.value)}
          />
        </div>
        <button type="submit">update year born</button>
      </form>
    </div>
  );
};

export default Authors;
