import React, { Component } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { NavbarComponent } from "./components";
import { Home, Success } from "./pages";

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <NavbarComponent />
        <main>
          <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/success" element={<Success />}/>
          </Routes>
        </main>
      </BrowserRouter>
    );
  }
}
