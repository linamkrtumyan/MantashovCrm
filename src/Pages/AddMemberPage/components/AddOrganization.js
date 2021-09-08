import React, { useEffect, useState } from "react";
import {
  fetchPositions,
  fetchOrganizations,
  formOnChangeArray,
} from "../../../store";
import Select from "../../../Components/Forms/Select/Select";
import { connect } from "react-redux";

function AddOrganization({
  fetchPositions,
  fetchOrganizations,
  organizations,
  positions,
  organizationsType,
  positionId,
  organizationId,
  formOnChangeArray,
  oneOrganization,
  setNewOrg,
  newOrg,
  addedOrganizations,
}) {
  const [orgs, setOrgs] = useState([]);
  useEffect(() => {
    fetchPositions();
    fetchOrganizations();
  }, []);

  useEffect(() => {
    formOnChangeArray("organizations", "organizationId", organizationId);
  }, [organizationId]);

  useEffect(() => {
    formOnChangeArray("organizations", "positionId", positionId);
    // organizationsArray.map((org) => <p>{org.organizationId}</p>);
  }, [positionId]);

  const handleAdd = () => {
    // oneOrganization
    addedOrganizations.push(oneOrganization);
    setNewOrg(newOrg++);
    setOrgs(oneOrganization?.organizationId);
    console.log(newOrg, "newOrg");
  };

  return (
    <>
      {addedOrganizations.map((org) => {
        const orgValue = organizations.find(
          (organization) => organization.id === org.organizationId
        );
        const posValue = positions.find(
          (position) => position.id === org.positionId
        );

        return (
          <div style={{ display: "flex" }}>
            <div className="added_orgs">
              <p>{orgValue.name}</p>
            </div>
            <div className="added_orgs">
              <p>{posValue.name}</p>
            </div>
          </div>
        );
      })}

      <div style={{ display: "flex" }}>
        <Select
          placeholder="Select Organization"
          items={organizations}
          id="organizationId"
          // value={organizationId}
        />

        <Select
          placeholder="Select Position"
          items={positions}
          id="positionId"
        />
        <div onClick={handleAdd} style={{ margin: "24px 10px 10px 10px" }}>
          <div className="add_new_org">
            <i style={{ marginRight: "10px" }} className="fas fa-check"></i>
            {/* <p>Add another organization</p> */}
          </div>
        </div>
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  console.log(state, "state");
  return {
    organizations: state.organizationsReducer.organizations,
    positions: state.organizationsReducer.positions,
    addedOrganizations: state.membersReducer.addedOrganizations,
    organizationId: state.formReducer.organizationId,
    positionId: state.formReducer.positionId,
    oneOrganization: state.formReducer.organizations,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchOrganizations: () => dispatch(fetchOrganizations()),
    fetchPositions: () => dispatch(fetchPositions()),

    formOnChangeArray: (firstKey, secondKey, value) =>
      dispatch(formOnChangeArray(firstKey, secondKey, value)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AddOrganization);
