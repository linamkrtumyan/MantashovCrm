import "./App.css";
import { connect } from "react-redux";
import Routes from "./Routes";
import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { authorize } from "./store";
import Loading from "./Components/Loading/Loading";
function App({ isLogin, authorize, loading }) {
  useEffect(() => {
    authorize();
  }, []);

  if (loading) {
    return <Loading />;
  }
  return (
    <>
      <div className="main_container">
        <BrowserRouter>
          <Routes isLogin={isLogin} />
        </BrowserRouter>
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  console.log(state, " app state");
  return {
    isLogin: state.loginReducer.login,
    loading: state.loginReducer.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    authorize: () => dispatch(authorize()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
