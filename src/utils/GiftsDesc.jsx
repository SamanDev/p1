import React, { useEffect } from "react";
import { Divider, Segment } from "semantic-ui-react";
import { doCurrency } from "../const";
const LevelIcon = (prop) => {
  useEffect(() => {}, []);
  return (
    <Segment inverted basic>
      <div className="mybig">
        {prop.amount && (
          <span className="text-gold">{doCurrency(prop.amount)} </span>
        )}
        {prop.title && <span className="text-gold farsi">{prop.title}</span>}
        <div className="mysmall">
          <small className="farsi">{prop.subtitle}</small>
        </div>
      </div>
      {prop.desc && (
        <>
          <Divider />
          <div className="farsi mywrap lh-lg">{prop.desc}</div>
        </>
      )}
      {prop.desc2 && (
        <>
          <Divider />
          <div className="farsi mywrap lh-lg">{prop.desc2}</div>
        </>
      )}
      {prop.desc3 && (
        <>
          <Divider />
          <div className="farsi mywrap lh-lg">{prop.desc3}</div>
        </>
      )}
      {prop.desc4 && (
        <>
          <Divider />
          <div className="farsi mywrap lh-lg">{prop.desc4}</div>
        </>
      )}
      {prop.desc5 && (
        <>
          <Divider />
          <div className="farsi mywrap lh-lg">{prop.desc5}</div>
        </>
      )}
    </Segment>
  );
};

export default LevelIcon;
