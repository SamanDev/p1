import React from "react";
import { Message, Icon } from "semantic-ui-react";

const myMessage = (prop) => {
  return (
    <Message
      color={prop.color}
      className="mymessage"
      size={prop.size ? prop.size : "small"}
      icon={prop.icon ? true : false}
    >
      {prop.icon && prop.icon != "num" && <Icon name={prop.icon} />}
      {prop.num && prop.icon == "num" && (
        <Icon circular inverted color="black" style={{ fontSize: 20 }}>
          <span className="msgiconnum">{prop.num}</span>
        </Icon>
      )}

      <Message.Content className="farsi lh-base">{prop.text}</Message.Content>
    </Message>
  );
};
export default myMessage;
