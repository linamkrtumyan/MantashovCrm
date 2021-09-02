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
        <img className="upload_img" src={image} />
      ) : (
        <div className="">
          <label htmlFor="one-file-upload" className="custom-file-upload">
            <i className="fas fa-cloud-upload-alt"></i>
            <p>{label}</p>
          </label>
        </div>
      )}
      {/* <div className="p"> */}
      {/* <label htmlFor="one-file-upload" className="custom-file-upload"></label> */}
      <input
        type="file"
        // id="myfile"
        id="one-file-upload"
        name="myfile"
        // style={{ height: "60px" }}
        onChange={(e) => onImageChange(e)}
      />
      {/* </div> */}
      {/* <img className="" src={image} /> */}
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
