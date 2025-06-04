import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import InstitutionManagement from './components/admin/InstitutionManagement';
import PalierManagement from './components/admin/PalierManagement';
import AdminLayout from './components/layouts/AdminLayout';

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminLayout />}>
        <Route path="institutions" element={<InstitutionManagement />} />
        <Route path="paliers" element={<PalierManagement />} />
        <Route index element={<AdminDashboard />} />
      </Route>
    </Routes>
  );
};

const AdminDashboard = () => {
  return (
    <div className="p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">Administration ImmoRef</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
          <h3 className="text-lg font-medium text-gray-700 dark:text-gray-200 mb-2">Gestion des institutions financières</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Créez, modifiez ou supprimez les institutions financières et leurs pourcentages de commission associés.
          </p>
          <a 
            href="/admin/institutions" 
            className="inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
          >
            Gérer les institutions
          </a>
        </div>
        
        <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
          <h3 className="text-lg font-medium text-gray-700 dark:text-gray-200 mb-2">Gestion des paliers de bonus</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Définissez les seuils de volume et les pourcentages de bonus associés pour le calcul des commissions.
          </p>
          <a 
            href="/admin/paliers" 
            className="inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
          >
            Gérer les paliers
          </a>
        </div>
      </div>
    </div>
  );
};

export default AdminRoutes;
