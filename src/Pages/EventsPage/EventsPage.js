import React, { useEffect, useState } from "react";
import "./eventsPage.css";
import EventCard from "../../Components/Events/EventCard/EventCard";
import AddEventCard from "../../Components/Events/AddEventCard/AddEventCard";
import { connect } from "react-redux";
import { fetchEventsByPage, changeCurrentPage } from "../../store";
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
  fetch,
  changeCurrentPage,
}) {
  // const [page, setPage] = useState(0);
  let history = useHistory();

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
    fetchEventsByPage();
  }, [])
  

  useEffect(() => {
    if (!loading) {
      fetchEventsByPage();
    }
  }, [currentPage, fetch]);

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
                    <td>
                      {
                        getDates(event.startDate)
                      }
                    </td>
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
    fetch: state.eventReducer.fetch,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeCurrentPage: (page) => dispatch(changeCurrentPage(page)),
    fetchEventsByPage: (page) => dispatch(fetchEventsByPage(page)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(EventsPage);
