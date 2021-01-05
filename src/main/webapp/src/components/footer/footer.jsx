import React from 'react'

export default class Footer extends React.Component{

  render(){
    const currYear = new Date().getFullYear();

    return(
      <div className="py-2 d-flex justify-content-center align-items-center border-top" style={{}}>
          Webmon Battles &copy; {currYear}
      </div>
    )
  }
}