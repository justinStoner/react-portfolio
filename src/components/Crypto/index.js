import React, { Component } from 'react';
import { Grid, Cell, Spinner } from 'react-mdl';
import openSocket from 'socket.io-client';
import { TopPanel } from './TopPanel.js';
import { DataCard } from './DataCard';
import './Crypto.css';

const colorNames = [
  ['Ask', 'askColor'],
  ['Bid', 'bidColor'],
  ['Last', 'lastColor'],
  ['Volume', 'volumeColor'],
  ['OpenBuyOrders', 'buyColor'],
  ['openSocket', 'sellColor']
]
const defaultFilters = {
  'BTC-ETH':{currency1:'BTC', currency2:'ETH', name:'BTC-ETH'},
  'ETH-OMG':{currency1:'ETH', currency2:'OMG', name:'ETH-OMG'},
  'ETH-NEO':{currency1:'ETH', currency2:'NEO', name:'ETH-NEO'},
  'ETH-ANT':{currency1:'ETH', currency2:'ANT', name:'ETH-ANT'},
  'ETH-PAY':{currency1:'ETH', currency2:'PAY', name:'ETH-PAY'},
  'USDT-ETH':{currency1:'USDT', currency2:'ETH', name:'USDT-ETH'},
  'USDT-BTC':{currency1:'USDT', currency2:'BTC', name:'USDT-BTC'}
};
let socket;

export class Crypto extends Component{
  constructor(props){
    super(props);
    var filters;
    try{
      filters = JSON.parse(localStorage.coinFilters);
    }catch(e){

    }
    this.state={
      filters:filters || defaultFilters,
      searchText:'',
      searching:false,
      coinPickerOpen:true,
      coins:null,
      loaded:false
    }

    this.removeCoin=this.removeCoin.bind(this);
    this.addCoin=this.addCoin.bind(this)
  }

  componentDidMount(){
    socket = openSocket(process.env.NODE_ENV === 'production' ? 'http://heyjust.in' : 'http://localhost:3000');
    fetch("/api/crypto/currencies")
    .then(res=>res.json())
    .then(res=>{
      console.log(res);
      if(res.success) {
        this.setState({currencies:mapCurrencies(res.result.filter( item => item.IsActive))});
        fetch("/api/crypto/marketdata")
        .then(res=>res.json())
        .then(res=>{
          console.log(res);
          if(res.success) this.setState({coins:{...splitArray(res.result, this.state), loaded:true}});
          else this.setState({loaded:true})
          console.log(this.state);
        })
      }else{
        this.setState({loaded:true})
      }
      console.log(this.state);
    })

    socket.on('ticker', tick => {
      console.log(tick);
      if(tick.success){
        this.setState( {coins:{...splitArray(tick.result, this.state)}} )
      }
    });

    socket.emit('subscribeToTicker', 5000);

    let event = new CustomEvent("stop-synth")
    window.dispatchEvent(event);
  }
  componentWillUnmount(){
    socket.disconnect()
    let event = new CustomEvent("start-synth")
    window.dispatchEvent(event);
  }
  render(){
    return (
      <Grid className="text-center">
        <Cell col={12} className="text-left">
          <TopPanel coins={this.state.coins} currencies={this.state.currencies} filters={this.state.filters} addCoin={this.addCoin} loaded={this.state.loaded} removeCoin={ (filter) => {this.removeCoin(filter, this.state)}} />
        </Cell>
        {
          this.state.coins && this.state.currencies?
          Object.values(this.state.filters).map( (filter, index) => {
            return (
              <Cell col={4} key={index}>
                <DataCard currencies={this.state.currencies} coins={this.state.coins} filter={filter} removeCoin={(filter) => {this.removeCoin(filter, this.state)}} />
              </Cell>
            )
          })
          : !this.state.loaded ?
              <Cell col={12}>
                <Spinner />
              </Cell>
              : null
        }
        <Cell col={12}>
            <p>ETH: 0x0D7E1502ca05adb3D9E0932fd6db88743ca1127b | BTC: 16svniBM2MjFSswNT3A38e2PToNmCLwvpq</p>
        </Cell>
      </Grid>
    )
  }
  addCoin(coin){
    var newFilter = {};
    var filters;
    newFilter[coin.MarketName] = {
      name:coin.MarketName,
      currency1:coin.MarketName.substr(0, coin.MarketName.indexOf('-')-1),
      currency2:coin.MarketName.substr(coin.MarketName.indexOf('-')+1, coin.MarketName.length+1)
    }
    filters = Object.assign( {}, newFilter, this.state.filters );
    console.log(filters);
    localStorage.setItem('coinFilters', JSON.stringify(filters));
    this.setState({ filters });
  }
  removeCoin = (filter, state) => {
    var filters = Object.assign( {}, state.filters );
    delete filters[filter.name];
    //var coins = spliceCoin(state.coins, filter);
    localStorage.setItem('coinFilters', JSON.stringify(filters));
    this.setState( { filters: filters } )
  }
}

const spliceCoin = ( coins, filter ) =>{
  var filteredCoins = Object.assign( {}, coins );
  delete filteredCoins[filter.name];
  return filteredCoins;
}

const mapCurrencies = (arr) => {
  var obj = {};
  for ( var i in arr ){
    obj[arr[i].Currency] = arr[i];
  }
  return obj
}
const splitArray = (data, state) => {
  var obj={}
  var current;
  for ( var i in data ) {
    current=data[i];
    obj[current.MarketName] = current;
    if( state.filters[current.MarketName] ) {
      if( state.coins ) {
        colorNames.forEach( color => {
          if( obj[current.MarketName][color[0]] > state.coins[current.MarketName][color[0]] ) {
            obj[current.MarketName][color[1]]='mdl-color-text--green-A400';
          }else if( obj[current.MarketName][color[0]] < state.coins[current.MarketName][color[0]] ) {
            obj[current.MarketName][color[1]]='mdl-color-text--red-500';
          }else{
            obj[current.MarketName][color[1]]=state.coins[current.MarketName][color[1]] || '';
          }
        })
      }
    }
  }
  console.log(obj);
  return obj;
}
