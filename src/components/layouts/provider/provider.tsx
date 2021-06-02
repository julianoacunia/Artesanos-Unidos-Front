import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import css from './provider.module.css';
import { ReduxProps } from './';
import Drawer from '@material-ui/core/Drawer';
import ListItem from '@material-ui/core/ListItem';

export interface Props extends ReduxProps {
  children: React.ReactNode;
  showSearchField?: boolean;
}

const ProviderLayout: React.FC<ReduxProps> = (props) => {
  const { children, logOut } = props;

  const history = useHistory();
  const location = useLocation();

  const options = React.useMemo(() => {
    return (
      <>
        <button
          onClick={() => history.push('/provider/products')}
          disabled={location.pathname === '/profile/my-order'}
          className={css.routes}
        >
          Productos
      </button>
        <button
          onClick={() => history.push('/profile/my-order')}
          disabled={location.pathname === '/profile/my-order'}
          className={css.routes}
        >
          Ventas
      </button>
        <button
          onClick={() => history.push('/profile/my-order')}
          disabled={location.pathname === '/profile/my-order'}
          className={css.routes}
        >
          Categorías
      </button>
        <button
          onClick={logOut}
          className={css.routes}
        >
          Cerrar sesión
       </button>
      </>
    );
  }, [logOut, history, location]);

  // const options = React.useMemo(() => {
  //   const list = [
  //     {
  //       title: 'Productos',
  //       onClick: () => history.push('/provider/products'),
  //       disabled: location.pathname === '/profile/my-order',
  //     },
  //     {
  //       title: 'Ventas',
  //       onClick: () => history.push('/provider/products'),
  //       disabled: location.pathname === '/profile/my-order',
  //     },
  //     {
  //       title: 'Categorías',
  //       onClick: () => history.push('/provider/products'),
  //       disabled: location.pathname === '/profile/my-order',
  //     },
  //     {
  //       title: 'Cerrar sesión',
  //       onClick: () => history.push('/provider/products'),
  //       disabled: location.pathname === '/profile/my-order',
  //     },
  //   ];
  //   return list;
  // }, [logOut, history, location]);


  return (
    <div className={css.pageContainer}>
      <div className={css.columnContainer}>
        <div className={css.title}>
          APP WEB Administrador
        </div>
        <div className={css.optionsContainer}>
          {options}
        </div>
      </div>
      <div className={css.childrenContainer}>
        <div className={css.childrenPaper}>
          {children}
        </div>
      </div>
    </div>
  )
}

export default ProviderLayout;