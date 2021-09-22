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

  // newAgenda,
  addedAgendas,
  existedAgendas,

  dateAndTime0,
  descriptionEng0,
  descriptionArm0,
  descriptionRu0,

  dateAndTime1,
  descriptionEng1,
  descriptionArm1,
  descriptionRu1,

  dateAndTime2,
  descriptionEng2,
  descriptionArm2,
  descriptionRu2,

  dateAndTime3,
  descriptionEng3,
  descriptionArm3,
  descriptionRu3,

  dateAndTime4,
  descriptionEng4,
  descriptionArm4,
  descriptionRu4,

  dateAndTime5,
  descriptionEng5,
  descriptionArm5,
  descriptionRu5,
}) {
  const [orgs, setOrgs] = useState(0);

  // useEffect(() => {
  //   existedAgendas?.map((ag) => {
  //     formOnChangeArray("agendas", Object.keys(ag), Object.values(ag));
  //   });
  // }, []);

  // useEffect(() => {
  //   if (date_and_time) {
  //     formOnChangeArray("addedAgendas", "date_and_time", date_and_time);
  //   }
  //   if (description_eng) {
  //     formOnChangeArray("addedAgendas", "description_eng", description_eng);
  //   }
  //   if (description_arm) {
  //     formOnChangeArray("addedAgendas", "description_arm", description_arm);
  //   }
  //   if (description_ru) {
  //     formOnChangeArray("addedAgendas", "description_ru", description_ru);
  //   }
  // }, [date_and_time, description_eng, description_arm, description_ru]);

  useEffect(() => {
    if (description_eng) {
      formOnChangeArray("newAgenda", "dateAndTime", date_and_time);
      formOnChangeArray("newAgenda", "descriptionArm", description_arm);
      formOnChangeArray("newAgenda", "descriptionEng", description_eng);
      formOnChangeArray("newAgenda", "descriptionRu", description_ru);
    }
  }, [date_and_time, description_arm, description_ru, description_eng]);

  useEffect(() => {
    if (dateAndTime0) {
      newAgenda[0].date_and_time = dateAndTime0;
    }
  }, [dateAndTime0]);

  useEffect(() => {
    if (dateAndTime1) {
      newAgenda[1].date_and_time = dateAndTime1;
    }
  }, [dateAndTime1]);

  useEffect(() => {
    if (dateAndTime2) {
      newAgenda[2].date_and_time = dateAndTime2;
    }
  }, [dateAndTime2]);

  useEffect(() => {
    if (dateAndTime3) {
      newAgenda[3].date_and_time = dateAndTime3;
    }
  }, [dateAndTime3]);

  useEffect(() => {
    if (dateAndTime4) {
      newAgenda[4].date_and_time = dateAndTime4;
    }
  }, [dateAndTime4]);

  useEffect(() => {
    if (dateAndTime5) {
      newAgenda[5].date_and_time = dateAndTime5;
    }
  }, [dateAndTime5]);

  // ________________________

  useEffect(() => {
    if (descriptionEng0) {
      newAgenda[0].description_eng = descriptionEng0;
    }
  }, [descriptionEng0]);

  useEffect(() => {
    if (descriptionEng1) {
      newAgenda[1].description_eng = descriptionEng1;
    }
  }, [descriptionEng1]);

  useEffect(() => {
    if (descriptionEng2) {
      newAgenda[2].description_eng = descriptionEng2;
    }
  }, [descriptionEng2]);

  useEffect(() => {
    if (descriptionEng3) {
      newAgenda[3].description_eng = descriptionEng3;
    }
  }, [descriptionEng3]);

  useEffect(() => {
    if (descriptionEng4) {
      newAgenda[4].description_eng = descriptionEng4;
    }
  }, [descriptionEng4]);

  useEffect(() => {
    if (descriptionEng5) {
      newAgenda[5].description_eng = descriptionEng5;
    }
  }, [descriptionEng5]);

  // _______________________________________

  useEffect(() => {
    if (descriptionRu0) {
      newAgenda[0].description_ru = descriptionRu0;
    }
  }, [descriptionRu0]);

  useEffect(() => {
    if (descriptionRu1) {
      newAgenda[1].description_ru = descriptionRu1;
    }
  }, [descriptionRu1]);

  useEffect(() => {
    if (descriptionRu2) {
      newAgenda[2].description_ru = descriptionRu2;
    }
  }, [descriptionRu2]);

  useEffect(() => {
    if (descriptionRu3) {
      newAgenda[3].description_ru = descriptionRu3;
    }
  }, [descriptionRu3]);

  useEffect(() => {
    if (descriptionRu4) {
      newAgenda[4].description_ru = descriptionRu4;
    }
  }, [descriptionRu4]);

  useEffect(() => {
    if (descriptionRu5) {
      newAgenda[5].description_ru = descriptionRu5;
    }
  }, [descriptionRu5]);

  const handleAdd = () => {
    agendas.push(newAgenda);
    setOrgs(orgs + 1);
    // formOnChangeArray("newAgenda", "", null);
  };

  const handleDelete = (index) => {
    agendas.splice(index, 1);
    setOrgs(orgs + 1);
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
                  // id={`descriptionEng${index}`}
                  id={`agenda${[index]}.descriptionEng`}
                  type="text"
                  // value={item.descriptionEng}
                  placeholder={`agenda${[index]}.descriptionEng`}
                  // placeholderText={item.descriptionEng}
                /> */}
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
                  <div
                    className="add_new_org"
                    onClick={() => handleDelete(index)}
                  >
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
    agendas: state.formReducer.agenda,
    date_and_time: state.formReducer.date_and_time,
    description_eng: state.formReducer.description_eng,
    description_arm: state.formReducer.description_arm,
    description_ru: state.formReducer.description_ru,
    newAgenda: state.formReducer.newAgenda,

    // newAgenda: state.formReducer.agendas,
    addedAgendas: state.formReducer.addedAgendas,
    existedAgendas: state.eventReducer.eventForEdit.agendas,

    dateAndTime0: state.formReducer.dateAndTime0,
    descriptionEng0: state.formReducer.descriptionEng0,
    descriptionArm0: state.formReducer.descriptionArm0,
    descriptionRu0: state.formReducer.descriptionRu0,

    dateAndTime1: state.formReducer.dateAndTime1,
    descriptionEng1: state.formReducer.descriptionEng1,
    descriptionArm1: state.formReducer.descriptionArm1,
    descriptionRu1: state.formReducer.descriptionRu1,

    dateAndTime2: state.formReducer.dateAndTime2,
    descriptionEng2: state.formReducer.descriptionEng2,
    descriptionArm2: state.formReducer.descriptionArm2,
    descriptionRu2: state.formReducer.descriptionRu2,

    dateAndTime3: state.formReducer.dateAndTime3,
    descriptionEng3: state.formReducer.descriptionEng3,
    descriptionArm3: state.formReducer.descriptionArm3,
    descriptionRu3: state.formReducer.descriptionRu3,

    dateAndTime4: state.formReducer.dateAndTime4,
    descriptionEng4: state.formReducer.descriptionEng4,
    descriptionArm4: state.formReducer.descriptionArm4,
    descriptionRu4: state.formReducer.descriptionRu4,

    dateAndTime5: state.formReducer.dateAndTime5,
    descriptionEng5: state.formReducer.descriptionEng5,
    descriptionArm5: state.formReducer.descriptionArm5,
    descriptionRu5: state.formReducer.descriptionRu5,
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
