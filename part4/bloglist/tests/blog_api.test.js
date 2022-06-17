const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const Blog = require("../models/blog");
const jwt = require("jsonwebtoken");
const SECRET = require("../utils/config");

beforeEach(async () => {
  const user = {
    username: "Dan",
    password: "password",
  };
  const response = await api.post("/api/login").send(user);
  console.log(response.body);
  let token = response.body.token;

  await Blog.deleteMany({});

  const newBlog = {
    title: "New Title",
    author: "Han Sabelli",
    url: "wwwwwwwwww",
    likes: 2,
    user: response.body.user.id.toString(),
  };
  await api
    .post("/api/blogs")
    .set("Authorization", `bearer ${token}`)
    .send(newBlog);
}, 100000);

test("returns correct number of blogs", async () => {
  const result = await Blog.find({});
  expect(result).toHaveLength(1);
}, 100000);

test("blog objects have id key", async () => {
  const result = await Blog.find({});
  expect(result[0].id).toBeDefined();
}, 100000);

test("posting a blog with no likes defaults to 0", async () => {
  const initialBlogs = await Blog.find({});
  const newBlog = {
    title: "New Title",
    author: "Man Sabelli",
    url: "wwwwdlrkugnfdlrwwwwww",
  };
  await api.post("/api/blogs").send(newBlog).expect(201);
  const result = await Blog.find({});
  expect(result[1].likes).toBeDefined();
}, 100000);

test("posting a blog with no title or url sends back 400", async () => {
  const initialBlogs = await Blog.find({});
  const newBlog = {
    author: "Van Sabelli",
  };

  await api.post("/api/blogs").send(newBlog).expect(400);

  const result = await Blog.find({});
  expect(result).toHaveLength(initialBlogs.length);
}, 100000);

test("delete a blog post", async () => {
  const initialBlogs = await Blog.find({});

  await api.delete(`/api/blogs/${initialBlogs[0].id}`).expect(204);

  const result = await Blog.find({});
  expect(result).toHaveLength(initialBlogs.length - 1);
}, 100000);

test("update a blog post", async () => {
  const initialBlogs = await Blog.find({});
  const updatedBlog = {
    author: "Gran Sabelli",
  };
  await api
    .put(`/api/blogs/${initialBlogs[0].id}`)
    .send(updatedBlog)
    .expect(200);

  const result = await Blog.findById(initialBlogs[0].id);
  expect(result.author).toBe("Gran Sabelli");
}, 100000);

afterAll(() => {
  mongoose.connection.close();
});
