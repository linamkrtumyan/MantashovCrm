import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { uploadOneImage } from "../../../store";
import "./oneImageUpload.css";

function OneImageUpload({ uploadOneImage, label = "" }) {
  const [image, setImage] = useState([]);
  const onImageChange = (e) => {
    if (e.target.files) {
      setImage(URL.createObjectURL(e.target.files[0]));
      //   const file = [...e.target.files];
      uploadOneImage(e.target.files);
    }
  };

  return (
    <div>
      <div className="upload_container">
        <label htmlFor="one-file-upload" className="custom-file-upload">
          <svg className="upload" viewBox="-10 -7 50 50">
            <g
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="transparent"
              stroke="#343333"
              strokeWidth="5"
            >
              <line x1="15.37" y1="1.4" x2="15.37" y2="26.4" />
              <polyline points="24,9.4 15.4,0.7 6.7,9.4 " />
              <polyline points="30.2,15.8 30.2,35 0.5,35 0.5,15.8 " />
            </g>
          </svg>
          {label}
        </label>
        <input
          type="file"
          // id="myfile"
          id="one-file-upload"
          name="myfile"
          // style={{ height: "60px" }}
          onChange={(e) => onImageChange(e)}
        />
        <img className="uploaded_image" src={image} />
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  // console.log(state, "state");
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    uploadOneImage: (img) => dispatch(uploadOneImage(img)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OneImageUpload);
