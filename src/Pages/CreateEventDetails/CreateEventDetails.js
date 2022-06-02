import React, { useEffect, useState } from "react";
import "./createEventDetails.css";
import { connect } from "react-redux";
import ImageUpload from "../../Components/Forms/ImageUpload/ImageUpload";
import Button from "../../Components/Forms/Button/Button";
import store, {
  addEventDetails,
  cleanImages,
  cleanVideos,
  cleanForm,
  addEventBlock,
  fetchEventDetails,
  deleteEventBlock,
  editEventBlock,
  formOnChange,
  addEventShortDescription,
  cleanImagesWithKey,
  cleanVideosWithKey,
} from "../../store";
import VideoUpload from "../../Components/Forms/VideoUpload/VideoUpload";
import { useHistory, useParams } from "react-router-dom";
import { toast } from "react-toastify";

function CreateEventDetails({
  image,
  headers,
  addEventDetails,
  video,
  addEventBlock,
  fetchEventDetails,
  eventDetails,
  deleteEventBlock,
  editEventBlock,
  formOnChange,
  shortDescriptionRu,
  shortDescriptionArm,
  shortDescriptionEng,
  // fixedImages,
  addEventShortDescription,
  fixedImagesDeleted,
  cleanImages,
  cleanVideos,
  fetch,
  cleanImagesWithKey,
  cleanVideosWithKey,
}) {
  const [open, setOpen] = useState(false);
  const [renderContent, setRenderContent] = useState(0);
  const [eventBlock, setEventBlock] = useState({});
  const [forRender, setForRender] = useState(0);
  const [requiredClass, setRequiredClass] = useState("");
  const [blockLinks, setBlockLinks] = useState("");
  const [details, setDetails] = useState([]);
  const [fixedImages, setFixedImages] = useState([]);

  let history = useHistory();
  let { eventId } = useParams();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    fetchEventDetails(parseInt(eventId));
    formOnChange("eventId", parseInt(eventId));
  }, []);

  useEffect(() => {
    setDetails(eventDetails);
    formOnChange(`shortDescriptionEng`, eventDetails.shortDescriptionEng);
    formOnChange(`shortDescriptionArm`, eventDetails.shortDescriptionArm);
    formOnChange(`shortDescriptionRu`, eventDetails.shortDescriptionRu);
    if (eventDetails.fixedImages) {
      setFixedImages(eventDetails.fixedImages);
      for (let i = 0; i < eventDetails.fixedImages.length; i++) {
        formOnChange(`img${i + 1}`, eventDetails.fixedImages[i]);
      }
    }
  }, [eventDetails]);

  useEffect(() => {
    let headersUrls = [];
    headers.map((img) => {
      headersUrls.push(img.url);
    });
  }, [headers]);

  useEffect(() => {
    fetchEventDetails(parseInt(eventId));
  }, [renderContent, fetch]);

  useEffect(() => {
    let links = blockLinks && blockLinks !== "" ? blockLinks.split("\n") : [];
    setEventBlock({
      ...eventBlock,
      links,
    });
  }, [blockLinks]);

  const openField = () => {
    setOpen(true);
  };

  useEffect(() => {
    let blockImages = image ?? [];
    let blockVideos = video ?? [];
    setEventBlock({
      ...eventBlock,
      blockImages,
      blockVideos,
    });
  }, [image, video]);

  const saveBlockData = () => {
    let links = blockLinks ? blockLinks.split("\n") : [];
    setEventBlock({
      ...eventBlock,
      links,
    });

    // setRenderContent(renderContent + 1);
    addEventBlock({ eventId: parseInt(eventId), block: eventBlock }, () =>
      setTimeout(() => {
        setRenderContent(renderContent + 1);
      }, 2000)
    );
    fetchEventDetails(parseInt(eventId));
    setEventBlock({});
    setBlockLinks("");
    cleanImages();
    cleanImagesWithKey(`blockImages`);
    cleanVideosWithKey(`blockVideos`);
    formOnChange(`blockImages`, []);
    formOnChange(`blockVideos`, []);
    cleanVideos();
  };

  const handleDelete = (id) => {
    deleteEventBlock(id);
    setRenderContent(renderContent + 1);
  };

  const handleEdit = (editedBlock) => {
    editedBlock.deletedImages = [];
    editedBlock.addedImages =
      store.getState().imageReducer[`block${editedBlock.id}`] ?? [];

    editedBlock.deletedVideos = [];
    editedBlock.addedVideos =
      store.getState().videoReducer[`videoBlock${editedBlock.id}`] ?? [];
    editEventBlock(editedBlock, () =>
      setTimeout(() => {
        setRenderContent(renderContent + 1);
      }, 2000)
    );
    formOnChange(`block${editedBlock.id}`, []);
    formOnChange(`videoBlock${editedBlock.id}`, []);
    cleanImagesWithKey(`block${editedBlock.id}`);
    cleanVideosWithKey(`videoBlock${editedBlock.id}`);
    cleanImages();
    cleanVideos();
    toast.dark("Edited");
  };

  const sendData = () => {
    let headersImages = [];
    headers?.map((img) => {
      headersImages.push(img.name);
    });

    let deletedImages = [];
    fixedImagesDeleted?.map((img) => {
      deletedImages.push(img.name);
    });

    let dataToSend = {
      id: parseInt(eventId),
      shortDescriptionEng,
      shortDescriptionArm,
      shortDescriptionRu,
    };
    cleanImages();
    cleanVideos();
    cleanForm();
    addEventShortDescription(dataToSend);
    history.push("/events/1");
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

  const callback = () => {
    const { shortDescriptionEng, shortDescriptionArm, shortDescriptionRu } =
      store.getState().formReducer;
    const data = {
      id: eventId,
      shortDescriptionEng,
      shortDescriptionArm,
      shortDescriptionRu,
    };
    addEventShortDescription(data);
  };

  return (
    <div className="event-card-desc">
      <div className="applicant_page_title_container">
        <p className="applicant_page_title">Event Details</p>
      </div>
      <div
        className="container_body"
        style={{
          paddingBottom: 20,
          marginTop: 20,
          marginLeft: 20,
        }}
      >
        <div
          style={{
            marginTop: 20,
          }}
        >
          <label
            htmlFor="shortDescriptionEng"
            className={
              shortDescriptionEng && shortDescriptionEng === ""
                ? requiredClass
                : ""
            }
          >
            Short Description
          </label>

          <textarea
            className="add_news_input textarea eventText"
            value={shortDescriptionEng ?? ""}
            onChange={(e) => {
              formOnChange(`shortDescriptionEng`, e.target.value);
            }}
          />
        </div>

        <div
          style={{
            marginTop: 20,
          }}
        >
          <label
            htmlFor="shortDescriptionArm"
            className={
              shortDescriptionArm && shortDescriptionArm === ""
                ? requiredClass
                : ""
            }
          >
            Համառոտ նկարագիր
          </label>

          <textarea
            className="add_news_input textarea eventText"
            value={shortDescriptionArm ?? ""}
            onChange={(e) => {
              formOnChange(`shortDescriptionArm`, e.target.value);
            }}
          />
        </div>

        <div
          style={{
            marginTop: 20,
          }}
        >
          <label
            htmlFor="shortDescriptionRu"
            className={
              shortDescriptionRu && shortDescriptionRu === ""
                ? requiredClass
                : ""
            }
          >
            Краткое описание
          </label>

          <textarea
            className="add_news_input textarea eventText"
            value={shortDescriptionRu ?? ""}
            onChange={(e) => {
              formOnChange(`shortDescriptionRu`, e.target.value);
            }}
          />
        </div>
      </div>

      <div className="images_container">
        {details && details.length && details.headers.length
          ? details.headers.map((image) => (
              <img
                src={image}
                alt=""
                className="uploaded_image"
                key={image.url}
              />
            ))
          : null}
        {/* {

          } */}
      </div>
      {/* <div style={{ marginLeft: 30 }}>
        <p style={{ paddingBottom: 10 }}>
          Կցված նկարների քանակը չպետք է գերազանցի{" "}
          {details && details.headers && details.headers.length
            ? 8 - details.headers.length
            : 8}
          -ը։
        </p>
        <ImageUpload
          label="Upload Images"
          containerClassName="uploaded"
          id="fixedImages"
          limit={
            details && details.headers && details.headers.length
              ? 8 - details.headers.length
              : 8
          }
        />
      </div> */}

      <div style={{ marginLeft: "20px" }}>
        <p>Upload images with the givven sizes.</p>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "20px 0 0 0",
            marginRight: "150px",
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
            callback={callback}
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
            callback={callback}
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
            callback={callback}
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
            callback={callback}
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
            callback={callback}
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
            callback={callback}
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
            callback={callback}
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
            callback={callback}
          />
        </div>
      </div>

      <div className="opened_field_container">
        <div className="plus_icon" onClick={openField}>
          <i className="fas fa-solid fa-plus"></i>
        </div>
        {open && (
          <div className="container_body" style={{ paddingBottom: 20 }}>
            <div>
              <div style={{ marginTop: 20 }}>
                <label
                  htmlFor="descriptionEng1"
                  className={eventBlock.topTextEng === "" ? requiredClass : ""}
                >
                  Description 1
                </label>

                <textarea
                  className="add_news_input textarea eventText"
                  value={eventBlock.topTextEng ? eventBlock.topTextEng : ""}
                  onChange={(e) => {
                    setEventBlock({
                      ...eventBlock,
                      topTextEng: e.target.value,
                    });
                  }}
                />
              </div>
              <div style={{ marginTop: 20 }}>
                <label htmlFor="descriptionArm1">Նկարագիր 1</label>

                <textarea
                  className="add_news_input textarea"
                  value={eventBlock.topTextArm ? eventBlock.topTextArm : ""}
                  onChange={(e) => {
                    setEventBlock({
                      ...eventBlock,
                      topTextArm: e.target.value,
                    });
                  }}
                />
              </div>
              <div style={{ marginTop: 20 }}>
                <label htmlFor="descriptionArm1">Описание 1</label>

                <textarea
                  className="add_news_input textarea"
                  value={eventBlock.topTextRu ? eventBlock.topTextRu : ""}
                  onChange={(e) => {
                    setEventBlock({
                      ...eventBlock,
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
                  value={
                    eventBlock.bottomTextEng ? eventBlock.bottomTextEng : ""
                  }
                  onChange={(e) => {
                    setEventBlock({
                      ...eventBlock,
                      bottomTextEng: e.target.value,
                    });
                  }}
                />
              </div>

              <div style={{ marginTop: 20 }}>
                <label htmlFor="descriptionArm2">Նկարագիր 2</label>

                <textarea
                  className="add_news_input textarea"
                  value={
                    eventBlock.bottomTextArm ? eventBlock.bottomTextArm : ""
                  }
                  onChange={(e) => {
                    setEventBlock({
                      ...eventBlock,
                      bottomTextArm: e.target.value,
                    });
                  }}
                />
              </div>
              <div style={{ marginTop: 20 }}>
                <label htmlFor="descriptionRu2">Описание 2</label>

                <textarea
                  className="add_news_input textarea"
                  value={eventBlock.bottomTextRu ? eventBlock.bottomTextRu : ""}
                  onChange={(e) => {
                    setEventBlock({
                      ...eventBlock,
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
                  eventBlock.topTextEng &&
                  eventBlock.topTextArm &&
                  eventBlock.topTextRu
                    ? false
                    : true
                }
              />
            </div>
          </div>
        )}
        <div>
          {details &&
          details.details &&
          details.details.length &&
          details.details[0].id
            ? details.details.map((block, index) => {
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
                        defaultValue={`${block.links?.map((link) => {
                          return `${link + "" + `\n`}`;
                        })}`}
                        onChange={(e) => {
                          const index = details.details.indexOf(block);
                          details.details[index].links = e.target.value;
                        }}
                      />
                    </div>
                    <div style={{ display: "flex ", marginBottom: 20 }}>
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
                        ? block.videos.map((video, index) => {
                            return (
                              <div className="upload_cont">
                                <video
                                  className="uploaded_images"
                                  key={video}
                                  // controls
                                  poster={block.thumbnails[index]}
                                >
                                  {/* <source src={video} type="video/mp4" />
                                  <source src={video} type="video/ogg" /> */}
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
        {details ? (
          <Button title="Send" className="action_btn" onClick={sendData} />
        ) : null}
      </div>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    image: state.imageReducer?.blockImages,
    video: state.videoReducer?.blockVideos,
    headers: state.imageReducer?.headers,
    eventDetailsBlocks: state.eventReducer.eventDetailsBlocks,
    // fixedImages: state.imageReducer?.fixedImages ?? [],
    fixedImagesDeleted: state.formReducer?.fixedImagesDeleted ?? [],
    eventDetails: state.eventReducer?.eventDetails,
    shortDescriptionEng: state.formReducer?.shortDescriptionEng ?? "",
    shortDescriptionArm: state.formReducer?.shortDescriptionArm ?? "",
    shortDescriptionRu: state.formReducer?.shortDescriptionRu ?? "",
    fetch: state.imageReducer.fetch,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addEventDetails: (blockData) => dispatch(addEventDetails(blockData)),
    addEventBlock: (blockData, callback) =>
      dispatch(addEventBlock(blockData, callback)),
    fetchEventDetails: (id) => dispatch(fetchEventDetails(id)),
    addEventShortDescription: (data) =>
      dispatch(addEventShortDescription(data)),
    deleteEventBlock: (id) => dispatch(deleteEventBlock(id)),
    editEventBlock: (block, callback) =>
      dispatch(editEventBlock(block, callback)),
    formOnChange: (key, value) => dispatch(formOnChange(key, value)),
    cleanImages: () => dispatch(cleanImages()),
    cleanVideos: () => dispatch(cleanVideos()),
    cleanImagesWithKey: (key) => dispatch(cleanImagesWithKey(key)),
    cleanVideosWithKey: (key) => dispatch(cleanVideosWithKey(key)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CreateEventDetails);
