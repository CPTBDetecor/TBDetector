import React, { useState } from 'react';
import EducationCard from '../components/EducationCard';
import { Search, BookOpen } from 'lucide-react';

const educationData = [
  {
    id: 1,
    title: 'Apa itu Tuberkulosis (TB) Paru-paru?',
    shortDescription: 'Penyakit menular yang disebabkan oleh bakteri Mycobacterium tuberculosis yang menyerang paru-paru.',
    content: `Tuberkulosis (TB) paru-paru adalah penyakit menular yang disebabkan oleh bakteri Mycobacterium tuberculosis. Bakteri ini terutama menyerang paru-paru, meskipun dapat juga menyerang bagian tubuh lainnya.

TB menyebar melalui udara ketika seseorang dengan TB aktif batuk, bersin, atau berbicara. Infeksi TB dapat terjadi jika Anda menghirup droplet yang mengandung bakteri TB.

TB paru-paru tetap menjadi salah satu penyakit menular yang paling mematikan di dunia. Menurut data WHO, sekitar sepertiga populasi dunia terinfeksi bakteri TB, meskipun sebagian besar infeksi bersifat laten (tidak aktif).

Di Indonesia, TB masih menjadi masalah kesehatan masyarakat yang serius, dengan lebih dari 800.000 kasus baru setiap tahunnya. Indonesia merupakan salah satu negara dengan beban TB tertinggi di dunia.`,
    imageSrc: 'https://images.pexels.com/photos/3786215/pexels-photo-3786215.jpeg'
  },
  {
    id: 2,
    title: 'Gejala TB Paru-paru',
    shortDescription: 'Kenali gejala-gejala umum TB paru-paru seperti batuk berkepanjangan, demam, dan penurunan berat badan.',
    content: `Gejala TB paru-paru dapat berkembang secara perlahan dan mungkin tidak terlihat selama beberapa minggu atau bulan. Gejala-gejala utama TB paru-paru meliputi:

1. Batuk berkepanjangan (lebih dari 2-3 minggu)
2. Batuk dengan dahak, kadang-kadang berdarah
3. Nyeri dada saat bernapas atau batuk
4. Demam yang tidak kunjung sembuh
5. Keringat malam yang berlebihan
6. Kelelahan dan kelemahan
7. Penurunan berat badan yang tidak dapat dijelaskan
8. Kehilangan nafsu makan

Jika Anda mengalami gejala-gejala tersebut, terutama batuk yang berlangsung lebih dari 2 minggu dan/atau batuk berdarah, segera konsultasikan dengan dokter untuk mendapatkan pemeriksaan lebih lanjut.

Penting untuk diingat bahwa beberapa orang dengan TB mungkin tidak menunjukkan gejala apa pun. Ini dikenal sebagai TB laten, di mana bakteri TB ada dalam tubuh tetapi tidak aktif dan tidak menyebabkan gejala.`,
    imageSrc: 'https://images.pexels.com/photos/3902882/pexels-photo-3902882.jpeg'
  },
  {
    id: 3,
    title: 'Diagnosis TB Paru-paru',
    shortDescription: 'Berbagai metode diagnosis TB paru-paru, termasuk tes dahak, rontgen dada, dan tes darah.',
    content: `Diagnosis TB paru-paru melibatkan beberapa metode pemeriksaan yang dilakukan oleh tenaga medis profesional:

1. Pemeriksaan Dahak (BTA): Tes ini memeriksa dahak (lendir yang dikeluarkan saat batuk) di bawah mikroskop untuk mencari bakteri TB. Biasanya diperlukan 2-3 sampel dahak yang dikumpulkan pada waktu yang berbeda.

2. Rontgen Dada (Chest X-ray): Pemeriksaan ini dapat menunjukkan kerusakan paru-paru yang disebabkan oleh TB.

3. Tes Tuberkulin Kulit (Mantoux): Tes ini melibatkan injeksi kecil protein TB di bawah kulit untuk melihat reaksi sistem kekebalan tubuh.

4. Tes Darah (IGRA - Interferon-Gamma Release Assays): Tes darah ini mengukur respons sistem kekebalan tubuh terhadap bakteri TB.

5. Tes Molekuler Cepat (GeneXpert): Tes ini dapat mendeteksi DNA bakteri TB dan resistensi terhadap obat dalam waktu singkat.

6. Kultur Bakteri: Metode definitif untuk mendiagnosis TB, tetapi membutuhkan waktu hingga 8 minggu untuk mendapatkan hasil.

Diagnosis dini dan akurat sangat penting untuk pengobatan TB yang efektif. Jika Anda mengalami gejala TB, segera konsultasikan dengan dokter atau kunjungi fasilitas kesehatan terdekat.`,
    imageSrc: 'https://images.pexels.com/photos/4226219/pexels-photo-4226219.jpeg'
  },
  {
    id: 4,
    title: 'Pengobatan TB Paru-paru',
    shortDescription: 'Informasi tentang regimen pengobatan TB, durasi, dan pentingnya kepatuhan pengobatan.',
    content: `Pengobatan TB paru-paru melibatkan kombinasi beberapa obat anti-TB yang harus diminum selama periode yang cukup panjang. Tujuan pengobatan adalah untuk menyembuhkan pasien, mencegah kematian, mencegah kekambuhan, dan mencegah perkembangan resistensi obat.

Prinsip Dasar Pengobatan TB:

1. Regimen Obat: Pengobatan TB umumnya melibatkan kombinasi 4 obat utama (Isoniazid, Rifampisin, Pirazinamid, dan Etambutol) selama 2 bulan pertama, diikuti dengan 2 obat (Isoniazid dan Rifampisin) selama 4 bulan berikutnya.

2. Durasi Pengobatan: Pengobatan TB paru-paru biasanya berlangsung selama 6 bulan, tetapi dapat diperpanjang hingga 9-12 bulan untuk kasus tertentu.

3. Pengawasan Langsung (DOT - Directly Observed Treatment): Program ini memastikan pasien mengambil obat mereka di bawah pengawasan langsung petugas kesehatan untuk meningkatkan kepatuhan.

4. Kepatuhan Pengobatan: Sangat penting untuk menyelesaikan seluruh regimen pengobatan, bahkan setelah Anda merasa lebih baik. Menghentikan pengobatan terlalu dini dapat menyebabkan kekambuhan dan pengembangan TB yang resistan terhadap obat.

5. Pemantauan Kemajuan: Dokter akan memantau kemajuan Anda melalui pemeriksaan klinis, tes dahak, dan rontgen dada secara berkala.

6. Efek Samping: Beberapa obat TB dapat menyebabkan efek samping seperti mual, muntah, ruam, dan kerusakan hati. Penting untuk melaporkan efek samping apa pun kepada dokter Anda.

TB yang diobati dengan benar hampir selalu dapat disembuhkan. Namun, tanpa pengobatan, TB dapat berakibat fatal.`,
    imageSrc: 'https://images.pexels.com/photos/593451/pexels-photo-593451.jpeg'
  },
  {
    id: 5,
    title: 'Pencegahan TB Paru-paru',
    shortDescription: 'Langkah-langkah untuk mencegah penularan dan infeksi TB paru-paru.',
    content: `Pencegahan TB paru-paru melibatkan beberapa langkah untuk mengurangi risiko terinfeksi bakteri TB atau mencegah perkembangan dari TB laten menjadi TB aktif:

1. Vaksinasi BCG (Bacillus Calmette-Guérin): Vaksin ini dapat memberikan perlindungan terhadap bentuk TB yang parah pada anak-anak, tetapi efektivitasnya bervariasi pada orang dewasa.

2. Pengobatan Infeksi TB Laten: Jika Anda didiagnosis dengan infeksi TB laten, dokter mungkin merekomendasikan pengobatan untuk mencegah berkembangnya menjadi TB aktif.

3. Praktik Kebersihan Respirasi: Tutup mulut dan hidung Anda dengan tisu saat batuk atau bersin, dan buang tisu yang sudah digunakan dengan benar.

4. Ventilasi yang Baik: Pastikan ruangan memiliki ventilasi yang baik, terutama di tempat-tempat dengan kepadatan tinggi.

5. Hindari Kontak Dekat: Jika memungkinkan, hindari kontak dekat dengan orang yang diketahui memiliki TB aktif, terutama dalam tahap awal pengobatan.

6. Pola Hidup Sehat: Menjaga sistem kekebalan tubuh yang kuat melalui pola makan sehat, olahraga teratur, dan istirahat yang cukup.

7. Skrining Rutin: Individu dengan risiko tinggi (seperti petugas kesehatan, pekerja penjara, dan orang yang tinggal dengan pasien TB) harus menjalani skrining TB secara rutin.

8. Kepatuhan Pengobatan: Bagi mereka yang terdiagnosis TB, menyelesaikan regimen pengobatan secara lengkap sangat penting untuk mencegah penyebaran penyakit dan perkembangan resistensi obat.

9. Penggunaan Masker: Pasien TB aktif harus menggunakan masker untuk mencegah penyebaran bakteri melalui udara.

Dengan mengikuti langkah-langkah pencegahan ini, risiko penularan dan perkembangan TB dapat dikurangi secara signifikan.`,
    imageSrc: 'https://images.pexels.com/photos/3786119/pexels-photo-3786119.jpeg'
  }
];

const EducationPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredEducation = educationData.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.shortDescription.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto mb-10">
          <h1 className="text-3xl font-bold text-center text-blue-900 mb-4">Edukasi TB Paru-paru</h1>
          <p className="text-gray-600 text-center mb-8">
            Pelajari tentang TB paru-paru, gejala, diagnosis, pengobatan, dan pencegahannya untuk 
            meningkatkan pengetahuan dan kesadaran tentang penyakit ini.
          </p>
          
          <div className="relative mb-10">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Cari informasi tentang TB..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
        
        {filteredEducation.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredEducation.map(item => (
              <EducationCard
                key={item.id}
                title={item.title}
                shortDescription={item.shortDescription}
                content={item.content}
                imageSrc={item.imageSrc}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-10">
            <BookOpen className="h-12 w-12 text-blue-800 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Tidak ada hasil yang ditemukan</h3>
            <p className="text-gray-600">
              Coba dengan kata kunci lain atau hapus pencarian untuk melihat semua konten edukasi.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EducationPage;