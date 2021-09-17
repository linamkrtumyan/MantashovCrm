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
  country,
  state,
  states,
}) {
  const history = useHistory();

  // const addressType = [
  //   {
  //     id: 1,
  //     name: "location",
  //   },
  //   {
  //     id: 2,
  //     name: "latitude",
  //   },
  //   {
  //     id: 3,
  //     name: "longitude",
  //   },
  //   {
  //     id: 4,
  //     name: "cityId",
  //   },
  //   {
  //     id: 5,
  //     name: "agendas",
  //   },
  // ];

  useEffect(() => {
    fetchCountries();
  }, []);

  useEffect(() => {
    fetchStates(country);
  }, [country]);
  useEffect(() => {
    fetchCities(state);
  }, [state]);

  const handleSubmit = (e) => {
    e.preventDefault();

    let {
      locationArm,
      locationEng,
      locationRu,
      latitude,
      longitude,
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
      // location,
      latitude,
      longitude,
      cityId,
      // name,
      // description,
      startDate,
      endDate,
      addresses,
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
      <button onClick={() => history.goBack()} className="arrow_left"></button>
      <form
        onSubmit={handleSubmit}
        // className="add_event_container"
      >
        <div className="add_member_title">Add Event</div>
        <div className="add_member_component">
          <div className="event_address_container">
          {/* <div className="is-flex "> */}
            <Input id="nameArm" type="text" placeholder="Name ( Armenian)" />
            <Input id="nameEng" type="text" placeholder="Name (English)" />
            <Input id="nameRu" type="text" placeholder="Name (Russian)" />
          {/* </div> */}
            <form autoComplete="off">
              <Select
                placeholder="Select Country"
                items={countries}
                id="countryId"
              />
            </form>
            <form autoComplete="off">
              <Select placeholder="Select State" items={states} id="state" />
            </form>

            <form autoComplete="off">
              <Select placeholder="Select City" items={cities} id="city" />
            </form>
            <Input id="location" type="text" placeholder="Location" />
            <Input id="latitude" type="text" placeholder="Latitude" />
            <Input id="longitude" type="text" placeholder="Longitude" />

            {/* <Textarea type="text" placeholder="Text" /> */}
          </div>

          <div className="event_address_container">
          
            <Input id="description" type="text" placeholder="Description" />
            <Input id="startDate" type="date" placeholder="Start Date" />
            <Input id="endDate" type="date" placeholder="End Date" />
          </div>
          <div>
            {/* <AddAgendasAddress addressType={addressType} /> */}
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
      </form>
    </div>
  );
}

const mapStateToProps = (state) => {
  console.log(state, "state|||");
  return {
    countries: state.locationsReducer.countries,
    country: state.formReducer.country,
    states: state.locationsReducer.states,
    state: state.formReducer.state,
    cities: state.locationsReducer.cities,
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
