import React, { useEffect, useState } from "react";
import Input from "../../Components/Forms/Input/Input";
import Textarea from "../../Components/Forms/Textarea/Textarea";
import Button from "../../Components/Forms/Button/Button";
import "./addNewsPage.css";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import store, { cleanForm, cleanImages } from "../../store";
import { addNews } from "../../store/news/actions/addNews";
import ImageUpload from "../../Components/Forms/ImageUpload/ImageUpload";
import OneImageUpload from "../../Components/Forms/OneImageUpload/OneImageUpload";
import { scrollToView } from "../../helpers/scrollToView";

function AddNews({ addNews, cleanForm, cleanImages }) {
  const history = useHistory();
  const path = useHistory();

  useEffect(() => {
    cleanForm();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    let { title_arm, title_eng, title_ru, text_arm, text_eng, text_ru } =
      store.getState().formReducer;
    const image = store.getState().imageReducer.image;
    const header = store.getState().imageReducer.header[0];
    const changePath = () => {
      path.push("/news");
    };
    let news = {
      titleArm: title_arm,
      titleEng: title_eng,
      titleRu: title_ru,
      textArm: text_arm,
      textEng: text_eng,
      textRu: text_ru,

      header,
      images: image,
    };
    addNews(news, changePath);
    // cleanForm();
    cleanImages();
  };

  const handleCancel = () => {
    cleanImages();
    path.push("/news");
  };

  return (
    <div>
      <button onClick={() => history.goBack()} className="arrow_left">
        ❮
      </button>
      <form onFocus={scrollToView} onSubmit={handleSubmit} className="">
        <div className="add_member_title">Add News</div>
        <div className="add_member_component">
          <div className="add_news_container">
            <div className="add_news_img">
              <div style={{ marginBottom: "20px" }}>
                <OneImageUpload label="Header Image" />
              </div>
              <div>
                <ImageUpload label="Images" />
              </div>
            </div>
            <div>
              <div className="news_inputs_container">
                <Textarea
                  id="title_eng"
                  type="text"
                  placeholder="Title"
                  className="add_news_input"
                  textareaSize="textareaSize"
                />

                <Textarea
                  id="text_eng"
                  type="text"
                  placeholder="Text"
                  className="add_news_textarea"
                />
              </div>
              <div className="news_inputs_container">
                <Textarea
                  id="title_arm"
                  type="text"
                  placeholder="Վերնագիր"
                  className="add_news_input"
                  textareaSize="textareaSize"
                />

                <Textarea
                  id="text_arm"
                  type="text"
                  placeholder="Տեքստ"
                  className="add_news_textarea"
                />
              </div>

              <div className="news_inputs_container">
                <Textarea
                  id="title_ru"
                  type="text"
                  placeholder="Заглавие"
                  className="add_news_input"
                  textareaSize="textareaSize"
                />

                <Textarea
                  id="text_ru"
                  type="text"
                  placeholder="Текст"
                  className="add_news_textarea"
                />
              </div>
            </div>
          </div>

          {/* <Textarea type="text" placeholder="Text" /> */}
        </div>

        <div className="action_container">
          <Button
            onClick={handleCancel}
            type="button"
            title="Cancel"
            className="action_btn cancel_btn"
          />
          <Button type="submit" title="Create" className="action_btn" />
        </div>
      </form>
    </div>
  );
}

const mapStateToProps = (state) => {
  // console.log(state);
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    addNews: (news, changePath) => dispatch(addNews(news, changePath)),
    cleanForm: () => dispatch(cleanForm()),
    cleanImages: () => dispatch(cleanImages()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AddNews);
