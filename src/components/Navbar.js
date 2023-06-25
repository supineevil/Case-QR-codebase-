import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'


export default function Navbar(props) {
  return (
<>
<nav className={`navbar navbar-expand-lg navbar-${props.mode} bg-${props.mode}`}>
  <div className="container-fluid  b">  
     
      <Link className="navbar-brand " to="/" size="small">
      {props.title}
      </Link>
     <div className="form-check form-switch text-secondary ">
    <input className="form-check-input form-check-input-bgcolor-black" aria-checked="true" onClick={props.toggleMode} type="checkbox" role="switch" id="flexSwitchCheckDefault"/>
    <label className="form-check-label " htmlFor="flexSwitchCheckDefault">Dark</label> 
    </div>
  </div>
</nav>
</>
  )
}
Navbar.prototype={
    title :PropTypes.string,
    abttext :PropTypes.string
}