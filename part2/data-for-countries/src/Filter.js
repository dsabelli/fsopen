const Filter = ({ handleFilter }) => {
  return (
    <>
      find countries
      <input placeholder="search..." onChange={(e) => handleFilter(e)} />
    </>
  );
};

export default Filter;
