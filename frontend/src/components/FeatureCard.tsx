import React from 'react';
import { Link } from 'react-router-dom';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  link: string;
  color: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon: Icon, title, description, link, color }) => {
  return (
    <Link to={link} className="group">
      <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 h-full border-t-4 border-transparent hover:border-t-4 hover:border-t-blue-700">
        <div className={`${color} rounded-full p-3 inline-block mb-4 group-hover:scale-110 transition-transform duration-300`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
        <h3 className="text-xl font-semibold mb-2 text-gray-800">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </Link>
  );
};

export default FeatureCard;