import React, { useEffect, useState } from "react";
import "./createEventDetails.css";
import { connect } from "react-redux";
import ImageUpload from "../../Components/Forms/ImageUpload/ImageUpload";
import Textarea from "../../Components/Forms/Textarea/Textarea";
import Button from "../../Components/Forms/Button/Button";
import store, { addEventDetails } from "../../store";
import VideoUpload from "../../Components/Forms/VideoUpload/VideoUpload";

function CreateEventDetails({
  eventId,
  image,
  headers,
  addEventDetails,
  eventDetailsBlocks,
  uploadedPhotos,
  video,
}) {
  const [images, setImages] = useState([]);
  const [open, setOpen] = useState(false);
  const [renderContent, setRenderContent] = useState(0);
  const [newBlock, setNewBlock] = useState({});

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
      blockImages: image,
      blockVideos: video,
    });
  }, [image, video]);

  const openField = () => {
    setOpen(true);
  };

  const saveBlockData = () => {
    // if (newBlock.length) {

    setNewBlock({
      ...newBlock,
      id: eventDetailsBlocks.length,
    });
    eventDetailsBlocks.push(newBlock);
    setRenderContent(renderContent + 1);
    addEventDetails(eventDetailsBlocks);
    setNewBlock({});
    // }
  };

  const handleDelete = (block) => {
    const index = eventDetailsBlocks.indexOf(block);
    eventDetailsBlocks.splice(index, 1);
    setRenderContent(renderContent + 1);
    addEventDetails(eventDetailsBlocks);
  };

  const sendData = () => {
    eventDetailsBlocks.map((item) => {
      const linksArr = item.links ? item.links.split(" ") : [];
      item.links = linksArr;
    });

    let dataToSend = {
      eventId,
      eventDetailsBlocks,
      images,
    };
    console.log({ dataToSend });
    // here must be function call of details add_________________________________
  };

  return (
    <div className="event-card-desc">
      <div className="images_container">
        {images && images.length
          ? images.map((image) => (
              <img src={image} alt="" className="uploaded_image" key={image} />
            ))
          : null}
      </div>
      <div className="opened_field_container">
        <div className="plus_icon" onClick={openField}>
          <i className="fas fa-solid fa-plus"></i>
        </div>
        {open && (
          <div className="container_body" style={{ paddingBottom: 20 }}>
            <div>
              <div style={{ marginTop: 20 }}>
                <label htmlFor="descriptionEng1">Description 1</label>

                <textarea
                  className="add_news_input textarea eventText"
                  value={
                    newBlock.eventDescriptionEng1
                      ? newBlock.eventDescriptionEng1
                      : ""
                  }
                  onChange={(e) => {
                    setNewBlock({
                      ...newBlock,
                      eventDescriptionEng1: e.target.value,
                    });
                  }}
                />
              </div>
              <div style={{ marginTop: 20 }}>
                <label htmlFor="descriptionArm1">Նկարագիր 1</label>

                <textarea
                  className="add_news_input textarea"
                  value={
                    newBlock.eventDescriptionArm1
                      ? newBlock.eventDescriptionArm1
                      : ""
                  }
                  onChange={(e) => {
                    setNewBlock({
                      ...newBlock,
                      eventDescriptionArm1: e.target.value,
                    });
                  }}
                />
              </div>
              <div style={{ marginTop: 20 }}>
                <label htmlFor="descriptionArm1">Описание 1</label>

                <textarea
                  className="add_news_input textarea"
                  value={
                    newBlock.eventDescriptionRu1
                      ? newBlock.eventDescriptionRu1
                      : ""
                  }
                  onChange={(e) => {
                    setNewBlock({
                      ...newBlock,
                      eventDescriptionRu1: e.target.value,
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
                  value={
                    newBlock.eventDescriptionEng2
                      ? newBlock.eventDescriptionEng2
                      : ""
                  }
                  onChange={(e) => {
                    setNewBlock({
                      ...newBlock,
                      eventDescriptionEng2: e.target.value,
                    });
                  }}
                />
              </div>

              <div style={{ marginTop: 20 }}>
                <label htmlFor="descriptionArm2">Նկարագիր 2</label>

                <textarea
                  className="add_news_input textarea"
                  value={
                    newBlock.eventDescriptionArm2
                      ? newBlock.eventDescriptionArm2
                      : ""
                  }
                  onChange={(e) => {
                    setNewBlock({
                      ...newBlock,
                      eventDescriptionArm2: e.target.value,
                    });
                  }}
                />
              </div>
              <div style={{ marginTop: 20 }}>
                <label htmlFor="descriptionRu2">Описание 2</label>

                <textarea
                  className="add_news_input textarea"
                  value={
                    newBlock.eventDescriptionRu2
                      ? newBlock.eventDescriptionRu2
                      : ""
                  }
                  onChange={(e) => {
                    setNewBlock({
                      ...newBlock,
                      eventDescriptionRu2: e.target.value,
                    });
                  }}
                />
              </div>
            </div>
            <div style={{ marginTop: 20 }}>
              <div>
                <label htmlFor="links">
                  Links (input links separated by space)
                </label>

                <textarea
                  className="add_news_input textarea"
                  value={newBlock.links ? newBlock.links : ""}
                  onChange={(e) => {
                    setNewBlock({
                      ...newBlock,
                      links: e.target.value,
                    });
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
                            defaultValue={block.eventDescriptionEng1}
                            onChange={(e) => {
                              const index = eventDetailsBlocks.indexOf(block);
                              eventDetailsBlocks[index].eventDescriptionEng1 =
                                e.target.value;
                              // formOnChange("editedAndAddedAgendas", agendas);
                              addEventDetails(eventDetailsBlocks);
                            }}
                          />
                        </div>
                        <div className="input_container">
                          <label htmlFor="descriptionEng1">Նկարագիր 1</label>

                          <textarea
                            className="textarea"
                            defaultValue={block.eventDescriptionArm1}
                          />
                        </div>
                        <div className="input_container">
                          <label htmlFor="descriptionEng1">Описание 1</label>

                          <textarea
                            className="textarea"
                            defaultValue={block.eventDescriptionRu1}
                          />
                        </div>
                      </div>
                      {/* <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                      </div> */}
                      <div>
                        <label htmlFor="descriptionEng1">
                          Links (input links separated by space)
                        </label>

                        <textarea
                          className="textarea"
                          defaultValue={block.links}
                        />
                      </div>
                      <Button
                        title="Delete"
                        onClick={() => handleDelete(block)}
                        className="action_btn cancel_btn"
                      />
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
  console.log(state, "::::::::::");
  return {
    eventId: state.eventReducer.eventId,
    image: state.imageReducer?.image,
    video: state.videoReducer?.video,
    headers: state.imageReducer?.headers,
    eventDetailsBlocks: state.eventReducer.eventDetailsBlocks,
    uploadedPhotos: state.eventReducer.uploadedPhotos,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addEventDetails: (blockData) => dispatch(addEventDetails(blockData)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CreateEventDetails);
