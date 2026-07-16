import { Link } from "react-router-dom";
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  Linkedin,
} from "lucide-react";

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

         
    </footer>
  );
}

export default Footer;