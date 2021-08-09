import React, { useEffect } from "react";
// import "./eventsPage.css";
import EventCard from "../../Components/Events/EventCard/EventCard";
import AddEventCard from "../../Components/Events/AddEventCard/AddEventCard";
import { connect } from "react-redux";
import { fetchUpcomingEvents } from "../../store";
import { useHistory } from "react-router-dom";
import Pagination from "../../Components/Pagination/Pagination";

function EventsPage({ fetchUpcomingEvents, upcomingEvents, count, page }) {
  useEffect(() => {
    fetchUpcomingEvents(page);
  }, []);
  const history = useHistory();
  return (
    <>
      <div className="events_container">
        <button onClick={() => history.goBack()} className="arrow_left">
          ❮
        </button>
        <div className="events_title">Upcoming Events </div>
        <div className="all_eventscard_container">
          <AddEventCard />
          {/* {upcomingEvents.map((upcomingEvent) => (
            <EventCard key={upcomingEvent.id} event={upcomingEvent} />
          ))} */}
        </div>
        <Pagination totalPosts={count} />
      </div>
    </>
  );
}
const mapStateToProps = (state) => {
  // console.log(state, "state");
  return {
    // pastEvents: state.eventReducer.pastEvents,
    upcomingEvents: state.eventReducer.upcomingEvents,
    count: state.eventReducer.upcomingEventsCount,
    page: state.paginationReducer.currentPage,
    // newsByPage: state.newsReducer.newsByPage,
    // count: state.newsReducer.count,
    // loading: state.newsReducer.loading,
    // noUpcomingEvents: state.newsReducer.newsByPage.length === 0,
    // currentPage: state.paginationReducer.currentPage,
    // action: state.modalReducer.action,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // fetchNewsByPage: () => dispatch(fetchNewsByPage()),
    // fetchPastEvents: () => dispatch(fetchPastEvents()),
    fetchUpcomingEvents: (page) => dispatch(fetchUpcomingEvents(page)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(EventsPage);
