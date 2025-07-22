export function About() {
    return (
        <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-slate-900 to-slate-800 px-6 py-12">
            <div className="max-w-4xl w-full p-[2px] rounded-2xl bg-gradient-to-r from-cyan-500 to-emerald-500">
                <div className="bg-slate-900 rounded-2xl p-10">
                    <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-cyan-500 to-emerald-500 bg-clip-text text-transparent mb-8">
                        About Our Store
                    </h1>
                    <p className="text-gray-300 text-lg leading-relaxed mb-4">
                        Welcome to <span className="font-semibold text-emerald-400">TechVerse</span>, your trusted destination for high-performance computers, accessories, and expert support.
                        With years of industry experience, we’re committed to delivering top-quality products at competitive prices.
                    </p>
                    <p className="text-gray-300 text-lg leading-relaxed mb-4">
                        Whether you're a student, gamer, or business professional, we provide tailored solutions — from custom-built PCs to the latest laptops, monitors, and SSDs.
                        Our team is passionate about technology and dedicated to helping you make the right choice.
                    </p>
                    <p className="text-gray-300 text-lg leading-relaxed mb-4">
                        What makes us different? Reliable after-sales service, nationwide delivery, and exclusive offers you won’t find anywhere else.
                        Join our growing community and experience the future of tech — today.
                    </p>

                    <div className="mt-8 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                        <div>
                            <h2 className="text-xl font-semibold text-cyan-400">Contact Us</h2>
                            <p className="text-gray-400">📍 123 Tech Street, Colombo</p>
                            <p className="text-gray-400">📞 +94 77 123 4567</p>
                            <p className="text-gray-400">✉️ support@techverse.lk</p>
                        </div>
                        <div>
                            <h2 className="text-xl font-semibold text-cyan-400">Opening Hours</h2>
                            <p className="text-gray-400">Mon – Sat: 9.00am – 7.00pm</p>
                            <p className="text-gray-400">Sunday: Closed</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
