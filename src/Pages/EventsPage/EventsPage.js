import React, { useEffect, useState } from "react";
import "./eventsPage.css";
import EventCard from "../../Components/Events/EventCard/EventCard";
import AddEventCard from "../../Components/Events/AddEventCard/AddEventCard";
import { connect } from "react-redux";
import { fetchEventsByPage } from "../../store";
import { useHistory } from "react-router-dom";
import Loading from "../../Components/Loading/Loading";
import EditEvent from "./EditEvent";
import ViewsInfoPage from "./ViewsInfoPage";

import Pagination from "../../Components/Pagination/Pagination";
import DeleteEvent from "./DeleteEvent";

function EventsPage({
  loading,
  noEvents,
  action,
  count,
  fetchEventsByPage,
  eventsByPage,
  currentPage,
}) {
  const page = 0;
  // const [page, setPage] = useState(0);
  // console.log(page, "eventspage page");
  let history = useHistory();

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [infoModalOpen, setInfoModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [infoId, setInfoId] = useState(null);

  useEffect(() => {
    fetchEventsByPage();
  }, [currentPage,]);

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

  const getDates = (startDate, endDate) => {
    let fullDate;

    const sd = new Date(startDate);
    const ed = new Date(endDate);

    const d1 = `${sd.getFullYear()}-${sd.getMonth() + 1}-${sd.getDate()}`;
    const d2 = `${ed.getFullYear()}-${ed.getMonth() + 1}-${ed.getDate()}`;

    const t1 = `${sd.getHours()}:${sd.getMinutes()}`;
    const t2 = `${ed.getHours()}:${ed.getMinutes()}`;

    if (d1 === d2) {
      fullDate = `${d1}  ${t1}-${t2}`;
    } else {
      fullDate = `${d1} ${t1} / ${d2} ${t2}`;
    }

    return fullDate;
  };

  if (loading) {
    return <Loading />;
  }
  
  if (noEvents) {
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
      <div>
        <div className="events_container">
          <AddEventCard />

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
                  <th>Going/Seen</th>
                  <th>Description</th>
                  <th></th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {eventsByPage?.map((event) => (
                  <tr>
                    <td>{event.name}</td>
                    <td>{event.location}</td>
                    <td>{getDates(event.startDate, event.endDate)}</td>
                    {/* <td>{event.endDate}</td> */}
                    <td>
                      {event.going}/{event.viewed}
                    </td>
                    {event.description?.length > 15 ? (
                      <td>{event.description.substring(0, 15)}...</td>
                    ) : (
                      <td>{event.description}</td>
                    )}

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
                      <div
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          handleInfo(event.id);
                        }}
                      >
                        <i className="fas fa-eye"></i>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Pagination totalPosts={count} />
        </div>
      </div>
    </>
  );
}
const mapStateToProps = (state) => {
  return {
    loading: state.eventReducer.loading,
    noEvents: state.eventReducer.eventsByPage.length === 0,
    currentPage: state.paginationReducer.currentPage,
    action: state.modalReducer.action,
    count: state.eventReducer.count,
    eventsByPage: state.eventReducer.eventsByPage,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchEventsByPage: (page) => dispatch(fetchEventsByPage(page)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(EventsPage);
