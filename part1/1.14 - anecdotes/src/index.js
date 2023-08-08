import React, { useState } from 'react'
import {createRoot} from 'react-dom/client';

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [mostVoted, setMostVoted] = useState(0)
  const [points, setPoints] = useState(Array(props.anecdotes.length).fill(0))

 
  const onChangeAnecdote = () => setSelected(Math.round(Math.random() * props.anecdotes.length))
  const onVote = () => {
    const copy = { ...points }
    // increment the property 2 value by one
    copy[selected] += 1
    setPoints(copy)

    const arr = Object.values(copy)
    const max = Math.max(...arr );
    const ind = arr.indexOf(max)
    setMostVoted(ind);
  }


  return (
    <div>
      <h1>Anecdote of the day</h1>
      {props.anecdotes[selected]} 
      <br />
      has votes {points[selected]}
      <br />
      <button onClick={() => onVote()}>votes</button>
      <button onClick={() => onChangeAnecdote()}>next anecdotes</button>

      <h1>Anecdote with most votes</h1>
      {props.anecdotes[mostVoted]}
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
  'Design and programming are human activities; forget that and all is lost.',
  'Before software can be reusable it first has to be usable.',
  'Real programmers can write assembly code in any language.',
  'The price of reliability is the pursuit of the utmost simplicity. It is a price which the very rich may find hard to pay.'
]

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App anecdotes={anecdotes} />
  </React.StrictMode>,
);