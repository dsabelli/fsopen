import { useState, useEffect } from "react";
import React from "react";
import Blog from "./components/Blog";
import Login from "./components/Login";
import blogService from "./services/blogs";
import loginService from "./services/login";
import BlogForm from "./components/BlogForm";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const [systemMessage, setSystemMessage] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await loginService.login({ username, password });

      window.localStorage.setItem("loggedIn", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
      setSystemMessage(`${user.username} has successfully logged in!`);
      setTimeout(() => {
        setSystemMessage(null);
      }, 5000);
    } catch (exception) {
      console.log(exception);
      setSystemMessage(`$invalid username or password`);
      setTimeout(() => {
        setSystemMessage(null);
      }, 5000);
    }
  };

  const handleLogout = () => {
    window.localStorage.clear();
  };

  const handleBlogPost = (e) => {
    e.preventDefault();
    try {
      blogService.postBlog({ title, author, url });

      setTitle("");
      setAuthor("");
      setUrl("");
      setSystemMessage(`Successfully added blog post!`);
      setTimeout(() => {
        setSystemMessage(null);
      }, 5000);
    } catch (exception) {
      console.log(exception);
      setSystemMessage(`System encountered an error`);
      setTimeout(() => {
        setSystemMessage(null);
      }, 5000);
    }
  };

  const blogElements = blogs.map((blog) => <Blog key={blog.id} blog={blog} />);

  useEffect(() => {
    const getBlogs = async () => {
      const blogs = await blogService.getAll();
      setBlogs(blogs);
    };
    getBlogs();
  }, []);

  useEffect(() => {
    const loggedIn = window.localStorage.getItem("loggedIn");
    if (loggedIn) {
      const user = JSON.parse(loggedIn);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  return (
    <div>
      {systemMessage}
      {user === null && (
        <div>
          <h2>Login to Application</h2>
          <Login
            handleLogin={handleLogin}
            username={username}
            password={password}
            setUsername={setUsername}
            setPassword={setPassword}
          />
        </div>
      )}
      {user !== null && (
        <div>
          <h2>blogs</h2>
          <BlogForm
            handleBlogPost={handleBlogPost}
            setAuthor={setAuthor}
            setTitle={setTitle}
            setUrl={setUrl}
            title={title}
            author={author}
            url={url}
          />
          <form>
            <p>
              {user.username} logged in
              <button onClick={handleLogout}>Log Out</button>
            </p>
          </form>
          {blogElements}
        </div>
      )}
    </div>
  );
};

export default App;
