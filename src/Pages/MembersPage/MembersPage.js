import React, { useState, useEffect } from "react";
import "./membersPage.css";
import MemberCard from "../../Components/Members/MemberCard/MemberCard";
import AddMemberCard from "../../Components/Members/AddMemberCard/AddMemberCard";
import Pagination from "../../Components/Pagination/Pagination";
import { connect } from "react-redux";
import Loading from "../../Components/Loading/Loading";
import { fetchMembersByPage } from "../../store";
import { useHistory } from "react-router-dom";

function MembersPage({
  fetchMembersByPage,
  membersByPage,
  loading,
  noMembers,
  count,
  currentPage,
  action,
}) {
  let history = useHistory();

  useEffect(() => {
    fetchMembersByPage();
  }, [currentPage, action]);

  function handleDetails(id) {
    history.push(`/member-details/${id}`);
  }

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
    <div>
      <div className="members_container">
        <div className="members_title">All Members</div>

        <AddMemberCard />

        <div
          style={{ display: "flex", justifyContent: "center" }}
          // className="all_members_container"
        >
          {/* // <MemberCard key={memberByPage.id} memberByPage={memberByPage} /> */}
          <table class="table is-striped is-fullwidth is-hoverable">
            <thead>
              <tr>
                <th>Photo</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Birthdate</th>
                <th>Organization</th>
                <th>Loaction</th>
              </tr>
            </thead>

            <tbody>
              {membersByPage.length > 0 ? (
                membersByPage.map((memberByPage, index) => {
                  return (
                    <>
                      <tr
                        onClick={() => handleDetails(memberByPage.id)}
                        key={index}
                      >
                        <td>
                          {" "}
                          <img
                            alt=""
                            className="membercard_img"
                            src={`/images/profile/${memberByPage.id}/profile_picture.png`}
                            // src={require("../../../img/artashes_only.jpg").default}
                          />
                        </td>
                        <td>{memberByPage.firstName}</td>
                        <td>{memberByPage.lastName}</td>
                        <td>{memberByPage.birthDate}</td>
                        <td>{memberByPage.organizations}</td>
                        <td>{memberByPage.location}</td>
                      </tr>
                    </>
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
  );
}

const mapStateToProps = (state) => {
  console.log(state);
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
