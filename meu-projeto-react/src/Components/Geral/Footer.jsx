import { FaWhatsapp } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { FaPinterestP } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaThreads } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
   <section className="bg-white py-8">
        <div className="flex flex-col items-center mx-4 md:mx-8 lg:mx-16 xl:mx-32">
            <div className="py-8 flex items-center justify-center w-full">
                <h1 className="text-3xl font-black bg-gradient-to-r from-[#FF7B00] to-[#FF3700] bg-clip-text text-transparent">123Receitas.com</h1>
            </div>
            <div className="flex items-center gap-4 w-full flex items-center justify-center">
                <div className="w-1/3 h-[1px] bg-[#B4B4B4]"></div>
                <p className="text-3xl font-black italic text-[#B4B4B4]">WEB DEV</p>
                <div className="w-1/3 h-[1px] bg-[#B4B4B4]"></div>
            </div>
            <div className="w-full h-30  flex items-center justify-evenly">
                <div className="w-1/3 flex items-center justify-center">
                    <div className="space-x-3 space-y-2 flex flex-wrap w-60">
                        <div className="rounded-full bg-[#2C2C2C] w-10 h-10 flex items-center justify-center transition-all duration-300 ease-in-out transform hover:scale-110 hover:bg-[#14B632]">
                            <FaWhatsapp className="text-white text-3xl" />
                        </div>
                        <div className="rounded-full bg-[#2C2C2C] w-10 h-10 flex items-center justify-center transition-all duration-300 ease-in-out transform hover:scale-110 hover:bg-[#FF0783]">
                            <FaInstagram className="text-white text-3xl" />
                        </div>
                        <div className="rounded-full bg-[#2C2C2C] w-10 h-10 flex items-center justify-center transition-all duration-300 ease-in-out transform hover:scale-110 hover:bg-[#000000]">
                            <FaTiktok className="text-white text-3xl" />
                        </div>
                        <div className="rounded-full bg-[#2C2C2C] w-10 h-10 flex items-center justify-center transition-all duration-300 ease-in-out transform hover:scale-110 hover:bg-[#426BC3]">
                            <FaFacebookF className="text-white text-3xl" />
                        </div>
                        <div className="rounded-full bg-[#2C2C2C] w-10 h-10 flex items-center justify-center transition-all duration-300 ease-in-out transform hover:scale-110 hover:bg-[#910000]">
                            <FaPinterestP className="text-white text-3xl" />
                        </div>
                        <div className="rounded-full bg-[#2C2C2C] w-10 h-10 flex items-center justify-center transition-all duration-300 ease-in-out transform hover:scale-110 hover:bg-[#ED0202]">
                            <FaYoutube className="text-white text-3xl" />
                        </div>
                        <div className="rounded-full bg-[#2C2C2C] w-10 h-10 flex items-center justify-center transition-all duration-300 ease-in-out transform hover:scale-110 hover:bg-[#000000]">
                            <FaThreads className="text-white text-3xl" />
                        </div>
                        <div className="rounded-full bg-[#2C2C2C] w-10 h-10 flex items-center justify-center transition-all duration-300 ease-in-out transform hover:scale-110 hover:bg-[#000000]">
                            <FaXTwitter className="text-white text-3xl" />
                        </div>
                    </div>
                </div>
                <div className="w-1/3 flex flex-col items-center justify-center flex-wrap space-y-1">
                    <p className="font-black italic text-3xl">APLICAÇÕES</p>
                    <p className="font-light italic text-sm w-2/3">123Receitas.com é uma aplicação completamente gratuita e sem fins lucrativos</p>
                </div>
            </div>
        </div>
   </section>
  );
}
