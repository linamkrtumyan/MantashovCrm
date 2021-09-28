import React from "react";
import { connect } from "react-redux";
import Slider from "./Slider";
import "./Slider.css";

function OpenImage({ openImgModal, setOpenImgModal, imgPath, detailsImages }) {
  return (
    <>
      <div className={"modal " + (openImgModal ? "is-active" : "")}>
        <div className="modal-background"></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <button
              onClick={() => setOpenImgModal(false)}
              className="delete"
              aria-label="close"
            ></button>
          </header>
          <section>
            {/* <div style={{ backgroundColor: "#fff" }}>
              <img src={imgPath} />
            </div> */}
            <Slider imgPath={imgPath} dataSlider={detailsImages} />
          </section>
        </div>
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    detailsImages: state.eventReducer.detailsImages,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(OpenImage);
