import React from "react";
import "./membersPage.css";
import MemberCard from "../../Components/Members/MemberCard/MemberCard";
import AddMemberCard from "../../Components/Members/AddMemberCard/AddMemberCard";

function MembersPage() {
  return (
    <div>
      <div className="members_container">
        <div className="members_title">All Members</div>
        <div className="all_members_container">
          <AddMemberCard />
          <MemberCard />
          <MemberCard />
          <MemberCard />
          <MemberCard />
          <MemberCard />
          <MemberCard />
          <MemberCard />
          <MemberCard />
        </div>
      </div>
    </div>
  );
}

export default MembersPage;
