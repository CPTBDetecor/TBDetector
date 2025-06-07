import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Stethoscope, Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <Stethoscope className="h-8 w-8 text-blue-800" />
          <span className="text-xl font-bold text-blue-800">TB<span className="text-red-600">Detector</span></span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link 
            to="/" 
            className={`font-medium ${isActive('/') ? 'text-blue-800' : 'text-gray-600 hover:text-blue-800'}`}
          >
            Beranda
          </Link>
          <Link 
            to="/detection" 
            className={`font-medium ${isActive('/detection') ? 'text-blue-800' : 'text-gray-600 hover:text-blue-800'}`}
          >
            🔎Deteksi
          </Link>
          <Link 
            to="/education" 
            className={`font-medium ${isActive('/education') ? 'text-blue-800' : 'text-gray-600 hover:text-blue-800'}`}
          >
            📖Edukasi
          </Link>
          <Link 
            to="/history" 
            className={`font-medium ${isActive('/history') ? 'text-blue-800' : 'text-gray-600 hover:text-blue-800'}`}
          >
            📁Riwayat
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={toggleMenu} aria-label="Toggle menu">
          {isMenuOpen ? (
            <X className="h-6 w-6 text-blue-800" />
          ) : (
            <Menu className="h-6 w-6 text-blue-800" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav className="md:hidden bg-white py-4 px-4 shadow-inner">
          <div className="flex flex-col space-y-3">
            <Link 
              to="/" 
              className={`font-medium p-2 rounded ${isActive('/') ? 'bg-blue-50 text-blue-800' : 'text-gray-600 hover:bg-blue-50 hover:text-blue-800'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Beranda
            </Link>
            <Link 
              to="/detection" 
              className={`font-medium p-2 rounded ${isActive('/detection') ? 'bg-blue-50 text-blue-800' : 'text-gray-600 hover:bg-blue-50 hover:text-blue-800'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Deteksi
            </Link>
            <Link 
              to="/education" 
              className={`font-medium p-2 rounded ${isActive('/education') ? 'bg-blue-50 text-blue-800' : 'text-gray-600 hover:bg-blue-50 hover:text-blue-800'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Edukasi
            </Link>
            <Link 
              to="/facilities" 
              className={`font-medium p-2 rounded ${isActive('/facilities') ? 'bg-blue-50 text-blue-800' : 'text-gray-600 hover:bg-blue-50 hover:text-blue-800'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Faskes Rujukan
            </Link>
            <Link 
              to="/history" 
              className={`font-medium p-2 rounded ${isActive('/history') ? 'bg-blue-50 text-blue-800' : 'text-gray-600 hover:bg-blue-50 hover:text-blue-800'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Riwayat
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;