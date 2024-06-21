import React, { useEffect } from "react";
import CountUp from "react-countup";

const CompleteHook = (prop) => {
  const oldbalance = localStorage.getItem("balance")
    ? localStorage.getItem("balance")
    : 0;
  useEffect(() => {
    if (!prop.set) {
      setTimeout(() => {
        localStorage.setItem("balance", prop.balance);
      }, 500);
    }
  }, [prop.balance]);
  const [loading, setLoading] = React.useState(false);

  const onStart = () => {
    setLoading(true);
  };

  const onEnd = () => {
    setLoading(false);
  };

  const containerProps = {
    "aria-busy": loading,
  };

  return (
    <>
      <CountUp
        start={oldbalance}
        end={prop.balance}
        duration="2"
        separator=","
        onStart={onStart}
        onEnd={onEnd}
        containerProps={containerProps}
      />
    </>
  );
};
export default CompleteHook;
