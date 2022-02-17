import React, { useEffect, useState } from "react";
// import "./createEventDetails.css";
import { connect } from "react-redux";
import ImageUpload from "../../Components/Forms/ImageUpload/ImageUpload";
import Button from "../../Components/Forms/Button/Button";
import { addNewsDetails, cleanImages, cleanVideos } from "../../store";
import VideoUpload from "../../Components/Forms/VideoUpload/VideoUpload";
import { useHistory } from "react-router-dom";

function CreateNewsDetails({
  newsId,
  image,
  headers,
  addNewsDetails,
  newsDetailsBlocks,
  uploadedPhotos,
  video,
  imgUrls,
  videoUrls,
}) {
  const [images, setImages] = useState([]);
  const [open, setOpen] = useState(false);
  const [renderContent, setRenderContent] = useState(0);
  const [newBlock, setNewBlock] = useState({});
  const [shortDescription, setShortDescription] = useState("");
  const [forRender, setForRender] = useState(0);
  const [requiredClass, setRequiredClass] = useState("");

  let history = useHistory();

  useEffect(() => {
    for (let i = 0; i < newsDetailsBlocks.length; i++) {
      newsDetailsBlocks[i].id = i;
    }
  }, [newsDetailsBlocks]);

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
      imgUrls,
      videoUrls,
    });
  }, [image, video]);

  const openField = () => {
    setOpen(true);
  };

  const saveBlockData = () => {
    if (shortDescription !== "") {
      console.log({ requiredClass });
      setNewBlock({
        ...newBlock,
        id: newsDetailsBlocks.length,
      });
      newsDetailsBlocks.push(newBlock);
      setRenderContent(renderContent + 1);
      addNewsDetails(newsDetailsBlocks);
      setNewBlock({});
      cleanImages();
      setShortDescription("");
      cleanVideos();
    } else {
      setRequiredClass("requiredField");
    }
  };

  const handleDelete = (block) => {
    const index = newsDetailsBlocks.indexOf(block);
    newsDetailsBlocks.splice(index, 1);
    setRenderContent(renderContent + 1);
    addNewsDetails(newsDetailsBlocks);
  };

  const sendData = () => {
    newsDetailsBlocks.map((item) => {
      const linksArr = item.links ? item.links.split("\n") : [];
      item.links = linksArr;
    });
    let dataToSend = {
      newsId,
      newsDetailsBlocks,
      uploadedPhotos,
      newsFixedDescription: shortDescription,
      headers: headers[0]?.name ?? null,
    };
    console.log({ dataToSend });
    // here must be function call of details add_________________________________
    history.push("/news");
  };

  const deleteImageFromBlock = (img) => {
    // deleteImageFromStore(a);
    // setDelindex(a);
  };

  return (
    <div className="event-card-desc">
      <div className="applicant_page_title_container">
        <p className="applicant_page_title">News Details</p>
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
      <div className="opened_field_container">
        <div className="plus_icon" onClick={openField}>
          <i className="fas fa-solid fa-plus"></i>
        </div>
        {open && (
          <div className="container_body" style={{ paddingBottom: 20 }}>
            <div>
              <div style={{ marginTop: 20 }}>
                <label
                  htmlFor="newsFixedDescription"
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
                <label htmlFor="descriptionEng1">Description 1</label>

                <textarea
                  className="add_news_input textarea eventText"
                  value={
                    newBlock.newsDescriptionEng1
                      ? newBlock.newsDescriptionEng1
                      : ""
                  }
                  onChange={(e) => {
                    setNewBlock({
                      ...newBlock,
                      newsDescriptionEng1: e.target.value,
                    });
                  }}
                />
              </div>
              <div style={{ marginTop: 20 }}>
                <label htmlFor="descriptionArm1">Նկարագիր 1</label>

                <textarea
                  className="add_news_input textarea"
                  value={
                    newBlock.newsDescriptionArm1
                      ? newBlock.newsDescriptionArm1
                      : ""
                  }
                  onChange={(e) => {
                    setNewBlock({
                      ...newBlock,
                      newsDescriptionArm1: e.target.value,
                    });
                  }}
                />
              </div>
              <div style={{ marginTop: 20 }}>
                <label htmlFor="descriptionArm1">Описание 1</label>

                <textarea
                  className="add_news_input textarea"
                  value={
                    newBlock.newsDescriptionRu1
                      ? newBlock.newsDescriptionRu1
                      : ""
                  }
                  onChange={(e) => {
                    setNewBlock({
                      ...newBlock,
                      newsDescriptionRu1: e.target.value,
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
                    newBlock.newsDescriptionEng2
                      ? newBlock.newsDescriptionEng2
                      : ""
                  }
                  onChange={(e) => {
                    setNewBlock({
                      ...newBlock,
                      newsDescriptionEng2: e.target.value,
                    });
                  }}
                />
              </div>

              <div style={{ marginTop: 20 }}>
                <label htmlFor="descriptionArm2">Նկարագիր 2</label>

                <textarea
                  className="add_news_input textarea"
                  value={
                    newBlock.newsDescriptionArm2
                      ? newBlock.newsDescriptionArm2
                      : ""
                  }
                  onChange={(e) => {
                    setNewBlock({
                      ...newBlock,
                      newsDescriptionArm2: e.target.value,
                    });
                  }}
                />
              </div>
              <div style={{ marginTop: 20 }}>
                <label htmlFor="descriptionRu2">Описание 2</label>

                <textarea
                  className="add_news_input textarea"
                  value={
                    newBlock.newsDescriptionRu2
                      ? newBlock.newsDescriptionRu2
                      : ""
                  }
                  onChange={(e) => {
                    setNewBlock({
                      ...newBlock,
                      newsDescriptionRu2: e.target.value,
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
              {newsDetailsBlocks && newsDetailsBlocks.length
                ? newsDetailsBlocks.map((block, index) => (
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
                            defaultValue={block.newsDescriptionEng1}
                            onChange={(e) => {
                              const index = newsDetailsBlocks.indexOf(block);
                              newsDetailsBlocks[index].newsDescriptionEng1 =
                                e.target.value;
                              // formOnChange("editedAndAddedAgendas", agendas);
                              addNewsDetails(newsDetailsBlocks);
                            }}
                          />
                        </div>
                        <div className="input_container">
                          <label htmlFor="descriptionArm1">Նկարագիր 1</label>

                          <textarea
                            className="textarea"
                            defaultValue={block.newsDescriptionArm1}
                          />
                        </div>
                        <div className="input_container">
                          <label htmlFor="descriptionRu1">Описание 1</label>

                          <textarea
                            className="textarea"
                            defaultValue={block.newsDescriptionRu1}
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
                                          newsDetailsBlocks.indexOf(block);
                                        newsDetailsBlocks[indexBlock].imgUrls =
                                          newArr;
                                        setForRender(forRender + 1);
                                        addNewsDetails(newsDetailsBlocks);
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
                            defaultValue={block.newsDescriptionEng2}
                            onChange={(e) => {
                              const index = newsDetailsBlocks.indexOf(block);
                              newsDetailsBlocks[index].newsDescriptionEng2 =
                                e.target.value;
                              // formOnChange("editedAndAddedAgendas", agendas);
                              addNewsDetails(newsDetailsBlocks);
                            }}
                          />
                        </div>
                        <div className="input_container">
                          <label htmlFor="descriptionArm2">Նկարագիր 2</label>

                          <textarea
                            className="textarea"
                            defaultValue={block.newsDescriptionArm2}
                          />
                        </div>
                        <div className="input_container">
                          <label htmlFor="descriptionRu2">Описание 2</label>

                          <textarea
                            className="textarea"
                            defaultValue={block.newsDescriptionRu2}
                          />
                        </div>
                      </div>
                      <div style={{ display: "flex " }}>
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
                                            newsDetailsBlocks.indexOf(block);
                                          newsDetailsBlocks[
                                            indexBlock
                                          ].videoUrls = newArr;
                                          setForRender(forRender + 1);
                                          addNewsDetails(newsDetailsBlocks);
                                        }
                                      }
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
                      <Button
                        title="Delete"
                        onClick={() => handleDelete(block)}
                        className="action_btn cancel_btn"
                      />
                    </div>
                  ))
                : null}
            </div>
            {newsDetailsBlocks.length ? (
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
    newsId: state.newsReducer.newsId,
    image: state.imageReducer?.image,
    video: state.videoReducer?.video,
    headers: state.imageReducer?.headers,
    newsDetailsBlocks: state.newsReducer.newsDetailsBlocks,
    uploadedPhotos: state.newsReducer.uploadedPhotos,
    imgUrls: state.imageReducer?.imgUrls,
    videoUrls: state.videoReducer?.videoUrls,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addNewsDetails: (blockData) => dispatch(addNewsDetails(blockData)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CreateNewsDetails);
