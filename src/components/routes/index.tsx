import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Redirect, Switch } from 'react-router-dom';
import { ApmRoute } from '@elastic/apm-rum-react';
import { connect } from 'react-redux'
import CheckAuthHOC from '../../helpers/hocAuth/index';
import withTracker from '../../helpers/analytics/withTracker';
// import { Category } from '../../enums'

const ProviderRoutes = lazy(() => import('../routes/provider'));
const ClientRoutes = lazy(() => import('../routes/client'));

const checkAdmin = (Comp: React.ComponentType<any>) => {
  console.log("entro")
  return CheckAuthHOC(Comp, 'admin');
};

const checkClient = (Comp: React.ComponentType<any>) => {
  return CheckAuthHOC(Comp, 'client');
};

const Routes: React.FC<{}> = (props: any) => {
  console.log("entroi")

  return (
    <Router>
      <Suspense fallback={<div />}>
        <Switch>
          <ApmRoute exact={false} path='/admin' component={checkAdmin(ProviderRoutes)} />
          <ApmRoute exact={false} path='/' component={ClientRoutes} />
          <Redirect to='/' />
        </Switch>
      </Suspense>
    </Router>
  );
};

export default connect()(Routes);