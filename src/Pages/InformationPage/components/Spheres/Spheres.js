import React, { useState, useEffect } from "react";
import Button from "../../../../Components/Forms/Button/Button";
import AddSphere from "./AddSphere";
import { connect } from "react-redux";
import store, {
  fetchCategoriesAll,
  formOnChange,
  editCategory,
  cleanForm,
} from "../../../../store";
import DeleteSphere from "./DeleteSphere";

function Spheres({
  fetchCategoriesAll,
  spheres,
  formOnChange,
  editCategory,
  cleanForm,
}) {
  const [add, setAdd] = useState(false);
  const [added, setAdded] = useState(0); //for upate table

  const [editingId, setEditingId] = useState(-1);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    fetchCategoriesAll();
  }, []);
  useEffect(() => {
    if (added > 0) {
      fetchCategoriesAll();
    }
  }, [added]);

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

    let category = {
      id,
      nameArm: nameArm ? nameArm : arm,
      nameEng: nameEng ? nameEng : eng,
      nameRu: nameRu ? nameRu : ru,
    };

    const changePath = () => {};
    console.log(category, "uxarkvox category");
    editCategory(category, changePath);

    cleanForm();
    fetchCategoriesAll();
    setEditingId(-1);
  };

  return (
    <div>
      <DeleteSphere
        added={added}
        setAdded={setAdded}
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
              padding: "10px 30px",
            }}
            onClick={handleClick}
          >
            <Button title="Add Sphere" />
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
                  <th>Անվանում</th>
                  <th>Название</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>

              <tbody>
                {add ? (
                  <AddSphere
                    added={added}
                    setAdded={setAdded}
                    setAdd={setAdd}
                  />
                ) : null}
                {spheres.map((sphere, index) => {
                  if (editingId === sphere.id) {
                    return (
                      <tr style={{ cursor: "default" }} key={sphere.id}>
                        <td>
                          <input
                            id="nameEng"
                            className="input input_width"
                            defaultValue={sphere.nameEng}
                            onChange={handleOnChange}
                          />
                        </td>
                        <td>
                          <input
                            id="nameArm"
                            className="input input_width"
                            defaultValue={sphere.nameArm}
                            onChange={handleOnChange}
                          />
                        </td>
                        <td>
                          <input
                            id="nameRu"
                            className="input input_width"
                            defaultValue={sphere.nameRu}
                            onChange={handleOnChange}
                          />
                        </td>

                        <td
                          style={{ cursor: "pointer" }}
                          onClick={() =>
                            handleSave(
                              sphere.id,
                              sphere.nameEng,
                              sphere.nameArm,
                              sphere.nameRu
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
                      <tr style={{ cursor: "default" }} key={sphere.id}>
                        <td>{sphere.nameEng}</td>
                        <td>{sphere.nameArm}</td>
                        <td>{sphere.nameRu}</td>
                        <td style={{ width: "10px" }}>
                          <div
                            style={{ cursor: "pointer" }}
                            onClick={(e) => {
                              handleEdit(sphere.id);
                            }}
                          >
                            <i className="fas fa-edit"></i>
                          </div>
                        </td>

                        <td style={{ width: "10px" }}>
                          <div
                            style={{ cursor: "pointer" }}
                            onClick={(e) => {
                              handleDelete(sphere.id);
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
  console.log(state, "state");
  return {
    spheres: state.organizationsReducer.categoriesAll,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCategoriesAll: () => dispatch(fetchCategoriesAll()),
    formOnChange: (key, value) => dispatch(formOnChange(key, value)),
    editCategory: (category, changePath) =>
      dispatch(editCategory(category, changePath)),
    cleanForm: () => dispatch(cleanForm()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Spheres);
