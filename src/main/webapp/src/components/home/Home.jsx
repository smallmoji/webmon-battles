import React from "react";
import $ from 'jquery';
import {Paper, Tabs, Tab, Container, AppBar, Toolbar, Typography, IconButton, Grid, Avatar, Badge, CardHeader, Card  } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import AdbIcon from '@material-ui/icons/Adb';
import {ReactComponent as WebmonIconInverse} from '../../misc/icons/webmon_icon_inverse.svg';
import {ReactComponent as WebmonLogo} from '../../misc/icons/webmon_logo.svg';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import NotificationsIcon from '@material-ui/icons/Notifications';
import TabPanel from '../common/TabPanel';
import UsersTab from './creator-tabs/UsersTab';
import WebmonsTab from './creator-tabs/WebmonsTab';
import AccountCircle from '@material-ui/icons/AccountCircle';
import '../../css/common.css';
import '../../css/override-ej2.css';
import '../../css/home/home.css';
import { MoreVert as MoreVertIcon } from '@material-ui/icons'

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
  },
  avatarScales: {
    width: "100%",
    paddingTop:"100%",
    position:"relative",
    '& .MuiSvgIcon-root' : {
      position:"absolute",
      top:"10%"
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
      value: 0,
      skillsCount: 0,
      usersCount: 0,
      webmonsCount: 0
    }
  }

  componentDidMount(){
    this.getEntitiesCount();
  }
 
  getEntitiesCount(){
    let that = this;
    $.ajax({
      url:"getEntitiesCount",
      type:"GET",
      success:function(response){
        if(response.result === "success"){
          that.setState({skillsCount: response.skillsCount, usersCount: response.usersCount, webmonsCount: response.webmonsCount})
        }
      }
    })
  }

  handleChange(e, newValue){
    this.setState({value: newValue})
  }

  renderCreatorDashboard(){
    const { classes } = this.props;

    return(
      <div>
        <Grid container spacing={2} className="p-2">
          <Grid item xs="12" sm="4">
            <Card>
              <CardHeader avatar={<Avatar aria-label="" style={{backgroundColor:"#A989DF"}}></Avatar>}
              title={<div><span style={{fontSize:"1.2rem"}}>{this.state.usersCount}</span> Users</div>}
              
            />
            </Card>
          </Grid>
          <Grid item xs="12" sm="4">
            <Card>
              <CardHeader avatar={<Avatar style={{backgroundColor:"#0DC3AA"}}><AdbIcon/></Avatar>}
              title={<div><span style={{fontSize:"1.2rem"}}>{this.state.webmonsCount}</span> Webmons</div>}
              
            />
            </Card>
          </Grid>
          <Grid item xs="12" sm="4">
            <Card>
              <CardHeader avatar={<Avatar style={{backgroundColor:"#FCC108"}}><MenuBookIcon/></Avatar>}
              title={<div><span style={{fontSize:"1.2rem"}}>{this.state.skillsCount}</span> Skills</div>}
              
            />
            </Card>
          </Grid>
          
          <Grid item xs="12">
            <Paper square className="p-2">
              <Tabs
                className={classes.tabStyle}
                value={this.state.value}
                onChange={this.handleChange.bind(this)}
                indicatorColor="primary"
                textColor="primary"
                aria-label="icon tabs example"
              >
                <Tab label={<div><PersonPinIcon style={{verticalAlign: 'middle'}} /> Users</div>} aria-label="users" />
                <Tab label={<div><AdbIcon style={{verticalAlign: 'middle'}} /> Webmons</div>} aria-label="webmon" />
                <Tab label={<div><MenuBookIcon style={{verticalAlign: 'middle'}} /> Skills</div>} aria-label="skills" />
              </Tabs>

              <TabPanel value={this.state.value} index={0}>
                <UsersTab isShow={true} />
              </TabPanel>
              <TabPanel value={this.state.value} index={1}>
                <WebmonsTab isShow={true} />
              </TabPanel>
              <TabPanel value={this.state.value} index={2}>
                Item Three
              </TabPanel>
            </Paper>
          </Grid>
        </Grid>
        
      </div>
     
    );
  }

  render(){
    const { classes } = this.props;
    return(
      <div>
       
          <Grid container style={{minHeight:"100vh"}}>
            <Grid item xs="12" sm="2" className="p-0">
              <div className="profile-bar">
                <div className="d-flex align-items-center">
                  <WebmonLogo className="small-icon mr-1"/> <span className="logo-word">Webmon Battles</span> 
                </div>
              </div>
             
            </Grid>
            <Grid item sm="10">
               <AppBar position="static" className="border-bottom" style={{backgroundColor:"#fff",boxShadow:"none"}}>
                <Toolbar>
                  <Typography variant="h6" color="textPrimary" style={{flexGrow:"1"}}>
                    Dashboard
                  </Typography>

                  <IconButton aria-label="show 17 new notifications" color="default">
                    <Badge badgeContent={17} color="secondary">
                      <NotificationsIcon />
                    </Badge>
                  </IconButton>
                  <IconButton color="default">
                    <AccountCircle />
                  </IconButton>
                </Toolbar>
              </AppBar>

              {this.renderCreatorDashboard()}
            </Grid>
          </Grid>

      </div>
  
    )
  }
}

export default withStyles(styles)(Home);