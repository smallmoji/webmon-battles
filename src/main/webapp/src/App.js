import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import React from 'react';
import AppRouter from './components/AppRouter';
import CssBaseline from '@material-ui/core/CssBaseline';

function App() {
  return (
    <React.Fragment>
      <CssBaseline />
      <div className="main">
        <AppRouter/>
      </div>
    </React.Fragment>
    
  );
}

export default App;
