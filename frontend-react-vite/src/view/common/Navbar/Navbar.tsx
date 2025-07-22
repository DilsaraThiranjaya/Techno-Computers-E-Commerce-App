import { Link, useLocation } from 'react-router-dom';
import { Home, LogIn, UserPlus, ShoppingCart, User, Package, ShoppingBasket, Leaf, Info, Phone } from 'lucide-react';
import { useEffect, useState } from 'react';

export function Navbar() {
    const [username, setUsername] = useState<string | null>(null);
    const [role, setRole] = useState<string | null>(null);
    const location = useLocation();

    useEffect(() => {
        // Load from localStorage when component mounts
        const storedUsername = localStorage.getItem("username");
        const storedRole = localStorage.getItem("role");

        setUsername(storedUsername);
        setRole(storedRole);
    }, []);

    const isActive = (path: string) => location.pathname === path;

    const logout = () => {
        localStorage.removeItem("username");
        localStorage.removeItem("role");
        setUsername(null);
        setRole(null);
        // You might want to add redirect logic here
    };

    if (username && role) {
        // Admin Navbar
        if (role === 'admin') {
            return (
                <header className="bg-blue-900 text-white py-3">
                    <div className="container mx-auto px-4">
                        <div className="flex items-center justify-between">
                            <Link to="/admin-panel" className="flex items-center space-x-2">
                                <img src="/src/assets/logo/Techno-logo.png" alt="Logo" className="h-8 w-8" />
                                <span className="text-xl font-bold">Techno Computers Admin</span>
                            </Link>

                            <nav className="hidden md:flex items-center space-x-6">
                                <Link
                                    to="/admin-panel"
                                    className={`flex items-center space-x-1 px-3 py-2 rounded transition-colors ${
                                        isActive('/admin-panel') ? 'bg-blue-800' : 'hover:bg-blue-800'
                                    }`}
                                >
                                    <Home className="h-4 w-4" />
                                    <span>Dashboard</span>
                                </Link>
                                <Link
                                    to="/manage-products"
                                    className={`flex items-center space-x-1 px-3 py-2 rounded transition-colors ${
                                        isActive('/manage-products') ? 'bg-blue-800' : 'hover:bg-blue-800'
                                    }`}
                                >
                                    <Package className="h-4 w-4" />
                                    <span>Products</span>
                                </Link>
                                <Link
                                    to="/manage-orders"
                                    className={`flex items-center space-x-1 px-3 py-2 rounded transition-colors ${
                                        isActive('/manage-orders') ? 'bg-blue-800' : 'hover:bg-blue-800'
                                    }`}
                                >
                                    <ShoppingBasket className="h-4 w-4" />
                                    <span>Orders</span>
                                </Link>
                                <Link
                                    to="/manage-categories"
                                    className={`flex items-center space-x-1 px-3 py-2 rounded transition-colors ${
                                        isActive('/manage-categories') ? 'bg-blue-800' : 'hover:bg-blue-800'
                                    }`}
                                >
                                    <Leaf className="h-4 w-4" />
                                    <span>Categories</span>
                                </Link>
                            </nav>

                            <div className="flex items-center space-x-4">
                                <div className="relative group">
                                    <button className="flex items-center space-x-2 p-2 hover:bg-blue-800 rounded transition-colors">
                                        <User className="h-5 w-5" />
                                        <span className="hidden md:block">{username}</span>
                                    </button>

                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                                        <Link
                                            to="/admin-profile"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        >
                                            Profile
                                        </Link>
                                        <button
                                            onClick={logout}
                                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        >
                                            Logout
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>
            );
        }

        // Customer Navbar
        return (
            <header className="bg-blue-900 text-white py-3">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between">
                        <Link to="/" className="flex items-center space-x-2">
                            <img src="/src/assets/logo/Techno-logo.png" alt="Logo" className="h-8 w-8" />
                            <span className="text-xl font-bold">Techno Computers</span>
                        </Link>

                        <nav className="hidden md:flex items-center space-x-6">
                            <Link
                                to="/"
                                className={`flex items-center space-x-1 px-3 py-2 rounded transition-colors ${
                                    isActive('/') ? 'bg-blue-800' : 'hover:bg-blue-800'
                                }`}
                            >
                                <Home className="h-4 w-4" />
                                <span>Home</span>
                            </Link>
                            <Link
                                to="/shop"
                                className={`flex items-center space-x-1 px-3 py-2 rounded transition-colors ${
                                    isActive('/shop') ? 'bg-blue-800' : 'hover:bg-blue-800'
                                }`}
                            >
                                <Leaf className="h-4 w-4" />
                                <span>Shop</span>
                            </Link>
                            <Link
                                to="/about"
                                className={`flex items-center space-x-1 px-3 py-2 rounded transition-colors ${
                                    isActive('/about') ? 'bg-blue-800' : 'hover:bg-blue-800'
                                }`}
                            >
                                <Info className="h-4 w-4" />
                                <span>About</span>
                            </Link>
                            <Link
                                to="/contact"
                                className={`flex items-center space-x-1 px-3 py-2 rounded transition-colors ${
                                    isActive('/contact') ? 'bg-blue-800' : 'hover:bg-blue-800'
                                }`}
                            >
                                <Phone className="h-4 w-4" />
                                <span>Contact</span>
                            </Link>
                        </nav>

                        <div className="flex items-center space-x-4">
                            <Link
                                to="/shopping-cart"
                                className="relative p-2 hover:bg-blue-800 rounded transition-colors"
                            >
                                <ShoppingCart className="h-6 w-6" />
                                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  0 {/* You can make this dynamic */}
                </span>
                            </Link>

                            <div className="relative group">
                                <button className="flex items-center space-x-2 p-2 hover:bg-blue-800 rounded transition-colors">
                                    <User className="h-5 w-5" />
                                    <span className="hidden md:block">{username}</span>
                                </button>

                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                                    <Link
                                        to="/profile"
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                        Profile
                                    </Link>
                                    <Link
                                        to="/my-orders"
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                        My Orders
                                    </Link>
                                    <button
                                        onClick={logout}
                                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                        Logout
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        );
    }

    // Guest Navbar (not logged in)
    return (
        <header className="bg-blue-900 text-white py-3">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between">
                    <Link to="/" className="flex items-center space-x-2">
                        <img src="/src/assets/logo/Techno-logo.png" alt="Logo" className="h-8 w-8" />
                        <span className="text-xl font-bold">Techno Computers</span>
                    </Link>

                    <nav className="hidden md:flex items-center space-x-6">
                        <Link
                            to="/"
                            className={`flex items-center space-x-1 px-3 py-2 rounded transition-colors ${
                                isActive('/') ? 'bg-blue-800' : 'hover:bg-blue-800'
                            }`}
                        >
                            <Home className="h-4 w-4" />
                            <span>Home</span>
                        </Link>
                        <Link
                            to="/about"
                            className={`flex items-center space-x-1 px-3 py-2 rounded transition-colors ${
                                isActive('/about') ? 'bg-blue-800' : 'hover:bg-blue-800'
                            }`}
                        >
                            <Info className="h-4 w-4" />
                            <span>About</span>
                        </Link>
                        <Link
                            to="/contact"
                            className={`flex items-center space-x-1 px-3 py-2 rounded transition-colors ${
                                isActive('/contact') ? 'bg-blue-800' : 'hover:bg-blue-800'
                            }`}
                        >
                            <Phone className="h-4 w-4" />
                            <span>Contact</span>
                        </Link>
                    </nav>

                    <div className="flex items-center space-x-4">
                        <Link
                            to="/login"
                            className={`flex items-center space-x-1 px-3 py-2 rounded transition-colors ${
                                isActive('/login') ? 'bg-blue-800' : 'hover:bg-blue-800'
                            }`}
                        >
                            <LogIn className="h-4 w-4" />
                            <span>Login</span>
                        </Link>
                        <Link
                            to="/signup"
                            className={`flex items-center space-x-1 px-3 py-2 rounded transition-colors ${
                                isActive('/signup') ? 'bg-blue-800' : 'hover:bg-blue-800'
                            }`}
                        >
                            <UserPlus className="h-4 w-4" />
                            <span>Sign Up</span>
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
}