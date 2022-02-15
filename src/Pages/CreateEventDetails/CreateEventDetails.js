import React, { useEffect, useState } from "react";
import "./createEventDetails.css";
import { connect } from "react-redux";
import ImageUpload from "../../Components/Forms/ImageUpload/ImageUpload";
import Textarea from "../../Components/Forms/Textarea/Textarea";
import Button from "../../Components/Forms/Button/Button";
import store, { addEventDetails } from "../../store";

function CreateEventDetails({
  eventId,
  image,
  headers,
  addEventDetails,
  eventDetailsBlocks,
}) {
  const [images, setImages] = useState([]);
  const [open, setOpen] = useState(false);
  const [renderContent, setRenderContent] = useState(0);
  const [newBlock, setNewBlock] = useState({});

  useEffect(() => {
    // setAllAgendas(agendas);
    for (let i = 0; i < eventDetailsBlocks.length; i++) {
      eventDetailsBlocks[i].id = i;
    }
  }, [eventDetailsBlocks]);

  useEffect(() => {
    setImages(headers.concat(image));
  }, [image, headers]);

  const openField = () => {
    setOpen(true);
  };

  const saveBlockData = () => {
    // // const linksArr = links.split(" ");

    setNewBlock({ ...newBlock, id: eventDetailsBlocks.length });
    eventDetailsBlocks.push(newBlock);
    setRenderContent(renderContent + 1);
    addEventDetails(eventDetailsBlocks);
    setNewBlock({});
  };

  const handleDelete = (block) => {
    const index = eventDetailsBlocks.indexOf(block);
    eventDetailsBlocks.splice(index, 1);
    // setAllAgendas(eventDetailsBlocks);
    setRenderContent(renderContent + 1);
    addEventDetails(eventDetailsBlocks);
  };

  const sendData = () => {
    eventDetailsBlocks.map((item) => {
      const linksArr = item.links ? item.links.split(" ") : [];
      item.links = linksArr;
    });

  };

  return (
    <div className="event-card-desc">
      <div className="images_container">
        {/* {images && images.length
          ? images.map((image) => <img src={} alt="" />)
          : null} */}
      </div>
      <div className="opened_field_container">
        <div className="plus_icon" onClick={openField}>
          <i className="fas fa-solid fa-plus"></i>
        </div>
        {open && (
          <div className="container_body" style={{ paddingBottom: 20 }}>
            <div>
              <div>
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
              <div>
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
              <div>
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
            <div style={{ marginLeft: 11 }}>
              <ImageUpload
                limit={false}
                label="Upload Images"
                containerClassName="uploaded"
              />
              <ImageUpload
                limit={false}
                label="Upload Videos"
                containerClassName="uploaded"
                type="video"
              />
            </div>

            <div>
              <div>
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

              <div>
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
              <div>
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
            <div className="links_container">
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
  // console.log(state, "::::::::::");
  return {
    eventId: state.eventReducer.eventId,
    image: state.imageReducer?.image,
    headers: state.imageReducer?.headers,
    imagesUrls: state.imageReducer?.imagesUrls,
    eventDetailsBlocks: state.eventReducer.eventDetailsBlocks,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addEventDetails: (blockData) => dispatch(addEventDetails(blockData)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CreateEventDetails);
