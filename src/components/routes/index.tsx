import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Redirect, Switch } from 'react-router-dom';
import { ApmRoute } from '@elastic/apm-rum-react';
import { connect } from 'react-redux'
// import CheckAuthHOC from '../../helpers/hocAuth/index';
// import { Category } from '../../enums'

const ProviderRoutes = lazy(() => import('../routes/provider'));
const ClientRoutes = lazy(() => import('../routes/client'));

// const checkClient = (Comp: React.ComponentType<any>) => {
//   return CheckAuthHOC(Comp, Category.CLIENT);
// };

const Routes: React.FC<{}> = (props: any) => {
  const { userRole } = props;

  return (
    <Router>
      <Suspense fallback={<div />}>
        <Switch>
          {/* <ApmRoute path="/" component={ClientRoutes} /> */}
          <ApmRoute path="/" component={ProviderRoutes} />
          <Redirect to="/" />
        </Switch>
      </Suspense>
    </Router>
  );
};

const mapStateToProps = (state: any) => ({
  // userRole: state.user.user,
})

export default connect(mapStateToProps, undefined)(Routes);