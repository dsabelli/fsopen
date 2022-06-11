import axios from "axios";

const dbUrl = "/api/persons";

const getAll = () => {
  return axios.get(dbUrl);
};
const create = (newPerson) => {
  return axios.post(dbUrl, newPerson);
};
const update = (id, newPerson) => {
  return axios.put(`${dbUrl}/${id}`, newPerson);
};
const del = (id) => {
  return axios.delete(`${dbUrl}/${id}`);
};

export default { getAll, create, update, del };
