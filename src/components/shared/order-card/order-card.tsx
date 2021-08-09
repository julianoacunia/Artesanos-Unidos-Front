import React from 'react';
import css from './order-card.module.css';
import Button from '../form/button';
import { useHistory } from 'react-router-dom';

interface OrderCardProps {
  order: any,
  cancelCallback: (orderId: string) => void,
}

const OrderCard: React.FC<OrderCardProps> = (props) => {
  const { order, cancelCallback } = props;

  const history = useHistory();

  return (
    <div className={css.container}>
      <div className={css.price}>
        {`Total: $${order.total}`}
      </div>
      <div className={css.date}>
        {`Fecha: ${order.date}`}
      </div>
      <div className={css.status}>
        {`Estado: ${order.status}`}
      </div>
      <div className={css.containerButton}>
        <Button
          styles={css.detailButton}
          text='Ver detalles'
          onClick={() => history.push(`/order-detail/${order._id}`)}
        />
        {order.status !== 'CANCELADA' &&
          <Button
            styles={css.detailButton}
            text='Cancelar'
            onClick={() => cancelCallback(order._id)}
          />
        }
      </div>
    </div>
  )
}

export default OrderCard;