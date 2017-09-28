import React, { Component } from 'react';
import { Grid, Cell, IconButton } from 'react-mdl';
import './Crypto.css';
export class DataCard extends Component{
  constructor(props){
    super(props)
  }

  render(){
    return(
      <Grid className="mdl-shadow--2dp mdl-color--white crypto-card">
        <Cell col={12}>
        <p  style={{display:'inline-block', float:'left'}}>
          {this.props.coins[this.props.filter.name].MarketName}
          <span style={{paddingLeft:'10px', display:'inline-block', height:'32px'}}>
            <img src={`https://files.coinmarketcap.com/static/img/coins/16x16/${this.props.currencies[this.props.filter.name.substr(this.props.filter.name.indexOf('-')+1, this.props.filter.name.length-1)].CurrencyLong.toLowerCase()}.png`} alt="" />
          </span>
        </p>
        <div style={{float:"right"}}>
            <IconButton name="close" onClick={ () => {this.props.removeCoin(this.props.filter) } }/>
        </div>
        </Cell>
        <Cell col={4} phone={1} tablet={2}>
          <p>Ask:</p>
          <p className={this.props.coins[this.props.filter.name].askColor}>{this.props.coins[this.props.filter.name].Ask}</p>
        </Cell>
        <Cell col={4} phone={1} tablet={2}>
          <p>Bid:</p>
          <p className={this.props.coins[this.props.filter.name].bidColor}>{this.props.coins[this.props.filter.name].Bid}</p>
        </Cell>
        <Cell col={4} phone={1} tablet={2}>
          <p>Last:</p>
          <p className={this.props.coins[this.props.filter.name].lastColor}>{this.props.coins[this.props.filter.name].Last}</p>
        </Cell>
        <Cell col={4} phone={1} tablet={2}>
          <p>Volume</p>
          <p className={this.props.coins[this.props.filter.name].volumeColor}>{this.props.coins[this.props.filter.name].Volume}</p>
        </Cell>
        <Cell col={4} phone={1} tablet={2}>
          <p>Buy Orders</p>
          <p className={this.props.coins[this.props.filter.name].buyColor}>{this.props.coins[this.props.filter.name].OpenBuyOrders}</p>
        </Cell>
        <Cell col={4} phone={1} tablet={2}>
          <p>Sell Orders</p>
          <p className={this.props.coins[this.props.filter.name].sellColor}>{this.props.coins[this.props.filter.name].OpenSellOrders}</p>
        </Cell>
      </Grid>
    )
  }
}
