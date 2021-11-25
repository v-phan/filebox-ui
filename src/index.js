import React from "react";
import ReactDOM from "react-dom";
import Login from "./components/login/Login";
import Filebox from "./components/filebox/Filebox";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./index.css";

const App = () => {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/filebox/user/:userID" component={Filebox} />
        <Route path="*" component={() => "404 NOT FOUND"} />
      </Switch>
    </div>
  );
}
export default App;

const rootElement = document.getElementById("root");
ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  rootElement
);
