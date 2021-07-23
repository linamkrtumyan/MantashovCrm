import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import EventsPage from "./Pages/EventsPage/EventsPage";
import Login from "./Pages/LoginPage/Login";
import NewsPage from "./Pages/NewsPage/NewsPage";
import Header from "../src/Components/Header/Header";
import Sidebar from "./Components/Sidebar/Sidebar";
import MembersPage from "./Pages/MembersPage/MembersPage";
import AddMember from "./Pages/AddMemberPage/AddMember";
import Footer from "./Components/Footer/Footer";
import EditMember from "./Pages/EditMemberPage/EditMember";
import AddNews from "./Pages/AddNewsPage/AddNews";
import NewsDetails from "./Pages/NewsDetailsPage/NewsDetails";
import EditNews from "./Pages/EditNewsPage/EditNews";

function Routes({ isLogin }) {
  // console.log(isLogin, "islogin");
  if (isLogin) {
    return (
      <>
        <Header />
        <Sidebar />

        <div style={{ marginLeft: "100px", paddingTop: "100px" }}>
          <Switch>
            <Route path="/news" component={NewsPage} exact />
            <Route path="/events" component={EventsPage} exact />
            <Route path="/members" component={MembersPage} exact />
            <Route path="/add-member" component={AddMember} exact />
            <Route path="/edit-member" component={EditMember} exact />
            <Route path="/add-news" component={AddNews} exact />
            <Route path="/news-details/:id" component={NewsDetails} exact />
            <Route path="/edit-news/:id" component={EditNews} exact />

            <Redirect to="/news" />
          </Switch>
        </div>
        {/* <Footer /> */}
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
