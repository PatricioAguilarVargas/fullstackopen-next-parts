import React, { useState } from 'react'
import {createRoot} from 'react-dom/client';

const StatisticLine  = props => (
  <table>
    <tbody>
      <tr>
        <td width={'75px'}>{props.label} </td>
        <td>{props.value}</td>
      </tr>
    </tbody>
  </table>
)

const Statistics = (props) => {
  const good = props.good;
  const neutral = props.neutral; 
  const bad = props.bad;

  if(good === 0 && neutral === 0 && bad === 0){
    return (
      <div>
      <p>No feedback given</p>
      </div>
    )
  }

  const all =  good + neutral + bad;
  const avg = isNaN((good - bad) / all) ? 0 : (good - bad) / all
  const positive = isNaN(good * 100 / all) ? 0 : good * 100 / all
  return (
    <div>
      <StatisticLine  label="good" value={good} />
      <StatisticLine  label="neutral" value={neutral} />
      <StatisticLine  label="bad" value={bad} />
      <StatisticLine  label="all" value={all} />
      <StatisticLine  label="average" value={avg} />
      <StatisticLine  label="positive" value={positive + "%"} />
    </div>
  )
}

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
 
  return (
    <div>
      <h1>Give Feedback</h1>
      
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />
      
      <h1>Statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);