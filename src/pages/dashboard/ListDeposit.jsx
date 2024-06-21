import React from "react";
import { List, Divider } from "semantic-ui-react";
import Status from "../../utils/Status";
import AmountColor from "../../utils/AmountColor";
import { doCurrency } from "../../const";
const ListExampleInverted = (prop) => (
  <List inverted relaxed size="mini" className="mylist">
    <List.Item>
      <List.Content>
        <List.Description style={{ float: "right" }}>
          <div className="date">7/5/2022 00:02</div>
          <div className="text-end">
            <Status status="Done" color="green" size="mini" />
          </div>
        </List.Description>
        <List.Description>
          <AmountColor amount="6000000" />
          <div className="cashlist">
            {(prop.mode == "BTC" ||
              prop.mode == "USDT" ||
              prop.mode == "PerfectMoney") && (
              <>
                Amount &nbsp;
                <span className="text-gold">${doCurrency(120)}</span>
                <br />
                Rate &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
                <span className="text-gold">{doCurrency(32520)}</span>
              </>
            )}
            {prop.mode == "PerfectMoney" && (
              <>
                <br />
              </>
            )}
            {(prop.mode == "VisaGiftCode" || prop.mode == "PerfectMoney") && (
              <>
                Code &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
                <span className="text-gold">h43oi43o43hio4io43hi</span>
              </>
            )}
          </div>
        </List.Description>
      </List.Content>
    </List.Item>
    <Divider inverted fitted />
    <List.Item>
      <List.Content>
        <List.Description style={{ float: "right" }}>
          <div className="date">7/5/2022 00:02</div>
          <div className="text-end">
            <Status status="Pending" color="teal" size="mini" />
          </div>
        </List.Description>
        <List.Description>
          <AmountColor amount="6000000" />`
          <div className="cashlist">
            {(prop.mode == "BTC" ||
              prop.mode == "USDT" ||
              prop.mode == "PerfectMoney") && (
              <>
                Amount &nbsp;
                <span className="text-gold">${doCurrency(120)}</span>
                <br />
                Rate &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
                <span className="text-gold">{doCurrency(32520)}</span>
              </>
            )}
            {prop.mode == "PerfectMoney" && (
              <>
                <br />
              </>
            )}
            {(prop.mode == "VisaGiftCode" || prop.mode == "PerfectMoney") && (
              <>
                Code &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
                <span className="text-gold">h43oi43o43hio4io43hi</span>
              </>
            )}
          </div>
        </List.Description>
      </List.Content>
    </List.Item>
  </List>
);

export default ListExampleInverted;
