import React from 'react';
import { Route, Switch, Redirect, useLocation } from 'react-router-dom';
import ProviderLayout from '../../layouts/provider';
import Products from './products';
import Product from './product';

const ProviderRoutes: React.FC = () => {
  const location = useLocation();
  return (
    <ProviderLayout>
      <Switch>
        <Route exact={false} path="/admin/products" component={Products} />
        <Route exact={false} path="/admin/product/:id" component={Product} />

        <Redirect to="/admin/products" />
      </Switch>
    </ProviderLayout>
  );
};

export default ProviderRoutes;