import React from "react";
import { RecoilRoot } from "recoil";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import Header from "./components/molecules/Header";
import SideBar from "./components/molecules/SideBar";

import RoutesComponent from "./components/RoutesComponent";

function App() {
  return (
    <Router>
      <RecoilRoot>
        <div className="App">
          <SideBar />
          <div className="main-content">
            <Header />
            <div className="rounterWrapper">
              <RoutesComponent />
            </div>
          </div>
        </div>
      </RecoilRoot>
    </Router>
  );
}

export default App;
