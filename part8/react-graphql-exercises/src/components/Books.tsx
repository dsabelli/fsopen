import { useQuery } from "@apollo/client";
import { ALL_BOOKS } from "../queries";
import { Book } from "../types";

const Books = ({
  show,
  handleError,
}: {
  show: boolean | string;
  handleError: Function;
}) => {
  if (!show) {
    return null;
  }

  const result = useQuery(ALL_BOOKS);
  let books;

  if (result.loading) {
    return <div>loading...</div>;
  }

  if (result.data) {
    books = result.data.allBooks;
  }

  if (result.error) handleError(result.error.message);

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((b: Book) => (
            <tr key={b.title}>
              <td>{b.title}</td>
              <td>{b.author}</td>
              <td>{b.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Books;
