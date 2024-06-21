import React, { useState } from "react";
import { Button, Message, Icon } from "semantic-ui-react";
import $ from "jquery";
const depositArea = (prop) => {
  const [depMode, setDepMode] = useState(false);
  return (
    <>
      <Message color="orange" compact className="mymessage" size="mini" icon>
        <Icon
          circular
          inverted
          color="black"
          name="vcard"
          style={{ fontSize: 20 }}
        />

        <Message.Content className="farsi">
          برای استفاده از این سرویس ابتدا باید کارت بانکی خود را ثبت نمایید.
        </Message.Content>
      </Message>
      <Button
        fluid
        style={{ margin: "10px 0" }}
        className="farsi"
        color="orange"
        onClick={() => $("#openaddcart").trigger("click")}
      >
        ثبت کارت بانکی
      </Button>
    </>
  );
};

export default depositArea;
