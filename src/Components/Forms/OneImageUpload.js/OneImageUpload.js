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
      {image.length > 0 ? (
        <div className="upload_cont">
          <img className="uploaded_image" src={image} alt="" />
          <div className="middle">
            <div
              // onClick={() => deleteImage(source.indexOf(photo))}
              onClick={() => setImage([])}
            >
              <svg viewBox="0 0 24 24" className="close">
                <path
                  d="M 2 2 L 22 22 M 2 22 L22 2"
                  stroke="red"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="5"
                />
              </svg>
            </div>
          </div>
        </div>
      ) : (
        // <div>
        //   <img className="upload_img" src={image} />
        //   <p>aa</p>
        // </div>
        <div className="">
          <label htmlFor="one-file-upload" className="custom-file-upload">
            <i className="fas fa-cloud-upload-alt"></i>
            <p>{label}</p>
          </label>
        </div>
      )}

      <input
        type="file"
        // id="myfile"
        id="one-file-upload"
        accept="image/*"
        name="myfile"
        // style={{ height: "60px" }}
        onChange={(e) => onImageChange(e)}
      />
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
