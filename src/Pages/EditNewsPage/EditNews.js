import React, { useEffect, useState } from "react";
import Input from "../../Components/Forms/Input/Input";
import Textarea from "../../Components/Forms/Textarea/Textarea";
import Button from "../../Components/Forms/Button/Button";
import "./editNews.css";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { toast } from "react-toastify";

import store, {
  fetchNewsDetails,
  editNews,
  cleanImages,
  deleteNewsImageFromStore,
  formOnChange,
  addNewsBlock,
  getNewsDetails,
  cleanVideos,
  deleteNewsBlock,
  editNewsBlock,
  cleanForm,
} from "../../store";
import ImageUpload from "../../Components/Forms/ImageUpload/ImageUpload";
import { deletedImages } from "../../store/images/actions";
import OneImageUpload from "../../Components/Forms/OneImageUpload/OneImageUpload";
import OpenImage from "../EventsPage/components/images/OpenImage";
import { scrollToView } from "../../helpers/scrollToView";
import VideoUpload from "../../Components/Forms/VideoUpload/VideoUpload";

function EditNews({
  fetchNewsDetails,
  news,
  editNews,
  cleanImages,
  deletedImages,
  header,
  deleteNewsImageFromStore,
  detailsImages,
  formOnChange,
  video,
  image,
  addNewsBlock,
  getNewsDetails,
  deleteNewsBlock,
  editNewsBlock,
  headers,
  fixedImages,
  fixedImagesDeleted,
  newsDetails,
  headerImage,
}) {
  const [mainImg, setMainImg] = useState(true);
  const [isActive, setIsActive] = useState(true);
  const [openImgModal, setOpenImgModal] = useState(false);
  const [imgPath, setImgPath] = useState("");
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

  const history = useHistory();
  const path = useHistory();
  let { id } = useParams();
  useEffect(() => {
    fetchNewsDetails(id);
    return () => {
      cleanImages();
    };
  }, []);

  useEffect(() => {
    getNewsDetails(parseInt(id));
  }, [renderContent, id]);

  const handleCancel = () => {
    history.push("/news");
  };

  useEffect(() => {
    setDetails(newsDetails);
  }, [newsDetails]);

  useEffect(() => {
    let headersUrls = [];
    headers.map((img) => {
      headersUrls.push(img.url);
    });
  }, [headers]);

  const handleCreate = (e) => {
    e.preventDefault();
    let { titleArm, titleEng, titleRu } = store.getState().formReducer;
    // const addedImages = store.getState().imageReducer.image;
    // const deleted = store.getState().imageReducer.deletedImages;

    let header = store.getState().imageReducer.header;
    if (header.length) {
      header = header.pop().name;
    } else {
      header = null;
    }
    // const changePath = () => {
    //   path.push("/news");
    // };

    let news = {
      titleArm,
      titleEng,
      titleRu,
      isActive,
      headerDeleted: !mainImg,
      id,
      header,
      // addedImages: addedImages,
      // deletedImages: deleted,
    };

    editNews(news);
  };

  const openImageModal = (imagePath) => {
    setImgPath(imagePath);
    setOpenImgModal(true);
  };

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
      addNewsBlock({ newsId: parseInt(id), block: newBlock });
      getNewsDetails(parseInt(id));
      setNewBlock({});
      setBlockLinks("");
      cleanImages();
      cleanVideos();
      formOnChange(`shortDescriptionEng`, "");
      formOnChange(`shortDescriptionArm`, "");
      formOnChange(`shortDescriptionRu`, "");
      formOnChange(`blockImages`, []);
      formOnChange(`blockVideos`, []);
    } else {
      setRequiredClass("requiredField");
    }
  };

  const handleDelete = (id) => {
    deleteNewsBlock(id);
    setRenderContent(renderContent + 1);
  };

  const handleEdit = (editedBlock) => {
    editedBlock.deletedImages = [];
    editedBlock.addedImages =
      store.getState().imageReducer[`block${editedBlock.id}`] ?? [];
    editedBlock.deletedVideos = [];
    editedBlock.addedVideos =
      store.getState().videoReducer[`videoBlock${editedBlock.id}`] ?? [];
    editNewsBlock(editedBlock);
    toast.dark("Edited");
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
      id: parseInt(id),
      addedImages,
      deletedImages,
    };
    cleanImages();
    cleanVideos();
    cleanForm();
    history.push("/news");
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
    editNewsBlock(blockData);
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
    editNewsBlock(blockData);
    setRenderContent(renderContent + 1);
  };

  return (
    <>
      {/* <OpenImage
        openImgModal={openImgModal}
        setOpenImgModal={setOpenImgModal}
        imgPath={imgPath}
        id={id}
        folderPath="/images/news"
        detailsImages={detailsImages}
      /> */}

      <div>
        <button onClick={() => history.goBack()} className="arrow_left">
          ❮
        </button>
        <div className="edit_news_container">
          <div className="edit_member_title">Edit News</div>
          <form onFocus={scrollToView} onSubmit={handleCreate} className="">
            <div className="add_member_component">
              <div className="add_news_container">
                <div className="add_news_img">
                  <div style={{ marginBottom: "20px" }}>
                    {/* <OneImageUpload label="Header Image" /> */}
                    {mainImg ? (
                      <div className="upload_cont">
                        <img
                          className="uploaded_image"
                          src={`${headerImage}`}
                          alt=""
                        />
                        <div className="middle">
                          <div onClick={() => setMainImg(false)}>
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
                    ) : (
                      <OneImageUpload label="Header Image" />
                    )}
                  </div>
                </div>
                <div>
                  <div className="news_inputs_container">
                    <Textarea
                      id="titleEng"
                      type="text"
                      placeholder="Title"
                      className="add_news_input"
                      textareaSize="textareaSize"
                    />
                  </div>
                  <div className="news_inputs_container">
                    <Textarea
                      id="titleArm"
                      type="text"
                      placeholder="Վերնագիր"
                      className="add_news_input"
                      textareaSize="textareaSize"
                    />
                  </div>

                  <div className="news_inputs_container">
                    <Textarea
                      id="titleRu"
                      type="text"
                      placeholder="Заглавие"
                      className="add_news_input"
                      textareaSize="textareaSize"
                    />
                    <button
                      onClick={() => setIsActive(!isActive)}
                      style={{
                        width: "800px",
                        marginLeft: "10px",
                      }}
                      type="button"
                      className={isActive ? "button red" : "button"}
                    >
                      {/* <input type="checkbox" /> */}
                      <p>{isActive ? "Active" : "Passive"}</p>
                    </button>
                  </div>
                </div>
              </div>

              {/* <Textarea type="text" placeholder="Text" /> */}
            </div>

            <div className="action_container">
              <div>
                <Button
                  onClick={() => handleCancel()}
                  title="Cancel"
                  className="action_btn cancel_btn"
                />
              </div>
              <div>
                <Button
                  onFocus={(e) => e.stopPropagation()}
                  title="Save Changes"
                  className="action_btn"
                />
              </div>
            </div>
          </form>
        </div>
      </div>

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
                disabled={
                  newBlock.topTextEng &&
                  newBlock.topTextArm &&
                  newBlock.topTextRu
                    ? false
                    : true
                }
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
                              details.details[index].topTextEng =
                                e.target.value;
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
                              details.details[index].topTextArm =
                                e.target.value;
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
                      <div style={{ display: "flex ", marginBottom: 20 }}>
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
                                      onClick={() =>
                                        // deleteVideo(source.indexOf(video))
                                        {
                                          const indexVid =
                                            block.videos.indexOf(video);
                                          setForRender(forRender + 1);
                                          deleteBlockVideos(block, indexVid);
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
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    header: state.imageReducer.header,
    news: state.newsReducer.newsDetails,
    detailsImages: state.newsReducer.detailsImages,
    image: state.imageReducer?.image,
    video: state.videoReducer?.video,
    headers: state.imageReducer?.headers,
    fixedImages: state.formReducer?.fixedImages ?? [],
    fixedImagesDeleted: state.formReducer?.fixedImagesDeleted ?? [],
    newsDetails: state.newsReducer?.newsDetails,
    headerImage: state.formReducer?.image ?? "",
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    formOnChange: (key, value) => dispatch(formOnChange(key, value)),
    fetchNewsDetails: (id) => dispatch(fetchNewsDetails(id)),
    editNews: (news, changePath) => dispatch(editNews(news, changePath)),
    cleanImages: () => dispatch(cleanImages()),
    deletedImages: (img) => dispatch(deletedImages(img)),
    deleteNewsImageFromStore: (id) => dispatch(deleteNewsImageFromStore(id)),
    addNewsBlock: (blockData) => dispatch(addNewsBlock(blockData)),
    getNewsDetails: (id) => dispatch(getNewsDetails(id)),
    deleteNewsBlock: (id) => dispatch(deleteNewsBlock(id)),
    editNewsBlock: (block) => dispatch(editNewsBlock(block)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(EditNews);
