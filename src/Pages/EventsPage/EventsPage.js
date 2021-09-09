import React, { useEffect, useState } from "react";
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
  const page = 0;
  // const [page, setPage] = useState(0);
  // console.log(page, "eventspage page");
  let history = useHistory();
  function toPastEventsPage() {
    history.push("/past-events");
  }
  function toUpcomingEventsPage() {
    history.push("/upcoming-events");
  }

  useEffect(() => {
    fetchPastEvents(page);
    fetchUpcomingEvents(page);
  }, []);

  const data = [
    {
      id: 1,
      eventName: "Kerakrel Koksin",
      location: "Ijevan",
      startDate: "9/9/2021 15:00:00",
      endDate: "9/9/2021 15:05:00",
      description: "Koks Linayevich",
      going: 2,
      seen: 9,
    },
    {
      id: 2,
      eventName: "Gnal tun",
      location: "Gosh",
      startDate: "9/9/2021 16:40:00",
      endDate: "9/9/2021 16:50:00",
      description: "gazelic chushanal",
      going: 2,
      seen: 9,
    },
    {
      id: 3,
      eventName: "uxxaki event",
      location: "Ijevan",
      startDate: "9/9/2021 17:00:00",
      endDate: "9/9/2021 20:00:00",
      description: "no description",
      going: 3,
      seen: 9,
    },
  ];

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
        {/* <div className="events_title event_nav" onClick={toPastEventsPage}>
          Past Events{" "}
        </div> */}
        {/* <div className="all_eventscard_container"> */}
        {/* <AddEventCard /> */}
        {/* {pastEvents?.map((pastEvent) => (
            <EventCard key={pastEvent.id} event={pastEvent} />
          ))} */}
        {/* </div>
        <div className="events_title event_nav" onClick={toUpcomingEventsPage}>
          Upcoming Events{" "}
        </div> */}

        {/* <div className="all_eventscard_container"> */}
        {/* <AddEventCard /> */}
        {/* {upcomingEvents?.map((upcomingEvent) => (
            <EventCard key={upcomingEvent.id} event={upcomingEvent} />
          ))} */}
        {/* 
          {noUpcomingEvents ? (
            <div className="nodata_text">No Upcoming Events</div>
          ) : null}
        </div> */}

        <AddEventCard />

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            padding: "0 50px 50px 50px ",
          }}
        >
          <table className="table is-striped  is-fullwidth is-hoverable">
            <thead>
              <tr>
                <th>Name</th>
                <th>Location</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Going/Seen</th>
                <th>Description</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data?.map((event) => (
                <tr>
                  <td>{event.eventName}</td>
                  <td>{event.location}</td>
                  <td>{event.startDate}</td>
                  <td>{event.endDate}</td>
                  <td>
                    {event.going}/{event.seen}
                  </td>
                  {event.description.length > 15 ? (
                    <td>{event.description.substring(0, 15)}...</td>
                  ) : (
                    <td>{event.description}</td>
                  )}

                  <td style={{ width: "10px" }}>
                    <div
                      style={{ cursor: "pointer" }}
                      // onClick={(e) => {
                      //   handleEdit(event.id);
                      // }}
                    >
                      <i className="fas fa-edit"></i>
                    </div>
                  </td>
                  <td style={{ width: "10px" }}>
                    <div
                      style={{ cursor: "pointer", marginLeft: "5px" }}
                      // onClick={(e) => {
                      //   handleEdit(event.id);
                      // }}
                    >
                      <i className="fas fa-eye"></i>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
const mapStateToProps = (state) => {
  // console.log(state, "state");
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
    fetchPastEvents: (page) => dispatch(fetchPastEvents(page)),
    fetchUpcomingEvents: (page) => dispatch(fetchUpcomingEvents(page)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(EventsPage);
