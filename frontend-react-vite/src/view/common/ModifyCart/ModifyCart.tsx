import {useDispatch, useSelector} from "react-redux";
import type {AppDispatch, RootState} from "../../../store/store.ts";
import {decreaseQuantity, increaseQuantity} from "../../../slices/cartSlice.ts";

interface ModifyCartProps {
    data: any
}

export function ModifyCart({data}:ModifyCartProps) {

    const dispatch = useDispatch<AppDispatch>();

    const item = useSelector((state: RootState) => state.cart.items.find(cartItem => cartItem.product.id === data.product.id));

    const increaseItemCount = () => {
        dispatch(increaseQuantity(data.product.id));
    };

    const decreaseItemCount = () => {
        if (item && item?.itemCount > 1) {
            dispatch(decreaseQuantity(data.product.id));
        } else {
            alert("Item count cannot be less than 1");
        }
    };

    return (
        <div className="w-full flex justify-between items-center">
            <button className=" w-10 h-9 !px-3 !py-2 text-sm font-semibold !my-3 text-white bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-[0.5rem] hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/20 hover:transition-all cursor-pointer"
            onClick={decreaseItemCount}>-</button>
            <div className="w-35 h-9 bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-[0.5rem] flex justify-center items-center">
                <span className="w-34 h-8 !px-3 !py-1 flex justify-center items-center text-sm font-semibold !my-3 text-black bg-white rounded-[0.5rem]">{item?.itemCount}</span>
            </div>
            <button className=" w-10 h-9 !px-3 !py-2 text-sm font-semibold !my-3 text-white bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-[0.5rem] hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/20 hover:transition-all cursor-pointer"
            onClick={increaseItemCount}>+</button>
        </div>
    );
}