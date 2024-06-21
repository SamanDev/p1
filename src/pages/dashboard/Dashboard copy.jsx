import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getUserService } from "../../services/auth";
import {
  Grid,
  Image,
  Button,
  Container,
  List,
  Label,
  Tab,
  Icon,
  Dropdown,
  Dimmer,
  Loader,
} from "semantic-ui-react";
import {
  gameData,
  gameDataCode,
  gameDataMain,
  gameDataMainCode,
  getEvent,
} from "../../const";
import GalaxyIcon from "../../utils/svganim";
import ConfettiArea from "../../utils/party";
import $ from "jquery";
const config = {
  angle: "0",
  spread: "32",
  startVelocity: "20",
  elementCount: "200",
  dragFriction: "0.09",
  duration: "4090",
  stagger: "3",
  width: "9px",
  height: "10px",
  perspective: "500px",
  colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"],
};
const Banner = (prop) => {
  return (
    <div className="banner">
      <Grid reversed="computer tablet">
        <Grid.Row>
          <Grid.Column
            mobile={16}
            tablet={8}
            computer={8}
            className="myaccount"
          >
            {prop.image && (
              <div className="hiddenmenu delay-2s fadeInLeft">
                <Image src={prop.image} rounded />
              </div>
            )}
            <div className="inline hiddenmenu delay-1s fadeInLeft">
              <div className={"inline hiddenmenu delay-2s " + prop.iconamin}>
                <GalaxyIcon
                  mode={prop.icon}
                  level={prop.number}
                  text="big"
                  className="bannericon"
                  classinside="iconinside2"
                  number={prop.number}
                  amin={"inline hiddenmenu " + prop.amin}
                  width="12vw"
                  iconamin={"inline hiddenmenu delay-2s " + prop.iconamin}
                />
              </div>
            </div>
          </Grid.Column>
          <Grid.Column mobile={16} tablet={8} computer={8} textAlign="right">
            <div className="inline hiddenmenu fadeInRight backInLeft delay-nims fast">
              <div className="inline hiddenmenu flash delay-3s">
                <h1 className="farsi">{prop.title}</h1>
              </div>
            </div>
            <div className="farsi text  hiddenmenu fadeInRight fast delay-1s">
              {prop.text}
            </div>

            {prop.link && (
              <div className="hiddenmenu delay-1s fadeInDown">
                <Button
                  className="farsi"
                  color="teal"
                  onClick={() => {
                    prop.openPanel(prop.link);
                  }}
                >
                  اطلاعات بیشتر
                </Button>
              </div>
            )}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
};
const Banner2 = (prop) => {
  return (
    <div className="banner">
      {prop.image && <Image src={prop.image} rounded />}

      <h1 className="farsi">{prop.title}</h1>
      <div className="text farsi myaccount">
        <GalaxyIcon
          mode={prop.icon}
          level=""
          text=""
          className="bannericon"
          number={prop.number}
        />
        {prop.text}
        <br />
        <br />
        <br />
        <br />
        {prop.link && (
          <Button
            size="big"
            className="farsi"
            color="teal"
            onClick={() => {
              prop.openPanel(prop.link);
            }}
          >
            اطلاعات بیشتر
          </Button>
        )}
      </div>
    </div>
  );
};
var _width = document.body.clientWidth;

const Dashboard = (prop) => {
  const navigate = useNavigate();
  const handleCheckLogin = async () => {
    try {
      const res = await getUserService();
    } catch (error) {}
  };
  const [curPage, setCurPage] = useState("dashboard");
  const [isFull, setIsFull] = useState(false);
  var _event = getEvent();
  const [screenOrientation, setScreenOrientation] = useState(
    screen?.orientation?.type
  );

  const [gameLoader, setGameLoader] = useState(true);
  const params = useParams();
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeSlide, setActiveSlide] = useState(1);
  const [gameOptions, setGameOptions] = useState([]);
  const [secondaryGame, setSecondaryGame] = useState(
    localStorage.getItem("secondaryGame")
      ? localStorage.getItem("secondaryGame")
      : "blackjack3"
  );
  const [mainGame, setMainGame] = useState(
    params.gameId ? params.gameId : "poker"
  );

  const handleChange = (e, { name, value }) => {
    setGameLoader(true);
    setSecondaryGame(value);
    setActiveIndex(1);
    localStorage.setItem("secondaryGame", value);
  };

  const handleRangeChange = (e) => setActiveIndex(activeIndex == 0 ? 1 : 0);
  const handleFullscreen = (e) => {
    $(".framegame,body").toggleClass("fullscreen");
    setIsFull(!isFull);
  };
  const handleReload = (e) => {
    setGameLoader(true);
    $(".framegame:visible").attr("src", $(".framegame:visible").attr("src"));
  };
  const removeFrameLoad = (e) => {
    setGameLoader(false);
  };
  const handleTabChange = (e, { activeIndex }) => setActiveIndex(activeIndex);
  useEffect(() => {
    if (window.location.href.toString().indexOf("/games") > -1) {
      setCurPage("game");
      setMainGame(params.gameId);
    } else {
      setCurPage("dashboard");
    }
  }, [window.location.href]);
  useEffect(() => {
    // if (_width < 800 || 1 == 1) {
    //   if (screenOrientation.indexOf("landscape") > -1) {
    //     $(".framegame,body").addClass("fullscreen");
    //     setIsFull(true);
    //   } else {
    //     setIsFull(false);
    //     $(".framegame,body").removeClass("fullscreen");
    //   }
    // }
  }, [screenOrientation]);
  useEffect(() => {
    const myCarousel = document.getElementById("carouselExampleControls");

    $(".banner:visible .hiddenmenu").toggleClass("hiddenmenu animated");
    myCarousel.addEventListener("slide.bs.carousel", (event) => {
      $(".banner:hidden .animated").toggleClass("hiddenmenu animated");
      $(".banner:visible .hiddenmenu").toggleClass("hiddenmenu animated");
    });
    myCarousel.addEventListener("slid.bs.carousel", (event) => {
      $(".banner:hidden .animated").toggleClass("hiddenmenu animated");
      $(".banner:visible .hiddenmenu").toggleClass("hiddenmenu animated");
      if (event.to != "0") {
        setActiveSlide(event.to);
      } else {
        setActiveSlide(event.to);
      }
    });
  }, []);
  const panes33 = [
    {
      menuItem: "poker",
      pane: <Tab.Pane key="tab1" as="span"></Tab.Pane>,
    },
    {
      menuItem: "2",
      pane: <Tab.Pane key="tab2" as="span"></Tab.Pane>,
    },
  ];
  useEffect(() => {
    var _gameOptions = [];
    {
      gameDataMain.map((game, i) => {
        if (game != mainGame) {
          _gameOptions.push({
            key: game,
            text: game,
            value: game,
          });
        }
      });
    }
    {
      gameData.map((game, i) => {
        if (game != mainGame) {
          _gameOptions.push({
            key: game,
            text: game,
            value: game,
          });
        }
      });
    }
    setGameOptions(_gameOptions);
  }, []);
  useEffect(() => {
    if (!prop.isLogin && curPage == "game") {
      setCurPage("dashboard");
      prop.setFirstOpen(true);
      navigate("/");
    }
  }, [curPage, prop.isLogin]);
  useEffect(() => {
    if (prop.isLogin && curPage == "game") {
      handleCheckLogin();
    }
  }, [curPage]);
  useEffect(() => {
    try {
      $("#gamesec1").scrollLeft($("#gamesec1").width() / 2);
      $("#gamesec2").scrollLeft($("#gamesec2").width() / 2);
    } catch (error) {}
  }, [gameLoader]);
  var loginToken = JSON.parse(localStorage.getItem("loginToken"));
  const panes = [
    {
      menuItem: "Tab 1",
      pane: (
        <Tab.Pane key="tab1" attached={false}>
          <div id="gamesec1" style={{ overflow: "auto" }}>
            {gameLoader && (
              <div
                className={
                  isFull ? "framegame loader fullscreen" : "framegame loader"
                }
              >
                <Dimmer active>
                  <Loader className="farsi-inline" size="large">
                    لطفا صبر کنید...
                  </Loader>
                </Dimmer>
              </div>
            )}
            {mainGame == "poker" ? (
              <>
                <iframe
                  src={
                    "http://139.99.144.72:2053?LoginName=" +
                    loginToken?.username +
                    "&amp;SessionKey=4AC558DE44D51B611B01"
                  }
                  className="framegame"
                  onLoad={removeFrameLoad}
                ></iframe>
              </>
            ) : (
              <>
                <iframe
                  srdc={
                    "https://glxypkr.com:8443/secured/games/" +
                    mainGame +
                    ".html?code=E14AB11A9CFD83028B5F273261AC8D47E472739FA49E98690BAF485791D2CB9A"
                  }
                  className="framegame"
                  onLoad={removeFrameLoad}
                ></iframe>
              </>
            )}
          </div>
        </Tab.Pane>
      ),
    },
    {
      menuItem: "Tab 2",
      pane: (
        <Tab.Pane key="tab2" attached={false}>
          <div id="gamesec2" style={{ overflow: "auto" }}>
            {gameLoader && (
              <div
                className={
                  isFull ? "framegame loader fullscreen" : "framegame loader"
                }
              >
                <Dimmer active>
                  <Loader className="farsi-inline" size="large">
                    لطفا صبر کنید...
                  </Loader>
                </Dimmer>
              </div>
            )}
            <iframe
              src={
                "https://glxypkr.com:8443/secured/games/" +
                secondaryGame +
                ".html?code=E14AB11A9CFD83028B5F273261AC8D47E472739FA49E98690BAF485791D2CB9A"
              }
              className="framegame frame2"
              onLoad={removeFrameLoad}
            ></iframe>
          </div>
        </Tab.Pane>
      ),
    },
  ];

  return (
    <>
      {curPage == "dashboard" && (
        <div id="dashboard" className="mainsection">
          <div
            id="dashboard_section"
            className="dashboard_section main_section fadeout"
          >
            <div
              id="carouselExampleControls"
              className="carousel slide"
              data-bs-ride="carousel"
            >
              <div className="carousel-inner">
                <div className="carousel-item " data-bs-interval="10000">
                  <Banner
                    title="هدیه گلکسی"
                    text="امشب ساعت ۲۲"
                    icon="gifts"
                    {...prop}
                  />
                  {activeSlide == 0 && (
                    <ConfettiArea recycle={false} numberOfPieces="50" />
                  )}
                </div>
                <div className="carousel-item " data-bs-interval="10000">
                  <Banner
                    title="تورنومنت ۳۰+۳۰ میلیونی"
                    text="هر جمعه ساعت ۲۲"
                    icon="tournament"
                    amin="inline hiddenmenu swing delay-2s"
                    iconamin=""
                    link=".tournament"
                    {...prop}
                  />
                </div>
                {_event == "GPass" && (
                  <div
                    className="carousel-item active"
                    data-bs-interval="10000"
                  >
                    <Banner
                      title="۱۱۰ میلیون تومان"
                      text="پاداش گلکسی پَس"
                      link=".gpass"
                      icon="gpass"
                      iconamin="pulse"
                      number="15"
                      {...prop}
                    />
                  </div>
                )}
                {_event == "VIP" && (
                  <div
                    className="carousel-item active"
                    data-bs-interval="10000"
                  >
                    <Banner
                      title="۱۹۲ میلیون تومان"
                      text="پاداش VIP 25/50K"
                      link=".vip"
                      icon="vip"
                      amin="inline hiddenmenu fast flipInY"
                      iconamin="pulse"
                      number=" "
                      {...prop}
                    />
                  </div>
                )}
                {_event == "League" && (
                  <div
                    className="carousel-item active"
                    data-bs-interval="10000"
                  >
                    <Banner
                      title="۴۵ میلیون تومان"
                      text="برای لیگ روزانه"
                      link=".league"
                      icon="league"
                      level="big"
                      number="1"
                      amin="inline hiddenmenu swing delay-2s"
                      iconamin=""
                      {...prop}
                    />
                  </div>
                )}

                <div className="carousel-item " data-bs-interval="10000">
                  <Banner
                    title="بیش از ۴ میلیارد"
                    text="پاداش افزایش لِوِل"
                    link=".levels"
                    icon="levels"
                    amin="hiddenmenu delay-2s charkhesh"
                    iconamin="swing"
                    number="90"
                    {...prop}
                  />
                </div>
                {_width > 500 && 1 == 2 && (
                  <div className="carousel-item " data-bs-interval="100000">
                    <Banner
                      image="/assets/images/calendar.gif"
                      title="بیش از ۵۰۰ میلیون"
                      text="جوایز ماهانه"
                      {...prop}
                    />
                  </div>
                )}
              </div>
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#carouselExampleControls"
                data-bs-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#carouselExampleControls"
                data-bs-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          </div>

          <div id="game_section" className="dashboard_section main_section">
            <Container>
              <Grid>
                {gameDataMain.map((game, i) => (
                  <Grid.Column
                    key={i}
                    mobile={8}
                    tablet={4}
                    computer={4}
                  ></Grid.Column>
                ))}
              </Grid>
            </Container>
          </div>
        </div>
      )}
      {curPage == "game" && prop.isLogin && (
        <div className="mainsection dashboard_section main_section">
          <Tab
            onTabChange={handleTabChange}
            panes={panes}
            renderActiveOnly={false}
            activeIndex={activeIndex}
            menu={{ attached: false }}
          />
          {!gameLoader && (
            <div className="gameicons">
              <Icon
                circular
                inverted
                link
                color="grey"
                onClick={handleFullscreen}
              >
                <i
                  className={
                    isFull
                      ? "fas fa-compress-arrows-alt"
                      : "fas fa-expand-arrows-alt"
                  }
                ></i>
              </Icon>
              <Icon circular inverted link color="grey" onClick={handleReload}>
                <i className="fas fa-sync-alt"></i>
              </Icon>

              <Icon
                circular
                inverted
                link
                color={activeIndex == 0 ? "orange" : "grey"}
                onClick={handleRangeChange}
                style={{
                  fontSize: 25,
                  right: -10,
                }}
              >
                <i
                  className={
                    activeIndex == 0
                      ? "fas fa-angle-right"
                      : "fas fa-angle-left"
                  }
                ></i>
              </Icon>

              <Dropdown
                value={secondaryGame}
                options={gameOptions}
                selectOnNavigation={false}
                name="false"
                direction="left"
                className="selectgame"
                style={
                  activeIndex == 0
                    ? {
                        transform: "translateY(-250px) translateX(-50px)",
                        transformOrigin: "center right",
                        opacity: 0,
                      }
                    : {
                        transform: "translateY(-180px) translateX(-50px)",
                        transformOrigin: "center right",
                      }
                }
                compact
                scrolling
                onChange={handleChange}
                trigger={
                  <Icon
                    circular
                    inverted
                    link
                    color="orange"
                    style={{
                      transform: "translateX(28px) translateY(28px) ",
                      transformOrigin: "center right",
                    }}
                  >
                    <i className="fas fa-angle-double-down"></i>
                  </Icon>
                }
              />
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Dashboard;
