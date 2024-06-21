import React, { useEffect, useState } from "react";
import { List, Divider, Segment } from "semantic-ui-react";
import Status from "../../utils/Status";
import MenuLoader from "../../utils/menuLoader";
import { convertDateToJalali } from "../../utils/convertDate";
import AmountColor from "../../utils/AmountColor";
import { getReportService } from "../../services/report";
import { doCurrency } from "../../const";
import ConvertCart from "../../utils/convertCart";
import NoData from "../../utils/noData";
import CshListVgc from "./getcashlistVgc";
import CshList from "./getcashlist";

import CanceleCash from "./cancelecash";
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
    ? prop.gateway
        .replace(/ /g, "")
        .replace("BTC", "Bitcoin")
        .replace("Toman", "IranShetab")
    : "";

  const [loading, setLoading] = useState(true);
  const handleGetReports = async () => {
    setLoading(true);
    try {
      const res = await getReportService(
        loginToken.id,
        prop.mode,
        gateway,

        prop.menu?.usd
      );
      if (res.status === 200) {
        var _res = res.data.filter((item) =>
          prop.menu?.usd
            ? item.endBalance2 != item.startBalance2
            : item.endBalance != item.startBalance
        );

        setData(_res);
        if(gateway=="IranShetab"){
          handleGetReports2(_res,gateway)
        }
      }
    } catch (error) {
      //console.log(error.message);
    } finally {
      setLoading(false);
     
      
    }
  };
  const handleGetReports2 = async (data,getGateways) => {
    var gateway = getGateways
        
        .replace("IranShetab", "VisaGiftCode")
    ;
    setLoading(true);
    try {
      const res = await getReportService(
        loginToken.id,
        prop.mode,
        gateway,

        prop.menu?.usd
      );
      if (res.status === 200) {
        var _res = res.data.filter((item) =>
          prop.menu?.usd
            ? item.endBalance2 != item.startBalance2
            : item.endBalance != item.startBalance
        );
        var newdata = data
    

        const children = newdata.concat(_res).sort((a, b) => (a.createDate < b.createDate ? 1 : -1)); 
             
                setData(children);
        //setData(_res);
      }
    } catch (error) {
      //console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetReports();
  }, [prop.refresh]);
  var canShow = true;
  var canShowPending = true;
  if (loading) {
    if (!prop.pending) {
      return <MenuLoader />;
    } else {
      return null;
    }
  } else {
    return (
      <List divided inverted size="small" className="mylist">
        {data.length == 0 && (
          <>
            <List.Item>
              <List.Content>
                <NoData msg="هیچ رکوردی یافت نشد." />
              </List.Content>
            </List.Item>
          </>
        )}
        {data.map((item, i) => {
          if ((item.status == "Pending" || !prop.pending) && canShow) {
            if (prop.pending) {
              canShow = false;
            }
            if (item.status == "Pending" && i > 0) {
              canShowPending = false;
            }
            try {
              var desc = JSON.parse(item.description);
            } catch (error) {
              var desc = {};
            }
            return (
              <List.Item key={i}>
                {prop.menu?.usd ? (
                  <List.Content>
                    <List.Description className="float-end lh-lg">
                      {convertDateToJalali(item.createDate)}

                      <div className="text-end lh-lg">
                        <Status status={item.status} size="mini" />
                      </div>
                    </List.Description>
                    <List.Description className="lh-base">
                      <AmountColor
                        amount={item.amount2}
                        sign={item.endBalance2 - item.startBalance2}
                        className="text-gold"
                      />
                      {!prop.pending && (
                        <div>
                          {item.gateway && item.gateway}{" "}
                          {item.gateway == "Transfer" && (
                            <div>
                              {item.description
                                .replace("Remove transfer chip from:", "")
                                .replace("Add transfer chip to", "")
                                .replace("Remove usd transfer chip from:", "")
                                .replace(/:/g, "")}
                            </div>
                          )}
                          {item.coin && " - " + item.coin}
                        </div>
                      )}
                      <div className="cashlist">
                        <div className="cashlist">
                          {(prop.gateway == "Bitcoin" ||
                            prop.gateway == "USDT" ||
                            prop.gateway == "PerfectMoney") && (
                            <>
                              <small>
                                Amount &nbsp;
                                <span className="text-golds">
                                  ${doCurrency(desc.dollarAmount)}
                                </span>{" "}
                                - Fee &nbsp;
                                <span className="text-golds">${desc.fee}</span>
                              </small>
                              <br /> Final Amount &nbsp;
                              <span className="text-gold">
                                $
                                {doCurrency(
                                  desc.VOUCHER_AMOUNT
                                    ? desc.VOUCHER_AMOUNT
                                    : parseFloat(desc.amount).toFixed(2)
                                )}
                              </span>
                            </>
                          )}
                        </div>
                        {(prop.gateway == "Bitcoin" ||
                          prop.gateway == "USDT") && (
                          <>
                            <span className="text-gold">
                              {desc.walletAddress}
                            </span>
                          </>
                        )}
                      </div>
                    </List.Description>
                  </List.Content>
                ) : (
                  <List.Content>
                    <List.Description className="float-end lh-lg">
                      {convertDateToJalali(item.createDate)}

                      <div className="text-end lh-lg">
                        <Status status={item.status} size="mini" />
                      </div>
                    </List.Description>
                    <List.Description className="lh-base">
                      <AmountColor
                        amount={item.amount}
                        sign={item.endBalance - item.startBalance}
                        className="text-gold"
                      />
                      {!prop.pending && (
                        <div>
                          {item.gateway && item.gateway}{" "}
                          {item.gateway == "Transfer" && (
                            <div>
                              {item.description
                                .replace("Remove transfer chip from:", "")
                                .replace("Add transfer chip to", "")
                                .replace("Remove usd transfer chip from:", "")
                                .replace(/:/g, "")}
                            </div>
                          )}
                          {item.coin && " - " + item.coin}
                        </div>
                      )}

                      <div className="cashlist">
                        {(prop.gateway == "Bitcoin" ||
                          prop.gateway == "USDT" ||
                          prop.gateway == "PerfectMoney") && (
                          <>
                            <small>
                              Amount &nbsp;
                              <span className="text-golds">
                                ${doCurrency(desc.dollarAmount)}
                              </span>{" "}
                              - Fee &nbsp;
                              <span className="text-golds">${desc.fee}</span>
                              <br />
                              Rate
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
                              <span className="text-gold">
                                {doCurrency(desc.dollarPrice)}
                              </span>{" "}
                            </small>
                            <br /> Final Amount &nbsp;
                            <span className="text-gold">
                              $
                              {doCurrency(
                                desc.VOUCHER_AMOUNT
                                  ? desc.VOUCHER_AMOUNT
                                  : parseFloat(desc.amount).toFixed(2)
                              )}
                            </span>
                          </>
                        )}
                      </div>
                    </List.Description>
                    {item.status === "Pending" &&
                      item.gateway == "IranShetab" && (
                        <CanceleCash
                          id={item.id}
                          item={item.cashoutDescription}
                        />
                      )}
                    {item.status === "Done" &&
                      item.gateway == "IranShetab" &&
                      item.description.indexOf("V-G-C") == -1 && (
                        <CshList id={item.id} item={item.cashoutDescription} />
                      )}
                    {item.status === "Done" &&
                      item.gateway == "VisaGiftCode" &&
                      item.description.indexOf("V-G-C") > -1 && (
                        <CshListVgc id={item.id} item={item.description} />
                      )}
                  </List.Content>
                )}{" "}
              </List.Item>
            );
          }
        })}
      </List>
    );
  }
};

export default Report;
