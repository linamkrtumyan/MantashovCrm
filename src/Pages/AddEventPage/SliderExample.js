import React from "react";

import AwesomeSlider from "react-awesome-slider";
import withAutoplay from "react-awesome-slider/dist/autoplay";
import "react-awesome-slider/dist/styles.css";

function SliderExample() {
  const AutoplaySlider = withAutoplay(AwesomeSlider);

  const sliderData = [
    {
      id: 1,
      src: "https://www.youtube.com/watch?v=hLOywYu4KDc",
      name: "",
    },
    {
      id: 2,
      src: "https://www.youtube.com/watch?v=hLOywYu4KDc",
      name: "",
    },
    {
      id: 3,
      src: "https://www.youtube.com/watch?v=hLOywYu4KDc",
      name: "",
    },
  ];
  return (
    <div>
      <AutoplaySlider
        play={true}
        cancelOnInteraction={false} // should stop playing on user interaction
        interval={6000}
      >
        {sliderData.map((item) => (
          <div data-src={`${item.src}`} />
        ))}
      </AutoplaySlider>
    </div>
  );
}

export default SliderExample;
