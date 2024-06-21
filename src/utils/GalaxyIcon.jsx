import React from "react";
import { Image } from "semantic-ui-react";
import { levelPassClass } from "../const";
const LevelIcon = (prop) => {
  if (prop.mode == "gpass") {
    var _txt = prop.number ? prop.number : prop.level;
    return (
      <div className="avatar-center" {...prop}>
        <Image>
          <i
            className={
              prop.level
                ? "fab fa-google big star lv1 " + levelPassClass(prop.level - 1)
                : "fab fa-google big star lv15 shad2"
            }
          ></i>
        </Image>
        <span className={"text" + _txt.toString().length + " levelText big"}>
          {prop.number ? prop.number : prop.level}
        </span>
        <div>{prop.text}</div>
      </div>
    );
  }
  if (prop.mode == "vip") {
    return (
      <div className="avatar-center" {...prop}>
        <Image>
          <i className={"fab fa-vimeo-v big star yellow inverted"}></i>
        </Image>
        <span className="levelText big">
          {prop.number ? prop.number : prop.level}
        </span>
        <div>{prop.text}</div>
      </div>
    );
  }
  if (prop.mode == "bonus") {
    return (
      <div className="avatar-center" {...prop}>
        <Image>
          <i
            className={"fas fa-percent big star grey"}
            style={{ fontSize: 27 }}
          ></i>
        </Image>
        <span className="levelText big">
          {prop.number ? prop.number : prop.level}
        </span>
        <div>{prop.text}</div>
      </div>
    );
  }
  if (prop.mode == "commission") {
    return (
      <div className="avatar-center" {...prop}>
        <Image>
          <i
            className={"fas fa-percent big star red inverted"}
            style={{ fontSize: 27 }}
          ></i>
        </Image>
        <span className="levelText big">
          {prop.number ? prop.number : prop.level}
        </span>
        <div>{prop.text}</div>
      </div>
    );
  }
  if (prop.mode == "rakeback") {
    return (
      <div className="avatar-center" {...prop}>
        <Image>
          <i
            className={"fas fa-percent big star orange "}
            style={{ fontSize: 27 }}
          ></i>
        </Image>
        <span className="levelText big">
          {prop.number ? prop.number : prop.level}
        </span>
        <div>{prop.text}</div>
      </div>
    );
  }
  if (prop.mode == "league") {
    var _txt = prop.number ? prop.number : prop.level;
    return (
      <div className="avatar-center" {...prop}>
        <Image>
          <i
            className={
              prop.level
                ? "fas fa-gem big  gem lv1 " + levelPassClass(prop.level - 1)
                : "fas fa-gem big gem lv17 icon shad2"
            }
          ></i>
        </Image>

        <span className={"text" + _txt.toString().length + " levelText big"}>
          {prop.number ? prop.number : prop.level}
        </span>
        <div>{prop.text}</div>
      </div>
    );
  }
  if (prop.mode == "gift1") {
    return (
      <div className="avatar-center" {...prop}>
        <Image src="/assets/images/gift1.png" />

        <span className="levelText big mybig"></span>
        <div>{prop.text}</div>
      </div>
    );
  }
  if (prop.mode == "gift2") {
    return (
      <div className="avatar-center" {...prop}>
        <Image src="/assets/images/gift2.png" />
        <span className="levelText big mybig">+7</span>
        <div>{prop.text}</div>
      </div>
    );
  }
  if (prop.mode == "gift3") {
    return (
      <div className="avatar-center" {...prop}>
        <Image src="/assets/images/gift3.png" />
        <span className="levelText big mybig">+25</span>

        <div>{prop.text}</div>
      </div>
    );
  }
  if (prop.mode == "levels") {
    return (
      <div className="avatar-center" {...prop}>
        <img
          src={"/assets/images/stars/lvl" + _txt + ".png"}
          width={prop.width}
          height={prop.width}
          alt={prop.mode}
          style={{
            width: prop.width,
            height: "auto",
          }}
        />
        <div>{prop.text}</div>
      </div>
    );
  }
};

export default LevelIcon;
