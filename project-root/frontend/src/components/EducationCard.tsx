import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface EducationCardProps {
  title: string;
  shortDescription: string;
  content: string;
  imageSrc?: string;
}

const EducationCard: React.FC<EducationCardProps> = ({ 
  title, 
  shortDescription, 
  content,
  imageSrc
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{shortDescription}</p>
        
        {imageSrc && (
          <div className="mb-4">
            <img 
              src={imageSrc} 
              alt={title} 
              className="w-full h-48 object-cover rounded-lg"
            />
          </div>
        )}
        
        <div className={`overflow-hidden transition-all duration-500 ${isExpanded ? 'max-h-[1000px]' : 'max-h-0'}`}>
          <div className="prose prose-blue max-w-none mt-4 text-gray-700">
            {content.split('\n').map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>
        </div>
        
        <button
          onClick={toggleExpand}
          className="mt-4 flex items-center text-blue-800 hover:text-blue-900 font-medium focus:outline-none"
        >
          {isExpanded ? (
            <>
              <span>Baca lebih sedikit</span>
              <ChevronUp className="ml-1 h-5 w-5" />
            </>
          ) : (
            <>
              <span>Baca selengkapnya</span>
              <ChevronDown className="ml-1 h-5 w-5" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default EducationCard;