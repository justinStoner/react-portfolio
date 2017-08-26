import React, { Component } from 'react';
import { Grid, Cell, Chip, ChipContact, IconButton, Textfield } from 'react-mdl';

export class TopPanel extends Component{
  constructor(props){
    super(props)
    this.state={
      isOpen:true,
      searchText:'',
      searching:false
    }
  }

  render(){
    return(
      <Grid className='mdl-shadow--2dp mdl-color--white'>
        <Cell col={12}>
          <h2 className="mdl-card__title-text" style={{display:'inline-block'}}>Coins</h2>
          <div style={{float:"right"}}>
            <Textfield
              onChange={(e) => {this.setState({searchText:e.target.value})}}
              label=" Coin"
              expandable
              expandableIcon="add"
              onFocus={()=>{this.setState({searching:!this.state.searching})}}
              value={this.state.searchText}
              onBlur={ () => {setTimeout( () =>{this.setState({searchText:'', searching:false})}, 300 )}}
              style={{padding:'0px'}}
              />
              <IconButton name={this.state.isOpen ? 'close' : 'more_vert'} onClick={ () => {this.setState({isOpen:!this.state.isOpen})} }/>
          </div>
        </Cell>
        {
          this.props.currencies && this.props.coins && this.state.isOpen
          ?
          <Cell col={12}>
            {
              Object.values(this.props.filters).map( (filter, index) => {
                return (
                  <Chip style={{marginRight:'16px', cursor:'pointer'}} key={index} onClose={ () => {this.props.removeCoin(filter)} }>
                    <ChipContact style={{ background: `url("https://files.coinmarketcap.com/static/img/coins/32x32/${this.props.currencies[filter.name.substr(filter.name.indexOf('-')+1, filter.name.length-1)].CurrencyLong.toLowerCase()}.png") 0 0 / cover` }}/>
                    {filter.name} | {Math.round10(this.props.coins[filter.name].Last, -3)}
                  </Chip>
                )
              })
            }
          </Cell>
          :
          null
        }
        {
          this.state.searching && this.state.isOpen && this.state.searchText.length
          ?
          <Cell col={12}>
            {
              Object.values(this.props.coins).filter( (coin, index) =>{
                return coin.MarketName.indexOf(this.state.searchText.toUpperCase()) > -1 && this.state.searchText.length && !this.props.filters[coin.MarketName]
              }).map( (coin, index) => {
                return (
                  <Chip style={{marginRight:'16px'}} key={index} onClick={ () => {this.props.addCoin(coin)} }>
                    {coin.MarketName} | {coin.Last}
                  </Chip>
                )
              })
            }
          </Cell>
          :
          null
        }
      </Grid>
    )
  }
}
// Object.values(this.props.filters).map( ( filter, index ) => {
//     return (
//       <Chip style={{marginRight:'16px', cursor:'pointer'}} key={index} onClose={ () => {this.props.removeCoin(filter)} }>
//         <ChipContact style={{ background: `url("https://files.coinmarketcap.com/static/img/coins/32x32/${this.props.currencies[filter.name.substr(filter.name.indexOf('-')+1, filter.name.length-1)].CurrencyLong.toLowerCase()}.png") 0 0 / cover` }}/>
//         {filter.name} | {Math.round10(this.props.coins[filter.name].Last, -3)}
//       </Chip>
//     )
//   }
// )

// {
//   this.state.searching && this.state.isOpen && this.state.searchText.length
//   ?
//     {
//       Object.values(this.props.coins).filter( (coin, index ) => {
//           return coin.MarketName.indexOf(this.state.searchText.toUpperCase()) > -1 && this.state.searchText.length && !this.state.filters[coin.MarketName]
//         }
//       ).map( (coin, index) => {
//         return (
//           <Chip style={{marginRight:'16px'}} key={index} onClick={ () => {this.props.addCoin(coin)} }>
//             {coin.MarketName} | {coin.Last}
//           </Chip>
//         )
//       })
//     }
//   :
//   null
// }
