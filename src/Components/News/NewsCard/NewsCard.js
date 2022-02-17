import React from "react";
import "./newsCard.css";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { openModal, deleteNews, transferNewsDelete } from "../../../store";
import DeleteNews from "../DeleteNewsModal/DeleteNews";

function NewsCard({
  news,
  openModal,
  show,
  action,
  deleteNews,
  tranferNewsDelete,
}) {
  // const [show, setShow] = useState(false);
  // const handleShow = () => setShow(true);

  // console.log(news, "news");
  let history = useHistory();
  function handleClick() {
    history.push(`/news-details/${news.id}`);
  }
  // let history = useHistory();
  function handleEdit() {
    history.push(`/edit-news/${news.id}`);
  }
  // function pushId() {
  //   history.push(`/delete-news/${news.id}`);
  // }

  // useEffect(() => {
  //   deleteNews(news.id);
  // }, [action]);

  // if (action) {
  //   deleteNews(news.id);
  //   action = false;
  // }

  if (show) {
    // return <ModalComponent show={show} />;
    return <DeleteNews show={show} />;
  }
  return (
    <div className="newscard_container">
      <div className="newscard_img_container">
        <img
          alt=""
          className="newscard_img"
          onError={(e) => {
            e.preventDefault();
            e.target.onerror = null;
            e.target.src = require("../../../img/unnamed.png").default;
          }}
          src={`/images/newsHeader/${news.id}/header.png`}
        />
      </div>
      <div className="newscard_text_container">
        <div className="newscard_title" onClick={handleClick}>
          <p>{news.title}</p>
        </div>
        <div className="newscard_text">{news.text}</div>
      </div>
      <div className="newscard_action_component">
        <div className="newscard_icon_container" onClick={handleEdit}>
          {" "}
          <img
            alt=""
            className="newscard_icon"
            src={require("../../../img/edit.svg").default}
          />
        </div>
        <div
          className="newscard_icon_container"
          onClick={() => {
            openModal(!show);
            tranferNewsDelete(news.id);
            // pushId();
          }}
        >
          {" "}
          <img
            alt=""
            className="newscard_icon"
            src={require("../../../img/trash.svg").default}
          />
        </div>
      </div>
      {/* <ModalComponent /> */}
      {/* <div
        variant="primary"
        onClick={() => {
          openModal(!show);
          pushId();
        }}
      >
        open modal{" "}
      </div> */}
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
    deleteNews: (id) => dispatch(deleteNews(id)),
    tranferNewsDelete: (id) => dispatch(transferNewsDelete(id)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(NewsCard);
