import React, { useState, useEffect } from "react";
import "./membersPage.css";
import MemberCard from "../../Components/Members/MemberCard/MemberCard";
import AddMemberCard from "../../Components/Members/AddMemberCard/AddMemberCard";
import Pagination from "../../Components/Pagination/Pagination";
import { connect } from "react-redux";
import Loading from "../../Components/Loading/Loading";
import { fetchMembersByPage } from "../../store";

function MembersPage({
  fetchMembersByPage,
  membersByPage,
  loading,
  noMembers,
  count,
  currentPage,
  action,
}) {
  useEffect(() => {
    fetchMembersByPage();
  }, [currentPage, action]);
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
        <div className="all_members_container">
          <AddMemberCard />
          {membersByPage.map((memberByPage) => (
            <MemberCard key={memberByPage.id} memberByPage={memberByPage} />
          ))}
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
