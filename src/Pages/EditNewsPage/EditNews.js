import React, { useEffect } from "react";
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
  const history = useHistory();
  const path = useHistory();
  let { id } = useParams();
  useEffect(() => {
    fetchNewsDetails(id);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    let { title, text } = store.getState().formReducer;
    const addedImages = store.getState().imageReducer.image;
    // console.log(typeof addedImages);
    const deleted = store.getState().imageReducer.deletedImages;
    const header = store.getState().imageReducer.header[0];

    const changePath = () => {
      path.push("/news");
    };

    let news = {
      id,
      title,
      text,
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

        <form className="edit_member_component" onSubmit={handleSubmit}>
          <OneImageUpload label="Change header image" />

          {!header ? (
            <img
              alt=""
              className="edit_header_image"
              src={`/api/image/?page=newsHeader&id=${id}&name=header.png`}
            />
          ) : null}

          <Input type="text" className="news_edit_input" id="title" />

          <Textarea
            type="text"
            placeholder="Text"
            className="news_edit_textarea"
            id="text"
          />

          <div>All images</div>
          <div className="edit_news_images_container">
            {detailsImages.map((image, index) => {
              const imagePath = `/api/image/?page=news&id=${id}&name=${image}`;
              return (
                <div
                  className="edit_news_image_item"
                  key={index}
                  // onClick={() => {
                  //   deletedImages(image);
                  // }}
                >
                  <img alt="" className="edit_news_images" src={imagePath} />
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

          <ImageUpload
            label="Upload new images"
            className="edit_images_upload_contaner"
            containerClassName="edit_news_uploaded_images_container"
          />

          <div className="action_container">
            <Button title="Cancel" className="action_btn cancel_btn" />

            <Button title="Save" className="action_btn" />
          </div>
        </form>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  // console.log(state, "news card state");
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
