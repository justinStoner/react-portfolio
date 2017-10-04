import React, { Component } from 'react'
import { IconButton, Menu, MenuItem } from 'react-mdl'

export class EffectOptions extends Component{
  constructor(props){
    super(props)
  }

  render(){
    const {id, toggleEffect, active, reOrder, index, remove, length, parent} = this.props
    return(
      <div style={{position:'relative'}}>
        <IconButton className="right" ripple name="more_vert" id={'menu-'+id} style={{marginTop:'-8px', marginRight:'-8px'}}/>
        <Menu target={'menu-'+id} ripple align="right">
            <MenuItem onClick={toggleEffect}>{active?'Deactivate':'Activate'}</MenuItem>
            <MenuItem onClick={() => {reOrder(false)}} disabled={index === 0}>Move Left</MenuItem>
            <MenuItem onClick={() => {reOrder(true)}} disabled={length === index}>Move Right</MenuItem>
            <MenuItem onClick={() => {remove( parent, id )}}>Remove</MenuItem>
        </Menu>
      </div>
    )
  }
}
