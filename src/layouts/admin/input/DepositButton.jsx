import React from "react";
import { Button, Divider } from "semantic-ui-react";
import $ from "jquery";
import Report from "../../../pages/dashboard/ReportDep";
import ReportPen from "../../../pages/dashboard/ReportPen";

const DepositButton = (prop) => {
  return (
    <>
      <Button
        content={prop.val ? prop.val : "واریز"}
        fluid
        style={{ marginTop: 10 }}
        className="farsi"
        color="teal"
        type="submit"
        loading={prop.loading}
        disabled={prop.disabled}
        hidden={prop.hidden}
        onClick={() => {
          $("#dep1").hide();
          $("#dep2").show();
        }}
      />
      {prop.mode && prop.list ? (
        <>
          <ul className="mm-listview">
            <li className="menutitle menutitleinside mm-listitem">
              <span className="mm-listitem__text"></span>
            </li>
          </ul>

          <Report {...prop} />
        </>
      ) : (
        <div style={{ overflow: "hidden" }}>
          <div
            style={{
              overflow: "hidden",
              overflowY: "auto",
              maxHeight: 300,
              marginTop: 10,
            }}
          >
            <ReportPen mode={prop.mode} pending={true} count={1} {...prop} />
          </div>
        </div>
      )}
    </>
  );
};

export default DepositButton;
