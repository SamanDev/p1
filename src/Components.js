import React, { Suspense, lazy } from "react";
const LevelList = lazy(() => delayForDemo(import("./pages/dashboard/Levels")));
const GalaxyPass = lazy(() =>
  delayForDemo(import("./pages/dashboard/GalaxyPass"))
);
const Games = lazy(() => delayForDemo(import("./pages/dashboard/Games")));
import MenuLoader from "./utils/menuLoader";
const CashoutComponent = lazy(() =>
  delayForDemo(import("./layouts/admin/forms/FormComponent.jsx"))
);
const Gift = lazy(() => delayForDemo(import("./pages/dashboard/Gifts")));

const VIP = lazy(() => delayForDemo(import("./pages/dashboard/VIP")));
//import Commission from "./pages/dashboard/Commission";
const Support = lazy(() => delayForDemo(import("./pages/dashboard/Support")));
const Commission = lazy(() =>
  delayForDemo(import("./pages/dashboard/Commission"))
);
//import League from "./pages/dashboard/League";
//import Support from "./pages/dashboard/Support";
const League = lazy(() => delayForDemo(import("./pages/dashboard/League")));
const MyGift = lazy(() => delayForDemo(import("./pages/dashboard/MyGifts")));
const TournamentComponent = lazy(() =>
  delayForDemo(import("./pages/dashboard/TournamentCom"))
);
//import CashoutComponent from "./layouts/admin/forms/FormComponent.jsx";
//import MyGift from "./pages/dashboard/MyGifts";
//import TournamentComponent from "./pages/dashboard/TournamentCom";
import $ from "jquery";
function delayForDemo(promise) {
  return new Promise((resolve) => {
    resolve();
  }).then(() => {
    setTimeout(() => {
      $("#reportWindowSize").trigger("click");
    }, 100);

    return promise;
  });
}
const CompGen = (prop) => {
  //if (prop.activeMenuOpen === false) return false;
  if (prop?.menu?.component == "levels") {
    return (
      <Suspense fallback={<MenuLoader />}>
        <LevelList {...prop} />
      </Suspense>
    );
  } else if (prop?.menu?.component == "gpass") {
    return (
      <Suspense fallback={<MenuLoader />}>
        <GalaxyPass {...prop} />
      </Suspense>
    );
  } else if (prop?.menu?.component == "games") {
    return (
      <Suspense fallback={<MenuLoader />}>
        <Games {...prop} />
      </Suspense>
    );
  } else if (prop?.menu?.component == "gifts") {
    return (
      <Suspense fallback={<MenuLoader />}>
        <Gift {...prop} />
      </Suspense>
    );
  } else if (prop?.menu?.component == "vip") {
    return (
      <Suspense fallback={<MenuLoader />}>
        <VIP {...prop} />
      </Suspense>
    );
  } else if (prop?.menu?.component == "league") {
    return (
      <Suspense fallback={<MenuLoader />}>
        <League {...prop} />
      </Suspense>
    );
  } else if (prop?.menu?.component == "support") {
    return (
      <Suspense fallback={<MenuLoader />}>
        <Support {...prop} />
      </Suspense>
    );
  } else if (prop?.menu?.component == "mygifts") {
    return (
      <Suspense fallback={<MenuLoader />}>
        <MyGift {...prop} />
      </Suspense>
    );
  } else if (prop?.menu?.component == "tournament") {
    return (
      <Suspense fallback={<MenuLoader />}>
        <TournamentComponent
          {...prop}
          cashMode={prop?.menu?.cashMode}
          mode={prop?.menu?.mode}
          gateway={prop?.menu?.gateway}
          getwaykey={prop?.menu?.getwaykey}
          labelcolor={prop?.menu?.labelcolor}
          size={prop?.menu?.size}
        />
      </Suspense>
    );
  } else if (prop?.menu?.component == "CashoutComponent") {
    return (
      <Suspense fallback={<MenuLoader />}>
        <CashoutComponent
          {...prop}
          cashMode={prop?.menu?.cashMode}
          mode={prop?.menu?.mode}
          gateway={prop?.menu?.gateway}
          getwaykey={prop?.menu?.getwaykey}
          labelcolor={prop?.menu?.labelcolor}
          size={prop?.menu?.size}
        />
      </Suspense>
    );
  } else if (
    prop?.menu?.component == "rakeback" ||
    prop?.menu?.component == "commission"
  ) {
    return (
      <Suspense fallback={<MenuLoader />}>
        <Commission mode={prop?.menu?.component} {...prop} />
      </Suspense>
    );
  } else {
    return <>{prop?.menu?.component}</>;
  }
};

export default CompGen;
