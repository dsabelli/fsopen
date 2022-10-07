import { Persona, Me, Usera } from "./types";
import User from "./models/User";
import Person from "./models/person";
import jwt from "jsonwebtoken";
import { AuthenticationError, UserInputError } from "apollo-server";
const JWT_SECRET = "fanpw8f48a4da3w3";
export const resolvers = {
  Query: {
    me: (_root: any, _args: any, context: Me): Usera => {
      return context.currentUser;
    },

    allPersons: async (_root: Persona, args: Persona): Promise<Persona[]> => {
      if (!args.phone) return Person.find({});
      return Person.find({ phone: { $exists: args.phone === "YES" } });
    },
    findPerson: async (
      _root: Persona,
      args: Persona
    ): Promise<Persona | undefined> => {
      const person = await Person.findOne({ name: args.name });
      if (person) return person;
    },
  },
  Mutation: {
    addAsFriend: async (root: any, args: Persona, context: Me) => {
      const currentUser = context.currentUser;
      const isFriend = (person: Persona): boolean => {
        if (
          currentUser.friends
            .map((f: Persona) => f._id.toString())
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
    createUser: async (_root: any, args: Usera) => {
      const user = new User({ username: args.username });
      return user.save().catch((error: any) => {
        throw new UserInputError(error.message, { invalidArgs: args });
      });
    },
    login: async (_root: any, args: Usera) => {
      const user = await User.findOne({ username: args.username });
      console.log(user);

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
      _root: Persona,
      args: Persona,
      context: Me
    ): Promise<Persona | undefined> => {
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
    editNumber: async (
      _root: Persona,
      args: Persona
    ): Promise<Persona | null> => {
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
    address: (root: Persona) => {
      return {
        street: root.street,
        city: root.city,
      };
    },
  },
};
