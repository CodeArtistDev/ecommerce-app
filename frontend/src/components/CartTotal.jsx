import React, { useEffect } from 'react'
import useShop from '../hooks/useShop'
import Title from './Title';

const CartTotal = () => {

    const { currency = '$', delivery_fee = 0, getCartAmount, cartItems = {} } = useShop();
    const subTotal = getCartAmount();
    const total = subTotal === 0 ? 0 : subTotal + delivery_fee;

    
    

  return (
    <div className='w-full'>
        <div className="text-2xl">
            <Title text1={'CART'} text2={'TOTALS'} />
        </div>

        <div className="flex flex-col gap-2 mt-2 text-sm">
            <div className="flex justify-between">
                <p>Subtotal</p>
                <p>{currency} {subTotal}.00</p>
            </div>
            <hr />
            <div className="flex justify-between">
                <p>Shipping Fee</p>
                <p>{currency} {delivery_fee}.00</p>
            </div>
            <hr />
            <div className="flex justify-between">
                <b>Total</b>
                <b>{currency} {total}.00</b>
            </div>
        </div>
    </div>
  )
}

export default CartTotal