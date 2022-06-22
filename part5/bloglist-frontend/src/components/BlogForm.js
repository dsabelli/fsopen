import React from "react";
const BlogForm = (props) => {
  return (
    <form onSubmit={(e) => props.handleBlogPost(e)}>
      <div>
        <label htmlFor="Title">Title:</label>
        <input
          id="Title"
          type="text"
          value={props.title}
          name="Title"
          onChange={({ target }) => props.setTitle(target.value)}
        />
      </div>
      <div>
        <label htmlFor="Author">Author:</label>
        <input
          id="Author"
          type="text"
          value={props.author}
          name="Author"
          onChange={({ target }) => props.setAuthor(target.value)}
        />
      </div>
      <div>
        <label htmlFor="Url">Url:</label>
        <input
          id="Url"
          type="text"
          value={props.url}
          name="Url"
          onChange={({ target }) => props.setUrl(target.value)}
        />
      </div>
      <button type="submit">create</button>
    </form>
  );
};

export default BlogForm;
