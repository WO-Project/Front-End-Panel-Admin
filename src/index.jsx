import React, { Suspense } from "react";

import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom";

import { Provider } from "react-redux";
import store from "./redux/store";

import "./assets/icons/remixicon.css";
import "./assets/less/yoda-theme.less";
import App from "./App";
import { PermissionContextProvider } from "./context/PermissionContext";

ReactDOM.render(
  <Suspense fallback="loading">
    <Provider store={store}>
      <PermissionContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PermissionContextProvider>
    </Provider>
  </Suspense>,
  document.getElementById("root")
);
