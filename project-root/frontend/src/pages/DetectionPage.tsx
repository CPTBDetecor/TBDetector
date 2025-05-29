import React from 'react';
import QuestionnaireForm from '../components/QuestionnaireForm';
import { Info } from 'lucide-react';

const DetectionPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto mb-10">
          <h1 className="text-3xl font-bold text-center text-blue-900 mb-4">Deteksi Dini TB Paru-paru</h1>
          <p className="text-gray-600 text-center mb-8">
            Jawab beberapa pertanyaan tentang gejala yang Anda alami untuk membantu mendeteksi 
            kemungkinan TB paru-paru. Hasil deteksi ini hanya bersifat skrining awal dan tidak menggantikan 
            diagnosis medis dari profesional kesehatan.
          </p>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8 flex items-start">
            <Info className="text-blue-800 h-5 w-5 mr-3 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-blue-800">
              <p className="font-medium mb-1">Penting untuk diketahui:</p>
              <ul className="list-disc ml-5 space-y-1">
                <li>Jawab semua pertanyaan dengan jujur dan akurat</li>
                <li>Hasil deteksi ini hanya bersifat skrining awal</li>
                <li>Konsultasikan dengan dokter untuk diagnosis medis yang tepat</li>
                <li>Semua data Anda akan disimpan secara aman dan rahasia</li>
              </ul>
            </div>
          </div>
        </div>
        
        <QuestionnaireForm />
      </div>
    </div>
  );
};

export default DetectionPage;