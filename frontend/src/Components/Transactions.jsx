import React from 'react';
import axios from 'axios';

class Transactions extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            user_id: props.user.id,
            transactions: []
        }
    }

    componentDidMount() {
        console.log(this.state)
        this.loadTransactions()
    }
    //Makes an API request to get all the transactions in the users history.
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

    render() {
        return(
            <div id="transactions">
                <h3>Transactions</h3>
                {this.state.transactions.map(transaction => {
                    return (
                        <div className="individualTransaction" key={transaction.ticker + transaction.quantity}>
                            <p>BUY ({transaction.ticker}) - {transaction.quantity} shares @ {transaction.price_paid}</p>
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default Transactions;