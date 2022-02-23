import React, { useEffect, useState } from "react";
import Input from "../../Components/Forms/Input/Input";
import Textarea from "../../Components/Forms/Textarea/Textarea";
import Select from "../../Components/Forms/Select/Select";
import Button from "../../Components/Forms/Button/Button";
import ImageUpload from "../../Components/Forms/ImageUpload/ImageUpload";
import OneImageUpload from "../../Components/Forms/OneImageUpload/OneImageUpload";

import store, {
  fetchCountries,
  fetchStates,
  fetchCities,
  cleanLocation,
  // fetchEventDetailsForEdit,
  editEvent,
  editImages,
  cleanImages,
  deleteEventImageFromStore,
  cleanForm,
  fetchEventDetails,
  deleteEventBlock,
  editEventBlock,
  getEventForEdit,
  formOnChange,
  editShortDetails,
} from "../../store";
import { deletedImages } from "../../store/images/actions";

import { connect } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import OpenImage from "./components/images/OpenImage";
import { scrollToView } from "../../helpers/scrollToView";
import VideoUpload from "../../Components/Forms/VideoUpload/VideoUpload";

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
  // fetchEventDetailsForEdit,
  editEvent,

  cleanImages,
  deletedImages,
  deleteEventImageFromStore,
  detailsImages,
  cleanForm,
  fetchEventDetails,
  eventDetails,
  deleteEventBlock,
  editEventBlock,
  getEventForEdit,
  formOnChange,
  editShortDetails,
}) {
  const history = useHistory();

  const [changeImage, setChangeImage] = useState(false);
  const [headerDeleted, setHeaderDeleted] = useState(false);
  const [openImgModal, setOpenImgModal] = useState(false);
  const [imgPath, setImgPath] = useState("");
  const [details, setDetails] = useState([]);
  const [forRender, setForRender] = useState(0);
  const [renderContent, setRenderContent] = useState(0);
  const [newBlock, setNewBlock] = useState({
    blockImages: [],
    blockVideos: [],
  });
  const [blockLinks, setBlockLinks] = useState("");
  const [isPublic, setIsPublic] = useState(false);

  let { id } = useParams();

  useEffect(() => {
    if (id) {
      getEventForEdit(parseInt(id));
      fetchEventDetails(parseInt(id));
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
    setDetails(eventDetails);
    formOnChange("shortDescriptionEng", eventDetails.shortDescriptionEng);
    formOnChange("shortDescriptionArm", eventDetails.shortDescriptionArm);
    formOnChange("shortDescriptionRu", eventDetails.shortDescriptionRu);
  }, [eventDetails]);

  const handleCancel = () => {
    cleanImages();
    cleanForm();
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
      isPublic,
      addedHeaders: [],
      deletedHeaders: [],
      // header,
      // headerDeleted,
      // addedImages,
      // deletedImages: deleted,
    };

    // const changePath = () => {
    //   history.push("/events");
    // };
    editEvent(event);
    cleanImages();
    cleanForm();
  };

  // const openImageModal = (imagePath) => {
  //   setImgPath(imagePath);
  //   setOpenImgModal(true);
  // };

  const handleEdit = (block) => {
    let editedBlock = block;
    const addedImgs = store.getState().formReducer[`block${block.id}`];
    const addedVids = store.getState().formReducer[`videoBlock${block.id}`];
    let newAddedimgs = [];
    let newAddedVids = [];
    addedImgs?.map((img) => {
      newAddedimgs.push(img.name);
    });
    addedVids?.map((img) => {
      newAddedVids.push(img.name);
    });
    editedBlock.deletedImages = [];
    editedBlock.addedImages = newAddedimgs;

    editedBlock.deletedVideos = [];
    editedBlock.addedVideos = newAddedVids;
    editEventBlock(editedBlock);
  };

  const handleDelete = (id) => {
    deleteEventBlock(id);
  };

  const deleteBlockImage = (block, index) => {
    const deletedImage = block.images[index].split("/");
    const blockData = {
      id: block.id,
      topTextEng: block.topTextEng,
      topTextArm: block.topTextArm,
      topTextRu: block.topTextRu,
      bottomTextEng: block.bottomTextEng,
      bottomTextArm: block.bottomTextArm,
      bottomTextRu: block.bottomTextRu,
      links: block.links,
      deletedImages: [deletedImage[deletedImage.length - 1]],
      addedImages: [],
      deletedVideos: [],
      addedVideos: [],
    };
    editEventBlock(blockData);
    setRenderContent(renderContent + 1);
  };

  const deleteBlockVideos = (block, index) => {
    const deletedVideo = block.videos[index].split("/");
    const blockData = {
      id: block.id,
      topTextEng: block.topTextEng,
      topTextArm: block.topTextArm,
      topTextRu: block.topTextRu,
      bottomTextEng: block.bottomTextEng,
      bottomTextArm: block.bottomTextArm,
      bottomTextRu: block.bottomTextRu,
      links: block.links,
      deletedImages: [],
      addedImages: [],
      deletedVideos: [deletedVideo[deletedVideo.length - 1]],
      addedVideos: [],
    };
    editEventBlock(blockData);
    setRenderContent(renderContent + 1);
  };

  const handleEditShortDetails = () => {
    let { shortDescriptionEng, shortDescriptionArm, shortDescriptionRu } =
      store.getState().formReducer;

    let details = {
      id,
      shortDescriptionEng,
      shortDescriptionArm,
      shortDescriptionRu,
      addedImages: [],
      deletedImages: [],
    };

    editShortDetails(details);
  };

  return (
    <>
      {/* <OpenImage
        openImgModal={openImgModal}
        setOpenImgModal={setOpenImgModal}
        imgPath={imgPath}
        id={id}
        folderPath="/images/events"
        detailsImages={detailsImages}
      /> */}

      <div>
        <div>
          <button onClick={() => history.goBack()} className="arrow_left">
            <i className="fas fa-chevron-left"></i>
          </button>
          <div className="add_member_title">
            <p>Edit Event</p>
          </div>
        </div>
        <form
          onFocus={scrollToView}
          onSubmit={handleSubmit}
          // className="add_event_container"
        >
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
                <div
                  style={{
                    marginTop: "auto",
                    marginBottom: "auto",
                    display: "flex",
                    alignItems: "center",
                    marginRight: 100,
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
          </div>
          <div className="event_action_container">
            <Button
              onClick={handleCancel}
              title="Cancel"
              className="action_btn cancel_btn"
            />
            <Button title="Save" className="action_btn" />
          </div>
        </form>

        <div
          className="container_body some_content"
          style={{
            background: "#e7e7e7",
            border: "1px solid #e7e7e7",
            boxShadow: "0 1px 6px 1px rgb(0 0 0 / 26%)",
            margin: 15,
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Textarea
              id="shortDescriptionEng"
              type="text"
              placeholder="Short Description"
            />
            <Textarea
              id="shortDescriptionArm"
              type="text"
              placeholder="Համառոտ նկարագիր"
            />
            <Textarea
              id="shortDescriptionRu"
              type="text"
              placeholder=" Краткое описание"
            />
          </div>
          <div
            style={{
              display: "flex",
              // // maxWidth: 150,
              // flexWrap: "wrap",
              // margin: 15,
              // background: "#e7e7e7",
              // marginTop: 20,
              // border: "1px solid #e7e7e7",
              // boxShadow: "0 1px 6px 1px rgb(0 0 0 / 26%)",
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
                    // onClick={() => {
                    //   openImageModal(imagePath);
                    // }}
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

          <div className="container_body">
            <div style={{ marginLeft: 15 }}>
              <ImageUpload label="Add Images" />
            </div>
          </div>
          <div>
            <Button
              title="Edit"
              className="action_btn"
              onClick={handleEditShortDetails}
            />
          </div>
        </div>
        <div className="event-details-container">
          {details && details.details && details.details.length
            ? details.details.map((block, index) => {
                console.log({ block }, "8888888888888888888888");
                return (
                  <div
                    className="location_container"
                    style={{ display: "block" }}
                    key={block.id}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <div className="input_container">
                        <label htmlFor="descriptionEng1">Description 1</label>

                        <textarea
                          className="textarea"
                          defaultValue={block.topTextEng}
                          onChange={(e) => {
                            const index = details.details.indexOf(block);
                            details.details[index].topTextEng = e.target.value;
                            // addEventDetails(details.details);
                          }}
                        />
                      </div>
                      <div className="input_container">
                        <label htmlFor="descriptionArm1">Նկարագիր 1</label>

                        <textarea
                          className="textarea"
                          defaultValue={block.topTextArm}
                          onChange={(e) => {
                            const index = details.details.indexOf(block);
                            details.details[index].topTextArm = e.target.value;
                            // addEventDetails(details.details);
                          }}
                        />
                      </div>
                      <div className="input_container">
                        <label htmlFor="descriptionRu1">Описание 1</label>

                        <textarea
                          className="textarea"
                          defaultValue={block.topTextRu}
                          onChange={(e) => {
                            const index = details.details.indexOf(block);
                            details.details[index].topTextRu = e.target.value;
                            // addEventDetails(details.details);
                          }}
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="descriptionEng1">
                        Links (input links separated by "Enter")
                      </label>

                      <textarea
                        className="textarea"
                        defaultValue={block.links}
                        onChange={(e) => {
                          const index = details.details.indexOf(block);
                          details.details[index].links = e.target.value;
                        }}
                      />
                    </div>
                    <div style={{ display: "flex " }}>
                      {block.images && block.images.length
                        ? block.images.map((img) => {
                            return (
                              <div className="upload_cont">
                                <img
                                  className="uploaded_images"
                                  src={img}
                                  alt=""
                                  key={img}
                                />
                                <div className="middle">
                                  <div
                                    onClick={() => {
                                      const indexImg =
                                        block.images.indexOf(img);
                                      const indexBlock =
                                        details.details.indexOf(block);
                                      setForRender(forRender + 1);
                                      console.log({
                                        blockkkk: details.details[indexBlock],
                                        indexImg,
                                      });
                                      deleteBlockImage(block, indexImg);
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
                          })
                        : null}
                    </div>
                    <ImageUpload
                      label="Upload Images"
                      containerClassName="uploaded"
                      id={`block${block.id}`}
                      limit={0}
                    />
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <div className="input_container">
                        <label htmlFor="descriptionEng2">Description 2</label>

                        <textarea
                          className="textarea"
                          defaultValue={block.bottomTextEng}
                          onChange={(e) => {
                            const index = details.details.indexOf(block);
                            details.details[index].bottomTextEng =
                              e.target.value;
                            // addEventDetails(details.details);
                          }}
                        />
                      </div>
                      <div className="input_container">
                        <label htmlFor="descriptionArm2">Նկարագիր 2</label>

                        <textarea
                          className="textarea"
                          defaultValue={block.bottomTextArm}
                          onChange={(e) => {
                            const index = details.details.indexOf(block);
                            details.details[index].bottomTextArm =
                              e.target.value;
                            // addEventDetails(details.details);
                          }}
                        />
                      </div>
                      <div className="input_container">
                        <label htmlFor="descriptionRu2">Описание 2</label>

                        <textarea
                          className="textarea"
                          defaultValue={block.bottomTextRu}
                          onChange={(e) => {
                            const index = details.details.indexOf(block);
                            details.details[index].bottomTextRu =
                              e.target.value;
                            // addEventDetails(details.details);
                          }}
                        />
                      </div>
                    </div>
                    {block.videos && block.videos.length
                      ? block.videos.map((video) => {
                          return (
                            <div className="upload_cont">
                              <video
                                className="uploaded_images"
                                key={video}
                                controls
                              >
                                <source src={video} type="video/mp4" />
                                <source src={video} type="video/ogg" />
                                Your browser does not support the video tag.
                              </video>
                              <div className="middle">
                                <div
                                  onClick={() => {
                                    const indexVideo =
                                      block.videos.indexOf(video);
                                    const indexBlock =
                                      details.details.indexOf(block);
                                    setForRender(forRender + 1);
                                    deleteBlockVideos(block, indexVideo);
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
                        })
                      : null}
                    <VideoUpload
                      label="Upload Videos"
                      containerClassName="uploaded"
                      id={`videoBlock${block.id}`}
                    />
                    <div style={{ display: "flex" }}>
                      <Button
                        title="Delete"
                        onClick={() => handleDelete(block.id)}
                        className="action_btn cancel_btn"
                      />

                      <Button
                        title="Edit"
                        onClick={() => handleEdit(block)}
                        className="action_btn"
                      />
                    </div>
                  </div>
                );
              })
            : null}
        </div>
      </div>

      {/* </div> */}
    </>
  );
}

const mapStateToProps = (state) => {
  console.log({ state }, "event edit");
  return {
    countries: state.locationsReducer.countries,
    countryId: state.formReducer?.countryId,
    states: state.locationsReducer.states,
    stateId: state.formReducer?.stateId,
    cities: state.locationsReducer.cities,
    detailsImages: state.eventReducer.detailsImages,
    eventDetails: state.eventReducer?.eventDetails,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCountries: () => dispatch(fetchCountries()),
    fetchStates: (country) => dispatch(fetchStates(country)),
    fetchCities: (state) => dispatch(fetchCities(state)),
    cleanForm: () => dispatch(cleanForm()),
    cleanLocation: () => dispatch(cleanLocation()),
    fetchEventDetails: (id) => dispatch(fetchEventDetails(id)),
    editEvent: (event, changePath) => dispatch(editEvent(event, changePath)),
    editImages: (eventImages) => dispatch(editImages(eventImages)),
    cleanImages: () => dispatch(cleanImages()),
    deletedImages: (img) => dispatch(deletedImages(img)),
    deleteEventImageFromStore: (id) => dispatch(deleteEventImageFromStore(id)),
    deleteEventBlock: (id) => dispatch(deleteEventBlock(id)),
    editEventBlock: (block) => dispatch(editEventBlock(block)),
    getEventForEdit: (id) => dispatch(getEventForEdit(id)),
    editShortDetails: (details) => dispatch(editShortDetails(details)),
    formOnChange: (key, value) => dispatch(formOnChange(key, value)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditEvent);
