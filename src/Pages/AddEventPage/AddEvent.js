import React, { useEffect, useState } from "react";
import Input from "../../Components/Forms/Input/Input";
import Textarea from "../../Components/Forms/Textarea/Textarea";
import Button from "../../Components/Forms/Button/Button";
import "./addEvent.css";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import store, { addEvent, setUploadedPhotos, cleanImages } from "../../store";
import ImageUpload from "../../Components/Forms/ImageUpload/ImageUpload";
import OneImageUpload from "../../Components/Forms/OneImageUpload/OneImageUpload";
import Select from "../../Components/Forms/Select/Select";

import {
  // cleanForm,
  fetchCities,
  fetchCountries,
  fetchStates,
  cleanForm,
  formOnChangeArray,
  editAgendas,
  getSpeakers,
} from "../../store";
// import AddAgendasAddress from "./components/AddAgendasAddress";
// import AgendaAdd from "./components/AgendaAdd";
import { scrollToView } from "../../helpers/scrollToView";
import Multiselect from "../../Components/Forms/MultiSelect/Multiselect";

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
  // agendas,
  cleanForm,
  formOnChangeArray,
  editAgendas,
  speakers,
  getSpeakers,
  headers,
  // image,
  uploadedPhotos,
  cleanImages,
  eventId,
}) {
  const history = useHistory();
  const [isPublic, setIsPublic] = useState(false);
  const [allSpeakers, setAllSpeakers] = useState([]);
  const [id, setId] = useState(null);

  useEffect(() => {
    cleanForm();
    editAgendas([]);
    fetchCountries();
    formOnChangeArray("agendasAddresses", "agendas", []);
    getSpeakers();
    cleanImages();
  }, []);

  useEffect(() => {
    if (eventId) {
      history.push(`/eventDetails/${eventId}`);
    }
  }, [eventId]);

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
    let arr = [];
    speakers?.map((item) => {
      arr.push({ id: item.id, name: item.nameEng });
    });
    setAllSpeakers(arr);
  }, [speakers]);

  const handleSubmit = async (e) => {
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
      speakers,
    } = store.getState().formReducer;

    // agendas, header, images

    let { headers, image } = store.getState().imageReducer;

    let headersImages = [];
    headers.map((img) => {
      headersImages.push(img.name);
    });

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
      // agendas,
      headers: headersImages,
      images: image,
      speakers,
      isPublic,
    };

    //

    await addEvent(event);
    // if (id) {
    // let { eventId } = store.getState().eventReducer.eventId;
    // handlePageChange(id);
    // }

    // const changePath = () => {

    // };
    // changePath();
    // history.push(`/event/${id}`)
    // cleanForm();
    // editAgendas([]);
  };

  const handleCancel = () => {
    history.push("/events");
    cleanForm();
    // editAgendas([]);
  };

  return (
    <div>
      <div>
        <button onClick={() => history.goBack()} className="arrow_left">
          <i className="fas fa-chevron-left"></i>
        </button>
        <div className="add_member_title">
          <p>Add Event</p>
        </div>
      </div>
      <form
        onFocus={scrollToView}
        onSubmit={handleSubmit}
        className="add_event_container"
      >
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

            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Input
                id="locationEng"
                type="text"
                placeholder="Address"
                required={false}
              />
              <Input
                id="locationArm"
                type="text"
                placeholder="Հասցե"
                required={false}
              />
              <Input
                id="locationRu"
                type="text"
                placeholder="Адрес"
                required={false}
              />
            </div>

            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Input
                id="startDate"
                type="datetime-local"
                placeholder="Start Date"
              />
              <Input
                id="endDate"
                type="datetime-local"
                placeholder="End Date"
              />

              <Multiselect
                placeholder="Speakers"
                items={allSpeakers}
                id="speakers"
                required={false}
              />
            </div>

            {/* <div>
              <AgendaAdd />
            </div> */}
            <div className="event_address_container " style={{ marginTop: 20 }}>
              <div style={{ marginRight: 20 }}>
                <OneImageUpload label="Upload Header 1" index={1} />
                {/* <ImageUpload label="Upload Headers (max 3)" /> */}
              </div>
              <div
                style={{
                  marginRight: 20,
                  pointerEvents: `${!headers[0] ? "none" : ""}`,
                }}
              >
                <OneImageUpload label="Upload Header 2" index={2} />
              </div>
              <div
                style={{
                  marginRight: 20,
                  pointerEvents: `${!headers[1] ? "none" : ""}`,
                }}
              >
                <OneImageUpload label="Upload Header 3" index={3} />
              </div>
              {/* <ImageUpload label="Upload Images" limit={true} /> */}
              <div
                style={{
                  marginTop: "auto",
                  marginBottom: "auto",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <label>Public</label>
                <input
                  style={{ marginLeft: 8 }}
                  type="checkbox"
                  onChange={() => {
                    setIsPublic(!isPublic);
                  }}
                />
              </div>
            </div>
          </div>

          <div className="event_action_container">
            <Button
              onClick={handleCancel}
              title="Cancel"
              className="action_btn cancel_btn"
            />
            <Button title="Create ->" className="action_btn" />
          </div>
        </div>
      </form>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    countries: state.locationsReducer.countries,
    countryId: state.formReducer?.countryId,
    states: state.locationsReducer.states,
    stateId: state.formReducer?.stateId,
    cities: state.locationsReducer.cities,
    cities: state.locationsReducer.cities,
    agendas: state.eventReducer?.agendas,
    speakers: state.eventReducer?.speakers,
    // selectedSpeakers: state.formReducer?.speakers ?? [],
    headers: state.imageReducer?.headers,
    image: state.imageReducer?.image,
    eventId: state.eventReducer?.eventId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addEvent: (event, path) => dispatch(addEvent(event, path)),
    fetchCountries: () => dispatch(fetchCountries()),
    fetchStates: (country) => dispatch(fetchStates(country)),
    fetchCities: (state) => dispatch(fetchCities(state)),
    cleanForm: () => dispatch(cleanForm()),
    formOnChangeArray: (firstKey, secondKey, value) =>
      dispatch(formOnChangeArray(firstKey, secondKey, value)),
    editAgendas: (agendas) => dispatch(editAgendas(agendas)),
    getSpeakers: () => dispatch(getSpeakers()),
    cleanImages: () => dispatch(cleanImages()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AddEvent);
