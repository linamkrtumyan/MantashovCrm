import React, { useEffect, useState } from "react";
import { formOnChangeArray } from "../../../store";
import { connect } from "react-redux";
import Input from "../../../Components/Forms/Input/Input";

function AddAgenda({
  formOnChangeArray,
  value,
  addressesAgenda,
  agendas,
  agendasAddresses,
  addresses,
  change,
  setChange,
  index,
}) {
  console.log(addressesAgenda, "addressesAgenda");
  console.log(agendas, "agendas");
  console.log(addresses, "addresses");
  console.log(index, "index");
  console.log(addresses[index - 1], " addresses[index - 1]");

  const [newAgenda, setNewAgenda] = useState(0);
  //   console.log(addressId, "addressId");
  //   const [change, setChange] = useState(1);
  const [agendasAdded, setAgendasAdded] = useState(false);

  useEffect(() => {
    addressesAgenda.map((agenda) => {
      formOnChangeArray("agendas", agenda.name, "");
    });
  }, []);

  return (
    <div>
      <div className="event_address_container">
        <div>
          <input
            className="input_component agendas_input"
            value={agendas?.dateAndTime}
            onChange={(e) => {
              // setDateAndTime(e.target.value);
              formOnChangeArray("agendas", "dateAndTime", e.target.value);
            }}
            id="dateAndTime"
            type="datetime-local"
            placeholder="Date"
          />
        </div>

        <div>
          <input
            className="input_component  agendas_input"
            value={agendas?.agendaDescription}
            onChange={(e) => {
              // setAgendaDescription(e.target.value);
              formOnChangeArray("agendas", "agendaDescription", e.target.value);
            }}
            id="agendaDescription"
            type="text"
            placeholder="Description"
          />
        </div>

        <div
          onClick={() => {
            addresses[index - 1].agendas.push(agendas);
            setAgendasAdded(true);
            setChange(change + 1);
            setNewAgenda(newAgenda + 1);
            formOnChangeArray("agendas", "dateAndTime", "");
            formOnChangeArray("agendas", "agendaDescription", "");
          }}
        >
          <svg viewBox="-5 -11 50 50" className="add_item_icon">
            <polyline
              points="0.4,15.3 12.4,27.3 39.3,0.4 "
              stroke="#343333"
              fill="transparent"
              strokeWidth="1"
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
  console.log(state, "state");
  return {
    agendas: state.formReducer.agendas,
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
