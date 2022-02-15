import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { deleteImageFromStore, uploadImage } from "../../../store";
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
  limit = false,
  type = "",
}) {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [selectedVideos, setSelectedVideos] = useState([]);
  const [delindex, setDelindex] = useState(null);
  const [a, setA] = useState(0);
  const [imagesLength, setImagesLength] = useState(
    headers.length + image.length
  );

  const [fileType, setFileType] = useState(type);

  useEffect(() => {
    setFileType(type);
    // console.log({ type }, "ooooooooooooooooooooo");
  }, [type]);

  useEffect(() => {
    setImagesLength(headers.length + image.length);
  }, [headers, image]);

  const onImageChange = (e) => {
    if (limit) {
      if (imagesLength < 8) {
        if (e.target.files) {
          const filesArray = Array.from(e.target.files).map((file) =>
            URL.createObjectURL(file)
          );
          const files = [...e.target.files];

          uploadImage(files, fileType);
          fileType === "video"
            ? setSelectedVideos((prevImages) => prevImages.concat(filesArray))
            : setSelectedFiles((prevImages) => prevImages.concat(filesArray));
          setA(a + 1);
          Array.from(e.target.files).map((file) => {
            URL.revokeObjectURL(file);
          });
        }

        setDelindex(null);
      }
    } else {
      if (e.target.files) {
        const filesArray = Array.from(e.target.files).map((file) =>
          URL.createObjectURL(file)
        );
        const files = [...e.target.files];
        // console.log(type, "typeee");
        uploadImage(files, fileType);
        fileType === "video"
          ? setSelectedVideos((prevImages) => prevImages.concat(filesArray))
          : setSelectedFiles((prevImages) => prevImages.concat(filesArray));
        setA(a + 1);
        Array.from(e.target.files).map((file) => {
          URL.revokeObjectURL(file);
        });
      }

      setDelindex(null);
    }
  };

  const deleteImage = (a) => {
    deleteImageFromStore(a);
    setDelindex(a);
  };

  const renderPhotos = (source) => {
    if (delindex != null) {
      source.splice(delindex, 1);
      // selectedFiles.splice(delindex, 1);
    }
    return source.map((photo) => {
      return (
        <div className="upload_cont">
          {fileType === "video" ? (
            <video
              className="uploaded_images"
              // source={photo}
              key={photo}
              controls
            >
              <source src={photo} type="video/mp4" />
              <source src={photo} type="video/ogg" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <img className="uploaded_images" src={photo} alt="" key={photo} />
          )}

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
          className={`multiple-custom-file-upload ${className}`}
        >
          <i className="fas fa-cloud-upload-alt"></i>
          <p>{label}</p>
        </label>
        <input
          type="file"
          id="multiple-file-upload"
          accept="image/png, image/gif, image/jpeg, video/*"
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
        {renderPhotos(fileType === "video" ? selectedVideos : selectedFiles)}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    headers: state.imageReducer?.headers,
    image: state.imageReducer?.image,
    imageUpload: state.imageReducer?.imageUpload,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    uploadImage: (img) => dispatch(uploadImage(img)),
    deleteImageFromStore: (id) => dispatch(deleteImageFromStore(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ImageUpload);
