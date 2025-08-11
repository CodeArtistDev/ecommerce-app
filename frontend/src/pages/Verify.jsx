import React from 'react'
import useShop from '../hooks/useShop'
import { useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import axios from 'axios';

const Verify = () => {

    const { navigate, token, clearCart, backendUrl } = useShop();
    const [ searchParams, setSearchParams ] = useSearchParams();

    const success = searchParams.get('success');
    const orderId = searchParams.get('orderId');

    const verifyPayment = async () => {
        try {
            
            if(!token){
                return null;
            }

            const response = await axios.post(backendUrl + '/api/order/verifyStripe', { success, orderId }, { headers: { token }});

            if(response.data.success){
                clearCart();
                navigate('/orders');
            }else {
                navigate('/cart');
            }

        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }

    useEffect(() => {
        verifyPayment();
    }, [ token ])

  return (
    <div>Verify</div>
  )
}

export default Verify