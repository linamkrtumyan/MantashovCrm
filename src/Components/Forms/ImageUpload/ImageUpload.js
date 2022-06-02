import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";

import store, {
  deleteImageFromStore,
  uploadImage,
  setUploadedPhotos,
  formOnChange,
  setEventFixedImage,
  deleteEventFixedImage,
} from "../../../store";
import "./imageUpload.css";
function ImageUpload({
  deleteImageFromStore,
  uploadImage,
  label = "",
  className = "",
  containerClassName = "",
  contentClassName = "",
  imageUpload,
  headers,
  image,
  limit,
  setUploadedPhotos,
  id,
  key1,
  formOnChange,
  uploadedImages,
  width,
  height,
  setEventFixedImage,
  imageWithKey,
  deleteEventFixedImage,
  isFetch,
  callback = () => {},
}) {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [delindex, setDelindex] = useState(null);
  const [a, setA] = useState(0);

  let { eventId } = useParams();

  useEffect(() => {
    formOnChange(`${id}`, []);
    formOnChange(`${id}Deleted`, []);
  }, [id]);

  useEffect(() => {
    let filesArray = [];
    if (key1 && key1 !== "") {
      filesArray = [imageWithKey];
    } else {
      if (uploadedImages) {
        filesArray = Array.from(uploadedImages).map((file) =>
          URL.createObjectURL(file)
        );
      }
    }
    setSelectedFiles(filesArray);
    setA(a + 1);
  }, [uploadedImages, imageWithKey, key1]);

  const onChangeImage = (e) => {
    if (e.target.files) {
      // const filesArray = Array.from(e.target.files).map((file) =>
      //   URL.createObjectURL(file)
      // );
      const files = [...e.target.files];
      let isUpload = true;
      files.map((file) => {
        if (file.size / 1024 / 1024 > 5) {
          isUpload = false;
        } else {
          isUpload = true;
        }
      });

      if (!isUpload) {
        alert("Նկարի չափը չպետք է գերազանցի 5 ՄԲ-ը։");
      } else {
        if (key1 && key1 !== "") {
          // check image sizes with pixels ---->
          var reader = new FileReader();
          reader.readAsDataURL(e.target.files[0]);
          reader.onload = function (e) {
            var image = new Image();
            image.src = e.target.result;

            image.onload = function () {
              var heightImg = this.height;
              var widthImg = this.width;
              if (heightImg !== height || widthImg !== width) {
                alert(
                  `Please upload image with (${width}px x ${height}px) sizes.`
                );
              } else {
                // let { eventId } = store.getState().formReducer;
                callback();
                setEventFixedImage(files, parseInt(eventId), key1, !isFetch);
                // formOnChange(`${id}`, files);
                setA(a + 1);
              }
            };
          };
          e.target.value = "";
        } else {
          if (
            limit &&
            limit !== 0 &&
            e.target.files.length <= limit &&
            selectedFiles.length <= limit
          ) {
            uploadImage(files, id);
            const arr = uploadedImages ? uploadedImages.concat(files) : files;
            formOnChange(`${id}`, arr);
            // setSelectedFiles((prevImages) => prevImages.concat(filesArray));
            setA(a + 1);
            Array.from(e.target.files).map((file) => {
              URL.revokeObjectURL(file);
            });
          } else if (!limit && limit !== 0) {
            uploadImage(files, id);
            const arr = uploadedImages ? uploadedImages.concat(files) : files;
            formOnChange(`${id}`, arr);
            // setSelectedFiles((prevImages) => prevImages.concat(filesArray));
            setA(a + 1);
            Array.from(e.target.files).map((file) => {
              URL.revokeObjectURL(file);
            });
          } else {
            uploadImage(files, id);
            const arr = uploadedImages ? uploadedImages.concat(files) : files;
            formOnChange(`${id}`, arr);
            // setSelectedFiles((prevImages) => prevImages.concat(filesArray));
            setA(a + 1);
            Array.from(e.target.files).map((file) => {
              URL.revokeObjectURL(file);
            });
          }
        }
      }
    }
  };

  const deleteImage = (a) => {
    // let { eventId } = store.getState().formReducer;
    if (key1) {
      deleteEventFixedImage(eventId, key1);
      formOnChange(`${key1}`, "");
    } else {
      let deletedImages = uploadedImages[a];
      const newArr = uploadedImages
        .slice(0, a)
        .concat(uploadedImages.slice(a + 1));
      deleteImageFromStore(a, id);
      formOnChange(`${id}Deleted`, [deletedImages]);
      formOnChange(`${id}`, newArr);
      setDelindex(a);
      setA(a + 1);
    }
  };

  const renderPhotos = (source) => {
    // if (delindex != null) {
    //   source.splice(delindex, 1);
    // }
    return source?.map((photo) => {
      return (
        <>
          {photo && photo !== "" && (
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
          )}
        </>
      );
    });
  };

  return (
    <div className={`upload_container ${contentClassName}`}>
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
          // accept="image/png, image/gif, image/jpeg image/svg"
          accept="image/*"
          name="myfile"
          onChange={(e) => {
            // onImageChange(e);
            onChangeImage(e);
          }}
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
    imageWithKey: state.formReducer[ownProps.key1],
    isFetch: state.imageReducer.fetch,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    uploadImage: (img, key) => dispatch(uploadImage(img, key)),
    deleteImageFromStore: (id, key) => dispatch(deleteImageFromStore(id, key)),
    setUploadedPhotos: (photos) => dispatch(setUploadedPhotos(photos)),
    formOnChange: (key, value) => dispatch(formOnChange(key, value)),
    setEventFixedImage: (img, eventId, key, isFetch) =>
      dispatch(setEventFixedImage(img, eventId, key, isFetch)),
    deleteEventFixedImage: (eventId, key) =>
      dispatch(deleteEventFixedImage(eventId, key)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ImageUpload);
