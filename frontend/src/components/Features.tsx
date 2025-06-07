import React from 'react';
import FeatureCard from './FeatureCard';
import { BookOpen, Stethoscope, Clock } from 'lucide-react';

const Features: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Fitur Utama TB Detector</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Sistem kami menyediakan beberapa fitur untuk membantu Anda mendeteksi 
            dan mengelola risiko TB paru-paru secara komprehensif.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
          <FeatureCard 
            icon={BookOpen}
            title="Edukasi TB"
            description="Pelajari tentang TB paru-paru, gejala, cara pencegahan, dan pengobatannya."
            link="/education"
            color="bg-blue-700"
          />
          <FeatureCard 
            icon={Stethoscope}
            title="Deteksi Cepat"
            description="Kuesioner gejala untuk mendeteksi kemungkinan TB paru-paru."
            link="/detection"
            color="bg-red-600"
          />
          <FeatureCard 
            icon={Clock}
            title="Riwayat Pemeriksaan"
            description="Lacak dan lihat riwayat pemeriksaan TB yang pernah Anda lakukan."
            link="/history"
            color="bg-green-600"
          />
        </div>
      </div>
    </section>
  );
};

export default Features;