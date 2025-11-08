import React from 'react';
import { Link } from 'react-router-dom';

export interface FooterProps {
  className?: string;
}

export const Footer: React.FC<FooterProps> = ({ className = '' }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={`bg-white border-t border-gray-200 mt-auto ${className}`}>
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <img
              src="/brand/Logo-blue.png"
              alt="TrustMe"
              className="h-8 object-contain"
            />
            <p className="text-sm text-gray-600">
              Connecting homeowners with trusted professionals for every job.
            </p>
          </div>

          {/* For Homeowners */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">For Homeowners</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/search" className="text-sm text-gray-600 hover:text-sky-500">
                  Find Professionals
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="text-sm text-gray-600 hover:text-sky-500">
                  How It Works
                </Link>
              </li>
              <li>
                <Link to="/categories" className="text-sm text-gray-600 hover:text-sky-500">
                  Service Categories
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-sm text-gray-600 hover:text-sky-500">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          {/* For Professionals */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">For Professionals</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/join" className="text-sm text-gray-600 hover:text-sky-500">
                  Join as a Pro
                </Link>
              </li>
              <li>
                <Link to="/pro-benefits" className="text-sm text-gray-600 hover:text-sky-500">
                  Benefits
                </Link>
              </li>
              <li>
                <Link to="/pro-dashboard" className="text-sm text-gray-600 hover:text-sky-500">
                  Pro Dashboard
                </Link>
              </li>
              <li>
                <Link to="/resources" className="text-sm text-gray-600 hover:text-sky-500">
                  Resources
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-sm text-gray-600 hover:text-sky-500">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-gray-600 hover:text-sky-500">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-sm text-gray-600 hover:text-sky-500">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-sm text-gray-600 hover:text-sky-500">
                  Blog
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <p className="text-sm text-gray-500">
              © {currentYear} TrustMe. All rights reserved.
            </p>

            {/* Legal Links */}
            <div className="flex items-center space-x-6">
              <Link to="/privacy" className="text-sm text-gray-500 hover:text-sky-500">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-sm text-gray-500 hover:text-sky-500">
                Terms of Service
              </Link>
              <Link to="/cookies" className="text-sm text-gray-500 hover:text-sky-500">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
