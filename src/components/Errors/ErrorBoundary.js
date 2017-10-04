import React, { Component } from 'react'
import { ReactDom } from 'react-dom';
import { Grid, Cell, Button, Dialog, DialogTitle, DialogContent, DialogActions } from 'react-mdl'
import { connect } from 'react-redux'
import { resetApp } from '../../actions'
import './Errors.css';
import PropTypes from 'prop-types';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, dialogOpen:true };
  }

  componentDidCatch(error, info) {
    this.setState({ hasError: true });
    console.error(error, info);
  }

  render() {
    if (this.state.hasError && !this.props.passive) {
      if(this.props.id){
        //component does not have a ui
        let el = document.getElementById(this.props.idPrefix+this.props.id)
        if(el){
          return [
            ReactDom.createPortal(
              <div className="error-overlay">
                <Grid>
                  <Cell col={12}>
                    <p>{this.props.message || 'Something went wrong here.'}</p>
                  </Cell>
                  <Cell col={12}>
                    <Button ripple className="mdl-color-red-500" onClick={() => {this.setState({ hasError: false })}}>Ignore</Button>
                    <Button ripple className="mdl-color-red-500">Reset component and its state</Button>
                    <Button ripple className="mdl-color-red-500" onClick={() => {this.props.resetApp(); window.location.reload()}}>Reset application and all data</Button>
                  </Cell>
                </Grid>
              </div>,
              el
            ),
            this.props.children || null
          ]
        }else{
          //component does not exist, or is not in the current route
          return [
            <Dialog open={this.state.dialogOpen}>
              <DialogTitle>Error</DialogTitle>
              <DialogContent>
                <p>{this.props.message || 'Something went wrong here.'}</p>
              </DialogContent>
              <DialogActions>
                <Button ripple className="mdl-color-red-500" onClick={() => {this.setState({ hasError: false })}}>Ignore</Button>
                <Button ripple className="mdl-color-red-500">Reset component and its state</Button>
                <Button ripple className="mdl-color-red-500" onClick={() => {this.props.resetApp(); window.location.reload()}}>Reset application and all data</Button>
              </DialogActions>
            </Dialog>,
            this.props.children || null
          ]
        }
      }else{
        return [
          <div className="error-overlay">
            <Grid>
              <Cell col={12}>
                <p>{this.props.message || 'Something went wrong here.'}</p>
              </Cell>
              <Cell col={12}>
                <Button ripple className="mdl-color-red-500" onClick={() => {this.setState({ hasError: false })}}>Ignore</Button>
                <Button ripple className="mdl-color-red-500">Reset component and its state</Button>
                <Button ripple className="mdl-color-red-500" onClick={() => {this.props.resetApp(); window.location.reload()}}>Reset application and all data</Button>
              </Cell>
            </Grid>
          </div>,
          this.props.children || null
        ]
      }
    }
    return this.props.children  || null;
  }
}

const mapDispatchToProps = dispatch =>{
  return {
    resetApp: () => {
      dispatch(resetApp())
    }
  }
}


export default connect(undefined, mapDispatchToProps)(ErrorBoundary)
