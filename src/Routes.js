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
import PastEvents from "./Pages/PastEventsPage/PastEvents";
import UpcomingEvents from "./Pages/UpcomingEventsPage/UpcomingEvents";
import AddEvent from "./Pages/AddEventPage/AddEvent";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MemberDetails from "./Pages/MemberDetailsPage/MemberDetails";
import EventDetailsPage from "./Pages/EventDeatilsPage/EventDetailsPage";
import WithBulma from "./Pages/BulmaExp/WithBulma";
import Information from "./Pages/InformationPage/Information";
import EditEvent from "./Pages/EventsPage/EditEvent";
import Applicant from "./Pages/Applicant/Applicant";
import CreateEventDetails from "./Pages/CreateEventDetails/CreateEventDetails";
import CreateNewsDetails from "./Pages/CreateNewsDetailsPage/CreateNewsDetails";
import SpeakersPage from "./Pages/SpeakersPage/SpeakersPage";
import AddSpeakerPage from "./Pages/AddSpeakerPage/AddSpeakerPage";
import EditSpeaker from "./Pages/EditSpeakerPage/EditSpeaker";

function Routes({ isLogin, userName }) {
  if (isLogin) {
    return (
      <>
        <ToastContainer style={{ zIndex: 10000000000 }} autoClose={4000} />

        <Header userName={userName} />
        <Sidebar />

        <div style={{ marginLeft: "200px", paddingTop: "100px" }}>
          <Switch>
            <Route path="/news" component={NewsPage} exact />
            <Route path="/events" component={EventsPage} exact />
            <Route path="/add-event" component={AddEvent} exact />
            <Route path="/edit-event/:id" component={EditEvent} exact />
            {/* <Route path="/past-events" component={PastEvents} exact />
            <Route path="/upcoming-events" component={UpcomingEvents} exact /> */}
            {/* <Route
              path="/event-details/:id"
              component={EventDetailsPage}
              exact
            /> */}
            <Route
              path="/eventDetails/:eventId"
              component={CreateEventDetails}
              exact
            />
            <Route path="/newsDetails" component={CreateNewsDetails} exact />
            <Route path="/members" component={MembersPage} exact />
            <Route path="/member-details/:id" component={MemberDetails} exact />
            <Route path="/add-member" component={AddMember} exact />
            <Route path="/edit-member/:id" component={EditMember} exact />
            <Route path="/add-news" component={AddNews} exact />
            <Route path="/news-details/:id" component={NewsDetails} exact />
            <Route path="/edit-news/:id" component={EditNews} exact />
            <Route path="/bulma" component={WithBulma} exact />
            <Route path="/information" component={Information} exact />
            <Route path="/applicant" component={Applicant} exact />
            <Route path="/speakers" component={SpeakersPage} exact />
            <Route path="/add-speaker" component={AddSpeakerPage} exact />
            <Route path="/edit-speaker/:id" component={EditSpeaker} exact />
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
