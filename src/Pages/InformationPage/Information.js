import React, { useState } from "react";
import { render } from "react-dom";
import Organizations from "./components/Organizations/Organizations";
import Positions from "./components/Positions/Positions";
import Spheres from "./components/Spheres/Spheres";

function Information() {
  const [tab, setTab] = useState("organizations");
  return (
    <div>
      <div className="tabs ">
        <ul>
          <li
            onClick={() => setTab("organizations")}
            className={tab === "organizations" ? "is-active" : ""}
          >
            <a>Organizations</a>
          </li>
          <li
            onClick={() => setTab("sphere")}
            className={tab === "sphere" ? "is-active" : ""}
          >
            <a>Sphere</a>
          </li>
          <li
            onClick={() => setTab("position")}
            className={tab === "position" ? "is-active" : ""}
          >
            <a>Position</a>
          </li>
        </ul>
      </div>
      {tab === "organizations" ? (
        <div>
          <Organizations />
        </div>
      ) : null}
      {tab === "sphere" ? (
        <div>
          <Spheres />
        </div>
      ) : null}
      {tab === "position" ? (
        <div>
          <Positions />
        </div>
      ) : null}
    </div>
  );
}

export default Information;
