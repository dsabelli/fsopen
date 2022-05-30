const Button = ({ name, inc }) => {
  return (
    <>
      <button onClick={inc}>{name}</button>
    </>
  );
};

export default Button;
