import React, { Component } from 'react';
import { Grid, Cell, IconButton } from 'react-mdl';

export class DataCard extends Component{
  constructor(props){
    super(props)
  }

  render(){
    return(
      <Grid className="mdl-shadow--2dp mdl-color--white">
        <Cell col={12}>
        <h2 className="mdl-card__title-text" style={{display:'inline-block'}}>
          {this.props.coins[this.props.filter.name].MarketName}
          <span style={{paddingLeft:'10px', display:'inline-block', height:'32px'}}>
            <img src={`https://files.coinmarketcap.com/static/img/coins/32x32/${this.props.currencies[this.props.filter.name.substr(this.props.filter.name.indexOf('-')+1, this.props.filter.name.length-1)].CurrencyLong.toLowerCase()}.png`} alt="" />
          </span>
        </h2>
        <div style={{float:"right"}}>
            <IconButton name="close" onClick={ () => {this.props.removeCoin(this.props.filter) } }/>
        </div>
        </Cell>
        <Cell col={4}>
          <p>Ask:</p>
          <p className={this.props.coins[this.props.filter.name].askColor}>{this.props.coins[this.props.filter.name].Ask}</p>
        </Cell>
        <Cell col={4}>
          <p>Bid:</p>
          <p className={this.props.coins[this.props.filter.name].bidColor}>{this.props.coins[this.props.filter.name].Bid}</p>
        </Cell>
        <Cell col={4}>
          <p>Last:</p>
          <p className={this.props.coins[this.props.filter.name].lastColor}>{this.props.coins[this.props.filter.name].Last}</p>
        </Cell>
        <Cell col={4}>
          <p>Volume</p>
          <p className={this.props.coins[this.props.filter.name].volumeColor}>{this.props.coins[this.props.filter.name].Volume}</p>
        </Cell>
        <Cell col={4}>
          <p>Buy Orders</p>
          <p className={this.props.coins[this.props.filter.name].buyColor}>{this.props.coins[this.props.filter.name].OpenBuyOrders}</p>
        </Cell>
        <Cell col={4}>
          <p>Sell Orders</p>
          <p className={this.props.coins[this.props.filter.name].sellColor}>{this.props.coins[this.props.filter.name].OpenSellOrders}</p>
        </Cell>
      </Grid>
    )
  }
}
