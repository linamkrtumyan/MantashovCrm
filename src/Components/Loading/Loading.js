import React from "react";
import "./loading.css";

function Loading() {
  return (
    <div>
      <img
        alt=""
        className="loading_image"
        src={require("../../img/loading_logo.png").default}
      />
    </div>
  );
}

export default Loading;
