import { gql } from "@apollo/client";

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`;

export const ALL_BOOKS = gql`
  query {
    allBooks {
      title
      author
      published
      genres
    }
  }
`;

export const FIND_BOOK = gql`
  query findBook($author: String!, $genre: String!) {
    allBooks(author: $author, genre: $genre) {
      title
      author
      published
      genres
    }
  }
`;
