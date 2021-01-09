import React from 'react';
import $ from 'jquery';
import { withStyles } from '@material-ui/core/styles';
import { ColumnDirective, ColumnsDirective, GridComponent, Inject, Page } from '@syncfusion/ej2-react-grids';
import { 
  Button, 
  Grid, LinearProgress, Card , CardContent, CardActions,
  Dialog, DialogActions, DialogContent, DialogContentText,DialogTitle, Snackbar, IconButton, Tooltip
} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import ViewListIcon from '@material-ui/icons/ViewList';
import {ReactComponent as AttackIcon} from '../../../misc/icons/attack_dmg.svg';
import {ReactComponent as HealthIcon} from '../../../misc/icons/health_icon.svg';
import {ReactComponent as PhysicalDefIcon} from '../../../misc/icons/physical_def_icon.svg';
import {ReactComponent as MagicDefIcon} from '../../../misc/icons/magic_def_icon.svg';
import "../../../css/common.css";
import "../../../css/override-ej2.css";
import { colorRating } from  '../../../js/common';

const styles = theme => ({
  noButtonOutline: {
    '& button:focus': {
      outline:'none'
    }
  }
});
class UsersTabs extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      readOnly: this.props.isShow,  
      users:[],
      webmons:[],
      userWebmons:[],
      openDialog: false,
      openWebmonsDialog: false,
      openDeleteDialog: false,
      isCreateDialog: true,
      isAddUserWebmon:true,
      formErrorMessage: "",
      uMonErormErrorMessage:"",
      dialogProgress: false,
      dialogProgressDelete: false,
      snackBarSuccess:false,
      snackBarMessage:"",
      userToDelete: "",
      webmonsUser: null,
      openAddEditWebmon: false,
      inputFields:{
        userId: "",
        name: "",
        email: "",
        umWebmon: "",
        umName: "",
        umId:"",
        umLevel:""
      },
      inputError:{
        uName: false,
        uEmail: false,
        umWebmon: false,
        umName: ""
        
      }
    }

    this.grid = null;
    this.template = this.gridTemplate.bind(this);
  }

  componentDidMount(){
    this.getUsers();
    this.getWebmons();
  }

  getUsers(){
    let that = this;
    $.ajax({
      url:"getUsers",
      type: "GET",
      success: function(response){
        if(response.result === "success"){
          that.setState({users: response.users})
        }
      },
      error: function(error){
        console.log(error);
      }

    });
  }

  getWebmons(){
    let that = this;
    $.ajax({
      url:"getWebmons",
      type: "GET",
      success: function(response){
        if(response.result === "success"){
          that.setState({webmons: response.webmons})
        }
      },
      error: function(error){
        console.log(error);
      }

    });
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
  
  handleCloseDialog(){
    this.setState({openDialog:false, formErrorMessage:"",isCreateDialog:true,
    inputError:{
      uName: false,
      uEmail: false },
    inputFields:{
      userId: "",
      name: "",
      email: "",}})
    this.userFormRef.reset();
  }

  handleAddUpdateUser(){
    const that = this;
    let formData = new FormData(document.getElementById("userForm"));
    let isError = false;
    let errorFields = {};
    let errorState = {};
    let url = "";
    for(let pair of formData.entries()){
      if(!pair[1]){
        errorFields[`u${pair[0].charAt(0).toUpperCase() + pair[0].slice(1)}`] = true;
        isError = true;
      }else{
        errorFields[`u${pair[0].charAt(0).toUpperCase() + pair[0].slice(1)}`] = false;
      }
    }

    errorState['inputError'] = errorFields;
    if(isError){
      this.setState(errorState)
      this.setState({formErrorMessage: ""});
    }else{

      if(this.state.isCreateDialog){
        url = "createUser";
      }else{
        url = "updateUser"
        formData.append("userId",this.state.inputFields.userId)
      }
      this.setState({dialogProgress:true})
       $.ajax({
        url: url,
        data: formData,
        type: 'POST',
        processData: false,
        contentType:false,
        success: function(response){
          if(response.result === "success"){
            that.getUsers();
            that.setState({snackBarSuccess:true, dialogProgress:false})

            if(that.state.isCreateDialog){
              that.setState({snackBarMessage:"User successfully created!"})
            }else{
              that.setState({snackBarMessage:"User successfully updated!"})
            }

            that.grid.refresh();
            that.handleCloseDialog();
          }else{
            that.setState({dialogProgress:false})
            let error = response.error;
            if(error.includes("Validation failed for classes [com.wb.web.model.User]")){
              that.setState({formErrorMessage: "Invalid Email Address"});    
            }else{
              that.setState({formErrorMessage: response.error});
            }
            
          }
        },
        error: function(xhr){
          const errorMessage = xhr.responseJSON.status + " " + xhr.responseJSON.error;
          that.setState({formErrorMessage: errorMessage, dialogProgress:false});
        }
      })
    }
  }

  handleAddEditUserWebmon(){
    const that = this;
    let formData = new FormData(document.getElementById("userWebmonForm"));
    let isError = false;
    let errorFields = {};
    let errorState = {};
    let url = "";

     for(let pair of formData.entries()){
      if(!pair[1]){
        errorFields[`um${pair[0].charAt(0).toUpperCase() + pair[0].slice(1)}`] = true;
        isError = true;
      }else{
        errorFields[`um${pair[0].charAt(0).toUpperCase() + pair[0].slice(1)}`] = false;
      }
    }

    errorState['inputError'] = errorFields;
    if(isError){
      this.setState(errorState)
      this.setState({uMonErormErrorMessage: ""});
    }else{


      if(this.state.isAddUserWebmon){
        url = "createUserWebmon";
        formData.append("userId",this.state.webmonsUser); 
      }else{
        url = "updateUserWebmon"
        formData.append("userWebmonId",this.state.inputFields.umId);
      }

      this.setState({dialogProgress:true})
       $.ajax({
        url: url,
        data: formData,
        type: 'POST',
        processData: false,
        contentType:false,
        success: function(response){
          if(response.result === "success"){
            ;
            that.setState({snackBarSuccess:true, dialogProgress:false})
            that.getUserWebmons(that.state.webmonsUser)
            if(that.state.isAddUserWebmon){
              that.setState({snackBarMessage:"Webmon successfully added!"});
            }else{
              that.setState({snackBarMessage:"Webmon successfully updated!"})
            }

            that.grid.refresh();
            that.handleCloseAddEditUserWebmon();
          }else{
            that.setState({dialogProgress:false})
            let error = response.error;
            
          }
        },
        error: function(xhr){
          const errorMessage = xhr.responseJSON.status + " " + xhr.responseJSON.error;
          that.setState({formErrorMessage: errorMessage, dialogProgress:false});
        }
      })
    }


  }

  handleOpenAddUmon(){
    this.setState({openAddEditWebmon:true, isAddUserWebmon:true})
  }

  handleOpenEditUmon(){
    this.setState({openAddEditWebmon:true, isAddUserWebmon:false})
  }

  handleCloseAddEditUserWebmon(){
    this.setState({openAddEditWebmon:false, inputFields:{
        userId: "",
        name: "",
        email: "",
        umWebmon: "",
        umName: "",
        umId:"",
        umLevel:""
      },
      inputError:{
        uName: false,
        uEmail: false,
        umWebmon: false,
        umName: ""
        
      }})
  }

  handleDeleteUser(){
    const that = this;
    $.ajax({
      url: "deleteUser",
      data: {
        userId: this.state.userToDelete
      },
      type: 'DELETE',
      success: function(response){
        if(response.result === "success"){
          that.getUsers();
          that.grid.refresh();
          that.handleCloseDeleteDialog();
          that.setState({snackBarSuccess: true, snackBarMessage:"User successfully deleted!"})
        }
      },
      error: function(xhr){
          const errorMessage = xhr.responseJSON.status + " " + xhr.responseJSON.error;
          that.setState({formErrorMessage: errorMessage, dialogProgress:false});
      }
    })
  }

  handleOpenEditDialog(props){
    let state = {};
    let inputField = {};
    inputField['userId'] = props.id;
    inputField['name'] = props.name;
    inputField['email'] = props.email;
    state['inputFields'] = inputField;
    state['isCreateDialog'] = false;
    state['openDialog'] = true;
    this.setState(state);
    
  }

  handleOpenWebmonsDialog(props){
    this.setState({webmonsUser: props.id, openWebmonsDialog:true});
    this.getUserWebmons(props.id);
    
  }
  
  handleOpenDeleteDialog(props){
    this.setState({openDeleteDialog:true, userToDelete: props.id})
  }

  handleCloseDeleteDialog(){
    this.setState({formErrorMessage:"",openDeleteDialog:false, userToDelete:0, dialogProgressDelete:false})
  }

  handleCloseWebmonsDialog(){
    this.setState({openWebmonsDialog:false, webmonsUser: null, userWebmons:[]});
    this.handleCloseAddEditUserWebmon();
  }
  
  handleDeleteUserWebmon(id){
    const that = this;
    $.ajax({
      url: "deleteUserWebmon",
      data: {userId: this.state.webmonsUser, userWebmonId: id},
      type: "DELETE",
      success: function(response){
        if(response.result === "success"){
          that.getUserWebmons(that.state.webmonsUser);
          that.setState({snackBarSuccess:true, snackBarMessage:"Webmon successfully deleted!"});
        }
      },
      error: function(xhr){

      }

    })
  }

  handleEditUserWebmon(webmon){
    let state = {};
    let inputField = {};
    inputField['umWebmon'] = webmon.webmonId;
    inputField['umName'] = webmon.name;
    inputField['umLevel'] = webmon.level;
    inputField['umId'] = webmon.id;
    state['inputFields'] = inputField;
    state['isAddUserWebmon'] = false;
    this.setState(state);

    this.handleOpenEditUmon();

    
  }

  gridTemplate(props) {
  const { classes } = this.props;
  return (
    <Grid container className={classes.templateGrid}>
      <Grid item sm="1" className="d-none d-sm-block">{props.id}</Grid>
      <Grid item xs="7" sm={this.state.readOnly ? "4" : "3"}>{props.name}</Grid>
      <Grid item sm={this.state.readOnly ? "4" : "3"} className="d-none d-sm-block">{props.email}</Grid>
      <Grid item xs="2" sm="2" >
        <Tooltip title="Show owned webmons" arrow>
            <IconButton size="small" color="primary"
              onClick={()=>{this.handleOpenWebmonsDialog(props)}}>
              <ViewListIcon />
            </IconButton>
          </Tooltip>
      </Grid>
    {!this.state.readOnly ?
      <Grid item xs="3" sm="2">
        <div>
          <Tooltip title="Edit" arrow>
            <IconButton size="small" color="primary" 
              onClick={()=>{this.handleOpenEditDialog(props)}}>
              <EditIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Delete" arrow>
            <IconButton size="small" color="secondary"
              onClick={()=>{this.handleOpenDeleteDialog(props)}}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </div>
      </Grid> : null }
    </Grid>
    );
  }

  render(){
    const { classes } = this.props;
    const array = this.state.userWebmons;
    const arrayCount = array.length;
    return(
      <div className={classes.root}>
        <div>
          {!this.state.readOnly ? 
          <div className=" text-right mb-2">
            <Button size="small" variant="contained" color="primary" onClick={()=>{this.setState({openDialog:true})}}>
              Add User <AddIcon fontSize="small"/>
            </Button>
          </div> : null}

          <Dialog maxWidth="sm" open={this.state.openDialog} onClose={this.handleCloseDialog.bind(this)}>
            <DialogTitle>{this.state.isCreateDialog ? "Create New User" : "Edit User"}</DialogTitle>
            <DialogContent>
              <form id="userForm" ref={(el) => this.userFormRef = el}>
                <Grid container spacing={2}>

                  <Grid item xs={12} style={{display: this.state.formErrorMessage ? "block" : "none"}}>
                    <div className="alert alert-danger">{this.state.formErrorMessage}</div>
                  </Grid>

                  <Grid item xs="12" sm="6">
                    <div className="form-group mb-0">
                      <label for="uName">Name</label>
                      <input  type="uName" className={"form-control " + (this.state.inputError.uName ? "is-invalid" : "")} id="uName" placeholder="Name" name="name" defaultValue={this.state.inputFields.name} />
                      <div style={{display: this.state.inputError.uName ? "block" : "none"}} class="invalid-feedback">
                        Please provide a valid name.
                      </div>
                    </div>
                  </Grid>

                  <Grid item xs="12" sm="6">
                    <div className="form-group mb-0">
                      <label for="uEmail">Email</label>
                      <input  type="uEmail" className={"form-control " + (this.state.inputError.uEmail ? "is-invalid" : "")} id="uEmail" placeholder="email@example.com" name="email" defaultValue={this.state.inputFields.email} />
                      <div style={{display: this.state.inputError.uEmail ? "block" : "none"}} class="invalid-feedback">
                        Please provide an email.
                      </div>
                    </div>
                  </Grid>
                </Grid>
              </form>

              <LinearProgress className="mt-3" style={{display: this.state.dialogProgress ? "block":"none"}} />
            </DialogContent>
            <DialogActions>
              <Button size="small" variant="contained" onClick={this.handleAddUpdateUser.bind(this)} color="primary">
                {this.state.isCreateDialog ? "Create" : "Update"}
              </Button>
              <Button variant="contained" size="small" onClick={this.handleCloseDialog.bind(this)} color="default">
                Cancel
              </Button>
            </DialogActions>
          </Dialog>

          <div className="grid-group">
            <div className="grid-header e-grid">
                <Grid container>
                  <Grid item sm="1" className="d-none d-sm-block">ID</Grid>
                  <Grid item xs="7"sm={this.state.readOnly ? "4" : "3"}>Name</Grid>
                  <Grid item sm={this.state.readOnly ? "4" : "3"} className="d-none d-sm-block">Email</Grid>
                  <Grid item xs="2" className="d-none d-sm-block" sm="2">Webmons</Grid>
                  {!this.state.readOnly ? <Grid item xs="4" sm="2">Action</Grid> : null}
                </Grid>
              </div>
            <GridComponent 
              id="noHeaderGrid"
              ref={g => (this.grid = g)}
              dataSource={this.state.users}
              allowPaging={true}
              allowSo
              pageSettings={{pageSize: 10}}
              >
              <ColumnsDirective>
                <ColumnDirective template={this.template} />
              </ColumnsDirective>
              <Inject services={[Page]} />
            </GridComponent>
          </div>
          
        </div>

        <Dialog
          open={this.state.openDeleteDialog}
          onClose={this.handleCloseDeleteDialog.bind(this)}>
          <DialogTitle>{"Confirm Delete User"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              All owned webmons of this user will also be removed. Are you sure you want to continue?
            </DialogContentText>
          </DialogContent>

          <LinearProgress className="mt-3" style={{display: this.state.dialogProgressDelete ? "block":"none"}} />
          <DialogActions>
            <Button size="small" variant="contained" onClick={this.handleCloseDeleteDialog.bind(this)} color="default">
              Cancel
            </Button>
            <Button size="small" variant="contained" onClick={this.handleDeleteUser.bind(this)} color="primary" autoFocus>
              Confirm
            </Button>
          </DialogActions>
        </Dialog> 

        <Dialog maxWidth="sm" className={classes.noButtonOutline} open={this.state.openWebmonsDialog} onClose={this.handleCloseWebmonsDialog.bind(this)}>
          <DialogTitle>User Webmons 
             {!this.state.readOnly ? 
            <IconButton className="float-right" onClick={this.handleOpenAddUmon.bind(this)}>
              <AddCircleOutlineIcon />
            </IconButton> : null }
          </DialogTitle>
          <DialogContent >
          
          {this.state.openAddEditWebmon ? 
          <form id="userWebmonForm" ref={(el) => this.webmonFormRef = el} style={{position:"absolute",zIndex:"3", top:"14%",left:"0"}}>
            <Card>
              <CardContent>
                <Grid container spacing={1}>
                  <Grid item xs={12} style={{display: this.state.uMonErormErrorMessage ? "block" : "none"}}>
                    <div className="alert alert-danger">{this.state.uMonErormErrorMessage}</div>
                  </Grid>

                  <Grid item xs="12">
                    <div className="form-group mb-0">
                      <label for="umWebmon">Webmon</label>
                      <select disabled={!this.state.isAddUserWebmon} id="umWebmon" defaultValue={this.state.inputFields.umWebmon} name="webmonId" className={"form-control " + (this.state.inputError.umWebmon ? "is-invalid" : "")}>
                        <option>Choose...</option>
                        {this.state.webmons.map((item)=>{
                            return <option key={item.key} data-tokens={item.name} value={item.webmonId}>{item.name}</option>
                        })}
                      </select>
                      <div style={{display: this.state.inputError.umWebmon ? "block" : "none"}} class="invalid-feedback">
                      Please provide appropriate attribute.
                      </div>
                    </div>
                  </Grid>

                  <Grid item xs="12" sm="6">
                    <div className="form-group mb-0">
                      <label for="umName">Name</label>
                      <input  type="text" className={"form-control " + (this.state.inputError.umName ? "is-invalid" : "")} id="umName" placeholder="Name" name="name" defaultValue={this.state.inputFields.umName} />
                      <div style={{display: this.state.inputError.umName ? "block" : "none"}} class="invalid-feedback">
                      Please provide a name.
                      </div>
                    </div>
                  </Grid>

                  <Grid item xs="12" sm="6">
                    <div className="form-group mb-0">
                      <label for="umLevel">Level</label>
                      <input  type="number" className={"form-control " + (this.state.inputError.umLevel ? "is-invalid" : "")} id="umLevel" placeholder="Level" name="level" defaultValue={this.state.inputFields.umLevel} />
                      <div style={{display: this.state.inputError.umLevel ? "block" : "none"}} class="invalid-feedback">
                        Please provide a level.
                      </div>
                    </div>
                  </Grid>

                  <Grid item xs="12">
                    <LinearProgress className="my-3" style={{display: this.state.dialogProgress ? "block":"none"}} />
                  </Grid>

                </Grid>
              </CardContent>
              <CardActions>
                <Button className="mr-2" variant="contained" color="primary" size="small" onClick={this.handleAddEditUserWebmon.bind(this)}>
                  {this.state.isAddUserWebmon ? "Add" : "Update"}</Button>
                <Button variant="contained" color="default" size="small" onClick={this.handleCloseAddEditUserWebmon.bind(this)}>Cancel</Button>
              </CardActions>
            </Card>
            
          </form> : ""}
            

            <Grid container spacing={1}>
              {arrayCount > 0 ? <Grid container spacing={1}>
                {this.state.userWebmons.map((webmon) => {
                  return <Grid key={webmon.key} item xs="12" sm="6">
                      <Card>
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
                        {!this.state.readOnly ? 
                        <CardActions className={classes.noButtonOutline}>
                          <Button variant="text" color="default" onClick={()=>{this.handleEditUserWebmon(webmon)}}>
                            Edit
                          </Button>
                          <Button variant="text" color="secondary" onClick={()=>{this.handleDeleteUserWebmon(webmon.id)}}>
                            Delete
                          </Button>
                        </CardActions> : null }
                      </Card>
                    </Grid> 
                })}
              </Grid> : <div>This User doesn't own any webmons.</div>}
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleCloseWebmonsDialog.bind(this)} color="default">
              Close
            </Button>
          </DialogActions>
        </Dialog>

        <Snackbar
          open={this.state.snackBarSuccess}
          autoHideDuration={4000}
          onClose={()=>{this.setState({snackBarSuccess:false})}}
        >
          <MuiAlert elevation={6} variant="filled" onClose={()=>{this.setState({snackBarSuccess:false})}} severity="success">
            {this.state.snackBarMessage} 
          </MuiAlert>
        </Snackbar>
      </div>
      
    )
  }

}

export default withStyles(styles)(UsersTabs);