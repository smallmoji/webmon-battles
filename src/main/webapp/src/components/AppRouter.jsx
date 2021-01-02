import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Login from '../components/login/Login';
import Home from '../components/home/Home';

export default class AppRouter extends React.Component{
  render(){
    return(
      <Router>
        <Switch>
          <Route path="/login" exact component={Login} />
          <Route path="/home" render={(props)=> <Home {...props}/>} />
        </Switch>
      </Router>
    )
  }
}
