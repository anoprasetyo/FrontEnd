import React, { Component } from 'react';
import '../support/css/styletable.css';
import axios from 'axios';
import {
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem } from 'reactstrap';
import { onItemRegister } from '../actions';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';
import { Redirect } from 'react-router-dom';

class ConnnectMoviesCategories extends Component {
    state = { ListProduct: [], selectedIdEdit: 0 }
    componentDidMount() {
        this.getPopokList();
    }

    getPopokList = () => {
        axios.get('http://localhost:2000/moviescategories')
            .then((res) => {
                this.setState({ ListProduct: res.data, selectedIdEdit: 0 })
            }).catch((err) => {
                console.log(err)
            })
    }

    onBtnAddClick = () => {
        var nama = this.refs.namaAdd.value;
        var categories = this.refs.categoriesAdd.value;

        axios.post('http://localhost:2000/moviescategories', {
                nama, categories
            }).then((res) => {
                this.getPopokList();
            }).catch((err) => {
                console.log(err)
            })
    }

    onBtnDeleteClick = (id) => {
        if(window.confirm('Yakin nih bro?')) {
            axios.delete('http://localhost:2000/moviescategories/' + id)
                .then((res) => {
                    this.getPopokList();
                }).catch((err) => {
                    console.log(err);
                })
        }
    }

    renderBodyPopok = () => {
        var listJSXPopok = this.state.ListProduct.map(({id, nama, categories}) => {
            if(id !== this.state.selectedIdEdit) {
                return (
                    <tr>
                        <td>{nama}</td>
                        <td>{categories}</td>
                        <td><input className="btn btn-danger" type="button" value="Delete" onClick={ () => this.onBtnDeleteClick(id) } /></td>
                    </tr>
                )
            }
            return (
                <tr>
                    <td><input type="text" defaultValue={nama} ref="namaEdit" /></td>
                    <td><input type="text" defaultValue={categories} ref="categoriesEdit" /></td>
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
                        <h2 className="section-heading">Connect Movies and Categories</h2>
                    </div>
                </div>
                <center>
                    <table>
                        <thead>
                            <tr>
                                <th>Nama</th>
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
                                <td>
                                    <UncontrolledDropdown>
                                        <DropdownToggle>
                                            Choose!
                                        </DropdownToggle>
                                        <DropdownMenu right>
                                            <DropdownItem ref="namaAdd">
                                                {this.props.popok}
                                            </DropdownItem>
                                        </DropdownMenu>
                                    </UncontrolledDropdown>
                                </td>
                                <td>
                                    <UncontrolledDropdown>
                                        <DropdownToggle>
                                            Choose!
                                        </DropdownToggle>
                                        <DropdownMenu right>
                                            <DropdownItem ref="categoriesAdd">
                                                {this.props.categories}
                                            </DropdownItem>
                                        </DropdownMenu>
                                    </UncontrolledDropdown>
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

export default ConnnectMoviesCategories;