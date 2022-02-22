import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { deleteFixedImageFromStore, uploadFixedImages } from "../../../store";
import "../ImageUpload/imageUpload.css";
function FixedImagesUpload({
  deleteFixedImageFromStore,
  uploadFixedImages,
  label = "",
  className = "",
  containerClassName = "",
  fixedImagesUpload,
  headers,
}) {
  const [selectedImages, setSelectedImages] = useState([]);
  const [delindex, setDelindex] = useState(null);
  const [a, setA] = useState(0);

  const onImageChange = (e) => {
    if (
      e.target.files
      //    &&
      //   headers &&
      //   headers.length + e.target.files.length < 8
    ) {
      const filesArray = Array.from(e.target.files).map((file) =>
        URL.createObjectURL(file)
      );
      const files = [...e.target.files];
      console.log({files}, "files");

      uploadFixedImages(files);

      setSelectedImages((prevImages) => prevImages.concat(filesArray));
      setA(a + 1);
      Array.from(e.target.files).map((file) => {
        URL.revokeObjectURL(file);
      });
      // e.target.reset();
    }

    setDelindex(null);
  };

  const deleteImage = (a) => {
    deleteFixedImageFromStore(a);
    setDelindex(a);
  };

  const renderImages = (source) => {
    if (delindex != null) {
      source.splice(delindex, 1);
      // selectedImages.splice(delindex, 1);
    }
    return source.map((image) => {
      return (
        <div className="upload_cont" key={image}>
          <img className="uploaded_images" src={image} alt="" />
          <div className="middle">
            <div onClick={() => deleteImage(source.indexOf(image))}>
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
          htmlFor="multiple-file-upload2"
          className={`multiple-custom-file-upload ${className}`}
        >
          <i className="fas fa-cloud-upload-alt"></i>
          <p>{label}</p>
        </label>
        <input
          type="file"
          id="multiple-file-upload"
          accept="image/png, image/gif, image/jpeg"
          name="myfile"
          onChange={(e) => onImageChange(e)}
          multiple
        />
      </div>

      <div className={`uploaded_files_container ${containerClassName} `}>
        {fixedImagesUpload ? (
          <div className="loader-wrapper">
            <div className="loader is-loading"></div>
          </div>
        ) : null}
        {renderImages(selectedImages)}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    headers: state.imageReducer?.headers,
    fixedImagesUpload: state.fixedImagesReducer?.fixedImagesUpload,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    uploadFixedImages: (img) => dispatch(uploadFixedImages(img)),
    deleteFixedImageFromStore: (id) => dispatch(deleteFixedImageFromStore(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FixedImagesUpload);
