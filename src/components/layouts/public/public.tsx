import React from 'react'
import { Link } from 'react-router-dom'
import PersonOutlineSharpIcon from '@material-ui/icons/PersonOutlineSharp'
import IconButton from '@material-ui/core/IconButton';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Badge from '@material-ui/core/Badge';
import { withStyles } from '@material-ui/core/styles';
import { ReduxProps } from './';
import css from './public.module.css';
import { useHistory } from 'react-router-dom';

export interface Props extends ReduxProps {
  children: React.ReactNode;
  showSearchField?: boolean;
}

const Public: React.FC<Props> = (props) => {
  const {
    cartItems,
    children,
    isAuth,
    user,
  } = props;

  const StyledBadge = withStyles((theme) => ({
    badge: {
      right: -3,
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: '0 4px',
    },
  }))(Badge);

  const history = useHistory();

  return (
    <>
      <div className={css.container}>
        <div className={css.header}>
          <div className={css.tittle}>
            <h1 className={css.text1}>Artesanos</h1>
            <h1 className={css.text3}>Unidos</h1>
          </div>
          <div className={css.publicity}>
            <div className={css.publicityMr}>
            </div>
          </div>
        </div>
        <div className={css.logged}>
          <div className={css.options}>
            <div className={css.homeMenu}>
              <Link to='/publicHome'>Inicio</Link>
            </div>
            <div className={css.productMenu}>
              <Link to='/publicProduct'>Productos</Link>
            </div>
            <div>
            </div>
          </div>
          <div className={css.buttonSession}>
            <div className={css.basketMenu}>
              <button className={css.buttonCart} onClick={() => history.push('/cart')}>
                <IconButton aria-label="cart" className={css.cartLibrary}>
                  <StyledBadge badgeContent={cartItems.length} color="secondary">
                    <ShoppingCartIcon />
                  </StyledBadge>
                </IconButton>
              </button>
            </div>
            {isAuth ?
              <div className={css.logged}>
                {`${user.name} ${user.lastName}`}
              </div>
              :
              <div className={css.loginMenu}>
                <Link to='/login'><PersonOutlineSharpIcon /></Link>
              </div>
            }
          </div>
        </div>
        <div className={css.main}>
          {children}
        </div>
      </div>
    </>
  );
}

export default Public;