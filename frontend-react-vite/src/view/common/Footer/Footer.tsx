import { Facebook, Twitter, Instagram, Linkedin, Phone, Mail } from 'lucide-react';

export const Footer = () => {
    return (
        <footer className="bg-slate-900 text-white py-12">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Customer Support</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Contact Us</a></li>
                            <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Help Centre</a></li>
                            <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Returns & Exchanges</a></li>
                            <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Gift Cards</a></li>
                            <li><a href="#" className="text-gray-300 hover:text-white transition-colors">About Marketplace</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4">My Account</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Order Status</a></li>
                            <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Manage Account</a></li>
                            <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Wishlist</a></li>
                            <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Preference Centre</a></li>
                            <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Personal Information Request</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4">Be the first to know</h3>
                        <p className="text-gray-300 mb-4">
                            Sign up to stay in the loop about the hottest deals, coolest new products, and exclusive sales events.
                        </p>
                        <div className="flex">
                            <input
                                type="email"
                                placeholder="Email Address"
                                className="flex-1 px-4 py-2 rounded-l-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button className="bg-blue-600 px-4 py-2 rounded-r-md hover:bg-blue-700 transition-colors">
                                Sign Up
                            </button>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
                        <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                                <Phone className="h-4 w-4" />
                                <span>+94 766 677 409</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Mail className="h-4 w-4" />
                                <span>contact@technocomputers.lk</span>
                            </div>
                        </div>

                        <div className="flex space-x-4 mt-6">
                            <Facebook className="h-6 w-6 text-gray-300 hover:text-white cursor-pointer transition-colors" />
                            <Twitter className="h-6 w-6 text-gray-300 hover:text-white cursor-pointer transition-colors" />
                            <Instagram className="h-6 w-6 text-gray-300 hover:text-white cursor-pointer transition-colors" />
                            <Linkedin className="h-6 w-6 text-gray-300 hover:text-white cursor-pointer transition-colors" />
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
                    <p>&copy; 2025 Dilsara IT Solutions, Inc. All Rights Reserved.</p>
                    <div className="flex justify-center space-x-6 mt-4">
                        <a href="#" className="hover:text-white transition-colors">Terms & Conditions</a>
                        <a href="#" className="hover:text-white transition-colors">Conditions of Use</a>
                        <a href="#" className="hover:text-white transition-colors">Online Policies</a>
                        <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
                        <a href="#" className="hover:text-white transition-colors">Accessibility Policy</a>
                        <a href="#" className="hover:text-white transition-colors">Product Recalls</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};