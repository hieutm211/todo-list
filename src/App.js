import React, {useState, useEffect} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import './App.css';

function Header(props) {
  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

  let incompClassName = props.currentList ? 'Link' : 'Link active';
  let compClassName = props.currentList ? 'Link active': 'Link';
  
  const today = new Date();
  return (
    <header>
      <div className="header">
        <div className="date">
          {dayNames[today.getDay()]}, {monthNames[today.getMonth()]} {today.getDate()}
        </div>
        <nav>
          <Link to="/" className={incompClassName} onClick={ (event) => props.setCurrentList(0) }>Incomplete Tasks</Link>
          <Link to="/completed" className={compClassName} onClick={ () => props.setCurrentList(1) } >Completed Tasks</Link>
        </nav>
      </div>
        
      <div className="activeTasks">{props.activeTask} Active Tasks</div>

      <Form verify={props.verify} addTask={props.addTask}/>
    </header>
  );
}

function Form(props) {
  const [description, setDescription] = useStateWithLocalStorage('description');
  const [errorMessage, setErrorMessage] = useState(null);

  function handleChange(event) {
    setDescription(event.target.value);
  }

  function handleKeyDown(event) {
    if (event.key === 'Enter') {
      addTask(description);
    }
  }

  function addTask(description) {
    description = description.trim();

    let error = props.verify(description);
    if (!error) {
      setErrorMessage(null);
      props.addTask(description);
      setDescription('');
    } else {
      setErrorMessage(error);
    }
  }

  return (
    <div className="taskForm"> 
      <div className="form">
          <input type="text" value={description} onKeyDown={handleKeyDown} onChange={handleChange} placeholder="Enter a task..."></input>
          <button onClick={() => addTask(description)}>Add Task</button>  
      </div>

      <div className="errorMsg">
        {errorMessage}
      </div>
    </div>
  );
}

function List(props) {
  return (
    <ul>
      {props.value.map((el) => {
        return (
          <li key={el.id}>
            <button className="tickBtn" onClick={() => props.moveTask(el.id) }>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="19" 
                height="19" 
                fill="none">
                  <circle cx="9.5" cy="9.5" r="9" stroke="#8D9196"></circle>
                  <path 
                    fill="#8D9196" 
                    d="M14 6.5a.6.6 0 0 0-.7 0l-5 4.9-2.6-2.6a.6.6 0 0 0-.7.8l3 3a.6.6 0 0 0 .7 0L14 7.1c.3-.2.3-.5 0-.7z">
                  </path>
              </svg>
            </button>
            <div className="description">{el.description}</div>
            <button className="removeBtn" onClick={() => props.removeTask(el.id) }>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="19" 
                height="19" 
                fill="none">
                  <path 
                    fill="#8D9196" 
                    d="M17.4 2.7h-4v-.6c0-1.2-.9-2.1-2-2.1H7.6a2 2 0 0 0-2 2v.7h-4c-.3 0-.5.3-.5.6s.2.5.5.5h1v12.4c0 1.5 1.2 2.8 2.8 2.8h8.2c1.6 0 2.9-1.3 2.9-2.8V3.8h1c.2 0 .4-.2.4-.5s-.2-.6-.5-.6zM6.6 2.1c0-.6.5-1 1-1h3.8c.5 0 1 .4 1 1v.6H6.6v-.6zm8.8 14c0 1-.8 1.8-1.8 1.8H5.4c-1 0-1.8-.7-1.8-1.7V3.8h11.8v12.4z"></path><path fill="#8D9196" d="M9.5 16c.3 0 .5-.2.5-.5V6.2c0-.3-.2-.5-.5-.5s-.5.2-.5.5v9.3c0 .3.2.6.5.6zM6 15.5c.4 0 .6-.3.6-.6V6.8c0-.3-.2-.5-.5-.5s-.6.2-.6.5v8.1c0 .3.3.6.6.6zM13 15.5c.2 0 .5-.3.5-.6V6.8c0-.3-.3-.5-.6-.5s-.5.2-.5.5v8.1c0 .3.2.6.5.6z">
                  </path>
                </svg>
            </button>
          </li>
        );
      })}
    </ul>
  );
}

function App() {
  const [incompleteList, setIncompleteList] = useStateWithLocalStorage('incompleteList', []);
  const [completedList, setCompletedList] = useStateWithLocalStorage('completedList', []);
  const [currentList, setCurrentList] = useState(0);
  const [currentId, setCurrentId] = useStateWithLocalStorage('currentId', 0);

  function getCurrentList() {
    return currentList ? completedList : incompleteList;
  }

  function verify(description) {
    if (description === "") {
      return "Please enter in a task";
    }

    if (findTask(incompleteList, description) || findTask(completedList, description)) {
      return "This task already exists";
    }

    return null;
  }

  function findTask(list, description) {
    for (let task of list) {
      if (task.description === description) {
        return true;
      }
    }
    return false;
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
    <div className="App">
      <div className="container">
        <Router>
          <Header 
            activeTask={incompleteList.length} 
            currentList = {currentList}
            setCurrentList={setCurrentList} 
            addTask={addTask} 
            verify={verify}
          />

          <Switch>
            <Route exact path="/">
              <List value={incompleteList} moveTask={moveTask} removeTask={removeTask}/>
            </Route>
            <Route path="/completed">
              <List value={completedList} moveTask={moveTask} removeTask={removeTask}/>
            </Route>
          </Switch>
          
        </Router>
      </div>
    </div>
  );
}

const useStateWithLocalStorage = (localStorageKey, initalValue) => {
  const [value, setValue] = useState(JSON.parse(localStorage.getItem(localStorageKey)) || initalValue || '');

  useEffect(()=> {
    localStorage.setItem(localStorageKey, JSON.stringify(value))
  }, [localStorageKey, value]);

  return [value, setValue];
}

export default App;
