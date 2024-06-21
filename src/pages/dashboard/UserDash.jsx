import React, { useEffect } from "react";

import { Container } from "semantic-ui-react";
import GameInbox from "./GameInbox";
import Banners from "./banners";
//import Index from "./index";
import $ from "jquery";

const moment = require("moment");
const isWebview = () => {
  if (typeof window === "undefined") {
    return false;
  }

  const navigator = window.navigator;

  const standalone = navigator.standalone;
  const userAgent = navigator.userAgent.toLowerCase();
  const safari = /safari/.test(userAgent);
  const ios = /iphone|ipod|ipad/.test(userAgent);

  return ios ? !standalone && !safari : /\bwv\b/.test(userAgent);
};
const Dashboard = (prop) => {
  const loginToken = prop.loginToken;
  const siteInfo = prop.siteInfo;
  const handleManifest = () => {
    window.addEventListener(
      "beforeinstallprompt",
      (e) => {
        //$("#pushactive").trigger("click");
        // Prevent Chrome 67 and earlier from automatically showing the prompt
        e.preventDefault();
        // Stash the event so it can be triggered later.
        window.deferredPrompt = e;
        setTimeout(function () {
          addHome();
        }, 3000);
        // Update UI to notify the user they can add to home screen
      },
      { once: true }
    );
    if (isWebview()) {
      return false;
    }
    //console.log(window.location.href);
    // console.log(siteInfo?.userSiteUrl);
    if (
      localStorage.getItem(btoa(loginToken.username)) &&
      window.location.href.indexOf(siteInfo?.userSiteUrl) == -1
    ) {
      let sUrl =
        siteInfo?.userSiteUrl +
        "/login/" +
        btoa(loginToken.username) +
        "/" +
        localStorage.getItem(btoa(loginToken.username));
      //window.location.href = sUrl;
      //return false;
    }

    //$('[rel="manifest"]').remove();
    if ($('[rel="manifest"]').length == 0) {
      console.log("👍", "handleManifest");
      window.addEventListener(
        "focus",
        () => {
          $("#reconn").trigger("click");
          $("#pushactive").trigger("click");
        },
        { once: true }
      );
      if (localStorage.getItem(btoa(loginToken.username))) {
        let dd = window.location.protocol + "//" + window.location.host;
        let sUrl =
          dd +
          "/login/" +
          btoa(loginToken.username) +
          "/" +
          localStorage.getItem(btoa(loginToken.username));

        let manifest = {
          short_name: loginToken.username,
          name: loginToken.username,

          display: "fullscreen",
          theme_color: "#000000",
          orientation: "Any",

          start_url: sUrl,
          scope: dd,
          id: sUrl,

          background_color: "#000000",
          icons: [
            {
              src: dd + "/maskable_icon_x192.png",
              type: "image/png",
              sizes: "192x192",
              purpose: "any",
            },

            {
              src: dd + "/maskable_icon_x512.png",
              type: "image/png",
              sizes: "512x512",
              purpose: "any",
            },
          ],
          description: "معتبرترین و بهترین اپلیکیشن پوکر با پول واقعی در ایران",
        };
        let content = encodeURIComponent(JSON.stringify(manifest));
        let url = "data:application/manifest+json," + content;
        let element = document.createElement("link");
        element.setAttribute("rel", "manifest");
        element.setAttribute("href", url);
        document.querySelector("head").appendChild(element);
      }
    }
  };

  function addHome() {
    window.addEventListener(
      "click",
      async () => {
        console.log("👍", "butInstall-clicked" + window.deferredPrompt);
        const promptEvent = window.deferredPrompt;
        if (!promptEvent) {
          // The deferred prompt isn't available.
          return;
        }
        try {
          promptEvent.prompt();
          // Log the result
          const result = await promptEvent.userChoice;
          console.log("👍", "userChoice", result);
          localStorage.removeItem("notificationAllow");
          // Reset the deferred prompt variable, since
          // prompt() can only be called once.
          //window.deferredPrompt = null;
        } catch (error) {}
        // Show the install prompt.
      },
      { once: true }
    );
  }

  useEffect(() => {
    handleManifest();
  }, [loginToken?.accessToken]);

  return (
    <>
      <div className="dashboard_section main_section fadeoutend">
        <Banners
          loginToken={prop.loginToken}
          siteInfo={prop.siteInfo}
          openPanel={prop.openPanel}
        />
        <div id="game_section" className="dashboard_section main_section">
          <Container>
            <GameInbox {...prop} />
          </Container>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
