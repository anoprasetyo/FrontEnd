import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

class HomeBertasbih extends Component {
    state = { ListProduct: [] };

    componentDidMount() {
        var kacrut = axios.get('http://localhost:2000/products')
            kacrut.then((res) => {
                this.setState({ ListProduct: res.data })
            }).catch((err) => {
                console.log('error');
            })
    }
    renderListPopok = () => {
        var listJSXPopok = this.state.ListProduct.map((item) => {
            return (
            <div>
            </div>)
        })
        return listJSXPopok;
    }

    render() {
        return (
            <div align="center">
                <h1>Ini Home!</h1>
                {this.renderListPopok()}
                <p>{this.props.pikachu}</p>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return { pikachu: state.pikachu }
}

export default connect (mapStateToProps)(HomeBertasbih);