const Filter = (props) => {
  return (
    <>
      {" "}
      <input onChange={(e) => props.handleSearch(e)} />
    </>
  );
};

export default Filter;
