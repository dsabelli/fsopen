import { useState, useEffect } from "react";
import React from "react";
import Blog from "./components/Blog";
import Login from "./components/Login";
import blogService from "./services/blogs";
import loginService from "./services/login";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";

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
      setSystemMessage("invalid username or password");
      setTimeout(() => {
        setSystemMessage(null);
      }, 5000);
    }
  };

  const handleLogout = () => {
    window.localStorage.clear();
  };

  const handleBlogPost = async (e) => {
    e.preventDefault();
    try {
      const newBlog = await blogService.postBlog({ title, author, url });
      console.log(newBlog);
      setBlogs(blogs.concat(newBlog));
      setTitle("");
      setAuthor("");
      setUrl("");
      setSystemMessage("Successfully added blog post!");
      setTimeout(() => {
        setSystemMessage(null);
      }, 5000);
    } catch (exception) {
      console.log(exception);
      setSystemMessage("System encountered an error");
      setTimeout(() => {
        setSystemMessage(null);
      }, 5000);
    }
  };

  const handleLikes = async (e) => {
    const id = e.target.id;
    e.preventDefault();
    try {
      const likedBlog = blogs.filter((blog) => blog.id === id)[0];
      await blogService.putLike(
        { ...likedBlog, likes: likedBlog.likes + 1, user: likedBlog.user.id },
        likedBlog.id
      );
      setBlogs((prevBlogs) =>
        prevBlogs
          .map((blog) =>
            blog.id === id ? { ...blog, likes: blog.likes + 1 } : blog
          )
          .sort((a, b) => (a.likes < b.likes ? 1 : a.likes > b.likes ? -1 : 0))
      );
    } catch (exception) {
      console.log(exception);
      setSystemMessage("System encountered an error");
      setTimeout(() => {
        setSystemMessage(null);
      }, 5000);
    }
  };

  const handleDelete = async (e) => {
    const id = e.target.id;
    e.preventDefault();
    const deletedBlog = blogs.filter((blog) => blog.id === id)[0];
    if (
      window.confirm(`Remove ${deletedBlog.title} by ${deletedBlog.author}?`)
    ) {
      try {
        if (user.username === deletedBlog.user.username) {
          await blogService.deleteBlog(deletedBlog.id);

          setBlogs((prevBlogs) =>
            prevBlogs.filter((blog) => blog.id !== deletedBlog.id)
          );
        }
      } catch (exception) {
        console.log(exception);
        setSystemMessage("System encountered an error");
        setTimeout(() => {
          setSystemMessage(null);
        }, 5000);
      }
    }
  };

  const toggleVisibility = (id) => {
    setBlogs((prevBlogs) =>
      prevBlogs.map((blog) =>
        blog.id === id ? { ...blog, isVisible: !blog.isVisible } : blog
      )
    );
  };

  const blogElements = blogs.map((blog) => (
    <Blog
      key={blog.id}
      blog={blog}
      toggleVisibility={toggleVisibility}
      handleLikes={handleLikes}
      handleDelete={handleDelete}
    />
  ));

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
          <Togglable buttonLabel="login">
            <Login
              handleLogin={handleLogin}
              username={username}
              password={password}
              setUsername={setUsername}
              setPassword={setPassword}
            />
          </Togglable>
        </div>
      )}
      {user !== null && (
        <div>
          <h2>blogs</h2>
          <Togglable buttonLabel="new blog">
            <BlogForm
              handleBlogPost={handleBlogPost}
              setAuthor={setAuthor}
              setTitle={setTitle}
              setUrl={setUrl}
              title={title}
              author={author}
              url={url}
            />
          </Togglable>
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
