import React from 'react';
import '../../css/login/login.css';
import '../../css/common.css';
import { Paper, LinearProgress} from '@material-ui/core'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import {ReactComponent as WebmonBattles } from '../../misc/images/webmon-battles.svg';
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

  selectUser(){
    if(!this.state.isUser){
      this.setState({isUser:true});
      this.resetInput();
    }
  }
  selectCreator(){
    if(this.state.isUser){
      this.setState({isUser:false});
      this.resetInput();
    }
  }
  resetInput(){
    this.myFormRef.reset();
    this.setState({errorMessage: ""});
  }

  handleLogin(e){
    e.preventDefault();
    const self = this;
    let formData = new FormData(e.target);
    let url = "checkUsername";

    if(this.state.isUser){
      url = "checkUsername";
    }else{
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
        <div className="container flex-center h-100 position-relative">
          <img className="login-dragon" src={dragon} />
          <Paper style={{zIndex:"1"}}>
            <div className="login-box">
              <WebmonBattles  style={{height:"100px",width:"100%"}}/>
              <div className="text-center mt-2">
                <button className="orange-button mr-2" onClick={(this.selectCreator.bind(this))}>Creator</button>
                <button className="orange-button" onClick={(this.selectUser.bind(this))}>User</button>
              </div>

              <div className="user-select-wrapper mt-3 px-5" >
               
                <form onSubmit={this.handleLogin.bind(this)} id="form" className="user-select" ref={(el) => this.myFormRef = el}>

                  <div className="alert alert-danger" style={{display: this.state.errorMessage ? "block" : "none"}}>{this.state.errorMessage}</div>

                  {this.state.isUser ? 
                    <div className="text-center">
                      <input type="text" className="form-control" placeholder="Username" name="username" />

                      <input type="password" className="form-control mt-2" placeholder="Password" name="password" />
                      <button type="submit" className="btn btn-primary mt-2">Login</button>
                    </div> : 
                    <div className="input-group">
                      <input type="password" className="form-control" placeholder="Creator Pass" name="creatorCode" />

                      
                      <div className="input-group-append">
                        <button className="btn btn-primary" type="submit" ><ArrowForwardIcon/></button>
                      </div>
                    </div>}

                </form>
                <LinearProgress className="mt-3" className="mt-3" style={{display: this.state.progressBar ? "block":"none"}} />
              </div>
            </div>
          </Paper>
        </div>
      </div>
    )
  }
}
