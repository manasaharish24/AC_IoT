import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import "./App.css";
import voltage1 from "./voltage1";
import temperature from "./temperature";
import power from "./power";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/temperature">Temperature</Link>
            </li>
            <li>
              <Link to="/voltage">Voltage</Link>
            </li>
            <li>
              <Link to="/power">Power</Link>
            </li>
          </ul>
          <Switch>
            <Route exact path="/voltage" component={voltage1}></Route>
            <Route exact path="/temperature" component={temperature}></Route>
            <Route exact path="/power" component={power}></Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
