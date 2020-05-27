import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import Taskbar from "../Taskbar";
import Home from "../Home";
import Login from "../Login";
import Signup from "../Signup";

const App = ({ location }) => {
  const isLoggedIn = true;

  return (
    <Router>
      <div>
        <Taskbar isLoggedIn={isLoggedIn} />
        {isLoggedIn ? (
          <Switch location={location}>
            <Route exact path="/" component={Home} />
            <Route render={() => <div>Not found</div>} />
          </Switch>
        ) : (
          <Switch location={location}>
            <Redirect exact from="/" to="/login" />
            <Route path="/login/:nextRoute*" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route render={() => <div>Not found</div>} />
          </Switch>
        )}
      </div>
    </Router>
  );
};

export default App;
