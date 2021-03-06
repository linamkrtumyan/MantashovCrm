import React from "react";
import "./addMemberCard.css";
import { useHistory } from "react-router-dom";
import Button from "../../Forms/Button/Button";

function AddMemberCard() {
  let history = useHistory();
  function handleClick() {
    history.push("/add-member");
  }
  return (
    <div className="add_newscard_container">
      <div onClick={handleClick}>
        <Button title="Add Member" />
      </div>
    </div>
  );
}

export default AddMemberCard;
