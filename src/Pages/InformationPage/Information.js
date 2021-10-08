import React, { useState, useEffect } from "react";
import { render } from "react-dom";
import Organizations from "./components/Organizations/Organizations";
import Positions from "./components/Positions/Positions";
import Spheres from "./components/Spheres/Spheres";
import "./information.css";

function Information() {
  const [tab, setTab] = useState(0);

  let data = localStorage.getItem("infoTab");
  // console.log(data, "data");

  useEffect(() => {
    if (data === null) {
      localStorage.setItem("infoTab", "organizations");
      setTab(4);
    }
  }, []);

  useEffect(() => {
    data = localStorage.getItem("infoTab");
  }, [tab]);

  // console.log(data, "data from session");
  return (
    <div>
      <div className="tabs is-boxed ">
        <ul>
          <li
            onClick={() => {
              localStorage.setItem("infoTab", "organizations");
              setTab(1);
            }}
            className={data === "organizations" ? "is-active" : ""}
          >
            <a>Organizations</a>
          </li>
          <li
            onClick={() => {
              localStorage.setItem("infoTab", "sphere");
              setTab(2);
            }}
            className={data === "sphere" ? "is-active" : ""}
          >
            <a>Sphere</a>
          </li>
          <li
            onClick={() => {
              localStorage.setItem("infoTab", "position");
              setTab(3);
            }}
            className={data === "position" ? "is-active" : ""}
          >
            <a>Position</a>
          </li>
        </ul>
      </div>
      {data === "organizations" ? (
        <div>
          <Organizations />
        </div>
      ) : null}
      {data === "sphere" ? (
        <div>
          <Spheres />
        </div>
      ) : null}
      {data === "position" ? (
        <div>
          <Positions />
        </div>
      ) : null}
    </div>
  );
}

export default Information;
