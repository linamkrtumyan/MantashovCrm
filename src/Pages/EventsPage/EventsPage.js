import React, { useEffect, useState } from "react";
import "./eventsPage.css";
import EventCard from "../../Components/Events/EventCard/EventCard";
import AddEventCard from "../../Components/Events/AddEventCard/AddEventCard";
import { connect } from "react-redux";
import { fetchEventsByPage, changeCurrentPage } from "../../store";
import { useHistory, useParams } from "react-router-dom";
import Loading from "../../Components/Loading/Loading";
import EditEvent from "./EditEvent";
import ViewsInfoPage from "./ViewsInfoPage";

import Pagination from "../../Components/Pagination/Pagination";
import DeleteEvent from "./DeleteEvent";
import SearchBar from "../../Components/SearchBar/SearchBar";
import TableBody from "./components/TableBody";

function EventsPage({
  loading,
  noEvents,
  action,
  count,
  fetchEventsByPage,
  eventsByPage,
  fetch,
  changeCurrentPage,
  searchValue,
}) {
  const [infoModalOpen, setInfoModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [infoId, setInfoId] = useState(null);
  let { currentPage } = useParams();

  useEffect(() => {
    changeCurrentPage(1);
    fetchEventsByPage(1, "");
  }, []);

  // function handleInfo(id) {
  //   setInfoId(id);
  //   setInfoModalOpen(true);
  // }
  useEffect(() => {
    if (!loading) {
      fetchEventsByPage(currentPage, searchValue ?? "");
    }
  }, [currentPage, fetch, searchValue]);

  if (loading) {
    return <Loading />;
  }

  if (noEvents && !searchValue && searchValue !== "") {
    return (
      <div className="noData">
        <div>
          <div className="nodata_text">No events, you can add an event</div>
          <AddEventCard />
        </div>
      </div>
    );
  }
  return (
    <>
      {/* <EditEvent
        modalOpen={editModalOpen}
        setModalOpen={setEditModalOpen}
        id={editId}
        setEditId={setEditId}
      /> */}
      <DeleteEvent
        modalOpen={deleteModalOpen}
        setModalOpen={setDeleteModalOpen}
        id={deleteId}
        setDeleteId={setDeleteId}
      />
      {/* <ViewsInfoPage
        modalOpen={infoModalOpen}
        setModalOpen={setInfoModalOpen}
        id={infoId}
        setInfoId={setInfoId}
      /> */}
      <div className="is-flex is-justify-content-flex-end">
        <SearchBar
          id="eventsSearch"
          containerClass="searchbar-container"
          url="/events"
        />
        <AddEventCard />
      </div>
      <div>
        <div className="events_container">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              padding: "0 20px",
              overflowY: "scroll",
              maxHeight: "65vh",
            }}
          >
            <table className="table is-striped  is-fullwidth is-hoverable">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Location</th>
                  <th>Date</th>
                  <th></th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <TableBody
                setDeleteId={setDeleteId}
                setDeleteModalOpen={setDeleteModalOpen}
                setInfoModalOpen={setInfoModalOpen}
              />
            </table>
          </div>
          <Pagination totalPosts={count} url="/events" />
        </div>
      </div>
    </>
  );
}
const mapStateToProps = (state) => {
  return {
    loading: state.eventReducer.loading,
    noEvents: state.eventReducer.eventsByPage.length === 0,
    // currentPage: state.paginationReducer.currentPage,
    action: state.modalReducer.action,
    count: state.eventReducer.count,
    eventsByPage: state.eventReducer.eventsByPage,
    fetch: state.eventReducer.fetch,
    searchValue: state.formReducer?.eventsSearch,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeCurrentPage: (page) => dispatch(changeCurrentPage(page)),
    fetchEventsByPage: (page, searchValue) =>
      dispatch(fetchEventsByPage(page, searchValue)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(EventsPage);
