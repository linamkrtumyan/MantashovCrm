import React, { useState, useEffect } from "react";
import Button from "../../../../Components/Forms/Button/Button";
import { connect } from "react-redux";
import store, {
  formOnChange,
  cleanForm,
  fetchPositionsAll,
  editPosition,
} from "../../../../store";
import Loading from "../../../../Components/Loading/Loading";
import AddPosition from "./AddPosition";
import DeletePositions from "./DeletePositions";

function Spheres({
  fetchPositionsAll,
  positions,
  formOnChange,
  editPosition,
  cleanForm,
  loading,
  fetch,
}) {
  const [add, setAdd] = useState(false);
  const [editingId, setEditingId] = useState(-1);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  useEffect(() => {
    fetchPositionsAll();
  }, []);

  useEffect(() => {
    if (fetch) {
      fetchPositionsAll();
    }
  }, [fetch]);

  function handleClick() {
    setAdd(true);
  }
  function handleEdit(value) {
    setEditingId(value);
  }
  function handleDelete(id) {
    setModalOpen(true);
    setDeleteId(id);
  }

  const handleOnChange = (e) => {
    formOnChange(e.target.id, e.target.value);
  };
  const handleCancel = (e) => {
    cleanForm();
    setEditingId(-1);
  };
  const handleSave = (id, eng, arm, ru) => {
    let { nameArm, nameEng, nameRu } = store.getState().formReducer;

    let position = {
      id,
      nameArm: nameArm ? nameArm : arm,
      nameEng: nameEng ? nameEng : eng,
      nameRu: nameRu ? nameRu : ru,
    };

    const changePath = () => {};
    editPosition(position, changePath);

    cleanForm();
    fetchPositionsAll();
    setEditingId(-1);
  };

  // if (loading) {
  //   return <Loading />;
  // }

  return (
    <div>
      <DeletePositions
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        id={deleteId}
      />
      <div>
        <div className="members_container">
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              padding: "10px 50px",
            }}
          >
            <div onClick={handleClick}>
              <Button title="Add Position" />
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
                  <th>Անվանում</th>
                  <th>Название</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>

              <tbody>
                {add ? <AddPosition setAdd={setAdd} /> : null}
                {positions?.map((position, index) => {
                  if (editingId === position.id) {
                    return (
                      <tr style={{ cursor: "default" }} key={position.id}>
                        <td>
                          <input
                            id="nameEng"
                            className="input input_width"
                            defaultValue={position.nameEng}
                            onChange={handleOnChange}
                          />
                        </td>
                        <td>
                          <input
                            id="nameArm"
                            className="input input_width"
                            defaultValue={position.nameArm}
                            onChange={handleOnChange}
                          />
                        </td>
                        <td>
                          <input
                            id="nameRu"
                            className="input input_width"
                            defaultValue={position.nameRu}
                            onChange={handleOnChange}
                          />
                        </td>

                        <td
                          style={{ cursor: "pointer" }}
                          onClick={() =>
                            handleSave(
                              position.id,
                              position.nameEng,
                              position.nameArm,
                              position.nameRu
                            )
                          }
                        >
                          Save
                        </td>
                        <td
                          style={{ cursor: "pointer" }}
                          onClick={(e) => {
                            handleCancel();
                          }}
                        >
                          Cancel
                        </td>
                      </tr>
                    );
                  } else {
                    return (
                      <tr style={{ cursor: "default" }} key={position.id}>
                        <td>{position.nameEng}</td>
                        <td>{position.nameArm}</td>
                        <td>{position.nameRu}</td>
                        <td style={{ width: "10px" }}>
                          <div
                            style={{ cursor: "pointer" }}
                            onClick={(e) => {
                              handleEdit(position.id);
                            }}
                          >
                            <i className="fas fa-edit"></i>
                          </div>
                        </td>

                        <td style={{ width: "10px" }}>
                          <div
                            style={{ cursor: "pointer" }}
                            onClick={(e) => {
                              handleDelete(position.id);
                            }}
                          >
                            <i className="far fa-trash-alt"></i>
                          </div>
                        </td>
                      </tr>
                    );
                  }
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
    positions: state.organizationsReducer.positionsAll,
    loading: state.organizationsReducer.loading,
    fetch: state.organizationsReducer.fetch,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPositionsAll: () => dispatch(fetchPositionsAll()),
    formOnChange: (key, value) => dispatch(formOnChange(key, value)),
    editPosition: (position, changePath) =>
      dispatch(editPosition(position, changePath)),
    cleanForm: () => dispatch(cleanForm()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Spheres);
