const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  let likes = 0;
  for (let blog of blogs) {
    likes += blog.likes;
  }
  return likes;
};

const favoriteBlog = (blogs) => {
  const likes = blogs.map((blog) => blog.likes);
  const maxLikes = Math.max(...likes);
  return blogs.filter((blog) => blog.likes === maxLikes);
};

const mostBlogs = (blogs) => {};
//filter unique authors into an array of objects with {author: authors name, blogs:0}
//iterate through original array of blogs and when author.name===author.name blogs++
//recycle method from favoriteBlog to return author with most blogs
module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs };
