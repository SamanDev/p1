import React, { useState } from "react";
import { Segment } from "semantic-ui-react";
import ActiveTable from "./pages/dashboard/ActiveTableJson.jsx";
import LastReward from "./pages/dashboard/LastRewardJson";
import { useLastReward } from "./hook/userHook";
import $ from "jquery";
import { Tab } from "semantic-ui-react";

function RightPanel(prop) {
  const [lastReward] = useLastReward();
  const [activeIndex, setActiveIndex] = useState(0);
  //if (!prop.activePanel) return null;
  const handleTabChange = (activeIndex) => {
    setActiveIndex(activeIndex);
    prop.reportWindowSize();
  };
  const panes = [
    {
      menuItem: {
        key: "tabels",
        className: "farsi w-50",
        content: <>میز های فعال</>,
      },

      render: () => (
        <Tab.Pane
          attached={false}
          inverted
          style={{
            height: "100%",
            overflow: "auto",
            maxHeight: "calc(100vh - 53px)",
          }}
        >
          <div>
            <ActiveTable {...prop} />
          </div>
        </Tab.Pane>
      ),
    },
    {
      menuItem: {
        key: "rewards",
        className: "farsi w-50",
        content: (
          <>
            <Segment
              basic
              style={{
                color: "#fff",
                position: "fixed",
                top: "25px",

                transform: "translateY(-50%)",
                right: 5,
                opacity: 1,
                padding: 0,
                cursor: "pointer",
                zIndex: 10,
              }}
              onClick={(e) => {
                e.stopPropagation();
                prop.setActivePanel(!prop.activePanel);
              }}
            >
              <div id="nav-icon1" className="picn">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </Segment>{" "}
            آخرین پاداش ها
          </>
        ),
      },

      render: () => (
        <Tab.Pane
          attached={false}
          inverted
          className="mm-panel--opened  step1-3 active"
          style={{ height: "100%", overflow: "auto", maxHeight: "100vh" }}
        >
          <LastReward {...prop} lastReward={lastReward} />
        </Tab.Pane>
      ),
    },
  ];
  return (
    <div className=" ">
      <Tab
        menu={{
          inverted: true,
          color: "black",
          attached: false,
          tabular: false,
        }}
        grid={{ paneWidth: 12, tabWidth: 4 }}
        panes={panes}
        className="nomargin"
        renderActiveOnly={true}
        activeIndex={activeIndex}
        onTabChange={() => handleTabChange()}
      />
    </div>
  );
}

export default RightPanel;
