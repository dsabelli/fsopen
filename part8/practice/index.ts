import {
  ApolloServer,
  AuthenticationError,
  gql,
  UserInputError,
} from "apollo-server";
import mongoose, { ConnectOptions, ObjectId } from "mongoose";
import Person from "./models/person";
import jwt, { JwtPayload } from "jsonwebtoken";
import { infoLogger, errorLogger } from "./utils/logger";
import User from "./models/User";

const JWT_SECRET = "fanpw8f48a4da3w3";

interface User {
  save(): unknown;
  username: string;
  password: string;
  friends: Person[];
  _id: mongoose.Types.ObjectId;
}
interface Token {
  username: string;
  id: string;
}
interface Me {
  currentUser: User;
}
interface Person {
  name: string;
  phone?: string;
  street: string;
  city: string;
  _id: mongoose.Types.ObjectId;
}

const MONGODB_URI = `mongodb://localhost:27017/graphql_practice`;
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
  type User {
    username: String!
    friends: [Person!]!
    id: ID!
  }

  type Token {
    value: String!
  }
  enum YesNo {
    YES
    NO
  }

  type Address {
    street: String!
    city: String!
  }

  type Person {
    name: String!
    phone: String
    address: Address!
    id: ID!
  }

  type Query {
    personCount: Int!
    allPersons(phone: YesNo): [Person!]!
    findPerson(name: String!): Person
    me: User
  }

  type Mutation {
    createUser(username: String!): User
    login(username: String!, password: String!): Token
    addPerson(
      name: String!
      phone: String
      street: String!
      city: String!
      id: ID!
    ): Person
    editNumber(name: String!, phone: String!): Person
    addAsFriend(name: String!): User
  }
`;

const resolvers = {
  Query: {
    me: (_root: any, _args: any, context: Me): User => {
      return context.currentUser;
    },

    allPersons: async (_root: Person, args: Person): Promise<Person[]> => {
      if (!args.phone) return Person.find({});
      return Person.find({ phone: { $exists: args.phone === "YES" } });
    },
    findPerson: async (
      _root: Person,
      args: Person
    ): Promise<Person | undefined> => {
      const person = await Person.findOne({ name: args.name });
      if (person) return person;
    },
  },
  Mutation: {
    addAsFriend: async (root: any, args: Person, context: Me) => {
      const currentUser = context.currentUser;
      const isFriend = (person: Person): boolean => {
        if (
          currentUser.friends
            .map((f: Person) => f._id.toString())
            .includes(person._id.toString())
        )
          return true;
        return false;
      };
      if (!currentUser) {
        throw new AuthenticationError("not authenticated");
      }

      const person = await Person.findOne({ name: args.name });
      if (person)
        if (!isFriend(person)) {
          currentUser.friends = currentUser.friends.concat(person);
        }

      await currentUser.save();

      return currentUser;
    },
    createUser: async (_root: any, args: User) => {
      const user = new User({ username: args.username });
      return user.save().catch((error: any) => {
        throw new UserInputError(error.message, { invalidArgs: args });
      });
    },
    login: async (_root: any, args: User) => {
      const user = await User.findOne({ username: args.username });
      if (!user || args.password !== "secret") {
        throw new UserInputError("wrong credentials");
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      };
      return { value: jwt.sign(userForToken, JWT_SECRET) };
    },
    addPerson: async (
      _root: Person,
      args: Person,
      context: Me
    ): Promise<Person | undefined> => {
      if (await Person.findOne({ name: args.name })) {
        throw new UserInputError("Name must be unique", {
          invalidArgs: args.name,
        });
      }
      const person = new Person({ ...args });
      const currentUser = context.currentUser;
      if (!currentUser) {
        throw new AuthenticationError("not authenticated");
      }
      try {
        await person.save();
        currentUser.friends = currentUser.friends.concat(person);
        await currentUser.save();
      } catch (error: any) {
        throw new UserInputError(error.message, { invalidArgs: args });
      }
      return person;
    },
    editNumber: async (_root: Person, args: Person): Promise<Person | null> => {
      const person = await Person.findOne({ name: args.name });
      if (!person) return null;
      person.phone = args.phone;
      try {
        await person.save();
      } catch (error: any) {
        throw new UserInputError(error.message, { invalidArgs: args });
      }
      return person;
    },
  },
  Person: {
    address: (root: Person) => {
      return {
        street: root.street,
        city: root.city,
      };
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.toLowerCase().startsWith("bearer ")) {
      const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET) as Token;
      const currentUser = await User.findById(decodedToken.id).populate(
        "friends"
      );
      return { currentUser };
    }
  },
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
