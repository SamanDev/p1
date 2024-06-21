import React from "react";
import AnimIcon from "./inviteIcon";
const LevelIcon = (prop) => {
  const loginToken = prop.loginToken;
  if (prop.mode == "gpass") {
    var _txt = prop.number ? prop.number : prop.level;

    if (prop.text == "big") {
      _txt = "icons/gpass";
    } else {
      _txt = "gpass/glvl" + _txt;
    }
    return (
      <span onClick={prop.onClick} className="iconarea">
        <img
          src={"/assets/images/" + _txt + ".webp"}
          width={prop.width}
          height={prop.width}
          alt={prop.mode}
          className={" gpassicon icn"}
          style={{
            width: prop.width,
            height: "auto",
          }}
        />

        {prop.text != "big" && prop.text != "" && (
          <div className="iconlabel">{prop.text}</div>
        )}
      </span>
    );
  }

  if (prop.mode == "vip") {
    var _txt = prop.number ? prop.number : prop.level;
    var _class = "vipicon";
    if (prop.text == "big") {
      _class = _class + " big icn";
    }

    return (
      <span onClick={prop.onClick} className="iconarea">
        <img
          src={"/assets/images/svg/vip/icon.svg"}
          width={prop.width}
          height={prop.width}
          alt={prop.mode}
          style={{
            width: prop.width,
            height: "auto",
          }}
        />

        {prop.text != "big" && prop.text != "" && (
          <div className="iconlabel">{prop.text}</div>
        )}
      </span>
    );
  }

  if (prop.mode == "tournament") {
    var _txt = prop.number ? prop.number : prop.level;
    var _class = "vipicon";
    if (prop.text == "big") {
      _class = _class + " big";
    }

    if (prop.amin) {
      _class = _class + " " + prop.amin;
    }
    var _class2 = "";
    if (prop.iconamin) {
      _class2 = _class2 + " " + prop.iconamin.replace("charkhesh", "");
    }
    return (
      <span onClick={prop.onClick} className="iconarea">
        <img
          src={"/assets/images/svg/tournament/icon.svg"}
          width={prop.width}
          height={prop.width}
          alt={prop.mode}
          style={{
            width: prop.width,
            height: "auto",
          }}
        />

        {prop.text != "big" && prop.text != "" && (
          <div className="iconlabel">{prop.text}</div>
        )}
      </span>
    );
  }
  if (prop.mode == "kingof") {
    var _txt = prop.number ? prop.number : prop.level;
    var _class = "vipicon";
    if (prop.text == "big") {
      _class = _class + " big";
    }

    if (prop.amin) {
      _class = _class + " " + prop.amin;
    }
    var _class2 = "";
    if (prop.iconamin) {
      _class2 = _class2 + " " + prop.iconamin.replace("charkhesh", "");
    }
    return (
      <span onClick={prop.onClick} className="iconarea">
        <img
          src={"/assets/images/svg/kingof/icon.svg"}
          width={prop.width}
          height={prop.width}
          alt={prop.mode}
          style={{
            width: prop.width,
            height: "auto",
          }}
        />

        {prop.text != "big" && prop.text != "" && (
          <div className="iconlabel">{prop.text}</div>
        )}
      </span>
    );
  }
  if (prop.mode == "bonus") {
    return (
      <span className="iconarea">
        <img
          src={"/assets/bonus.svg"}
          className="icn"
          width={prop.width}
          height={prop.width}
          alt={prop.mode}
          style={{
            width: prop.width,
            height: "auto",
          }}
        />
        {prop.text != "big" && prop.text != "" && (
          <div className="iconlabel">{prop.text}</div>
        )}
      </span>
    );
  }
  if (prop.mode == "commission") {
    var _txt = prop.number ? prop.number : prop.level;
    var _class = "rakebackicon";
    if (prop.text == "big") {
      _class = _class + " big";
    }

    if (prop.amin) {
      _class = _class + " " + prop.amin;
    }
    var _class2 = _class;
    if (prop.iconamin) {
      _class2 = _class2 + " " + prop.iconamin.replace("charkhesh", "");
    }
    return (
      <span onClick={prop.onClick} className="iconarea">
        <span
          className={_class}
          style={{
            width: prop.width,
            height: "auto",
          }}
        >
          <img
            src={"/assets/commission.svg"}
            width={prop.width}
            height={prop.width}
            alt={prop.mode}
            style={{
              width: prop.width,
              height: "auto",
            }}
          />
        </span>
        {prop.text != "big" && prop.text != "" && (
          <div className="iconlabel">{prop.text}</div>
        )}
      </span>
    );
  }
  if (prop.mode == "rakeback") {
    var _txt = prop.number ? prop.number : prop.level;
    var _class = "rakebackicon";
    if (prop.text == "big") {
      _class = _class + " big";
    }

    if (prop.amin) {
      _class = _class + " " + prop.amin;
    }
    var _class2 = _class;
    if (prop.iconamin) {
      _class2 = _class2 + " " + prop.iconamin.replace("charkhesh", "");
    }
    return (
      <span onClick={prop.onClick} className="iconarea">
        <img
          src={"/assets/images/icons/rackback.webp"}
          width={prop.width}
          height={prop.width}
          alt={prop.mode}
          className={_class2 + " gpassicon icn"}
          style={{
            width: prop.width,
            height: "auto",
          }}
        />

        {prop.text != "big" && prop.text != "" && (
          <div className="iconlabel">{prop.text}</div>
        )}
      </span>
    );
  }
  if (prop.mode == "league") {
    var _txt = prop.number ? prop.number : prop.level;
    var _class = " ";
    if (prop.text == "big") {
      _class = _class + " big";
    }

    if (prop.amin) {
      _class = _class + " " + prop.amin;
    }
    var _class2 = "";
    if (prop.iconamin) {
      _class2 = _class2 + " " + prop.iconamin.replace("charkhesh", "");
    }
    return (
      <span onClick={prop.onClick} className="iconarea">
        <div
          style={{
            transform: "scale(.8)",
            position: "absolute",
            zIndex: 300000,
            width: prop.width,
            height: prop.width,
            textAlign: "center",
          }}
        >
          <svg
            version="1.1"
            className="leagueicon icn"
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            viewBox="0 0 510.738 510.738"
            style={{
              width: prop.width,
              height: prop.width,
            }}
          >
            <text
              x="255"
              y="250"
              className={
                "leagueicontext text" +
                _txt.toString().length +
                " slow " +
                _class
              }
            >
              {_txt}
            </text>
          </svg>
        </div>
        <img
          src={"/assets/images/svg/league/icon.svg"}
          width={prop.width}
          height={prop.width}
          alt={prop.mode}
          style={{
            width: prop.width,
            height: prop.width,
            position: "relative",
            zIndex: 1,
          }}
        />

        {prop.text != "big" && prop.text != "" && (
          <div className="iconlabel">{prop.text}</div>
        )}
      </span>
    );
  }

  if (prop.mode == "gifts") {
    var _txt = prop.number ? prop.number : prop.level;
    var _class = "";
    if (prop.text == "big") {
      _class = _class + " big";
    }
    var _class2 = _class;
    if (prop.iconamin) {
      var _class2 =
        _class +
        " " +
        prop.iconamin.replace("charkhesh", "").replace("inline", "") +
        " tada";
    }
    return (
      <div onClick={prop.onClick} className="iconarea">
        <img
          src={"/assets/images/icons/gift3.webp"}
          width={prop.width}
          height={prop.width}
          alt={prop.mode}
          className={_class2 + "  icn"}
          style={{
            width: prop.width,
            height: "auto",
          }}
        />
      </div>
    );
  } else if (prop.mode.indexOf("gift") > -1) {
    var _txt = prop.number ? prop.number : prop.level;
    var _class = "";
    if (prop.text == "big") {
      _class = _class + " big";
    }
    var _class2 = _class;
    if (prop.iconamin) {
      var _class2 =
        _class +
        " " +
        prop.iconamin.replace("charkhesh", "").replace("inline", "") +
        " tada";
    }
    return (
      <div onClick={prop.onClick} className="iconarea">
        <img
          src={"/assets/images/icons/" + prop.mode + ".webp"}
          width={prop.width}
          height={prop.width}
          alt={prop.mode}
          className={_class2 + "  icn"}
          style={{
            width: prop.width,
            height: "auto",
          }}
        />
        {prop.text != "big" && prop.text != "" && (
          <div className="iconlabel">{prop.text}</div>
        )}
      </div>
    );
  }
  if (prop.mode == "topplayer") {
    var _txt = prop.number ? prop.number : prop.level;
    var _class = "vipicon";
    if (prop.text == "big") {
      _class = _class + " big";
    }
    var _class2 = _class;
    if (prop.iconamin) {
      var _class2 =
        _class +
        " " +
        prop.iconamin.replace("charkhesh", "").replace("inline", "") +
        " tada";
    }
    return (
      <div
        onClick={prop.onClick}
        className="iconarea"
        style={{
          width: prop.width,
          height: "auto",
          textAlign: "left",
        }}
      >
        <img
          src={"/assets/images/svg/topplayer/icon.svg"}
          width={prop.width}
          height={prop.width}
          alt={prop.mode}
          style={{
            width: prop.width,
            height: "auto",
            position: "relative",
            zIndex: 1,
          }}
        />
        <span
          style={{
            width: prop.width,
            height: "auto",
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 0,
          }}
        >
          <img
            src={"/assets/topplayer.svg"}
            width={prop.width}
            height={prop.width}
            alt={prop.mode}
            style={{
              position: "absolute",

              transform: "translateX(25%) scale(.6) rotate(5deg)",
              transformOrigin: "center right",
            }}
          />
        </span>
        <span
          style={{
            width: prop.width,
            height: "auto",
            position: "absolute",
            top: 0,
            left: 0,
          }}
        >
          <img
            src={"/assets/chipblack.svg"}
            width={prop.width}
            height={prop.width}
            alt={prop.mode}
            style={{
              position: "absolute",

              transform: "translateX(-25%) scale(.5) rotate(-5deg)",
              transformOrigin: "center left",
            }}
          />
        </span>
        {prop.text != "big" && prop.text != "" && (
          <div className="iconlabel">{prop.text}</div>
        )}
      </div>
    );
  }
  if (prop.mode == "cashout") {
    var _txt = prop.number ? prop.number : prop.level;
    var _class = "vipicon";
    if (prop.text == "big") {
      _class = _class + " big";
    }
    var _class2 = _class;
    if (prop.iconamin) {
      var _class2 =
        _class +
        " " +
        prop.iconamin.replace("charkhesh", "").replace("inline", "") +
        " tada";
    }
    return (
      <div onClick={prop.onClick} className="iconarea">
        <div style={{ position: "relative", top: -20 }}>
          <AnimIcon
            icon="yeallgsa"
            stroke="20"
            scale="65"
            colors="primary:#c79816,secondary:#b4b4b4"
            trigger="loop"
            width={90}
            height={90}
          />
        </div>

        {prop.text != "big" && prop.text != "" && (
          <div className="iconlabel">{prop.text}</div>
        )}
      </div>
    );
  }
  if (prop.mode == "deposit") {
    var _txt = prop.number ? prop.number : prop.level;
    var _class = "leagueicon";
    if (prop.text == "big") {
      _class = _class + " big";
    }
    var _class2 = _class;
    if (prop.iconamin) {
      var _class2 =
        _class +
        " " +
        prop.iconamin.replace("charkhesh", "").replace("inline", "") +
        " tada";
    }
    return (
      <div onClick={prop.onClick} className="iconarea">
        <div style={{ position: "relative", top: -20 }}>
          <AnimIcon
            icon="qhviklyi"
            stroke="20"
            scale="65"
            colors="primary:#b4b4b4,secondary:#c79816"
            trigger="loop"
            width={90}
            height={90}
          />
        </div>

        {prop.text != "big" && prop.text != "" && (
          <div className="iconlabel">{prop.text}</div>
        )}
      </div>
    );
  }
  if (prop.mode == "depositusd") {
    var _txt = prop.number ? prop.number : prop.level;
    var _class = "leagueicon";
    if (prop.text == "big") {
      _class = _class + " big";
    }
    var _class2 = _class;
    if (prop.iconamin) {
      var _class2 =
        _class +
        " " +
        prop.iconamin.replace("charkhesh", "").replace("inline", "") +
        " tada";
    }
    return (
      <div onClick={prop.onClick} className="iconarea">
        <div style={{ position: "relative", top: -20 }}>
          <AnimIcon
            icon="huwchbks"
            stroke="20"
            scale="65"
            colors="primary:#b4b4b4,secondary:#c79816"
            trigger="loop"
            width={90}
            height={90}
          />
        </div>

        {prop.text != "big" && prop.text != "" && (
          <div className="iconlabel">{prop.text}</div>
        )}
      </div>
    );
  }
  if (prop.mode == "transfer") {
    var _txt = prop.number ? prop.number : prop.level;
    var _class = "leagueicon";
    if (prop.text == "big") {
      _class = _class + " big";
    }
    var _class2 = _class;
    if (prop.iconamin) {
      var _class2 =
        _class +
        " " +
        prop.iconamin.replace("charkhesh", "").replace("inline", "") +
        " tada";
    }
    return (
      <div onClick={prop.onClick} className="iconarea">
        <div style={{ position: "relative", top: -20 }}>
          <AnimIcon
            icon="ssdupzsv"
            stroke="20"
            scale="65"
            colors="primary:#b4b4b4,secondary:#c79816"
            trigger="loop"
            width={90}
            height={90}
          />
        </div>

        {prop.text != "big" && prop.text != "" && (
          <div className="iconlabel">{prop.text}</div>
        )}
      </div>
    );
  }
  if (prop.mode == "transaction") {
    var _txt = prop.number ? prop.number : prop.level;
    var _class = "leagueicon";
    if (prop.text == "big") {
      _class = _class + " big";
    }
    var _class2 = _class;
    if (prop.iconamin) {
      var _class2 =
        _class +
        " " +
        prop.iconamin.replace("charkhesh", "").replace("inline", "") +
        " tada";
    }
    return (
      <div onClick={prop.onClick} className="iconarea">
        <div style={{ position: "relative", top: -20 }}>
          <AnimIcon
            icon="rgyftmhc"
            stroke="20"
            scale="65"
            colors="primary:#b4b4b4,secondary:#c79816"
            trigger="loop"
            width={90}
            height={90}
          />
        </div>

        {prop.text != "big" && prop.text != "" && (
          <div className="iconlabel">{prop.text}</div>
        )}
      </div>
    );
  }

  if (prop.mode == "levels") {
    var _txt = prop.number ? prop.number : prop.level;

    if (prop.text == "big") {
      if (loginToken) {
        _txt = loginToken.level;
      } else {
        _txt = 90;
      }
    }

    return (
      <span onClick={prop.onClick} className="iconarea">
        <img
          src={"/assets/images/stars/lvl" + _txt + ".webp"}
          width={prop.width}
          height={prop.width}
          alt={prop.mode}
          style={{
            width: prop.width,
            height: "auto",
          }}
        />

        {prop.text != "big" && prop.text != "" && (
          <div className="iconlabel">{prop.text}</div>
        )}
      </span>
    );
  }
};

export default LevelIcon;
