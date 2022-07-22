import React, { useEffect, useState  } from 'react'
import CheckoutProduct from './CheckoutProduct';
import CurrencyFormat from "react-currency-format"
import { getBasketTotal } from './reducer';
import axios from './axios';
import "./Payment.css"
import { Link , useNavigate} from  'react-router-dom' 
import { useStateValue } from './StateProvider'
import { CardElement, useStripe, useElements} from "@stripe/react-stripe-js"
import { db }  from './firebase'
function Payment() {
    const [{basket,user}, dispatch] = useStateValue();  
    const navigate =useNavigate();
    const stripe = useStripe();
    const elements=useElements();
   
   const[succeeded, setSucceeded]= useState(false);
   const[processing,setProcessing] =useState(""); 
   const[error, setError] = useState(null);
   const[disabled , setDisabled ] = useState(true);
   const[clientSecret , setClientSecret] = useState(true);


   useEffect(() => {
    //generate a special stripe secret which allows us to charge a customer
     const getClientSecret = async () => {
            const response = await axios(
              {
                method:'post',
                //stripe expects the total in a currencies subunits
                url :`/payments/create?total=${getBasketTotal(basket) * 100 }`
              });
              setClientSecret(response.data.clientSecret)       
     }

      getClientSecret();
   }, [basket])
    
     console.log('THE SECRET IS >>>', clientSecret)
    
    const handleSubmit = async (event) => {
      //do all the stripe functionality
      event.preventDefault();
      setProcessing(true);

      const payload = await stripe.confirmCardPayment(clientSecret,{
        payment_method: {
          card : elements.getElement(CardElement)
        }
      }).then(({ paymentIntent }) =>{
        //console.log(paymentIntent);
         db
           .collection('users')
           .doc(user?.uid)
           .collection('orders')
           .doc(paymentIntent.id)
           .set({
              basket: basket,
              amount: paymentIntent.amount,
              created: paymentIntent.created
           })


        setSucceeded(true);
        setError(null);
        setProcessing(false);

        dispatch({
          type: 'EMPTY_BASKET'
        })

        navigate('/orders', {replace: true})
      })

    }
    const handleChange = event =>{
      //listen for any changes in card element and dispaly any error as customer type card details
      setDisabled(event.empty) ;
      setError(event.error ? event.error.message  : " ");
   }


    return (
    <div className='payment'>
        <div className='payment__container'>
        <h1>
         Checkout( <Link to="/checkout">{basket?.length} items</Link> )
        </h1>
        {/* payment section  -delivery address */}
           <div className='payment__section'>
             <div className='payment__title'>
                 <h3>Delivery address</h3>
             </div>
              <div className='payment__address'>
              <p>{user?.email}</p>
              <p>123 React Lane</p>
              <p> Los angeles ,CA</p>
              </div>
           </div>

        {/* payment section  - review item */}
            <div className='payment__section'>
               <div className='payment__title'>
                <h3>Review items and delivery</h3>
               </div>
               <div className='payment__items'>
                  {basket.map(item => (
                    <CheckoutProduct
                    id={item.id}
                    title={item.title}
                    image={item.image}
                    price={item.price}
                    rating={item.rating}
                    />
                  )) }
               </div>  
           </div>

        {/* payment section  - payment method */}
           <div className='payment__section'>
             <div className='payment__title'>
               <h3>Payment method</h3> 
             </div>
             <div className='payment__details'>
             
                {/* Stripe functionality */}
                  <form onSubmit={handleSubmit}>
                  <CardElement onChange={handleChange} />
                  <div className='payment__priceContainer'>
                    <CurrencyFormat 
                        renderText={(value) => (
                           <h3> Order Total:{value} </h3>
                     )}
                     decimalScale={2}
                     value={getBasketTotal(basket)} // part of DIY
                     displayType={"text"}
                     thousandSeparator={true}
                     prefix={"₹"}
                   />
                   <button disabled= {processing || disabled || succeeded}>
                   <span>{processing ? <p> Processing </p>: "Buy now"}</span>
                   </button>
                  </div>
                  {error && <div>{error}</div>}
                 </form>
             </div>
          </div>
        </div>
    </div>
  )
}

export default Payment
