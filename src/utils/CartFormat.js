import React from "react";
import ConvertCart from "./convertCart";
import { doCurrency } from "../const";
import { convertDateToJalali } from "./convertDateAdmin";
const cartFormat = ({ row, isLock, amount, className }) => {
  return (
    <div
      className={className + " farsi"}
      style={{ padding: 10, direction: "ltr", maxWidth: 300 }}
    >
      {row.amount && amount && (
        <div className="fw-bold">
          {doCurrency(row.amount)} - {row.adminUsername}
          <br />
        </div>
      )}
      {row.date && row.amount && !amount && (
        <>
          <div className="blacktext text-center">
            {convertDateToJalali(row.date)}
          </div>
        </>
      )}
      {row.holderName && (
        <>
          {row.holderName}
          <br />
        </>
      )}

      <ConvertCart cartNo={row.cardNumber} isLock={isLock} />
      <br />
      {row.shebaNumber}
      <br />
      {row.bankName}
    </div>
  );
};
export default cartFormat;
