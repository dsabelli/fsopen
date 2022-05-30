const Part = (props) => {
  console.log(props.title);
  return (
    <>
      <p>
        {props.title} {props.number}
      </p>
    </>
  );
};

export default Part;
