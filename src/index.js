import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import {Provider} from "react-redux";
import Store from "./redux/store";
import {PersistGate} from "redux-persist/integration/react";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={Store.store}>
      <PersistGate loading={null} persistor={Store.persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
