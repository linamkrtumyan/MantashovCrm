import React, { useEffect, useState } from "react";
import Input from "../../Components/Forms/Input/Input";
import Textarea from "../../Components/Forms/Textarea/Textarea";
import Button from "../../Components/Forms/Button/Button";
import "./addNewsPage.css";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { uploadImage } from "../../store";
import store from "../../store";
import { addNews } from "../../store/news/actions/addNews";
import ImageUpload from "../../Components/Forms/ImageUpload/ImageUpload";
import OneImageUpload from "../../Components/Forms/OneImageUpload.js/OneImageUpload";

function AddNews({ uploadImage, addNews }) {
  const [image, setImage] = useState("");
  const history = useHistory();

  const onImageChange = (event) => {
    // console.log(event.target.files[0], "event");
    // setImage(event.target.files[0]);
    uploadImage(event.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let { title, text } = store.getState().formReducer;
    // const images = new Array();
    const image = store.getState().imageReducer.image;
    const header = store.getState().imageReducer.header[0];

    // let {}
    let news = {
      title,
      text,
      header,
      images: image,
    };
    // console.log(news, "***news***");
    addNews(news);
  };

  return (
    <div>
      <button onClick={() => history.goBack()} className="arrow_left">
        ❮
      </button>
      {/* <button onClick={() => history.goBack()}>Go Back</button> */}
      <form onSubmit={handleSubmit} className="add_news_container">
        <div className="add_member_title">Add News</div>

        <div className="add_member_component">
          <OneImageUpload label="Upload Header Image" />
          <Input id="title" type="text" placeholder="Title" />
          <Input id="text" type="text" placeholder="Text" />
          {/* <Textarea type="text" placeholder="Text" /> */}
          <ImageUpload label="Upload Images" />
        </div>

        <div className="action_container">
          <Button title="Cancel" className="action_btn cancel_btn" />

          <Button title="Create" className="action_btn" />
        </div>
      </form>
    </div>
  );
}

const mapStateToProps = (state) => {
  // console.log(state, "add news state ");
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    // onLoginFunction: (login) => dispatch(onLoginFunction(login)),
    uploadImage: (img) => dispatch(uploadImage(img)),
    addNews: (news) => dispatch(addNews(news)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AddNews);
