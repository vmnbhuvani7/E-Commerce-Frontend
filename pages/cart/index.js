"use client"
import { useState, useEffect } from 'react';
import { CircleArrowLeft } from 'lucide-react';
import withPrivateRoute from '../../hoc/withPrivateRoute';
import Layout from '../../components/Layout';
import CartItem from '../../components/CartItem';
import CartSummary from '../../components/CartSummary';
import { useAuth } from '../../hooks/useAuth';

const Cart = () => {
  const [cart, setCart] = useState([]);
  const { router, loading, processCheckout } = useAuth();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCart(storedCart);
  }, []);

  const handleCheckout = async () => {
    try {
      await processCheckout(cart);
      router.push('/');
    } catch (err) {
      setError("Checkout failed. Please try again.", err);
    }
  };

  const handleQuantityChange = (id, qty) => {
    const qanChange = cart.map((item) =>
      item.id === id ? { ...item, quantity: Math.max(1, qty) } : item
    )
    setCart(qanChange);
    localStorage.setItem("cart", JSON.stringify(qanChange));

  };

  const handleRemove = (id) => {
    const filterCart = cart.filter((item) => item.id !== id)
    setCart(filterCart);
    localStorage.setItem("cart", JSON.stringify(filterCart));

  };

  return (
    <Layout>
      <div className="container mx-auto p-6">
        <div className='flex'>
          <div className='cursor-pointer'
          onClick={()=> router.push("/")}><CircleArrowLeft className='text-blue-500' /></div>
          <div className='flex text-4xl font-bold mb-6 text-center text-blue-600 w-[95%]'>
            <h1 className="">Your Cart</h1>
          </div>
        </div>

        {/* cart list  */}
        <div>
          {cart.length === 0 && (
            <p className="text-center text-lg text-gray-500">Your cart is empty.</p>
          )}
          {cart?.map((item) => (
            <CartItem key={item.id} item={item}
              handleRemove={handleRemove}
              handleQuantityChange={handleQuantityChange}
            />
          ))}
        </div>

        {/* Cart Summary */}
        {cart.length > 0 && <CartSummary cart={cart} handleCheckout={handleCheckout} loading={loading} />}

      </div>
    </Layout>
  )
}

export default withPrivateRoute(Cart);