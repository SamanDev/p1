import React from "react";
import { Button, Header, Icon, Segment, Image, Grid } from "semantic-ui-react";
import $ from "jquery";
import AnimIcon from "../../utils/inviteIcon";
import GameInbox from "./GameInbox";
import RewardStat from "./banners";
import SiteStat from "./sitestats";
function SegmentExamplePlaceholderInline(prop) {
  const siteInfo = prop?.siteInfo;
  return (
    <>
      <div className="container-md">
        <div style={{ height: 10, position: "relative" }}>
          <div
            style={{
              position: "absolute",
              zIndex: 0,
              top: -130,
              width: "100%",
              textAlign: "center",
              opacity: 0.8,
              filter: " drop-shadow(1px 1px 5px #ffffff)",
            }}
          >
            <AnimIcon
              icon="ilpmnyul"
              width="350px"
              height="500px"
              trigger="hover"
              stroke="4"
              colors="primary:#ffffff,secondary:#343c42"
            />
          </div>
        </div>
        <div className="text-center" style={{ overflow: "hidden" }}>
          <Header icon>
            <Icon>
              <Image
                src="/assets/images/logo.png"
                centered
                alt="گلکسی کازینو"
                style={{
                  width: "30vw",
                  maxWidth: "200px",
                  marginTop: 80,

                  filter:
                    " drop-shadow(1px 1px 30px #ffffff) drop-shadow(1px 1px 2px rgb(0 0 0 / 1)) drop-shadow(1px 1px 3px rgb(0 0 0 / 1)) drop-shadow(1px 1px 10px rgb(0 0 0 / 6))",
                }}
              />
            </Icon>
            <h1 className="text-center opacity-50">
              <strong
                className="farsi fw-bold fs-5"
                style={{
                  position: "relative",
                  top: -50,
                  color: "rgba(255,255,255,1)",
                  filter:
                    "drop-shadow(1px 1px 2px rgb(0 0 0 / 1)) drop-shadow(1px 1px 5px rgb(0 0 0 / 1))",
                }}
              >
                گلکسی کازینو
              </strong>
            </h1>
          </Header>
        </div>

      </div>
      <div className="container-sm">
      
        
        <Segment inverted padded="very" className="fadeoutend">
          
              <div className="farsi">
                <h2 className="farsi">
                سایت در حال به روز رسانی می‌باشد.
                </h2>
                <p className="lh-base">
                تا دقایق دیگر مثل همیشه با خدمات پایدار در خدمتتان خواهیم بود.
                </p>
                <h3 className="farsi">
                از شکیبای شما متشکریم.
                </h3>
              </div>
              
              <br /> <br />
           
        </Segment>
        <br />
        <br />
        <br />
        <br />
        <br />
    
      </div>
    </>
  );
}

export default SegmentExamplePlaceholderInline;
