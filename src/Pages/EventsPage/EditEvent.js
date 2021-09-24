import React, { useEffect, useState } from "react";
import Input from "../../Components/Forms/Input/Input";
import Textarea from "../../Components/Forms/Textarea/Textarea";
import Select from "../../Components/Forms/Select/Select";
import Button from "../../Components/Forms/Button/Button";
import ImageUpload from "../../Components/Forms/ImageUpload/ImageUpload";
import OneImageUpload from "../../Components/Forms/OneImageUpload.js/OneImageUpload";
import AddAgendasAddress from "../AddEventPage/components/AddAgendasAddress";

import store, {
  // deletePosition,
  // fetchPositionsAll,
  fetchCountries,
  fetchStates,
  fetchCities,
  cleanForm,
  cleanLocation,
  fetchEventDetailsForEdit,
  editEvent,
  cleanEvent,
  deletedImages,
  editAgendas,
  editImages,
  formOnChange,
} from "../../store";

import { connect } from "react-redux";

import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import { useHistory, useParams } from "react-router-dom";
import EditAgendas from "./EditAgendas";

function EditEvent({
  // modalOpen,
  // setModalOpen,
  // setEditId,
  fetchCountries,
  fetchStates,
  countries,
  countryId,
  states,
  stateId,
  cities,
  fetchCities,
  cleanForm,
  fetchEventDetailsForEdit,
  eventForEdit,
  agendas,
  editAgendas,
  eventImages,
  formOnChange,
  editEvent,
  // agendasArray
}) {
  const history = useHistory();

  const [eventImgs, setEventImgs] = useState([]);
  const [changeImage, setChangeImage] = useState(false);
  const [headerDeleted, setHeaderDeleted] = useState(false);
  const [deletedImages, setDeletedImages] = useState([]);
  const [agenda, setAgenda] = useState([]);

  // const [imgs, setImgs] = useState([]);

  let { id } = useParams();

  useEffect(() => {
    if (id) {
      fetchEventDetailsForEdit(id);
    }
  }, [id]);

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

  useEffect(() => {
    if (eventImages) {
      setEventImgs(eventImages);
      formOnChange("eventImages", eventImgs);
    } else {
      setEventImgs(eventForEdit.images);
    }
  }, [eventImages, eventForEdit.images, eventImgs]);
  useEffect(() => {
    setAgenda(agendas);
  }, [agendas]);

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
      // categoryId,
      descriptionArm,
      descriptionEng,
      descriptionRu,
      endDate,
      startDate,
    } = store.getState().formReducer;

    let { header, image } = store.getState().imageReducer;

    let event = {
      locationArm,
      locationEng,
      locationRu,
      cityId,
      id: parseInt(id),
      nameArm,
      nameEng,
      nameRu,
      descriptionArm,
      descriptionEng,
      descriptionRu,
      endDate,
      startDate,
      header: header[0] ? header[0] : null,
      headerDeleted,
      agendas: agenda,
      addedImages: image,
      deletedImages,
    };

    // console.log(event, "uxarkvoxy");

    const changePath = () => {
      // history.push("/events");
      console.log(event.agendas, "******************");
    };

    // setModalOpen(false);
    editEvent(event, changePath);
    // cleanForm();
    // setEditId(null);
    // cleanEvent();
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
            <p>Edit Event</p>
          </div>
        </div>

        {/* <div> */}
        <div className="add_event_component">
          <div
            className="container_body"
            style={{
              background: "#e7e7e7",
              border: "1px solid #e7e7e7",
              boxShadow: "0 1px 6px 1px rgb(0 0 0 / 26%)",
              margin: 15,
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Input id="nameEng" type="text" placeholder="Name" />
              <Input id="nameArm" type="text" placeholder="Անվանում" />
              <Input id="nameRu" type="text" placeholder="Имя" />
            </div>

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
          </div>

          <div
            style={{
              background: "#e7e7e7",
              // padding: 15,
              margin: 15,
              // display: "flex",
              border: "1px solid #e7e7e7",
              boxShadow: "0 1px 6px 1px rgb(0 0 0 / 26%)",
              // justifyContent: "space-around",
            }}
            className="container_body"
          >
            <div style={{ margin: 15 }}>
              <p
                style={{
                  textAlign: "center",
                  fontSize: 20,
                }}
              >
                Edit agendas
              </p>
            </div>
            <div>
              <div>
                <EditAgendas />
              </div>
              <div>{/* <AddAgendasAddress addressType={addressType} /> */}</div>
            </div>
          </div>

          <div
            style={{
              height: 150,
              width: 150,
              margin: 15,
              marginBottom: 20,
              background: "#e7e7e7",
              // padding: 15,
              // display: "flex",
              border: "1px solid #e7e7e7",
              boxShadow: "0 1px 6px 1px rgb(0 0 0 / 26%)",
              justifyContent: "space-around",
            }}
            className="container_body"
          >
            <p style={{ marginBottom: 5 }}>Header Image</p>
            {changeImage ? (
              <OneImageUpload label="Upload Image" />
            ) : (
              <>
                <div className="member_image_container">
                  <img
                    src={`/images/eventsHeader/${id}/header.png`}
                    alt=""
                    className="member_edit_image"
                    style={{ width: "100%" }}
                  />
                  <div className="member_image_middle">
                    <div
                      onClick={() => {
                        setChangeImage(true);
                        setHeaderDeleted(true);
                      }}
                      className="member_edit_text"
                    >
                      <i className="fas fa-times"></i>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
          <div
            style={{
              // height: 150,
              // width: 150,
              margin: 15,
              background: "#e7e7e7",
              marginTop: 20,
              // padding: 15,
              // display: "flex",
              border: "1px solid #e7e7e7",
              boxShadow: "0 1px 6px 1px rgb(0 0 0 / 26%)",
              // justifyContent: "space-around",
            }}
            className="container_body"
          >
            {eventImgs && eventImgs.length !== 0 ? (
              <div style={{ display: "flex", flexWrap: "wrap", marginTop: 20 }}>
                {eventImgs.map((item) => {
                  return (
                    <div
                      className="member_image_container"
                      // style={{ width: 150, height: 150 }}
                    >
                      <img
                        src={`/images/events/${id}/${item}`}
                        style={{ width: 150, height: 150 }}
                      />
                      <div className="member_image_middle">
                        <div
                          onClick={() => {
                            // setChangeImage(true)
                            for (let i = 0; i < eventImgs.length; i++) {
                              if (item === eventImgs[i]) {
                                deletedImages.push(item);
                                setDeletedImages(deletedImages);
                                editImages(eventImgs);
                                eventImgs.splice(i, 1);
                                setEventImgs(eventImgs);
                                formOnChange("eventImages", eventImgs);
                              }
                            }
                          }}
                          className="member_edit_text"
                        >
                          <i className="fas fa-times"></i>
                        </div>
                      </div>
                    </div>
                  );
                })}
                <ImageUpload label="Add Images" />
              </div>
            ) : (
              <ImageUpload label="Add Images" />
            )}

            {/* <div className="event_address_container">
              <OneImageUpload label="Upload Header Image" />
              <ImageUpload label="Upload Images" />
            </div> */}
            {/* </div> */}
          </div>
          <div className="event_action_container">
            <Button title="Cancel" className="action_btn cancel_btn" />
            <Button title="Save" className="action_btn" />
          </div>
        </div>

        {/* </div> */}
      </form>
    </div>
  );
}

const mapStateToProps = (state) => {
  console.log(state, "state");
  return {
    countries: state.locationsReducer.countries,
    countryId: state.formReducer?.countryId,
    states: state.locationsReducer.states,
    stateId: state.formReducer?.stateId,
    cities: state.locationsReducer.cities,
    eventForEdit: state.eventReducer.eventForEdit,
    agendas: state.formReducer?.agenda,
    eventImages: state.formReducer?.eventImages,
    // agendasArray: state.formReducer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCountries: () => dispatch(fetchCountries()),
    fetchStates: (country) => dispatch(fetchStates(country)),
    fetchCities: (state) => dispatch(fetchCities(state)),
    // deletePosition: (id) => dispatch(deletePosition(id)),
    // fetchPositionsAll: () => dispatch(fetchPositionsAll()),
    cleanForm: () => dispatch(cleanForm()),
    cleanLocation: () => dispatch(cleanLocation()),
    fetchEventDetailsForEdit: (id) => dispatch(fetchEventDetailsForEdit(id)),
    editEvent: (event, changePath) => dispatch(editEvent(event, changePath)),
    editImages: (eventImages) => dispatch(editImages(eventImages)),
    formOnChange: (key, value) => dispatch(formOnChange(key, value)),
    // cleanEvent: () => dispatch(cleanEvent()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditEvent);
