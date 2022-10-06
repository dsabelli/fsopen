import { ApolloServer, gql, UserInputError } from "apollo-server";
import { nanoid } from "nanoid";
import { infoLogger, errorLogger } from "./utils/logger";
import mongoose, { ConnectOptions } from "mongoose";
import jwt, { JwtPayload } from "jsonwebtoken";
import Book from "./models/Book";
import Author from "./models/Author";

const JWT_SECRET = "fanpw8f48a4da3w3";

interface EditAuthor {
  name: string;
  setBornTo: number;
}

interface Author {
  save(): unknown;
  name: string;
  born?: number;
  bookCount?: number;
  _id: mongoose.Types.ObjectId;
}

interface Book {
  title: string;
  author: Author;
  published: number;
  genres: string[];
  _id: mongoose.Types.ObjectId;
}

interface Query {
  bookCount: number;
  authorCount: number;
  allBooks: Book[];
  allAuthors: Author[];
}

const MONGODB_URI = `mongodb://localhost:27017/graphql_exercises`;
infoLogger("connecting to", MONGODB_URI);

const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      family: 4,
    } as ConnectOptions);
    infoLogger("connected to MongoDB");
  } catch (error) {
    errorLogger("error connection to MongoDB:");
  }
};
connectDB();

const typeDefs = gql`
  type Author {
    name: String!
    born: Int
    bookCount: Int!
  }

  type Book {
    title: String!
    author: Author!
    published: Int!
    genres: [String!]!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book!
    editAuthor(name: String!, setBornTo: Int!): Author
  }
`;

const resolvers = {
  Query: {
    bookCount: async (): Promise<number> => (await Book.find({})).length,
    authorCount: async (): Promise<number> => (await Author.find({})).length,
    allBooks: async (
      _root: any,
      args: { author: string; genre: string }
    ): Promise<Book[]> => {
      if (args.author) return await Book.find({ author: args.author });
      if (args.genre) return await Book.find({ genres: args.genre });
      return await Book.find({});
    },
    allAuthors: async (): Promise<Author[]> => {
      return await Author.find({});
    },
  },
  Mutation: {
    addBook: async (_root: any, args: Book): Promise<Book | any> => {
      if (!{ ...args })
        throw new UserInputError(
          "include a title, author, publish date, and atleast one genre"
        );
      let author: Author;
      const existingAuthor = await Author.findOne({ name: args.author });
      existingAuthor
        ? (author = existingAuthor)
        : (author = new Author({ name: args.author, bookCount: 1 }));
      if (author.bookCount) author.bookCount++;
      await author.save();
      let book = new Book({ ...args, author: author });
      await book.save();
      book = await book.populate("author");
      return book;
    },
    editAuthor: async (
      _root: any,
      args: EditAuthor
    ): Promise<Author | null> => {
      if (!{ ...args })
        throw new UserInputError("include author name and birth year");
      const author = await Author.findOne({ name: args.name });
      console.log(author);

      if (author) {
        author.born = args.setBornTo;
        await author.save();
        console.log(author);
      }
      return author;
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
