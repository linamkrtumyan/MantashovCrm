import React, { useEffect, useState } from "react";
import {
  fetchPositions,
  fetchOrganizations,
  formOnChangeArray,
  formOnChange,
} from "../../store";
// import Select from "../../../Components/Forms/Select/Select";
import { connect } from "react-redux";

import Input from "../../Components/Forms/Input/Input";
import Textarea from "../../Components/Forms/Textarea/Textarea";

function EditAgendas({
  fetchPositions,
  eventForEdit,
  agendas,
  date_and_time,
  description_ru,
  description_arm,
  description_eng,
  formOnChangeArray,
  newAgenda,
  formOnChange,
  descriptionEng0,
  descriptionArm0,
  descriptionRu0,
}) {
  const [orgs, setOrgs] = useState(0);

  useEffect(() => {
    if (description_eng) {
      formOnChangeArray("newAgenda", "dateAndTime", date_and_time);
      formOnChangeArray("newAgenda", "descriptionArm", description_arm);
      formOnChangeArray("newAgenda", "descriptionEng", description_eng);
      formOnChangeArray("newAgenda", "descriptionRu", description_ru);
    }
  }, [date_and_time, description_arm, description_ru, description_eng]);
  // useEffect(() => {
  //   if (positionId) {
  //     formOnChangeArray("addedOrganizations", "positionId", positionId);
  //   }
  // }, [positionId]);

  const handleAdd = () => {
    agendas.push(newAgenda);
    setOrgs(orgs + 1);
    // formOnChangeArray("newAgenda", "", null);
  };

  return (
    <>
      {/* <div style={{ display: "flex"}}> */}
      <div>
        {eventForEdit && eventForEdit.agenda
          ? eventForEdit.agenda.map((item, index) => (
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Input
                  id={`dateAndTime${index}`}
                  type="date"
                  // dataDateFormat="YYYY/MM/DDThh:mm:ss"
                  value={item.dateAndTime}
                  placeholder="Date And Time"
                  placeholderText={item.dateAndTime}
                />
                {/* <Textarea
                  // id={`descriptionEng${index}`}
                  id={`agenda${[index]}.descriptionEng`}
                  type="text"
                  // value={item.descriptionEng}
                  placeholder={`agenda${[index]}.descriptionEng`}
                  // placeholderText={item.descriptionEng}
                /> */}
                <div className="input_container">
                  <label htmlFor={`descriptionEng${index}`}>Description</label>

                  <textarea
                    id={`descriptionEng${index}`}
                    onChange={(e) =>
                      formOnChange(`descriptionEng${index}`, e.target.value)
                    }
                    // defaultValue={defaultValue}
                    className="textarea"
                    // placeholder={placeholderText}
                    // type={type}
                    value={
                      descriptionEng0 || descriptionEng0 === ""
                        ? descriptionEng0
                        : item.descriptionEng
                    }
                    // required
                  />
                </div>

                <div className="input_container">
                  <label htmlFor={`descriptionArm${index}`}>Նկարագիր</label>

                  <textarea
                    id={`descriptionArm${index}`}
                    onChange={(e) =>
                      formOnChange(`descriptionArm${index}`, e.target.value)
                    }
                    // defaultValue={defaultValue}
                    className="textarea"
                    // placeholder={placeholderText}
                    // type={type}
                    value={
                      descriptionArm0 || descriptionArm0 === ""
                        ? descriptionArm0
                        : item.descriptionArm
                    }
                    // required
                  />
                </div>

                <div className="input_container">
                  <label htmlFor={`descriptionRu${index}`}>Описание</label>

                  <textarea
                    id={`descriptionRu${index}`}
                    onChange={(e) =>
                      formOnChange(`descriptionRu${index}`, e.target.value)
                    }
                    // defaultValue={defaultValue}
                    className="textarea"
                    // placeholder={placeholderText}
                    // type={type}
                    value={
                      descriptionRu0 || descriptionRu0 === ""
                        ? descriptionRu0
                        : item.descriptionRu
                    }
                    // required
                  />
                </div>

                {/* <Textarea
                  id={`descriptionArm${index}`}
                  type="text"
                  value={item.descriptionArm}
                  placeholder="Նկարագիր"
                  // placeholderText={item.descriptionArm}
                /> */}
                {/* <Textarea
                  id={`descriptionRu${index}`}
                  type="text"
                  value={item.descriptionRu}
                  placeholder="Описание"
                  // placeholderText={item.descriptionRu}
                /> */}
                <div
                  // onClick={() => handleDelete(index)}
                  style={{ margin: "24px 10px 10px 10px" }}
                >
                  <div className="add_new_org">
                    <i
                      style={{ marginRight: "10px" }}
                      className="fas fa-times"
                    ></i>
                  </div>
                </div>
              </div>
            ))
          : null}
        {/* id={`dateAndTime${index}`} */}

        <div style={{ display: "flex" }}>
          <Input
            id="date_and_time"
            type="datetime-local"
            // dataDateFormat="YYYY/MM/DDThh:mm:ss"
            // value={item.dateAndTime}
            placeholder="Date And Time"
            // placeholderText={item.dateAndTime}
          />
          <Textarea placeholder="Description" id="description_eng" />

          <Textarea placeholder="Նկարագիր" id="description_arm" />
          <Textarea placeholder="Описание" id="description_ru" />

          <div onClick={handleAdd} style={{ margin: "24px 10px 10px 10px" }}>
            <div className="add_new_org">
              <i style={{ marginRight: "10px" }} className="fas fa-check"></i>
            </div>
          </div>
        </div>
      </div>
      {/* </div> */}
    </>
  );
}

const mapStateToProps = (state) => {
  // console.log(state, "state");
  return {
    eventForEdit: state.eventReducer.eventForEdit,
    descriptionEng0: state.formReducer.descriptionEng0,
    agendas: state.formReducer.agenda,
    date_and_time: state.formReducer.date_and_time,
    description_eng: state.formReducer.description_eng,
    description_arm: state.formReducer.description_arm,
    description_ru: state.formReducer.description_ru,
    newAgenda: state.formReducer.newAgenda,
    descriptionEng0: state.formReducer.descriptionEng0,
    descriptionArm0: state.formReducer.descriptionArm0,
    descriptionRu0: state.formReducer.descriptionRu0,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    formOnChangeArray: (firstKey, secondKey, value) =>
      dispatch(formOnChangeArray(firstKey, secondKey, value)),
    formOnChange: (key, value) => dispatch(formOnChange(key, value)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(EditAgendas);
