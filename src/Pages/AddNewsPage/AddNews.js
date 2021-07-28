import React, { useEffect, useState } from "react";
import Input from "../../Components/Forms/Input/Input";
import Textarea from "../../Components/Forms/Textarea/Textarea";
import Button from "../../Components/Forms/Button/Button";
import "./addNewsPage.css";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import store from "../../store";
import { addNews } from "../../store/news/actions/addNews";
import ImageUpload from "../../Components/Forms/ImageUpload/ImageUpload";
import OneImageUpload from "../../Components/Forms/OneImageUpload.js/OneImageUpload";

function AddNews({ addNews }) {
  const history = useHistory();
  const path = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    let { title, text } = store.getState().formReducer;
    const image = store.getState().imageReducer.image;
    const header = store.getState().imageReducer.header[0];
    const changePath = () => {
      path.push("/news");
    };
    let news = {
      title,
      text,
      header,
      images: image,
    };
    addNews(news, changePath);
  };

  return (
    <div>
      <button onClick={() => history.goBack()} className="arrow_left">
        ❮
      </button>
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
  console.log(state);
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    addNews: (news, changePath) => dispatch(addNews(news, changePath)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AddNews);
