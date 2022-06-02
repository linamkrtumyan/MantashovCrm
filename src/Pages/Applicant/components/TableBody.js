import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import {
  fetchApplicants,
  editApplicantStatus,
  changeCurrentPage,
  formOnChange,
} from "../../../store";

function TableBody({
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
        history.push("/add-member");
      }, 1000);
    }
  };
  return (
    <tbody>
      {applicants && applicants.length ? (
        applicants.map((applicant, index) => {
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
        })
      ) : (
        <tr>
          <td colSpan="5"> {"Nothing found"}</td>
        </tr>
      )}
    </tbody>
  );
}

const mapStateToProps = (state) => {
  return {
    applicants: state.applicantsReducer.applicants,
    loading: state.applicantsReducer.loading,
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

export default connect(mapStateToProps, mapDispatchToProps)(TableBody);
