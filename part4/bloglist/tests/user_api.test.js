const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const User = require("../models/user");

beforeEach(async () => {
  await User.deleteMany({});
  const newUser = {
    username: "Dano",
    name: "Dano",
    password: "dlsirfgleubgliue",
  };
  await api.post("/api/user").send(newUser);
}, 100000);

test("invalid username < 3 cannot be added ", async () => {
  const newUser = {
    username: "Jo",
    name: "mama",
    password: "dlsirfgleubgliue",
  };
  await api.post("/api/user").send(newUser).expect(400);
}, 100000);

test("invalid password < 8 cannot be added ", async () => {
  const newUser = {
    username: "Bobby",
    name: "Sue",
    password: "23",
  };
  await api.post("/api/user").send(newUser).expect(400);
}, 100000);

test("non-unique username cannot be added ", async () => {
  const newUser = {
    username: "Dano",
    name: "Dano",
    password: "2zdlrjfgndzrbgf3",
  };

  await api.post("/api/user").send(newUser).expect(400);
}, 100000);

afterAll(() => {
  mongoose.connection.close();
});
