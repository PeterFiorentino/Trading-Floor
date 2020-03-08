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
            <div>
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

export default Transactions;