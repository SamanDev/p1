import React from "react";
import { List, Divider } from "semantic-ui-react";
import Status from "../../utils/Status";
import AmountColor from "../../utils/AmountColor";
import Accordion from "../../pages/dashboard/Accordion";
import { doCurrency } from "../../const";
const ListExampleInverted = () => (
  <span className="myaccount popupmenu">
    <List divided inverted relaxed size="mini" className="mylist">
      <List.Item>
        <List.Content className="cashlist">
          <List.Description style={{ float: "right" }}>
            <div className="date">7/5/2022 00:02</div>
            <div className="text-end">Poker</div>
            <div className="text-end">From Casino To HangOver</div>
            <div className="text-end">
              {" "}
              <Status status="Done" color="green" size="mini" />
            </div>
          </List.Description>
          <List.Description>
            286,635
            <br />
            <AmountColor amount="+ 12,168,347" />
            <br />
            ----------
            <br />
            <AmountColor amount="12,168,347" />
          </List.Description>
        </List.Content>
      </List.Item>
      <Divider inverted fitted />
      <List.Item>
        <List.Content className="cashlist">
          <List.Description style={{ float: "right" }}>
            <div className="date text-end">7/5/2022 00:02</div>
            <div className="text-end">Total Income</div>
            <div className="text-end">From Casino To HangOver</div>
            <div className="text-end">
              {" "}
              <Status status="Done" color="green" size="mini" />
            </div>
          </List.Description>
          <List.Description>
            286,635
            <br />
            <AmountColor amount="- 12,168,347" />
            <br />
            ----------
            <br />
            <AmountColor amount="12,168,347" />
          </List.Description>
        </List.Content>
      </List.Item>
    </List>
  </span>
);

export default ListExampleInverted;
