import React, { useEffect } from "react";
import Input from "../../../../Components/Forms/Input/Input";
import { connect } from "react-redux";
import store, { addCategory, cleanForm } from "../../../../store";

function AddSphere({
  setAdd,
  addCategory,

  cleanForm,
}) {
  useEffect(()=>{
    cleanForm();
  },[]);
  const handleCreate = () => {
    let { nameArm, nameEng, nameRu } = store.getState().formReducer;

    let category = {
      nameArm,
      nameEng,
      nameRu,
    };

    const changePath = () => {
      //   history.push("/information");
    };
    console.log(category, "uxarkvox category");
    addCategory(category, changePath);
    setAdd(false);
    cleanForm();
  };

  return (
    <>
      <tr>
        <td>
          <Input id="nameEng" type="text" />
        </td>
        <td>
          <Input id="nameArm" type="text" />
        </td>
        <td>
          <Input id="nameRu" type="text" />
        </td>
        <td>
          <div style={{ cursor: "pointer" }} onClick={handleCreate}>
            <i className="fas fa-plus is-large"></i>
          </div>
        </td>
        <td>
          <div style={{ cursor: "pointer" }} onClick={() => setAdd(false)}>
            <i className="fas fa-times is-large"></i>
          </div>
        </td>
      </tr>
    </>
  );
}

const mapStateToProps = (state) => {
  console.log(state, "state");
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    addCategory: (category, changePath) =>
      dispatch(addCategory(category, changePath)),
    cleanForm: () => dispatch(cleanForm()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AddSphere);
