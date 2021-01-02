import React from "react";
import $ from 'jquery';
import {Paper, Tabs, Tab, Container} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import AdbIcon from '@material-ui/icons/Adb';
import {ReactComponent as WebmonIcon} from '../../misc/icons/webmon_icon.svg';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import TabPanel from '../common/TabPanel';
import UsersTab from './creator-tabs/UsersTab';
import WebmonsTab from './creator-tabs/WebmonsTab';
import '../../css/common.css';

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
        <div>
          <p> Welcome, <b>Creator</b></p>
        </div>
        <Paper square className="p-2">
          <Tabs
            className={classes.tabStyle}
            value={this.state.value}
            onChange={this.handleChange.bind(this)}
            variant="fullWidth"
            indicatorColor="primary"
            textColor="primary"
            aria-label="icon tabs example"
          >
            <Tab label="Users" icon={<PersonPinIcon />} aria-label="users" />
            <Tab label="Webmons" icon={<AdbIcon />} aria-label="webmon" />
            <Tab label="Skills" icon={<MenuBookIcon />} aria-label="skills" />
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
        <Container maxWidth="xl">
          {this.renderCreator()}
        </Container>
      </div>
  
    )
  }
}

export default withStyles(styles)(Home);