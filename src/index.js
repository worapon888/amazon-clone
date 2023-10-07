import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { store, persistor } from "./redux/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import "slick-carousel/slick/slick.css";
import App from "./App";

import firebaseConfig from "./firebase.config";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <PersistGate loading={"loading"} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);
