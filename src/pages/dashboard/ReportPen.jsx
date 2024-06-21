import React, { useEffect, useState } from "react";
import Status from "../../utils/Status";
import MenuLoader from "../../utils/menuLoader";
import { convertDateToJalali } from "../../utils/convertDate";
import AmountColor from "../../utils/AmountColor";
import QR from "../../utils/qr";
import { getReportPenService } from "../../services/report";
import { doCurrency } from "../../const";
import { List, Divider, Segment } from "semantic-ui-react";

import ConvertCart from "../../utils/convertCart";
const sumOf = (array, id) => {
  try {
    return array.reduce((sum, currentValue) => {
      if (currentValue.id <= id) {
        var _am = currentValue.cashoutDescriptionFromSet[0].amount;
      } else {
        var _am = 0;
      }
      return sum + _am;
    }, 0);
  } catch (error) {
    return array.reduce((sum, currentValue) => {
      console.log(currentValue);
    }, 0);
  }
};
const Report = (prop) => {
  const loginToken = prop.loginToken;
  const [data, setData] = useState([]);

  var gateway = prop.gateway
    ? prop.gateway.replace(/ /g, "").replace("BTC", "Bitcoin")
    : "";
  const [loading, setLoading] = useState(true);
  const handleGetReports = async (mode) => {
    setLoading(true);
    try {
      if (prop.mode == "Pending") {
        var res = await getReportPenService(
          `getReportsByUser/?id=${loginToken.id}&status=Pending&page=1&number=${
            prop.count ? prop.count : 3
          }`,
          prop.menu?.usd ? prop.menu?.usd : false
        );
      } else {
        var res = await getReportPenService(
          `getReportsByUser/?id=${loginToken.id}&mode=${
            prop.mode
          }&gateway=${gateway}&page=1&number=${prop.count ? prop.count : 3}`,
          prop.menu?.usd ? prop.menu?.usd : false
        );
      }

      if (res.status === 200) {
        setData(res.data);
      }
    } catch (error) {
      //console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetReports();
  }, [loginToken]);
  var canShow = true;
  var canShowPending = true;
  if (loading) {
    if (!prop.pending) {
      return <MenuLoader />;
    } else {
      return null;
    }
  } else {
    if (data.length == 0) {
      return null;
    }
    return (
      <>
        <List divided inverted size="small" className="mylist">
          {data.map((item, i) => {
            if ((item.status == "Pending" || !prop.pending) && canShow) {
              if (i > prop.count) {
                canShow = false;
              }
              if (item.status == "Pending" && i > 0) {
                canShowPending = false;
              }
              try {
                var desc = JSON.parse(item.description);
              } catch (error) {
                var desc = item.description;
              }

              return (
                <List.Item key={i}>
                  {prop.menu?.usd ? (
                    <List.Content>
                      <List.Description className="rightfloat">
                        {convertDateToJalali(item.createDate)}

                        <div className="text-end pad10tb">
                          <Status status={item.status} size="mini" />
                        </div>
                      </List.Description>
                      <List.Description>
                        <div className="pad10tb">
                          <AmountColor
                            amount={item.dollarAmount}
                            sign={item.endBalance - item.startBalance + 1}
                            className="text-gold"
                          />
                        </div>
                        <div>{gateway}</div>
                        {!prop.pending && (
                          <div>
                            {item.mode && item.mode}{" "}
                            {item.gateway && " - " + item.gateway}
                          </div>
                        )}

                        <div className="cashlist">
                          {(gateway == "Bitcoin" ||
                            gateway == "USDT" ||
                            gateway == "PerfectMoney") && (
                            <>
                              Amount &nbsp;
                              <span className="text-gold">
                                ${doCurrency(desc.dollarAmount)}
                              </span>
                            </>
                          )}
                          {gateway == "PerfectMoney" && (
                            <>
                              <br />
                            </>
                          )}
                        </div>
                        {(item.gateway == "Bitcoin" ||
                          item.gateway == "USDT") &&
                          item.mode == "Deposit" && (
                            <>
                              <QR note={item} doCurrency={doCurrency} />
                            </>
                          )}
                      </List.Description>
                      {item.cashoutDescription &&
                        item.gateway == "IranShetab" && (
                          <Segment inverted size="mini">
                            {item.cashoutDescription
                              .sort((a, b) => (a.id > b.id ? 1 : -1))
                              .map((f, i) => (
                                <div key={i.toString()}>
                                  <span className="rightfloat">
                                    {convertDateToJalali(
                                      f.cashoutDescriptionFromSet[0].date
                                    )}
                                  </span>
                                  <span className="text-gold">
                                    {doCurrency(
                                      f.cashoutDescriptionFromSet[0].amount
                                    )}
                                  </span>
                                  <br />
                                  <div className="farsi text-secondary rightfloat">
                                    واریز به <br />
                                    مجموع:{" "}
                                    <span className="text-gold">
                                      {doCurrency(
                                        sumOf(item.cashoutDescription, f.id)
                                      )}
                                    </span>
                                  </div>
                                  <span className="farsi">
                                    {f.cashoutDescriptionToSet[0].bankName}
                                  </span>
                                  <br />
                                  <ConvertCart
                                    cartNo={
                                      f.cashoutDescriptionToSet[0].cardNumber
                                    }
                                    isLock={true}
                                  />
                                  <br />
                                  <div className="farsi text-secondary float-end">
                                    از
                                  </div>{" "}
                                  <br />
                                  <ConvertCart
                                    cartNo={
                                      f.cashoutDescriptionFromSet[0].cardNumber
                                    }
                                    isLock={true}
                                  />
                                  {item.cashoutDescription.length > i + 1 && (
                                    <Divider />
                                  )}
                                </div>
                              ))}
                          </Segment>
                        )}
                    </List.Content>
                  ) : (
                    <List.Content>
                      <List.Description className="rightfloat">
                        {convertDateToJalali(item.createDate)}

                        <div className="text-end pad10tb">
                          <Status status={item.status} size="mini" />
                        </div>
                      </List.Description>
                      <List.Description>
                        <div className="pad10tb">
                          <AmountColor
                            amount={item.amount}
                            sign={item.endBalance - item.startBalance + 1}
                            className="text-gold"
                          />
                        </div>
                        <div>{gateway}</div>
                        {!prop.pending && (
                          <div>
                            {item.mode && item.mode}{" "}
                            {item.gateway && " - " + item.gateway}
                          </div>
                        )}

                        <div className="cashlist">
                          {(gateway == "Bitcoin" ||
                            gateway == "USDT" ||
                            gateway == "PerfectMoney") && (
                            <>
                              Amount &nbsp;
                              <span className="text-gold">
                                ${doCurrency(desc.dollarAmount)}
                              </span>
                              <br />
                              Rate
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
                              <span className="text-gold">
                                {doCurrency(desc.dollarPrice)}
                              </span>
                            </>
                          )}
                          {gateway == "PerfectMoney" && (
                            <>
                              <br />
                            </>
                          )}
                        </div>
                        {(item.gateway == "Bitcoin" ||
                          item.gateway == "USDT") &&
                          item.mode == "Deposit" && (
                            <>
                              <QR note={item} doCurrency={doCurrency} />
                            </>
                          )}
                      </List.Description>
                      {item.cashoutDescription &&
                        item.gateway == "IranShetab" && (
                          <Segment inverted size="mini">
                            {item.cashoutDescription
                              .sort((a, b) => (a.id > b.id ? 1 : -1))
                              .map((f, i) => (
                                <div key={i.toString()}>
                                  <span className="rightfloat">
                                    {convertDateToJalali(
                                      f.cashoutDescriptionFromSet[0].date
                                    )}
                                  </span>
                                  <span className="text-gold">
                                    {doCurrency(
                                      f.cashoutDescriptionFromSet[0].amount
                                    )}
                                  </span>
                                  <br />
                                  <div className="farsi text-secondary rightfloat">
                                    واریز به <br />
                                    مجموع:{" "}
                                    <span className="text-gold">
                                      {doCurrency(
                                        sumOf(item.cashoutDescription, f.id)
                                      )}
                                    </span>
                                  </div>
                                  <span className="farsi">
                                    {f.cashoutDescriptionToSet[0].bankName}
                                  </span>
                                  <br />
                                  <ConvertCart
                                    cartNo={
                                      f.cashoutDescriptionToSet[0].cardNumber
                                    }
                                    isLock={true}
                                  />
                                  <br />
                                  <div className="farsi text-secondary float-end">
                                    از
                                  </div>{" "}
                                  <br />
                                  <ConvertCart
                                    cartNo={
                                      f.cashoutDescriptionFromSet[0].cardNumber
                                    }
                                    isLock={true}
                                  />
                                  {item.cashoutDescription.length > i + 1 && (
                                    <Divider />
                                  )}
                                </div>
                              ))}
                          </Segment>
                        )}
                    </List.Content>
                  )}
                </List.Item>
              );
            }
          })}
        </List>
      </>
    );
  }
};

export default Report;
