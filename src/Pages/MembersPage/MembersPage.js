import React, { useState, useEffect } from "react";
import "./membersPage.css";
import MemberCard from "../../Components/Members/MemberCard/MemberCard";
import AddMemberCard from "../../Components/Members/AddMemberCard/AddMemberCard";
import Pagination from "../../Components/Pagination/Pagination";
import { connect } from "react-redux";
import Loading from "../../Components/Loading/Loading";
import { changeCurrentPage, fetchMembersByPage } from "../../store";
import { useHistory, useParams } from "react-router-dom";
import ResetPassword from "./components/ResetPassword";
import SearchBar from "../../Components/SearchBar/SearchBar";

function MembersPage({
  fetchMembersByPage,
  membersByPage,
  loading,
  noMembers,
  count,
  // currentPage,
  changeCurrentPage,
  action,
  searchValue,
}) {
  const [modalOpen, setModalOpen] = useState(false);
  const [memberId, setMemberId] = useState(null);

  let history = useHistory();
  let { currentPage } = useParams();

  useEffect(() => {
    changeCurrentPage(1);
  }, []);

  useEffect(() => {
    if (!loading) {
      fetchMembersByPage(currentPage, searchValue ?? "");
    }
  }, [currentPage, action, searchValue]);

  function handleDetails(id) {
    history.push(`/edit-member/${id}`);
  }

  const handleReset = (id) => {
    setMemberId(id);
    setModalOpen(true);
  };

  if (loading) {
    return <Loading />;
  }
  if (noMembers && (!searchValue || searchValue == "")) {
    return (
      <div className="noData">
        <div>
          <div className="nodata_text">No members, you can add a member</div>
          <AddMemberCard />
        </div>
      </div>
    );
  }
  return (
    <>
      <ResetPassword
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        id={memberId}
        // setEditId={setEditId}
      />
      <div>
        <div className="members_container">
          <div className="is-flex is-justify-content-flex-end">
            <SearchBar
              id="membersSearch"
              containerClass="searchbar-container" url="/members"
            />
            <AddMemberCard />
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              padding: "0 20px",
              overflowY: "scroll",
              maxHeight: "65vh",
            }}
          >
            <table className="table is-striped is-fullwidth is-hoverable">
              <thead>
                <tr>
                  <th>Photo</th>
                  <th>Full Name</th>
                  <th>Organization</th>
                  <th>Phone</th>
                  {/* <th>Location</th> */}
                  <th></th>
                </tr>
              </thead>

              <tbody>
                {membersByPage.length > 0 ? (
                  membersByPage.map((memberByPage, index) => {
                    return (
                      <tr
                        key={memberByPage.id}
                        style={{ cursor: "pointer", position: "relative" }}
                        // onClick={() => handleDetails(memberByPage.id)}
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
                        {/* <td onClick={() => handleDetails(memberByPage.id)}>
                          {memberByPage.location}
                        </td> */}
                        {/* <div
                          onClick={() => handleReset(memberByPage.id)}
                          style={{ zIndex: "10", position: "absolute" }}
                        > */}
                        <td
                          // style={{ zIndex: "999999", position: "absolute" }}
                          onClick={() => handleReset(memberByPage.id)}
                        >
                          <i className="fas fa-key"></i>
                        </td>
                        {/* </div> */}
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="5">
                      {!searchValue || searchValue === ""
                        ? "No data"
                        : "Nothing found"}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <Pagination totalPosts={count} url="/members" />
        </div>
      </div>
    </>
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
export default connect(mapStateToProps, mapDispatchToProps)(MembersPage);
