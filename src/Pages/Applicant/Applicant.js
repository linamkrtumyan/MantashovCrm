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
  const history = useHistory();
  let { currentPage } = useParams();

  useEffect(() => {
    changeCurrentPage(1);
  }, []);

  useEffect(() => {
    if (!loading) {
      fetchApplicants(currentPage, searchValue ?? "");
    }
  }, [currentPage, fetch, searchValue]);

  const collectApplicantData = (applicant) => {
    formOnChange("firstNameEng", `${applicant.fullName?.split(" ")[0]}`);
    formOnChange("firstNameArm", `${applicant.fullName?.split(" ")[0]}`);
    formOnChange("firstNameRu", `${applicant.fullName?.split(" ")[0]}`);

    formOnChange("lastNameEng", `${applicant.fullName?.split(" ")[1]}`);
    formOnChange("lastNameArm", `${applicant.fullName?.split(" ")[1]}`);
    formOnChange("lastNameRu", `${applicant.fullName?.split(" ")[1]}`);

    formOnChange("email", `${applicant.email}`);
    formOnChange("phone", `${applicant.phone}`);
    formOnChange("turnover", `${applicant.turnover}`);
  };

  const changeApplicantStatus = (applicant, statusId) => {
    editApplicantStatus(applicant.id, statusId);
    collectApplicantData(applicant);
    if (statusId === 1) {
      setTimeout(() => {
        history.push("add-member");
      }, 1000);
    }
  };

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
      {applicants && applicants.length ? (
        <>
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

            <tbody>
              {applicants.map((applicant, index) => {
                return (
                  <tr style={{ cursor: "default" }} key={applicant.id}>
                    <td>{applicant.fullName}</td>
                    <td>{applicant.email}</td>
                    <td>{applicant.phone}</td>
                    <td>{applicant.turnover}</td>
                    <td>
                      {/* <Input id="status" type="text" /> */}
                      {applicant.status
                        ? applicant.status === 1
                          ? "Approved"
                          : "Ignored"
                        : "-"}
                    </td>
                    <td>
                      <div
                        className="delete-agenda-btn"
                        onClick={() => {
                          changeApplicantStatus(applicant, 1);
                        }}
                        style={{
                          display: `${applicant.status === 1 ? "none" : ""}`,
                        }}
                      >
                        <i
                          style={{ width: 17, height: 17 }}
                          className="fas fa-check"
                        ></i>
                      </div>
                    </td>
                    <td>
                      <div
                        className="delete-agenda-btn"
                        onClick={() => {
                          changeApplicantStatus(applicant, 2);
                        }}
                        style={{
                          display: `${applicant.status === 2 ? "none" : ""}`,
                        }}
                      >
                        <i
                          className="fas fa-times "
                          style={{
                            width: 17,
                            height: 17,
                          }}
                        ></i>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div style={{ marginTop: 20, marginBottom: 20 }}>
            <Pagination totalPosts={count} url="/applicant" />
          </div>
        </>
      ) : (
        <>
          {searchValue && searchValue !== "" ? (
            <div
              className="is-flex is-justify-content-center"
              style={{ marginTop: "100px" }}
            >
              <p className="applicant_page_title">Nothing found.</p>
            </div>
          ) : (
            <div
              className="is-flex is-justify-content-center"
              style={{ marginTop: "100px" }}
            >
              <p className="applicant_page_title">There is no Applicants.</p>
            </div>
          )}
        </>
      )}
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
