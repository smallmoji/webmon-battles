import React from 'react';
import $ from 'jquery';
import { withStyles } from '@material-ui/core/styles';
import { ColumnDirective, ColumnsDirective, GridComponent, Inject, Page } from '@syncfusion/ej2-react-grids';
import { 
  Button, 
  Grid, LinearProgress,
  Dialog, DialogActions, DialogContent, DialogContentText,DialogTitle, Snackbar, IconButton
} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import "../../../css/common.css";
import "../../../css/override-ej2.css";

const styles = theme => ({

});
class UsersTabs extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      users:[],
      userWebmons:[],
      openDialog: false,
      isCreateDialog: true,
      formErrorMessage: "",
      dialogProgress: false,
      snackBarSuccess:false,
      snackBarMessage:"",
      inputFields:{
        userId: "",
        name: "",
        email: "",
      },
      inputError:{
        uName: false,
        uEmail: false,
        
      }
    }

    this.grid = null;
    this.template = this.gridTemplate.bind(this);
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
  componentDidMount(){
   this.getUsers();
  }
  
  handleCloseDialog(){
    this.setState({openDialog:false, formErrorMessage:""})
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
        error: function(error){

        }
      })
    }
  }

  


  gridTemplate(props) {
  const { classes } = this.props;
  return (
    <Grid container className={classes.templateGrid}>
      <Grid item sm="1" className="d-none d-sm-block">{props.id}</Grid>
      <Grid item xs="7" sm="5">{props.name}</Grid>
      <Grid item sm="4" className="d-none d-sm-block">{props.email}</Grid>
      <Grid item xs="5" sm="2">
        <div>
          <IconButton size="small" color="primary" 
            // onClick={()=>{this.handleOpenEditDialog(props)}} 
          >
            <EditIcon />
          </IconButton>
          <IconButton 
          // onClick={()=>{this.handleOpenDeleteDialog(props)}} 
          size="small" color="secondary">
            <DeleteIcon />
          </IconButton>
        </div>
      </Grid>
    </Grid>
    );
  }

  render(){
    const { classes } = this.props;
    return(
      <div>
        <div>
          <div className=" text-right mb-2">
            <Button size="small" variant="contained" color="primary" onClick={()=>{this.setState({openDialog:true})}}>
              Add User <AddIcon fontSize="small"/>
            </Button>
          </div>

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
          <Snackbar
            open={this.state.snackBarSuccess}
            autoHideDuration={4000}
            onClose={()=>{this.setState({snackBarSuccess:false})}}
          >
            <MuiAlert elevation={6} variant="filled" onClose={()=>{this.setState({snackBarSuccess:false})}} severity="success">
              {this.state.snackBarMessage} 
            </MuiAlert>

          </Snackbar>
          <div className="grid-group">
            <div className="grid-header e-grid">
                <Grid container>
                  <Grid item sm="1" className="d-none d-sm-block">ID</Grid>
                  <Grid item xs="7" sm="5">Name</Grid>
                  <Grid item sm="4" className="d-none d-sm-block">Email</Grid>
                  <Grid item xs="5" sm="2">Action</Grid>
                </Grid>
              </div>
            <GridComponent 
              id="noHeaderGrid"
              ref={g => (this.grid = g)}
              dataSource={this.state.users}
              allowPaging={true}
              pageSettings={{pageSize: 10}}
              >
              <ColumnsDirective>
                <ColumnDirective template={this.template} />
              </ColumnsDirective>
              <Inject services={[Page]} />
            </GridComponent>
          </div>
          
        </div>
      </div>
      
    )
  }

}

export default withStyles(styles)(UsersTabs);