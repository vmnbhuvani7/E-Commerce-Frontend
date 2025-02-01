import Image from "next/image";

export default function ProductCard({ product, addToCart }) {
  const storedCart = JSON.parse(localStorage.getItem("cart"));
  const addToCartCount = storedCart?.find(data => data?.id === product?._id)
  return (
    <div key={product?._id} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="relative w-full h-48">
        <Image
          src={product?.image}
          alt={product?.name}
          fill
          className="object-cover rounded-t-lg mb-2"
        />
      </div>
      <h2 className="text-xl font-semibold text-gray-800 mb-2 mt-2">{product?.name}</h2>
      <p className="text-gray-600 text-sm mb-2 min-h-[60px]">{product?.description}</p>
      <p className="font-bold text-lg text-gray-900 mb-2">₹{product?.price}</p>
      <p className="text-sm text-gray-600">Stock: {product?.stock}</p>
      <button
        onClick={() => addToCart(product)}
        disabled={product?.stock === 0}
        className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded-lg disabled:bg-gray-400 hover:bg-blue-600 focus:outline-none transition-colors duration-300"
      >
        {product?.stock === 0 ? 'Out of Stock' : 'Add to Cart'} {addToCartCount?.quantity ? `(${addToCartCount?.quantity + 1})` : ''}
      </button>
    </div>
  );
}
