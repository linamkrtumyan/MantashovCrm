import "./App.css";
import { connect } from "react-redux";
import Routes from "./Routes";
import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { authorize, cleanForm } from "./store";
import Loading from "./Components/Loading/Loading";
import "bulma/css/bulma.css";
import "./myStyles.scss";

function App({ isLogin, authorize, loading, cleanForm, userName }) {
  useEffect(() => {
    authorize();

    // cleanForm();
  }, []);

  if (loading) {
    return <Loading />;
  }
  return (
    <>
      <div className="main_container">
        <BrowserRouter>
          <Routes isLogin={isLogin} userName={userName} />
        </BrowserRouter>
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  // console.log(state, " app state");
  return {
    isLogin: state.loginReducer.login,
    loading: state.loginReducer.loading,
    userName: state.loginReducer.userName,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    authorize: () => dispatch(authorize()),
    cleanForm: () => dispatch(cleanForm()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
