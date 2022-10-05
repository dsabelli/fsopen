import { ApolloServer, gql, UserInputError } from "apollo-server";
import mongoose, { ConnectOptions } from "mongoose";
import Person from "./models/person";
import { nanoid } from "nanoid";
import { infoLogger, errorLogger } from "./utils/logger";

interface Person {
  name: string;
  phone?: string;
  street: string;
  city: string;
  id: string;
}

let persons: Person[] = [
  {
    name: "Arto Hellas",
    phone: "040-123543",
    street: "Tapiolankatu 5 A",
    city: "Espoo",
    id: "3d594650-3436-11e9-bc57-8b80ba54c431",
  },
  {
    name: "Matti Luukkainen",
    phone: "040-432342",
    street: "Malminkaari 10 A",
    city: "Helsinki",
    id: "3d599470-3436-11e9-bc57-8b80ba54c431",
  },
  {
    name: "Venla Ruuska",
    street: "Nallemäentie 22 C",
    city: "Helsinki",
    id: "3d599471-3436-11e9-bc57-8b80ba54c431",
  },
];
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
  }

  type Mutation {
    addPerson(
      name: String!
      phone: String
      street: String!
      city: String!
      id: ID!
    ): Person
    editNumber(name: String!, phone: String!): Person
  }
`;

const resolvers = {
  Query: {
    personCount: () => persons.length,
    allPersons: (_root: Person, args: Person): Person[] => {
      if (!args.phone) return persons;
      const byPhone = (person: Person) =>
        args.phone === "YES" ? person.phone : !person.phone;
      return persons.filter(byPhone);
    },
    findPerson: (_root: Person, args: Person): Person | undefined =>
      persons.find((p) => p.name === args.name),
  },
  Mutation: {
    addPerson: (_root: Person, args: Person): Person | undefined => {
      if (persons.find((p) => p.name === args.name)) {
        throw new UserInputError("Name must be unique", {
          invalidArgs: args.name,
        });
      }
      const person = { ...args, id: nanoid() };
      if (persons) persons = persons.concat(person);
      return person;
    },
    editNumber: (_root: Person, args: Person): Person | null => {
      const person = persons.find((p) => p.name === args.name);
      if (!person) return null;

      const updatedPerson = { ...person, phone: args.phone };
      persons = persons.map((p) => (p.name === args.name ? updatedPerson : p));
      return updatedPerson;
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
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
