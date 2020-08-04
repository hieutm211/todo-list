import React, { useState } from 'react'
import PropTypes from 'prop-types'

function Form(props) {
  const [description, setDescription] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  function handleChange(event) {
    setDescription(event.target.value)
  }

  function handleKeyDown(event) {
    if (event.key === 'Enter') {
      addTask(description)
    }
  }

  function addTask(description) {
    description = description.trim()

    const error = props.verifyInput(description)
    if (!error) {
      setErrorMessage(null)
      props.addTask(description)
      setDescription('')
    } else {
      setErrorMessage(error)
    }
  }

  return (
    <div className="taskForm">
      <div className="form">
        <input
          type="text"
          value={description}
          onKeyDown={handleKeyDown}
          onChange={handleChange}
          placeholder="Enter a task..."
        ></input>
        <button onClick={() => addTask(description)}>Add Task</button>
      </div>

      <div className="errorMsg">{errorMessage}</div>
    </div>
  )
}

Form.propTypes = {
  verifyInput: PropTypes.func.isRequired,
  addTask: PropTypes.func.isRequired,
}

export default Form
