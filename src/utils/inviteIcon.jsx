import React from "react";

const iconArea = (prop) => {
  return (
    <>
      <lord-icon
        src={"/assets/lord/" + prop.icon + ".json"}
        trigger={"loop-on-hover"}
        colors={prop.colors ? prop.colors : "primary:#e4e4e4,secondary:#e8b730"}
        stroke={prop.stroke ? prop.stroke : "20"}
        style={{ width: prop.width, height: prop.height }}
        scale={prop.scale ? prop.scale : ""}
        state={prop.state ? prop.state : ""}
      ></lord-icon>
    </>
  );
};

export default iconArea;
