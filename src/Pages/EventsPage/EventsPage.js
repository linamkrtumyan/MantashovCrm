import React, { useEffect } from "react";
import "./eventsPage.css";
import EventCard from "../../Components/Events/EventCard/EventCard";
import AddEventCard from "../../Components/Events/AddEventCard/AddEventCard";
import { connect } from "react-redux";
import { fetchPastEvents, fetchUpcomingEvents } from "../../store";
import { useHistory } from "react-router-dom";
import Loading from "../../Components/Loading/Loading";

function EventsPage({
  fetchPastEvents,
  pastEvents,
  fetchUpcomingEvents,
  upcomingEvents,
  loading,
  noEvents,
  noUpcomingEvents,
  action,
  noPastEvents,
}) {
  let history = useHistory();
  function toPastEventsPage() {
    history.push("/past-events");
  }
  function toUpcomingEventsPage() {
    history.push("/upcoming-events");
  }

  useEffect(() => {
    fetchPastEvents();
    fetchUpcomingEvents();
  }, []);
  if (loading) {
    return <Loading />;
  }
  if (noEvents) {
    return (
      <div className="noData">
        <div>
          <div className="nodata_text">No events, you can add a event</div>
        </div>
      </div>
    );
  }
  return (
    <>
      <div className="events_container">
        <div className="events_title event_nav" onClick={toPastEventsPage}>
          Past Events{" "}
        </div>
        <div className="all_eventscard_container">
          {/* <AddEventCard /> */}
          {pastEvents.map((pastEvent) => (
            <EventCard key={pastEvent.id} event={pastEvent} />
          ))}
        </div>
        <div className="events_title event_nav" onClick={toUpcomingEventsPage}>
          Upcoming Events{" "}
        </div>

        <div className="all_eventscard_container">
          {/* <AddEventCard /> */}
          {upcomingEvents.map((upcomingEvent) => (
            <EventCard key={upcomingEvent.id} event={upcomingEvent} />
          ))}

          {noUpcomingEvents ? (
            <div className="nodata_text">No Upcoming Events</div>
          ) : null}
        </div>
      </div>
    </>
  );
}
const mapStateToProps = (state) => {
  console.log(state, "state");
  return {
    pastEvents: state.eventReducer.pastEvents,
    upcomingEvents: state.eventReducer.upcomingEvents,
    // newsByPage: state.newsReducer.newsByPage,
    // count: state.newsReducer.count,
    loading: state.eventReducer.loading,
    // noNews: state.newsReducer.newsByPage.length === 0,
    noEvents:
      state.eventReducer.pastEvents.length === 0 &&
      state.eventReducer.upcomingEvents.length === 0,
    noUpcomingEvents: state.eventReducer.upcomingEvents.length === 0,
    noPastEvents: state.eventReducer.pastEvents.length === 0,

    // currentPage: state.paginationReducer.currentPage,
    action: state.modalReducer.action,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // fetchNewsByPage: () => dispatch(fetchNewsByPage()),
    fetchPastEvents: () => dispatch(fetchPastEvents()),
    fetchUpcomingEvents: () => dispatch(fetchUpcomingEvents()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(EventsPage);
