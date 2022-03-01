import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { useOutsideClick } from "../../../../Hooks/useOutsideClick";
import BtnSlider from "./BtnSlider";

function OpenImage({
  openImgModal,
  setOpenImgModal,
  imgPath,
  detailsImages,
  id,
  folderPath,
}) {
  const [slideIndex, setSlideIndex] = useState(1);
  const [currentImage, setCurrentImage] = useState("");
  const [dataSlider, setDataSlider] = useState([]);

  const ref = useRef();

  useEffect(() => {
    setCurrentImage(imgPath);
  }, [imgPath]);
  useEffect(() => {
    // "/images/events/2/upload_b4f7ccce9c2c3207f69287f214c62a34.png"

    for (let i = 0; i < detailsImages.length; i++) {
      const item = `${folderPath}/${id}/${detailsImages[i]}`;
      // `/images/events/${id}/${detailsImages[i]}`;
      dataSlider.push(item);
    }
    setDataSlider(dataSlider);
  }, [detailsImages]);

  const nextSlide = () => {
    const index = dataSlider.indexOf(currentImage);
    if (index !== dataSlider.length - 1) {
      setCurrentImage(dataSlider[index + 1]);
    } else if (index === dataSlider.length - 1) {
      setCurrentImage(dataSlider[0]);
    }
  };

  const prevSlide = () => {
    if (slideIndex !== 1) {
      setSlideIndex(slideIndex - 1);
    } else if (slideIndex === 1) {
      setSlideIndex(dataSlider.length);
    }

    const index = dataSlider.indexOf(currentImage);
    if (index !== 1) {
      setCurrentImage(dataSlider[index - 1]);
    } else if (index === 1) {
      setCurrentImage(dataSlider[dataSlider.length - 1]);
    }
  };

  // const handleClose = () => {
  //   setOpenImgModal(false)
  // };

  // useOutsideClick(ref, handleClose);
 

  return (
    <>
      <div ref={ref}  className={"modal " + (openImgModal ? "is-active" : "")}>
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
            {/* <Slider imgPath={imgPath} dataSlider={detailsImages} /> */}

            <div className="container-slider">
              {dataSlider.map((obj, index) => {
                return (
                  <div
                    key={index}
                    className={
                      slideIndex === index + 1 ? "slide active-anim" : "slide"
                    }
                  >
                    {/* <img src={process.env.PUBLIC_URL + `/Imgs/img${index + 1}.jpg`} /> */}
                    <img src={currentImage} />
                  </div>
                );
              })}
              <BtnSlider moveSlide={nextSlide} direction={"next"} />
              <BtnSlider moveSlide={prevSlide} direction={"prev"} />
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    // detailsImages: state.eventReducer.detailsImages,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(OpenImage);
