import React, { useState } from 'react';
import FacilityCard from '../components/FacilityCard';
import { Search, MapPin, Filter, Locate } from 'lucide-react';

// Mock data for health facilities
const facilitiesData = [
  {
    id: 1,
    name: "RSUP Persahabatan",
    address: "Jl. Persahabatan Raya No.1, Jakarta Timur",
    phone: "(021) 4891708",
    distance: "3.2 km",
    type: "Rumah Sakit Pusat",
    services: ["Diagnosis", "Pengobatan", "Perawatan", "Pemantauan"],
    mapUrl: "https://maps.google.com/?q=RSUP+Persahabatan"
  },
  {
    id: 2,
    name: "Puskesmas Jatinegara",
    address: "Jl. Raya Jatinegara Timur No.15, Jakarta Timur",
    phone: "(021) 8191323",
    distance: "1.5 km",
    type: "Puskesmas",
    services: ["Diagnosis", "Pengobatan", "Pemantauan"],
    mapUrl: "https://maps.google.com/?q=Puskesmas+Jatinegara"
  },
  {
    id: 3,
    name: "RS Umum Daerah Budhi Asih",
    address: "Jl. Dewi Sartika No.200, Jakarta Timur",
    phone: "(021) 8000149",
    distance: "4.7 km",
    type: "Rumah Sakit Daerah",
    services: ["Diagnosis", "Pengobatan", "Perawatan", "Konsultasi"],
    mapUrl: "https://maps.google.com/?q=RSUD+Budhi+Asih"
  },
  {
    id: 4,
    name: "Klinik TB Care Sehat",
    address: "Jl. Tebet Barat Dalam Raya No.45, Jakarta Selatan",
    phone: "(021) 8307123",
    distance: "5.3 km",
    type: "Klinik Spesialis",
    services: ["Diagnosis", "Pengobatan", "Konsultasi"],
    mapUrl: "https://maps.google.com/?q=TB+Care+Sehat+Tebet"
  },
  {
    id: 5,
    name: "Puskesmas Tebet",
    address: "Jl. Tebet Timur Dalam Raya No.12, Jakarta Selatan",
    phone: "(021) 8295373",
    distance: "6.1 km",
    type: "Puskesmas",
    services: ["Diagnosis", "Pengobatan", "Pemantauan"],
    mapUrl: "https://maps.google.com/?q=Puskesmas+Tebet"
  },
  {
    id: 6,
    name: "RS Paru Dr. M. Goenawan Partowidigdo",
    address: "Jl. Raya Puncak KM. 83, Cisarua, Bogor",
    phone: "(0251) 8253630",
    distance: "68.5 km",
    type: "Rumah Sakit Spesialis",
    services: ["Diagnosis", "Pengobatan", "Perawatan", "Konsultasi", "Rehabilitasi"],
    mapUrl: "https://maps.google.com/?q=RS+Paru+Dr+M+Goenawan+Partowidigdo"
  }
];

const HealthFacilitiesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('');
  
  // Filter facilities based on search term and facility type
  const filteredFacilities = facilitiesData.filter(facility =>
    (facility.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     facility.address.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (filterType === '' || facility.type === filterType)
  );
  
  // Get unique facility types for filter
  const facilityTypes = Array.from(new Set(facilitiesData.map(facility => facility.type)));
  
  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto mb-10">
          <h1 className="text-3xl font-bold text-center text-blue-900 mb-4">Fasilitas Kesehatan Rujukan TB</h1>
          <p className="text-gray-600 text-center mb-8">
            Temukan fasilitas kesehatan terdekat yang menyediakan layanan diagnosis dan pengobatan TB paru-paru.
          </p>
          
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <div className="relative mb-4">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Cari fasilitas kesehatan atau lokasi..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-grow">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Filter className="h-5 w-5 text-gray-400" />
                </div>
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                >
                  <option value="">Semua Jenis Fasilitas</option>
                  {facilityTypes.map((type, index) => (
                    <option key={index} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              
              <button className="bg-blue-800 hover:bg-blue-900 text-white font-medium py-3 px-4 rounded-lg flex items-center justify-center transition-all duration-300">
                <Locate className="mr-2 h-5 w-5" />
                Gunakan Lokasi Saya
              </button>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFacilities.length > 0 ? (
            filteredFacilities.map(facility => (
              <FacilityCard
                key={facility.id}
                name={facility.name}
                address={facility.address}
                phone={facility.phone}
                distance={facility.distance}
                type={facility.type}
                services={facility.services}
                mapUrl={facility.mapUrl}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-10">
              <MapPin className="h-12 w-12 text-blue-800 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Tidak ada fasilitas yang ditemukan</h3>
              <p className="text-gray-600">
                Coba dengan kata kunci lain atau hapus filter untuk melihat semua fasilitas kesehatan.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HealthFacilitiesPage;