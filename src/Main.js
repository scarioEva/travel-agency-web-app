import { CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React from "react";
import App from "./App";

const Main = (props) => {
  const theme = createTheme({
    palette: {
      text: {
        primary: "black",
        secondary: "#e8e8e8",
      },
      primary: {
        main: "#e8e8e8",
        contrastText: "#ffcc00",
      },
      secondary: {
        main: "rgba(6, 105, 248, 1)",
      },
    },
    // typography: {
    //   fontFamily: ["Montserrat-Regular"].join(","),
    // },
    breakpoints: {
      values: {
        xs: 0,
        sm: 700,
        md: 900,
        lg: 1200,
        xl: 1536,
      },
    },
  });

  window.Object.freeze = function (obj) {
    return obj;
  };

  const loader = () => {
    // console.log("window.self == window.top", window.self == window.top);
    // dispatch(setThroughIFrame(window.self !== window.top));

    return true;
    if (window.self == window.top) {
      // Everything checks out, show the page.
      // document.documentElement.style.display = "block";
      return true;
    } else {
      // Break out of the frame.
      // window.top.location = window.self.location;
      return false;
    }
  };

  return loader() ? (
    // <ErrorProvider>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  ) : (
    <></>
  );
};

export default Main;
