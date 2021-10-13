
import React, { useEffect, useState } from "react";
import store, {
  fetchCities,
  fetchCountries,
  fetchStates,
  formOnChange,
  formOnChangeArray,
} from "../../../store";
import { connect } from "react-redux";
import Select from "../../../Components/Forms/Select/Select";
import Input from "../../../Components/Forms/Input/Input";
import AddAgenda from "./AddAgenda";

function AddAgendasAddress({
  fetchCities,
  fetchCountries,
  fetchStates,
  state,
  formOnChangeArray,
  value,
  addressType,
  agendasAddresses,
  addresses,
  formOnChange,
}) {
  const addressesAgenda = [
    {
      id: 1,
      name: "dateAndTime",
    },
    {
      id: 2,
      name: "agendaDescriptionArm",
    },
    ,
    {
      id: 3,
      name: "agendaDescriptionEng",
    },

    {
      id: 4,
      name: "agendaDescriptionRu",
    },
  ];
  const [addressAdded, setAddressAdded] = useState(false);
  const [change, setChange] = useState(0);
  const [newAddress, setNewAddress] = useState(true);
  const [showAgendasForm, setShowAgendasForm] = useState(false);
  const [indexOfAgenda, setIndexOfAgenda] = useState(0);
  //   console.log(agendasAddresses, "agendasAddresses");
  //   console.log(addresses, "addresses");

  //   const agendasCityId = store.getState().formReducer?.agendasCity;
  //   console.log(value, "value");

  useEffect(() => {
    addressType.map((addr) => {
      formOnChangeArray("agendasAddresses", addr.name, []);
    });
  }, []);

  return (
    <div>
      {addressAdded ? (
        <div>
          {addresses.map((address, index) => (
            <div>
              <div>
                {address?.agendas?.map((agenda) => (
                  <div className="added_agendas_container">
                    <div className="added_agendas_item">
                      {/* <svg viewBox="0 0 48 48" className="agendas_time_icon">
                        <g
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1"
                          fill="transparent"
                          stroke="#343333"
                          transform="translate(1 1)"
                        >
                          <circle cx="23" cy="23" r="23" />
                          <path d="m22 12v11l12 11" />
                        </g>
                      </svg> */}
                      <input
                        defaultValue={agenda.dateAndTime}
                        type="datetime-local"
                        onChange={(e) => {
                          const agendaIndex = address.agendas.indexOf(agenda);
                          setIndexOfAgenda(agendaIndex);
                          address.agendas[indexOfAgenda].dateAndTime =
                            e.target.value;
                          // console.log({ agendaIndex });
                        }}
                      />
                      {/* <p>{{agenda.dateAndTime}}</p> */}
                    </div>
                    <div className="added_agendas_item">
                      <textarea
                        defaultValue={agenda.agendaDescriptionEng}
                        type="text"
                        onChange={(e) => {
                          const agendaIndex = address.agendas.indexOf(agenda);
                          setIndexOfAgenda(agendaIndex);
                          address.agendas[indexOfAgenda].agendaDescriptionEng =
                            e.target.value;
                          // console.log({ agendaIndex });
                        }}
                      />
                      {/* {agenda.agendaDescriptionEng} */}
                    </div>
                    <div className="added_agendas_item">
                      <textarea
                        defaultValue={agenda.agendaDescriptionArm}
                        type="text"
                        onChange={(e) => {
                          const agendaIndex = address.agendas.indexOf(agenda);
                          setIndexOfAgenda(agendaIndex);
                          address.agendas[indexOfAgenda].agendaDescriptionArm =
                            e.target.value;
                          // console.log({ agendaIndex });
                        }}
                      />
                      {/* {agenda.agendaDescriptionArm} */}
                    </div>
                    <div className="added_agendas_item">
                      <textarea
                        defaultValue={agenda.agendaDescriptionRu}
                        type="text"
                        onChange={(e) => {
                          const agendaIndex = address.agendas.indexOf(agenda);
                          setIndexOfAgenda(agendaIndex);
                          address.agendas[indexOfAgenda].agendaDescriptionRu =
                            e.target.value;
                          // console.log({ agendaIndex });
                        }}
                      />
                      {/* {agenda.agendaDescriptionRu} */}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : null}
      {showAgendasForm ? (
        <div>
          <AddAgenda
            change={change}
            setChange={setChange}
            addressesAgenda={addressesAgenda}
          />
          <div
            className="add_new_address_btn"
            onClick={() => {
              setNewAddress(true);
              setShowAgendasForm(false);
            }}
          >
            Add new address
          </div>
        </div>
      ) : null}
      {newAddress ? (
        <div>
          <div
            className="add_new_address_btn"
            onClick={() => {
              setAddressAdded(true);
              setNewAddress(false);
              setShowAgendasForm(true);
              //   setChange(change + 1);
              // formOnChangeArray("agendasAddresses", "location", []);
              // formOnChangeArray("agendasAddresses", "latitude", []);
              // formOnChangeArray("agendasAddresses", "longitude", []);
              // formOnChangeArray("agendasAddresses", "cityId", []);
              // formOnChangeArray("agendasAddresses", "agendas", []);
              addresses.push(agendasAddresses);
            }}
          >
            {" "}
            Add agendas
          </div>
        </div>
      ) : null}
    </div>
  );
}

const mapStateToProps = (state) => {
  console.log({
    agendasAddresses: state.formReducer.agendasAddresses,
    addresses: state.eventReducer.addresses,
  });
  return {
    countries: state.locationsReducer.countries,
    country: state.formReducer.agendasCountry,
    states: state.locationsReducer.states,
    state: state.formReducer.agendasState,
    cities: state.locationsReducer.cities,
    cityId: state.formReducer.agendasCity,
    value:
      state.formReducer.agendasAddresses === undefined
        ? []
        : state.formReducer.agendasAddresses,
    // value:
    //   state.formReducer.agendasAddresses === undefined
    //     ? []
    //     : state.formReducer.agendasAddresses[
    //         ownProps.addressType.map((addr) => addr.name)
    //       ],
    agendasAddresses: state.formReducer.agendasAddresses,
    addresses: state.eventReducer.addresses,

    // addressType.map((addr) =>
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    formOnChangeArray: (firstKey, secondKey, value) =>
      dispatch(formOnChangeArray(firstKey, secondKey, value)),
    fetchCountries: () => dispatch(fetchCountries()),
    fetchStates: (country) => dispatch(fetchStates(country)),
    fetchCities: (state) => dispatch(fetchCities(state)),
    formOnChange: (key, value) => dispatch(formOnChange(key, value)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AddAgendasAddress);