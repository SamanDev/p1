import React from "react";

import AnimIcon from "./inviteIcon";
const NoData = (prop) => {
  return (
    <>
      <div style={{ height: 160, position: "relative" }}>
        <div
          className="fadeout"
          style={{
            position: "absolute",
            zIndex: 0,
            top: 0,
            width: "100%",
            textAlign: "center",
          }}
        >
          <AnimIcon
            icon="wibomifa"
            width="100px"
            height="150px"
            trigger="loop"
            colors="primary:#545454,secondary:#916f10"
          />
        </div>
      </div>
      <div
        className="farsi text-center text-secondary"
        style={{ marginBottom: 40 }}
      >
        {prop.msg}
      </div>
    </>
  );
};

export default NoData;
