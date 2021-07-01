import React from "react";
import "./eventsPage.css";
import EventCard from "../../Components/Events/EventCard/EventCard";
import AddEventCard from "../../Components/Events/AddEventCard/AddEventCard";

function EventsPage() {
  return (
    <>
      <div className="events_container">
        <div className="events_title">All Events</div>
        <div className="all_eventscard_container">
          <AddEventCard />
          <EventCard />
          <EventCard />
          <EventCard />
          <EventCard />
          <EventCard />
          <EventCard />
          <EventCard />
        </div>
      </div>
    </>
  );
}

export default EventsPage;
