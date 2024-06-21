import React, { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";

const Dashboard = lazy(() => import("./dashboard/Dashboard"));
const Game = lazy(() => import("./dashboard/Game"));
const Admin = lazy(() => import("./admin/Index"));
import UpdatePage from "./dashboard/update";
import MenuLoader from "../utils/menuLoader";
const Content = (prop) => {
  const dayOfWeekDigit = new Date().getDay();
  const siteInfo = prop.siteInfo;
  return (
    <section id="content_section" className={`py-2 px-3`}>
      {siteInfo?.shutdown ? (
          <>
            <Routes>
      
        <Route
          path="/logout"
          element={
            <Suspense fallback={<MenuLoader />}>
              <Dashboard {...prop} />
            </Suspense>
          }
        />
        <Route
          path="/login/:u/:p"
          element={
            <Suspense fallback={<MenuLoader />}>
              <Dashboard {...prop} />
            </Suspense>
          }
        />
<Route
          path="/requests"
          element={
            <Suspense fallback={<MenuLoader />}>
              <Admin request={true} {...prop} />
            </Suspense>
          }
        />
        <Route
          path="/admin"
          element={
            <Suspense fallback={<MenuLoader />}>
              <Admin {...prop} />
            </Suspense>
          }
        />

       
      </Routes>
           <UpdatePage
                loginToken={prop.loginToken}
                siteInfo={prop.siteInfo}
                openPanel={prop.openPanel}
              />
          </>
        ) : (
          <>
           <Routes>
        <Route
          path="*"
          element={
            <Suspense fallback={<MenuLoader />}>
              <div className="fullscreen-bg">
                <video
                  loop
                  muted
                  autoPlay
                  className="fullscreen-bg__video"
                  disablePictureInPicture={true}
                  playsInline
                >
                  <source
                    src={"/assets/images/bg" + dayOfWeekDigit + ".mp4"}
                    type="video/mp4"
                  />
                </video>
              </div>
              <Dashboard {...prop} />
            </Suspense>
          }
        />
        <Route
          path="/logout"
          element={
            <Suspense fallback={<MenuLoader />}>
              <Dashboard {...prop} />
            </Suspense>
          }
        />
        <Route
          path="/login/:u/:p"
          element={
            <Suspense fallback={<MenuLoader />}>
              <Dashboard {...prop} />
            </Suspense>
          }
        />

        <Route
          path="/admin"
          element={
            <Suspense fallback={<MenuLoader />}>
              <Admin {...prop} />
            </Suspense>
          }
        />

        <Route
          path="/admin/:username"
          element={
            <Suspense fallback={<MenuLoader />}>
              <Admin {...prop} />
            </Suspense>
          }
        />
        <Route
          path="/requests"
          element={
            <Suspense fallback={<MenuLoader />}>
              <Admin request={true} {...prop} />
            </Suspense>
          }
        />
        <Route path="/games">
          <Route
            path=":gameId"
            element={
              <Suspense fallback={<MenuLoader />}>
                <Game {...prop} />
              </Suspense>
            }
          />
        </Route>
      </Routes>
          </>
        )}
      
    </section>
  );
};

export default Content;
