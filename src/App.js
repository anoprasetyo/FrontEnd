import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
// import Carouselcoba from './components/Carouselcoba';
import Headertest from './components/Headertest';
// import ContentBertasbih from './components/ContentBertasbih';
// import Jumbotroncoba from './components/Jumbotroncoba';
// import { Container, Row, Col } from 'reactstrap';
import { keeplogin , cookieChecked } from './actions';
import { withRouter } from 'react-router-dom';
import LoginBertasbih from './components/LoginBertasbih';
import HomeBertasbih from './components/HomeBertasbih';
import RegisterBertasbih from './components/RegisterBertasbih.jsx';
import ListProduct from './components/ListProduct';
import ManageProduct from './components/ManageProduct';
import ManageCategories from './components/ManageCategories';
import ConnectMoviesCategories from './components/ConnectMoviesCategories';
import ProductDetails from './components/ProductDetails';
import Cookies from 'universal-cookie';
import CartBertasbih from './components/CartBertasbih';
import HistoryBertasbih from './components/HistoryBertasbih';
// import FooterBertasbih from './components/FooterBertasbih';
// import InputBertasbih from './components/InputBertasbih';

const cookies = new Cookies();

class App extends Component {
  componentDidMount() {
    const username = cookies.get('ferguso');
    if(username !== undefined) {
        this.props.keeplogin(username);
    } else {
      this.props.cookieChecked();
    }
  }


  onBtnOKClick = () => {
    this.setState({ content: 'Ini Comberan' })
  }

  render() {
    if(this.props.cookie) {
      return (
        <div className={ "container-fluid" }>
          <Headertest navBrand={"Bertaskuy"}/>
          <div>
              <Route exact path="/" component={ HomeBertasbih }/>        
              <Route path="/Login" component={ LoginBertasbih }/>
              <Route path="/Register" component={ RegisterBertasbih }/>
              <Route path="/ListProduct" component={ ListProduct }/>
              <Route path="/ManageProduct" component={ ManageProduct }/>
              <Route path="/ManageCategories" component={ ManageCategories }/>
              <Route path="/ConnectMoviesCategories" component={ ConnectMoviesCategories }/>
              <Route path="/ProductDetails" component={ ProductDetails } />
              <Route path="/Cart" component={ CartBertasbih } />
              <Route path="/History" component={ HistoryBertasbih } />
          </div> 
        </div>    
      );
    }

    return (<div>
      <center><h1>Loading...</h1></center>
      </div>);
  }
}



const mapStateToProps = (state) => {
  return { cookie: state.auth.cookie }
}

export default withRouter(connect(mapStateToProps, { keeplogin, cookieChecked })(App));
