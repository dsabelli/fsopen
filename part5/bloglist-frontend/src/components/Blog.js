import React from "react";
const Blog = ({ blog, toggleVisibility, handleLikes, handleDelete }) => (
  <div>
    <div style={{ display: blog.isVisible ? "none" : "" }}>
      {blog.title} {blog.author}
      <button id={blog.id} onClick={(e) => toggleVisibility(e.target.id)}>
        view
      </button>
    </div>
    <div style={{ display: blog.isVisible ? "" : "none" }}>
      {blog.title} {blog.author} {blog.url}{" "}
      <button id={blog.id} onClick={(e) => handleLikes(e)}>
        {blog.likes}
      </button>{" "}
      <button id={blog.id} onClick={(e) => handleDelete(e)}>
        remove
      </button>
      <button id={blog.id} onClick={(e) => toggleVisibility(e.target.id)}>
        hide
      </button>
    </div>
  </div>
);

export default Blog;
