import React from "react";
import "./addNewsCard.css";
import { useHistory } from "react-router-dom";
import Button from "../../../Components/Forms/Button/Button";

function AddNewsCard() {
  let history = useHistory();
  function handleClick() {
    history.push("/add-news");
  }
  return (
    <div className="add_newscard_container">
      <div onClick={handleClick}>
        <Button title="Add News" />
      </div>
    </div>
  );
}

export default AddNewsCard;
