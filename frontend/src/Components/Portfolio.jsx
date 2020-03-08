import React from 'react';
import axios from 'axios';

class Portfolio extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            user_id: props.user.id,
            username: props.user.username,
            cash: props.user.cash,
            ticker: "",
            quantity: 0,
            transactions: []
        }
    }

    componentDidMount() {
        console.log(this.state)
        this.loadTransactions()
    }

    componentDidUpdate() {
        this.loadTransactions()
    }

    loadTransactions = async () => {
        try {
            let transactionsFromUser = await axios.get(`/api/transactions/${this.state.user_id}`)
            console.log(transactionsFromUser.data.payload)
            this.setState({
                transactions: transactionsFromUser.data.payload
            })
        } catch (error) {
            console.log(error)
        }
    }

    handlePurchase = async (e) => {
        e.preventDefault();
        console.log(this.state.transactions)
        let price = await axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${this.state.ticker}&interval=5min&apikey=4IVCYEP8YDVPEZ23`)
        if(price.data[ 'Error Message' ]) {
            console.log("This ticker is invlaid")
            console.log(price)
        } else {       
            let today = price.data[ 'Meta Data' ][ '3. Last Refreshed' ]
            let todaysPrice = price.data[ 'Time Series (5min)' ][today][ '4. close' ]
            let amountPaid = Number(todaysPrice) * this.state.quantity
            let transaction = await axios.post(`/api/transactions`, {user_id: this.state.user_id, quantity: this.state.quantity, ticker: this.state.ticker, price_paid: Number(todaysPrice)})
            this.setState({
                cash: this.state.cash - amountPaid
            })
            console.log(price)
            console.log(today)
            console.log(todaysPrice)
            console.log(amountPaid)
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
            <div>
                <p>${this.state.cash}</p>
                <form onSubmit={this.handlePurchase}>
                    <input type="text" placeholder="ticker" onChange={this.handleTickerChange}></input>
                    <input type="number" onChange={this.handleQuantityChange}></input>
                    <button type="submit">Purchase</button>
                </form>
                {this.state.transactions.map(transaction => {
                    return (
                        <div key={transaction.ticker}>
                            <p>{transaction.ticker}</p>
                            <p>{transaction.quantity}</p>
                            <p>{transaction.price_paid}</p>
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default Portfolio;