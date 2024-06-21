import React from "react";
import { Label, Segment } from "semantic-ui-react";
import { convertDateToJalali } from "../../../utils/convertDate";

const CommentExampleMinimal = (prop) => {
  const string = prop.msg.message;
  var written = prop.msg.adminUser;

  const loginToken = prop.loginToken;

  const result = string.split("\n");
  return (
    <>
      <Segment inverted className="msg" size="mini" basic>
        <div
          style={
            written == prop.data.username
              ? { right: 10, position: "absolute" }
              : { left: 10, position: "absolute" }
          }
        >
          {convertDateToJalali(prop.msg.date)}
        </div>
        <Label
          size="small"
          color={written != prop.data.username ? "red" : "blue"}
          ribbon={written != prop.data.username ? "right" : true}
        >
          {written}
        </Label>

        <div style={{ marginTop: 10 }}>
          {result.map(function (comment, i) {
            return (
              <div
                key={i}
                className={written != "You" ? "farsi msgtext" : "farsi"}
              >
                {comment}
              </div>
            );
          })}
        </div>
      </Segment>
    </>
  );
};

export default CommentExampleMinimal;
