import React from "react";

import DepositArea from "./Deposit/index";
import CashoutArea from "./Cashout/index";

const depositArea = (prop) => {
  return (
    <>
      {prop.mode == "deposit" ? (
        <>
          <DepositArea {...prop} />
        </>
      ) : (
        <>
          <CashoutArea {...prop} />
        </>
      )}
    </>
  );
};

export default depositArea;
