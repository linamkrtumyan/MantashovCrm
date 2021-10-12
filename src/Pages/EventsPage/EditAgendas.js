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

  useEffect(() => {
    // if (date_and_time) {
    formOnChangeArray("newAgenda", "dateAndTime", date_and_time);
    // formOnChangeArray("newAgenda", "descriptionArm", description_arm);
    // formOnChangeArray("newAgenda", "descriptionEng", description_eng);
    // formOnChangeArray("newAgenda", "descriptionRu", description_ru);
    // }
    // if (description_eng) {
    // formOnChangeArray("newAgenda", "dateAndTime", date_and_time);
    // formOnChangeArray("newAgenda", "descriptionArm", description_arm);
    formOnChangeArray("newAgenda", "descriptionEng", description_eng);
    // formOnChangeArray("newAgenda", "descriptionRu", description_ru);
    // }
    // if (description_arm) {
    // formOnChangeArray("newAgenda", "dateAndTime", date_and_time);
    // formOnChangeArray("newAgenda", "descriptionArm", description_arm);
    formOnChangeArray("newAgenda", "descriptionArm", description_arm);
    // formOnChangeArray("newAgenda", "descriptionRu", description_ru);
    // }
    // if (description_ru) {
    // formOnChangeArray("newAgenda", "dateAndTime", date_and_time);
    // formOnChangeArray("newAgenda", "descriptionArm", description_arm);
    // formOnChangeArray("newAgenda", "descriptionEng", description_eng);
    formOnChangeArray("newAgenda", "descriptionRu", description_ru);
    // }
  }, []);

  useEffect(() => {
    if (dateAndTime0) {
      agendas[0].dateAndTime = dateAndTime0;
    }
    setOrgs(orgs + 1);
    // console.log(newAgenda, "::::::::");
  }, [dateAndTime0]);

  useEffect(() => {
    if (dateAndTime1) {
      agendas[1].dateAndTime = dateAndTime1;
    }
    setOrgs(orgs + 1);
  }, [dateAndTime1]);

  useEffect(() => {
    if (dateAndTime2) {
      agendas[2].dateAndTime = dateAndTime2;
    }
    setOrgs(orgs + 1);
  }, [dateAndTime2]);

  useEffect(() => {
    if (dateAndTime3) {
      agendas[3].dateAndTime = dateAndTime3;
    }
    setOrgs(orgs + 1);
  }, [dateAndTime3]);

  useEffect(() => {
    if (dateAndTime4) {
      agendas[4].dateAndTime = dateAndTime4;
    }
    setOrgs(orgs + 1);
  }, [dateAndTime4]);

  useEffect(() => {
    if (dateAndTime5) {
      agendas[5].dateAndTime = dateAndTime5;
    }
    setOrgs(orgs + 1);
  }, [dateAndTime5]);

  // ________________________

  useEffect(() => {
    if (descriptionEng0) {
      agendas[0].descriptionEng = descriptionEng0;
    }
    setOrgs(orgs + 1);
  }, [descriptionEng0]);

  useEffect(() => {
    if (descriptionEng1) {
      agendas[1].descriptionEng = descriptionEng1;
    }
    setOrgs(orgs + 1);
  }, [descriptionEng1]);

  useEffect(() => {
    if (descriptionEng2) {
      agendas[2].descriptionEng = descriptionEng2;
    }
    setOrgs(orgs + 1);
  }, [descriptionEng2]);

  useEffect(() => {
    if (descriptionEng3) {
      agendas[3].descriptionEng = descriptionEng3;
    }
    setOrgs(orgs + 1);
  }, [descriptionEng3]);

  useEffect(() => {
    if (descriptionEng4) {
      agendas[4].descriptionEng = descriptionEng4;
    }
    setOrgs(orgs + 1);
  }, [descriptionEng4]);

  useEffect(() => {
    if (descriptionEng5) {
      agendas[5].descriptionEng = descriptionEng5;
    }
    setOrgs(orgs + 1);
  }, [descriptionEng5]);

  // _______________________________________

  useEffect(() => {
    if (descriptionArm0) {
      agendas[0].descriptionArm = descriptionArm0;
    }
    setOrgs(orgs + 1);
  }, [descriptionArm0]);

  useEffect(() => {
    if (descriptionArm1) {
      agendas[1].descriptionArm = descriptionArm1;
    }
    setOrgs(orgs + 1);
  }, [descriptionArm1]);

  useEffect(() => {
    if (descriptionArm2) {
      agendas[2].descriptionArm = descriptionArm2;
    }
    setOrgs(orgs + 1);
  }, [descriptionArm2]);

  useEffect(() => {
    if (descriptionArm3) {
      agendas[3].descriptionArm = descriptionArm3;
    }
    setOrgs(orgs + 1);
  }, [descriptionArm3]);

  useEffect(() => {
    if (descriptionArm4) {
      agendas[4].descriptionArm = descriptionArm4;
    }
    setOrgs(orgs + 1);
  }, [descriptionArm4]);

  useEffect(() => {
    if (descriptionArm5) {
      agendas[5].descriptionArm = descriptionArm5;
    }
    setOrgs(orgs + 1);
  }, [descriptionArm5]);

  // _______________________________________

  useEffect(() => {
    if (descriptionRu0) {
      agendas[0].descriptionRu = descriptionRu0;
    }
    setOrgs(orgs + 1);
  }, [descriptionRu0]);

  useEffect(() => {
    if (descriptionRu1) {
      agendas[1].descriptionRu = descriptionRu1;
    }
    setOrgs(orgs + 1);
  }, [descriptionRu1]);

  useEffect(() => {
    if (descriptionRu2) {
      agendas[2].descriptionRu = descriptionRu2;
    }
    setOrgs(orgs + 1);
  }, [descriptionRu2]);

  useEffect(() => {
    if (descriptionRu3) {
      agendas[3].descriptionRu = descriptionRu3;
    }
    setOrgs(orgs + 1);
  }, [descriptionRu3]);

  useEffect(() => {
    if (descriptionRu4) {
      agendas[4].descriptionRu = descriptionRu4;
    }
    setOrgs(orgs + 1);
  }, [descriptionRu4]);

  useEffect(() => {
    if (descriptionRu5) {
      agendas[5].descriptionRu = descriptionRu5;
    }
    setOrgs(orgs + 1);
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
          ? eventForEdit.agenda.map((item, index) => {
              if (
                item.dateAndTime &&
                item.descriptionEng &&
                item.descriptionArm &&
                item.descriptionRu
              ) {
                return (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      border: "1px solid #80808094",
                      marginBottom: 3,
                      borderRadius: 5,
                    }}
                  >
                    <Input
                      id={`date_and_time${index}`}
                      type="datetime-local"
                      // dataDateFormat="YYYY/MM/DDThh:mm:ss"
                      // value={item.dateAndTime}
                      defaultValue={item.dateAndTime}
                      placeholder="Date And Time"
                      placeholderText={item.dateAndTime}
                    />
                    <div className="input_container">
                      <label htmlFor={`description_eng${index}`}>
                        Description
                      </label>

                      <textarea
                        id={`description_eng${index}`}
                        onChange={(e) =>
                          formOnChange(
                            `description_eng${index}`,
                            e.target.value
                          )
                        }
                        className="textarea"
                        placeholder={item.descriptionEng}
                      />
                    </div>

                    <div className="input_container">
                      <label htmlFor={`description_arm${index}`}>
                        Նկարագիր
                      </label>

                      <textarea
                        id={`description_arm${index}`}
                        onChange={(e) =>
                          formOnChange(
                            `description_arm${index}`,
                            e.target.value
                          )
                        }
                        className="textarea"
                        placeholder={item.descriptionArm}
                      />
                    </div>

                    <div className="input_container">
                      <label htmlFor={`description_ru${index}`}>Описание</label>

                      <textarea
                        id={`description_ru${index}`}
                        onChange={(e) =>
                          formOnChange(`description_ru${index}`, e.target.value)
                        }
                        className="textarea"
                        placeholder={item.descriptionRu}
                      />
                    </div>

                    <div
                      // onClick={() => handleDelete(index)}
                      style={{
                        // margin: "24px 10px 10px 10px"
                        marginRight: 10,
                        marginBottom: "auto",
                        marginTop: "auto",
                      }}
                    >
                      <div
                        className="delete-agenda-btn"
                        onClick={() => handleDelete(index)}
                      >
                        <i
                          className="fas fa-times "
                          style={{ width: 17, height: 17, marginRight: "10px" }}
                        ></i>
                      </div>
                    </div>
                  </div>
                );
              } else {
                return null;
              }
            })
          : null}

        <div style={{ display: "flex" }}>
          <div className="input_container">
            <label htmlFor="dateAndTime">Date And Time</label>
            <input
              id="dateAndTime"
              type="datetime-local"
              className='input input_width'
              required={false}
              onChange={(e) =>
                formOnChangeArray("newAgenda", "dateAndTime", e.target.value)
              }
            />
          </div>
          <div className="input_container">
            <label htmlFor="descriptionEng">Description</label>

            <textarea
              id="descriptionEng"
              onChange={(e) =>
                formOnChangeArray("newAgenda", "descriptionEng", e.target.value)
              }
              className="textarea"
              // placeholder={item.descriptionEng}
              required={false}
            />
          </div>

          <div className="input_container">
            <label htmlFor="descriptionArm">Նկարագիր</label>

            <textarea
              id="descriptionArm"
              onChange={(e) =>
                formOnChangeArray("newAgenda", "descriptionArm", e.target.value)
              }
              className="textarea"
              // placeholder={item.descriptionEng}
              required={false}
            />
          </div>

          <div className="input_container">
            <label htmlFor="descriptionRu">Описание</label>

            <textarea
              id="descriptionRu"
              onChange={(e) =>
                formOnChangeArray("newAgenda", "descriptionRu", e.target.value)
              }
              className="textarea"
              // placeholder={item.descriptionEng}
              required={false}
            />
          </div>

          <div
            onClick={handleAdd}
            style={{
              // margin: "24px 10px 10px 10px"
              marginRight: 10,
              marginBottom: "auto",
              marginTop: "auto",
            }}
          >
            <div className="delete-agenda-btn">
              <i style={{ width: 17, height: 17 }} className="fas fa-check"></i>
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
    newAgenda: state.formReducer?.newAgenda,
    dateAndTime0: state.formReducer.date_and_time0,
    descriptionEng0: state.formReducer.description_eng0,
    descriptionArm0: state.formReducer.description_arm0,
    descriptionRu0: state.formReducer.description_ru0,

    dateAndTime1: state.formReducer.date_and_time1,
    descriptionEng1: state.formReducer.description_eng1,
    descriptionArm1: state.formReducer.description_arm1,
    descriptionRu1: state.formReducer.description_ru1,

    dateAndTime2: state.formReducer.date_and_time2,
    descriptionEng2: state.formReducer.description_eng2,
    descriptionArm2: state.formReducer.description_arm2,
    descriptionRu2: state.formReducer.description_ru2,

    dateAndTime3: state.formReducer.date_and_time3,
    descriptionEng3: state.formReducer.description_eng3,
    descriptionArm3: state.formReducer.description_arm3,
    descriptionRu3: state.formReducer.description_ru3,

    dateAndTime4: state.formReducer.date_and_time4,
    descriptionEng4: state.formReducer.description_eng4,
    descriptionArm4: state.formReducer.description_arm4,
    descriptionRu4: state.formReducer.description_ru4,

    dateAndTime5: state.formReducer.date_and_time5,
    descriptionEng5: state.formReducer.description_eng5,
    descriptionArm5: state.formReducer.description_arm5,
    descriptionRu5: state.formReducer.description_ru5,
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
