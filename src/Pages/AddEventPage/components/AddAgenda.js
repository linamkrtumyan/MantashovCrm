import React, { useEffect, useState } from "react";
import { formOnChangeArray } from "../../../store";
import { connect } from "react-redux";
import Input from "../../../Components/Forms/Input/Input";

function AddAgenda({
  formOnChangeArray,
  value,
  addressesAgenda,
  agenda,
  agendasAddresses,
  addresses,
  change,
  setChange,
  index,
}) {

  const [newAgenda, setNewAgenda] = useState(0);
  //   const [change, setChange] = useState(1);
  const [agendasAdded, setAgendasAdded] = useState(false);
  const [id, setId] = useState(0);

  useEffect(() => {
    addressesAgenda.map((agenda) => {
      formOnChangeArray("agenda", agenda.name, []);
    });
  }, []);

  return (
    <div>
      <div className="event_address_container">
        <div>
          <input
            // className="input_component agendas_input"
            className="input input_width"
            value={agenda?.dateAndTime}
            onChange={(e) => {
              // setDateAndTime(e.target.value);
              formOnChangeArray("agenda", "dateAndTime", e.target.value);
            }}
            id="dateAndTime"
            type="datetime-local"
            placeholder="Date"
          />
        </div>

        <div style={{ display: "flex"}}>
          <div style={{marginRight: 10, marginLeft:10}}>
            <textarea
              // className="input_component  agendas_input"
              className="textarea"
              
              value={agenda?.agendaDescriptionEng}
              onChange={(e) => {
                // setAgendaDescription(e.target.value);
                formOnChangeArray(
                  "agenda",
                  "agendaDescriptionEng",
                  e.target.value
                );
              }}
              id="agendaDescriptionEng"
              type="text"
              placeholder="Description"
            />
              required={false}
          </div>
          <div style={{marginRight: 10}}>
            <textarea
              // className="input_component  agendas_input"
              className="textarea"
              value={agenda?.agendaDescriptionArm}
              onChange={(e) => {
                // setAgendaDescription(e.target.value);
                formOnChangeArray(
                  "agenda",
                  "agendaDescriptionArm",
                  e.target.value
                );
              }}
              id="agendaDescriptionArm"
              type="text"
              placeholder="Նկարագիր"
              required={false}
            />
          </div>
          <div>
            <textarea
              // className="input_component agendas_input"
              className="textarea"
              value={agenda?.agendaDescriptionRu}
              onChange={(e) => {
                // setAgendaDescription(e.target.value);
                formOnChangeArray(
                  "agenda",
                  "agendaDescriptionRu",
                  e.target.value
                );
              }}
              id="agendaDescriptionRu"
              type="text"
              placeholder="Описание"
              required={false}
            />
          </div>
        </div>

        <div
          style={{ marginBottom: "auto", marginTop: "auto", marginLeft: 20 }}
          onClick={() => {
            agenda.id = id;
            addresses[index - 1]?.agendas?.push(agenda);
            setAgendasAdded(true);
            setId(id + 1);
            setChange(change + 1);
            setNewAgenda(newAgenda + 1);
            formOnChangeArray("agendas", "dateAndTime", "");
            formOnChangeArray("agendas", "agendaDescriptionArm", "");
            formOnChangeArray("agendas", "agendaDescriptionEng", "");
            formOnChangeArray("agendas", "agendaDescriptionRu", "");
            formOnChangeArray("agendas", "id", id);
          }}
        >
          <svg viewBox="-5 -11 50 50" className="delete-agenda-btn">
            <polyline
              points="0.4,15.3 12.4,27.3 39.3,0.4 "
              stroke="#343333"
              fill="transparent"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    agenda: state.formReducer.agenda,
    agendasAddresses: state.formReducer.agendasAddresses,
    // addresses: state.eventReducer?.addresses[0]?.agendas,
    addresses: state.eventReducer?.addresses,
    index: state.eventReducer?.addresses.length,
    // addresses: state.eventReducer?.addresses,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    formOnChangeArray: (firstKey, secondKey, value) =>
      dispatch(formOnChangeArray(firstKey, secondKey, value)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AddAgenda);
