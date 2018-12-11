import React, { Component } from 'react';
import axios from 'axios';

class HistoryBertasbih extends Component {
    state = { ListHistory: [], ListCart: [] }
    componentDidMount() {
        this.getHistoryList();
    }


    getHistoryList = () => {
        axios.get('http://localhost:2000/history')
            .then((res) => {
                this.setState({ ListHistory: res.data })
            }).catch((err) => {
                console.log(err)
            })
    }

    renderHistory = () => {
        var listJSXhistory = this.state.ListHistory.map(({ id, username, tanggal, quantity, total }) => {
            return (
                <tr>
                    <td>{id}</td>
                    <td>{username}</td>
                    <td>{tanggal}</td>
                    <td>{quantity}</td>
                    <td>{total}</td>
                </tr>
            )
            
        })
        return listJSXhistory;
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-12 text-center">
                        <h2 className="section-heading text-uppercase">History</h2>
                    </div>
                </div>
                <center>
                    <table>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Nama</th>
                                <th>Tanggal Transaksi</th>
                                <th>Quantity</th>
                                <th>Total</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            { this.renderHistory() }
                        </tbody>
                    </table>
                </center>
            </div>
        );
    }
}

export default HistoryBertasbih;