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
          onClick={() => history.push('/admin/products')}
          disabled={location.pathname === '/admin/products'}
          className={css.routes}
        >
          Productos
      </button>
        <button
          onClick={() => history.push('/admin/orders')}
          disabled={location.pathname === '/admin/orders'}
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