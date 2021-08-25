import React, { useState } from "react";
import { connect } from "react-redux";
import { deleteImageFromStore, uploadImage } from "../../../store";
import "./imageUpload.css";
function ImageUpload({
  deleteImageFromStore,
  uploadImage,
  label = "",
  className = "",
  containerClassName = "",
}) {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [delindex, setDelindex] = useState(null);
  // console.log(selectedFiles, "selectedFiles");

  const onImageChange = (e) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files).map((file) =>
        URL.createObjectURL(file)
      );
      const files = [...e.target.files];

      // console.log(files, "files");
      uploadImage(files);

      setSelectedFiles((prevImages) => prevImages.concat(filesArray));

      Array.from(e.target.files).map((file) => {
        URL.revokeObjectURL(file);
      });
    }
  };

  const deleteImage = (a) => {
    // console.log(a, "delete image finction");
    deleteImageFromStore(a);
    setDelindex(a);
  };

  const renderPhotos = (source) => {
    if (delindex != null) {
      source.splice(delindex, 1);
      // selectedFiles.splice(delindex, 1);
    }
    // console.log("source: ", source);
    return source.map((photo) => {
      // console.log(photo, "photo");
      return (
        <div className="upload_cont">
          <img className="uploaded_images" src={photo} alt="" key={photo} />
          <div className="middle">
            <div onClick={() => deleteImage(source.indexOf(photo))}>
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
      );
    });
  };

  return (
    <div className="upload_container">
      <div>
        <label
          htmlFor="multiple-file-upload"
          className={`custom-file-upload ${className}`}
        >
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
          id="multiple-file-upload"
          name="myfile"
          onChange={(e) => onImageChange(e)}
          multiple
        />
      </div>
      <div className={`uploaded_files_container ${containerClassName} `}>
        {renderPhotos(selectedFiles)}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    image: state.imageReducer.image,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    uploadImage: (img) => dispatch(uploadImage(img)),
    deleteImageFromStore: (id) => dispatch(deleteImageFromStore(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ImageUpload);
