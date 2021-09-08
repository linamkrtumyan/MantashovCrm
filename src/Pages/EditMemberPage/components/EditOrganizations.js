import React, { useEffect, useState } from "react";
import {
  fetchPositions,
  fetchOrganizations,
  formOnChangeArray,
} from "../../../store";
import Select from "../../../Components/Forms/Select/Select";
import { connect } from "react-redux";

function EditOrganizations({
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
  existedOrganizations,
}) {
  //   console.log(existedOrganizations, "existedOrganizations");
  const [orgs, setOrgs] = useState([]);
  useEffect(() => {
    fetchPositions();
    fetchOrganizations();

    // existedOrganizations.map((org) => {
    //   formOnChangeArray("organizations", Object.keys(org), Object.values(org));
    // });
  }, []);

  //   useEffect(() => {
  //     formOnChangeArray("organizations", "organizationId", organizationId);
  //   }, [organizationId]);

  //   useEffect(() => {
  //     formOnChangeArray("organizations", "positionId", positionId);
  //   }, [positionId]);

  const handleAdd = () => {
    // addedOrganizations.push(oneOrganization);
    // setNewOrg(newOrg++);
    // setOrgs(oneOrganization?.organizationId);
    // console.log(newOrg, "newOrg");
  };

  return (
    <>
      {existedOrganizations?.map((org) => {
        const orgValue = organizations.find(
          (organization) => organization.id === org.organizationId
        );
        const posValue = positions.find(
          (position) => position.id === org.positionId
        );

        // console.log(orgValue, "orgValue");
        // console.log(posValue, "posValue");

        return (
          <div style={{ display: "flex" }}>
            <div
            // className="added_orgs"
            >
              {" "}
              {orgValue ? (
                <Select
                  items={organizations}
                  id="organizationId"
                  placeholderText={orgValue.name}
                  placeholder="Organization"
                />
              ) : null}
            </div>
            <div
            // className="added_orgs"
            >
              {posValue ? (
                //    <p>{posValue.name}</p>
                <Select
                  placeholderText={posValue.name}
                  placeholder="Position"
                  items={positions}
                  id="positionId"
                />
              ) : null}
            </div>
            <div onClick={handleAdd} style={{ margin: "24px 10px 10px 10px" }}>
              <div className="add_new_org">
                <i style={{ marginRight: "10px" }} className="fas fa-times"></i>
              </div>
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
    existedOrganizations: state.membersReducer.memberForEdit.organizations,
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
export default connect(mapStateToProps, mapDispatchToProps)(EditOrganizations);
