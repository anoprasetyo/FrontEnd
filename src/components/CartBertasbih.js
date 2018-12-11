import React, { Component } from 'react';
import axios from 'axios'
import { Input } from 'reactstrap';
import '../support/css/styletable.css';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class CartBertasbih extends Component {
    state = { ListCart: [], selectedIdEdit: 0 }
    componentDidMount() {
        this.renderCartList();
    }

    renderCartList = () => {
        axios.get('http://localhost:2000/cart', {
            params: {
                username: this.props.username
            }
        }).then((res) => {
            this.setState({ ListCart: res.data, selectedIdEdit: 0 })
        })
    }
    
    onBtnDeleteClick = (id) => {
        if(window.confirm('Yakin nih bro?')) {
            axios.delete('http://localhost:2000/cart/' + id)
                .then((res) => {
                    this.renderCartList();
                }).catch((err) => {
                    console.log(err);
                })
        }
    }

    onBtnSaveClick = (id) => {
        var quantity =  this.refs.quantityEdit.value;

        axios.put('http://localhost:2000/xart/' + id, {
            quantity
        }).then((res) => {
            this.renderCartList();
        }).catch((err) => {
            console.log(err);
        })
    }

    onCheckOut = () => {
        axios.post('http://localhost:2000/history', {
            username : this.props.username,
            history : this.state.ListCart
        }).then((res) => {
            console.log(res)
            for(let i = 0 ; i < this.state.ListCart.length ; i ++) {
                axios.delete('http://localhost:2000/cart/' + this.state.ListCart[i].id)
                .then((res) => {
                    console.log(res)
                    this.renderCartList()      
                })
            }
        })
        
    }

    renderTotalHarga = () => {
        var a = 0
        for(let i = 0; i < this.state.ListCart.length ; i++){
            a += this.state.ListCart[i].total
        }
        
        return (
            <div className='col-2'>
                <h3>{ (a) }</h3>
                <Input className="btn-primary" type='button' value='Checkout' onClick ={ this.onCheckOut }/>
            </div>
        )
    }

    renderBodyCart = () => {
        var listJSXcart = this.state.ListCart.map(({ id, nama, img, harga, quantity, total }) => {
            if(id !== this.state.selectedIdEdit) {
                return (
                    <tr>
                        <td>{id}</td>
                        <td>{nama}</td>
                        <td><img src={img} width="50px" alt={id} /></td>
                        <td>{harga}</td>
                        <td>{quantity}</td>
                        <td>{total}</td>
                        <td><input className="btn btn-primary" type="button" value="Edit" onClick={ () => this.setState({ selectedIdEdit: id })}/></td>
                        <td><input className="btn btn-danger" type="button" value="Delete" onClick={ () => this.onBtnDeleteClick(id) } /></td>
                    </tr>
                )
            }
            return (
                <tr>
                    <td>{id}</td>
                    <td>{nama}</td>
                    <td><img src={img} width="50px" alt={id} /></td>
                    <td>{harga}</td>
                    <td><input type="number" defaultValue={quantity} ref="quantityEdit" /></td>
                    <td>{total}</td>
                    <td><input className="btn btn-primary" type="button" value="Save" onClick={ () => this.onBtnSaveClick(id) }/></td>
                    <td><input className="btn btn-danger" type="button" value="Cancel" onClick={ () => this.setState({ selectedIdEdit: 0 }) } /></td>
                </tr>
            )
        })
        return listJSXcart;
    }
    render() {
        if(this.state.ListCart.length > 0) {
            return (
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-12 text-center">
                            <h2 className="section-heading text-uppercase">Your Cart</h2>
                        </div>
                    </div>
                    <center>
                        <table>
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Nama</th>
                                    <th>Img</th>
                                    <th>Harga</th>
                                    <th>Quantity</th>
                                    <th>Total Harga</th>
                                    <th></th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                { this.renderBodyCart() }
                            </tbody>
                            </table>
                            <center>
                                { this.renderTotalHarga() }
                            </center>
                    </center>
                </div>
            )
        } else {
            return (
                <center>
                    <div className='col-4'>
                        <h2>Keranjang Anda Kosong</h2>
                        <Link to='/ListProduct'><Input type="button" className='btn-primary' value="Lanjutkan Belanja"/></Link>          
                    </div>
                </center>
            )
        }
    }
}
export default CartBertasbih;