import React, { useState } from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { assets } from "../assets/assets";
import useShop from "../hooks/useShop";
import { toast } from 'react-toastify';
import axios from "axios";



const PlaceOrder = () => {

  const { navigate, backendUrl, token, cartItems, clearCart,  getCartAmount, delivery_fee, products } = useShop();

  const [ method, setMethod ] = useState('cod');
  const [ formData, setFormData ] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: ''
  })

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormData(data => ({ ...data, [ name ]: value }));

  };


  const initPay  = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: 'Order Payment',
      description: 'Order Payment',
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        console.log(response);
        try {
          const { data } = await axios.post(backendUrl + '/api/order/verifyRazorpay', response, { headers: { token }});
          if(data.success){
            navigate('/orders');
            clearCart();
          }
        } catch (error) {
            console.log(error);
            toast.error(error);
        }
      }

    }
    const rzp = new window.Razorpay(options);
    rzp.open();
  }


  const onSubmitHandler = async (e) => {

    e.preventDefault();

    try {
      let orderItems = [];

      for(const itemId in cartItems){
        for(const size in cartItems[itemId]){
          if(cartItems[itemId][size] > 0){
            const itemInfo = structuredClone(products.find(product => product._id == itemId))
            if(itemInfo){
              itemInfo.size = size;
              itemInfo.quantity = cartItems[itemId][size];
              orderItems.push(itemInfo);
            }
          }
        }

      }


      const orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee
      }


       switch(method){
      case 'cod':
        const response = await axios.post(backendUrl + '/api/order/place', orderData, { headers: { token }});
        if(response.data.success){
          clearCart();
          navigate('/orders');
        }else{
          toast.error(response.data.message);
        }
        break;

      case 'stripe':

        const responseStripe = await axios.post(backendUrl + '/api/order/stripe', orderData, { headers: { token }});
        if(responseStripe.data.success){
          const { session_url } = responseStripe.data;
          window.location.replace(session_url);
        }else{
          toast.error(responseStripe.data.message);
        }
        break;

      case 'razorpay':

        const responseRazorpay = await axios.post(backendUrl + '/api/order/razorpay', orderData, { headers: { token }});
        if(responseRazorpay.data.success){
          initPay(responseRazorpay.data.order)
        }


        break;

      default:
        break;

    }



    } catch (error) {
        console.log(error);
        toast.error(error.message);        
    }

   

  }

  return (
    <form onSubmit={onSubmitHandler}
      className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t border-gray-300
    "
    >
      {/* --------------------Left Side ------------------------ */}
      <div className="flex px-8 flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={"DELIVERY"} text2={"INFORMATION"} />
        </div>
        <div className="flex gap-3">
          <input
            required
            onChange={onChangeHandler}
            name="firstName"
            value={formData.firstName}
            type="text"
            placeholder="First Name"
            className="border border-gray-300 rounded py-1 5 px-3 5 w-full"
          />
          <input
            required
            onChange={onChangeHandler}
            name="lastName"
            value={formData.lastName}
            type="text"
            placeholder="Last Name"
            className="border border-gray-300 rounded py-1 5 px-3 5 w-full"
          />
        </div>
        <input
          required
          onChange={onChangeHandler}
          name="email"
          value={formData.email}
          type="email"
          placeholder="Email address"
          className="border border-gray-300 rounded py-1 5 px-3 5 w-full"
        />
        <input
          required
          onChange={onChangeHandler}
          name="street"
          value={formData.street}
          type="text"
          placeholder="Street"
          className="border border-gray-300 rounded py-1 5 px-3 5 w-full"
        />
        <div className="flex gap-3">
          <input
            required
            onChange={onChangeHandler}
            name="city"
            value={formData.city}
            type="text"
            placeholder="City"
            className="border border-gray-300 rounded py-1 5 px-3 5 w-full"
          />
          <input
            required
            onChange={onChangeHandler}
            name="state"
            value={formData.state}
            type="text"
            placeholder="State"
            className="border border-gray-300 rounded py-1 5 px-3 5 w-full"
          />
        </div>
        <div className="flex gap-3">
            <input
              required
              onChange={onChangeHandler}
              name="zipcode"
              value={formData.zipcode}
              type="number"
              placeholder="Zip Code"
              className="border border-gray-300 rounded py-1 5 px-3 5 w-full"
            />
            <input
              required
              onChange={onChangeHandler}
              name="country"
              value={formData.country}
              type="text"
              placeholder="Country"
              className="border border-gray-300 rounded py-1 5 px-3 5 w-full"
            />
        </div>
          <input
            required
            onChange={onChangeHandler}
            name="phone"
            value={formData.phone}
            type="number"
            placeholder="Phone"
            className="border border-gray-300 rounded py-1 5 px-3 5 w-full"
          />
      </div>
      {/* --------------------Right Side ----------------------- */}
      <div className="mt-10 ">
        <div className="mt-8 min-w-80 px-8 sm:px-0">
          <CartTotal />
        </div>
        <div className="mt-12 px-6 sm:px-0 ">
          <Title text1={'PAYMENT'} text2={'METHOD'}  />
          {/* --------------Payment Method Selection ---------------- */}
          <div className="flex flex-col gap-3 xl:flex-row ">
            <div onClick={() => setMethod('stripe')} className="flex items-center gap-3 border border-gray-400 rounded p-2 px-3 cursor-pointer">
              <p className={`min-w-3 5 h-3 5 border rounded-full ${method === 'stripe' ? 'bg-green-400' : ''}`}></p>
              <img src={assets.stripe_logo} alt="stripe-logo" className="h-5 mx-4" />
            </div>
            <div onClick={() => setMethod('razorpay')} className="flex items-center gap-3 border border-gray-400 rounded p-2 px-3 cursor-pointer">
              <p className={`min-w-3 5 h-3 5 border rounded-full ${method === 'razorpay' ? 'bg-green-400' : ''}`}></p>
              <img src={assets.razorpay_logo} alt="stripe-logo" className="h-5 mx-4" />
            </div>
            <div onClick={() => setMethod('cod')} className="flex items-center gap-3 border border-gray-400 rounded p-2 px-3 cursor-pointer">
              <p className={`min-w-3 5 h-3 5 border rounded-full ${method === 'cod' ? 'bg-green-400' : ''}`}></p>
              <p className="text-gray-500 text-sm font-medium mx-4">CASH ON DELIVERY</p>
            </div>
          </div>

          <div className="w-full text-end mt-8">
            <button type="submit" className="bg-black text-white px-16 py-3 text-sm">PLACE ORDER</button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
