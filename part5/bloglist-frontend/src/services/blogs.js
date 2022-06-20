import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getAll = async () => {
  const res = await axios.get(baseUrl);
  return await res.data;
};

const postBlog = async (blog) => {
  const config = {
    headers: { Authorization: token },
  };
  const res = await axios.post(baseUrl, blog, config);
  return res.data;
};

const putLike = async (blog, id) => {
  const config = {
    headers: { Authorization: token },
  };
  const res = await axios.put(`${baseUrl}/${id}`, blog, config);
  return res.data;
};

const deleteBlog = async (id) => {
  const config = {
    headers: { Authorization: token },
  };
  const res = await axios.delete(`${baseUrl}/${id}`, config);
  return res.data;
};

export default { getAll, postBlog, putLike, deleteBlog, setToken };
