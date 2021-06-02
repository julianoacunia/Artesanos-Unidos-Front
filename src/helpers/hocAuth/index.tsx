import React, { useEffect, useCallback } from 'react';
import { logOut as logoutAction } from '../../redux/actions/loginActions';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { RouteComponentProps } from 'react-router-dom';
import { Category } from '../../enums/index'

interface Props extends RouteComponentProps {
  authenticated: any;
  user: any;
  logout: typeof logoutAction;
}

const CheckAuthHOC = (
  WrappedComponent: React.ComponentType<any>,
  allowCategory: any,
) => {

  const HOC = (props: Props) => {

    const { authenticated, user, history, match, logout } = props;
    const checkTokenAndCategory = useCallback(() => {
      if (!authenticated) {
        logout();
        history.push('/');
      } else if (user && user.category !== allowCategory) {
        history.push('/');
      } else if (allowCategory === Category.ADMIN) {
        history.push('/admin');
      } else if (allowCategory === Category.CLIENT) {
        history.push('/client');
      }
    }, [authenticated, user, history, logout]);

    useEffect(() => {
      checkTokenAndCategory();
    }, [authenticated, checkTokenAndCategory]);

    return <WrappedComponent history={history} match={match} />;

  };

  const mapStateToProps = (state: any) => ({
    authenticated: state.auth.authenticated,
    user: state.auth.user,
  });

  const mapDispatchToProps = (dispatch: Dispatch<any>) =>
    bindActionCreators({
      logout: logoutAction,
    }, dispatch);

  return connect(mapStateToProps, (mapDispatchToProps as any))(HOC);
};

export default CheckAuthHOC;