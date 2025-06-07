import axios from 'axios';
import React, { useState } from 'react';
import { useTBDetection } from '../context/TBDetectionContext';
import { useNavigate } from 'react-router-dom';
import { AlertCircle, CheckCircle, ChevronLeft, ChevronRight } from 'lucide-react';


const questions = [
  { id: 'CO', question: 'Bagaimana kondisi batuk Anda?', infoText: 'Cough (Batuk)' },
  { id: 'NS', question: 'Bagaimana kondisi keringat malam Anda?', infoText: 'Night sweats (Keringat malam)' },
  { id: 'BD', question: 'Bagaimana kondisi kesulitan bernapas Anda?', infoText: 'Difficulty in Breathing (Sulit bernapas)' },
  { id: 'FV', question: 'Bagaimana kondisi demam Anda?', infoText: 'Fever (Demam)' },
  { id: 'CP', question: 'Bagaimana kondisi nyeri dada Anda?', infoText: 'Chest Pain (Nyeri dada)' },
  { id: 'SP', question: 'Bagaimana kondisi dahak Anda?', infoText: 'Sputum (Dahak)' },
  { id: 'LP', question: 'Bagaimana kondisi kehilangan kesenangan Anda?', infoText: 'Loss of pleasure (Kehilangan kesenangan)' },
  { id: 'CH', question: 'Bagaimana kondisi menggigil Anda?', infoText: 'Chills (Menggigil)' },
  { id: 'LC', question: 'Bagaimana kondisi konsentrasi Anda?', infoText: 'Lack of concentration (Konsentrasi menurun)' },
  { id: 'IR', question: 'Bagaimana kondisi iritasi Anda?', infoText: 'Irritation (Iritasi)' },
  { id: 'LA', question: 'Bagaimana kondisi nafsu makan Anda?', infoText: 'Loss of appetite (Nafsu makan menurun)' },
  { id: 'LE', question: 'Bagaimana kondisi energi Anda?', infoText: 'Loss of energy (Energi menurun)' },
  { id: 'LN', question: 'Apakah Anda mengalami pembesaran kelenjar getah bening?', infoText: 'Lymph Node Enlargement (Pembesaran KGB)' },
  { id: 'SB', question: 'Bagaimana tekanan darah sistolik Anda?', infoText: 'Systolic Blood Pressure (Tekanan darah sistolik)' },
  { id: 'BMI', question: 'Berapa perkiraan nilai BMI Anda?', infoText: 'Body Mass Index (BMI)' },
  { id: 'IS', question: 'Bagaimana kondisi imunitas Anda?', infoText: 'Immune Suppression (Penurunan imun)' },
];

type AnswerType = 'ringan' | 'sedang' | 'parah' | 'berdarah' | 'tidakBerwarna' | 'hijau' | null;

const mapAnswerToNumber = (questionId: string, answer: AnswerType): number => {
  if (answer === null || answer === undefined) return 0;

  // Sputum: 'berdarah' = 0, 'tidakBerwarna' = 1, 'hijau' = 2
  if (questionId === 'SP') {
    switch (answer) {
      case 'berdarah':
        return 0;
      case 'tidakBerwarna':
        return 1;
      case 'hijau':
        return 2;
      default:
        return 0;
    }
  }

  // Semua fitur lain: 'ringan' = 0, 'sedang' = 1, 'parah' = 2
  switch (answer) {
    case 'ringan':
      return 0;
    case 'sedang':
      return 1;
    case 'parah':
      return 2;
    default:
      return 0;
  }
};

const QuestionnaireForm: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, AnswerType>>({});
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const [riskLevel, setRiskLevel] = useState<'low' | 'high' | null>(null);
  const [loading, setLoading] = useState(false);
  const { addDetectionResult } = useTBDetection();
  const navigate = useNavigate();

  const handleAnswer = (answer: AnswerType) => {
    const currentQuestionId = questions[currentQuestionIndex].id;
    
    setAnswers(prev => ({
      ...prev,
      [currentQuestionId]: answer
    }));
    
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      calculateResult();
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

const calculateResult = async () => {
  setLoading(true);
  const fitur = questions.map(q => mapAnswerToNumber(q.id, answers[q.id]));
  try {
    const res = await axios.post('https://tbdetector-production.up.railway.app/predict', { fitur });
    const prediction = res.data.hasil_prediksi;
    const probability = res.data.nilai_probabilitas;

    const calcScore = Math.round(probability * 100);
    const calcRiskLevel: 'low' | 'high' = prediction === 'Ya' ? 'high' : 'low';

    const symptoms = Object.entries(answers)
      .filter(([, value]) => value !== null)
      .map(([key]) => {
        const q = questions.find(q => q.id === key);
        return q ? q.question : key;
      });

    setRiskLevel(calcRiskLevel);
    setScore(calcScore);

    addDetectionResult({
      riskLevel: calcRiskLevel,
      score: calcScore,
      symptoms,
    });
    setShowResult(true);
  } catch (err) {
    console.error('Gagal melakukan prediksi:', err);
    alert('Terjadi kesalahan saat menghubungkan ke sistem prediksi. Silakan coba lagi.');
  } finally {
    setLoading(false);
  }
};

  const handleCompleteDetection = () => {
    navigate('/history');
  };

  const currentQuestion = questions[currentQuestionIndex];

  if (showResult) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl mx-auto">
        <div className="mb-6 text-center">
          <div className={`
            inline-flex items-center justify-center p-2 rounded-full mb-4
            ${riskLevel === 'high' ? 'bg-red-100' : 'bg-green-100'}
          `}>
            <AlertCircle className={`h-10 w-10 ${
              riskLevel === 'high' ? 'text-red-500' : 'text-green-500'
            }`} />
          </div>
          <h2 className="text-2xl font-bold mb-2">Hasil Deteksi TB</h2>
          <div className={`text-lg font-semibold ${
            riskLevel === 'high' ? 'text-red-600' : 'text-green-600'
          }`}>
            {riskLevel === 'high' ? 'Risiko Tinggi' : 'Risiko Rendah'}
          </div>
          <div className="mt-4 bg-gray-100 rounded-full h-4 overflow-hidden">
            <div 
              className={`h-full ${
                riskLevel === 'high' ? 'bg-red-500' : 'bg-green-500'
              }`}
              style={{ width: `${score}%` }}
            ></div>
          </div>
          <div className="text-sm text-gray-500 mt-1">Skor: {score}/100</div>
        </div>
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">Rekomendasi:</h3>
          {riskLevel === 'high' ? (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
              <p className="text-red-700">
                Berdasarkan hasil model, Anda memiliki risiko tinggi TB paru-paru.
                <strong> Segera kunjungi fasilitas kesehatan terdekat untuk pemeriksaan lebih lanjut.</strong>
              </p>
            </div>
          ) : (
            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
              <p className="text-green-700">
                Berdasarkan hasil model, Anda memiliki risiko rendah TB paru-paru.
                <strong> Tetap perhatikan kesehatan Anda dan lakukan pemeriksaan rutin.</strong>
              </p>
            </div>
          )}
        </div>
        <div className="mt-6">
          <button
            onClick={handleCompleteDetection}
            className="w-full bg-blue-800 hover:bg-blue-900 text-white font-medium py-3 px-4 rounded-lg flex items-center justify-center"
          >
            <CheckCircle className="mr-2 h-5 w-5" />
            Lihat Riwayat Deteksi
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl mx-auto">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-500">
            Pertanyaan {currentQuestionIndex + 1} dari {questions.length}
          </span>
          <span className="text-sm font-medium text-blue-800">
            {Math.round(((currentQuestionIndex + 1) / questions.length) * 100)}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className="bg-blue-800 h-2.5 rounded-full transition-all duration-300" 
            style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
          ></div>
        </div>
      </div>
      
      <h2 className="text-xl font-semibold mb-6">{currentQuestion.question}</h2>
      
      {currentQuestion.infoText && (
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded mb-6">
          <div className="flex">
            <AlertCircle className="h-5 w-5 text-blue-800 mr-2 flex-shrink-0" />
            <p className="text-blue-700 text-sm">{currentQuestion.infoText}</p>
          </div>
        </div>
      )}
      
      <div className="space-y-3 mb-6">
        {currentQuestion.id === 'SP' ? (
          <>
            <button
              onClick={() => handleAnswer('berdarah')}
              className={`w-full p-4 rounded-lg border text-left transition-all duration-300 ${
                answers[currentQuestion.id] === 'berdarah' 
                  ? 'bg-blue-50 border-blue-500 text-blue-800' 
                  : 'border-gray-300 hover:bg-gray-50'
              }`}
            >
              Berdarah
            </button>
            
            <button
              onClick={() => handleAnswer('tidakBerwarna')}
              className={`w-full p-4 rounded-lg border text-left transition-all duration-300 ${
                answers[currentQuestion.id] === 'tidakBerwarna' 
                  ? 'bg-blue-50 border-blue-500 text-blue-800' 
                  : 'border-gray-300 hover:bg-gray-50'
              }`}
            >
              Tidak Berwarna
            </button>
            
            <button
              onClick={() => handleAnswer('hijau')}
              className={`w-full p-4 rounded-lg border text-left transition-all duration-300 ${
                answers[currentQuestion.id] === 'hijau' 
                  ? 'bg-blue-50 border-blue-500 text-blue-800' 
                  : 'border-gray-300 hover:bg-gray-50'
              }`}
            >
              Hijau
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => handleAnswer('ringan')}
              className={`w-full p-4 rounded-lg border text-left transition-all duration-300 ${
                answers[currentQuestion.id] === 'ringan' 
                  ? 'bg-blue-50 border-blue-500 text-blue-800' 
                  : 'border-gray-300 hover:bg-gray-50'
              }`}
            >
              Ringan
            </button>
            
            <button
              onClick={() => handleAnswer('sedang')}
              className={`w-full p-4 rounded-lg border text-left transition-all duration-300 ${
                answers[currentQuestion.id] === 'sedang' 
                  ? 'bg-blue-50 border-blue-500 text-blue-800' 
                  : 'border-gray-300 hover:bg-gray-50'
              }`}
            >
              Sedang
            </button>
            
            <button
              onClick={() => handleAnswer('parah')}
              className={`w-full p-4 rounded-lg border text-left transition-all duration-300 ${
                answers[currentQuestion.id] === 'parah' 
                  ? 'bg-blue-50 border-blue-500 text-blue-800' 
                  : 'border-gray-300 hover:bg-gray-50'
              }`}
            >
              Parah
            </button>
          </>
        )}
      </div>
      
      <div className="flex justify-between mt-8">
        {currentQuestionIndex > 0 ? (
          <button
            onClick={handlePrevious}
            className="flex items-center text-blue-800 hover:text-blue-900"
          >
            <ChevronLeft className="h-5 w-5 mr-1" />
            Sebelumnya
          </button>
        ) : (
          <div></div>
        )}
        
        {currentQuestion.id in answers && (
          <button
            onClick={() => {
              if (currentQuestionIndex < questions.length - 1) {
                setCurrentQuestionIndex(currentQuestionIndex + 1);
              } else {
                calculateResult();
              }
            }}
            className="flex items-center text-blue-800 hover:text-blue-900"
            disabled={loading}
          >
            {loading ? (
      // Spinner SVG, bisa diganti dengan spinner lain sesuai kebutuhan
      <svg className="animate-spin h-5 w-5 mr-2 text-blue-800" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"/>
      </svg>
    ) : (
      <>
        {currentQuestionIndex < questions.length - 1 ? 'Selanjutnya' : 'Lihat Hasil'}
        <ChevronRight className="h-5 w-5 ml-1" />
      </>
    )}
          </button>
        )}
      </div>
    </div>
  );
};

export default QuestionnaireForm;