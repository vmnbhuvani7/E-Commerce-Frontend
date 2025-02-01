import { Trash2 } from "lucide-react";
import Image from "next/image";

// components/CartItem.js
const CartItem = ({ item, handleRemove, handleQuantityChange }) => {
  return (
    <div key={item.id} className="flex justify-between items-center p-4 border-b border-gray-200 hover:bg-gray-100">
      <div className="flex items-center gap-4">
        <div className="w-24 h-24 bg-gray-200 rounded-lg overflow-hidden">
          <Image
            height={48}
            width={48}
            src={item.image || "https://fastly.picsum.photos/id/0/5000/3333.jpg?hmac=_j6ghY5fCfSD6tvtcV74zXivkJSPIfR9B8w34XeQmvU"}
            alt={item.name} className="w-full h-full object-cover" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-800">{item.name} {`(₹${item?.price})`}</h2>
          <p className="text-sm text-gray-600">{item.description}</p>
          <div className="flex items-center gap-4 mt-2">
            <button
              className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition duration-200"
              onClick={() => handleRemove(item.id)}
            >
              <Trash2 />
            </button>
            <div className="flex items-center gap-2">
              <button
                className="bg-gray-300 text-gray-700 px-3 py-1 rounded-lg hover:bg-gray-400 transition duration-200"
                onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
              >
                -
              </button>
              <span className="text-lg font-medium">{item.quantity}</span>
              <button
                className="bg-gray-300 text-gray-700 px-3 py-1 rounded-lg hover:bg-gray-400 transition duration-200"
                onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
      <p className="text-lg font-semibold text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
    </div>
  );
};

export default CartItem;
