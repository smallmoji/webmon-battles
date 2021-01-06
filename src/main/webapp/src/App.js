import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import React from 'react';
import AppRouter from './components/AppRouter';
import Footer from './components/footer/footer';
import CssBaseline from '@material-ui/core/CssBaseline';

function App() {
  return (
    <React.Fragment>
      <CssBaseline />
      <div>
         <div className="main" style={{minHeight:"100vh"}}>
          <AppRouter/>
        </div>
        {/* <div>
          <Footer />
        </div> */}
        
      </div>
     
    </React.Fragment>
    
  );
}

export default App;
