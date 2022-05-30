import Part from "./Part";

const Content = (props) => {
  console.log(props.parts[1].name);
  return (
    <>
      <Part title={props.parts[0].name} number={props.parts[0].exercises} />
      <Part title={props.parts[1].name} number={props.parts[1].exercises} />
      <Part title={props.parts[2].name} number={props.parts[2].exercises} />
    </>
  );
};

export default Content;
