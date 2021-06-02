import React, { useEffect } from 'react'
import util from '../../../../helpers/utils'
import css from './cart.module.css';
import { ReduxProps } from './';

const Cart: React.FC<ReduxProps> = (props) => {
  const {
    cartItems,
    removeFromCart,
    setMercadoPagoPreferences,
  } = props;

  useEffect(() => {
    setMercadoPagoPreferences(cartItems);
  }, [setMercadoPagoPreferences, cartItems]);

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
                  <b>{item.tittle}</b>
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
            <div id='mercadoForm'>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Cart;
