import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

import AuctionsView from './views/AuctionsView';
import BlogView from './views/BlogView';
import 'bootstrap/dist/css/bootstrap.css'
import AuctionDetailView from './views/AuctionDetailView';
import CartView from './views/CartView';
import CartProvider from './providers/CartContext';
import { NavBar } from './NavBar';
import AuctionAddView from './views/AuctionAdd';
import LoginView from './views/LoginView';
import { SessionProvider } from './providers/SessionContext';

function App() {
  return (
    <Router>
    <SessionProvider>
      <CartProvider>
        <>
          <NavBar />

          <div className="container">
            <div className="row">
              <div className="col">
                <Switch>
                  <Redirect path="/" exact={true} to="/auctions" />
                  <Route path="/auctions/:id" component={AuctionDetailView}></Route>
                  <Route path="/auctions" component={AuctionsView}></Route>
                  <Route path="/auction_add" component={AuctionAddView}></Route>
                  <Route path="/blog" component={BlogView}></Route>
                  <Route path="/cart" component={CartView}></Route>
                  <Route path="/login" component={LoginView}></Route>
                </Switch>
              </div>
            </div>
          </div>
        </>
      </CartProvider>
    </SessionProvider>
  </Router>
  );
}

export default App;
