import { useState } from "react";
import Display from "./Display";
import Increment from "./Increment";
import History from "./History";

const App = () => {
  const [clicks, setClicks] = useState({ left: 0, right: 0 });
  const [allClicks, setAllClicks] = useState([]);

  const incrementLeft = () => {
    setAllClicks((prevClicks) => prevClicks.concat("L"));
    setClicks((prevCount) => {
      return {
        ...prevCount,
        left: prevCount.left + 1,
      };
    });
  };

  const incrementRight = () => {
    setAllClicks((prevClicks) => prevClicks.concat("R"));
    setClicks((prevCount) => {
      return {
        ...prevCount,
        right: prevCount.right + 1,
      };
    });
  };

  return (
    <div>
      <Display counter={clicks.left} name="left" />
      <Display counter={clicks.right} name="right" />
      <Increment click={incrementLeft} text="Increment Left" />
      <Increment click={incrementRight} text="Increment Right" />
      <History allClicks={allClicks} />
    </div>
  );
};

export default App;
