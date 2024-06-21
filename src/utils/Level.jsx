import React from "react";
import { Icon, Image } from "semantic-ui-react";

const LevelList = (prop) => {
  return (
    <span className=" popupmenu">
      {prop.level > 0 ? (
        <>
          <Image avatar>
            <Icon name="star" inverted className={"lv" + prop.level}>
              <span className="levelText">{prop.level}</span>
            </Icon>
          </Image>
          {prop.user}
        </>
      ) : (
        <Image avatar>
          <Icon name="user" color="black" inverted />
        </Image>
      )}
    </span>
  );
};

export default LevelList;
