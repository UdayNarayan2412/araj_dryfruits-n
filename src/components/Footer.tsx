import React from 'react';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';

interface FooterProps {
  onPageChange: (page: string) => void;
}

const Footer: React.FC<FooterProps> = ({ onPageChange }) => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <img 
              src="/images/logo.png" 
              alt="Araj Dry Fruits & Spices" 
              className="h-20 w-auto mb-4 transform hover:scale-105 transition-transform duration-200"
            />
            <p className="text-gray-400 mb-4">
              Premium quality dry fruits and spices, sourced with care and delivered fresh to your doorstep since 1985.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-maroon-400 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-maroon-400 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-maroon-400 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-maroon-400 transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-poppins font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-maroon-400 transition-colors">About Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-maroon-400 transition-colors">Products</a></li>
              <li><a href="#" className="text-gray-400 hover:text-maroon-400 transition-colors">Quality</a></li>
              <li><a href="#" className="text-gray-400 hover:text-maroon-400 transition-colors">Recipes</a></li>
              <li><a href="#" className="text-gray-400 hover:text-maroon-400 transition-colors">Blog</a></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-poppins font-semibold text-lg mb-4">Categories</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-maroon-400 transition-colors">Dry Fruits</a></li>
              <li><a href="#" className="text-gray-400 hover:text-maroon-400 transition-colors">Spices</a></li>
              <li><a href="#" className="text-gray-400 hover:text-maroon-400 transition-colors">Nuts</a></li>
              <li><a href="#" className="text-gray-400 hover:text-maroon-400 transition-colors">Seeds</a></li>
              <li><a href="#" className="text-gray-400 hover:text-maroon-400 transition-colors">Gift Packs</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-poppins font-semibold text-lg mb-4">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-maroon-400" />
                <span className="text-gray-400">11/48-E, Near Apsara Talkies, Hathras Road, Naraich, Agra-282006(U.P.)</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-maroon-400" />
                <span className="text-gray-400">+91 99171 04448</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-maroon-400" />
                <span className="text-gray-400">ankurkaushal0016@gmail.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 Araj Dry Fruits & Spices. All rights reserved. |{' '}
            <button 
              onClick={() => onPageChange('privacy')} 
              className="text-gray-400 hover:text-maroon-400 transition-colors"
            >
              Privacy Policy
            </button>{' '}
            |{' '}
            <button 
              onClick={() => onPageChange('terms')} 
              className="text-gray-400 hover:text-maroon-400 transition-colors"
            >
              Terms of Service
            </button>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;