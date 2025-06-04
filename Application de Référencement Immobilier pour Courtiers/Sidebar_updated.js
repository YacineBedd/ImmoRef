import React from 'react';
import { NavLink } from 'react-router-dom';
import { FiHome, FiUsers, FiLink, FiFolder, FiDollarSign, FiSettings, FiCalculator } from 'react-icons/fi';

const Sidebar = ({ sidebarOpen }) => {
  return (
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
      <NavLink to="/calculateur" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''} mb-1`}>
        <FiCalculator className="mr-3" size={20} />
        {sidebarOpen && <span>Calculateur</span>}
      </NavLink>
      <div className="border-t border-gray-200 dark:border-gray-700 my-4"></div>
      <NavLink to="/profile" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''} mb-1`}>
        <FiSettings className="mr-3" size={20} />
        {sidebarOpen && <span>Paramètres</span>}
      </NavLink>
    </nav>
  );
};

export default Sidebar;
