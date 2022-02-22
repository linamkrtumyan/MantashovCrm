import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { uploadOneImage, deleteHeader } from "../../../store";
import "./oneImageUpload.css";

function OneImageUpload({
  uploadOneImage,
  label = "",
  oneImageLoading,
  headers,
  index = 0,
  deleteHeader,
  header,
}) {
  const [image, setImage] = useState([]);

  const onImageChange = (e) => {
    if (e.target.files) {
      uploadOneImage(e.target.files, index);
      setImage(URL.createObjectURL(e.target.files[0]));
      //   const file = [...e.target.files];
      // change headers[index - 1]?.url to image
    }
  };


  useEffect(() => {
    if (headers.length && headers[index - 1] && index) {
      setImage(headers[index - 1]?.url);
    } else if (!index && header) {
      setImage([header[0].url]);
    } else {
      setImage([]);
    }
  }, [headers, header]);

  const handleDelete = () => {
    // let index;
    headers.map((img) => {
      if (img.url === image) {
        const index = headers.indexOf(img);
        deleteHeader(index);
      }
    });
    setImage([]);
  };

  return (
    <div>
      {oneImageLoading ? (
        <div className="loader-wrapper">
          <div className="loader is-loading"></div>
        </div>
      ) : null}
      {image.length > 0 ? (
        <div className="upload_cont">
          <img
            className="uploaded_image"
            src={
              image
              // headers[index - 1]?.url
              // ? headers[index - 1].url : image
            }
            alt=""
          />
          <div className="middle">
            <div
              // onClick={() => deleteImage(source.indexOf(photo))}
              onClick={() => {
                // setImage([]);
                setImage([]);
                handleDelete();
              }}
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
        name="myfile"
        accept="image/png, image/gif, image/jpeg"
        // style={{ height: "60px" }}
        onChange={(e) => {
          onImageChange(e);
        }}
      />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    headers: state.imageReducer?.headers,
    oneImageLoading: state.imageReducer?.oneImageLoading,
    header: state.imageReducer?.header,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    uploadOneImage: (img) => dispatch(uploadOneImage(img)),
    deleteHeader: (id) => dispatch(deleteHeader(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OneImageUpload);
