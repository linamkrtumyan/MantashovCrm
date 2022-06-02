import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { changeCurrentPage, fetchMembersByPage } from "../../../store";
import { useHistory, useParams } from "react-router-dom";

function TableBody({
  fetchMembersByPage,
  membersByPage,
  loading,
  noMembers,
  count,
  // currentPage,
  changeCurrentPage,
  action,
  searchValue,
  setModalOpen,
  setMemberId,
}) {
  let history = useHistory();
  let { currentPage } = useParams();
  // const [modalOpen, setModalOpen] = useState(false);
  // const [memberId, setMemberId] = useState(null);

  function handleDetails(id) {
    history.push(`/edit-member/${id}`);
  }
  const handleReset = (id) => {
    setMemberId(id);
    setModalOpen(true);
  };
  return (
    <tbody>
      {membersByPage.length > 0 ? (
        membersByPage.map((memberByPage, index) => {
          return (
            <tr
              key={memberByPage.id}
              style={{ cursor: "pointer", position: "relative" }}
            >
              <td onClick={() => handleDetails(memberByPage.id)}>
                <img
                  alt=""
                  className="membercard_img"
                  src={`${memberByPage.image}`}
                />
              </td>
              <td onClick={() => handleDetails(memberByPage.id)}>
                {memberByPage.fullName}
              </td>
              <td onClick={() => handleDetails(memberByPage.id)}>
                {memberByPage.organization && (
                  <p key={memberByPage.organization}>
                    {memberByPage.organization.name}{" "}
                    {memberByPage.organization.position}
                  </p>
                )}
              </td>
              <td onClick={() => handleDetails(memberByPage.id)}>
                {memberByPage.phone}
              </td>
              <td onClick={() => handleReset(memberByPage.id)}>
                <i className="fas fa-key"></i>
              </td>
            </tr>
          );
        })
      ) : (
        <tr>
          <td colSpan="5">{"Nothing found"}</td>
        </tr>
      )}
    </tbody>
  );
}

const mapStateToProps = (state) => {
  return {
    membersByPage: state.membersReducer.membersByPage,
    loading: state.membersReducer.loading,
    noMembers: state.membersReducer.membersByPage.length === 0,
    count: state.membersReducer.count,
    // currentPage: state.paginationReducer.currentPage,
    action: state.modalReducer.action,
    searchValue: state.formReducer?.membersSearch ?? "",
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeCurrentPage: (page) => dispatch(changeCurrentPage(page)),
    fetchMembersByPage: (page, searchValue) =>
      dispatch(fetchMembersByPage(page, searchValue)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableBody);
