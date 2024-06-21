import React, { useEffect, useState } from "react";
import { List } from "semantic-ui-react";
import Status from "../../../../utils/Status";
import MenuLoader from "../../../../utils/menuLoader";
import { convertDateToJalali } from "../../../../utils/convertDate";
import AmountColor from "../../../../utils/AmountColor";
import { getReportService } from "../../../../services/report";
import NoData from "../../../../utils/noData";
const moment = require("moment");
function sendMessage(message) {
  try {
    const iframe = document.querySelector("iframe[name=gameframe]");
    iframe.contentWindow.postMessage(message, "*");
  } catch (error) {}
}
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
        var _res = res.data
          .filter((item) =>
            prop.menu?.usd
              ? item.endBalance2 != item.startBalance2
              : item.endBalance != item.startBalance
          )
          .sort((a, b) => (a.id < b.id ? 1 : -1));
        setData(_res);
      }
      setLoading(false);
    } catch (error) {
      //console.log(error.message);
    }
  };

  useEffect(() => {
    handleGetReports();
  }, []);

  if (loading) {
    return <MenuLoader />;
  } else {
    return (
      <span className="myaccount popupmenu">
        <List divided inverted size="small" className="mylist">
          {data.length == 0 && !prop.pending && (
            <>
              <List.Item>
                <List.Content>
                  <NoData msg="هیچ رکوردی یافت نشد." />
                </List.Content>
              </List.Item>
            </>
          )}
          {data.map((item, i) => {
            if (item.startBalance != item.endBalance || 1 == 1) {
              return (
                <List.Item key={i}>
                  {prop.menu?.usd ? (
                    <List.Content>
                      <List.Description className="rightfloat">
                        {convertDateToJalali(item.createDate)}

                        <div
                          className="text-end pad10tb"
                          onClick={() =>
                            sendMessage({
                              _id: item.description.split("id:")[1],
                            })
                          }
                        >
                          <Status status={item.status} size="mini" />
                        </div>
                      </List.Description>
                      <List.Description>
                        <AmountColor amount={item.startBalance2} />
                        <br />
                        <AmountColor
                          amount={item.amount2}
                          sign={item.endBalance2 - item.startBalance2}
                        />
                        <br />
                        --------------------
                        <br />
                        <AmountColor
                          amount={item.endBalance2}
                          className="text-gold"
                        />
                        <div className="pad10tb">
                          {item.mode} {item.gateway && <>({item.gateway})</>}
                        </div>
                      </List.Description>
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
                        <AmountColor amount={item.startBalance} />
                        <br />
                        <AmountColor
                          amount={item.amount}
                          sign={item.endBalance - item.startBalance}
                        />
                        <br />
                        --------------------
                        <br />
                        <AmountColor
                          amount={item.endBalance}
                          className="text-gold"
                        />
                        <div className="pad10tb">
                          {item.mode} {item.gateway && <>({item.gateway})</>}{" "}
                          {item.amount2 > 0 && <>$({item.amount2})</>}
                        </div>
                      </List.Description>
                    </List.Content>
                  )}
                </List.Item>
              );
            }
          })}
        </List>
      </span>
    );
  }
};

export default Report;
