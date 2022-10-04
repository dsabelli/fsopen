export interface Author {
  name: string;
  born?: number;
  id: string;
  bookCount?: number;
}

export interface Book {
  title: string;
  author: string;
  published: number;
  genres: string[];
  id: string;
}
