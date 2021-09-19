import React, { useEffect, useState } from "react";
import Input from "../../Components/Forms/Input/Input";
import Textarea from "../../Components/Forms/Textarea/Textarea";
import Select from "../../Components/Forms/Select/Select";
import Button from "../../Components/Forms/Button/Button";
import ImageUpload from "../../Components/Forms/ImageUpload/ImageUpload";
import OneImageUpload from "../../Components/Forms/OneImageUpload.js/OneImageUpload";

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
} from "../../store";

import { connect } from "react-redux";

import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import { useHistory, useParams } from "react-router-dom";
import EditAgendas from "./EditAgendas";

function EditEvent({
  modalOpen,
  setModalOpen,
  setEditId,
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
}) {
  const history = useHistory();
  const [eventImages, setEventImages] = useState([]);

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
    setEventImages(eventForEdit.images);
  }, [eventForEdit.images]);

  const addressType = [
    {
      id: 1,
      name: "agendas",
    },
  ];

  const handleDelete = () => {
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

    let { header } = store.getState().imageReducer;

    let event = {
      event: {
        locationArm,
        locationEng,
        locationRu,
        cityId,
        id,
        nameArm,
        nameEng,
        nameRu,
        descriptionArm,
        descriptionEng,
        descriptionRu,
        endDate,
        startDate,
        header,
      },
    };
    setModalOpen(false);
    editEvent(event);
    cleanForm();
    setEditId(null);
    cleanEvent();
  };

  return (
    // <div>
    //   {/* <section className="modal-card-body has-text-centered"> */}

    //   <hr></hr>
    //   {/* <div
    //         className="see-agendas-btn"
    //         // onClick={setShowAgendas(true)}
    //       >
    //         See Agenta
    //       </div> */}

    //   {/* {
    //         eventForEdit && eventForEdit.agenda ?
    //         eventForEdit.agenda.map(item => (
    //           <div style={{display: 'flex'}}>
    //             <Input id="dateAndTime" type="date" value={item.dateAndTime} />
    //             <div>{item.descriptionArm}</div>
    //           </div>
    //         ))
    //         : null
    //       } */}

    //   {eventForEdit && eventImages && eventImages.length !== 0 ? (
    //     // <Slide>
    //     <div style={{ display: "flex" }}>
    //       {eventForEdit.images.map((item) => (
    //         <div className="img-for-edit">
    //           <button className="delete-image-btn">
    //             {/* <img src={require("./download.png").default}/> */}X
    //           </button>
    //           <img src={`/images/events/${id}/${item}`} />
    //         </div>
    //       ))}
    //     </div>
    //   ) : // </Slide>
    //   null}
    //   {/* </section> */}

    //   <button
    //     // onClick={() => {
    //     //   setModalOpen(false);
    //     //   cleanForm();
    //     //   setEditId(null);
    //     //   cleanOrganization();
    //     // }}
    //     className="button"
    //   >
    //     Cancel
    //   </button>
    //   <button onClick={handleDelete} className="button is-primary">
    //     Save
    //   </button>
    // </div>

    <div>
      <form
      // onSubmit={handleSubmit}
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

            {/* {eventForEdit && eventForEdit.agenda
              ? eventForEdit.agenda.map((item) => (
                  <div style={{ display: "flex" }}>
                    <Input
                      id="dateAndTime"
                      type="date"
                      value={item.dateAndTime}
                    />
                    <div>{item.descriptionArm}</div>
                  </div>
                ))
              : null} */}

            <EditAgendas />

            {/* <div style={{ display: "flex", justifyContent: "space-between" }}><p>Header</p></div> */}

            {/* <div className="event_address_container">
              <OneImageUpload label="Upload Header Image" />
              <ImageUpload label="Upload Images" />
            </div> */}
          </div>

          <div className="event_action_container">
            <Button title="Cancel" className="action_btn cancel_btn" />
            <Button title="Save" className="action_btn" />
          </div>
        </div>
      </form>
    </div>
  );
}

const mapStateToProps = (state) => {
  console.log(state.eventReducer, "state.eventReducer");
  return {
    countries: state.locationsReducer.countries,
    countryId: state.formReducer?.countryId,
    states: state.locationsReducer.states,
    stateId: state.formReducer?.stateId,
    cities: state.locationsReducer.cities,
    eventForEdit: state.eventReducer.eventForEdit,
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
    editEvent: (event) => dispatch(editEvent(event)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditEvent);
