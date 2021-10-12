import React from "react";
import "./addEventCard.css";
import { useHistory } from "react-router-dom";
import Button from "../../Forms/Button/Button";

function AddEventCard() {
  const history = useHistory();
  const toAddEventPage = () => {
    history.push("add-event");
  };
  return (
    <div
      className="add_eventcard_container"
      onClick={toAddEventPage}
    >
      {/* <div className="add_eventcard_icon">
        <svg fill="#343333" className="svg-plus" viewBox="0 0 100 100">
          <line x1="32.5" y1="50" x2="67.5" y2="50" strokeWidth="5"></line>
          <line x1="50" y1="32.5" x2="50" y2="67.5" strokeWidth="5"></line>
        </svg>
      </div>
      <div className="add_eventcard_text">Add Event</div> */}
      <div>
        <Button title="Add Event"  />
      </div>
    </div>
  );
}

export default AddEventCard;
