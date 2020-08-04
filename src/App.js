import React, { useState } from 'react'
import Header from './Header'
import List from './List'
import './App.css'

/*
  Task: {
    id: number
    category: 'incomplete' / 'completed'
    description: string
  }

  data: array of Task
*/

function App() {
  const [data, setData] = useState([])
  const [currentCategory, setCurrentCategory] = useState('incomplete')
  const [currentId, setCurrentId] = useState(0)

  function Task(id, category, description) {
    this.id = id
    this.category = category
    this.description = description
  }

  function verifyInput(description) {
    if (description === '') {
      return 'Please enter in a task'
    }

    if (data.find((item) => item.description === description)) {
      return 'This task already exists'
    }

    return null
  }

  function getTaskList(category) {
    return data.filter((item) => item.category === category)
  }

  function addTask(description) {
    setData([...data, new Task(currentId, 'incomplete', description)])
    setCurrentId(currentId + 1)
  }

  function removeTask(id) {
    const newData = data.reject((item) => item.id === id)
    setData(newData)
  }

  function moveTask(id) {
    const newData = data.map(function (item) {
      if (item.id === id) {
        const mappedItem = { ...item }
        mappedItem.category =
          item.category === 'completed' ? 'incomplete' : 'completed'
        return mappedItem
      }
      return item
    })

    setData(newData)
  }

  return (
    <div className="App">
      <div className="container">
        <Header
          setCurrentCategory={setCurrentCategory}
          verifyInput={verifyInput}
          addTask={addTask}
          activeTask={getTaskList('incomplete').length}
          currentCategory={currentCategory}
        />

        <List
          taskList={getTaskList(currentCategory)}
          currentCategory={currentCategory}
          moveTask={moveTask}
          removeTask={removeTask}
        />
      </div>
    </div>
  )
}

export default App
