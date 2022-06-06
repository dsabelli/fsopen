const PersonForm = (props) => {
  return (
    <form onSubmit={(e) => props.addName(e)}>
      <div>
        name: <input onChange={(e) => props.handleName(e)} value={props.name} />
      </div>
      <div>
        number:{" "}
        <input onChange={(e) => props.handleNumber(e)} value={props.number} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
