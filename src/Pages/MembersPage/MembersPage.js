import React, { useState, useEffect } from "react";
import "./membersPage.css";
import MemberCard from "../../Components/Members/MemberCard/MemberCard";
import AddMemberCard from "../../Components/Members/AddMemberCard/AddMemberCard";
import Pagination from "../../Components/Pagination/Pagination";
import { connect } from "react-redux";
import Loading from "../../Components/Loading/Loading";
import { fetchMembersByPage } from "../../store";
import { useHistory } from "react-router-dom";
import ResetPassword from "./components/ResetPassword";

function MembersPage({
  fetchMembersByPage,
  membersByPage,
  loading,
  noMembers,
  count,
  currentPage,
  action,
}) {
  const [modalOpen, setModalOpen] = useState(false);
  const [memberId, setMemberId] = useState(null);

  let history = useHistory();

  useEffect(() => {
    fetchMembersByPage();
  }, [currentPage, action]);

  function handleDetails(id) {
    history.push(`/edit-member/${id}`);
  }

  const handleReset = (id) => {
    console.log(id, "id***");
    setMemberId(id);
    setModalOpen(true);
  };

  if (loading) {
    return <Loading />;
  }
  if (noMembers) {
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
          <AddMemberCard />

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              padding: "0 50px",
              overflowY: "scroll",
              maxHeight: "65vh",
            }}
          >
            <table className="table is-striped  is-fullwidth is-hoverable">
              <thead>
                <tr>
                  <th>Photo</th>
                  <th>Full Name</th>
                  <th>Organization</th>
                  <th>Phone</th>
                  <th>Location</th>
                  <th></th>
                </tr>
              </thead>

              <tbody>
                {membersByPage.length > 0 ? (
                  membersByPage.map((memberByPage, index) => {
                    return (
                      <tr
                        style={{ cursor: "pointer", position: "relative" }}
                        // onClick={() => handleDetails(memberByPage.id)}
                        key={index}
                      >
                        <td onClick={() => handleDetails(memberByPage.id)}>
                          {" "}
                          <img
                            alt=""
                            className="membercard_img"
                            src={`/images/profile/${memberByPage.id}/profile_picture.png`}
                          />
                        </td>
                        <td onClick={() => handleDetails(memberByPage.id)}>
                          {memberByPage.firstName} {memberByPage.lastName}
                        </td>
                        <td onClick={() => handleDetails(memberByPage.id)}>
                          {memberByPage.organizations.map((org) => (
                            <p>{org}</p>
                          ))}
                        </td>
                        <td onClick={() => handleDetails(memberByPage.id)}>
                          {memberByPage.phone}
                        </td>
                        <td onClick={() => handleDetails(memberByPage.id)}>
                          {memberByPage.location}
                        </td>
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
                    <td colSpan="5">No data</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <Pagination totalPosts={count} />
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
    currentPage: state.paginationReducer.currentPage,
    action: state.modalReducer.action,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchMembersByPage: () => dispatch(fetchMembersByPage()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(MembersPage);
