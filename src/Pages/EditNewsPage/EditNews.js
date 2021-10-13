import React, { useEffect, useState } from "react";
import Input from "../../Components/Forms/Input/Input";
import Textarea from "../../Components/Forms/Textarea/Textarea";
import Button from "../../Components/Forms/Button/Button";
import "./editNews.css";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import store, {
  fetchNewsDetails,
  editNews,
  cleanImages,
  deleteNewsImageFromStore,
} from "../../store";
import ImageUpload from "../../Components/Forms/ImageUpload/ImageUpload";
import { deletedImages } from "../../store/images/actions";
import OneImageUpload from "../../Components/Forms/OneImageUpload.js/OneImageUpload";

function EditNews({
  fetchNewsDetails,
  news,
  editNews,
  cleanImages,
  deletedImages,
  header,
  deleteNewsImageFromStore,
  detailsImages,
}) {
  // console.log(news, "news");
  const [mainImg, setMainImg] = useState(true);
  const [isActive, setIsActive] = useState(true);

  const history = useHistory();
  const path = useHistory();
  let { id } = useParams();
  useEffect(() => {
    fetchNewsDetails(id);
  }, []);

  const handleCancel = () => {
    history.push("/news");
  };

  const handleCrate = (e) => {
    e.preventDefault();
    let { titleArm, titleEng, titleRu, textArm, textEng, textRu } =
      store.getState().formReducer;
    const addedImages = store.getState().imageReducer.image;
    // console.log(typeof addedImages);
    const deleted = store.getState().imageReducer.deletedImages;
    const header = store.getState().imageReducer.header[0];

    const changePath = () => {
      path.push("/news");
    };

    let news = {
      titleArm,
      titleEng,
      titleRu,
      textArm,
      textEng,
      textRu,
      isActive,
      headerDeleted: !mainImg,
      id,
      header,
      addedImages: addedImages,
      deletedImages: deleted,
    };

    // console.log(news, "news send");
    editNews(news, changePath);
    cleanImages();
  };

  function getImages(name) {
    // console.log(name, "img name");
  }

  return (
    <div>
      <button onClick={() => history.goBack()} className="arrow_left">
        ❮
      </button>
      <div className="edit_news_container">
        <div className="edit_member_title">Edit News</div>
        <div>
          {/* <form onSubmit={handleSubmit} className=""> */}
          <div className="add_member_component">
            <div className="add_news_container">
              <div className="add_news_img">
                <div style={{ marginBottom: "20px" }}>
                  {/* <OneImageUpload label="Header Image" /> */}
                  {mainImg ? (
                    <div className="upload_cont">
                      <img
                        className="uploaded_image"
                        src={`/images/newsHeader/${id}/header.png`}
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
                <div>
                  {/* <div style={{ margin: "10px" }}> */}
                  <div>All images</div>
                  <div className="edit_news_images_container">
                    {detailsImages.map((image, index) => {
                      const imagePath = `/images/news/${id}/${image}`;
                      return (
                        <div
                          className="edit_news_image_item"
                          key={index}
                          // onClick={() => {
                          //   deletedImages(image);
                          // }}
                        >
                          <img
                            alt=""
                            className="edit_news_images"
                            src={imagePath}
                          />
                          <div className="middle">
                            <div
                              onClick={() => {
                                deletedImages(image);
                                deleteNewsImageFromStore(index);
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

                  <ImageUpload label="Images" />
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

                  <Textarea
                    id="textEng"
                    type="text"
                    placeholder="Text"
                    className="add_news_textarea"
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

                  <Textarea
                    id="textArm"
                    type="text"
                    placeholder="Տեքստ"
                    className="add_news_textarea"
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

                  <Textarea
                    id="textRu"
                    type="text"
                    placeholder="Текст"
                    className="add_news_textarea"
                  />
                  <button
                    onClick={() => setIsActive(!isActive)}
                    style={{
                      width: "800px",
                      marginLeft: "10px",
                    }}
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
            <div onClick={() => handleCancel()}>
              <Button title="Cancel" className="action_btn cancel_btn" />
            </div>
            <div onClick={(e) => handleCrate(e)}>
              <Button title="Save" className="action_btn" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  // console.log(state, "state news edit");
  return {
    header: state.imageReducer.header,
    news: state.newsReducer.newsDetails,
    detailsImages: state.newsReducer.detailsImages,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchNewsDetails: (id) => dispatch(fetchNewsDetails(id)),
    editNews: (news, changePath) => dispatch(editNews(news, changePath)),
    cleanImages: () => dispatch(cleanImages()),
    deletedImages: (img) => dispatch(deletedImages(img)),
    deleteNewsImageFromStore: (id) => dispatch(deleteNewsImageFromStore(id)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(EditNews);
