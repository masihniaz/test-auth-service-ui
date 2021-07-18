import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import * as Sentry from "@sentry/react";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./constants/muiTheme";
import logger from "./services/logService";
import "fontsource-roboto";
import "./index.css";

logger.init();

ReactDOM.render(
  // <React.StrictMode>
  <Sentry.ErrorBoundary fallback={"An error has occurred"}>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </Sentry.ErrorBoundary>,
  // </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
