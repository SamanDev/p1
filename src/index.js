import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import TourSite from "./toursite";

import "bootstrap/dist/css/bootstrap.min.css";
import "semantic-ui-css/semantic.min.css";

import "./assets/css/style.css";
createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <TourSite />
  </BrowserRouter>
);
