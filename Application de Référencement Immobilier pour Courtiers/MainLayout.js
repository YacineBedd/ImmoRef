import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { FiHome, FiUsers, FiLink, FiFolder, FiDollarSign, FiSettings, FiMenu, FiX, FiBell, FiSearch, FiUser } from 'react-icons/fi';

const MainLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className={`bg-white shadow-lg transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-20'} flex flex-col`}>
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
          {sidebarOpen ? (
            <div className="text-xl font-semibold text-primary">RéféImmo</div>
          ) : (
            <div className="text-xl font-semibold text-primary mx-auto">RI</div>
          )}
          <button onClick={toggleSidebar} className="text-gray-500 hover:text-primary">
            {sidebarOpen ? <FiX size={20} /> : <FiMenu size={20} />}
          </button>
        </div>
        <nav className="flex-1 pt-4 pb-4">
          <NavLink to="/" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''} mb-1`}>
            <FiHome className="mr-3" size={20} />
            {sidebarOpen && <span>Tableau de bord</span>}
          </NavLink>
          <NavLink to="/clients" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''} mb-1`}>
            <FiUsers className="mr-3" size={20} />
            {sidebarOpen && <span>Clients</span>}
          </NavLink>
          <NavLink to="/references" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''} mb-1`}>
            <FiLink className="mr-3" size={20} />
            {sidebarOpen && <span>Références</span>}
          </NavLink>
          <NavLink to="/dossiers" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''} mb-1`}>
            <FiFolder className="mr-3" size={20} />
            {sidebarOpen && <span>Dossiers</span>}
          </NavLink>
          <NavLink to="/finances" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''} mb-1`}>
            <FiDollarSign className="mr-3" size={20} />
            {sidebarOpen && <span>Finances</span>}
          </NavLink>
          <div className="border-t border-gray-200 my-4"></div>
          <NavLink to="/profile" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''} mb-1`}>
            <FiSettings className="mr-3" size={20} />
            {sidebarOpen && <span>Paramètres</span>}
          </NavLink>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation */}
        <header className="bg-white shadow-sm h-16 flex items-center justify-between px-6">
          <div className="flex items-center">
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button className="relative p-1 rounded-full text-gray-400 hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary">
              <FiBell size={20} />
              <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-danger"></span>
            </button>
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center">
                <FiUser size={16} />
              </div>
              {sidebarOpen && (
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-700">Courtier Exemple</p>
                  <p className="text-xs text-gray-500">Courtier Immobilier</p>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
