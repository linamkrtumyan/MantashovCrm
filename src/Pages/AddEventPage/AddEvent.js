import React, { useEffect, useState } from "react";
import Input from "../../Components/Forms/Input/Input";
import Textarea from "../../Components/Forms/Textarea/Textarea";
import Button from "../../Components/Forms/Button/Button";
import "./addEvent.css";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import store, { addEvent } from "../../store";
import { addNews } from "../../store/news/actions/addNews";
import ImageUpload from "../../Components/Forms/ImageUpload/ImageUpload";
import OneImageUpload from "../../Components/Forms/OneImageUpload.js/OneImageUpload";
import Select from "../../Components/Forms/Select/Select";

import {
  // cleanForm,
  fetchCities,
  fetchCountries,
  fetchStates,
} from "../../store";
import AddAgendasAddress from "./components/AddAgendasAddress";

function AddEvent({
  addEvent,
  fetchCities,
  fetchCountries,
  fetchStates,
  countries,
  cities,
  countryId,
  stateId,
  states,
  agendas,
}) {
  const history = useHistory();

  useEffect(() => {
    fetchCountries();
  }, []);

  useEffect(() => {
    if (countryId) {
      fetchStates(countryId);
    }
  }, [countryId]);
  useEffect(() => {
    if (stateId) {
      fetchCities(stateId);
    }
  }, [stateId]);

  const addressType = [
    {
      id: 1,
      name: "agendas",
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    let {
      locationArm,
      locationEng,
      locationRu,
      cityId,
      nameArm,
      nameEng,
      nameRu,
      descriptionArm,
      descriptionEng,
      descriptionRu,
      startDate,
      endDate,
    } = store.getState().formReducer;

    // agendas, header, images
    let { addresses } = store.getState().eventReducer;
    let { header, image } = store.getState().imageReducer;

    let event = {
      locationArm,
      locationEng,
      locationRu,
      cityId,
      nameArm,
      nameEng,
      nameRu,
      descriptionArm,
      descriptionEng,
      descriptionRu,
      startDate,
      endDate,
      agendas:  [],
      header: header[0],
      images: image,
    };

    const changePath = () => {
      history.push("/events");
    };
    // console.log(event, "uxarkvoxy");
    addEvent(event, changePath);
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        // className="add_event_container"
      >
        <div>
          <button onClick={() => history.goBack()} className="arrow_left">
            <i className="fas fa-chevron-left"></i>
          </button>
          <div className="add_member_title">
            <p>Add Event</p>
          </div>
        </div>

        <div className="add_event_component">
          <div className="container_body">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Input id="nameEng" type="text" placeholder="Name" />
              <Input id="nameArm" type="text" placeholder="Անվանում" />
              <Input id="nameRu" type="text" placeholder="Имя" />
            </div>

            {/* <div style={{ display: "flex", justifyContent: "space-between" }}>
              <form autoComplete="off">
                <Select
                  placeholder="Select Country"
                  items={countries}
                  id="countryId"
                />
              </form>
              <form autoComplete="off">
                <Select
                  placeholder="Select State"
                  items={states}
                  id="stateId"
                />
              </form>

              <form autoComplete="off">
                <Select
                  placeholder="Select City"
                  items={cities}
                  id="cityId"
                />
              </form>
            </div> */}
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Select placeholder="Country" items={countries} id="countryId" />
              <Select placeholder="State" items={states} id="stateId" />
              <Select placeholder="City" items={cities} id="cityId" />
            </div>

            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Input id="startDate" type="date" placeholder="Start Date" />
              <Input id="endDate" type="date" placeholder="End Date" />
            </div>

            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Input id="locationEng" type="text" placeholder="Address" />
              <Input id="locationArm" type="text" placeholder="Հասցե" />
              <Input id="locationRu" type="text" placeholder="Адрес" />
            </div>

            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Textarea
                id="descriptionEng"
                type="text"
                placeholder="Description"
              />
              <Textarea
                id="descriptionArm"
                type="text"
                placeholder="Նկարագիր"
              />
              <Textarea id="descriptionRu" type="text" placeholder="Описание" />
            </div>
            <div>
              <AddAgendasAddress addressType={addressType} />
            </div>
            <div className="event_address_container">
              <OneImageUpload label="Upload Header Image" />
              <ImageUpload label="Upload Images" />
            </div>
          </div>

          <div className="event_action_container">
            <Button title="Cancel" className="action_btn cancel_btn" />
            <Button title="Create" className="action_btn" />
          </div>
        </div>
      </form>
    </div>
  );
}

const mapStateToProps = (state) => {
  console.log(state, "state|||");
  return {
    countries: state.locationsReducer.countries,
    countryId: state.formReducer?.countryId,
    states: state.locationsReducer.states,
    stateId: state.formReducer?.stateId,
    cities: state.locationsReducer.cities,
    cities: state.locationsReducer.cities,
    agendas: state.formReducer?.agendasAddresses?.agendas,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addEvent: (news, path) => dispatch(addEvent(news, path)),
    fetchCountries: () => dispatch(fetchCountries()),
    fetchStates: (country) => dispatch(fetchStates(country)),
    fetchCities: (state) => dispatch(fetchCities(state)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AddEvent);
