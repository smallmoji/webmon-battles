import React from "react";
import $ from 'jquery';
import {Button, Paper, Tabs, Tab, AppBar, Toolbar, Typography, IconButton, Grid, Avatar, Badge, CardHeader, Card, CardContent, CardActions, Hidden, Drawer, Menu, MenuItem  } from '@material-ui/core';
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
import {ReactComponent as AttackIcon} from '../../misc/icons/attack_dmg.svg';
import {ReactComponent as HealthIcon} from '../../misc/icons/health_icon.svg';
import {ReactComponent as PhysicalDefIcon} from '../../misc/icons/physical_def_icon.svg';
import {ReactComponent as MagicDefIcon} from '../../misc/icons/magic_def_icon.svg';
import {ReactComponent as DiamondBadge} from '../../misc/icons/badge_icons/diamond_badge.svg';
import {ReactComponent as AchievementsIcon} from '../../misc/icons/achievements_icon.svg';
import { Link } from 'react-router-dom';
import { colorRating } from  '../../js/common';
import '../../css/common.css';
import '../../css/override-ej2.css';
import '../../css/home/home.css';
import avatar from '../../misc/images/angery.jpg';

const styles = theme => ({
  noButtonOutline: {
  '& button:focus': {
    outline:'none'
    }
  },
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
  },
  profileAvatar: {
    '& *': {
      position:"absolute",
      top:"0"
    },
    width: "100%",
    paddingTop: "100%",
    position: "relative",
  }
});

class Home extends React.Component{
  constructor(props){
    super(props);
    const prop = this.props.location.state;
    document.title = "Home";
    this.state = {
      role: prop.role,
      id: prop.id,
      userName:"",
      value: 0,
      sidebarValue: 20,
      skillsCount: 0,
      usersCount: 0,
      webmonsCount: 0,
      page:"Dashboard",
      mobileOpen: false,
      profileMenuEl: null,
      userWebmons: []
    }
  }

  componentDidMount(){
    this.getEntitiesCount();
    this.getCurrentUser();
    this.getUserWebmons(this.state.id);
  }

  getUserWebmons(id){
    let that = this;
    $.ajax({
      url:"getScaledUserWebmons",
      data:{
        userId: id
      },
      type: "GET",
      success: function(response){
        if(response.result === "sucess"){
          that.setState({userWebmons: response.scaledUserWebmons})
        }
      },
      error: function(error){
        console.log(error);
      }

    });
  }

  getCurrentUser(){
    let that = this;
    $.ajax({
      url:"getUser",
      data: {
        userId: that.state.id
      },
      type:"GET",
      success:function(response){
        if(response.result === "success"){
          that.setState({userName: response.user.name})
        }
      }
    })
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

  renderSidebar(){
    const { classes } = this.props;
    if(this.state.role === "creator"){
      return(
      <div className="profile-bar">
        <Grid item>
          <Grid item xs={12}>
            <div className="d-flex align-items-center mb-3 pl-3 pt-3">
              <WebmonLogo className="small-icon mr-1"/> <span className="logo-word">Webmons</span> 
            </div>
          </Grid>
          
          <Grid item xs={12} className="pl-3 mb-2 text-secondary">Main</Grid>

          <Grid item xs={12}>
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

          <Grid item xs={12} className="pl-3 my-2 text-secondary">Misc</Grid>

          <Grid item xs={12}>
            <Tabs
              orientation="vertical"
              className={classes.sidebarTab}
              value={this.state.sidebarValue < 29 ? false : this.state.sidebarValue }
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
            <span className="text-white">{this.state.userName}</span> 
            <div className="d-flex align-items-center" style={{fontSize:"12px"}}>
              <div className="mr-2 rounded bg-success" style={{width:"8px",height:"8px"}}></div>
              <span style={{color:"#c3c3c3"}}>online</span></div>
          </div>
        </div>
        
      </div>)    
    }else{
      return(
      <div className="profile-bar">
        <Grid container>
          <Grid item xs={12}>
            <div className="d-flex align-items-center mb-3 pl-3 pt-3">
              <WebmonLogo className="small-icon mr-1"/> <span className="logo-word">Webmons</span> 
            </div>
          </Grid>

          <Grid item xs={12} className="pl-3 mb-2 text-secondary">Main</Grid>

          <Grid item xs={12}>
            <Tabs
              orientation="vertical"
              className={classes.sidebarTab}
              value={this.state.sidebarValue}
              onChange={this.handleSidebarChange.bind(this)}
              indicatorColor="inherit"
            >
              <Tab value={20} label={<div><DashboardIcon style={{verticalAlign: 'middle'}} /> Dashboard</div>} aria-label="dashboard" />
              <Tab value={21} label={<div><AdbIcon style={{verticalAlign: 'middle'}} /> Webmons</div>} aria-label="webmon" />
            </Tabs>
          </Grid>

          <Grid item xs={12} className="pl-3 my-2 text-secondary">Misc</Grid>

          <Grid item xs={12}>
            <Tabs
              orientation="vertical"
              className={classes.sidebarTab}
              value={this.state.sidebarValue < 29 ? false : this.state.sidebarValue }
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
            <span className="text-white">{this.state.userName}</span> 
            <div className="d-flex align-items-center" style={{fontSize:"12px"}}>
              <div className="mr-2 rounded bg-success" style={{width:"8px",height:"8px"}}></div>
              <span style={{color:"#c3c3c3"}}>online</span></div>
          </div>
        </div>
        
      </div>)  
    }
  }

  renderUserPanels(){
    const { classes } = this.props;
    const array = this.state.userWebmons;
    const arrayCount = array.length;

    return(
      <React.Fragment>
        <TabPanel value={this.state.sidebarValue} index={20}>
          <Grid container spacing={2}>
            <Grid item sm="3">
              <Paper className="p-3 text-center">
                <Avatar src={avatar} className={classes.profileAvatar}></Avatar>

                <Typography className="d-flex justify-content-center align-items-center mt-2" variant="h5" color="initial">{this.state.userName} <DiamondBadge className="small-icon ml-2" /></Typography>

                <Typography variant="subtitle1" color="initial">level 25</Typography>

                <Typography variant="subtitle1" color="initial">Achievements</Typography>

                <Paper elevation={3} className="p-1 d-flex bg-primary text-white align-items-center"><AchievementsIcon className="small-icon mr-2" /> <Typography variant="subtitle1" color="initial">1 vs 1000</Typography></Paper>

                <Paper elevation={3} className="mt-1 p-1 d-flex bg-primary text-white align-items-center"><AchievementsIcon className="small-icon mr-2" /> <Typography variant="subtitle1" color="initial">Dragon Slayer</Typography></Paper>

                <Paper elevation={3} className="mt-1 p-1 d-flex bg-success text-white align-items-center"><AchievementsIcon className="small-icon mr-2" /> <Typography variant="subtitle1" color="initial">First foot on the moon</Typography></Paper>    
              </Paper>
            </Grid>

            <Grid item sm="9">
               {/* <Paper className="p-3"> */}
                <Typography variant="h5" color="initial">My Webmons</Typography>
                {arrayCount > 0 ? <Grid container spacing={1}>
                  {this.state.userWebmons.map((webmon) => {
                    return <Grid key={webmon.key} item>
                        <Card style={{width:"250px",fontSize:"small"}}>
                          <CardContent>
                            <Grid container spacing={1}>
                              <Grid xs="12" item>
                                <span className="mr-2" style={{fontSize:"x-large"}}>{webmon.name}</span> 
                                <span className="font-italic">Lv.{webmon.level}</span>
                              </Grid>
                              <Grid xs="12" item>
                                <span className="font-italic">{webmon.webmon}</span>  
                              </Grid>
                              <Grid xs="12" item>
                                <span style={{color:colorRating(webmon.rating)}}>
                                  {webmon.rating}
                                </span>
                              </Grid>
                              <Grid xs="12" sm="6" item>
                                {webmon.type} Species
                              </Grid>
                              <Grid xs="12" sm="6" item>
                                {webmon.attribute} Attribute
                              </Grid>
                              <Grid xs="12" sm="6" item>
                                <AttackIcon className="small-icon"/>&nbsp; {webmon.attack}
                              </Grid>
                              <Grid xs="12" sm="6" item>
                                <HealthIcon className="small-icon"/>&nbsp; {webmon.health}
                              </Grid>
                              <Grid xs="12" sm="6" item>
                                <PhysicalDefIcon className="small-icon"/>&nbsp; {webmon.physicalDefense}
                              </Grid>
                              <Grid xs="12" sm="6" item>
                                <MagicDefIcon className="small-icon"/>&nbsp; {webmon.magicDefense}
                              </Grid>
                            </Grid>
                          </CardContent>
                        </Card>
                      </Grid> 
                  })}
                </Grid> : <div>This User doesn't own any webmons.</div>}
              {/* </Paper> */}
            </Grid>
          </Grid>
        </TabPanel>

        <TabPanel value={this.state.sidebarValue} index={21}>
         
        </TabPanel>
      </React.Fragment>
    )
  }
  renderCreatorPanels(){
    const { classes } = this.props;

    return(
      <React.Fragment>
        <TabPanel value={this.state.sidebarValue} index={20}>
          <Grid container spacing={2} className="p-2">
            <Grid item xs={12} sm="4">
              <Card>
                <CardHeader avatar={<Avatar aria-label="" style={{backgroundColor:"#86A59C"}}></Avatar>}
                title={<div><span style={{fontSize:"1.2rem"}}>{this.state.usersCount}</span> Users</div>}/>
              </Card>
            </Grid>
            <Grid item xs={12} sm="4">
              <Card>
                <CardHeader avatar={<Avatar style={{backgroundColor:"#89CE94"}}><AdbIcon/></Avatar>}
                title={<div><span style={{fontSize:"1.2rem"}}>{this.state.webmonsCount}</span> Webmons</div>}/>
              </Card>
            </Grid>
            <Grid item xs={12} sm="4">
              <Card>
                <CardHeader avatar={<Avatar style={{backgroundColor:"#DABFFF"}}><MenuBookIcon/></Avatar>}
                title={<div><span style={{fontSize:"1.2rem"}}>{this.state.skillsCount}</span> Skills</div>}/>
              </Card>
            </Grid>
            
            <Grid item xs={12}>
              <Paper square className="p-2">
                <Tabs
                  className={classes.tabStyle}
                  value={this.state.value}
                  onChange={this.handleChange.bind(this)}
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
        </TabPanel>
        <TabPanel value={this.state.sidebarValue} index={21}>
          <Paper className="p-3">
            <UsersTab isShow={false} />
          </Paper>
        </TabPanel>
        <TabPanel value={this.state.sidebarValue} index={22}>
          <Paper>
            <WebmonsTab isShow={false} />
          </Paper>
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
      </React.Fragment>
    );
  }

  



  render(){
    const { classes } = this.props;
    return(
      <div>
          <Grid container style={{height:"100vh"}}>
            <Grid item xs={12} sm={2} className="p-0">
              <Hidden className="h-100" xsDown implementation="css">
                {this.renderSidebar()}
              </Hidden>
              <Hidden smUp implementation="css">
                <Drawer
                  className={classes.drawer}
                  variant="temporary"
                  open={this.state.mobileOpen}
                  onClose={this.handleDrawerToggle.bind(this)}
                  ModalProps={{
                    keepMounted: true
                  }}
                >
                   {this.renderSidebar()}
                </Drawer>
              </Hidden>
              
            </Grid>
            <Grid className={classes.noButtonOutline} style={{maxHeight:"100vh",overflowY:"auto"}} item xs={12} sm="10">
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
                  <IconButton color="default" onClick={(e)=>{this.setState({profileMenuEl: e.target})}}>
                    <AccountCircle />
                  </IconButton>
                </Toolbar>
              </AppBar>

              <Menu
                anchorEl={this.state.profileMenuEl}
                keepMounted
                open={Boolean(this.state.profileMenuEl)}
                onClose={()=>{this.setState({profileMenuEl:null})}}
              >
                <MenuItem><Link to="/login">Logout</Link></MenuItem>
              </Menu>

              {this.state.role === "creator" ? this.renderCreatorPanels() : this.renderUserPanels()}

              
            </Grid>
          </Grid>

      </div>
  
    )
  }
}

export default withStyles(styles)(Home);