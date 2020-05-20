import "./utils/support-old-browsers.util";

import "./styles/index.scss";

import React from "react";
import ReactDOM from "react-dom";
import Route from "./routes/index.route";

import Provider from "./store/index.store";
 
import { setUpApi } from "./utils/http-interceptors/request";

import * as serviceWorker from "./serviceWorker";

import "./i18n";

function generateUI(): void {
  const root: HTMLElement = document.createElement("div");
  root.id = "approot";

  document.body.append(root);

  ReactDOM.render(
    <Provider>
      <Route />
    </Provider>,
    root
  );
}

function createMagic() {
  setUpApi();

  generateUI();

  // If you want your app to work offline and load faster, you can change
  // unregister() to register() below. Note this comes with some pitfalls.
  // Learn more about service workers: https://bit.ly/CRA-PWA
  serviceWorker.unregister();
}

// this is a magic
createMagic();
