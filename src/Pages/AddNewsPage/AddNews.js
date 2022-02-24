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

function AddNews({ addNews, cleanForm, cleanImages, newsId }) {
  const history = useHistory();
  const path = useHistory();

  useEffect(() => {
    cleanForm();
    cleanImages();
  }, []);

  useEffect(() => {
    if (newsId) {
      history.push(`/newsDetails/${newsId}`);
    }
  }, [newsId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    let { title_arm, title_eng, title_ru, text_arm, text_eng, text_ru } =
      store.getState().formReducer;
    const image = store.getState().imageReducer.image;
    const header = store.getState().imageReducer.header[0]?.name ?? null;

    let news = {
      titleArm: title_arm,
      titleEng: title_eng,
      titleRu: title_ru,
      header,
    };
    addNews(news);
    // cleanForm();
    // cleanImages();
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
              </div>
              <div className="news_inputs_container">
                <Textarea
                  id="title_arm"
                  type="text"
                  placeholder="Վերնագիր"
                  className="add_news_input"
                  textareaSize="textareaSize"
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
  return {
    newsId: state.newsReducer.newsId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addNews: (news, changePath) => dispatch(addNews(news, changePath)),
    cleanForm: () => dispatch(cleanForm()),
    cleanImages: () => dispatch(cleanImages()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AddNews);
