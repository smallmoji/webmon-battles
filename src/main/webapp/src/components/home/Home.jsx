import React from "react";
import $ from 'jquery';
import {Paper, Tabs, Tab, AppBar, Toolbar, Typography, IconButton, Grid, Avatar, Badge, CardHeader, Card, Hidden, Drawer  } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import AdbIcon from '@material-ui/icons/Adb';
import {ReactComponent as WebmonLogo} from '../../misc/icons/webmon_logo.svg';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import NotificationsIcon from '@material-ui/icons/Notifications';
import TabPanel from '../common/TabPanel';
import UsersTab from './creator-tabs/UsersTab';
import WebmonsTab from './creator-tabs/WebmonsTab';
import AccountCircle from '@material-ui/icons/AccountCircle';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PublicIcon from '@material-ui/icons/Public';
import ExploreIcon from '@material-ui/icons/Explore';
import StorefrontIcon from '@material-ui/icons/Storefront';
import MenuIcon from '@material-ui/icons/Menu';
import '../../css/common.css';
import '../../css/override-ej2.css';
import '../../css/home/home.css';

const styles = theme => ({
  tabStyle: {
    '& button:focus': {
      outline:'none'
    },
    '& .Mui-selected' : {
      color: '#fb8e27'
    },
    '& .MuiTabs-indicator' : {
      backgroundColor: '#fb8e27'
    }
  },
  sidebarTab: {
    '& button:focus': {
      outline:'none'
    },
    '& .MuiTab-wrapper' : {
      alignItems:"flex-start"
    },
    '& .MuiTab-root': {
      padding: "0",
      fontSize: "0.775rem",
      minHeight: "35px",
      paddingLeft:"16px"
    },
    '& .Mui-selected' : {
      color: '#e9e9e9',
      fontWeight: '500!important',
      backgroundColor: "#2d343f",
      '& .MuiSvgIcon-root': {
        color: '#fb8e27'
      }
    },
    '& .MuiTabs-indicator' : {
      backgroundColor: '#fff'
    },
    '& .MuiTab-textColorInherit': {
      color: '#e9e9e9',
      fontWeight: '400'
    },
    '& .MuiTabs-indicator' : {
      backgroundColor: '#fb8e27'
    }
  },
  smallAvatar: {
    width: theme.spacing(4),
    height: theme.spacing(4),
  },  
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  drawer: {
    '& .MuiPaper-root':{
      width:"50%"
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
      sidebarValue: 20,
      skillsCount: 0,
      usersCount: 0,
      webmonsCount: 0,
      page:"Dashboard",
      mobileOpen: false,
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

  handleDrawerToggle(){
    let toggler = this.state.mobileOpen;
    console.log(!toggler)
    this.setState({mobileOpen: !toggler})
  }

  handleChange(e, newValue){
    this.setState({value: newValue})
  }

  handleSidebarChange(e, newValue){
    let pageText = e.target.innerText;
    let formattedPageText = pageText.charAt(1) + pageText.slice(2).toLowerCase();
    this.setState({sidebarValue: newValue, page: formattedPageText});
  }

  renderCreatorDashboard(){
    const { classes } = this.props;

    return(
      <div>
        <Grid container spacing={2} className="p-2">
          <Grid item xs="12" sm="4">
            <Card>
              <CardHeader avatar={<Avatar aria-label="" style={{backgroundColor:"#86A59C"}}></Avatar>}
              title={<div><span style={{fontSize:"1.2rem"}}>{this.state.usersCount}</span> Users</div>}/>
            </Card>
          </Grid>
          <Grid item xs="12" sm="4">
            <Card>
              <CardHeader avatar={<Avatar style={{backgroundColor:"#89CE94"}}><AdbIcon/></Avatar>}
              title={<div><span style={{fontSize:"1.2rem"}}>{this.state.webmonsCount}</span> Webmons</div>}/>
            </Card>
          </Grid>
          <Grid item xs="12" sm="4">
            <Card>
              <CardHeader avatar={<Avatar style={{backgroundColor:"#DABFFF"}}><MenuBookIcon/></Avatar>}
              title={<div><span style={{fontSize:"1.2rem"}}>{this.state.skillsCount}</span> Skills</div>}/>
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

  renderSideBar(){
    const { classes } = this.props;
    return(
    <div className="profile-bar">
      <Grid item>
        <Grid item xs="12">
          <div className="d-flex align-items-center mb-3 pl-3 pt-3">
            <WebmonLogo className="small-icon mr-1"/> <span className="logo-word">Webmons</span> 
          </div>
        </Grid>
        
        <Grid item xs="12" className="pl-3 mb-2 text-secondary">Main</Grid>

        <Grid item xs="12">
          <Tabs
            orientation="vertical"
            className={classes.sidebarTab}
            value={this.state.sidebarValue}
            onChange={this.handleSidebarChange.bind(this)}
            indicatorColor="inherit"
          >
            <Tab value={20} label={<div><DashboardIcon style={{verticalAlign: 'middle'}} /> Dashboard</div>} aria-label="dashboard" />
            <Tab value={21} label={<div><PersonPinIcon style={{verticalAlign: 'middle'}} /> Users</div>} aria-label="users" />
            <Tab value={22} label={<div><AdbIcon style={{verticalAlign: 'middle'}} /> Webmons</div>} aria-label="webmon" />
            <Tab value={23} label={<div><MenuBookIcon style={{verticalAlign: 'middle'}} /> Skills</div>} aria-label="skills" />
          </Tabs>
        </Grid>

        <Grid item xs="12" className="pl-3 my-2 text-secondary">Misc</Grid>

        <Grid item xs="12">
          <Tabs
            orientation="vertical"
            className={classes.sidebarTab}
            value={this.state.sidebarValue}
            onChange={this.handleSidebarChange.bind(this)}
            indicatorColor="inherit"
          >
            <Tab value={30} label={<div><PublicIcon style={{verticalAlign: 'middle'}} /> World</div>} aria-label="dashboard" />
            <Tab value={31} label={<div><ExploreIcon style={{verticalAlign: 'middle'}} /> Exploration</div>} aria-label="users" />
            <Tab value={32} label={<div><StorefrontIcon style={{verticalAlign: 'middle'}} /> Store</div>} aria-label="users" />
          </Tabs>
        </Grid>
      </Grid>

      <div className="d-flex align-items-center w-100 p-2" style={{borderTop:"1px solid #525b65"}}>
        <div><Avatar className={classes.smallAvatar} /></div>
        <div className="ml-3 d-flex flex-column">
          <span className="text-white">Creator</span> 
          <div className="d-flex align-items-center" style={{fontSize:"12px"}}>
            <div className="mr-2 rounded bg-success" style={{width:"8px",height:"8px"}}></div>
            <span style={{color:"#c3c3c3"}}>online</span></div>
        </div>
      </div>
      
    </div>)
  }

  render(){
    const { classes } = this.props;
    return(
      <div>
       
          <Grid container style={{height:"100vh"}}>
            <Grid item xs="12" sm="2" className="p-0">
              <Hidden className="h-100" xsDown implementation="css">
                {this.renderSideBar()}
              </Hidden>
              <Hidden smUp implementation="css">
                <Drawer
                  className={classes.drawer}
                  variant="temporary"
                  open={this.state.mobileOpen}
                  onClose={this.handleDrawerToggle.bind(this)}
                  ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                  }}
                >
                   {this.renderSideBar()}
                </Drawer>
              </Hidden>
              
            </Grid>
            <Grid style={{maxHeight:"100vh",overflowY:"auto"}} item xs="12" sm="10">
               <AppBar position="sticky" className="border-bottom" style={{backgroundColor:"#fff",boxShadow:"none"}}>
                <Toolbar>
                  <IconButton
                    color="default"
                    aria-label="open drawer"
                    edge="start"
                    onClick={this.handleDrawerToggle.bind(this)}
                    className={classes.menuButton}
                  >
                    <MenuIcon />
                  </IconButton>
                  <Typography variant="h6" color="textPrimary" style={{flexGrow:"1"}}>
                    {this.state.page}
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

              <TabPanel value={this.state.sidebarValue} index={20}>
                {this.renderCreatorDashboard()}
              </TabPanel>
              <TabPanel value={this.state.sidebarValue} index={21}>
                <UsersTab isShow={false} />
              </TabPanel>
              <TabPanel value={this.state.sidebarValue} index={22}>
                <WebmonsTab isShow={false} />
              </TabPanel>
              <TabPanel value={this.state.sidebarValue} index={23}>
                SKILLS
              </TabPanel>

              <TabPanel value={this.state.sidebarValue} index={30}>
                World
              </TabPanel>

              <TabPanel value={this.state.sidebarValue} index={31}>
                Exploration
              </TabPanel>

              <TabPanel value={this.state.sidebarValue} index={32}>
                Store
              </TabPanel>

              
            </Grid>
          </Grid>

      </div>
  
    )
  }
}

export default withStyles(styles)(Home);