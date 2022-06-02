import React, { useEffect } from "react";
import "./newsDetails.css";
import { connect } from "react-redux";
import { fetchNewsDetails } from "../../store";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";

function NewsDetails({ fetchNewsDetails, newsDetails, images }) {
  const history = useHistory();

  let { id } = useParams();
  useEffect(() => {
    fetchNewsDetails(id);
  }, []);

  // images.map((image, index) => {
  //   // const imagePath = `${API_HOST}image/?page=news&id=${id}&name=${image}`;
  //   return <p>{image}</p>;
  // });

  return (
    <>
      <div>
        <button onClick={() => history.goBack()} className="arrow_left">
          ❮
        </button>
      </div>
      <div className="details_container">
        <div className="details_title">
          <p>{newsDetails.title}</p>
        </div>
        <div className="details_subtitle">
          <div className="details_subtitle_icon">
            <svg viewBox="0 0 48 48" className="time">
              <g
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1"
                fill="transparent"
                stroke="#343333"
                transform="translate(1 1)"
              >
                <circle cx="23" cy="23" r="23" />
                <path d="m22 12v11l12 11" />
              </g>
            </svg>
          </div>
          <div>
            <p>{newsDetails.insertedDate} </p>
          </div>
        </div>
        <div>
          <img
            alt=""
            className="details_header_image"
            src={`/images/newsHeader/${id}/header.png`}
          />
        </div>
        <div className="news_details_all_images">
          {images?.map((image, index) => {
            const imagePath = `/images/news/${id}/${image}`;
            return <img alt="" className="details_img" src={imagePath} />;
          })}
        </div>

        <div className="details_text">
          <p>{newsDetails.text}</p>
        </div>
      </div>
    </>
  );
}
const mapStateToProps = (state) => {
  return {
    // newsByPage: state.newsReducer.newsByPage,
    newsDetails: state.newsReducer.newsDetails,
    images: state.newsReducer.newsDetails.images,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // fetchNewsByPage: () => dispatch(fetchNewsByPage()),
    fetchNewsDetails: (id) => dispatch(fetchNewsDetails(id)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(NewsDetails);
