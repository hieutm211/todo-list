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
            <button>incomplete tasks</button>
            <button>completed tasks</button>
          </span>
        </nav>
        
        <span>active tasks</span>
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
            <button>tick</button>
            {el.description}
            <button onClick={() => props.removeTask(el.id)}>delete</button>
          </li>
        );
      })}
    </ul>
  );
}

function App() {
  const [incompleteList, setIncompleteList] = useState([]);
  const [completedList, setCompletedList] = useState([]);
  const [inIncompletedList, setInIncompletedList] = useState(true);
  const [currentList, setCurrentList] = useState(0);
  const [currentId, setCurrentId] = useState(0);

  function addTask(description) {
    setIncompleteList([...incompleteList, {id: currentId, description}]);
    setCurrentId(currentId+1);
  }

  function removeTask(id) {
    let list = currentList ? completedList : incompleteList;
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

  return (
    <div class="App">
      <Header />
      <Form addTask={addTask}/>
      <List value={currentList ? completedList : incompleteList} removeTask={removeTask}/>
    </div>
  );
}

export default App;
