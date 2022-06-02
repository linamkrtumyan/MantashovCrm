import React, { useState, useEffect } from "react";
import "./speakersPage.css";
import {
  deleteSpeaker,
  fetchSpeakersByPage,
  changeCurrentPage,
} from "../../store";
import { connect } from "react-redux";
import Loading from "../../Components/Loading/Loading";
import AddSpeakerCard from "../../Components/Speakers/AddSpeakerCard/AddSpeakerCard";
import Pagination from "../../Components/Pagination/Pagination";
import SearchBar from "../../Components/SearchBar/SearchBar";
import TableBody from "./components/TableBody";
import { useParams } from "react-router-dom";

function SpeakersPage({
  loading,
  count,
  speakersByPage,
  fetchSpeakersByPage,
  searchValue,
}) {
  let { currentPage } = useParams();
  const [deleted, setDeleted] = useState(false);
  useEffect(() => {
    changeCurrentPage(1);
    fetchSpeakersByPage(1, "");
  }, []);
  useEffect(() => {
    fetchSpeakersByPage(currentPage, "");
  }, [deleted]);

  useEffect(() => {
    if (!loading) {
      fetchSpeakersByPage(currentPage, searchValue ?? "");
    }
  }, [searchValue, currentPage]);

  if (loading) {
    return <Loading />;
  }
  if (
    // !speakersByPage ||
    !speakersByPage.length &&
    !searchValue &&
    searchValue !== ""
  ) {
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
        <div className="is-flex is-justify-content-flex-end">
          <SearchBar
            id="speakersSearch"
            containerClass="searchbar-container"
            url="/speakers"
          />
          <AddSpeakerCard />
        </div>

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

            <TableBody setDeleted={setDeleted} />
          </table>
        </div>
        <Pagination totalPosts={count} />
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    fetch: state.speakerReducer.fetch,
    loading: state.speakerReducer.loading,
    count: state.speakerReducer.count,
    speakersByPage: state.speakerReducer.speakersByPage,
    searchValue: state.formReducer?.speakersSearch,
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
export default connect(mapStateToProps, mapDispatchToProps)(SpeakersPage);
