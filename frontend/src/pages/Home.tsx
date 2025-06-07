import React from 'react';
import Hero from '../components/Hero';
import Features from '../components/Features';
import { Link } from 'react-router-dom';
import { Shield, Users, Activity } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div>
      <Hero />
      <Features />
      
      {/* Statistics Section */}
      <section className="py-16 bg-blue-800 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-2">TB Paru-paru dalam Angka</h2>
            <p className="text-blue-100">
              Tuberkulosis masih menjadi salah satu penyakit menular yang mengancam kesehatan masyarakat Indonesia
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-blue-700 p-6 rounded-lg text-center">
              <div className="text-4xl font-bold mb-2">889.000</div>
              <p className="text-blue-100">Kasus TB di Indonesia per tahun</p>
            </div>
            
            <div className="bg-blue-700 p-6 rounded-lg text-center">
              <div className="text-4xl font-bold mb-2">125.000</div>
              <p className="text-blue-100">Kematian akibat TB setiap tahun</p>
            </div>
            
            <div className="bg-blue-700 p-6 rounded-lg text-center">
              <div className="text-4xl font-bold mb-2">75%</div>
              <p className="text-blue-100">Kasus TB tidak terdiagnosis</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Why Choose Us */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Mengapa Menggunakan TB Detector?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Kami menyediakan solusi komprehensif untuk mendeteksi dan mengelola TB paru-paru
              dengan pendekatan berbasis digital yang mudah diakses.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-6">
              <div className="bg-blue-100 p-4 rounded-full mb-4">
                <Shield className="h-8 w-8 text-blue-800" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Deteksi Dini yang Akurat</h3>
              <p className="text-gray-600">
                Kuesioner gejala kami dikembangkan berdasarkan algoritma yang telah divalidasi oleh para ahli kesehatan.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6">
              <div className="bg-blue-100 p-4 rounded-full mb-4">
                <Users className="h-8 w-8 text-blue-800" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Dikembangkan oleh Tim Capstone CC25-CF003</h3>
              <p className="text-gray-600">
                Sistem kami dirancang berdasarkan "Tuberculosis Dataset for Intelligent and Adaptive Medical Diagnostic System" - MENDELEY DATA
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6">
              <div className="bg-blue-100 p-4 rounded-full mb-4">
                <Activity className="h-8 w-8 text-blue-800" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Pemantauan Berkala</h3>
              <p className="text-gray-600">
                Lacak dan pantau riwayat pemeriksaan Anda secara berkala untuk memastikan kesehatan paru-paru Anda.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-blue-700 to-blue-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Mulai Deteksi TB Sekarang</h2>
          <p className="text-blue-100 max-w-2xl mx-auto mb-8">
            Deteksi dini TB paru-paru sangat penting untuk kesembuhan yang optimal. 
            Lakukan pemeriksaan awal melalui sistem kami sekarang juga.
          </p>
          <Link 
            to="/detection" 
            className="bg-white text-blue-800 hover:bg-blue-100 font-medium py-3 px-8 rounded-lg inline-block transition-all duration-300"
          >
            Mulai Deteksi
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;