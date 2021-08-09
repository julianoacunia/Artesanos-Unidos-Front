import React, { useEffect, useCallback } from 'react'
import util from '../../../../helpers/utils'
import css from './cart.module.css';
import { ReduxProps } from './';
import { useHistory } from 'react-router-dom';
import Button from '../../../shared/form/button';

const Cart: React.FC<ReduxProps> = (props) => {
  const {
    cartItems,
    removeFromCart,
    isAuth,
    postOrder,
    user,
  } = props;

  const history = useHistory();

  return (
    <div className={css.container}>
      <div className={css.alertInfo}>
        {cartItems.length === 0 ? (
          'Basket is empty'
        ) : (
          <div>you have {cartItems.length} products in the basket</div>
        )}
        {cartItems.length > 0 && (
          <div className={css.cartProduct}>
            <ul className={css.product}>
              {cartItems.map((item: any) => (
                <li key={item.id} className={css.item}>
                  <b>{item.title}</b>
                  <button
                    style={{ float: 'right' }}
                    className={css.btnDanger}
                    onClick={() => removeFromCart(cartItems, item)}>
                    X
                  </button>
                  <br />
                  {item.count} X {util.formatCurrency(item.price)}
                </li>
              ))}
            </ul>
            <b>
              Sum:{' '}
              {util.formatCurrency(
                cartItems.reduce((a: any, c: any) => a + c.price * c.count, 0)
              )}
            </b>
          </div>
        )}
        {cartItems.length > 0 &&
          <div>
            {isAuth ?
              <Button styles={css.btnCart} text='Ir a pagar' onClick={() => history.push('/billing-information')} />
              :
              <Button styles={css.btnCart} text='Iniciar sesión' onClick={() => history.push('/login')} />
            }
          </div>
        }
      </div>
    </div>
  )
}

export default Cart;
