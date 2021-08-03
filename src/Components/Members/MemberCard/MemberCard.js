import React from "react";
import "./memberCard.css";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { deleteMember, transferMemberDelete, openModal } from "../../../store";
import DeleteMember from "../DeleteMemberModal/DeleteMember";

function MemberCard({ memberByPage, show, openModal, transferMemberDelete }) {
  let history = useHistory();
  let details = useHistory();
  function handleClick() {
    history.push(`/edit-member/${memberByPage.id}`);
  }
  function handleDetails() {
    history.push(`/member-details/${memberByPage.id}`);
  }

  // console.log(memberByPage);
  if (show) {
    // return <ModalComponent show={show} />;
    return <DeleteMember show={show} />;
  }
  return (
    <div className="membercard_container">
      <div className="membercard_img_container">
        <img
          alt=""
          className="membercard_img"
          src={`/images/profile/${memberByPage.id}/profile_picture.png`}
          // src={require("../../../img/artashes_only.jpg").default}
        />
      </div>
      <div onClick={handleDetails} className="membercard_text_container">
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
        <div
          onClick={() => {
            openModal(!show);
            transferMemberDelete(memberByPage.id);
            // pushId();
          }}
          className="membercard_icon_container"
        >
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

const mapStateToProps = (state) => {
  // console.log(state, "news card state");
  return {
    // currentPage: state.paginationReducer.currentPage,
    show: state.modalReducer.show,
    action: state.modalReducer.action,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // changeCurrentPage: (currentPage) =>
    //   dispatch(changeCurrentPage(currentPage)),
    openModal: (show) => dispatch(openModal(show)),
    deleteMember: (id) => dispatch(deleteMember(id)),
    transferMemberDelete: (id) => dispatch(transferMemberDelete(id)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(MemberCard);
