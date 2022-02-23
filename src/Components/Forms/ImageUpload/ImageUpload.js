import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  deleteImageFromStore,
  uploadImage,
  setUploadedPhotos,
  formOnChange,
} from "../../../store";
import "./imageUpload.css";
function ImageUpload({
  deleteImageFromStore,
  uploadImage,
  label = "",
  className = "",
  containerClassName = "",
  imageUpload,
  headers,
  image,
  limit,
  setUploadedPhotos,
  id,
  formOnChange,
  uploadedImages,
}) {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [delindex, setDelindex] = useState(null);
  const [a, setA] = useState(0);
  const [imagesLength, setImagesLength] = useState(
    headers.length + image.length
  );

  useEffect(() => {
    formOnChange(`${id}`, []);
    formOnChange(`${id}Deleted`, []);
  }, [id]);

  useEffect(() => {
    console.log({ uploadedImages }, "uploadedImages");
  }, [uploadedImages]);

  useEffect(() => {
    setImagesLength(headers.length + image.length);
  }, [headers, image]);

  const onImageChange = (e) => {
    if (e.target.files) {
      if (
        limit &&
        selectedFiles.length < limit &&
        e.target.files.length < limit
      ) {
        const filesArray = Array.from(e.target.files).map((file) =>
          URL.createObjectURL(file)
        );
        const files = [...e.target.files];
        uploadImage(files);
        const arr = uploadedImages ? uploadedImages.concat(files) : files;

        setSelectedFiles((prevImages) => prevImages.concat(filesArray));
        formOnChange(`${id}`, arr);

        // setSelectedFiles((prevImages) => prevImages.concat(filesArray));
        setA(a + 1);
        Array.from(e.target.files).map((file) => {
          URL.revokeObjectURL(file);
        });
      } else {
        const filesArray = Array.from(e.target.files).map((file) =>
          URL.createObjectURL(file)
        );
        const files = [...e.target.files];
        uploadImage(files);
        const arr = uploadedImages ? uploadedImages.concat(files) : files;

        setSelectedFiles((prevImages) => prevImages.concat(filesArray));
        formOnChange(`${id}`, arr);

        // setSelectedFiles((prevImages) => prevImages.concat(filesArray));
        setA(a + 1);
        Array.from(e.target.files).map((file) => {
          URL.revokeObjectURL(file);
        });
      }
    }

    setDelindex(null);
  };

  const deleteImage = (a) => {
    let deletedImages = uploadedImages[a];
    const newArr = uploadedImages
      .slice(0, a)
      .concat(uploadedImages.slice(a + 1));
    deleteImageFromStore(a);
    formOnChange(`${id}Deleted`, [deletedImages]);
    formOnChange(`${id}`, newArr);
    setDelindex(a);
  };

  const renderPhotos = (source) => {
    if (delindex != null) {
      source.splice(delindex, 1);
      // selectedFiles.splice(delindex, 1);
    }
    return source.map((photo) => {
      return (
        <div className="upload_cont" key={photo}>
          <img className="uploaded_images" src={photo} alt="" />

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
          // htmlFor="multiple-file-upload"
          htmlFor={`${id}`}
          className={`multiple-custom-file-upload ${className}`}
        >
          <i className="fas fa-cloud-upload-alt"></i>
          <p>{label}</p>
        </label>
        <input
          type="file"
          // id="multiple-file-upload"
          id={`${id}`}
          accept="image/png, image/gif, image/jpeg"
          name="myfile"
          onChange={(e) => onImageChange(e)}
          multiple
        />
      </div>

      <div className={`uploaded_files_container ${containerClassName} `}>
        {imageUpload ? (
          <div className="loader-wrapper">
            <div className="loader is-loading"></div>
          </div>
        ) : null}
        {renderPhotos(selectedFiles)}
      </div>
    </div>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    headers: state.imageReducer?.headers,
    image: state.imageReducer?.image,
    imageUpload: state.imageReducer?.imageUpload,
    uploadedImages: state.formReducer[ownProps.id],
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    uploadImage: (img) => dispatch(uploadImage(img)),
    deleteImageFromStore: (id) => dispatch(deleteImageFromStore(id)),
    setUploadedPhotos: (photos) => dispatch(setUploadedPhotos(photos)),
    formOnChange: (key, value) => dispatch(formOnChange(key, value)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ImageUpload);
