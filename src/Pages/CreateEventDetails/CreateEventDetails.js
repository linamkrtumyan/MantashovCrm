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
} from "../../store";
import VideoUpload from "../../Components/Forms/VideoUpload/VideoUpload";
import { useHistory } from "react-router-dom";

function CreateEventDetails({
  eventId,
  image,
  headers,
  addEventDetails,
  eventDetailsBlocks,
  uploadedPhotos,
  video,
  imgUrls,
  videoUrls,
  addEventBlock,
}) {
  const [images, setImages] = useState([]);
  const [open, setOpen] = useState(false);
  const [renderContent, setRenderContent] = useState(0);
  const [newBlock, setNewBlock] = useState({});
  const [shortDescription, setShortDescription] = useState("");
  const [forRender, setForRender] = useState(0);
  const [requiredClass, setRequiredClass] = useState("");
  const [blockLinks, setBlockLinks] = useState();

  let history = useHistory();

  useEffect(() => {
    for (let i = 0; i < eventDetailsBlocks.length; i++) {
      eventDetailsBlocks[i].id = i;
    }
  }, [eventDetailsBlocks]);

  useEffect(() => {
    let headersUrls = [];
    headers.map((img) => {
      headersUrls.push(img.url);
    });
    setImages(headersUrls.concat(uploadedPhotos));
  }, [headers, uploadedPhotos]);

  useEffect(() => {
    setNewBlock({
      ...newBlock,
      blockImages: image ?? [],
      blockVideos: video ?? [],
      imgUrls,
      videoUrls,
    });
  }, [image, video]);

  useEffect(() => {
    let links = blockLinks && blockLinks !== "" ? blockLinks.split("\n") : [];
    setNewBlock({
      ...newBlock,
      links,
    });
  }, [blockLinks]);

  const openField = () => {
    setOpen(true);
  };

  const saveBlockData = () => {
    if (newBlock.topTextEng !== "") {
      let links = blockLinks ? blockLinks.split("\n") : [];
      setNewBlock({
        ...newBlock,
        links,
      });

      eventDetailsBlocks.push(newBlock);
      setRenderContent(renderContent + 1);
      addEventDetails(eventDetailsBlocks);
      addEventBlock({ eventId, block: newBlock });
      setNewBlock({});
      cleanImages();
      setShortDescription("");
      cleanVideos();
    } else {
      setRequiredClass("requiredField");
    }
  };

  const handleDelete = (block) => {
    const index = eventDetailsBlocks.indexOf(block);
    eventDetailsBlocks.splice(index, 1);
    setRenderContent(renderContent + 1);
    addEventDetails(eventDetailsBlocks);
  };

  const sendData = () => {
    eventDetailsBlocks.map((item) => {
      const linksArr = item.links ? item.links.split("\n") : [];
      item.links = linksArr;
    });

    let headersImages = [];
    headers?.map((img) => {
      headersImages.push(img.name);
    });

    let dataToSend = {
      eventId,
      eventDetailsBlocks,
      uploadedPhotos,
      eventFixedDescription: shortDescription,
      headers: headersImages,
    };
    console.log({ dataToSend });
    cleanImages();
    cleanVideos();
    cleanForm();
    // here must be function call of details add_________________________________
    // history.push("/events");
  };

  const deleteImageFromBlock = (img) => {
    // deleteImageFromStore(a);
    // setDelindex(a);
  };

  return (
    <div className="event-card-desc">
      <div className="applicant_page_title_container">
        <p className="applicant_page_title">Event Details</p>
      </div>
      <div className="images_container">
        {headers && headers.length
          ? headers.map((image) => (
              <img
                src={image.url}
                alt=""
                className="uploaded_image"
                key={image}
              />
            ))
          : null}
      </div>
      <div style={{ marginLeft: 30 }}>
        <ImageUpload
          limit={true}
          label="Upload Fixed Images"
          containerClassName="uploaded"
        />
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
                  htmlFor="eventFixedDescription"
                  className={shortDescription === "" ? requiredClass : ""}
                >
                  Short Description
                </label>

                <textarea
                  className="add_news_input textarea eventText"
                  value={shortDescription}
                  onChange={(e) => {
                    setShortDescription(e.target.value);
                  }}
                />
              </div>

              <div style={{ marginTop: 20 }}>
                <label
                  htmlFor="descriptionEng1"
                  className={shortDescription === "" ? requiredClass : ""}
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
                limit={false}
                label="Upload Images"
                containerClassName="uploaded"
              />
              <VideoUpload
                label="Upload Videos"
                containerClassName="uploaded"
              />
            </div>

            <div>
              <div style={{ marginTop: 20 }}>
                <label htmlFor="descriptionEng2">Description 2</label>

                <textarea
                  className="add_news_input textarea"
                  value={newBlock.topTextEng ? newBlock.bottomTextEng : ""}
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
                    // setNewBlock({
                    //   ...newBlock,
                    //   links: e.target.value,
                    // });
                  }}
                />
              </div>
            </div>
            <div>
              <Button
                onClick={saveBlockData}
                title="Save"
                className="action_btn"
              />
            </div>
            <div>
              {eventDetailsBlocks && eventDetailsBlocks.length
                ? eventDetailsBlocks.map((block, index) => (
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
                              const index = eventDetailsBlocks.indexOf(block);
                              eventDetailsBlocks[index].topTextEng =
                                e.target.value;
                              // formOnChange("editedAndAddedAgendas", agendas);
                              addEventDetails(eventDetailsBlocks);
                            }}
                          />
                        </div>
                        <div className="input_container">
                          <label htmlFor="descriptionArm1">Նկարագիր 1</label>

                          <textarea
                            className="textarea"
                            defaultValue={block.topTextArm}
                          />
                        </div>
                        <div className="input_container">
                          <label htmlFor="descriptionRu1">Описание 1</label>

                          <textarea
                            className="textarea"
                            defaultValue={block.topTextRu}
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
                        />
                      </div>
                      <div style={{ display: "flex " }}>
                        {block.imgUrls && block.imgUrls.length
                          ? block.imgUrls.map((img) => {
                              // console.log({ urls: block.imgUrls, img }, "kkk");
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
                                          block.imgUrls.indexOf(img);
                                        const newArr = block.imgUrls.slice(
                                          indexImg,
                                          1
                                        );
                                        const indexBlock =
                                          eventDetailsBlocks.indexOf(block);
                                        eventDetailsBlocks[indexBlock].imgUrls =
                                          newArr;
                                        setForRender(forRender + 1);
                                        addEventDetails(eventDetailsBlocks);
                                      }}
                                    >
                                      <svg
                                        viewBox="0 0 24 24"
                                        className="close"
                                      >
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
                              const index = eventDetailsBlocks.indexOf(block);
                              eventDetailsBlocks[index].bottomTextEng =
                                e.target.value;
                              // formOnChange("editedAndAddedAgendas", agendas);
                              addEventDetails(eventDetailsBlocks);
                            }}
                          />
                        </div>
                        <div className="input_container">
                          <label htmlFor="descriptionArm2">Նկարագիր 2</label>

                          <textarea
                            className="textarea"
                            defaultValue={block.bottomTextArm}
                          />
                        </div>
                        <div className="input_container">
                          <label htmlFor="descriptionRu2">Описание 2</label>

                          <textarea
                            className="textarea"
                            defaultValue={block.bottomTextRu}
                          />
                        </div>
                      </div>
                      {block.videoUrls && block.videoUrls.length
                        ? block.videoUrls.map((video) => {
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
                                    onClick={() =>
                                      // deleteVideo(source.indexOf(video))
                                      {
                                        const indexImg =
                                          block.videoUrls.indexOf(video);
                                        const newArr = block.videoUrls.slice(
                                          indexImg,
                                          1
                                        );
                                        const indexBlock =
                                          eventDetailsBlocks.indexOf(block);
                                        eventDetailsBlocks[
                                          indexBlock
                                        ].videoUrls = newArr;
                                        setForRender(forRender + 1);
                                        addEventDetails(eventDetailsBlocks);
                                      }
                                    }
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
                      <div style={{ display: "flex" }}>
                        <Button
                          title="Delete"
                          onClick={() => handleDelete(block)}
                          className="action_btn cancel_btn"
                        />

                        <Button
                          title="Edit"
                          // onClick={() => handleEdit(block)}
                          className="action_btn cancel_btn"
                        />
                      </div>
                    </div>
                  ))
                : null}
            </div>
            {eventDetailsBlocks.length ? (
              <Button title="Send" className="action_btn" onClick={sendData} />
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    eventId: state.eventReducer.eventId,
    image: state.imageReducer?.image,
    video: state.videoReducer?.video,
    headers: state.imageReducer?.headers,
    eventDetailsBlocks: state.eventReducer.eventDetailsBlocks,
    uploadedPhotos: state.eventReducer.uploadedPhotos,
    imgUrls: state.imageReducer?.imgUrls,
    videoUrls: state.videoReducer?.videoUrls,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addEventDetails: (blockData) => dispatch(addEventDetails(blockData)),
    addEventBlock: (blockData) => dispatch(addEventBlock(blockData)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CreateEventDetails);
