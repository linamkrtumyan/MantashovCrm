import React, { useState, useEffect } from "react";
import "./applicant.css";
import { connect } from "react-redux";
import {
  fetchApplicants,
  editApplicantStatus,
  changeCurrentPage,
  formOnChange,
} from "../../store";
import Pagination from "../../Components/Pagination/Pagination";
import { useHistory, useParams } from "react-router-dom";
import SearchBar from "../../Components/SearchBar/SearchBar";
import TableBody from "./components/TableBody";
import Loading from "../../Components/Loading/Loading";


function Applicant({
  fetchApplicants,
  editApplicantStatus,
  applicants,
  loading,
  // currentPage,
  fetch,
  formOnChange,
  count,
  searchValue,
}) {
  useEffect(() => {
    changeCurrentPage(1);
    fetchApplicants(1, "");
  }, []);

  return (
    <div>
      <div className="applicant_page_title_container">
        <p className="applicant_page_title">Applicants</p>
      </div>

      <div className="is-flex is-justify-content-flex-end">
        <SearchBar
          id="applicantsSearch"
          containerClass="searchbar-container"
          url="/applicant"
        />
      </div>
      <table
        className="table is-striped  
      is-fullwidth is-hoverable table is-bordered applicant_page_container"
      >
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Company Turnover</th>
            <th>Status</th>
            <th></th>
            <th></th>
          </tr>
        </thead>

        <TableBody />
      </table>
      <div style={{ marginTop: 20, marginBottom: 20 }}>
        <Pagination totalPosts={count} url="/applicant" />
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    applicants: state.applicantsReducer.applicants,
    loading: state.applicantsReducer.loading,
    // currentPage: state.paginationReducer.currentPage,
    fetch: state.applicantsReducer.fetch,
    count: state.applicantsReducer.count,
    searchValue: state.formReducer?.applicantsSearch ?? "",
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchApplicants: (page, searchValue) => {
      dispatch(fetchApplicants(page, searchValue));
    },
    editApplicantStatus: (id, statusId) => {
      dispatch(editApplicantStatus(id, statusId));
    },
    changeCurrentPage: (page) => dispatch(changeCurrentPage(page)),
    formOnChange: (key, value) => dispatch(formOnChange(key, value)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Applicant);
