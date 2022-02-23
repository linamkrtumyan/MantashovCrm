import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  deleteVideoFromStore,
  uploadVideo,
  formOnChange,
} from "../../../store";
import "../ImageUpload/imageUpload.css";
function VideoUpload({
  deleteVideoFromStore,
  uploadVideo,
  label = "",
  className = "",
  containerClassName = "",
  videoUpload,
  formOnChange,
  id,
  uploadedVideos,
}) {
  const [selectedVideos, setSelectedVideos] = useState([]);
  const [delindex, setDelindex] = useState(null);
  const [a, setA] = useState(0);

  useEffect(() => {
    formOnChange(`${id}`, []);
    formOnChange(`${id}Deleted`, []);
  }, [id]);

  const onVideoChange = (e) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files).map((file) =>
        URL.createObjectURL(file)
      );
      const files = [...e.target.files];

      uploadVideo(files);
      const arr = uploadedVideos ? uploadedVideos.concat(files) : files;
      setSelectedVideos((prevVideos) => prevVideos.concat(filesArray));
      formOnChange(`${id}`, arr);
      setA(a + 1);
      Array.from(e.target.files).map((file) => {
        URL.revokeObjectURL(file);
      });
    }

    setDelindex(null);
  };

  const deleteVideo = (a) => {
    deleteVideoFromStore(a);
    setDelindex(a);
  };

  const renderVideos = (source) => {
    if (delindex != null) {
      source.splice(delindex, 1);
      // selectedVideos.splice(delindex, 1);
    }
    return source.map((videos) => {
      return (
        <div className="upload_cont">
          <video className="uploaded_images" key={videos} controls>
            <source src={videos} type="video/mp4" />
            <source src={videos} type="video/ogg" />
            Your browser does not support the video tag.
          </video>
          <div className="middle">
            <div onClick={() => deleteVideo(source.indexOf(videos))}>
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
          id="multiple-file-upload2"
          accept="video/*"
          name="myfile"
          onChange={(e) => {
            onVideoChange(e);
          }}
          multiple
        />
      </div>

      <div className={`uploaded_files_container ${containerClassName} `}>
        {videoUpload ? (
          <div className="loader-wrapper">
            <div className="loader is-loading"></div>
          </div>
        ) : null}
        {renderVideos(selectedVideos)}
      </div>
    </div>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    videoUpload: state.videoReducer?.videoUpload,
    uploadedVideos: state.formReducer[ownProps.id],
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    uploadVideo: (vid) => dispatch(uploadVideo(vid)),
    deleteVideoFromStore: (id) => dispatch(deleteVideoFromStore(id)),
    formOnChange: (key, value) => dispatch(formOnChange(key, value)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(VideoUpload);
