import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { number, clearState, operator, equals } from './services/store'
import { DisplayState } from './types'
import './app.scss'

// When inputting numbers, my calculator should not allow a number to begin with multiple zeros.

function App() {

  const { formula, display } = useSelector((state: DisplayState) => state.display)
  const dispatch = useDispatch()

  const handleEquals = () => {
    dispatch(equals())
  }

  const handleOperator = (e: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(operator(e.currentTarget.value))
  }

  const handleUpdate = (e: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(number(e.currentTarget.value))
    console.log(e.currentTarget.value)
  }

  return (
    <div className="wrapper">
      <div id='formula'>{formula}</div>
      <div id="display">{display}</div>
      <button id="clear" onClick={() => dispatch(clearState())}>AC</button>
      <button id="divide" value='/' onClick={handleOperator}>/</button>
      <button id="multiply" value='*' onClick={handleOperator}>x</button>
      <button id="seven" value='7' onClick={handleUpdate}>7</button>
      <button id="eight" value='8' onClick={handleUpdate}>8</button>
      <button id="nine" value='9' onClick={handleUpdate}>9</button>
      <button id="subtract" value='-' onClick={handleOperator}>-</button>
      <button id="four" value='4' onClick={handleUpdate}>4</button>
      <button id="five" value='5' onClick={handleUpdate}>5</button>
      <button id="six" value='6' onClick={handleUpdate}>6</button>
      <button id="add" value='+' onClick={handleOperator}>+</button>
      <button id="one" value='1' onClick={handleUpdate}>1</button>
      <button id="two" value='2' onClick={handleUpdate}>2</button>
      <button id="three" value='3' onClick={handleUpdate}>3</button>
      <button id="equals" value='=' onClick={handleEquals}>=</button>
      <button id='zero' value='0' onClick={handleUpdate}>0</button>
      <button id="decimal" value='.' onClick={handleOperator}>.</button>
    </div>
  )
}

export default App
