import React from 'react';
import { MapPin, Phone, ExternalLink } from 'lucide-react';

interface FacilityCardProps {
  name: string;
  address: string;
  phone: string;
  distance?: string;
  type: string;
  services: string[];
  mapUrl?: string;
}

const FacilityCard: React.FC<FacilityCardProps> = ({
  name,
  address,
  phone,
  distance,
  type,
  services,
  mapUrl
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-semibold text-gray-800">{name}</h3>
          {distance && (
            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-1 rounded-full">
              {distance}
            </span>
          )}
        </div>
        
        <div className="flex items-start mb-3">
          <MapPin className="h-5 w-5 text-gray-500 mr-2 flex-shrink-0 mt-0.5" />
          <p className="text-gray-600">{address}</p>
        </div>
        
        <div className="flex items-center mb-4">
          <Phone className="h-5 w-5 text-gray-500 mr-2 flex-shrink-0" />
          <p className="text-gray-600">{phone}</p>
        </div>
        
        <div className="mb-4">
          <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-1 rounded-full">
            {type}
          </span>
        </div>
        
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-gray-700 mb-2">Layanan TB:</h4>
          <div className="flex flex-wrap gap-2">
            {services.map((service, index) => (
              <span 
                key={index} 
                className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-1 rounded-full"
              >
                {service}
              </span>
            ))}
          </div>
        </div>
        
        {mapUrl && (
          <a
            href={mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center text-blue-800 hover:text-blue-900"
          >
            Lihat di Google Maps
            <ExternalLink className="ml-1 h-4 w-4" />
          </a>
        )}
      </div>
    </div>
  );
};

export default FacilityCard;