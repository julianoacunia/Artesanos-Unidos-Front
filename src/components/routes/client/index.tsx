import React from 'react';
import { Route, Switch, Redirect, useLocation } from 'react-router-dom';
import PublicLayout from '../../layouts/public';
import Category from '../client/home/category';
import Register from './register/register';
import Login from './login/viewLogin';
import PublicProduct from './products/viewPublicProduct';
import Cart from './carts';

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
        <Redirect to="/" />
      </Switch>
    </PublicLayout>
  );
};

export default ClientRoutes;