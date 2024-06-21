import React, { useState } from "react";
import { Button } from "semantic-ui-react";
const Actios = (prop) => {
  const [loading, setLoading] = useState(false);
  if (prop.row.status === "Pending") {
    return (
      <>
        <Button
          size="mini"
          color="green"
          icon="check"
          loading={loading}
          disabled={loading}
          onClick={() => prop.updateStatus(prop.row, "Done", setLoading)}
        />{" "}
        {prop.row.status === "Pending" && prop.row.mode === "Cashout" && (
          <Button
            size="mini"
            color="red"
            icon="times"
            loading={loading}
            disabled={loading}
            onClick={() => prop.updateStatus(prop.row, "Canceled", setLoading)}
          />
        )}
      </>
    );
  } else {
    if (
      (prop.row.status === "Done" && prop.row.pendingAmount > 0 && prop.row.paid==false && prop.row.mode != "Cashout") ||
      prop.row.mode === "Deposit"
    ) {
      return (
        <>
          <Button
            size="mini"
            color="yellow"
            icon="refresh"
            loading={loading}
            disabled={loading}
            onClick={() => prop.updateStatus(prop.row, "Pending", setLoading)}
          />
        </>
      );
    }
  
    if (
      ( prop.row.pendingAmount > 0) &&
      prop.row.mode === "Cashout"
    ) {
      return (
        <>
          <Button
            size="mini"
            color="yellow"
            icon="refresh"
            loading={loading}
            disabled={loading}
            onClick={() => prop.updateStatus(prop.row, "Canceled", setLoading)}
            content={"refound "+ prop.row.pendingAmount}
          />
        </>
      );
    }
  }
};
export default Actios;
