import React, { useEffect, useState } from "react";
import Input from "../../Components/Forms/Input/Input";
import Textarea from "../../Components/Forms/Textarea/Textarea";
import Button from "../../Components/Forms/Button/Button";
// import "./addNewsPage.css";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import store from "../../store";
import { addNews } from "../../store/news/actions/addNews";
import ImageUpload from "../../Components/Forms/ImageUpload/ImageUpload";
import OneImageUpload from "../../Components/Forms/OneImageUpload.js/OneImageUpload";

function AddNews({ addNews }) {
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    let { title, text } = store.getState().formReducer;
    const image = store.getState().imageReducer.image;
    const header = store.getState().imageReducer.header[0];

    let news = {
      title,
      text,
      header,
      images: image,
    };
    addNews(news);
  };

  return (
    <div>
      <button onClick={() => history.goBack()} className="arrow_left">
        ❮
      </button>
      <form onSubmit={handleSubmit} className="add_news_container">
        <div className="add_member_title">Add Event</div>
        <div className="add_member_component">
          <div>
            <div>Add address</div>
            <Input id="title" type="text" placeholder="Location" />
            <Input id="text" type="text" placeholder="Latitude" />
            <Input id="text" type="text" placeholder="Longitude" />
            <Input id="text" type="select" placeholder="City" />

            {/* <Textarea type="text" placeholder="Text" /> */}
          </div>

          <div>
            <div>add event</div>
            <Input id="title" type="text" placeholder="Name" />
            <Input id="text" type="text" placeholder="Description" />
            <Input id="text" type="date" placeholder="Start Date" />
            <Input id="text" type="date" placeholder="End Date" />
          </div>
          <div>
            <div>add agenda's address</div>
            <Input id="title" type="text" placeholder="Location" />
            <Input id="text" type="text" placeholder="Latitude" />
            <Input id="text" type="text" placeholder="Longitude" />
            <Input id="text" type="select" placeholder="City" />
            <div>agenda's mnacacy</div>

            <Input id="text" type="date" placeholder="End Date" />
            <Input id="text" type="text" placeholder="Description" />
          </div>
          <OneImageUpload label="Upload Header Image" />
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
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    addNews: (news) => dispatch(addNews(news)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AddNews);
