import React from "react";
import { List, Message, Divider } from "semantic-ui-react";
import { doCurrency } from "../../const";
import AmountColor from "../../utils/AmountColor";
const CommentExampleMinimal = () => (
  <Message color="black">
    <List inverted>
      <List.Item>
        <List.Content className="cashlist">
          <List.Description style={{ float: "right" }}>
            <div className="date">7/5/2022 00:02</div>
          </List.Description>
          <List.Description>
            <AmountColor amount="1000000" />
            <div className="cashlist">
              from &nbsp;&nbsp;{" "}
              <span className="text-gold">6396 **** **** 5559</span>
              <br />
              to &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
              <span className="text-gold">5022 **** **** 8233</span>
              <br />
              Total &nbsp;&nbsp;
              <span className="text-gold">{doCurrency(1000000)}</span>
            </div>
          </List.Description>
        </List.Content>
      </List.Item>
      <Divider inverted fitted />
      <List.Item>
        <List.Content className="cashlist">
          <List.Description style={{ float: "right" }}>
            <div className="date">7/5/2022 00:02</div>
          </List.Description>
          <List.Description>
            <AmountColor amount="1000000" />
            <div className="cashlist">
              from &nbsp;&nbsp;{" "}
              <span className="text-gold">6396 **** **** 5559</span>
              <br />
              to &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
              <span className="text-gold">5022 **** **** 8233</span>
              <br />
              Total &nbsp;&nbsp;
              <span className="text-gold">{doCurrency(1000000)}</span>
            </div>
          </List.Description>
        </List.Content>
      </List.Item>
    </List>
  </Message>
);

export default CommentExampleMinimal;
