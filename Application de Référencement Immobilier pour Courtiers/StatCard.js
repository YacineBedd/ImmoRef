import React from 'react';
import { FiBarChart2, FiUsers, FiDollarSign, FiClock } from 'react-icons/fi';

const StatCard = ({ title, value, icon, color }) => {
  const getColorClass = (color) => {
    switch (color) {
      case 'primary':
        return 'bg-primary-light bg-opacity-10 text-primary';
      case 'secondary':
        return 'bg-secondary-light bg-opacity-10 text-secondary';
      case 'warning':
        return 'bg-warning-light bg-opacity-10 text-warning';
      case 'danger':
        return 'bg-danger-light bg-opacity-10 text-danger';
      case 'success':
        return 'bg-secondary-light bg-opacity-10 text-secondary-dark';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="card flex items-center p-4 h-full">
      <div className={`p-3 rounded-full ${getColorClass(color)} mr-4`}>
        {icon}
      </div>
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <p className="text-xl font-semibold text-gray-800">{value}</p>
      </div>
    </div>
  );
};

export default StatCard;
