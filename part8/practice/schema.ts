import { gql } from "apollo-server";

export const typeDefs = gql`
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
