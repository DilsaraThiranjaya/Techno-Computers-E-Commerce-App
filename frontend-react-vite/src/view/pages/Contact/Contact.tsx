import { useForm } from "react-hook-form";

type FormData = {
    name: string;
    phone: string;
    email: string;
    subject: string;
    message: string;
};

export function Contact() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>();

    const onSubmit = (data: FormData) => {
        console.log("Form data submitted:", data);
        alert(`Submitted your case: ${data.subject}`);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-cyan-500 to-emerald-500 !p-1">
            <div className="w-full max-w-2xl bg-blue-950 rounded-lg shadow-xl !p-6 relative">
                <h2 className="text-4xl font-bold text-center bg-gradient-to-r from-cyan-500 to-emerald-500 bg-clip-text text-transparent !mb-8">
                    Contact Us
                </h2>
                <form onSubmit={handleSubmit(onSubmit)} className="!space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-white font-semibold !mb-1">
                                Name
                            </label>
                            <input
                                type="text"
                                className="w-full border-b border-gray-400 bg-transparent focus:outline-none text-gray-800"
                                {...register("name", {
                                    required: "Name is required",
                                    pattern: {
                                        value: /^[A-Za-z\s]+$/,
                                        message: "Please enter a valid name",
                                    },
                                })}
                            />
                            {errors.name && (
                                <p className="text-red-500 text-sm !mt-1">
                                    {errors.name.message}
                                </p>
                            )}
                        </div>
                        <div>
                            <label className="block text-white font-semibold !mb-1">
                                Phone
                            </label>
                            <input
                                type="text"
                                className="w-full border-b border-gray-400 bg-transparent focus:outline-none text-gray-800"
                                {...register("phone", {
                                    required: "Phone is required",
                                    pattern: {
                                        value: /^\d{10}$/,
                                        message: "Please enter a valid phone number",
                                    },
                                })}
                            />
                            {errors.phone && (
                                <p className="text-red-500 text-sm !mt-1">
                                    {errors.phone.message}
                                </p>
                            )}
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-white font-semibold !mb-1">
                                Email
                            </label>
                            <input
                                type="email"
                                className="w-full border-b border-gray-400 bg-transparent focus:outline-none text-gray-800"
                                {...register("email", {
                                    required: "Email is required",
                                    pattern: {
                                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                        message: "Please enter a valid email",
                                    },
                                })}
                            />
                            {errors.email && (
                                <p className="text-red-500 text-sm !mt-1">
                                    {errors.email.message}
                                </p>
                            )}
                        </div>
                    </div>
                    <div>
                        <label className="block text-white font-semibold !mb-1 !mt-5">
                            Subject
                        </label>
                        <input
                            type="text"
                            className="w-full border-b border-gray-400 bg-transparent focus:outline-none text-gray-800"
                            {...register("subject", {
                                required: "Subject is required",
                                pattern: {
                                    value: /^[A-Za-z\s]+$/,
                                    message: "Please enter a valid subject",
                                },
                            })}
                        />
                        {errors.subject && (
                            <p className="text-red-500 text-sm !mt-1">
                                {errors.subject.message}
                            </p>
                        )}
                    </div>
                    <div>
                        <label className="block text-white font-semibold !mb-1 !mt-5">
                            Message
                        </label>
                        <textarea
                            className="w-full border border-gray-400 rounded-md !p-2 h-32 resize-none focus:outline-none text-gray-800 bg-transparent"
                            {...register("message", {
                                required: "Message is required",
                                pattern: {
                                    value: /^[A-Za-z\s]+$/,
                                    message: "Please enter a valid message",
                                },
                            })}
                        ></textarea>
                        {errors.message && (
                            <p className="text-red-500 text-sm !mt-1">
                                {errors.message.message}
                            </p>
                        )}
                    </div>
                    <button
                        type="submit"
                        className="w-full text-white bg-gradient-to-r from-cyan-500 to-emerald-500 hover:bg-slate-900 font-semibold !py-2 rounded-md hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/20 hover:transition-all cursor-pointer !mt-5"
                    >
                        Send Message
                    </button>
                </form>
            </div>
        </div>
    );
}
