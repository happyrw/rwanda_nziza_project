import { FaPhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { FooterForm } from "../FooterForm";

const Footer = () => {
    return (
        <footer className='bg-blue-900 rounded-[30px_30px_0_0] relative z-10'>
            <div className='grid grid-cols-1 md:grid-cols-2'>
                <div className="p-4 md:p-20">
                    <div className="flex items-center gap-3">
                        <div className="h-2 w-20 bg-yellow-500" />
                        <p className='text-white font-bold'>Contact Us</p>
                    </div>

                    <div>
                        <p className='text-white font-bold text-xl py-8'>Have questions? <br /> <span className='text-yellow-400'>We&apos;re here to guide your adventure!</span></p>
                        <p className='text-white/90 font-medium'>Discover the best of Rwanda with us! Whether you&apos;re seeking hidden gems or must-see sports, we&apos;re here to guide your adventure every step of the way.</p>
                    </div>

                    <div className="space-y-2 mt-14">
                        <div className="flex items-center gap-4">
                            <p className="w-8 h-8 bg-yellow-500 flex items-center justify-center rounded-full"><FaPhone className="" /></p>
                            <p className="text-white">+250786663069</p></div>
                        <div className="flex items-center gap-4">
                            <p className="w-8 h-8 bg-yellow-500 flex items-center justify-center rounded-full"><MdEmail className="" /></p>
                            <p className="text-white">rwandanziza@gmail.com</p></div>
                        <div className="flex items-center gap-4">
                            <p className="w-8 h-8 bg-yellow-500 flex items-center justify-center rounded-full"><FaLocationDot className="" /></p>
                            <p className="text-white">SH 509, Huye Butare</p></div>
                    </div>
                </div>
                <div className="p-4 md:p-20">
                    <FooterForm />
                </div>
            </div>
            <p className="text-white text-sm text-center py-4">Rwanda Nziza &copy; 2024</p>
        </footer>
    )
}

export default Footer