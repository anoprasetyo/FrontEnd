import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import queryString from 'query-string';
import { select_product, tambahCart } from '../actions';
import { Form, Input } from 'reactstrap';

class ProductDetails extends Component {
    componentDidMount() {
        var params = queryString.parse(this.props.location.search)
        var productId = params.productid;
        axios.get(`http://localhost:2000/popok${productId}`)
            .then((res) => {
                this.props.select_product(res.data);
            }).catch((err) => {
                console.log(err);
            })
    }

    onCartBtn = () => {
        var id = this.props.popok.id;
        var nama = this.props.popok.nama;
        var img = this.props.popok.img;
        var harga = this.props.popok.harga;
        var quantity = this.refs.quantity.refs.innerqty;
        
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
        var { nama, harga, img, description, merk } = this.props.popok;
        return(
            <div className="container-fluid">
                <div className="row">
                    <div className="col-4">
                        <img alt={img} src={img} className="img-responsive" />
                    </div>
                    <div className="col-8">
                        <div className="row">
                            <h1>{nama}</h1>
                        </div>
                        <div className="row">
                            <h3>{merk}</h3>
                        </div>
                        <div className="row">
                            <h2>{harga}</h2>
                        </div>
                        <div className="row">
                            <p>{description}</p>
                        </div>
                        <div>
                            <Form inline>
                                <Input type="number" style={{ marginLeft:'20px' , width: '60px' , marginRight:'20px'}} ref='qty' innerRef = 'innerqty' defaultValue = '1'/>
                                <Input type="button" className="btn-success" value='Add to Cart' onClick={ this.onCartBtn }/>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return { popok: state.selectedProduct }
}

export default connect(mapStateToProps, { select_product, tambahCart })(ProductDetails);