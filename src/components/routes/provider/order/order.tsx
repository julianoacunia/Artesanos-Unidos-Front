import React, { useEffect } from 'react'
import css from './order.module.css';
import { ReduxProps } from '.';
import Paper from '@material-ui/core/Paper';

const Order: React.FC<ReduxProps> = (props) => {
  const {
    selectedOrder,
    getOrders,
  } = props;

  useEffect(() => {
    getOrders();
  }, [getOrders])

  return (
    <>
      <div className={css.container}>
        <div className={css.form}>
          <h4 className={css.title}>Detalle de orden</h4>
          <Paper className={css.paper}>
            <div className={css.formContainer}>
              <div className={css.orderDates}>
                {`Cliente: ${selectedOrder.client.name} ${selectedOrder.client.lastName}`}
              </div>
              <div className={css.orderDates}>
                {`Dni: ${selectedOrder.client.dni}`}
              </div>
              <div className={css.orderDates}>
                {`Email: ${selectedOrder.client.email}`}
              </div>
              <div className={css.orderDates}>
                Productos:
            </div>
              <div>
                {selectedOrder.products.map((product: any) => {
                  return (
                    <div className={css.containerProducts}>
                      <div className={css.orderDates}>
                        {`${product.name} x${product.quantity} = $${product.price * product.quantity} `}
                      </div>
                    </div>
                  )
                })
                }
              </div>
            </div>
          </Paper>
        </div>
      </div>
    </>
  );
};

export default Order;