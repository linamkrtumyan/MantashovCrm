import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./pagination.css";
import { connect } from "react-redux";
import { changeCurrentPage } from "../../store";
import { useHistory, useParams } from "react-router-dom";

// const Pagination = ({ postsPerPage, totalPosts, paginate, currentPage }) => {
const Pagination = ({
  totalPosts,
  changeCurrentPage,
  url = "",
  // , currentPage
}) => {
  let history = useHistory();
  let { currentPage } = useParams();
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
              onClick={() => {
                history.push(`${url}/${1}`);
                changeCurrentPage(1);
              }}
              disabled={currentPage <= 1}
              style={{ cursor: `${currentPage <= 1 ? "default" : "pointer"}` }}
            >
              ❮❮
            </button>
            <button
              className="pgn_item"
              onClick={() => {
                history.push(`${url}/${parseInt(currentPage) - 1}`);
                changeCurrentPage(currentPage - 1);
              }}
              disabled={currentPage <= 1}
              style={{ cursor: `${currentPage <= 1 ? "default" : "pointer"}` }}
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
              onClick={() => {
                history.push(`${url}/${parseInt(currentPage) + 1}`);
                changeCurrentPage(currentPage + 1);
              }}
              disabled={currentPage >= pageNumbers[pageNumbers.length - 1]}
              style={{
                cursor: `${
                  currentPage >= pageNumbers.length ? "default" : "pointer"
                }`,
              }}
            >
              ❯
            </button>
            <button
              className="pgn_item"
              onClick={() => {
                history.push(`${url}/${pageNumbers[pageNumbers.length - 1]}`);
                changeCurrentPage(pageNumbers[pageNumbers.length - 1]);
              }}
              disabled={currentPage >= pageNumbers[pageNumbers.length - 1]}
              style={{
                cursor: `${
                  currentPage >= pageNumbers.length ? "default" : "pointer"
                }`,
              }}
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
    // currentPage: state.paginationReducer.currentPage,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeCurrentPage: (currentPage) =>
      dispatch(changeCurrentPage(currentPage)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Pagination);
