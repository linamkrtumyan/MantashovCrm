import React, { useEffect } from "react";
import "./newsDetails.css";
import { connect } from "react-redux";
import { fetchNewsDetails } from "../../store";

function NewsDetails({ fetchNewsDetails }) {
  useEffect(() => {
    fetchNewsDetails();
  }, []);
  return <div>news details</div>;
}
const mapStateToProps = (state) => {
  // console.log(state, "state");
  return {
    // newsByPage: state.newsReducer.newsByPage,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // fetchNewsByPage: () => dispatch(fetchNewsByPage()),
    fetchNewsDetails: () => dispatch(fetchNewsDetails()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(NewsDetails);
