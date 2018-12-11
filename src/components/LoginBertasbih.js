import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Form, Label, Input } from 'reactstrap';
import { Redirect } from 'react-router-dom';
import { onUserLogin } from '../actions';
import Cookies from 'universal-cookie'
import { Link } from 'react-router-dom';

const cookies = new Cookies();

class LoginBertasbih extends Component {

    componentWillReceiveProps(newProps) {
        if(newProps.username !== '') {
            cookies.set('ferguso', newProps.username, { path: '/' })
        }
    }

    onBtnLoginClick = () => {
        var username = this.refs.username.refs.tbUsername.value;
        var password = this.refs.password.refs.tbPassword.value;
        this.props.onUserLogin({ username, password });
    }
    
    renderError = () => {
        if(this.props.error.length > 0) {
            return <p className="alert alert-danger">{ this.props.error }</p>
        }
    }

    renderButton = () => {
        if(this.props.loading) {
            return <h2>loading...</h2>
        }
        return <Button color="success" onClick={ this.onBtnLoginClick }>Login</Button>
    }

    render() {
        if(this.props.username === "") {
            return (
                <div className="main">
                    <section>
                        <div class="container">
                        <div class="signin-content">
                            <div class="signin-image">
                                <img src="images/signin-image.jpg" alt="sing up image"></img>
                                <a href="#" class="signup-image-link"><Link to="/Register">Create an account</Link></a>
                            </div>

                            <div class="signin-form">
                                <h2 class="form-title">Welcome!</h2>
                                <Form method="POST" class="register-form" id="login-form">
                                    <div class="form-group">
                                        <Label for="exampleUsername"><i class="zmdi zmdi-account material-icons-name"></i></Label>
                                        <Input type="text" name="username" ref="username" innerRef="tbUsername"  id="exampleUsername" placeholder="Your Username"/>
                                    </div>
                                    <div class="form-group">
                                        <Label for="your_pass"><i class="zmdi zmdi-lock"></i></Label>
                                        <Input type="password" name="password" ref="password" innerRef="tbPassword" id="examplePassword" placeholder="Password"/>
                                    </div>
                                    <div class="form-group">
                                        <Input type="checkbox" name="remember-me" id="remember-me" class="agree-term" />
                                        <Label for="remember-me" class="label-agree-term"><span><span></span></span>Remember me</Label>
                                    </div>
                                    <div class="form-group form-button">
                                        { this.renderButton() }
                                        { this.renderError() }
                                    </div>
                                </Form>
                            </div>
                            </div>
                        </div>
                    </section>
                </div>
            );
        }
        return <Redirect to="/" />
    }
}

const mapStateToProps = (state) => {
    return { 
        username: state.auth.username, 
        error: state.auth.error1 , 
        loading: state.auth.loading
    };
}

export default connect(mapStateToProps, { onUserLogin })(LoginBertasbih);