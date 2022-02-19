import React from "react";
// import "./addMemberCard.css";
import { useHistory } from "react-router-dom";
import Button from "../../Forms/Button/Button";

function AddSpeakerCard() {
  let history = useHistory();
  function handleClick() {
    history.push("/add-speaker");
  }
  return (
    <div className="add_newscard_container">
      <div onClick={handleClick}>
        <Button title="Add Speaker" />
      </div>
    </div>
  );
}

export default AddSpeakerCard;
