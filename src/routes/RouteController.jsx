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
import Details from "../pages/details";
import Home from "../pages/home";

const RouteController = ({ localLoggedIn }) => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path={"/details"}
          element={
            <PublicRoute
              Comp={Details}
              //userData={localStorageAuth}
            />
          }
        />
      </Routes>
    </>
  );
};
export default RouteController;

const PublicRoute = ({ Comp }) => {
  return <Comp />;
};
