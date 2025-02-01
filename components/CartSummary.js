const CartSummary = ({ cart, handleCheckout, loading }) => {
    const calculateTotal = () => {
      return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
    };
  
    return (
      <div className="mt-4">
        <div className="flex justify-between text-xl font-bold">
          <span>Total:</span>
          <span>₹{calculateTotal()}</span>
        </div>
        <button
          onClick={handleCheckout}
          className="mt-4 w-full bg-blue-500 text-white py-2 rounded disabled:bg-gray-400 hover:bg-blue-600 transition-colors duration-300"
          disabled={loading}
        >
          {loading ? 'Processing...' : 'Complete Purchase'}
        </button>
      </div>
    );
  };
  
  export default CartSummary;
  