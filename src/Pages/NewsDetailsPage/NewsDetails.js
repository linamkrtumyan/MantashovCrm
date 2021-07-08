import React, { useEffect } from "react";
import "./newsDetails.css";
import { connect } from "react-redux";
import { fetchNewsDetails } from "../../store";
import { useParams } from "react-router-dom";

function NewsDetails({ fetchNewsDetails, newsDetails, images }) {
  let { id } = useParams();
  console.log(id, "////id");
  useEffect(() => {
    fetchNewsDetails(id);
  }, [id]);
  return (
    <div>
      <div>
        {images.map((image, index) => {
          const imagePath = `/api/image/?page=news&id=${id}&name=${image}`;
          return (
            <img
              alt=""
              // className="evantcard_img"
              src={imagePath}
            />
          );
        })}
      </div>

      <div>{newsDetails.title}</div>
      <div>{newsDetails.text}</div>
    </div>
  );
}
const mapStateToProps = (state) => {
  console.log(state, "state");
  return {
    // newsByPage: state.newsReducer.newsByPage,
    newsDetails: state.newsReducer.newsDetails,
    images: state.newsReducer.newsDetails?.images,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // fetchNewsByPage: () => dispatch(fetchNewsByPage()),
    fetchNewsDetails: (id) => dispatch(fetchNewsDetails(id)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(NewsDetails);
