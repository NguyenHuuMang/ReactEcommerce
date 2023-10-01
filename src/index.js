import { BrowserRouter } from 'react-router-dom';
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import Store from "./redux/store";

ReactDOM.render(
  <BrowserRouter>
  <Provider store={Store}>
    <App />
  </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);

// import { createRoot } from 'react-dom/client';
// const root = createRoot(document.getElementById('root'));
// root.render(
//   <Provider store={Store}>
//     <App />
//   </Provider>
// );

reportWebVitals();
