import React, {Component} from 'react';
import axios from 'axios';

class Portfolio extends React.Component {
    state = {
        username: "",
        cash: 0,
        ticker: "",
        quantity: 0,
    }

    handlePurchase = async (e) => {
        e.preventDefault();
        let price = await axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${this.state.ticker}&interval=60min&apikey=4IVCYEP8YDVPEZ23`)
        let today = price.data[ 'Meta Data' ][ '3. Last Refreshed' ]
        let todaysPrice = price.data[ 'Time Series (Daily)' ][today]
        console.log(price)
        console.log(today)
        console.log(todaysPrice)
        
    }

    handleTickerChange = (e) => {
        this.setState({
            ticker: e.target.value
        })
    }

    handleQuantityChange = (e) => {
        this.setState({
            quantity: e.target.value
        })
    }



    render() {
        return(
            <div>
                <p>${this.state.cash}</p>
                <form onSubmit={this.handlePurchase}>
                    <input type="text" placeholder="ticker" onChange={this.handleTickerChange}></input>
                    <input type="number" onChange={this.handleQuantityChange}></input>
                    <button type="submit">Purchase</button>
                </form>
            </div>
        )
    }
}

export default Portfolio;