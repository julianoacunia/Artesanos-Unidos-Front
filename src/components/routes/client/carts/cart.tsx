import React, { useEffect } from 'react'
import util from '../../../../helpers/utils'
import css from './cart.module.css';
import { ReduxProps } from './';
import { useHistory } from 'react-router-dom';

const Cart: React.FC<ReduxProps> = (props) => {
  const {
    cartItems,
    removeFromCart,
    setMercadoPagoPreferences,
    isAuth,
  } = props;

  useEffect(() => {
    if (isAuth) {
      setMercadoPagoPreferences(cartItems);

    }
  }, [setMercadoPagoPreferences, cartItems]);

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
            <ul>
              {cartItems.map((item: any) => (
                <li key={item.id}>
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
            {isAuth ?
              <div id='mercadoForm'>
              </div>
              :
              <button onClick={() => history.push('/login')}>Iniciar sesión</button>
            }
          </div>
        )}
      </div>
    </div>
  )
}

export default Cart;
