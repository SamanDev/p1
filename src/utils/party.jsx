import React from "react";
import Confetti from "react-confetti";

const ConfettiArea = (prop) => {
  var width = document.body.offsetWidth;
  var height = document.body.offsetHeight;
  return (
    <Confetti
      width={width}
      height={height}
      confettiSource={{
        w: 10,
        h: 10,
        x: width / 2,
        y: height / 2,
      }}
      {...prop}
    />
  );
};

export default ConfettiArea;
