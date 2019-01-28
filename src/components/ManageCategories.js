import React, { Component } from 'react';
import '../support/css/styletable.css';
import axios from 'axios';
import { onItemRegister } from '../actions';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';
import { Redirect } from 'react-router-dom';

class ManageCategories extends Component {
    state = { ListProduct: [], selectedIdEdit: 0 }
    componentDidMount() {
        this.getPopokList();
    }

    getPopokList = () => {
        axios.get('http://localhost:2000/categories')
            .then((res) => {
                this.setState({ ListProduct: res.data, selectedIdEdit: 0 })
            }).catch((err) => {
                console.log(err)
            })
    }

    onBtnAddClick = () => {
        var categories = this.refs.categoriesAdd.value;

        axios.post('http://localhost:2000/categories', {
                categories
            }).then((res) => {
                this.getPopokList();
            }).catch((err) => {
                console.log(err)
            })
    }

    onBtnDeleteClick = (id) => {
        if(window.confirm('Yakin nih bro?')) {
            axios.delete('http://localhost:2000/categories/' + id)
                .then((res) => {
                    this.getPopokList();
                }).catch((err) => {
                    console.log(err);
                })
        }
    }

    onBtnSaveClick = (id) => {
        var categories = this.refs.categoriesEdit.value;

        axios.put('http://localhost:2000/categories/' + id, {
            categories
        }).then((res) => {
            this.getPopokList();
        }).catch((err) => {
            console.log(err);
        })
    }

    renderBodyPopok = () => {
        var listJSXPopok = this.state.ListProduct.map(({id, mvcategories}) => {
            if(id !== this.state.selectedIdEdit) {
                return (
                    <tr>
                        <td>{id}</td>
                        <td>{mvcategories}</td>
                        <td><input className="btn btn-primary" type="button" value="Edit" onClick={ () => this.setState({ selectedIdEdit: id })}/></td>
                        <td><input className="btn btn-danger" type="button" value="Delete" onClick={ () => this.onBtnDeleteClick(id) } /></td>
                    </tr>
                )
            }
            return (
                <tr>
                    <td>{id}</td>
                    <td><input type="text" defaultValue={mvcategories} ref="categoriesEdit" /></td>
                    <td><input className="btn btn-primary" type="button" value="Save" onClick={ () => this.onBtnSaveClick(id) }/></td>
                    <td><input className="btn btn-danger" type="button" value="Cancel" onClick={ () => this.setState({ selectedIdEdit: 0 }) } /></td>
                </tr>
            )
        })
        return listJSXPopok;
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-12 text-center">
                        <h2 className="section-heading">Manage Popok</h2>
                    </div>
                </div>
                <center>
                    <table>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Categories</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderBodyPopok()}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td></td>
                                <td>
                                    <input ref="categoriesAdd" type="text" placeholder="Movie Categories"/>
                                </td>
                                <td>
                                <input type="button" className="btn btn-success" value="Add" onClick={this.onBtnAddClick} />
                                </td>
                                <td></td>
                            </tr>
                        </tfoot>
                    </table>
                </center>
            </div>
        );
    }
}

export default ManageCategories;