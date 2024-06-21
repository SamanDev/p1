import React from "react";
import Confetti from "react-dom-confetti";

const config = {
  angle: "269",
  spread: 360,
  startVelocity: 40,
  elementCount: 70,
  dragFriction: 0.12,
  duration: 10000,
  stagger: 3,
  width: "10px",
  height: "10px",
  perspective: "500px",
  colors: ["#000", "#f00"],
};

const ConfettiArea = (prop) => {
  var width = document.body.offsetWidth;
  var height = document.body.offsetHeight;
  return (
    <Confetti
      width={width}
      height={height}
      active={prop.active}
      config={prop.config ? prop.config : config}
    />
  );
};

export default ConfettiArea;
