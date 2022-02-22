import React from "react";
import { Link } from "react-router-dom";
import "./pagination.css";
import { connect } from "react-redux";
import { changeCurrentPage } from "../../store";

// const Pagination = ({ postsPerPage, totalPosts, paginate, currentPage }) => {
const Pagination = ({ totalPosts, changeCurrentPage, currentPage }) => {
  const postsPerPage = 10;
  // const totalPosts =50
  // const [currentPage, setCurrentPage] = useState(1);

  // const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      {pageNumbers.length > 0 ? (
        <div className="pagination_container">
          <div className="pgn_nav">
            <div className="pgn_nav_title"></div>
          </div>
          <div className="pgn_container">
            <button
              className="pgn_item"
              onClick={() => changeCurrentPage(1)}
              disabled={currentPage - 1 <= 0}
            >
              ❮❮
            </button>
            <button
              className="pgn_item"
              onClick={() => changeCurrentPage(currentPage - 1)}
              disabled={currentPage - 1 <= 0}
            >
              ❮
            </button>
            <div className="pgn_link">
              <Link
                style={{ pointerEvents: "none" }}
                className="link"
                disabled={true}
                to=""
              >
                {currentPage} / {pageNumbers[pageNumbers.length - 1]}
              </Link>
            </div>

            <button
              className="pgn_item"
              onClick={() => changeCurrentPage(currentPage + 1)}
              disabled={currentPage >= pageNumbers[pageNumbers.length - 1]}
            >
              ❯
            </button>
            <button
              className="pgn_item"
              onClick={() =>
                changeCurrentPage(pageNumbers[pageNumbers.length - 1])
              }
              disabled={currentPage >= pageNumbers[pageNumbers.length - 1]}
            >
              ❯❯
            </button>
          </div>
        </div>
      ) : null}
    </nav>
  );
};

const mapStateToProps = (state) => {
  return {
    currentPage: state.paginationReducer.currentPage,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeCurrentPage: (currentPage) =>
      dispatch(changeCurrentPage(currentPage)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Pagination);
