import React, { useState } from 'react';
import Header from './Header';
import List from './List';
import './App.css';

function App() {
  const [list, setList] = useState([[], []]);
  const [currentList, setCurrentList] = useState(0);
  const [currentId, setCurrentId] = useState(0);

  function findTask(description) {
    for (let i = 0; i < list.length; i++) {
      for (let j = 0; j < list[i].length; i++) {
        if (list[i][j].description === description) {
          return true;
        }
      }
    }

    return false;
  }

  function verifyInput(description) {
    if (description === '') {
      return 'Please enter in a task';
    }

    if (findTask(description)) {
      return 'This task already exists';
    }

    return null;
  }

  function getCurrentList() {
    return list[currentList];
  }

  function copy2DArray(arr) {
    let result = [];
    for (let i = 0; i < arr.length; i++) {
      result.push([]);
      for (let j = 0; j < arr[i].length; j++) {
        result[i].push({ ...arr[i][j] });
      }
    }
    return result;
  }

  function removeElementIn2DArray(arr, row, col) {
    for (let j = col; j < arr[row].length - 1; j++) {
      arr[row][j] = arr[row][j + 1];
    }
    arr[row].pop();
  }

  function addTask(description) {
    //copy original list
    let newList = copy2DArray(list);

    //add task to the incomplete list
    newList[0].push({ id: currentId, description });

    //set new list
    setList(newList);
    setCurrentId(currentId + 1);
  }

  function removeTask(currentList, index) {
    //copy original list
    let newList = copy2DArray(list);

    //remove task
    removeElementIn2DArray(newList, currentList, index);

    //set new list
    setList(newList);
  }

  function moveTask(currentList, index) {
    //copy this task
    let task = { ...list[currentList][index] };

    //copy the original array
    let newList = copy2DArray(list);

    //remove it from current list
    removeElementIn2DArray(newList, currentList, index);

    //add it to the other list
    newList[currentList ^ 1].push(task);
    setList(newList);
  }

  return (
    <div className="App">
      <div className="container">
        <Header
          setCurrentList={setCurrentList}
          activeTask={list[0].length}
          addTask={addTask}
          verifyInput={verifyInput}
        />

        <List
          list={getCurrentList()}
          currentList={currentList}
          moveTask={moveTask}
          removeTask={removeTask}
        />
      </div>
    </div>
  );
}

export default App;
