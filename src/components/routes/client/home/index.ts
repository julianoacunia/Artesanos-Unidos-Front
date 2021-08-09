import Component from './category';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

export interface StateProps {
  isAuth: boolean;
}

const mapStateToProps = (state: any) => ({
  isAuth: state.users.isAuth,
});

export default connect(mapStateToProps, undefined)(Component as any);
export type ReduxProps = StateProps;