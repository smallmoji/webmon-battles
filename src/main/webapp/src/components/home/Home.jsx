import React from "react";
import $ from 'jquery';
import {Paper, Tabs, Tab, Container, AppBar, Toolbar, Typography, IconButton, Grid} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import AdbIcon from '@material-ui/icons/Adb';
import {ReactComponent as WebmonIconInverse} from '../../misc/icons/webmon_icon_inverse.svg';
import {ReactComponent as WebmonFullIconInverse} from '../../misc/icons/webmonfull_icon_inverse.svg';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import TabPanel from '../common/TabPanel';
import UsersTab from './creator-tabs/UsersTab';
import WebmonsTab from './creator-tabs/WebmonsTab';
import '../../css/common.css';
import { Menu as MenuIcon } from '@material-ui/icons'
import AccountCircle from '@material-ui/icons/AccountCircle';
import '../../css/common.css';
import '../../css/override-ej2.css';

const styles = theme => ({
  tabStyle: {
    '& button:focus': {
      outline:'none'
    },
    '& .Mui-selected' : {
      color: '#fb8e27',
    },
    '& .MuiTabs-indicator' : {
      backgroundColor: '#fb8e27'
    }
  }
});

class Home extends React.Component{
  constructor(props){
    super(props);
    const prop = this.props.location.state;
    document.title = "Home";
    this.state = {
      // role: prop.role,
      // id: prop.id,
      value: 0
    }
  }

 

  handleChange(e, newValue){
    this.setState({value: newValue})
  }

  renderCreator(){
    const { classes } = this.props;

    return(
      <div>
        <Paper square className="p-2">
          <Tabs
            className={classes.tabStyle}
            value={this.state.value}
            onChange={this.handleChange.bind(this)}
            // variant="fullWidth"
            indicatorColor="primary"
            textColor="primary"
            aria-label="icon tabs example"
          >
            <Tab label={<div><PersonPinIcon style={{verticalAlign: 'middle'}} /> Users</div>} aria-label="users" />
            <Tab label={<div><AdbIcon style={{verticalAlign: 'middle'}} /> Webmons</div>} aria-label="webmon" />
            <Tab label={<div><MenuBookIcon style={{verticalAlign: 'middle'}} /> Skills</div>} aria-label="skills" />
          </Tabs>

          <TabPanel value={this.state.value} index={0}>
            <UsersTab />
          </TabPanel>
          <TabPanel value={this.state.value} index={1}>
            <WebmonsTab />
          </TabPanel>
          <TabPanel value={this.state.value} index={2}>
            Item Three
          </TabPanel>
        </Paper>
      </div>
     
    );
  }

  render(){
    return(
      <div>
        <AppBar position="static" style={{backgroundColor:"#fb8e27"}}>
          <Toolbar variant="dense">
            <IconButton edge="start" color="default" aria-label="menu" >
              <WebmonFullIconInverse style={{height:"25px",width:"auto"}} />
            </IconButton>
          <div style={{flexGrow:"1"}}></div>
            <IconButton color="inherit">
              <AccountCircle />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Container maxWidth="xl" className="mt-2"> 
          <Grid container spacing={1}>
            <Grid item sm="2">

            </Grid>
            <Grid item sm="10">
              {this.renderCreator()}
            </Grid>
          </Grid>
         
        </Container>
      </div>
  
    )
  }
}

export default withStyles(styles)(Home);