import React from 'react'

export default class Footer extends React.Component{

  render(){
    const currYear = new Date().getFullYear();

    return(
      <div className="py-2 d-flex justify-content-center align-items-center" style={{borderTop:"1px solid #e0e0e0",height:"35px",position:"absolute",left:"0",bottom:"0",right:"0"}}>
          Webmon Battles &copy; {currYear}
      </div>
    )
  }
}