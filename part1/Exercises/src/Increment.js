const Increment = ({ click, text }) => {
  const increment = click;
  return <button onClick={increment}>{text}</button>;
};

export default Increment;
