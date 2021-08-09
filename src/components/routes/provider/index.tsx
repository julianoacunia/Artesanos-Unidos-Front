import React from 'react';
import { Route, Switch, Redirect, useLocation } from 'react-router-dom';
import ProviderLayout from '../../layouts/provider';
import Products from './products';
import Product from './product';
import Orders from './orders';
import Order from './order';
import CheckAuthHOC from '../../../helpers/hocAuth/index';

const checkAdmin = (Comp: React.ComponentType<any>) => {
  return CheckAuthHOC(Comp, 'admin');
};


const ProviderRoutes: React.FC = () => {
  console.log("entrooo")
  const location = useLocation();
  return (
    <ProviderLayout>
      <Switch>
        <Route exact={false} path="/admin/products" component={Products} />
        <Route exact={false} path="/admin/product/:id" component={Product} />
        <Route exact={false} path="/admin/orders" component={Orders} />
        <Route exact={false} path="/admin/order/:id" component={Order} />
        <Redirect to="/admin/products" />
      </Switch>
    </ProviderLayout>
  );
};

export default ProviderRoutes;