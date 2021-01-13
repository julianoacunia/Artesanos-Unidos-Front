import { MERCADOPAGO_SUCCESS , MERCADOPAGO_PENDING} from './types'

export const setMercadoPagoPreferences = (items, payer) => {
  return dispatch => {
      dispatch({
          type: MERCADOPAGO_PENDING
      })
      fetch('http://localhost:5000/api/payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({items, payer})
      })
      .then(res => res.json())
      .then(res => {
        const script = document.createElement('script');
        script.src = 'https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js';
        script.async = true;
        script.setAttribute('data-preference-id',res.id);
        document.getElementById('mercadoForm').appendChild(script)
      }) 
      return dispatch({
        type: MERCADOPAGO_SUCCESS
      })
  }
}
