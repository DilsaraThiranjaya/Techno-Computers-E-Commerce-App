import {useEffect} from "react";
import {Product} from "../../common/Product/Product.tsx";
import {useDispatch, useSelector} from "react-redux";
import {getAllProducts} from "../../../slices/productsSlice.ts";
import type {AppDispatch, RootState} from "../../../store/store.ts";

export function Home() {
    // const [products, setProducts] = useState<ProductData[]>([]);

    const dispatch = useDispatch<AppDispatch>();

    const {list} = useSelector((state: RootState) => state.products)

    useEffect(() => {
        // const fetchData = async () => {
        //     try {
        //         const response = await fetch('./product-data.json');
        //         const jsonData = await response.json();
        //         setProducts(jsonData);
        //     } catch (error) {
        //         console.error('Error fetching data:', error);
        //     }
        // }
        //
        // fetchData();

        dispatch(getAllProducts())
    }, []);

    return (
        <div>
            <div className="flex flex-wrap gap-2 ml-[1px] !mt-5 !mb-5 justify-center items-center mx-auto">
                {/*<div className="w-70 h-125 mr-2 mb-2 rounded-[0.3rem] flex justify-center items-center bg-gradient-to-r from-cyan-500 to-emerald-500">*/}
                {/*    <div className="w-69 h-124 bg-blue-950 rounded-[0.3rem] flex justify-center items-center mx-auto">*/}
                {/*        <div className="!mx-5 !my-5 flex flex-col justify-center items-center">*/}
                {/*            <img className="w-full !mb-2" src={product1} alt="Laptop" />*/}
                {/*            <h1 className="text-xl font-bold text-center self-start bg-gradient-to-r from-cyan-500 to-emerald-500 bg-clip-text text-transparent !mb-3">ASUS Vivobook X1504V i3 13th Gen</h1>*/}
                {/*            <h3 className="text-yellow-400">138,000 <small>LKR</small></h3>*/}
                {/*            <span className="!px-3 !py-1 text-sm font-semibold !my-3 text-white bg-green-700 rounded-[0.5rem]">In Stock</span>*/}
                {/*            <button className=" w-full !px-3 !py-2 text-sm font-semibold !my-3 text-white bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-[0.5rem] hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/20 hover:transition-all cursor-pointer">Add to Cart</button>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*</div>*/}
                {/*<div className="w-70 h-125 mr-2 mb-2 rounded-[0.3rem] flex justify-center items-center bg-gradient-to-r from-cyan-500 to-emerald-500">*/}
                {/*    <div className="w-69 h-124 bg-blue-950 rounded-[0.3rem] flex justify-center items-center mx-auto">*/}
                {/*        <div className="!mx-5 !my-5 flex flex-col justify-center items-center">*/}
                {/*            <img className="w-full !mb-2" src={product2} alt="Monitor" />*/}
                {/*            <h1 className="text-xl font-bold text-center self-start bg-gradient-to-r from-cyan-500 to-emerald-500 bg-clip-text text-transparent !mb-3">MSI PRO MP275Q 27" IPS Monitor</h1>*/}
                {/*            <h3 className="text-yellow-400">69,000 <small>LKR</small></h3>*/}
                {/*            <span className="!px-3 !py-1 text-sm font-semibold !my-3 text-white bg-red-700 rounded-[0.5rem]">Out of Stock</span>*/}
                {/*            <button className=" w-full !px-3 !py-2 text-sm font-semibold !my-3 text-white bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-[0.5rem] hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/20 hover:transition-all cursor-pointer">Add to Cart</button>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*</div>*/}
                {/*<div className="w-70 h-125 mr-2 mb-2 rounded-[0.3rem] flex justify-center items-center bg-gradient-to-r from-cyan-500 to-emerald-500">*/}
                {/*    <div className="w-69 h-124 bg-blue-950 rounded-[0.3rem] flex justify-center items-center mx-auto">*/}
                {/*        <div className="!mx-5 !my-5 flex flex-col justify-center items-center">*/}
                {/*            <img className="w-full !mb-2" src={product3} alt="Monitor" />*/}
                {/*            <h1 className="text-xl font-bold text-center self-start bg-gradient-to-r from-cyan-500 to-emerald-500 bg-clip-text text-transparent !mb-3">KINGSTON NV2 500GB PCIe Gen 4 x 4 NVMe</h1>*/}
                {/*            <h3 className="text-yellow-400">11,900 <small>LKR</small></h3>*/}
                {/*            <span className="!px-3 !py-1 text-sm font-semibold !my-3 text-white bg-green-700 rounded-[0.5rem]">In Stock</span>*/}
                {/*            <button className=" w-full !px-3 !py-2 text-sm font-semibold !my-3 text-white bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-[0.5rem] hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/20 hover:transition-all cursor-pointer">Add to Cart</button>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*</div>*/}

                {
                    list.map((product) =>  (
                        <Product key={product.id} data={product}/>
                    ))
                }
            </div>
        </div>
    );
}