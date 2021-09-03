import React, { useState, useEffect } from "react";
import Button from "../../../../Components/Forms/Button/Button";
import { connect } from "react-redux";
import store, {
  formOnChange,
  cleanForm,
  fetchOrganizationsTable,
  editPosition,
  cleanOrganization,
} from "../../../../store";
import Loading from "../../../../Components/Loading/Loading";
import AddOrganization from "./AddOrganization";
import DeleteOrganization from "./DeleteOrganization";
import EditOrganization from "./EditOrganization";
import { useHistory } from "react-router-dom";

function Organizations({
  fetchOrganizationsTable,
  organizationsTable,
  cleanOrganization,
}) {
  const [added, setAdded] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchOrganizationsTable();
  }, []);

  useEffect(() => {
    if (added > 0) {
      fetchOrganizationsTable();
    }
  }, [added]);

  function handleDelete(id) {
    setModalOpen(true);
    setDeleteId(id);
  }
  function handleEdit(id) {
    console.log(id, "ekac id****");
    setEditId(id);
    setEditModalOpen(true);
    // history.push(`/information/${id}`);
  }
  function handleAdd() {
    setAddModalOpen(true);
    // setDeleteId(id);
  }

  // if (loading) {
  //   return <Loading />;
  // }

  return (
    <div>
      <EditOrganization
        added={added}
        setAdded={setAdded}
        modalOpen={editModalOpen}
        setModalOpen={setEditModalOpen}
        id={editId}
        setEditId={setEditId}
      />
      <DeleteOrganization
        added={added}
        setAdded={setAdded}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        id={deleteId}
      />
      <AddOrganization
        added={added}
        setAdded={setAdded}
        modalOpen={addModalOpen}
        setModalOpen={setAddModalOpen}
      />
      <div>
        <div className="members_container">
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              padding: "10px 30px",
            }}
            // onClick={handleClick}
            onClick={(e) => {
              handleAdd();
            }}
          >
            <Button title="Add Organization" />
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              padding: "0 50px",
            }}
          >
            <table className="table is-striped  is-fullwidth is-hoverable">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Address</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>

              <tbody>
                {organizationsTable.map((organization, index) => {
                  return (
                    <tr style={{ cursor: "default" }} key={organization.id}>
                      <td>{organization.nameEng}</td>
                      <td>{organization.categoryNameEng}</td>
                      <td>{organization.address}</td>
                      <td style={{ width: "10px" }}>
                        <div
                          style={{ cursor: "pointer" }}
                          onClick={(e) => {
                            handleEdit(organization.id);
                          }}
                        >
                          <i className="fas fa-edit"></i>
                        </div>
                      </td>

                      <td style={{ width: "10px" }}>
                        <div
                          style={{ cursor: "pointer" }}
                          onClick={(e) => {
                            handleDelete(organization.id);
                          }}
                        >
                          <i className="far fa-trash-alt"></i>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  console.log(state, "state");
  return {
    organizationsTable: state.organizationsReducer.organizationsTable,
    loading: state.organizationsReducer.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchOrganizationsTable: () => dispatch(fetchOrganizationsTable()),
    formOnChange: (key, value) => dispatch(formOnChange(key, value)),
    editPosition: (position, changePath) =>
      dispatch(editPosition(position, changePath)),
    cleanForm: () => dispatch(cleanForm()),
    cleanOrganization: () => dispatch(cleanOrganization()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Organizations);
