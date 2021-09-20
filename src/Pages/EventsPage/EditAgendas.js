import React, { useEffect, useState } from "react";
import {
  fetchPositions,
  fetchOrganizations,
  formOnChangeArray,
} from "../../store";
// import Select from "../../../Components/Forms/Select/Select";
import { connect } from "react-redux";


import Input from "../../Components/Forms/Input/Input";

function EditAgendas({ fetchPositions, eventForEdit }) {
  //   console.log(existedOrganizations, "existedOrganizations");

  const addressType = [
    {
      id: 1,
      name: "agendas",
    },
  ];

  return (
    <>
      {/* <div style={{ display: "flex"}}> */}
      <div>
        {eventForEdit && eventForEdit.agenda
          ? eventForEdit.agenda.map((item, index) => (
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Input
                  id={`dateAndTime${index}`}
                  type="datetime-local"
                  value={item.dateAndTime}
                  placeholder="Date And Time"
                  placeholderText={item.dateAndTime}
                />
                <Input
                  id={`descriptionEng${index}`}
                  type="text"
                  value={item.descriptionEng}
                  placeholder="Description"
                  placeholderText={item.descriptionEng}
                />
                <Input
                  id={`descriptionArm${index}`}
                  type="text"
                  value={item.descriptionArm}
                  placeholder="Նկարագիր"
                  placeholderText={item.descriptionArm}
                />
                <Input
                  id={`descriptionRu${index}`}
                  type="text"
                  value={item.descriptionRu}
                  placeholder="Описание"
                  placeholderText={item.descriptionRu}
                />
              </div>
            ))
          : null}
        {/* id={`dateAndTime${index}`} */}
      </div>
      {/* </div> */}
    </>
  );
}

const mapStateToProps = (state) => {
  // console.log(state, "state");
  return {
    eventForEdit: state.eventReducer.eventForEdit,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    formOnChangeArray: (firstKey, secondKey, value) =>
      dispatch(formOnChangeArray(firstKey, secondKey, value)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(EditAgendas);
