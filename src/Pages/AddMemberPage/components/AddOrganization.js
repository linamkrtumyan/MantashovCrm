import React, { useEffect } from "react";
import store, {
  fetchPositions,
  fetchOrganizations,
  formOnChange,
} from "../../../store";
import Select from "../../../Components/Forms/Select/Select";
import { connect } from "react-redux";
import { toast } from "react-toastify";

function AddOrganization({
  fetchPositions,
  fetchOrganizations,
  organizations,
  positions,
  formOnChange,
  addedOrganizations = [],
}) {
  useEffect(() => {
    fetchPositions();
    fetchOrganizations();
    formOnChange("addedOrganizations", []);
  }, []);

  const handleAdd = () => {
    // oneOrganization
    const organizationId = store.getState().formReducer.organizationId;
    const positionId = store.getState().formReducer.positionId;
    if (!organizationId) {
      return toast.error("Please select some organization");
    }
    if (!positionId) {
      return toast.error("Please select some position");
    }
    const newOrganization = {
      organizationId,
      positionId,
    };
    if (
      !addedOrganizations.some(
        (org) =>
          organizationId === org.organizationId && positionId === org.positionId
      )
    ) {
      addedOrganizations.push(newOrganization);
      formOnChange("addedOrganizations", [...addedOrganizations]);
      formOnChange("positionId", null);
      formOnChange("organizationId", null);
    }
  };

  const handleDelete = (org) => {
    formOnChange(
      "addedOrganizations",
      addedOrganizations.filter(
        (o) =>
          o.organizationId !== org.organizationId ||
          o.positionId !== org.positionId
      )
    );
  };

  return (
    <>
      {addedOrganizations.map((org, index) => {
        const orgValue = organizations.find(
          (organization) => organization.id === org.organizationId
        );
        const posValue = positions.find(
          (position) => position.id === org.positionId
        );
        return (
          <div
            key={`${org.positionId}${org.organizationId}`}
            style={{ display: "flex" }}
          >
            <div className="added_orgs">
              <p>{orgValue.name}</p>
            </div>
            <div className="added_orgs">
              <p>{posValue.name}</p>
            </div>

            {/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */}
            {/* դնել սովորական սելեքթ՝ իր ֆունկցիոնալլով */}

            {/* <Select
              placeholder="Select Organization"
              items={organizations}
              id="organizationId"
              value={orgValue.name}
            />

            <Select
              placeholder="Select Position"
              items={positions}
              id="positionId"
              defaultValue={posValue.name}
            /> */}

            {/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */}

            <div onClick={() => handleDelete(org)}>
              <div className="added_orgs">
                <i
                  style={{ marginRight: "10px", cursor: "pointer" }}
                  className="fas fa-times"
                ></i>
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
            {/* <p>Add another organization</p> */}
          </div>
        </div>
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  // console.log(state, "state");
  return {
    organizations: state.organizationsReducer.organizations,
    positions: state.organizationsReducer.positions,
    addedOrganizations: state.formReducer.addedOrganizations,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchOrganizations: () => dispatch(fetchOrganizations()),
    fetchPositions: () => dispatch(fetchPositions()),
    formOnChange: (key, value) => dispatch(formOnChange(key, value)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AddOrganization);
