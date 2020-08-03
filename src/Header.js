import React, {useState} from 'react';
import Form from './Form';

function Header(props) {
    const [listClassName, setListClassName] = useState(['Link active', 'Link']);
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    
    function setActive(listId) {
      let newListClassName = [];
      newListClassName[listId] = 'Link active';
      newListClassName[listId ^ 1] = 'Link';

      setListClassName(newListClassName);
      props.setCurrentList(listId);
    }
  
    const today = new Date();
    return (
      <header>
        <div className="header">
          <div className="date">
            {dayNames[today.getDay()]}, {monthNames[today.getMonth()]} {today.getDate()}
          </div>
          <nav>
            <div className={listClassName[0]} onClick={() => setActive(0)}>Incomplete Tasks</div>
            <div className={listClassName[1]} onClick={() => setActive(1)}>Completed Tasks</div>
          </nav>
        </div>
          
        <div className="activeTasks">{props.activeTask} Active Tasks</div>
  
        <Form verifyInput={props.verifyInput} addTask={props.addTask}/>
      </header>
    );
  }
  
  export default Header;