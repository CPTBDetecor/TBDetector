import React from 'react';
import { useTBDetection, DetectionResult } from '../context/TBDetectionContext';
import { 
  Clock, Trash2, ChevronDown, ChevronUp, AlertTriangle, 
  CheckCircle, AlertCircle, Calendar 
} from 'lucide-react';
import { Link } from 'react-router-dom';

const HistoryPage: React.FC = () => {
  const { detectionHistory, clearHistory } = useTBDetection();
  const [expandedResults, setExpandedResults] = React.useState<Record<string, boolean>>({});
  
  const toggleExpand = (id: string) => {
    setExpandedResults(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };
  
  const getRiskColor = (riskLevel: DetectionResult['riskLevel']) => {
    switch (riskLevel) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };
  
  const getRiskIcon = (riskLevel: DetectionResult['riskLevel']) => {
    switch (riskLevel) {
      case 'high':
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case 'medium':
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
      case 'low':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      default:
        return null;
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto mb-10">
          <h1 className="text-3xl font-bold text-center text-blue-900 mb-4">Riwayat Deteksi TB</h1>
          <p className="text-gray-600 text-center mb-8">
            Lihat dan kelola riwayat deteksi TB paru-paru yang telah Anda lakukan sebelumnya.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          {detectionHistory.length > 0 ? (
            <>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800">
                  Deteksi Terakhir ({detectionHistory.length})
                </h2>
                <button
                  onClick={() => {
                    if (window.confirm('Apakah Anda yakin ingin menghapus semua riwayat deteksi?')) {
                      clearHistory();
                    }
                  }}
                  className="flex items-center text-red-600 hover:text-red-800"
                >
                  <Trash2 className="h-5 w-5 mr-1" />
                  Hapus Semua
                </button>
              </div>
              
              <div className="space-y-4">
                {detectionHistory.map(result => (
                  <div 
                    key={result.id} 
                    className="bg-white rounded-lg shadow-md overflow-hidden"
                  >
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center">
                          <Calendar className="h-5 w-5 text-gray-500 mr-2" />
                          <span className="text-gray-700 font-medium">
                            {formatDate(result.date)}
                          </span>
                        </div>
                        <div className={`px-3 py-1 rounded-full border ${getRiskColor(result.riskLevel)} flex items-center`}>
                          {getRiskIcon(result.riskLevel)}
                          <span className="ml-1 font-medium">
                            {result.riskLevel === 'high' ? 'Risiko Tinggi' : 
                             result.riskLevel === 'medium' ? 'Risiko Sedang' : 'Risiko Rendah'}
                          </span>
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-medium text-gray-500">
                            Skor Risiko
                          </span>
                          <span className="text-sm font-medium text-gray-700">
                            {result.score}/100
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${
                              result.riskLevel === 'high' ? 'bg-red-500' : 
                              result.riskLevel === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                            }`}
                            style={{ width: `${result.score}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      {expandedResults[result.id] && (
                        <div className="mt-4 pt-4 border-t border-gray-200">
                          <h4 className="font-medium text-gray-800 mb-2">Gejala yang Dilaporkan:</h4>
                          {result.symptoms.length > 0 ? (
                            <ul className="space-y-2">
                              {result.symptoms.map((symptom, index) => (
                                <li key={index} className="flex items-start">
                                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-blue-800 mt-2 mr-2"></span>
                                  <span className="text-gray-700">{symptom}</span>
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <p className="text-gray-600">Tidak ada gejala yang dilaporkan</p>
                          )}
                        </div>
                      )}
                      
                      <button
                        onClick={() => toggleExpand(result.id)}
                        className="mt-4 flex items-center text-blue-800 hover:text-blue-900 font-medium"
                      >
                        {expandedResults[result.id] ? (
                          <>
                            <span>Sembunyikan Detail</span>
                            <ChevronUp className="ml-1 h-5 w-5" />
                          </>
                        ) : (
                          <>
                            <span>Lihat Detail</span>
                            <ChevronDown className="ml-1 h-5 w-5" />
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <Clock className="h-12 w-12 text-blue-800 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Belum Ada Riwayat Deteksi</h3>
              <p className="text-gray-600 mb-6">
                Anda belum melakukan deteksi TB paru-paru. Lakukan deteksi untuk melihat hasilnya di sini.
              </p>
              <Link
                to="/detection"
                className="bg-blue-800 hover:bg-blue-900 text-white font-medium py-3 px-6 rounded-lg inline-block transition-all duration-300"
              >
                Mulai Deteksi
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HistoryPage;