import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import EventsPage from "./Pages/EventsPage/EventsPage";
import Login from "./Pages/LoginPage/Login";
import NewsPage from "./Pages/NewsPage/NewsPage";
import Header from "../src/Components/Header/Header";
import Sidebar from "./Components/Sidebar/Sidebar";
import MembersPage from "./Pages/MembersPage/MembersPage";

function Routes({ isLogin }) {
  console.log(isLogin, "islogin");
  if (isLogin) {
    return (
      <>
        <Header />
        <Sidebar />

        <div style={{ marginLeft: "100px" }}>
          <Switch>
            <Route path="/news" component={NewsPage} exact />
            <Route path="/events" component={EventsPage} exact />
            <Route path="/members" component={MembersPage} exact />

            <Redirect to="/news" />
          </Switch>
        </div>
      </>
    );
  } else {
    return (
      <Switch>
        <Route path="/login" component={Login} exact />

        <Redirect to="/login" />
      </Switch>
    );
  }
}

export default Routes;
