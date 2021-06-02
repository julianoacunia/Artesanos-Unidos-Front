import Component from './provider';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { logOut } from '../../../redux/actions/loginActions';

export interface DispatchProps {
  logOut: typeof logOut;
}

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({
    logOut,
  }, dispatch);

export default connect(undefined, mapDispatchToProps)(Component);
export type ReduxProps = DispatchProps;