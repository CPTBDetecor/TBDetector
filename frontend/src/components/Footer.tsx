import React from 'react';
import { Link } from 'react-router-dom';
import { Stethoscope, Phone, Mail, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-blue-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <Stethoscope className="h-6 w-6 mr-2" />
              <span className="text-xl font-bold">TBDetect<span className="text-red-400">.ai</span></span>
            </div>
            <p className="text-gray-300">
              Sistem deteksi dini Tuberkulosis paru-paru dengan pendekatan digital melalui kuesioner gejala, dan edukasi.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Layanan</h3>
            <ul className="space-y-2">
              <li><Link to="/detection" className="text-gray-300 hover:text-white">Deteksi TB</Link></li>
              <li><Link to="/education" className="text-gray-300 hover:text-white">Edukasi</Link></li>
              <li><Link to="/history" className="text-gray-300 hover:text-white">Riwayat Pemeriksaan</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Kontak</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2" />
                <span>+62 812 3456 7890</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2" />
                <span>medinovaubj@gmail.com</span>
              </li>
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 mt-1" />
                <span>Kota Bekasi, Indonesia</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-blue-800 mt-8 pt-4 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} . Oleh Tim Capstone CC25-CF003.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;