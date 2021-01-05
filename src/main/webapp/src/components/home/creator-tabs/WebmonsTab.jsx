import React from 'react';
import $ from 'jquery';
import { withStyles } from '@material-ui/core/styles';
import { ColumnDirective, ColumnsDirective, GridComponent, Inject, Page } from '@syncfusion/ej2-react-grids';
import { 
  Button, 
  Grid, LinearProgress, Tooltip,
  Dialog, DialogActions, DialogContent, DialogContentText,DialogTitle, Snackbar, IconButton
} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import {ReactComponent as AttackIcon} from '../../../misc/icons/attack_dmg.svg';
import {ReactComponent as HealthIcon} from '../../../misc/icons/health_icon.svg';
import {ReactComponent as PhysicalDefIcon} from '../../../misc/icons/physical_def_icon.svg';
import {ReactComponent as MagicDefIcon} from '../../../misc/icons/magic_def_icon.svg';
import '../../../css/common.css';
import '../../../css/override-ej2.css';
import { colorRating } from  '../../../js/common';

const styles = theme => ({
  root: {
    '& button:focus': {
      outline:'none'
    }
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  templateGrid: {
    '& .MuiGrid-item' : {
      display: "flex",
      alignItems: "center",
      whiteSpace: "normal!important"
    }
  }
});

class WebmonsTab extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      webmons:[],
      webmonsCount:0,
      openDialog: false,
      isCreateDialog: true,
      dialogProgress:false,
      formErrorMessage:"",
      ratingOptions:[],
      attributeOptions:[],
      webmonTypeOptions:[],
      snackBarSuccess:false,
      snackBarMessage:"",
      webmonToDelete:0,
      dialogProgressDelete:false,
      inputFields:{
        webmonId: "",
        name: "",
        type: "",
        attribute: "",
        rating: "",
        attack: "",
        health: "",
        physicalDefense: "",
        magicDefense: ""
      },
      inputError:{
        wbName: false,
        wbType:false,
        wbAttribute: false,
        wbRating: false,
        wbAttack: false,
        wbHealth: false,
        wbPhysicalDefense: false,
        wbMagicDefense: false
      }
      
    }
    this.template = this.gridTemplate.bind(this);
    this.grid = null;
  }

  getWebmons(){
    const that = this;
    $.ajax({
      url:"getWebmons",
      type: "GET",
      success: function(response){
        if(response.result === "success"){
          that.setState({webmons: response.webmons})
          that.setState({webmonsCount: response.count})
        }
      },
      error: function(error){
        console.log(error);
      }

    });
  }
  
  componentDidMount(){
    const that = this;
    this.getWebmons();

    $.ajax({
      url:"getWebmonAttributes",
      type: "GET",
      success: function(response){
        that.setState({attributeOptions: response.webmonAttributes})
      },
      error: function(error){
        console.log(error);
      }

    });

    $.ajax({
      url:"getWebmonRatings",
      type: "GET",
      success: function(response){
        that.setState({ratingOptions: response.webmonRatings})
      },
      error: function(error){
        console.log(error);
      }

    });

    $.ajax({
      url:"getWebmonTypes",
      type: "GET",
      success: function(response){
        that.setState({webmonTypeOptions: response.webmonTypes})
      },
      error: function(error){
        console.log(error);
      }

    });
  }

  handleOpenDialog(){
    this.setState({openDialog:true})
  }
  handleOpenDeleteDialog(props){
    this.setState({openDeleteDialog:true, webmonToDelete: props.webmonId})
  }

  handleOpenEditDialog(props){
    let state = {};
    let inputField = {};
    inputField['webmonId'] = props.webmonId;
    inputField['name'] = props.name;
    inputField['type'] = props.type;
    inputField['attribute'] = props.attribute;
    inputField['rating'] = props.rating;
    inputField['attack'] = props.attack;
    inputField['health'] = props.health;
    inputField['physicalDefense'] = props.physicalDefense;
    inputField['magicDefense'] = props.magicDefense;
    state['inputFields'] = inputField;
    state['isCreateDialog'] = false;
    this.setState(state);
    
    this.handleOpenDialog();
  }

  handleCloseDialog(){
    this.setState({openDialog:false, formErrorMessage:""})
    this.setState({inputError:
      {
        wbName: false,
        wbType: false,
        wbAttribute: false,
        wbRating: false,
        wbAttack: false,
        wbHealth: false,
        wbPhysicalDefense: false,
        wbMagicDefense: false
    },inputFields:{
        name: "",
        type: "",
        attribute: "",
        rating: "",
        attack: "",
        health: "",
        physicalDefense: "",
        magicDefense: ""
      }})
      this.webmonFormRef.reset();
      this.setState({isCreateDialog:true})
      
  }

  handleCloseDeleteDialog(){
    this.setState({formErrorMessage:"",openDeleteDialog:false, webmonToDelete:0, dialogProgressDelete:false})
  }

  handleDeleteWebmon(){
    const that = this;
    $.ajax({
      url: "deleteWebmon",
      data: {
        id: this.state.webmonToDelete
      },
      type: 'DELETE',
      success: function(response){
        if(response.result === "success"){
          that.getWebmons();
          that.grid.refresh();
          that.handleCloseDeleteDialog();
          that.setState({snackBarSuccess: true, snackBarMessage:"Webmon successfully deleted!"})
        }
      },
      error: function(error){

      }
    })
  }

  handleCreateWebmon(){
    const that = this;
    let formData = new FormData(document.getElementById("webmonForm"));
    let isError = false;
    let errorFields = {};
    let errorState = {};
    let url = "";
    for(let pair of formData.entries()){
      if(!pair[1]){
        errorFields[`wb${pair[0].charAt(0).toUpperCase() + pair[0].slice(1)}`] = true;
        isError = true;
      }else{
        errorFields[`wb${pair[0].charAt(0).toUpperCase() + pair[0].slice(1)}`] = false;
      }
    }

    errorState['inputError'] = errorFields;
    
    if(isError){
      this.setState(errorState)
      this.setState({formErrorMessage: ""});
    }else{

      if(this.state.isCreateDialog){
        url = "createWebmon";
      }else{
        url = "updateWebmon"
        formData.append("webmonId",this.state.inputFields.webmonId)
      }
      this.setState({dialogProgress:true})
       $.ajax({
        url: url,
        data: formData,
        type: 'POST',
        processData: false,
        contentType:false,
        success: function(response){
          that.setState({dialogProgress:false})
          if(response.result === "success"){
            that.getWebmons();
            that.setState({snackBarSuccess:true})

            if(that.state.isCreateDialog){
              that.setState({snackBarMessage:"Webmon successfully created!"})
            }else{
              that.setState({snackBarMessage:"Webmon successfully updated!"})
            }

            that.grid.refresh();
            that.handleCloseDialog();
          }else{
            that.setState({formErrorMessage: response.error});
          }
        },
        error: function(xhr){
          const errorMessage = xhr.responseJSON.status + " " + xhr.responseJSON.error;
          that.setState({formErrorMessage: errorMessage, dialogProgress:false});
        }
      })
    }
  }


  gridTemplate(props) {
    const { classes } = this.props;
    return (
      <Grid container className={classes.templateGrid}>
        <Grid item sm="1" className="d-none d-sm-flex">{props.webmonId}</Grid>
        <Grid item xs="7" sm="3">{props.name}</Grid>
        <Grid item sm="2" className="d-none d-sm-flex" style={{color:colorRating(props.rating)}}>{props.rating}</Grid>
        <Grid item sm="2" className="d-none d-sm-flex">{props.type}</Grid>
        <Grid item sm="2" className="d-none d-sm-flex">{props.attribute}</Grid>
        <Grid item xs="5" sm="2">
          <div>
            <Tooltip title="Edit" arrow>
              <IconButton size="small" color="primary" 
                onClick={()=>{this.handleOpenEditDialog(props)}}>
                <EditIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete" arrow>
              <IconButton onClick={()=>{this.handleOpenDeleteDialog(props)}} size="small" color="secondary">
                <DeleteIcon />
              </IconButton>
            </Tooltip>
            
          </div>
        </Grid>
      </Grid>
      );
    }
    render(){
       const { classes } = this.props;
      return(
        <div className={classes.root}>
            <div className="text-right mb-2">
              <Button size="small" variant="contained" color="primary" onClick={this.handleOpenDialog.bind(this)}>
                Add Webmon <AddIcon fontSize="small"/>
              </Button>
            
              <Dialog 
               open={this.state.openDialog} 
               onClose={this.handleCloseDialog.bind(this)} 
               maxWidth="sm">
                <DialogTitle>{this.state.isCreateDialog ? "Create New Webmon" : "Edit Webmon"}</DialogTitle>
                
                <DialogContent>
                  <div className="progress-wrapper">
                     <form id="webmonForm" ref={(el) => this.webmonFormRef = el}>
                      <Grid container spacing={2}>
                        <Grid item xs={12} style={{display: this.state.formErrorMessage ? "block" : "none"}}>
                          <div className="alert alert-danger">{this.state.formErrorMessage}</div>
                        </Grid>

                        <Grid item xs="12" sm="6">
                          <div className="form-group mb-0">
                            <label for="wbName">Name</label>
                            <input  type="wbName" className={"form-control " + (this.state.inputError.wbName ? "is-invalid" : "")} id="wbName" placeholder="Name" name="name" defaultValue={this.state.inputFields.name} />
                            <div style={{display: this.state.inputError.wbName ? "block" : "none"}} class="invalid-feedback">
                            Please provide a name.
                            </div>
                          </div>
                        </Grid>

                        <Grid item xs="12" sm="6">
                          <div className="form-group mb-0">
                            <label for="wbType">Type</label>
                            <select id="wbType" name="type" defaultValue={this.state.inputFields.type} className={"form-control " + (this.state.inputError.wbType ? "is-invalid" : "")}>
                              <option value="" selected>Choose...</option>
                              {this.state.webmonTypeOptions.map((item)=>{
                                  return <option key={item.key} value={item}>{item}</option>
                              })}
                            </select>
                            <div style={{display: this.state.inputError.wbType ? "block" : "none"}} class="invalid-feedback">
                            Please provide appropriate type.
                            </div>
                          </div>
                        </Grid>
                        

                        <Grid item xs="12" sm="6">
                          <div className="form-group mb-0">
                            <label for="wbAttribute">Attribute</label>
                            <select id="wbAttribute" defaultValue={this.state.inputFields.attribute} name="attribute" className={"form-control " + (this.state.inputError.wbAttribute ? "is-invalid" : "")}>
                              <option value="" selected>Choose...</option>
                              {this.state.attributeOptions.map((item)=>{
                                  return <option key={item.key} value={item}>{item}</option>
                              })}
                            </select>
                            <div style={{display: this.state.inputError.wbAttribute ? "block" : "none"}} class="invalid-feedback">
                            Please provide appropriate attribute.
                            </div>
                          </div>
                        </Grid>

                        <Grid item xs="12" sm="6">
                          <div className="form-group mb-0">
                            <label for="wbRating">Rating</label>
                            <select id="wbRating" name="rating" 
                            defaultValue={this.state.inputFields.rating} className={"form-control " + (this.state.inputError.wbRating ? "is-invalid" : "")}>
                              <option value="" selected>Choose...</option>
                              {this.state.ratingOptions.map((item)=>{
                                  return <option key={item.key} value={item}>{item}</option>
                              })}
                            </select>
                            <div style={{display: this.state.inputError.wbRating ? "block" : "none"}} class="invalid-feedback">
                            Please provide appropriate rating.
                            </div>
                          </div>
                        </Grid>

                        <Grid item xs="12" sm="6">
                          <div className="input-group">
                            <div className="input-group-prepend">
                              <span className="input-group-text py-0">
                                <AttackIcon className="small-icon" />
                              </span>
                            </div>
                            <input id="wbAttack" type="number" className={"form-control " + (this.state.inputError.wbAttack ? "is-invalid" : "")} placeholder="Attack Dmg." name="attack" defaultValue={this.state.inputFields.attack} />
                            <div style={{display: this.state.inputError.wbAttack ? "block" : "none"}} class="invalid-feedback">
                              Please provide total attack damage.
                            </div>
                          </div>
                        </Grid>
                        <Grid item xs="12" sm="6"s>
                          <div className="input-group">
                            <div className="input-group-prepend">
                              <span className="input-group-text py-0">
                                <HealthIcon className="small-icon" />
                              </span>
                            </div>
                            <input id="wbHealth" type="number" className={"form-control " + (this.state.inputError.wbHealth ? "is-invalid" : "")} placeholder="Health" name="health" defaultValue={this.state.inputFields.health} />
                            <div style={{display: this.state.inputError.wbHealth ? "block" : "none"}} class="invalid-feedback">
                              Please provide total health.
                            </div>
                          </div>
                        </Grid>
                        <Grid item xs="12" sm="6">         
                          <div className="input-group">
                            <div className="input-group-prepend">
                              <span className="input-group-text py-0">
                                <PhysicalDefIcon className="small-icon" />
                              </span>
                            </div>
                            <input id="wbPhysicalDef" type="number" className={"form-control " + (this.state.inputError.wbPhysicalDefense ? "is-invalid" : "")} placeholder="Physical Def." name="physicalDefense" defaultValue={this.state.inputFields.physicalDefense} />
                            <div style={{display: this.state.inputError.wbPhysicalDefense ? "block" : "none"}} class="invalid-feedback">
                              Please provide total physical defense.
                            </div>
                          </div>
                        </Grid>
                        <Grid item xs="12" sm="6">
                          <div className="input-group">
                            <div className="input-group-prepend">
                              <span className="input-group-text py-0">
                                <MagicDefIcon className="small-icon" />
                              </span>
                            </div>
                            <input id="wbMagicDefense" type="number" className={"form-control " + (this.state.inputError.wbMagicDefense ? "is-invalid" : "")} placeholder="Magic Def." name="magicDefense" defaultValue={this.state.inputFields.magicDefense} />
                            <div style={{display: this.state.inputError.wbMagicDefense ? "block" : "none"}} class="invalid-feedback">
                              Please provide total magic defense.
                            </div>
                          </div>
                        </Grid>
                      </Grid>
                      
                    </form>
                  </div>
                 
                 
                  <LinearProgress className="mt-3" style={{display: this.state.dialogProgress ? "block":"none"}} />
                </DialogContent>
                <DialogActions>


                  <Button size="small" variant="contained" onClick={this.handleCreateWebmon.bind(this)} color="primary">
                    {this.state.isCreateDialog ? "Create" : "Update"}
                  </Button>
                  <Button size="small" variant="contained" onClick={this.handleCloseDialog.bind(this)} color="default">
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
            </div>    
            
            <div className="grid-group">
              <div className="grid-header e-grid">
                <Grid container>
                  <Grid item sm="1" className="d-none d-sm-block">ID</Grid>
                  <Grid item xs="7" sm="3">Name</Grid>
                  <Grid item sm="2" className="d-none d-sm-block">Rating</Grid>
                  <Grid item sm="2" className="d-none d-sm-block">Type</Grid>
                  <Grid item sm="2" className="d-none d-sm-block">Attribute</Grid>
                  <Grid item xs="5" sm="2">Action</Grid>
                </Grid>
              </div>
              <GridComponent 
                id="noHeaderGrid"
                ref={g => (this.grid = g)}
                dataSource={this.state.webmons}
                allowPaging={true}
                pageSettings={{pageSize: 10}}
                >
                <ColumnsDirective>
                    <ColumnDirective template={this.template} headerText="Test Header"/>
                </ColumnsDirective>
                <Inject services={[Page]} />
              </GridComponent>
            </div>

            <Dialog
              open={this.state.openDeleteDialog}
              onClose={this.handleCloseDeleteDialog.bind(this)}>
              <DialogTitle>{"Confirm Delete Webmon"}</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Deleting this webmon will also remove all related user webmons. Are you sure you want to continue?
                </DialogContentText>
              </DialogContent>

              <LinearProgress className="mt-3" style={{display: this.state.dialogProgressDelete ? "block":"none"}} />
              <DialogActions>
                <Button size="small" variant="contained" onClick={this.handleCloseDeleteDialog.bind(this)} color="default">
                  Cancel
                </Button>
                <Button size="small" variant="contained" onClick={this.handleDeleteWebmon.bind(this)} color="primary" autoFocus>
                  Confirm
                </Button>
              </DialogActions>
            </Dialog> 
        </div>
      )
    }

}

export default withStyles(styles)(WebmonsTab);