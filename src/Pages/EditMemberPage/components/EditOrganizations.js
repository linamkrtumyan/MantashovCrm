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
  allAddedOrganizations,
  setNewOrg,
  newOrg,
  addedOrganizations,
  existedOrganizations,
  // addedOrganizations,
  orgId0,
  orgId1,
  orgId2,
  orgId3,
  posId0,
  posId1,
  posId2,
  posId3,
}) {
  //   console.log(existedOrganizations, "existedOrganizations");
  const [orgs, setOrgs] = useState(0);
  console.log(orgs, "orgs");
  useEffect(() => {
    fetchPositions();
    fetchOrganizations();

    existedOrganizations?.map((org) => {
      formOnChangeArray("organizations", Object.keys(org), Object.values(org));
    });
  }, []);

  useEffect(() => {
    if (organizationId) {
      formOnChangeArray("addedOrganizations", "organizationId", organizationId);
      formOnChangeArray("addedOrganizations", "positionId", positionId);
    }
  }, [organizationId]);
  useEffect(() => {
    if (positionId) {
      formOnChangeArray("addedOrganizations", "positionId", positionId);
    }
  }, [positionId]);

  useEffect(() => {
    if (orgId0) {
      allAddedOrganizations[0].organizationId = orgId0;
    }
  }, [orgId0]);

  useEffect(() => {
    if (orgId1) {
      allAddedOrganizations[1].organizationId = orgId1;
    }
  }, [orgId1]);

  useEffect(() => {
    if (orgId2) {
      allAddedOrganizations[2].organizationId = orgId2;
    }
  }, [orgId2]);

  useEffect(() => {
    if (orgId3) {
      allAddedOrganizations[3].organizationId = orgId3;
    }
  }, [orgId3]);

  useEffect(() => {
    if (posId0) {
      allAddedOrganizations[0].positionId = posId0;
    }
  }, [posId0]);

  useEffect(() => {
    if (posId1) {
      allAddedOrganizations[1].positionId = posId1;
    }
  }, [posId1]);

  useEffect(() => {
    if (posId2) {
      allAddedOrganizations[2].positionId = posId2;
    }
  }, [posId2]);

  useEffect(() => {
    if (posId3) {
      allAddedOrganizations[3].positionId = posId3;
    }
  }, [posId3]);

  const handleAdd = () => {
    allAddedOrganizations.push(addedOrganizations);
    setOrgs(orgs + 1);
  };
  const handleDelete = (index) => {
    allAddedOrganizations.splice(index, 1);
    setOrgs(orgs + 1);
  };

  return (
    <>
      {allAddedOrganizations?.map((org, index) => {
        const orgValue = organizations.find(
          (organization) => organization.id === org.organizationId
        );
        const posValue = positions.find(
          (position) => position.id === org.positionId
        );
        return (
          <div style={{ display: "flex" }}>
            <div
            // className="added_orgs"
            >
              {" "}
              {orgValue ? (
                <Select
                  items={organizations}
                  id={`orgId${index}`}
                  placeholderText={orgValue.name}
                  placeholder="Organization"
                  // value={orgValue.name}
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
                  id={`posId${index}`}
                />
              ) : null}
            </div>
            <div
              onClick={() => handleDelete(index)}
              style={{ margin: "24px 10px 10px 10px" }}
            >
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
    // addedOrganizations: state.membersReducer.addedOrganizations,
    organizationId: state.formReducer.organizationId,
    positionId: state.formReducer.positionId,
    allAddedOrganizations: state.formReducer.organizations,
    addedOrganizations: state.formReducer.addedOrganizations,
    existedOrganizations: state.membersReducer.memberForEdit.organizations,
    orgId0: state.formReducer?.orgId0,
    orgId1: state.formReducer?.orgId1,
    orgId2: state.formReducer?.orgId2,
    orgId3: state.formReducer?.orgId3,
    posId0: state.formReducer?.posId0,
    posId1: state.formReducer?.posId1,
    posId2: state.formReducer?.posId2,
    posId3: state.formReducer?.posId3,
    // index: state.membersReducer.memberForEdit.organizations.length(),
    // orgId: state.formReducer?.orgIdindex,

    // {existedOrganizations?.map((org, index) => {
    //   orgId:state.formReducer?.orgId${index}
    // })}
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
