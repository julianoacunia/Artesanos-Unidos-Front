import React, { useEffect, useCallback } from 'react';
import { ReduxProps } from '.';
import css from './order.module.css';
import moment from 'moment';
import { useHistory } from 'react-router-dom';

const Order: React.FC<ReduxProps> = (props) => {
  const {
    user,
    isAuth,
    cartItems,
    setMercadoPagoPreferences,
    postOrder,
    removeAllFromCart,
  } = props;

  useEffect(() => {
    if (isAuth) {
      setMercadoPagoPreferences(cartItems);
    }
  }, [setMercadoPagoPreferences, cartItems]);

  const history = useHistory();

  const onSubmit = useCallback(() => {
    const order = {
      client: user._id,
      total: cartItems.reduce((a: any, c: any) => a + c.price * c.count, 0),
      products: cartItems.map((item: any) => {
        return {
          productId: item._id,
          quantity: item.count,
          name: item.title,
          price: item.price,
        }
      }),
      date: moment().toISOString(),
    }
    postOrder(order);
    removeAllFromCart([]);
    history.push('/');
  }, [postOrder, cartItems, user]);

  return (
    <>
      <div className={css.containerPage}>
        <div className={css.title}>
          Datos de facturación
				</div>
        <div className={css.containerForm}>
          <div className={css.left}>
            <div className={css.clientDates}>
              Cliente:
							<div>
                <div className={css.name}>
                  {`Nombre: ${user.name}`}
                </div>
                <div className={css.lastName}>
                  {`Apellido: ${user.lastName}`}
                </div>
                <div className={css.dni}>
                  {`Dni: ${user.dni}`}
                </div>
                <div className={css.email}>
                  {`Email: ${user.email}`}
                </div>
              </div>
            </div>
          </div>
          <div className={css.payment} onClick={() => onSubmit()}>
            <div id='mercadoForm'>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Order;