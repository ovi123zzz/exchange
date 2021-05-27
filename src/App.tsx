import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import {ExchangeMain} from './Exchange/ExchangeMain'
import {Exchange} from './Exchange/Exchange'
import './App.scss';

function App() {
  return (
    <Router>
       <Switch>
          <Route exact path="/">
          <ExchangeMain/>
          </Route>
          <Route path="/exchange">
          <Exchange/>
          </Route>
         
        </Switch>
    </Router>
   
  );
}

export default App;
