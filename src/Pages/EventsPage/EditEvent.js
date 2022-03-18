import React, { useEffect, useState } from "react";
import Input from "../../Components/Forms/Input/Input";
import Textarea from "../../Components/Forms/Textarea/Textarea";
import Select from "../../Components/Forms/Select/Select";
import Button from "../../Components/Forms/Button/Button";
import ImageUpload from "../../Components/Forms/ImageUpload/ImageUpload";
import OneImageUpload from "../../Components/Forms/OneImageUpload/OneImageUpload";
import { toast } from "react-toastify";

import store, {
  fetchCountries,
  fetchStates,
  fetchCities,
  cleanLocation,
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
  addEventBlock,
  cleanVideos,
  getSpeakers,
} from "../../store";
import { deletedImages } from "../../store/images/actions";

import { connect } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import OpenImage from "./components/images/OpenImage";
import { scrollToView } from "../../helpers/scrollToView";
import VideoUpload from "../../Components/Forms/VideoUpload/VideoUpload";
import Multiselect from "../../Components/Forms/MultiSelect/Multiselect";

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
  video,
  image,
  addEventBlock,
  eventDetailsForEdit,
  headers,
  images,
  addedHeaders,
  speakers,
  getSpeakers,
  fetch,
}) {
  const history = useHistory();

  const [details, setDetails] = useState([]);
  const [forRender, setForRender] = useState(0);
  const [renderContent, setRenderContent] = useState(0);
  const [newBlock, setNewBlock] = useState({
    blockImages: [],
    blockVideos: [],
  });
  const [blockLinks, setBlockLinks] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [open, setOpen] = useState(false);
  const [requiredClass, setRequiredClass] = useState("");

  const [eventHeaders, setEventHeaders] = useState([]);
  const [eventImages, setEventImages] = useState([]);
  const [allSpeakers, setAllSpeakers] = useState([]);
  const [fixedImages, setFixedImages] = useState([]);

  let { eventId } = useParams();

  useEffect(() => {
    let arr = [];
    speakers?.map((item) => {
      arr.push({ id: item.id, name: item.nameEng });
    });
    setAllSpeakers(arr);
  }, [speakers]);

  useEffect(() => {
    eventDetailsForEdit && eventDetailsForEdit.headers
      ? formOnChange("headers", eventDetailsForEdit.headers)
      : formOnChange("headers", []);
  }, [eventDetailsForEdit]);

  useEffect(() => {
    setEventHeaders(headers);
    setEventImages(images);
  }, [headers, images]);

  useEffect(() => {
    fetchEventDetails(parseInt(eventId));
    fetchCountries();
    getSpeakers();
  }, []);

  useEffect(() => {
    if (eventId) {
      getEventForEdit(parseInt(eventId));
      fetchEventDetails(parseInt(eventId));
      formOnChange("eventId", parseInt(eventId));
    }
  }, [eventId, forRender]);

  useEffect(() => {
    fetchEventDetails(parseInt(eventId));
  }, [renderContent, fetch]);

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
    if (eventDetails.fixedImages) {
      setFixedImages(eventDetails.fixedImages);
      for (let i = 0; i < eventDetails.fixedImages.length; i++) {
        formOnChange(`img${i + 1}`, eventDetails.fixedImages[i]);
      }
    }
  }, [eventDetails]);

  useEffect(() => {
    formOnChange("eventId", parseInt(eventId));
  }, [eventId]);

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
      deletedHeaders,
      speakers,
    } = store.getState().formReducer;

    let { addedHeaders } = store.getState().imageReducer;

    let event = {
      locationArm,
      locationEng,
      locationRu,
      cityId,
      id: parseInt(eventId),
      nameArm,
      nameEng,
      nameRu,
      descriptionArm,
      descriptionEng,
      descriptionRu,
      endDate,
      startDate,
      isPublic,
      speakers,
      addedHeaders: addedHeaders ?? [],
      deletedHeaders: deletedHeaders ?? [],
    };

    // const changePath = () => {
    //   history.push("/events");
    // };
    editEvent(event);
    cleanImages();
    cleanForm();
    setForRender(forRender + 1);
  };
  const handleEdit = (block) => {
    let editedBlock = block;

    editedBlock.deletedImages = [];
    editedBlock.addedImages =
      store.getState().imageReducer[`block${block.id}`] ?? [];

    editedBlock.deletedVideos = [];
    editedBlock.addedVideos =
      store.getState().videoReducer[`videoBlock${block.id}`] ?? [];
    editEventBlock(editedBlock);
    toast.dark("Edited");
  };

  const handleDelete = (id) => {
    deleteEventBlock(id);
    setRenderContent(renderContent + 1);
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
    let {
      shortDescriptionEng,
      shortDescriptionArm,
      shortDescriptionRu,
      deletedFixedImages,
    } = store.getState().formReducer;

    let { addedFixedImages } = store.getState().imageReducer;

    let details = {
      id: eventId,
      shortDescriptionEng,
      shortDescriptionArm,
      shortDescriptionRu,
    };

    editShortDetails(details);
  };

  const openField = () => {
    setOpen(true);
  };

  const saveBlockData = () => {
    if (newBlock.topTextEng !== "") {
      let links = blockLinks ? blockLinks.split("\n") : [];
      setNewBlock({
        ...newBlock,
        links,
        blockImages: image ?? [],
        blockVideos: video ?? [],
      });

      setForRender(renderContent + 1);
      addEventBlock({ eventId: parseInt(eventId), block: newBlock });
      fetchEventDetails(parseInt(eventId));
      setNewBlock({});
      setBlockLinks("");
      cleanImages();
      formOnChange(`shortDescriptionEng`, "");
      formOnChange(`shortDescriptionArm`, "");
      formOnChange(`shortDescriptionRu`, "");
      cleanVideos();
    } else {
      setRequiredClass("requiredField");
    }
    setForRender(renderContent + 1);
  };

  const deleteHeader = (image, index) => {
    let { deletedHeaders } = store.getState().formReducer;
    let img = image.split("/");
    if (deletedHeaders) {
      let newDeleteds = deletedHeaders.concat([
        img[image.split("/").length - 1],
      ]);
      formOnChange("deletedHeaders", newDeleteds);
    } else {
      formOnChange("deletedHeaders", [img[image.split("/").length - 1]]);
    }
    let newArr = eventHeaders
      .slice(0, index)
      .concat(eventHeaders.slice(index + 1));
    formOnChange("headers", newArr);
  };

  const deleteImage = (image, index) => {
    let { deletedFixedImages } = store.getState().formReducer;
    let img = image.split("/");
    if (deletedFixedImages) {
      let newDeleteds = deletedFixedImages.concat([
        img[image.split("/").length - 1],
      ]);
      formOnChange("deletedFixedImages", newDeleteds);
    } else {
      formOnChange("deletedFixedImages", [img[image.split("/").length - 1]]);
    }
    let newArr = eventImages
      .slice(0, index)
      .concat(eventImages.slice(index + 1));
    formOnChange("images", newArr);
  };

  return (
    <>
      <div>
        <div>
          <button onClick={() => history.goBack()} className="arrow_left">
            <i className="fas fa-chevron-left"></i>
          </button>
          <div className="add_member_title">
            <p>Edit Event</p>
          </div>
        </div>
        <form onFocus={scrollToView} onSubmit={handleSubmit}>
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
                <div className="input_container" style={{ display: "flex" }}>
                  <div
                    style={{
                      marginTop: "auto",
                      marginBottom: "auto",
                      display: "flex",
                      alignItems: "center",
                      marginRight: 100,
                      width: "280px",
                    }}
                  >
                    <label>Public</label>
                    <input
                      style={{ marginLeft: 8 }}
                      type="checkbox"
                      defaultChecked={store.getState().formReducer.isPublic}
                      onChange={() => {
                        setIsPublic(!isPublic);
                      }}
                    />
                  </div>
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

              <Multiselect
                placeholder="Speakers"
                items={allSpeakers}
                id="speakers"
                required={false}
              />

              <div
                style={{
                  display: "flex",
                }}
                className="container_body"
              >
                {eventHeaders && eventHeaders.length !== 0
                  ? eventHeaders.map((image, index) => {
                      return (
                        <div className="edit_news_image_item" key={image}>
                          <img
                            alt=""
                            className="edit_news_images"
                            src={image}
                          />
                          <div className="middle">
                            <div
                              onClick={() => {
                                deleteHeader(image, index);
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
              <div style={{ display: "flex", margin: "10px" }}>
                {/* <OneImageUpload label="Add Header" /> */}
                <ImageUpload
                  containerClassName="uploaded"
                  label={`Add headers(${
                    eventHeaders ? 3 - eventHeaders.length : 3
                  })`}
                  id="addedHeaders"
                  limit={eventHeaders ? 3 - eventHeaders.length : 3}
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
            }}
            className="container_body"
          >
            {eventImages && eventImages.length !== 0
              ? eventImages.map((image, index) => {
                  return (
                    <div className="edit_news_image_item" key={image}>
                      <img alt="" className="edit_news_images" src={image} />
                      <div className="middle">
                        <div
                          onClick={() => {
                            deleteImage(image, index);
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

          <div className="container_body">
            <p style={{ paddingLeft: 15, paddingBottom: 10 }}>
              Կցված նկարների քանակը չպետք է գերազանցի{" "}
              {eventHeaders
                ? addedHeaders
                  ? eventImages
                    ? 8 -
                      (eventHeaders.length +
                        addedHeaders.length +
                        eventImages.length)
                    : 8 - (eventHeaders.length + addedHeaders.length)
                  : 8 - eventHeaders.length
                : 8}{" "}
              - ը։
            </p>
            {/* <div style={{ marginLeft: 15 }}>
              <ImageUpload
                label={`Add Images`}
                containerClassName="uploaded"
                limit={
                  eventHeaders
                    ? addedHeaders
                      ? eventImages
                        ? 8 -
                          (eventHeaders.length +
                            addedHeaders.length +
                            eventImages.length)
                        : 8 - (eventHeaders.length + addedHeaders.length)
                      : 8 - eventHeaders.length
                    : 8
                }
                id="addedFixedImages"
              />
            </div> */}

            <div style={{ marginLeft: "20px" }}>
              <p>Upload images with the givven sizes.</p>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "20px 0 0 0",
                }}
              >
                <ImageUpload
                  label="(330x330)"
                  containerClassName="fixed-uploaded"
                  id="image1"
                  limit={1}
                  width={330}
                  height={330}
                  key1="img1"
                  className="fixed-size-lbl"
                  contentClassName="fixed-uploader-content"
                />
                <ImageUpload
                  label="(700x390)"
                  containerClassName="fixed-uploaded"
                  id="image2"
                  limit={1}
                  width={700}
                  height={390}
                  key1="img2"
                  className="fixed-size-lbl"
                  contentClassName="fixed-uploader-content"
                />
                <ImageUpload
                  label="(460x260)"
                  containerClassName="fixed-uploaded"
                  id="image3"
                  limit={1}
                  width={460}
                  height={260}
                  key1="img3"
                  className="fixed-size-lbl"
                  contentClassName="fixed-uploader-content"
                />
                <ImageUpload
                  label="(500x490)"
                  containerClassName="fixed-uploaded"
                  id="image4"
                  limit={1}
                  width={500}
                  height={490}
                  key1="img4"
                  className="fixed-size-lbl"
                  contentClassName="fixed-uploader-content"
                />
                <ImageUpload
                  label="(300x300)"
                  containerClassName="fixed-uploaded"
                  id="image5"
                  limit={1}
                  width={300}
                  height={300}
                  key1="img5"
                  className="fixed-size-lbl"
                  contentClassName="fixed-uploader-content"
                />
                <ImageUpload
                  label="(180x180)"
                  containerClassName="fixed-uploaded"
                  id="image6"
                  limit={1}
                  width={180}
                  height={180}
                  key1="img6"
                  className="fixed-size-lbl"
                  contentClassName="fixed-uploader-content"
                />
                <ImageUpload
                  label="(210x120)"
                  containerClassName="fixed-uploaded"
                  id="image7"
                  limit={1}
                  width={210}
                  height={120}
                  key1="img7"
                  className="fixed-size-lbl"
                  contentClassName="fixed-uploader-content"
                />
                <ImageUpload
                  label="(200x120)"
                  containerClassName="fixed-uploaded"
                  id="image8"
                  limit={1}
                  width={200}
                  height={120}
                  key1="img8"
                  className="fixed-size-lbl"
                  contentClassName="fixed-uploader-content"
                />
              </div>
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
        {/* <p>Add </p> */}
        <div
          className="plus_icon"
          onClick={openField}
          style={{ marginLeft: 30, marginBottom: 50 }}
        >
          <i className="fas fa-solid fa-plus"></i>
        </div>
        <div style={{ marginLeft: 30, marginBottom: 50 }}>
          {open && (
            <div className="container_body" style={{ paddingBottom: 20 }}>
              <div>
                <div style={{ marginTop: 20 }}>
                  <label
                    htmlFor="descriptionEng1"
                    className={newBlock.topTextEng === "" ? requiredClass : ""}
                  >
                    Description 1
                  </label>

                  <textarea
                    className="add_news_input textarea eventText"
                    value={newBlock.topTextEng ? newBlock.topTextEng : ""}
                    onChange={(e) => {
                      setNewBlock({
                        ...newBlock,
                        topTextEng: e.target.value,
                      });
                    }}
                  />
                </div>
                <div style={{ marginTop: 20 }}>
                  <label htmlFor="descriptionArm1">Նկարագիր 1</label>

                  <textarea
                    className="add_news_input textarea"
                    value={newBlock.topTextArm ? newBlock.topTextArm : ""}
                    onChange={(e) => {
                      setNewBlock({
                        ...newBlock,
                        topTextArm: e.target.value,
                      });
                    }}
                  />
                </div>
                <div style={{ marginTop: 20 }}>
                  <label htmlFor="descriptionArm1">Описание 1</label>

                  <textarea
                    className="add_news_input textarea"
                    value={newBlock.topTextRu ? newBlock.topTextRu : ""}
                    onChange={(e) => {
                      setNewBlock({
                        ...newBlock,
                        topTextRu: e.target.value,
                      });
                    }}
                  />
                </div>
              </div>
              <div style={{ marginTop: 20 }}>
                <ImageUpload
                  label="Upload Images"
                  containerClassName="uploaded"
                  id="blockImages"
                  limit={0}
                />
                <VideoUpload
                  label="Upload Videos"
                  containerClassName="uploaded"
                  id="blockVideos"
                />
              </div>

              <div>
                <div style={{ marginTop: 20 }}>
                  <label htmlFor="descriptionEng2">Description 2</label>

                  <textarea
                    className="add_news_input textarea"
                    value={newBlock.bottomTextEng ? newBlock.bottomTextEng : ""}
                    onChange={(e) => {
                      setNewBlock({
                        ...newBlock,
                        bottomTextEng: e.target.value,
                      });
                    }}
                  />
                </div>

                <div style={{ marginTop: 20 }}>
                  <label htmlFor="descriptionArm2">Նկարագիր 2</label>

                  <textarea
                    className="add_news_input textarea"
                    value={newBlock.bottomTextArm ? newBlock.bottomTextArm : ""}
                    onChange={(e) => {
                      setNewBlock({
                        ...newBlock,
                        bottomTextArm: e.target.value,
                      });
                    }}
                  />
                </div>
                <div style={{ marginTop: 20 }}>
                  <label htmlFor="descriptionRu2">Описание 2</label>

                  <textarea
                    className="add_news_input textarea"
                    value={newBlock.bottomTextRu ? newBlock.bottomTextRu : ""}
                    onChange={(e) => {
                      setNewBlock({
                        ...newBlock,
                        bottomTextRu: e.target.value,
                      });
                    }}
                  />
                </div>
              </div>
              <div style={{ marginTop: 20 }}>
                <div>
                  <label htmlFor="links">
                    Links (input links separated by "Enter")
                  </label>

                  <textarea
                    className="add_news_input textarea"
                    value={blockLinks ? blockLinks : ""}
                    onChange={(e) => {
                      setBlockLinks(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div>
                <Button
                  onClick={saveBlockData}
                  title="Save Block"
                  className="action_btn"
                  disabled={
                    newBlock.topTextEng &&
                    newBlock.topTextArm &&
                    newBlock.topTextRu
                      ? false
                      : true
                  }
                />
              </div>
            </div>
          )}
        </div>
        <div className="event-details-container">
          {details &&
          details.details &&
          details.details.length &&
          details.details[0].id
            ? details.details.map((block, index) => {
                return (
                  <div
                    className="location_container"
                    style={{ display: "block" }}
                    key={block}
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
                              <div className="upload_cont" key={img}>
                                <img
                                  className="uploaded_images"
                                  src={img}
                                  alt=""
                                />
                                <div className="middle">
                                  <div
                                    onClick={() => {
                                      const indexImg =
                                        block.images.indexOf(img);
                                      setForRender(forRender + 1);
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
                    <div style={{ display: "flex ", marginBottom: 20 }}>
                      {block.videos && block.videos.length
                        ? block.videos.map((video) => {
                            return (
                              <div className="upload_cont" key={video}>
                                <video className="uploaded_images" controls>
                                  <source src={video} type="video/mp4" />
                                  <source src={video} type="video/ogg" />
                                  Your browser does not support the video tag.
                                </video>
                                <div className="middle">
                                  <div
                                    onClick={() => {
                                      const indexVid =
                                        block.videos.indexOf(video);
                                      setForRender(forRender + 1);
                                      deleteBlockVideos(block, indexVid);
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
  return {
    countries: state.locationsReducer.countries,
    countryId: state.formReducer?.countryId,
    states: state.locationsReducer.states,
    stateId: state.formReducer?.stateId,
    cities: state.locationsReducer.cities,
    detailsImages: state.eventReducer.detailsImages,
    eventDetails: state.eventReducer?.eventDetails,
    image: state.imageReducer?.image,
    video: state.videoReducer?.video,
    eventDetailsForEdit: state.eventReducer.eventDetailsForEdit,
    headers: state.formReducer.headers,
    images: state.formReducer.images,
    addedHeaders: state.imageReducer.addedHeaders,
    speakers: state.eventReducer?.speakers,
    fetch: state.imageReducer.fetch,
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
    addEventBlock: (blockData) => dispatch(addEventBlock(blockData)),
    getSpeakers: () => dispatch(getSpeakers()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditEvent);
