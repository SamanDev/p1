import React from "react";
import { levelClass, levelClassInside } from "../const";
const LevelIcon = (prop) => {
  if (prop.mode == "gpass") {
    var _txt = prop.number ? prop.number : prop.level;
    var _class = levelClass(prop.level - 1) + " icn";
    if (prop.text == "big") {
      _class = _class + " big";
    }
    if (prop.iconamin) {
      // _class = _class + " " + prop.iconamin;
    }

    var _class2 = "";
    if (prop.amin) {
      _class2 = prop.amin;
    }
    return (
      <span onClick={prop.onClick} className="iconarea">
        <svg
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          width="24px"
          height="24px"
          className="gpassicon icn"
          viewBox="0 0 24 24"
          style={{
            width: prop.width,
            height: "auto",
          }}
        >
          <g className={_class2}>
            <path
              className={_class}
              d="M12.03 0C6.94 0 2.57 3.17.82 7.65l1.91.77a10 10 0 0 1 9.3-6.4c2.24 0 4.32.77 5.96 1.97l1.2-1.64A11.96 11.96 0 0 0 12.03 0zm0 2.3a9.76 9.76 0 0 0-9.08 6.23l1.91.7a7.62 7.62 0 0 1 7.17-4.91zm3.55.7l-.76 1.92a7.47 7.47 0 0 1 4.75 5.63h2.08a9.7 9.7 0 0 0-6.07-7.54zm-3.55 1.6a7.44 7.44 0 1 0 7.32 8.9h-2.08a5.5 5.5 0 0 1-5.24 3.94 5.39 5.39 0 0 1-5.42-5.41 5.39 5.39 0 0 1 5.42-5.41 5.4 5.4 0 0 1 5.2 3.93h2.07a7.35 7.35 0 0 0-7.27-5.96zm10.22 1.09L20.5 6.78a9.5 9.5 0 0 1 1.42 3.77H24a11.56 11.56 0 0 0-1.75-4.86zM11.97 6.83a5.22 5.22 0 0 0-4.7 7.27l1.97-.87a2.97 2.97 0 0 1-.27-1.2c0-1.64 1.36-3.01 3-3.01zm1.92.39l-.77 2.02c.66.27 1.15.7 1.53 1.31h2.3a5.04 5.04 0 0 0-3.06-3.33zM0 12.02c0 1.65.33 3.29 1.04 4.87l1.8-.82a10.49 10.49 0 0 1-.82-4.04zm2.3 0c0 4.1 2.51 7.6 6.12 9.03l.76-1.92a7.63 7.63 0 0 1-4.86-7.1zm12.3 1.48c-.33.6-.82 1.1-1.48 1.31l.77 2.03a5.04 5.04 0 0 0 3.06-3.34zm4.97 0a7.73 7.73 0 0 1-7.54 6.24v2.02a9.71 9.71 0 0 0 9.62-8.26zm2.35 0a10.1 10.1 0 0 1-9.9 8.53c-2.73 0-5.24-1.15-7.04-2.95L3.55 20.5c2.19 2.19 5.2 3.5 8.53 3.5A12 12 0 0 0 24 13.5zm-12.02.66l-1.53 1.53a5.21 5.21 0 0 0 3.66 1.53v-2.19a3.02 3.02 0 0 1-2.13-.87z"
            />
          </g>
          <text x="15" y="13" className="gpassicontext">
            GPass
          </text>
        </svg>

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
        <div
          style={{
            transform: "scale(.8)",
            position: "absolute",
            zIndex: 300000,
            width: prop.width,
            height: "auto",
            textAlign: "center",
          }}
        >
          <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            className={prop.iconamin + " tada"}
            viewBox="0 0 512.001 512.001"
            style={{
              width: prop.width,
              height: prop.width,
            }}
          >
            <text x="260" y="430" className="vipicontext">
              VIP
            </text>
          </svg>
        </div>

        <img
          src={"/assets/images/svg/vip/1.svg"}
          className={prop.iconamin + ""}
          width={prop.width}
          height={prop.width}
          alt={prop.mode}
          style={{
            position: "absolute",
            width: prop.width,
            height: prop.width,
          }}
        />
        <img
          src={"/assets/images/svg/vip/2.svg"}
          className={prop.amin + ""}
          width={prop.width}
          height={prop.width}
          alt={prop.mode}
          style={{
            width: prop.width,
            height: prop.width,
          }}
        />

        {prop.text != "big" && prop.text != "" && (
          <div className="iconlabel">{prop.text}</div>
        )}
      </span>
    );
  }
  if (prop.mode == "logo") {
    var _txt = prop.number ? prop.number : prop.level;
    var _class = "vipicon";
    if (prop.text == "big") {
      _class = _class + " big icn";
    }

    return (
      <span onClick={prop.onClick} className="iconarea">
        <img
          src={"/assets/images/logosq.png"}
          className={prop.iconamin + ""}
          width={prop.width}
          height={prop.width}
          alt={prop.mode}
          style={{
            position: "absolute",
            width: prop.width,
            height: prop.width,
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
        <span
          style={{
            width: prop.width,
            height: "auto",
          }}
        >
          <img
            src={"/assets/images/svg/tournament/1.svg"}
            className={prop.iconamin + ""}
            width={prop.width}
            height={prop.width}
            alt={prop.mode}
            style={{
              position: "absolute",
              width: prop.width,
              height: prop.width,
            }}
          />
          <img
            src={"/assets/images/svg/tournament/2.svg"}
            className={prop.amin + ""}
            alt={prop.mode}
            style={{
              width: prop.width,
              height: prop.width,
            }}
          />
        </span>
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
          src={"/assets/images/icons/rackback.png"}
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
        <img
          src={"/assets/images/svg/league/1.svg"}
          width={prop.width}
          height={prop.width}
          alt={prop.mode}
          className={prop.iconamin + ""}
          style={{
            position: "absolute",
            width: prop.width,
            height: prop.width,
          }}
        />
        <img
          src={"/assets/images/svg/league/2.svg"}
          className={prop.amin + ""}
          width={prop.width}
          height={prop.width}
          alt={prop.mode}
          style={{
            position: "absolute",
            width: prop.width,
            height: prop.width,
          }}
        />
        <svg
          version="1.1"
          className="leagueicon icn"
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          viewBox="0 0 510.738 510.738"
          style={{
            width: prop.width,
            height: "auto",
          }}
        >
          <g>
            <g>
              <g>
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
              </g>
            </g>
          </g>
        </svg>

        {prop.text != "big" && prop.text != "" && (
          <div className="iconlabel">{prop.text}</div>
        )}
      </span>
    );
  }
  if (prop.mode == "gift3") {
    var _txt = prop.number ? prop.number : prop.level;
    var _class = "";
    if (prop.text == "big") {
      _class = _class + " big";
    }
    var _class2 = _class;
    if (prop.iconamin) {
      var _class2 = _class2 + " " + prop.iconamin;
    }
    return (
      <span onClick={prop.onClick} className="iconarea">
        <span
          className="inline hiddenmenu"
          style={{
            width: prop.width,
            height: "auto",
            position: "relative",
            zIndex: 1,
            filter: "hue-rotate(78deg) brightness(180%)",
          }}
        >
          <img
            src={"/assets/gift.svg"}
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
  if (prop.mode == "gift1") {
    var _txt = prop.number ? prop.number : prop.level;
    var _class = "";
    if (prop.text == "big") {
      _class = _class + " big";
    }
    var _class2 = _class;
    if (prop.iconamin) {
      var _class2 = _class2 + " " + prop.iconamin;
    }
    return (
      <span onClick={prop.onClick} className="iconarea">
        <span
          className="inline hiddenmenu"
          style={{
            width: prop.width,
            height: "auto",
            position: "relative",
            zIndex: 1,
          }}
        >
          <img
            src={"/assets/gift.svg"}
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
  if (prop.mode == "gift2") {
    var _txt = prop.number ? prop.number : prop.level;
    var _class = "";
    if (prop.text == "big") {
      _class = _class + " big";
    }
    var _class2 = _class;
    if (prop.iconamin) {
      var _class2 = _class2 + " " + prop.iconamin;
    }
    return (
      <span onClick={prop.onClick} className="iconarea">
        <span
          className="inline hiddenmenu"
          style={{
            width: prop.width,
            height: "auto",
            position: "relative",
            zIndex: 1,
            filter: "hue-rotate(-90deg)",
          }}
        >
          <img
            src={"/assets/gift.svg"}
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
      <>
        <div
          onClick={prop.onClick}
          className="iconarea"
          style={{
            width: prop.width,
            height: "auto",
            textAlign: "left",
          }}
        >
          <span
            className="inline animated delay-1s  bounceInDown"
            style={{
              width: prop.width,
              height: "auto",
              position: "relative",
              zIndex: 1,
            }}
          >
            <span
              className="inline animated delay-3s bounce"
              style={{
                width: prop.width,
                height: "auto",
              }}
            >
              <img
                src={"/assets/images/svg/gift/icon.svg"}
                width={prop.width}
                height={prop.width}
                alt={prop.mode}
                style={{
                  transform: "scale(.8)",
                  transformOrigin: "center center",
                  width: prop.width,
                  height: "auto",
                }}
              />
            </span>
          </span>
          <span
            className="inline animated delay-1s fast bounceInDown"
            style={{
              width: prop.width,
              height: "auto",
              position: "absolute",
              top: 0,
              left: 0,
              zIndex: 0,
              filter: "hue-rotate(-90deg)",
            }}
          >
            <img
              src={"/assets/gift.svg"}
              width={prop.width}
              height={prop.width}
              alt={prop.mode}
              style={{
                transform: "translateX(15%) scale(.6) rotate(5deg)",
                transformOrigin: "center right",
                width: prop.width,
                height: "auto",
              }}
            />
          </span>
          <span
            className="inline animated delay-1s faster bounceInDown"
            style={{
              width: prop.width,
              height: "auto",
              position: "absolute",
              top: 0,
              left: 0,
            }}
          >
            <img
              src={"/assets/gift.svg"}
              width={prop.width}
              height={prop.width}
              alt={prop.mode}
              style={{
                transform: "translateX(-5%) scale(.5) rotate(-5deg)",
                transformOrigin: "center left",
                width: prop.width,
                height: "auto",
              }}
            />
          </span>
          {prop.text != "big" && prop.text != "" && (
            <div className="iconlabel">{prop.text}</div>
          )}
        </div>
      </>
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
        <span
          className="inline animated  fadeIn"
          style={{
            width: prop.width,
            height: "auto",
            position: "relative",
            zIndex: 1,
          }}
        >
          <span
            className="inline animated  delay-4s charkhesh slower"
            style={{
              width: prop.width,
              height: "auto",
              position: "relative",
              zIndex: 1,
            }}
          >
            <span
              className="inline animated  delay-1s charkhesh slow"
              style={{
                width: prop.width,
                height: "auto",
                position: "relative",
                zIndex: 1,
                transform: "scale(.8)",
                transformOrigin: "center center",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={_class}
                x="0px"
                y="0px"
                viewBox="0 0 512 512"
              >
                <circle cx="256" cy="256" r="256" />
                <circle cx="256" cy="256" r="150.069" />
                <path d="M256,88.276c92.631,0,167.724,75.093,167.724,167.724S348.631,423.724,256,423.724  S88.276,348.631,88.276,256S163.369,88.276,256,88.276 M256,70.621c-102.219,0-185.379,83.16-185.379,185.379  S153.781,441.379,256,441.379S441.379,358.219,441.379,256S358.219,70.621,256,70.621L256,70.621z" />
                <g>
                  <path d="M256,0c-15.06,0-29.791,1.375-44.138,3.87v40.705c0,6.702,5.931,11.938,12.551,10.889   c10.295-1.632,20.84-2.498,31.587-2.498s21.292,0.866,31.587,2.498c6.62,1.049,12.551-4.186,12.551-10.889V3.87   C285.791,1.375,271.06,0,256,0z" />
                  <path d="M211.862,467.425v40.705C226.209,510.625,240.94,512,256,512c15.06,0,29.791-1.375,44.138-3.87   v-40.705c0-6.702-5.931-11.938-12.551-10.889c-10.295,1.632-20.84,2.498-31.587,2.498s-21.292-0.866-31.587-2.498   C217.793,455.487,211.862,460.723,211.862,467.425z" />
                  <path d="M512,256c0-15.06-1.375-29.791-3.87-44.138h-40.705c-6.702,0-11.938,5.931-10.889,12.551   c1.632,10.295,2.498,20.84,2.498,31.587s-0.866,21.292-2.498,31.587c-1.049,6.62,4.186,12.551,10.889,12.551h40.705   C510.625,285.791,512,271.06,512,256z" />
                  <path d="M44.575,211.862H3.87C1.375,226.209,0,240.94,0,256c0,15.06,1.375,29.791,3.87,44.138h40.705   c6.702,0,11.938-5.931,10.889-12.551c-1.632-10.295-2.498-20.84-2.498-31.587s0.866-21.292,2.498-31.587   C56.513,217.793,51.277,211.862,44.575,211.862z" />
                  <path d="M437.02,74.98c-10.649-10.649-22.038-20.093-33.946-28.474L374.29,75.289   c-4.739,4.739-4.247,12.636,1.175,16.574c8.434,6.125,16.502,12.97,24.102,20.569c7.599,7.599,14.444,15.668,20.569,24.102   c3.938,5.422,11.834,5.914,16.574,1.175l28.783-28.783C457.112,97.018,447.669,85.63,437.02,74.98z" />
                  <path d="M75.289,374.29l-28.783,28.783c8.381,11.908,17.825,23.297,28.474,33.946   s22.038,20.093,33.946,28.474l28.783-28.783c4.739-4.739,4.247-12.636-1.175-16.574c-8.434-6.125-16.502-12.97-24.102-20.569   c-7.599-7.599-14.444-15.668-20.569-24.102C87.925,370.043,80.029,369.55,75.289,374.29z" />
                  <path d="M437.02,437.02c10.649-10.649,20.093-22.038,28.474-33.946L436.71,374.29   c-4.739-4.739-12.636-4.247-16.574,1.175c-6.125,8.434-12.97,16.502-20.569,24.102c-7.599,7.599-15.668,14.444-24.102,20.569   c-5.422,3.938-5.914,11.834-1.175,16.574l28.783,28.783C414.982,457.112,426.37,447.669,437.02,437.02z" />
                  <path d="M137.71,75.289l-28.783-28.782C97.018,54.888,85.63,64.331,74.98,74.98   s-20.093,22.038-28.473,33.946l28.782,28.783c4.739,4.739,12.636,4.247,16.574-1.175c6.125-8.434,12.97-16.502,20.569-24.102   c7.599-7.599,15.668-14.444,24.102-20.569C141.958,87.925,142.45,80.029,137.71,75.289z" />
                  <circle cx="52.105" cy="340.458" r="13.241" />
                  <circle cx="459.895" cy="171.542" r="13.241" />
                  <circle cx="171.542" cy="52.105" r="13.241" />
                  <circle cx="340.458" cy="459.895" r="13.241" />
                  <circle cx="52.105" cy="171.542" r="13.241" />
                  <circle cx="459.895" cy="340.458" r="13.241" />
                  <circle cx="340.458" cy="52.105" r="13.241" />
                  <circle cx="171.542" cy="459.895" r="13.241" />
                  <path d="M404.12,145l-15.311,8.84c8.96,11.63,16.511,24.388,22.2,38.15l15.389-8.885   C420.533,169.446,412.941,156.739,404.12,145z" />
                  <path d="M320.012,100.99c13.761,5.689,26.519,13.24,38.15,22.2l8.84-15.311   c-11.74-8.821-24.446-16.413-38.104-22.278L320.012,100.99z" />
                  <path d="M233.931,72.061v17.833c7.24-0.954,14.569-1.618,22.069-1.618c7.5,0,14.829,0.663,22.069,1.617   V72.061c-7.251-0.866-14.589-1.44-22.069-1.44S241.182,71.194,233.931,72.061z" />
                  <path d="M423.724,256c0,7.5-0.663,14.829-1.617,22.069h17.832c0.866-7.251,1.44-14.589,1.44-22.069   s-0.575-14.818-1.44-22.069h-17.833C423.061,241.171,423.724,248.5,423.724,256z" />
                  <path d="M88.276,256c0-7.5,0.663-14.829,1.617-22.069H72.061c-0.866,7.251-1.44,14.589-1.44,22.069   s0.575,14.818,1.44,22.069h17.832C88.939,270.829,88.276,263.5,88.276,256z" />
                  <path d="M153.838,123.191c11.63-8.96,24.388-16.511,38.15-22.2l-8.885-15.389   c-13.658,5.866-26.365,13.458-38.104,22.278L153.838,123.191z" />
                  <path d="M426.399,328.896l-15.389-8.885c-5.689,13.761-13.24,26.518-22.2,38.148l15.31,8.84   C412.941,355.261,420.533,342.554,426.399,328.896z" />
                  <path d="M278.069,439.939v-17.833c-7.24,0.954-14.569,1.617-22.069,1.617c-7.5,0-14.829-0.663-22.069-1.617   v17.833c7.251,0.865,14.589,1.44,22.069,1.44S270.818,440.804,278.069,439.939z" />
                  <path d="M358.161,388.809c-11.63,8.96-24.388,16.511-38.15,22.2l8.885,15.389   c13.657-5.866,26.365-13.458,38.104-22.279L358.161,388.809z" />
                  <path d="M191.988,411.009c-13.761-5.689-26.519-13.24-38.15-22.2l-8.84,15.31   c11.74,8.821,24.446,16.413,38.104,22.279L191.988,411.009z" />
                  <path d="M123.19,358.161c-8.96-11.63-16.51-24.387-22.2-38.148l-15.389,8.885   c5.865,13.658,13.458,26.364,22.278,38.103L123.19,358.161z" />
                  <path d="M85.601,183.103l15.389,8.885c5.689-13.761,13.24-26.519,22.2-38.15l-15.311-8.84   C99.059,156.739,91.467,169.446,85.601,183.103z" />
                </g>
                <path d="M158.897,232.639c0-29.58,23.841-53.559,53.25-53.559c14.577,0,27.774,5.899,37.385,15.447  c3.564,3.54,9.373,3.54,12.936,0c9.611-9.547,22.808-15.447,37.385-15.447c29.409,0,53.25,23.979,53.25,53.559l0,0  c0,55.317-71.23,105.639-91.677,118.944c-3.306,2.151-7.548,2.151-10.854,0C230.126,338.276,158.897,287.955,158.897,232.639" />
              </svg>
            </span>
          </span>
        </span>
        <span
          className="inline animated delay-1s fast bounceInDown"
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
          className="inline animated delay-1s faster bounceInDown"
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
        <span
          className="inline animated  fadeIn"
          style={{
            width: prop.width,
            height: "auto",
            position: "relative",
            zIndex: 1,
          }}
        >
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
        </span>
        {prop.text != "big" && prop.text != "" && (
          <div className="iconlabel">{prop.text}</div>
        )}
      </span>
    );
  }
  if (prop.mode == "topplayericon") {
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
          src={"/assets/images/svg/topplayer/cashout.svg"}
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
        <img
          src={"/assets/images/svg/topplayer/deposit.svg"}
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
      </div>
    );
  }
  if (prop.mode == "levels") {
    var _txt = prop.number ? prop.number : prop.level;
    var _class = levelClass(prop.level - 1);
    if (prop.text == "big") {
      _class = _class + " big";
    }
    if (prop.iconamin) {
      // _class = _class + " " + prop.iconamin;
    }

    var _class2 = "";
    if (prop.amin) {
      _class2 = prop.amin;
    }
    var _id = _txt + _class.replace(/ /g, "");
    return (
      <div onClick={prop.onClick} className="iconarea">
        <div className="iconareanum">
          <svg
            viewBox="0 0 37.286 37.287"
            style={{
              width: prop.width,
            }}
          >
            <text
              x="18"
              y="25"
              className={"levelicontext text" + _txt.toString().length + ""}
            >
              {_txt}
            </text>
          </svg>
        </div>

        <div
          style={{
            transform: "scale(.8)",
            position: "absolute",
            zIndex: 100,

            width: prop.width,
            height: "auto",
          }}
          className={levelClassInside(_txt - 1)}
        >
          <svg
            style={{
              width: prop.width,
              height: "auto",
            }}
            className={_class2}
            viewBox="0 0 100 100"
          >
            <defs>
              <mask
                id={"fillMask" + _id + "2"}
                x="0"
                y="0"
                width="100"
                height="100"
              >
                <image
                  xlinkHref="/assets/images/svg/level/icon.svg"
                  x="0"
                  y="0"
                  width="100"
                  height="100"
                  src="ppngfallback.png"
                />
              </mask>
            </defs>
            <rect
              x="0"
              y="0"
              width="100"
              height="100"
              style={{ stroke: "none" }}
              mask={'url("#fillMask' + _id + '2")'}
            />
          </svg>
        </div>
        <div
          style={{
            width: prop.width,
            height: "auto",
          }}
        >
          <svg
            style={{
              width: prop.width,
              height: "auto",
            }}
            viewBox="0 0 100 100"
            className={"levelicon " + _class}
          >
            <defs>
              <mask
                id={"fillMask" + _id + ""}
                x="0"
                y="0"
                width="100"
                height="100"
              >
                <image
                  xlinkHref="/assets/images/svg/level/icon.svg"
                  x="0"
                  y="0"
                  width="100"
                  height="100"
                  src="ppngfallback.png"
                />
              </mask>
            </defs>
            <rect
              x="0"
              y="0"
              width="100"
              height="100"
              style={{ stroke: "none", fill: "currentColor" }}
              mask={'url("#fillMask' + _id + '")'}
            />
          </svg>
        </div>
        {prop.text != "big" && prop.text != "" && (
          <div className="iconlabel">{prop.text}</div>
        )}
      </div>
    );
  }
};

export default LevelIcon;
