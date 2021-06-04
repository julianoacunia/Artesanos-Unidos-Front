import React from 'react';
import { Route, Switch, Redirect, useLocation } from 'react-router-dom';
import ProviderLayout from '../../layouts/provider';
import Products from './products';
import Product from './product';
import CheckAuthHOC from '../../../helpers/hocAuth/index';

const checkAdmin = (Comp: React.ComponentType<any>) => {
  return CheckAuthHOC(Comp, 'admin');
};


const ProviderRoutes: React.FC = () => {
  const location = useLocation();
  return (
    <ProviderLayout>
      <Switch>
        <Route exact={false} path="/admin/products" component={checkAdmin(Products)} />
        <Route exact={false} path="/admin/product/:id" component={checkAdmin(Product)} />
        <Redirect to="/admin/products" />
      </Switch>
    </ProviderLayout>
  );
};

export default ProviderRoutes;