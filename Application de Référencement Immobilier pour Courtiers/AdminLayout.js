import React, { useState, useEffect } from 'react';
import { FiSettings } from 'react-icons/fi';
import { Outlet } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

const AdminLayout = () => {
  const [loading, setLoading] = useState(false);

  return (
    <div className="flex flex-col h-screen bg-gray-100 dark:bg-gray-900">
      {/* En-tête d'administration */}
      <header className="bg-blue-700 dark:bg-blue-900 text-white shadow-md">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <FiSettings className="mr-3" size={24} />
            <h1 className="text-xl font-semibold">Administration ImmoRef</h1>
          </div>
          <NavLink 
            to="/"
            className="text-sm bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-md transition duration-300"
          >
            Retour à l'application
          </NavLink>
        </div>
      </header>

      {/* Contenu principal */}
      <div className="flex flex-1 overflow-hidden">
        {/* Barre latérale d'administration */}
        <aside className="w-64 bg-white dark:bg-gray-800 shadow-md overflow-y-auto">
          <nav className="p-4">
            <div className="mb-6">
              <h2 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                Gestion des paramètres
              </h2>
              <ul className="space-y-2">
                <li>
                  <NavLink 
                    to="/admin/institutions"
                    className={({ isActive }) => 
                      `block px-4 py-2 rounded-md transition duration-200 ${
                        isActive 
                          ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200' 
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`
                    }
                  >
                    Institutions financières
                  </NavLink>
                </li>
                <li>
                  <NavLink 
                    to="/admin/paliers"
                    className={({ isActive }) => 
                      `block px-4 py-2 rounded-md transition duration-200 ${
                        isActive 
                          ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200' 
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`
                    }
                  >
                    Paliers de bonus
                  </NavLink>
                </li>
              </ul>
            </div>
          </nav>
        </aside>

        {/* Contenu de la page */}
        <main className="flex-1 overflow-y-auto p-6">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <Outlet />
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
