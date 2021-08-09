import React, { useEffect } from 'react';
import { ReduxProps } from '.';
import css from './my-order.module.css';
import OrderCard from '../../../shared/order-card';
import CircularProgress from '@material-ui/core/CircularProgress';

const MyOrders: React.FC<ReduxProps> = (props) => {
  const {
    getOrderById,
    user,
    orderList,
    cancelOrder,
    isFetching,
  } = props;

  useEffect(() => {
    getOrderById(user._id);
  }, [getOrderById]);

  useEffect(() => {
    if (isFetching) {
      getOrderById(user._id);
    }
  }, [isFetching, getOrderById, user._id]);

  return (
    <>
      <div className={css.container}>
        {isFetching ?
          <>
            <CircularProgress className={css.spinner} />
          </>
          :
          <>
            {orderList.map((order: any) => {
              return (
                <OrderCard order={order} cancelCallback={cancelOrder} />
              )
            })}
          </>
        }
      </div>
    </>
  );
};

export default MyOrders;