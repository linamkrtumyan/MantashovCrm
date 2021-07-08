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

function AddNews({ uploadImage, addNews }) {
  const [image, setImage] = useState("");
  const history = useHistory();

  const onImageChange = (event) => {
    // console.log(event.target.files[0], "event");
    setImage(event.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let { title, text } = store.getState().formReducer;
    const images = new Array();
    // let {}
    let news = {
      title,
      text,
      header: image,
    };
    // console.log(news, "***news***");
    addNews(news);
  };

  return (
    <div>
      <button onClick={() => history.goBack()} className="arrow_left">
        <svg
          width="60px"
          height="60px"
          viewBox="0 0 50 80"
          //   xml:space="preserve"
        >
          <polyline
            fill="#343333"
            stroke="#FFFFFF"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
            points="
	45.63,75.8 0.375,38.087 45.63,0.375 "
          />
        </svg>
      </button>
      {/* <button onClick={() => history.goBack()}>Go Back</button> */}
      <form onSubmit={handleSubmit} className="add_member_container">
        <div className="add_member_title">Add News</div>

        <div className="add_member_component">
          <Input id="title" type="text" placeholder="Title" />
          <Input id="text" type="text" placeholder="Text" />

          {/* <Textarea type="text" placeholder="Text" /> */}
          <input
            type="file"
            id="myfile"
            name="myfile"
            onChange={onImageChange}
          />
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
  console.log(state, "add news state ");
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
