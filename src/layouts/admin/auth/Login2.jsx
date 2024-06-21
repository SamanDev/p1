import React, { useState } from "react";
import {
  Label,
  Input,
  Header,
  Divider,
  Icon,
  Button,
  Segment,
} from "semantic-ui-react";
import Amount from "../input/Amount";
import DepositButton from "../input/DepositButton";
import $ from "jquery";
const defCol = "black";
const selCol = "green";
const defColBtn = "grey";
const selColBtn = "orange";
const depositArea = (prop) => {
  const [depMode, setDepMode] = useState(false);
  return (
    <>
      <Segment
        inverted
        padded="very"
        className="fadeout"
        style={{
          paddingBottom: 100,
          background: "transparent",
          boxShadow: "0 40px 50px rgba(81,88,95,.6549019607843137)",
        }}
      >
        <Header as="h2" inverted className="farsi">
          ورود به گلکسی
        </Header>

        <Divider hidden />
        <Input
          size={prop.size}
          fluid
          label={
            <Label size="tiny" pointing="right" color="black" className="farsi">
              نام گاربری
            </Label>
          }
          labelPosition="left"
          defaultValue=""
          style={{ margin: 5 }}
        />
        <Input
          size={prop.size}
          fluid
          label={
            <Label size="tiny" pointing="right" color="black" className="farsi">
              کلمه عبور
            </Label>
          }
          labelPosition="left"
          defaultValue=""
          style={{ margin: 5 }}
        />
        <Label
          color="black"
          fluid
          className="farsi-inline"
          style={{ textAlign: "right", display: "block", padding: "10px 0" }}
          size="mini"
          as="a"
          onClick={() => {
            prop.setFirstOpen(false);
            prop.setSecondOpen(true);
          }}
        >
          کلمه عبور را فراموش کرده اید؟
        </Label>
        <Button
          content="ورود"
          fluid
          style={{ margin: "10px 0" }}
          className="farsi"
          color="teal"
        />

        <Divider inverted />

        <Button
          color="black"
          fluid
          className="farsi-inline"
          size="mini"
          onClick={() => {
            prop.setFirstOpen(false);
            prop.setSecondOpen(true);
          }}
        >
          اکانت ندارید؟ ثبت نام کنید
        </Button>
      </Segment>
    </>
  );
};

export default depositArea;
