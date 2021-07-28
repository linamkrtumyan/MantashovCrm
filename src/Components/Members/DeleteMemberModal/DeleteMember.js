import React, { useEffect } from "react";
import { connect } from "react-redux";
import { deleteMember, deleteNews, transferNewsDelete } from "../../../store";
import ModalComponent from "../../Modal/Modal";

export const DeleteMember = ({ action, show, member, deleteMember }) => {
  //   console.log(news, "news id");
  //   if (action) {
  //     console.log("mtav deletei if");
  //     deleteNews(news);
  //   }
  //   useEffect(() => {
  //     transferNewsDelete(news);
  //   }, []);

  return (
    <div>
      <ModalComponent show={show} handleDelete={deleteMember} id={member} />;
    </div>
  );
};
const mapStateToProps = (state) => {
  // console.log(state, "news delete state");
  return {
    // currentPage: state.paginationReducer.currentPage,
    //   show: state.modalReducer.show,
    action: state.modalReducer.action,
    member: state.membersReducer.member,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    //   deleteNews: (id) => dispatch(deleteNews(id)),

    deleteMember: (member) => dispatch(deleteMember(member)),
    // transferNewsDelete: (news) => dispatch(transferNewsDelete(news)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DeleteMember);
