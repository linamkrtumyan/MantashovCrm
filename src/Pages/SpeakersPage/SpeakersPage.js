import React, { useState, useEffect } from "react";
import "./speakersPage.css";
import { fetchSpeakers, deleteSpeaker } from "../../store";
import { connect } from "react-redux";
import Loading from "../../Components/Loading/Loading";
import AddSpeakerCard from "../../Components/Speakers/AddSpeakerCard/AddSpeakerCard";

function SpeakersPage({
  fetchSpeakers,
  deleteSpeaker,
  speakers,
  loading,
  fetch,
}) {
  useEffect(() => {
    if (!loading) {
      fetchSpeakers();
    }
  }, [fetch]);

  const handleDetails = () => {};

  const handleDelete = (id) => {
    deleteSpeaker(id);
  };

  if (loading) {
    return <Loading />;
  }
  if (!speakers || !speakers.length) {
    return (
      <div className="noData">
        <div>
          <div className="nodata_text">No members, you can add a member</div>
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
              {speakers.length > 0 ? (
                speakers.map((speaker, index) => {
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
                          src={`/images/profile/${speaker.id}/profile_picture.png`}
                        />
                      </td>
                      <td onClick={() => handleDetails(speaker.id)}>
                        {speaker.name}
                      </td>
                      <td onClick={() => handleDetails(speaker.id)}>
                        {
                          // speaker
                          // .organizations.map((org) => (
                          <p key={speaker.organization}>
                            {speaker.organizationName}
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
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    speakers: state.speakerReducer.speakers,
    fetch: state.speakerReducer.fetch,
    loading: state.speakerReducer.loading,
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
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SpeakersPage);
