// import _ from "lodash";
import React from "react";
import {
  BrowserRouter,
  Navigate,
  Route,
  Router,
  Routes,
  useLocation,
} from "react-router-dom";
import Home from "../pages/home";
import { Booking } from "../pages/booking";
import { MyBookings } from "../pages/MyBookings";
import { Direction } from "../pages/Direction";
import { DestInfo } from "../pages/DestInfo";
import { Dashboard } from "../pages/dashboard";

const RouteController = ({ localLoggedIn }) => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path={"/booking"} element={<PublicRoute Comp={Booking} />} />
        <Route
          path={"/my-bookings"}
          element={<PublicRoute Comp={MyBookings} />}
        />
        <Route
          path={"/alternate-route"}
          element={<PublicRoute Comp={Direction} />}
        />
        <Route
          path={"/destination-information"}
          element={<PublicRoute Comp={DestInfo} />}
        />
        <Route path={"/dashboard"} element={<PublicRoute Comp={Dashboard} />} />
      </Routes>
    </>
  );
};
export default RouteController;

const PublicRoute = ({ Comp }) => {
  return <Comp />;
};
