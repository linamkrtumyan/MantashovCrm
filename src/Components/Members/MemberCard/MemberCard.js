import React from "react";
import "./memberCard.css";
import { useHistory } from "react-router-dom";

function MemberCard({ memberByPage }) {
  let history = useHistory();
  function handleClick() {
    history.push("/edit-member");
  }
  // console.log(memberByPage);
  return (
    <div className="membercard_container">
      <div className="membercard_img_container">
        <img
          alt=""
          className="membercard_img"
          src={`/api/image/?page=profile&id=${memberByPage.id}&name=profile_picture.png`}
          // src={require("../../../img/artashes_only.jpg").default}
        />
      </div>
      <div className="membercard_text_container">
        <div className="membercard_title">
          <p>
            {memberByPage.firstName} {memberByPage.lastName}
          </p>
        </div>
        <div className="membercard_subtitle">
          <p>{memberByPage.location}</p>
        </div>
        <div className="membercard_text">{memberByPage.description} </div>
      </div>
      <div className="membercard_action_component">
        <div className="membercard_icon_container" onClick={handleClick}>
          {" "}
          <img
            alt=""
            className="membercard_icon"
            src={require("../../../img/edit.svg").default}
          />
        </div>
        <div className="membercard_icon_container">
          {" "}
          <img
            alt=""
            className="membercard_icon"
            src={require("../../../img/trash.svg").default}
          />
        </div>
      </div>
    </div>
  );
}

export default MemberCard;
