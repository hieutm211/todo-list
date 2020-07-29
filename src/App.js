import React, {useState} from 'react';
import './App.css';

function Header(props) {
  return (
    <header>
        <nav>
          <span>
            this is date
          </span>
          <span>
            <button onClick={ () => props.setCurrentList(0) }>incomplete tasks</button>
            <button onClick={ () => props.setCurrentList(1) } >completed tasks</button>
          </span>
        </nav>
        
      <span>{props.activeTask} active tasks</span>
    </header>
  );
}

function Form(props) {
  const [description, setDescription] = useState('');

  function handleChange(event) {
    setDescription(event.target.value);
  }

  function addTask(description) {
    props.addTask(description);
    setDescription('');
  }

  return (
    <div>
        <input type="text" value={description} onChange={handleChange}></input>
        <button onClick={() => addTask(description)}>add task</button>  
        <div>error message</div>
    </div>
  );
}

function List(props) {
  return (
    <ul>
      {props.value.map((el) => {
        return (
          <li key={el.id}>
            <button onClick={() => props.moveTask(el.id) }>tick</button>
            {el.description}
            <button onClick={() => props.removeTask(el.id) }>delete</button>
          </li>
        );
      })}
    </ul>
  );
}

function App() {
  const [incompleteList, setIncompleteList] = useState([]);
  const [completedList, setCompletedList] = useState([]);
  const [currentList, setCurrentList] = useState(0);
  const [currentId, setCurrentId] = useState(0);

  function getCurrentList() {
    return currentList ? completedList : incompleteList;
  }

  function addTask(description) {
    setIncompleteList([...incompleteList, {id: currentId, description}]);
    setCurrentId(currentId+1);
  }

  function removeTask(id) {
    let list = getCurrentList();
    let newList = [];
    
    for (let el of list) {
      if (el.id !== id) {
        newList.push({...el});
      }
    }

    if (currentList === 0) {
      setIncompleteList(newList);
    } else {
      setCompletedList(newList);
    }
  }

  function moveTask(id) {
    let list = getCurrentList();
    
    //get value of task (whose id = id)
    let task;
    for (let el of list) {
      if (el.id === id) {
        task = {...el};
      }
    }

    //remove it from current list
    removeTask(id);

    //add it to the other list
     if (currentList === 0) {
       setCompletedList([...completedList, task]);
    } else {
       setIncompleteList([...incompleteList, task]);
    }
  }

  return (
    <div class="App">
      <Header activeTask={incompleteList.length} setCurrentList={setCurrentList}/>
      <Form addTask={addTask}/>
      <List value={getCurrentList()} moveTask={moveTask} removeTask={removeTask}/>
    </div>
  );
}

export default App;
