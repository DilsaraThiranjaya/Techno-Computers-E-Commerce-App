import { Route, Routes } from "react-router-dom";
import { Home } from '../../pages/Home/Home.tsx';
import { About } from "../../pages/About/About.tsx";
import { Contact } from "../../pages/Contact/Contact.tsx";
import {ShoppingCart} from "../../pages/ShoppingCart/ShoppingCart.tsx";

export function MainContent() {
    return (
        <div className="relative min-h-screen w-full bg-gradient-to-br from-slate-900 to-slate-800">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl"></div>
                <div className="absolute -left-20 bottom-0 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl"></div>
            </div>

            {/* Main content container */}
            <div className="relative z-10 flex min-h-[130vh] flex-col items-center justify-center px-6 py-16 text-white">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/shopping-cart" element={<ShoppingCart />} />
                </Routes>
            </div>
        </div>
    );
}