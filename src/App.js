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
  return (
    <div>
        <input></input>
        <button>add task</button>  
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
            <button>delete</button>
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
  const [currentList, setCurrentList] = useState(incompleteList);

  return (
    <div class="App">
      <Header />
      <Form />
      <List value={currentList}/>
    </div>
  );
}

export default App;
