import React from 'react';
import { Route, Switch, Redirect, useLocation } from 'react-router-dom';
import PublicLayout from '../../layouts/public';
import Category from '../client/home';
import Register from './register/register';
import Login from './login/viewLogin';
import PublicProduct from './products/viewPublicProduct';
import Cart from './carts';
import Order from './order';
import MyOrders from './my-orders';
import OrderDetail from './order-details';
import Profile from './profile/viewProfile';

const ClientRoutes: React.FC = () => {
  const location = useLocation();
  return (
    <PublicLayout showSearchField={location.pathname.includes('/product/')} >
      <Switch>
        <Route exact={true} path='/' component={Category} />
        <Route exact={true} path='/register' component={Register} />
        <Route exact={true} path='/login' component={Login} />
        <Route exact={true} path='/publicProduct' component={PublicProduct} />
        <Route exact={true} path='/cart' component={Cart} />
        <Route exact={true} path='/billing-information' component={Order} />
        <Route exact={true} path='/my-orders' component={MyOrders} />
        <Route exact={true} path='/order-detail/:id' component={OrderDetail} />
        <Route exact={true} path='/profile' component={Profile} />
        <Redirect to="/" />
      </Switch>
    </PublicLayout>
  );
};

export default ClientRoutes;