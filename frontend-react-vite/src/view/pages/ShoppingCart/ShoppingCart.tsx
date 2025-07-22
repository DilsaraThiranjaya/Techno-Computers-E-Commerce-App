import {useSelector} from "react-redux";
import type {RootState} from "../../../store/store.ts";

export function ShoppingCart() {

    const {items} = useSelector((state: RootState) => state.cart)

    return (
        <div className="w-full flex justify-center items-center !px-4">
            {/* Gradient border wrapper */}
            <div className="p-[2px] rounded-2xl bg-gradient-to-r from-cyan-500 to-emerald-500 w-full max-w-screen-2xl h-screen">
                {/* Inner cart container */}
                <div className="w-full h-full bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl overflow-hidden">
                    <table className="min-w-full border-collapse">
                        <thead>
                        <tr>
                            <th className="!px-6 !py-3 bg-cyan-500 text-left text-xs leading-4 font-medium text-gray-100 uppercase tracking-wider">
                                Id
                            </th>
                            <th className="!px-6 !py-3 bg-cyan-500 text-left text-xs leading-4 font-medium text-gray-100 uppercase tracking-wider">
                                Name
                            </th>
                            <th className="!px-6 !py-3 bg-cyan-500 text-left text-xs leading-4 font-medium text-gray-100 uppercase tracking-wider">
                                Unit Price
                            </th>
                            <th className="!px-6 !py-3 bg-cyan-500 text-left text-xs leading-4 font-medium text-gray-100 uppercase tracking-wider">
                                Quantity
                            </th>
                            <th className="!px-6 !py-3 bg-cyan-500 text-left text-xs leading-4 font-medium text-gray-100 uppercase tracking-wider">
                                Total Price
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {items.length === 0 ? (
                            <tr>
                                <td
                                    colSpan={5}
                                    className="h-[500px] !px-6 !py-4 whitespace-nowrap text-center font-semibold text-[1rem] leading-5 text-emerald-500"
                                >
                                    No items in the cart
                                </td>
                            </tr>
                        ) : (
                            items.map((item, index) => (
                                <tr
                                    key={item.product.id}
                                    className={`${
                                        index % 2 === 0 ? 'bg-slate-800' : 'bg-slate-900'
                                    } hover:bg-slate-600 border-b border-emerald-800`}
                                >
                                    <td className="!px-6 !py-4 whitespace-nowrap text-sm leading-5 text-emerald-500">
                                        {item.product.id}
                                    </td>
                                    <td className="!px-6 !py-4 whitespace-nowrap text-sm leading-5 text-emerald-500">
                                        {item.product.name}
                                    </td>
                                    <td className="!px-6 !py-4 whitespace-nowrap text-sm leading-5 text-emerald-500">
                                        {item.product.price} {item.product.currency}
                                    </td>
                                    <td className="!px-6 !py-4 whitespace-nowrap text-sm leading-5 text-emerald-500">
                                        {item.itemCount}
                                    </td>
                                    <td className="!px-6 !py-4 whitespace-nowrap text-sm leading-5 text-emerald-500">
                                        {item.itemCount * item.product.price} {item.product.currency}
                                    </td>
                                </tr>
                            ))
                        )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
