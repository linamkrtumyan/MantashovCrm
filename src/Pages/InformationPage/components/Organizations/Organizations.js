import React, { useState, useEffect } from "react";
import Button from "../../../../Components/Forms/Button/Button";
import { connect } from "react-redux";
import {
  formOnChange,
  cleanForm,
  fetchOrganizationsTable,
  editPosition,
} from "../../../../store";
import Loading from "../../../../Components/Loading/Loading";
import AddOrganization from "./AddOrganization";
import DeleteOrganization from "./DeleteOrganization";
import EditOrganization from "./EditOrganization";

function Organizations({ fetchOrganizationsTable, organizationsTable, fetch }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchOrganizationsTable();
  }, []);

  useEffect(() => {
    if (fetch) {
      fetchOrganizationsTable();
    }
  }, [fetch]);

  function handleDelete(id) {
    setModalOpen(true);
    setDeleteId(id);
  }
  function handleEdit(id) {
    setEditId(id);
    setEditModalOpen(true);
  }
  function handleAdd() {
    setAddModalOpen(true);
  }

  // if (loading) {
  //   return <Loading />;
  // }

  return (
    <div>
      <EditOrganization
        modalOpen={editModalOpen}
        setModalOpen={setEditModalOpen}
        id={editId}
        setEditId={setEditId}
      />
      <DeleteOrganization
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        id={deleteId}
      />
      <AddOrganization
        modalOpen={addModalOpen}
        setModalOpen={setAddModalOpen}
      />
      <div>
        <div className="members_container">
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              padding: "10px 50px",
            }}
            // onClick={handleClick}
          >
            <div
              onClick={(e) => {
                handleAdd();
              }}
            >
              <Button title="Add Organization" />
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              padding: "0 50px 50px 50px ",
            }}
          >
            <table className="table is-striped  is-fullwidth is-hoverable">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Categories</th>
                  <th>Address</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>

              <tbody>
                {organizationsTable.map((organization, index) => {
                  let categories = "";
                  categories = organization.categories.reduce((prev,categories) => categories += ", " + prev);
                  if(categories.length > 30){
                    categories = categories.slice(0,30) + "...";
                  }
                  return (
                    <tr style={{ cursor: "default" }} key={organization.id}>
                      <td>{organization.nameEng}</td>
                      <td>{categories}</td>
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
  return {
    organizationsTable: state.organizationsReducer.organizationsTable,
    loading: state.organizationsReducer.loading,
    fetch: state.organizationsReducer.fetch,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchOrganizationsTable: () => dispatch(fetchOrganizationsTable()),
    formOnChange: (key, value) => dispatch(formOnChange(key, value)),
    editPosition: (position, changePath) =>
      dispatch(editPosition(position, changePath)),
    cleanForm: () => dispatch(cleanForm()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Organizations);
