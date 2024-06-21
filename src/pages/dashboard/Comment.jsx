import React from "react";
import { Label, Segment } from "semantic-ui-react";
import { convertDateToJalali } from "../../utils/convertDate";

const CommentExampleMinimal = (prop) => {
  const string = prop.msg.message;
  var written = prop.msg.adminUser;
  const loginToken = prop.loginToken;
  if (written != loginToken?.username) {
    written = "Admin";
  } else {
    written = "You";
  }
  const result = string.split("\n");
  return (
    <>
      <Segment inverted className="msg" size="mini" basic>
        <div
          style={
            written == "You"
              ? { right: 10, position: "absolute" }
              : { left: 10, position: "absolute" }
          }
        >
          {convertDateToJalali(prop.msg.date)}
        </div>
        <Label
          size="small"
          color={written != "You" ? "red" : "blue"}
          ribbon={written != "You" ? "right" : true}
        >
          {written}
        </Label>

        <div
          style={{ marginTop: 10 }}
          className={prop.short ? "truncate fadeout" : ""}
        >
          {result.map(function (comment, i) {
            return (
              <div
                key={i}
                className={
                  written != "You"
                    ? "farsi msgtext text-wrap"
                    : "farsi  text-wrap"
                }
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
