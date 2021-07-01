import React from "react";
import "./addNewsCard.css";

function AddNewsCard() {
  return (
    <div className="add_newscard_container">
      <div className="add_newscard_icon">
        <svg fill="#343333" className="svg-plus" viewBox="0 0 100 100">
          <line x1="32.5" y1="50" x2="67.5" y2="50" strokeWidth="5"></line>
          <line x1="50" y1="32.5" x2="50" y2="67.5" strokeWidth="5"></line>
        </svg>
      </div>
      <div className="add_newscard_text">Add News</div>
    </div>
  );
}

export default AddNewsCard;
