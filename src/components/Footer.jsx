import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";

function Footer() {
  return (
   <footer className="bg-gray-900 text-gray-300">

      <div className="max-w-7xl mx-auto px-6 py-16">

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Company */}

          <div>

            <h2 className="text-3xl font-extrabold text-white">
              Rojul
              <span className="text-[#1495CC]">Tot</span>
            </h2>

            <p className="mt-4 leading-7 text-gray-400">
              We Listen. Plan. Build.
              <br /><br />
              Providing reliable construction machinery,
              architectural drawings, and quality construction
              solutions for residential and commercial projects.
            </p>

          </div>
           {/* Quick Links */}

          <div>

            <h3 className="text-xl font-bold text-white mb-5">
              Quick Links
            </h3>

            <div className="flex flex-col space-y-3">

              <Link to="/" className="hover:text-[#1495CC]">
                Home
              </Link>

              <Link to="/about" className="hover:text-[#1495CC]">
                About
              </Link>

              <Link to="/products" className="hover:text-[#1495CC]">
                Products
              </Link>

              <Link to="/gallery" className="hover:text-[#1495CC]">
                Gallery
              </Link>

              <Link to="/contact" className="hover:text-[#1495CC]">
                Contact
              </Link>

            </div>

          </div>
          {/* Services */}

          <div>

            <h3 className="text-xl font-bold text-white mb-5">
              Services
            </h3>

            <div className="space-y-3">

              <p>Machine Hire</p>

              <p>Architectural Drawings</p>

              <p>Construction Services</p>

              <p>Project Consultation</p>

            </div>

          </div>

          {/* Contact */}

          <div>

            <h3 className="text-xl font-bold text-white mb-5">
              Contact
            </h3>

            <div className="space-y-4">

              <div className="flex items-center gap-3">
                <Phone className="text-[#1495CC]" size={18} />
                <span>+254 700 123 456</span>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="text-[#1495CC]" size={18} />
                <span>info@rojultot.com</span>
              </div>

              <div className="flex items-center gap-3">
                <MapPin className="text-[#1495CC]" size={18} />
                <span>Nairobi, Kenya</span>
              </div>

            </div>

            {/* Socials */}

            <div className="flex gap-4 mt-8">

              <a href="#">
                <FaFacebookF className="hover:text-[#1495CC]" />
              </a>

              <a href="#">
                <FaInstagram className="hover:text-[#1495CC]" />
              </a>

              <a href="#">
                <FaLinkedinIn className="hover:text-[#1495CC]" />
              </a>

            </div>

          </div>

        </div>

      </div>

      {/* Bottom */}

      <div className="border-t border-gray-800">

        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">

          <p>
            © 2026 RojulTot. All rights reserved.
          </p>

          <p className="mt-3 md:mt-0">
            We Listen. Plan. Build.
          </p>

        </div>

      </div>

          


         
    </footer>
  );
}

export default Footer;