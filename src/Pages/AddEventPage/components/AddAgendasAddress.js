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
  countries,
  cities,
  country,
  state,
  states,
  formOnChangeArray,
  value,
  addressType,
  cityId,
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
      name: "agendaDescription",
    },
  ];
  const [addressAdded, setAddressAdded] = useState(false);
  const [change, setChange] = useState(0);
  const [newAddress, setNewAddress] = useState(true);
  const [showAgendasForm, setShowAgendasForm] = useState(false);
  //   console.log(agendasAddresses, "agendasAddresses");
  //   console.log(addresses, "addresses");

  //   const agendasCityId = store.getState().formReducer?.agendasCity;
  //   console.log(value, "value");
  useEffect(() => {
    addressType.map((addr) => {
      formOnChangeArray("agendasAddresses", addr.name, []);
    });
  }, []);

  useEffect(() => {
    fetchCountries();
  }, []);

  useEffect(() => {
    fetchStates(country);
  }, [country]);
  useEffect(() => {
    fetchCities(state);
  }, [state]);

  return (
    <div>
      {addressAdded ? (
        <div>
          {addresses.map((address) => (
            <div>
              <div className="added_addresses_container">
                <div style={{ marginRight: "5px" }}>
                  <p>{address.location}</p>
                </div>
                <div style={{ marginRight: "5px" }}>
                  <p>{address.latitude}</p>
                </div>
                <div>
                  <p> {address.longitude}</p>
                </div>
              </div>

              <div>
                {address.agendas?.map((agenda) => (
                  <div className="added_agendas_container">
                    <div className="added_agendas_item">
                      <svg viewBox="0 0 48 48" className="agendas_time_icon">
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
                      </svg>
                      <p>{agenda.dateAndTime}</p>
                    </div>
                    <div className="added_agendas_item">
                      {agenda.agendaDescription}
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
          <div className="event_address_container">
            <form autoComplete="off">
              <Select
                placeholder="Select Country"
                items={countries}
                id="agendasCountry"
              />
            </form>
            <form autoComplete="off">
              <Select
                placeholder="Select State"
                items={states}
                id="agendasState"
              />
            </form>
            <form autoComplete="off">
              <Select
                // val={agendasAddresses?.agendasCityId}
                placeholder="Select City"
                items={cities}
                id="agendasCity"
              />
            </form>
            <input
              style={{ margin: "10px" }}
              className="input_component"
              value={agendasAddresses?.agendasLocation}
              onChange={(e) => {
                // setAgendasLocation(e.target.value);
                formOnChangeArray(
                  "agendasAddresses",
                  "location",
                  e.target.value
                );
                formOnChangeArray("agendasAddresses", "cityId", cityId);
                // cleanForm();
              }}
              id="agendasLocation"
              type="text"
              placeholder="Location"
            />
            <input
              style={{ margin: "10px" }}
              className="input_component"
              value={agendasAddresses?.agendasLatitude}
              onChange={(e) => {
                // setAgendasLatitude(e.target.value);
                formOnChangeArray(
                  "agendasAddresses",
                  "latitude",
                  e.target.value
                );
                // cleanForm();
              }}
              id="agendasLatitude"
              type="text"
              placeholder="Latitude"
            />
            <input
              style={{ margin: "10px" }}
              className="input_component"
              value={agendasAddresses?.agendasLongitude}
              onChange={(e) => {
                // setAgendasLongitude(e.target.value);
                formOnChangeArray(
                  "agendasAddresses",
                  "longitude",
                  e.target.value
                );
                // cleanForm();
              }}
              id="agendasLongitude"
              type="text"
              placeholder="Longitude"
            />
          </div>
          <div
            className="add_new_address_btn"
            onClick={() => {
              setAddressAdded(true);
              setNewAddress(false);
              setShowAgendasForm(true);
              //   setChange(change + 1);
              formOnChangeArray("agendasAddresses", "location", []);
              formOnChangeArray("agendasAddresses", "latitude", []);
              formOnChangeArray("agendasAddresses", "longitude", []);
              formOnChangeArray("agendasAddresses", "cityId", []);
              formOnChangeArray("agendasAddresses", "agendas", []);
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

const mapStateToProps = (state, ownProps) => {
  // console.log(ownProps, "ownProps");
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
