import React, { Component } from "react";
import { BrowserRouter, Route, Link ,Switch } from 'react-router-dom';
import './App.css';
import SerchPage from './components/SearchBar';
import EditPage from './components/EditPolicy';
import GraphPage from './components/Graph';

 function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/">
          <SerchPage />
          </Route>
          <Route exact path="/edit/:id">
            <EditPage />
          </Route>
          <Route exact  path="/graph">
            <GraphPage />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}
export default App;
