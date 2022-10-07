import { ApolloServer } from "apollo-server";
import mongoose, { ConnectOptions, ObjectId } from "mongoose";
import { resolvers } from "./resolvers";
import jwt, { JwtPayload } from "jsonwebtoken";
import { infoLogger, errorLogger } from "./utils/logger";
import User from "./models/User";
import { typeDefs } from "./schema";
import { Token } from "./types";
const JWT_SECRET = "fanpw8f48a4da3w3";

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
