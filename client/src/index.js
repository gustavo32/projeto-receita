import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import "bootstrap/dist/css/bootstrap.css";
import "./css/style.css";
import "font-awesome/css/font-awesome.min.css";
import { Router, Switch, Route } from "react-router-dom";
import Cadastrar from "./components/cadastrar";

import { Provider } from "react-redux";
import store from "./store";
import history from "./history";

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Switch>
        <Route path="/" exact={true} component={App} />
        <Route path="/cadastrar" component={Cadastrar} />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
