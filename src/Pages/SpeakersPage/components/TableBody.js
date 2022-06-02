import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import {
  fetchSpeakersByPage,
  deleteSpeaker,
  changeCurrentPage,
} from "../../../store";

function TableBody({
  searchValue,
  speakersByPage,
  loading,
  fetchSpeakersByPage,
  deleteSpeaker,
  setDeleted,
}) {
  let history = useHistory();
  let { currentPage } = useParams();

  const handleDetails = (id) => {
    history.push(`/edit-speaker/${id}`);
  };
  const handleDelete = (id) => {
    deleteSpeaker(id);
    setDeleted((prev) => !prev);
  };
  return (
    <tbody>
      {speakersByPage.length > 0 ? (
        speakersByPage.map((speaker, index) => {
          return (
            <tr
              key={speaker.id}
              style={{ cursor: "pointer", position: "relative" }}
            >
              <td onClick={() => handleDetails(speaker.id)}>
                <img
                  alt=""
                  className="membercard_img"
                  src={`${speaker.image}`}
                />
              </td>
              <td onClick={() => handleDetails(speaker.id)}>
                {speaker.fullName}
              </td>
              <td onClick={() => handleDetails(speaker.id)}>
                {<p key={speaker.organization}>{speaker.organization}</p>}
              </td>
              <td
                onClick={() => {
                  handleDelete(speaker.id);
                }}
              >
                <i className="far fa-trash-alt"></i>
              </td>
            </tr>
          );
        })
      ) : (
        <tr>
          <td colSpan="5"> {"Nothing found"}</td>
        </tr>
      )}
    </tbody>
  );
}

const mapStateToProps = (state) => {
  return {
    loading: state.speakerReducer.loading,
    speakersByPage: state.speakerReducer.speakersByPage,
    searchValue: state.formReducer?.speakersSearch ?? "",
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeCurrentPage: (page) => dispatch(changeCurrentPage(page)),
    deleteSpeaker: (id) => {
      dispatch(deleteSpeaker(id));
    },
    fetchSpeakersByPage: (page, searchValue) => {
      dispatch(fetchSpeakersByPage(page, searchValue));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableBody);
