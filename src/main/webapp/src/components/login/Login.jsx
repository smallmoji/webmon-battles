import React from 'react';
import '../../css/login/login.css';
import '../../css/common.css';
import { Paper, LinearProgress, Grid, Typography} from '@material-ui/core'
import PersonIcon from '@material-ui/icons/Person';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import LockIcon from '@material-ui/icons/Lock';
import { Link } from 'react-router-dom';
import $ from 'jquery';
import { Redirect } from "react-router-dom";
import dragon from '../../misc/images/dragon.png';

export default class Login extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      isUser: true,
      errorMessage: "",
      redirect: "",
      progressBar: "",
      homeState:{}

    }
  }

  handleChangeLoginRole(){
    if(this.state.isUser){
      this.setState({isUser:false});
    }else{
      this.setState({isUser:true});
    }
    this.resetInput();
  }
  resetInput(){
    this.myFormRef.reset();
    this.setState({errorMessage: ""});
  }

  handleLogin(e){
    e.preventDefault();
    const self = this;
    let formData = new FormData(e.target);
    let url = "signin";

    if(!this.state.isUser){
      url = "checkCreator";
    }

    this.setState({progressBar:true})
    $.ajax({
      url: url,
      data: formData,
      processData: false,
      contentType: false,
      type: "POST",
      success: function(response){
        console.log("response" + response.role);
        if(response.result === "success"){
          if(response.role === "user"){
            self.setState({redirect: "/home", homeState:{
              role: "user",
              id : response.user.id
            }}) 
          }else{
            self.setState({redirect: "/home", homeState:{
              role: "creator",
              id: 3
            }})  
          }
          
        }else{
          self.setState({errorMessage: response.error});
        }

        self.setState({progressBar:false})
      },
      error: function(){
        self.setState({progressBar:false})
        self.setState({errorMessage: "Server cannot be reach."});
      }
    })

    console.log(this.state.redirect);
  }

  render(){
    if (this.state.redirect) {
      return <Redirect to={{
        pathname: this.state.redirect,
        state: this.state.homeState
      }} />
    }
    
    return(
      <div className="login-main">
        <div className="login-box-wrapper flex-center">
          <div className="login-box">
            {/* <WebmonBattles  style={{height:"100px",width:"100%"}}/> */}
            <div className="flex-center mt-2">
            <button className="round-button" onClick={(this.handleChangeLoginRole.bind(this))}> {this.state.isUser ? <PersonIcon /> : <SupervisorAccountIcon /> }</button>
              {/* <button className="orange-button" onClick={(this.selectUser.bind(this))}>User</button> */}
            </div>
            <div className="login-welcome mt-3">Welcome {this.state.isUser ? "Trainer" : "Creator"}</div>
            <div className="user-select-wrapper mt-3" >
            
              <form onSubmit={this.handleLogin.bind(this)} id="form" className="user-select" ref={(el) => this.myFormRef = el}>

                <div className="alert alert-danger" style={{display: this.state.errorMessage ? "block" : "none"}}>{this.state.errorMessage}</div>

                {this.state.isUser ? 
                  <div className="text-center">
                    <div className="custom-input-group">
                      <PersonIcon />
                      <input type="text" className="custom-input ml-1" placeholder="Username" name="username" />
                    </div>

                    <div className="custom-input-group mt-2">
                      <LockIcon />
                      <input type="password" className="custom-input ml-1" placeholder="Password" name="password" />
                    </div>
   
                    <button type="submit" className="custom-button mt-2">Login</button>
                  </div> : 
                  <div className="text-center">
                    <div className="custom-input-group mt-2">
                      <LockIcon />
                      <input type="password" className="custom-input ml-1" placeholder="Creator Pass" name="creatorCode" />
                    </div>
                    <button type="submit" className="custom-button mt-2">Login</button>
                  </div>}

                  <div className="text-center mt-2 text-white">
                    <Link to="/signup">Create Account</Link>
                  </div>

              </form>
              <LinearProgress className="mt-3" className="mt-3" style={{display: this.state.progressBar ? "block":"none"}} />
            </div>
          </div>
        </div>
 
      </div>
    )
  }
}
