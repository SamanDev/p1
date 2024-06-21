import React, { useState } from "react";
import { Header, Divider, Button, Segment } from "semantic-ui-react";
import { checkBlock } from "../../../services/httpService";
import { getUserService } from "../../../services/auth";
const depositArea = (prop) => {
  const [depMode, setDepMode] = useState(false);
  const loginToken = prop.loginToken;

  return (
    <Segment
      inverted
      padded="very"
      style={{
        paddingBottom: 50,
        boxShadow: "0 40px 50px rgba(81,88,95,.6549019607843137)",
      }}
    >
      <Header as="h2" inverted className="farsi">
        قطع ارتباط با سرور
      </Header>
      <Divider hidden />

      <p className="farsi">
        ارتباط شما با سرور گلکسی قطع شده است. برای اتصال مجدد از دکمه زیر
        استفاده نمایید.
      </p>
      <Divider inverted />
      <Button
        content="اتصال مجدد"
        fluid
        type="button"
        size="huge"
        style={{ margin: "10px 0" }}
        disabled={depMode}
        loading={depMode}
        //id="reconn"
        onClick={() => {
          getUserService()
          setDepMode(true);
          //window.location.reload();
        }}
        className="farsi"
        color="red"
      />
    </Segment>
  );
};

export default depositArea;
