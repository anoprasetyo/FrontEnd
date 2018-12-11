import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { onUserRegister } from '../actions';
import { Redirect } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { Button } from 'reactstrap';


const cookies = new Cookies();

class RegisterBertasbih extends Component {

    componentWillReceiveProps(newProps) {
        if(newProps.username !== '') {
            cookies.set('ferguso', newProps.username, { path: '/' });
        }
    }

    onBtnRegisterClick = () => {
        var username = this.refs.username.value;
        var email = this.refs.email.value;
        var phone = this.refs.phone.value;
        var password = this.refs.password.value;

        this.props.onUserRegister({ username, email, phone, password });
    }

    renderErrorRegister = () => {
        if(this.props.error.length > 0) {
            return <p className="alert alert-danger">{ this.props.error }</p>
        }
    }

    renderButton = () => {
        if(this.props.loading) {
            return <h2>loading...</h2>
        }
        return <Button color="success" onClick={ this.onBtnRegisterClick }>Sign Up</Button>

    }

    render() {
        if(this.props.username === "") { 
            return (
                <div className="main">
                    <section className="signup">
                        <div className="container">
                        <div className="signup-content">
                            <div className="signup-form">
                            <h2 className="form-title">Sign up</h2>
                            <form method="POST" className="register-form" id="register-form">
                                <div className="form-group">
                                <label htmlFor="name"><i className="zmdi zmdi-account material-icons-name" /></label>
                                <input ref="username" type="text" name="name" id="name" placeholder="Your Name" />
                                </div>
                                <div className="form-group">
                                <label htmlFor="email"><i className="zmdi zmdi-email" /></label>
                                <input ref="email" type="email" name="email" id="email" placeholder="Your Email" />
                                </div>
                                <div className="form-group">
                                <label htmlFor="phone"><i className="zmdi zmdi-lock" /></label>
                                <input ref="phone" type="string" name="phone" id="phone" placeholder="Your Phone Number" />
                                </div>
                                <div className="form-group">
                                <label htmlFor="pass"><i className="zmdi zmdi-lock-outline" /></label>
                                <input ref="password" type="password" name="passwprd" id="pass" placeholder="Your password" />
                                </div>
                                <div className="form-group">
                                <input type="checkbox" name="agree-term" id="agree-term" className="agree-term" />
                                <label htmlFor="agree-term" className="label-agree-term"><span><span /></span>I agree all statements in  <a href="#" className="term-service">Terms of service</a></label>
                                </div>
                                <div>
                                    { this.renderErrorRegister() }
                                </div>
                                <div className="form-group form-button">
                                    { this.renderButton() }
                                </div>
                            </form>
                            </div>
                            <div className="signup-image">
                            <figure><img src="images/signup-image.jpg" alt="sing up image" /></figure>
                            <a href="#" className="signup-image-link"><Link to="/Login">I am already member</Link></a>
                            </div>
                        </div>
                        </div>
                    </section>
                </div>
              )
        }        
        return <Redirect to="/" />
    }
}

const mapStateToProps = (state) => {
    return { username: state.auth.username, 
             loading: state.auth.loading, 
             error: state.auth.error2 }
}

export default connect (mapStateToProps, { onUserRegister })(RegisterBertasbih);

    