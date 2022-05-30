import { useState } from "react";
import Button from "./Feedback";
import StatisticLine from "./Stats";

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const incGood = () => {
    setGood((prevCount) => prevCount + 1);
  };
  const incNeutral = () => {
    setNeutral((prevCount) => prevCount + 1);
  };
  const incBad = () => {
    setBad((prevCount) => prevCount + 1);
  };

  const all = () => good + neutral + bad;

  const average = () => ((good - bad) / all()).toFixed(2);

  const positive = () => ((good / all()) * 100).toFixed(2);

  if (good || neutral || bad) {
    return (
      <div>
        <h2>give feedback</h2>
        <Button name="good" inc={incGood} />
        <Button name="neutral" inc={incNeutral} />
        <Button name="bad" inc={incBad} />
        <h2>statistics</h2>
        <StatisticLine name="good" value={good} />
        <StatisticLine name="neutral" value={neutral} />
        <StatisticLine name="bad" value={bad} />
        <StatisticLine name="all" value={all()} />
        <StatisticLine name="average" value={average()} />
        <StatisticLine name="positive" value={`${positive()}%`} />
      </div>
    );
  } else {
    return (
      <div>
        <h2>give feedback</h2>
        <Button name="good" inc={incGood} />
        <Button name="neutral" inc={incNeutral} />
        <Button name="bad" inc={incBad} />
        <h2>statistics</h2>
        <p>No feedback given</p>
      </div>
    );
  }
};

export default App;
