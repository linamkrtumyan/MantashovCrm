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

function EventsPage({
  loading,
  noEvents,
  action,
  count,
  fetchEventsByPage,
  eventsByPage,
  // currentPage,
  fetch,
  changeCurrentPage,
  searchValue,
}) {
  // const [page, setPage] = useState(0);
  let history = useHistory();
  let { currentPage } = useParams();

  const [infoModalOpen, setInfoModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [infoId, setInfoId] = useState(null);

  // const a = "[1,2,4]";
  // const b = a.substr(1, a.length - 2);
  // const methods = a.substr(1, a.length - 2).split(",").map(function (item) {
  //   return parseInt(item);
  // });

  useEffect(() => {
    changeCurrentPage(1);
  }, []);

  useEffect(() => {
    if (!loading) {
      fetchEventsByPage(currentPage, searchValue ?? "");
    }
  }, [currentPage, fetch, searchValue]);

  function handleEdit(id) {
    history.push(`/edit-event/${id}`);
  }

  function handleDelete(id) {
    setDeleteId(id);
    setDeleteModalOpen(true);
  }

  function handleInfo(id) {
    setInfoId(id);
    setInfoModalOpen(true);
  }

  const getDates = (startDate) => {
    let fullDate;

    const sd = new Date(startDate);

    const d1 = `${sd.getFullYear()}-${sd.getMonth() + 1}-${sd.getDate()}`;

    const t1 = `${sd.getHours()}:${sd.getMinutes()}`;

    fullDate = `${d1}  ${t1} `;

    return fullDate;
  };

  if (loading) {
    return <Loading />;
  }

  if (noEvents && (!searchValue || searchValue == "")) {
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
      <ViewsInfoPage
        modalOpen={infoModalOpen}
        setModalOpen={setInfoModalOpen}
        id={infoId}
        setInfoId={setInfoId}
      />
      <div className="is-flex is-justify-content-flex-end">
        <SearchBar id="eventsSearch" containerClass="searchbar-container" />
        <AddEventCard />
      </div>
      {eventsByPage && eventsByPage.length ? (
        <div>
          <div className="events_container">
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                padding: "0 20px",
                overflowY: "scroll",
                // overflowX: "scroll",
                maxHeight: "65vh",
              }}
              // className="all_members_container"
            >
              <table className="table is-striped  is-fullwidth is-hoverable">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Location</th>
                    <th>Date</th>
                    {/* <th>Description</th> */}
                    <th></th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {eventsByPage?.map((event) => (
                    <tr key={event.id}>
                      <td>{event.name}</td>
                      <td>{event.location}</td>
                      <td>{getDates(event.startDate)}</td>
                      {/* <td>{event.endDate}</td> */}

                      {/* {event.description?.length > 15 ? (
                      <td>{event.description.substring(0, 15)}...</td>
                    ) : (
                      <td>{event.description}</td>
                    )} */}

                      <td style={{ width: "10px" }}>
                        <div
                          style={{ cursor: "pointer" }}
                          onClick={(e) => {
                            handleEdit(event.id);
                          }}
                        >
                          <i className="fas fa-edit"></i>
                        </div>
                      </td>
                      <td style={{ width: "10px" }}>
                        <div
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            handleDelete(event.id);
                          }}
                        >
                          <i className="far fa-trash-alt"></i>
                        </div>
                      </td>
                      <td style={{ width: "10px" }}>
                        {/* <div
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          handleInfo(event.id);
                        }}
                      >
                        <i className="fas fa-eye"></i>
                      </div> */}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Pagination totalPosts={count} url="/events" />
          </div>
        </div>
      ) : (
        <>
          {searchValue && searchValue !== "" ? (
            <div
              className="is-flex is-justify-content-center"
              style={{ marginTop: "100px" }}
            >
              <p className="applicant_page_title">Nothing found.</p>
            </div>
          ) : (
            <div
              className="is-flex is-justify-content-center"
              style={{ marginTop: "100px" }}
            >
              <div className="noData">
                <div>
                  <div className="nodata_text">
                    No events, you can add an event
                  </div>
                  <AddEventCard />
                </div>
              </div>
            </div>
          )}
        </>
      )}
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
    searchValue: state.formReducer?.eventsSearch ?? "",
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
