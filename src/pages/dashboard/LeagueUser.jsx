import React from "react";
import { List } from "semantic-ui-react";
import { doCurrency } from "../../const";
import LevelIcon from "../../utils/LevelIcon";
const LevelList = (prop) => {
  const loginToken = prop.loginToken;

  return (
    <>
      {loginToken && (
        <List.Item className="active">
          <List.Content floated="right" className="rtl">
            <span className="text-gold">{doCurrency(1000000)} </span>
            <span className="mysmall">
              <small className="farsi">تومان پاداش</small>
            </span>
            <div className="mysmall">
              {doCurrency(12542515)}{" "}
              <small className="farsi mysmall">امتیاز امروز</small>
            </div>
          </List.Content>
          <span style={{ float: "left" }}>
            <LevelIcon
              icon="fas fa-gem outline big star noNext"
              level={1}
              text={"User name"}
              number="202"
            />
          </span>
          <div
            style={{
              position: "relative",
              left: -50,
              transform: "scale(.8)",
            }}
          >
            <LevelIcon level={loginToken.level} text={loginToken.username} />
          </div>
        </List.Item>
      )}
    </>
  );
};

export default LevelList;
