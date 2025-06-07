import React from 'react';
import { Link } from 'react-router-dom';
import { Microscope, ArrowRight } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="bg-gradient-to-br from-blue-50 to-blue-100 py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 lg:pr-12 mb-10 lg:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-4 leading-tight">
              Deteksi Dini Tuberkulosis <span className="text-red-600">Secara Digital</span>
            </h1>
            <p className="text-lg text-gray-700 mb-8">
              Lakukan pemeriksaan awal untuk mendeteksi gejala-gejala TB paru-paru dengan cepat, 
              mudah, dan akurat melalui kuesioner yang dikembangkan oleh para ahli kesehatan.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                to="/detection" 
                className="bg-blue-800 hover:bg-blue-900 text-white font-medium py-3 px-6 rounded-lg flex items-center justify-center transition-all duration-300"
              >
                Mulai Deteksi
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link 
                to="/education" 
                className="bg-white hover:bg-gray-100 text-blue-800 font-medium py-3 px-6 rounded-lg border border-blue-800 flex items-center justify-center transition-all duration-300"
              >
                Pelajari Tentang TB
              </Link>
            </div>
          </div>
          <div className="lg:w-1/2 relative">
            <div className="relative z-10 bg-white p-4 rounded-2xl shadow-xl">
              <img 
                src= "/assets/IMG_20250607_171438.jpg"
                alt="Doctor examining lung x-ray" 
                className="w-full h-auto rounded-xl"
              />
              <div className="absolute -bottom-4 -right-4 bg-blue-800 text-white p-4 rounded-lg flex items-center">
                <Microscope className="mr-2 h-5 w-5" />
                <span className="font-medium">Deteksi Dini Selamatkan Nyawa</span>
              </div>
            </div>
            <div className="absolute top-1/4 -left-6 w-20 h-20 bg-red-500 rounded-full opacity-20 animate-pulse"></div>
            <div className="absolute bottom-1/3 -right-6 w-12 h-12 bg-blue-500 rounded-full opacity-20 animate-pulse delay-700"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;