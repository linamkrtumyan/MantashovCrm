import React, { useEffect } from "react";
import "./memberDetails.css";
import { connect } from "react-redux";
import { fetchMemberDetails } from "../../store";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";

function MemberDetails({ fetchMemberDetails, memberDetails, images }) {
  const history = useHistory();

  // console.log(newsDetails.images, "images");
  // newsDetails.images.map((image) => {
  //   console.log(image, "image ");
  // });
  let { id } = useParams();
  // console.log(memberDetails, "memberDetails");
  useEffect(() => {
    fetchMemberDetails(id);
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
          <p>
            {" "}
            {memberDetails.firstName} {memberDetails.lastName}{" "}
          </p>
        </div>
        <div className="details_subtitle">
          <div className="details_subtitle_icon">
            <svg viewBox="0 0 50 49" className="map">
              <g
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1"
                fill="transparent"
                stroke="#343333"
              >
                <path d="M15.625,11.4583333 L15.625,44.7916667 M30.2083333,21.875 L30.2083333,1.04166667 M28.125,35.8625 L15.625,44.7916667 L1.04166667,34.375 L1.04166667,1.04166667 L15.625,11.4583333 L30.2083333,1.04166667 L44.7916667,11.4583333 L44.7916667,21.875" />
                <path d="M48.9583333,34.375 C48.9583333,38.9770833 40.625,48.9583333 40.625,48.9583333 C40.625,48.9583333 32.2916667,38.9770833 32.2916667,34.375 C32.2916667,29.7729167 36.0208333,26.0416667 40.625,26.0416667 C45.2270833,26.0416667 48.9583333,29.7729167 48.9583333,34.375 L48.9583333,34.375 Z" />
                <circle cx="40.625" cy="34.375" r="3.125" />
              </g>
            </svg>
          </div>
          <div>{memberDetails.location}</div>
        </div>
        <div>
          <img
            alt=""
            className="details_header_image"
            src={`/images/profile/${id}/profile_picture.png`}
          />
        </div>
        <div style={{ display: "flex" }}>
          {memberDetails?.organizations?.map((organization) => {
            return <p>{organization}</p>;
          })}
        </div>
        <div> {memberDetails.status} </div>
        <div> {memberDetails.description} </div>
        <div style={{ display: "flex" }}>
          {memberDetails?.educations?.map((education) => {
            return <p>{education}</p>;
          })}
        </div>
        <div>
          {memberDetails?.contacts?.map((contact) => {
            return (
              <div style={{ display: "flex" }}>
                <p>{contact.type}</p>
                {contact.values?.map((value) => value)}
              </div>
            );
          })}
        </div>
        <div className="news_details_all_images">
          {images?.map((image, index) => {
            const imagePath = `/images/news/${id}/${image}`;
            return <img alt="" className="details_img" src={imagePath} />;
          })}
        </div>

        <div className="details_text">
          {" "}
          {/* <p>{newsDetails.text}</p>{" "} */}
        </div>
      </div>
    </>
  );
}
const mapStateToProps = (state) => {
  // console.log(state, "state");
  return {
    // newsByPage: state.newsReducer.newsByPage,
    memberDetails: state.membersReducer.memberDetails,
    // images: state.newsReducer.newsDetails.images,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // fetchNewsByPage: () => dispatch(fetchNewsByPage()),
    fetchMemberDetails: (id) => dispatch(fetchMemberDetails(id)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(MemberDetails);
