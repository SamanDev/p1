import React from "react";
import { Icon, Image } from "semantic-ui-react";
import { levelClass, levelPassClass } from "../const";
const LevelIcon = (prop) => {
  var _txt = prop.number ? prop.number : prop.level;
  if (prop.text) {
    return (
      <div className="avatar-center small">
        {prop.icon ? (
          <>
            <Image avatar>
              <i
                className={prop.icon + " " + levelPassClass(prop.level - 1)}
              ></i>
            </Image>
            {!prop.selfUser && (
              <span
                className={"text" + _txt.toString().length + " levelText big"}
              >
                {_txt}
              </span>
            )}
            {prop.selfUser && prop.selfUser != "" && (
              <span
                className={"text" + _txt.toString().length + " levelText big"}
              >
                {_txt}
              </span>
            )}
          </>
        ) : (
          <>
            <Image avatar>
              <Icon
                name="star"
                inverted
                size="big"
                className={levelClass(prop.level - 1)}
              >
                <span className="levelText">
                  {prop.number ? prop.number : prop.level}
                </span>
              </Icon>
            </Image>
          </>
        )}
        {prop.text != "User name" && <b>{prop.text}</b>}
      </div>
    );
  } else {
    return (
      <>
        <Icon
          name={prop.icon}
          inverted
          size="big"
          className={levelClass(prop.level - 1)}
          {...prop}
        >
          <span className="levelText">
            {prop.number ? prop.number : prop.level}
          </span>
        </Icon>
      </>
    );
  }
};

export default LevelIcon;
