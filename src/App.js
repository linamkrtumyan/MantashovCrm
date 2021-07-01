import "./App.css";

import Routes from "./Routes";
import { BrowserRouter } from "react-router-dom";
function App() {
  const isLogin = true;
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

export default App;
