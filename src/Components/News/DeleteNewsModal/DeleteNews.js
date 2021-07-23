import React, { useEffect } from "react";
import { connect } from "react-redux";
import { deleteNews, transferNewsDelete } from "../../../store";
import ModalComponent from "../../Modal/Modal";

export const DeleteNews = ({ action, show, news, deleteNews }) => {
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
      <ModalComponent show={show} handleDelete={deleteNews} id={news} />;
    </div>
  );
};
const mapStateToProps = (state) => {
  // console.log(state, "news delete state");
  return {
    // currentPage: state.paginationReducer.currentPage,
    //   show: state.modalReducer.show,
    action: state.modalReducer.action,
    news: state.newsReducer.news,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    //   deleteNews: (id) => dispatch(deleteNews(id)),

    deleteNews: (news) => dispatch(deleteNews(news)),
    // transferNewsDelete: (news) => dispatch(transferNewsDelete(news)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DeleteNews);
