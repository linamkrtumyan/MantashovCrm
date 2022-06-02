import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { fetchEventsByPage, changeCurrentPage } from "../../../store";
import { useHistory, useParams } from "react-router-dom";

function TableBody({
  loading,
  noEvents,
  action,
  count,
  fetchEventsByPage,
  eventsByPage,
  fetch,
  changeCurrentPage,
  searchValue,
  setDeleteModalOpen,
  setDeleteId,
}) {
  let history = useHistory();

  const getDates = (startDate) => {
    let fullDate;

    const sd = new Date(startDate);

    const d1 = `${sd.getFullYear()}-${sd.getMonth() + 1}-${sd.getDate()}`;

    const t1 = `${sd.getHours()}:${sd.getMinutes()}`;

    fullDate = `${d1}  ${t1} `;

    return fullDate;
  };
  function handleEdit(id) {
    history.push(`/edit-event/${id}`);
  }

  function handleDelete(id) {
    setDeleteId(id);
    setDeleteModalOpen(true);
  }
  return (
    <tbody>
      {eventsByPage && eventsByPage.length ? (
        eventsByPage?.map((event) => (
          <tr key={event.id}>
            <td>{event.name}</td>
            <td>{event.location}</td>
            <td>{getDates(event.startDate)}</td>

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
            <td style={{ width: "10px" }}></td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan="5">{"Nothing found"}</td>
        </tr>
      )}
    </tbody>
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

export default connect(mapStateToProps, mapDispatchToProps)(TableBody);
