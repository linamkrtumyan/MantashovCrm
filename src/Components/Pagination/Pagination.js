import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import Input from "../../Components/Forms/Input/Input"
import "./pagination.css"

// const Pagination = ({ postsPerPage, totalPosts, paginate, currentPage }) => {
    const Pagination = () => {
        const postsPerPage = 10
        const totalPosts =50
        const [currentPage,setCurrentPage] = useState(1)

        const paginate = (pageNumber) => setCurrentPage(pageNumber);


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
            <Input type="number" defaultValue={currentPage} className="pgn_input"/>

            {/* <input
              type="number"
              onWheel={() => document.activeElement.blur()}
              defaultValue={currentPage}
              max={pageNumbers[pageNumbers.length - 1]}
              min="1"
              onChange={(e) => {
                const page =
                  e.target.value <= pageNumbers[pageNumbers.length - 1] &&
                  e.target.value > 0
                    ? Number(e.target.value)
                    : 1;

                paginate(page);
              }}
              style={{ width: "100px" }}
            /> */}
          </div>
          <div className="pgn_container">
            <button
              className="pgn_item"
              onClick={() => paginate(1)}
              disabled={currentPage - 1 <= 0}
            >
              {"<<"}
            </button>
            <button
              className="pgn_item"
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage - 1 <= 0}
            >
              {"<"}
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
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage >= pageNumbers[pageNumbers.length - 1]}
            >
              {">"}
            </button>
            <button
              className="pgn_item"
              onClick={() => paginate(pageNumbers[pageNumbers.length - 1])}
              disabled={currentPage >= pageNumbers[pageNumbers.length - 1]}
            >
              {">>"}
            </button>
          </div>
        </div>
      ) : null}
    </nav>
  );
};

export default Pagination;
