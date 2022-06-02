import React, { useEffect } from "react";
import Input from "../../../../Components/Forms/Input/Input";
import { connect } from "react-redux";
import store, { addPosition, cleanForm } from "../../../../store";

function AddPosition({ setAdd, addPosition, cleanForm }) {
  useEffect(()=>{
    cleanForm();
  },[]);
  const handleCreate = () => {
    let { nameArm, nameEng, nameRu } = store.getState().formReducer;

    let position = {
      nameArm,
      nameEng,
      nameRu,
    };

    const changePath = () => {
      //   history.push("/information");
    };
    addPosition(position, changePath);
    setAdd(false);
    cleanForm();
  };

  return (
    <>
      <tr>
        <td>
          <Input id="nameEng" type="text"   required={false}/>
        </td>
        <td>
          <Input id="nameArm" type="text"   required={false}/>
        </td>
        <td>
          <Input id="nameRu" type="text"   required={false}/>
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
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    addPosition: (category, changePath) =>
      dispatch(addPosition(category, changePath)),
    cleanForm: () => dispatch(cleanForm()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AddPosition);
