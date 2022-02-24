import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import ImageUpload from "../../Components/Forms/ImageUpload/ImageUpload";
import Button from "../../Components/Forms/Button/Button";
import store, {
  cleanImages,
  cleanVideos,
  cleanForm,
  fetchEventDetails,
  deleteEventBlock,
  editNewsBlock,
  formOnChange,
  addNewsBlock,
  getNewsDetails,
  deleteNewsBlock,
} from "../../store";
import VideoUpload from "../../Components/Forms/VideoUpload/VideoUpload";
import { useHistory, useParams } from "react-router-dom";

function CreateNewsDetails({
  image,
  headers,
  video,
  imgUrls,
  videoUrls,
  newsDetails,
  // deleteEventBlock,
  editNewsBlock,
  formOnChange,
  fixedImages,
  fixedImagesDeleted,
  addNewsBlock,
  getNewsDetails,
  deleteNewsBlock,
}) {
  const [open, setOpen] = useState(false);
  const [renderContent, setRenderContent] = useState(0);
  const [newBlock, setNewBlock] = useState({
    blockImages: [],
    blockVideos: [],
  });
  const [forRender, setForRender] = useState(0);
  const [requiredClass, setRequiredClass] = useState("");
  const [blockLinks, setBlockLinks] = useState("");
  const [details, setDetails] = useState([]);

  let history = useHistory();
  let { newsId } = useParams();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    getNewsDetails(parseInt(newsId));
  }, [renderContent, newsId]);

  useEffect(() => {
    setDetails(newsDetails);
  }, [newsDetails]);

  useEffect(() => {
    let headersUrls = [];
    headers.map((img) => {
      headersUrls.push(img.url);
    });
  }, [headers]);

  useEffect(() => {
    setNewBlock({
      ...newBlock,
      blockImages: image ?? [],
      blockVideos: video ?? [],
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
    setNewBlock({
      ...newBlock,

      blockImages: image ?? [],
      blockVideos: video ?? [],
    });
    if (newBlock.topTextEng !== "") {
      let links = blockLinks ? blockLinks.split("\n") : [];
      setNewBlock({
        ...newBlock,
        links,
      });
      setRenderContent(renderContent + 1);
      addNewsBlock({ newsId: parseInt(newsId), block: newBlock });
      getNewsDetails(parseInt(newsId));
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
  };

  const handleDelete = (id) => {
    deleteNewsBlock(id);
    setRenderContent(renderContent + 1);
  };

  const handleEdit = (block) => {
    let editedBlock = block;
    editedBlock.deletedImages = [];
    editedBlock.addedImages = [];
    editedBlock.deletedVideos = [];
    editedBlock.addedVideos = [];
    editNewsBlock(editedBlock);
  };

  const sendData = () => {
    let headersImages = [];
    headers?.map((img) => {
      headersImages.push(img.name);
    });

    let addedImages = [];
    let deletedImages = [];

    fixedImages?.map((img) => {
      addedImages.push(img.name);
    });

    fixedImagesDeleted?.map((img) => {
      deletedImages.push(img.name);
    });

    let dataToSend = {
      id: parseInt(newsId),
      addedImages,
      deletedImages,
    };
    cleanImages();
    cleanVideos();
    cleanForm();
    history.push("/news");
  };

  return (
    <div className="event-card-desc">
      <div className="applicant_page_title_container">
        <p className="applicant_page_title">News Details</p>
      </div>

      <div className="opened_field_container">
        {/* <div className="plus_icon" onClick={openField}>
          <i className="fas fa-solid fa-plus"></i>
        </div> */}
        {/* {open && ( */}
        <div className="container_body" style={{ paddingBottom: 20 }}>
          <div>
            <div style={{ marginTop: 20 }}>
              <label
                htmlFor="topTextEng"
                className={newBlock.topTextEng === "" ? requiredClass : ""}
              >
                Description
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
              <label htmlFor="topTextArm">Նկարագիր</label>

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
              <label htmlFor="topTextRu">Описание</label>

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
            <VideoUpload label="Upload Videos" containerClassName="uploaded" />
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
              title="Save Block"
              className="action_btn"
            />
          </div>
        </div>
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
                                        details.details.indexOf(block);
                                      details.details[indexBlock].images =
                                        newArr;
                                      setForRender(forRender + 1);
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
                                  onClick={() =>
                                    // deleteVideo(source.indexOf(video))
                                    {
                                      const indexImg =
                                        block.videos.indexOf(video);
                                      const newArr = block.videoUrls.slice(
                                        indexImg,
                                        1
                                      );
                                      const indexBlock =
                                        details.details.indexOf(block);
                                      details.details[indexBlock].videos =
                                        newArr;
                                      setForRender(forRender + 1);
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
                        onClick={() => handleDelete(block.id)}
                        className="action_btn cancel_btn"
                      />

                      <Button
                        title="Edit"
                        onClick={() => handleEdit(block)}
                        className="action_btn cancel_btn"
                      />
                    </div>
                  </div>
                );
              })
            : null}
        </div>
        {details && details.details && details.details.length ? (
          <Button title="Send" className="action_btn" onClick={sendData} />
        ) : null}
      </div>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    image: state.imageReducer?.image,
    video: state.videoReducer?.video,
    headers: state.imageReducer?.headers,
    eventDetailsBlocks: state.eventReducer.eventDetailsBlocks,
    fixedImages: state.formReducer?.fixedImages ?? [],
    fixedImagesDeleted: state.formReducer?.fixedImagesDeleted ?? [],
    imgUrls: state.imageReducer?.imgUrls,
    videoUrls: state.videoReducer?.videoUrls,
    newsDetails: state.newsReducer?.newsDetails,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addNewsBlock: (blockData) => dispatch(addNewsBlock(blockData)),
    fetchEventDetails: (id) => dispatch(fetchEventDetails(id)),
    deleteEventBlock: (id) => dispatch(deleteEventBlock(id)),
    editNewsBlock: (block) => dispatch(editNewsBlock(block)),
    formOnChange: (key, value) => dispatch(formOnChange(key, value)),
    getNewsDetails: (id) => dispatch(getNewsDetails(id)),
    deleteNewsBlock: (id) => dispatch(deleteNewsBlock(id)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CreateNewsDetails);
