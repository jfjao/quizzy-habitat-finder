
import React from 'react';
import { Link } from 'react-router-dom';
import { House } from 'lucide-react';

const Navbar = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="glass border-b border-slate-200/10 backdrop-blur-md">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <Link 
              to="/" 
              className="flex items-center space-x-2 transition-transform duration-300 hover:scale-105"
            >
              <House className="h-6 w-6" />
              <span className="text-xl font-medium tracking-tight">Immobilier</span>
            </Link>
            
            <nav>
              <ul className="flex items-center space-x-8">
                <li>
                  <Link 
                    to="/questionnaire" 
                    className="relative py-2 text-sm font-medium after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
                  >
                    Trouver un bien
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/about" 
                    className="relative py-2 text-sm font-medium after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
                  >
                    À propos
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/contact" 
                    className="rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground transition-all duration-300 hover:shadow-lg"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
