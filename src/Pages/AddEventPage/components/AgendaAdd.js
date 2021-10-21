import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { editAgendas } from "../../../store";

function AgendaAdd({ agendas, editAgendas }) {
  const [showAddedAgendas, setShowAddedAgendas] = useState(false);

  const [allAgendas, setAllAgendas] = useState([]);
  const [newAgenda, setNewAgenda] = useState({});
  const [ag, setAg] = useState(0);

  useEffect(() => {
    setAllAgendas(agendas);
    for (let i = 0; i < allAgendas.length; i++) {
      allAgendas[i].id = i;
    }
  }, [agendas]);

  const handleAdd = () => {
    setNewAgenda({ ...newAgenda, id: agendas.length });
    agendas.push(newAgenda);
    setAllAgendas(agendas);
    setAg(ag + 1);
    editAgendas(agendas);

    setNewAgenda({});
  };

  const handleDelete = (item) => {
    const index = agendas.indexOf(item);
    agendas.splice(index, 1);
    setAllAgendas(agendas);
    setAg(ag + 1);
    editAgendas(agendas);
  };

  return (
    <div>
      {showAddedAgendas ? (
        <div>
          {agendas
            ? agendas.map((item, index) => {
                return (
                  <div
                    style={{
                      display: "flex",
                      // justifyContent: "space-between",
                      border: "1px solid #80808094",
                      marginBottom: 10,
                      borderRadius: 5,
                    }}
                  >
                    <div className="input_container">
                      <label htmlFor="dateAndTime">Date And Time</label>
                      <input
                        className="input input_width"
                        type="datetime-local"
                        defaultValue={item.dateAndTime}
                        onChange={(e) => {
                          const index = agendas.indexOf(item);
                          agendas[index].dateAndTime = e.target.value;
                          // formOnChange("editedAndAddedAgendas", agendas);
                          editAgendas(agendas);
                        }}
                      />
                    </div>
                    <div className="input_container">
                      <label htmlFor="descriptionEng">Description</label>

                      <textarea
                        className="textarea"
                        defaultValue={item.agendaDescriptionEng}
                        onChange={(e) => {
                          const index = agendas.indexOf(item);
                          agendas[index].descriptionEng = e.target.value;
                          // formOnChange("editedAndAddedAgendas", agendas);
                          editAgendas(agendas);
                        }}
                      />
                    </div>

                    <div className="input_container">
                      <label htmlFor="descriptionArm">Նկարագիր</label>

                      <textarea
                        className="textarea"
                        defaultValue={item.agendaDescriptionArm}
                        onChange={(e) => {
                          const index = agendas.indexOf(item);
                          agendas[index].descriptionArm = e.target.value;
                          // formOnChange("editedAndAddedAgendas", agendas);
                          editAgendas(agendas);
                        }}
                      />
                    </div>

                    <div className="input_container">
                      <label htmlFor="description_ru">Описание</label>

                      <textarea
                        className="textarea"
                        defaultValue={item.agendaDescriptionRu}
                        onChange={(e) => {
                          const index = agendas.indexOf(item);
                          agendas[index].descriptionRu = e.target.value;
                          // formOnChange("editedAndAddedAgendas", agendas);
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
                value={newAgenda.dateAndTime ? newAgenda.dateAndTime : ""}
                onChange={(e) => {
                  setNewAgenda({ ...newAgenda, dateAndTime: e.target.value });
                }}
              />
            </div>
            <div className="input_container">
              <label htmlFor="descriptionEng">Description</label>

              <textarea
                id="descriptionEng"
                value={
                  newAgenda.agendaDescriptionEng
                    ? newAgenda.agendaDescriptionEng
                    : ""
                }
                onChange={(e) =>
                  setNewAgenda({
                    ...newAgenda,
                    agendaDescriptionEng: e.target.value,
                  })
                }
                className="textarea"
                required={false}
              />
            </div>

            <div className="input_container">
              <label htmlFor="descriptionArm">Նկարագիր</label>

              <textarea
                id="descriptionArm"
                value={
                  newAgenda.agendaDescriptionArm
                    ? newAgenda.agendaDescriptionArm
                    : ""
                }
                onChange={(e) =>
                  setNewAgenda({
                    ...newAgenda,
                    agendaDescriptionArm: e.target.value,
                  })
                }
                className="textarea"
                required={false}
              />
            </div>

            <div className="input_container">
              <label htmlFor="descriptionRu">Описание</label>

              <textarea
                id="descriptionRu"
                value={
                  newAgenda.agendaDescriptionRu
                    ? newAgenda.agendaDescriptionRu
                    : ""
                }
                onChange={(e) =>
                  setNewAgenda({
                    ...newAgenda,
                    agendaDescriptionRu: e.target.value,
                  })
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
                <i
                  style={{ width: 17, height: 17 }}
                  className="fas fa-check"
                ></i>
              </div>
            </div>
          </div>
        </div>
      ) : null}
      <div>
        <div
          className="add_new_address_btn"
          onClick={() => {
            setShowAddedAgendas(true);
          }}
        >
          {" "}
          Add agendas
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    agendas: state.eventReducer?.agendas,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    editAgendas: (agendas) => dispatch(editAgendas(agendas)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AgendaAdd);
