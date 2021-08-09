import React, { useEffect } from 'react';
import { ReduxProps } from '.';
import css from './order-details.module.css';
import Paper from '@material-ui/core/Paper';

const OrderDetails: React.FC<ReduxProps> = (props) => {
  const {
    getOrderById,
    user,
    selectedOrder,
  } = props;

  useEffect(() => {
    getOrderById(user._id);
  }, [getOrderById]);

  console.log('selected order', selectedOrder)
  return (
    <>
      <div className={css.container}>
        <div className={css.form}>
          <h4 className={css.title}>Detalle de la compra:</h4>
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

export default OrderDetails;