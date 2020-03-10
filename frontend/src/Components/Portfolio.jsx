import React from 'react';
import axios from 'axios';
import Transactions from './Transactions';
import api_key from '../api_key'

class Portfolio extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            user_id: props.user.id,
            username: props.user.username,
            cash: props.user.cash,
            ticker: "",
            quantity: 0,
            transactions: {},
            portfolioValue: 0,
            purchaseConfirmation: ""
        }
    }

    componentDidMount() {
        console.log(this.state)
        this.loadTransactions()
    }

    loadTransactions = async () => {
        try {
            let transactionsFromUser = await axios.get(`/api/transactions/${this.state.user_id}`)
            let transactions = transactionsFromUser.data.payload;
            let transObj = {};
            for (let i of transactions) {
                if(!transObj[i.ticker]) {
                    let prices = await axios.get(`https://sandbox.iexapis.com/stable/stock/${i.ticker}/quote?token=${api_key}`) 
                    let openingPrice = prices.data.previousClose;
                    let currentPrice = prices.data.latestPrice

                    transObj[i.ticker] = {}
                    transObj[i.ticker].currentPrice = Number(currentPrice)
                    transObj[i.ticker].openingPrice = Number(openingPrice)
                    transObj[i.ticker].quantity = i.quantity

                    

                    if(openingPrice > currentPrice) {
                        transObj[i.ticker].color = "red"
                    } else if (currentPrice > openingPrice) {
                        transObj[i.ticker].color = "green"
                    } else {
                        transObj[i.ticker].color = "gray"
                    }

                    this.setState({
                        portfolioValue: this.state.portfolioValue + Number(currentPrice)
                    })
                } else {
                    transObj[i.ticker].quantity += i.quantity
                }
            }
            console.log(transObj)
            this.setState({
                transactions: transObj
            })
        } catch (error) {
            console.log(error)
        }
    }

    handlePurchase = async (e) => {
        e.preventDefault();
        if(this.state.quantity <= 0) {
            this.setState({
                purchaseConfirmation: `Quantity of shares purchased needs to be greater than 0.`
            }) 
        } else {
            try{
                let price = await axios.get(`https://sandbox.iexapis.com/stable/stock/${this.state.ticker}/quote?token=${api_key}`)
                let todaysPrice = price.data.latestPrice
                let amountPaid = Number(todaysPrice) * this.state.quantity

                if(amountPaid > this.state.cash) {
                    this.setState({
                        purchaseConfirmation: `You don't have enough cash to buy ${this.state.quantity} shares of ${this.state.ticker}`
                    }) 
                    return
                }

                let transaction = await axios.post(`/api/transactions`, {user_id: this.state.user_id, quantity: this.state.quantity, ticker: this.state.ticker, price_paid: Number(todaysPrice)})
                this.setState({
                    purchaseConfirmation: `Successfully bought ${this.state.quantity} shares of ${this.state.ticker}`,
                    cash: this.state.cash - amountPaid,
                    quantity: 0,
                    ticker: ""
                })
                let changeCash = await axios.patch('/api/users', {newCash: this.state.cash, user_id: this.state.user_id})
                console.log(price)
                console.log(todaysPrice)
                console.log(amountPaid)
                this.loadTransactions()
            } catch (error) {
                console.log(error)
                this.setState({
                    purchaseConfirmation: `${this.state.ticker} is not a vaild ticker.`
                }) 
            }
        }
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
            <div id="portfolio">
                <div className="audit">
                   <h3>Portfolio (${this.state.portfolioValue})</h3>
                    {Object.keys(this.state.transactions).map(stock => {
                        return(
                            <div className="individualAudit">
                                <p className="auditInfo"><span style={{color: this.state.transactions[stock].color}}>{stock}</span> - {this.state.transactions[stock].quantity} Shares </p>  
                                <p className="auditInfo"><span style={{color: this.state.transactions[stock].color}}>${(this.state.transactions[stock].currentPrice) * this.state.transactions[stock].quantity}</span></p>
                            </div>
                        )
                    })}
                </div>
                <div id="cashPurchaseConfirm">
                <p>Cash - ${this.state.cash}</p>
                    <div className="purchaseForm">
                        <form onSubmit={this.handlePurchase} id="purchaseForm">
                            <input type="text" placeholder="ticker" onChange={this.handleTickerChange} value={this.state.ticker}></input>
                            <input type="number" onChange={this.handleQuantityChange} value={this.state.quantity}></input>
                            <button type="submit">Buy</button>
                        </form>
                    </div>
                    <p>{this.state.purchaseConfirmation}</p>
                </div>
            </div>
        )
    }
}

export default Portfolio;