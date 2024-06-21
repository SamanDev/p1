import React, { useState, useEffect } from "react";
import { Accordion, Icon, Divider, Segment, Button } from "semantic-ui-react";
import Comment from "./Comment";
import AccessMsg from "../../utils/accessMsg";
import { convertDateToJalali } from "../../utils/convertDate";
import Ticket from "../../layouts/admin/forms/Cashout/Ticket";
import $ from "jquery";
import AnimIcon from "../../utils/inviteIcon";
import NoData from "../../utils/noData";
const Balance = (prop) => {
  const [activeIndex, setActiveIndex] = useState(-1);
  const [refresh, setRefresh] = useState(false);
  const siteInfo = prop?.siteInfo;
  const handleClick = (e, titleProps) => {
    const { index } = titleProps;

    const newIndex = activeIndex === index ? -1 : index;
    setActiveIndex(newIndex);
  };
  const loginToken = prop.loginToken;

  if (loginToken?.accessToken && !loginToken?.logout) {
    var data = loginToken?.userTickets
      .filter((d) => d.status !== "Closed")
      .sort((a, b) => (a.id < b.id ? 1 : -1));
    useEffect(() => {
      data = loginToken?.userTickets
        .filter((d) => d.status !== "Closed")
        .sort((a, b) => (a.id < b.id ? 1 : -1));
    });
    return (
      <span
        className="myaccount popupmenu mm-listview menutitle-view"
        style={{ padding: "0 15px" }}
      >
        {data.length == 0 ? (
          <>
            <NoData msg="هیچ تیکتی یافت نشد." />
          </>
        ) : (
          <div
            className="fadeout"
            style={{ height: 140, position: "relative" }}
          >
            <div style={{ position: "absolute", zIndex: 0, top: -15 }}>
              <AnimIcon
                icon="dxjqoygy"
                width="300px"
                height="200px"
                trigger="loop"
              />
            </div>
          </div>
        )}
        {data.length > 0 && (
          <Accordion inverted fluid>
            {data.map((ticket, i) => (
              <Segment
                key={i}
                inverted
                basic
                className={activeIndex === i ? "" : "fadeout"}
              >
                <Accordion.Title
                  active={activeIndex === i}
                  index={i}
                  onClick={handleClick}
                  id={"ticket" + ticket.id}
                >
                  <Icon name="dropdown" />
                  <span className="date">
                    {convertDateToJalali(ticket.date)}
                  </span>
                  <span className="farsi fw-bold text-gold">
                    {ticket.department}
                  </span>
                </Accordion.Title>
                <Accordion.Content active={activeIndex === i}>
                  <Ticket
                    departman={ticket.department}
                    id={ticket.id}
                    setRefresh={setRefresh}
                  />
                  <Divider inverted />

                  {ticket.ticketMessages
                    .sort((a, b) => (a.id < b.id ? 1 : -1))
                    .map((msg, j) => (
                      <Comment msg={msg} key={j} {...prop} />
                    ))}
                </Accordion.Content>

                {activeIndex != i && (
                  <div className={activeIndex === i ? "" : " opacity-75"}>
                    <Ticket
                      departman={ticket.department}
                      id={ticket.id}
                      setRefresh={setRefresh}
                      status="Close"
                    />
                    <span
                      onClick={() => {
                        $("#ticket" + ticket.id).trigger("click");
                      }}
                    >
                      <Comment
                        short={true}
                        msg={ticket.ticketMessages[0]}
                        {...prop}
                      />
                    </span>
                  </div>
                )}
              </Segment>
            ))}
          </Accordion>
        )}
      </span>
    );
  } else {
    return <AccessMsg {...prop} />;
  }
};

export default Balance;
