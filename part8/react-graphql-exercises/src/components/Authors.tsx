import { useQuery } from "@apollo/client";
import { ALL_AUTHORS } from "../queries";
import { Author } from "../types";

const Authors = ({
  show,
  handleError,
}: {
  show: boolean | string;
  handleError: Function;
}) => {
  if (!show) {
    return null;
  }
  const result = useQuery(ALL_AUTHORS);
  let authors;

  if (result.loading) {
    return <div>loading...</div>;
  }

  if (result.data) {
    authors = result.data.allAuthors;
  }

  if (result.error) handleError(result.error.message);

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
    </div>
  );
};

export default Authors;
