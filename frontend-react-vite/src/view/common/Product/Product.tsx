import { ShoppingCart, Eye } from 'lucide-react';
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../store/store.ts";
import { addItemToCart } from "../../../slices/cartSlice.ts";
import type { ProductData } from "../../../model/ProductData.ts";
import { ModifyCart } from "../ModifyCart/ModifyCart.tsx";

const images: Record<string, string> = import.meta.glob('../../../assets/products/*', { eager: true, import: 'default' });

type ProductProps = {
    data: ProductData
}

export function Product({ data }: ProductProps) {
    const dispatch = useDispatch<AppDispatch>();
    const item = useSelector((state: RootState) =>
        state.cart.items.find(cartItem => cartItem.product.id === data.id)
    );

    const addToCart = () => {
        dispatch(addItemToCart(data));
    };

    const viewDetails = () => {
        // Implement view details functionality
        console.log("View details for:", data.name);
    };

    return (
        <div className="bg-slate-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="relative">
                <img
                    src={images[`../../../assets/products/${data.img}`]}
                    alt={data.name}
                    className="w-full h-48 object-cover"
                />
                {data.stock === 0 ? (
                    <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-sm font-medium">
                        OUT OF STOCK
                    </div>
                ) : (
                    <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded text-sm font-medium">
                        IN STOCK
                    </div>
                )}
            </div>

            <div className="p-4">
                <h3 className="text-white font-semibold mb-2 line-clamp-2">{data.name}</h3>
                <p className="text-gray-400 text-sm mb-3">{data.category}</p>

                <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold text-blue-400">
                        {data.price} {data.currency}
                    </span>
                </div>

                <div className="flex space-x-2">
                    <button
                        onClick={viewDetails}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors duration-200 flex items-center justify-center space-x-2"
                    >
                        <Eye className="h-4 w-4" />
                        <span>View Details</span>
                    </button>

                    {item ? (
                        <ModifyCart data={{ product: data }} />
                    ) : (
                        <button
                            onClick={addToCart}
                            disabled={data.stock === 0}
                            className={`flex-1 py-2 px-4 rounded-md transition-colors duration-200 flex items-center justify-center space-x-2 ${
                                data.stock > 0
                                    ? 'bg-green-600 hover:bg-green-700 text-white'
                                    : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                            }`}
                        >
                            <ShoppingCart className="h-4 w-4" />
                            <span>Add to Cart</span>
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}