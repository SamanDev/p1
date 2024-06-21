import React from "react";
import { List } from "semantic-ui-react";
import Status from "../../utils/Status";
import AmountColor from "../../utils/AmountColor";
import NoData from "../../utils/noData";
import { convertDateToJalali } from "../../utils/convertDate";
import ConvertCart from "../../utils/convertCart";
const ListExampleInverted = (prop) => {
  const loginToken = prop.loginToken;
  return (
    <>
      {prop.title && (
        <ul className="mm-listview">
          <li className="menutitle menutitleinside mm-listitem"></li>
          <li className="menutitle menutitleinside mm-listitem">
            <span className="mm-listitem__text">{prop.title}</span>
          </li>
        </ul>
      )}

      <List divided inverted size="small" className="mylist">
        {loginToken.bankInfos.length == 0 && (
          <>
            <List.Item>
              <List.Content>
                <NoData msg="هیچ رکوردی یافت نشد." />
              </List.Content>
            </List.Item>
          </>
        )}
        {loginToken?.bankInfos.map((item, i) => {
          return (
            <List.Item key={i}>
              <List.Content>
                <List.Description className="rightfloat">
                  {convertDateToJalali(item.date)}
                  <div className="text-end pad10tb">
                    <Status status={item.active} size="mini" />
                  </div>
                </List.Description>
                <List.Description>
                  <AmountColor
                    amount={item.bankName}
                    className="farsi text-gold fw-bold"
                  />
                  <br />
                  <small className="fw-bold">
                    <ConvertCart cartNo={item.cardNumber} />
                  </small>
                  {/*  <br />
                  <small>{item.accountNumber}</small> */}
                  <br />
                  <small>IR{item.shebaNumber}</small>
                  <br />
                </List.Description>
              </List.Content>
            </List.Item>
          );
        })}
      </List>
    </>
  );
};

export default ListExampleInverted;
