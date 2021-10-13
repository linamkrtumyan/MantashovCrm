import React, { useEffect } from "react";
// import "./eventsPage.css";
import EventCard from "../../Components/Events/EventCard/EventCard";
import AddEventCard from "../../Components/Events/AddEventCard/AddEventCard";
import { connect } from "react-redux";
import { fetchPastEvents } from "../../store";
import { useHistory } from "react-router-dom";
import Pagination from "../../Components/Pagination/Pagination";

function PastEvents({
  fetchPastEvents,
  pastEvents,
  count,
  currentPage,
  action,
  page,
}) {
  useEffect(() => {
    fetchPastEvents(page - 1);
  }, [currentPage, action]);
  const history = useHistory();
  return (
    <>
      <div className="events_container">
        <button onClick={() => history.goBack()} className="arrow_left">
          ❮
        </button>
        <div className="events_title">Past Events </div>
        <div className="all_eventscard_container">
          <AddEventCard />
          {pastEvents?.map((pastEvent) => (
            <EventCard key={pastEvent.id} event={pastEvent} />
          ))}
        </div>
        <Pagination totalPosts={count} />
      </div>
    </>
  );
}
const mapStateToProps = (state) => {
  // console.log(state, "state");
  return {
    pastEvents: state.eventReducer.pastEvents,
    nopastEvents: state.eventReducer.pastEvents.lenght === 0,
    // newsByPage: state.newsReducer.newsByPage,
    count: state.eventReducer?.pastEventsCount,
    // loading: state.newsReducer.loading,
    // noNews: state.newsReducer.newsByPage.length === 0,
    currentPage: state.paginationReducer.currentPage,
    action: state.modalReducer.action,
    page: state.paginationReducer.currentPage,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // fetchNewsByPage: () => dispatch(fetchNewsByPage()),
    fetchPastEvents: (page) => dispatch(fetchPastEvents(page)),
    // fetchUpcomingEvents: () => dispatch(fetchUpcomingEvents()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(PastEvents);
