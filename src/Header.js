import React from "react";
import PropTypes from "prop-types";
import Form from "./Form";

function Header(props) {
  const dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  function getClassName(category) {
    return props.currentCategory === category ? "link active" : "link";
  }

  const today = new Date();

  return (
    <header>
      <div className="header">
        <div className="date">
          {`${dayNames[today.getDay()]}, 
          ${monthNames[today.getMonth()]} ${today.getDate()}`}
        </div>
        <nav>
          <div
            className={getClassName("incomplete")}
            onClick={() => props.setCurrentCategory("incomplete")}
          >
            Incomplete Tasks
          </div>
          <div
            className={getClassName("completed")}
            onClick={() => props.setCurrentCategory("completed")}
          >
            Completed Tasks
          </div>
        </nav>
      </div>

      <div className="activeTasks">{props.activeTask} Active Tasks</div>

      <Form verifyInput={props.verifyInput} addTask={props.addTask} />
    </header>
  );
}

Header.propTypes = {
  setCurrentCategory: PropTypes.func.isRequired,
  verifyInput: PropTypes.func.isRequired,
  addTask: PropTypes.func.isRequired,
  activeTask: PropTypes.number.isRequired,
  currentCategory: PropTypes.string.isRequired,
};

export default Header;
