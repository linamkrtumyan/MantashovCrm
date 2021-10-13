import React, { useEffect, useState } from "react";
import Input from "../../Components/Forms/Input/Input";
import Textarea from "../../Components/Forms/Textarea/Textarea";
import Select from "../../Components/Forms/Select/Select";
import Button from "../../Components/Forms/Button/Button";
import ImageUpload from "../../Components/Forms/ImageUpload/ImageUpload";
import OneImageUpload from "../../Components/Forms/OneImageUpload.js/OneImageUpload";

import store, {
  fetchCountries,
  fetchStates,
  fetchCities,
  cleanLocation,
  fetchEventDetailsForEdit,
  editEvent,
  editImages,
  cleanImages,
  deleteEventImageFromStore,
  cleanForm,
} from "../../store";
import { deletedImages } from "../../store/images/actions";

import { connect } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import OpenImage from "./components/images/OpenImage";
import AgendaEdit from "./AgendaEdit";

function EditEvent({
  fetchCountries,
  fetchStates,
  countries,
  countryId,
  states,
  stateId,
  cities,
  fetchCities,
  // cleanForm,
  fetchEventDetailsForEdit,
  agendas,
  editEvent,

  cleanImages,
  deletedImages,
  deleteEventImageFromStore,
  detailsImages,
  cleanForm,
  editedAndAddedAgendas
}) {
  const history = useHistory();

  const [changeImage, setChangeImage] = useState(false);
  const [headerDeleted, setHeaderDeleted] = useState(false);
  const [agenda, setAgenda] = useState([]);
  const [openImgModal, setOpenImgModal] = useState(false);
  const [imgPath, setImgPath] = useState("");

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
    setAgenda(agendas);
  }, [agendas]);

  const handleCancel = () => {
    history.push("/events");
  };

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
      endDate,
      startDate,
    } = store.getState().formReducer;

    const header = store.getState().imageReducer.header[0];
    const addedImages = store.getState().imageReducer.image;
    const deleted = store.getState().imageReducer.deletedImages;

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
      header,
      headerDeleted,
      agendas: agenda,
      addedImages,
      deletedImages: deleted,
    };

    const changePath = () => {
      history.push("/events");
    };
    editEvent(event, changePath);
    cleanImages();
    cleanForm();
  };

  const openImageModal = (imagePath) => {
    setImgPath(imagePath);
    setOpenImgModal(true);
  };

  return (
    <>
      <OpenImage
        openImgModal={openImgModal}
        setOpenImgModal={setOpenImgModal}
        imgPath={imgPath}
        id={id}
      />

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
                <Select
                  placeholder="Country"
                  items={countries}
                  id="countryId"
                />
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
                <Textarea
                  id="descriptionRu"
                  type="text"
                  placeholder="Описание"
                />
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
                  <AgendaEdit />
                </div>
                <div>
                  {/* <AddAgendasAddress addressType={addressType} /> */}
                </div>
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
            // style={{
            //     margin: 15,
            //     background: "#e7e7e7",
            //     marginTop: 20,
            //     border: "1px solid #e7e7e7",
            //     boxShadow: "0 1px 6px 1px rgb(0 0 0 / 26%)",
            //   }}
            >
              <div
                style={{
                  display: "flex",
                  // maxWidth: 150,
                  flexWrap: "wrap",
                  margin: 15,
                  background: "#e7e7e7",
                  marginTop: 20,
                  border: "1px solid #e7e7e7",
                  boxShadow: "0 1px 6px 1px rgb(0 0 0 / 26%)",
                }}
                className="container_body"
              >
                {detailsImages.map((image, index) => {
                  const imagePath = `/images/events/${id}/${image}`;
                  return (
                    <div className="edit_news_image_item" key={index}>
                      <img
                        alt=""
                        className="edit_news_images"
                        src={imagePath}
                        onClick={() => {
                          openImageModal(imagePath);
                        }}
                      />
                      <div className="middle">
                        <div
                          onClick={() => {
                            deletedImages(image);
                            deleteEventImageFromStore(index);
                          }}
                        >
                          <svg viewBox="0 0 24 24" className="close">
                            <path
                              d="M 2 2 L 22 22 M 2 22 L22 2"
                              stroke="red"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="5"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <ImageUpload label="  Add Images" />
            </div>
            <div className="event_action_container">
              <div onClick={() => handleCancel()}>
                <Button title="Cancel" className="action_btn cancel_btn" />
              </div>

              <div onClick={handleSubmit}>
                <Button title="Save" className="action_btn" />
              </div>
            </div>
          </div>

          {/* </div> */}
        </form>
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    countries: state.locationsReducer.countries,
    countryId: state.formReducer?.countryId,
    states: state.locationsReducer.states,
    stateId: state.formReducer?.stateId,
    cities: state.locationsReducer.cities,
    // agendas: state.formReducer?.agenda,
    agendas: state.eventReducer.agendas,
    detailsImages: state.eventReducer.detailsImages,
    editedAndAddedAgendas: state.formReducer?.editedAndAddedAgendas
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCountries: () => dispatch(fetchCountries()),
    fetchStates: (country) => dispatch(fetchStates(country)),
    fetchCities: (state) => dispatch(fetchCities(state)),
    cleanForm: () => dispatch(cleanForm()),
    cleanLocation: () => dispatch(cleanLocation()),
    fetchEventDetailsForEdit: (id) => dispatch(fetchEventDetailsForEdit(id)),
    editEvent: (event, changePath) => dispatch(editEvent(event, changePath)),
    editImages: (eventImages) => dispatch(editImages(eventImages)),

    cleanImages: () => dispatch(cleanImages()),
    deletedImages: (img) => dispatch(deletedImages(img)),
    deleteEventImageFromStore: (id) => dispatch(deleteEventImageFromStore(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditEvent);
