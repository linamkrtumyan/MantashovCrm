import React, { useState, useEffect } from "react";
import "./speakersPage.css";
import { fetchSpeakers, deleteSpeaker, fetchSpeakersByPage } from "../../store";
import { connect } from "react-redux";
import Loading from "../../Components/Loading/Loading";
import AddSpeakerCard from "../../Components/Speakers/AddSpeakerCard/AddSpeakerCard";
import { useHistory } from "react-router-dom";
import Pagination from "../../Components/Pagination/Pagination";

function SpeakersPage({
  fetchSpeakers,
  deleteSpeaker,
  speakers,
  loading,
  fetch,
  count,
  speakersByPage,
  fetchSpeakersByPage,
}) {
  let history = useHistory();

  useEffect(() => {
    fetchSpeakersByPage();
  }, []);

  useEffect(() => {
    if (!loading) {
      // fetchSpeakers();
      fetchSpeakersByPage();
    }
  }, [fetch]);

  const handleDetails = (id) => {
    history.push(`/edit-speaker/${id}`);
  };

  const handleDelete = (id) => {
    deleteSpeaker(id);
  };

  if (loading) {
    return <Loading />;
  }
  if (!speakersByPage || !speakersByPage.length) {
    return (
      <div className="noData">
        <div>
          <div className="nodata_text">No speakers, you can add a speaker</div>
          <AddSpeakerCard />
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="members_container">
        <AddSpeakerCard />

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            padding: "0 20px",
            overflowY: "scroll",
            maxHeight: "65vh",
          }}
        >
          <table className="table is-striped is-fullwidth is-hoverable">
            <thead>
              <tr>
                <th>Photo</th>
                <th>Full Name</th>
                <th>Organization</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {speakersByPage.length > 0 ? (
                speakersByPage.map((speaker, index) => {
                  return (
                    <tr
                      key={speaker.id}
                      style={{ cursor: "pointer", position: "relative" }}
                      // onClick={() => handleDetails(speaker.id)}
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
                        {
                          // speaker
                          // .organizations.map((org) => (
                          <p key={speaker.organization}>
                            {speaker.organization}
                          </p>
                          // ))
                        }
                      </td>
                      {/* <td onClick={() => handleDetails(speaker.id)}>
                          {speaker.location}
                        </td> */}
                      {/* <div
                          onClick={() => handleReset(speaker.id)}
                          style={{ zIndex: "10", position: "absolute" }}
                        > */}
                      <td
                        // style={{ zIndex: "999999", position: "absolute" }}
                        onClick={() => {
                          handleDelete(speaker.id);
                        }}
                      >
                        <i className="far fa-trash-alt"></i>
                      </td>
                      {/* </div> */}
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="5">No data</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <Pagination totalPosts={count} />
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    speakers: state.speakerReducer.speakers,
    fetch: state.speakerReducer.fetch,
    loading: state.speakerReducer.loading,
    count: state.speakerReducer.count,
    speakersByPage: state.speakerReducer.speakersByPage,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchSpeakers: () => {
      dispatch(fetchSpeakers());
    },
    deleteSpeaker: (id) => {
      dispatch(deleteSpeaker(id));
    },
    fetchSpeakersByPage: () => {
      dispatch(fetchSpeakersByPage());
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SpeakersPage);
