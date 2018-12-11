import React, { Component } from 'react';
import { connect } from 'react-redux';
import { select_product, tambahCart } from '../actions';
import { Form, Input } from 'reactstrap';
import axios from 'axios';

class ItemProduct extends Component {
    onItemClick = () => {
        this.props.select_product(this.props.popok);
    }

    onCartBtn = () => {
        var id = this.props.popok.id;
        var nama = this.props.popok.nama;
        var img = this.props.popok.img;
        var harga = this.props.popok.harga;
        var quantity = this.refs.quantity.refs.innerqty.value;
        
        axios.post('http://localhost:2000/cart', {
          
            username : this.props.username,
            id : id,
            nama : nama,
            img : img,
            harga : harga,
            quantity : quantity,
            total : harga*quantity,
            id_order : 1
        }).then((res) => {
            console.log(res)
            alert('Produk berhasil dimasukan ke Keranjang')
            this.props.tambahCart() 
        }).catch((err) => {
            console.log(err)
        })
    }

    render() {
        const { img, nama, harga, description } = this.props.popok;
        return (
            <div className={`col-md-${ this.props.size } col-sm-6 portfolio-item`}>
                <a className="portfolio-link" data-toggle="modal" href="#portfolioModal1" onClick={ this.onItemClick } >
                    <div className="portfolio-hover">
                        <div className="portfolio-hover-content">
                            <i className="fas fa-plus fa-3x" />
                        </div>
                    </div>
                    <img className="img-fluid" src={ img } alt="ferguso" width="400px"/>
                </a>
                <div className="portfolio-caption">
                    <h4>{ nama }</h4>
                    <p className="text-muted">{ description }</p>
                    <h4>{ harga }</h4>
                    <Form inline>
                        <Input type="number" style={{ marginLeft:'20px' , width: '60px' , marginRight:'20px'}} ref='quantity' innerRef = 'innerqty' defaultValue = '1'/>
                        <Input type="button" className="btn-success" value='Add to Cart' onClick={ this.onCartBtn }/>
                    </Form>
                </div>
            </div>  
        )
    }
}

const mapStateToProps = (state) => {
    return {
        username: state.auth.username
    }
}

export default connect(mapStateToProps, { select_product, tambahCart })(ItemProduct);