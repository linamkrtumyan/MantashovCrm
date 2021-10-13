import React, { useEffect, useState } from "react";

import { editAgendas, formOnChange } from "../../store";

import { connect } from "react-redux";

function AgendaEdit({ eventForEdit, formOnChange, editAgendas }) {
  const [agendas, setAgendas] = useState([]);
  const [ag, setAg] = useState(0);
  const [newAgenda, setNewAgenda] = useState({});

  useEffect(() => {
    setAgendas(eventForEdit.agenda);
  }, [eventForEdit]);

  const handleAdd = () => {
    setNewAgenda({ ...newAgenda, id: agendas.length + 1 });
    agendas.push(newAgenda);
    formOnChange("editedAndAddedAgendas", agendas);
    setAg(ag + 1);
    editAgendas(agendas);
  };

  const handleDelete = (item) => {
    const index = agendas.indexOf(item);
    agendas.splice(index, 1);
    setAgendas(agendas);
    setAg(ag + 1);
    editAgendas(agendas);
  };

  useEffect(() => {
    formOnChange("editedAndAddedAgendas", agendas);
    editAgendas(agendas);
  }, [agendas]);

  return (
    <>
      <div>
        {agendas
          ? agendas.map((item, index) => {
              for (let i = 0; i < agendas.length; i++) {
                agendas[i].id = i;
              }
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
                      marginBottom: 10,
                      borderRadius: 5,
                    }}
                  >
                    <div className={`input_container`}>
                      <label htmlFor="dateAndTime">Date And Time</label>
                      <input
                        className="input input_width"
                        type="datetime-local"
                        defaultValue={item.dateAndTime}
                        //   placeholder="Date And Time"
                        //   placeholderText={item.dateAndTime}
                        onChange={(e) => {
                          const index = agendas.indexOf(item);
                          agendas[index].dateAndTime = e.target.value;
                          formOnChange("editedAndAddedAgendas", agendas);
                          editAgendas(agendas);
                        }}
                      />
                    </div>
                    <div className="input_container">
                      <label htmlFor="descriptionEng">Description</label>

                      <textarea
                        className="textarea"
                        defaultValue={item.descriptionEng}
                        onChange={(e) => {
                          const index = agendas.indexOf(item);
                          agendas[index].descriptionEng = e.target.value;
                          formOnChange("editedAndAddedAgendas", agendas);
                          editAgendas(agendas);
                        }}
                      />
                    </div>

                    <div className="input_container">
                      <label htmlFor="descriptionArm">Նկարագիր</label>

                      <textarea
                        className="textarea"
                        defaultValue={item.descriptionArm}
                        onChange={(e) => {
                          const index = agendas.indexOf(item);
                          agendas[index].descriptionArm = e.target.value;
                          formOnChange("editedAndAddedAgendas", agendas);
                          editAgendas(agendas);
                        }}
                      />
                    </div>

                    <div className="input_container">
                      <label htmlFor="description_ru">Описание</label>

                      <textarea
                        className="textarea"
                        defaultValue={item.descriptionRu}
                        onChange={(e) => {
                          const index = agendas.indexOf(item);
                          agendas[index].descriptionRu = e.target.value;
                          formOnChange("editedAndAddedAgendas", agendas);
                          editAgendas(agendas);
                        }}
                      />
                    </div>

                    <div
                      style={{
                        marginRight: 10,
                        marginBottom: "auto",
                        marginTop: "auto",
                      }}
                    >
                      <div
                        className="delete-agenda-btn"
                        onClick={() => handleDelete(item)}
                      >
                        <i
                          className="fas fa-times "
                          style={{ width: 17, height: 17 }}
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
              className="input input_width"
              required={false}
              onChange={(e) => {
                setNewAgenda({ ...newAgenda, dateAndTime: e.target.value });
              }}
            />
          </div>
          <div className="input_container">
            <label htmlFor="descriptionEng">Description</label>

            <textarea
              id="descriptionEng"
              onChange={(e) =>
                setNewAgenda({ ...newAgenda, descriptionEng: e.target.value })
              }
              className="textarea"
              required={false}
            />
          </div>

          <div className="input_container">
            <label htmlFor="descriptionArm">Նկարագիր</label>

            <textarea
              id="descriptionArm"
              onChange={(e) =>
                setNewAgenda({ ...newAgenda, descriptionArm: e.target.value })
              }
              className="textarea"
              required={false}
            />
          </div>

          <div className="input_container">
            <label htmlFor="descriptionRu">Описание</label>

            <textarea
              id="descriptionRu"
              onChange={(e) =>
                setNewAgenda({ ...newAgenda, descriptionRu: e.target.value })
              }
              className="textarea"
              required={false}
            />
          </div>

          <div
            onClick={handleAdd}
            style={{
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
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    eventForEdit: state.eventReducer.eventForEdit,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    formOnChange: (key, value) => dispatch(formOnChange(key, value)),
    editAgendas: (agendas) => dispatch(editAgendas(agendas)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AgendaEdit);
