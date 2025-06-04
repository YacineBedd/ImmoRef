import React from 'react';
import { FiPlusCircle, FiClock, FiCheckCircle, FiAlertCircle, FiDollarSign, FiFileText } from 'react-icons/fi';
import { Link } from 'react-router-dom';

// Composants
import StatCard from '../components/dashboard/StatCard';
import RecentActivity from '../components/dashboard/RecentActivity';
import DossierStatusChart from '../components/dashboard/DossierStatusChart';
import TaskList from '../components/dashboard/TaskList';

const Dashboard = () => {
  // Données simulées pour la démo
  const stats = [
    { id: 1, title: 'Dossiers actifs', value: '12', icon: <FiFileText />, color: 'primary' },
    { id: 2, title: 'Commissions à recevoir', value: '3 200 $', icon: <FiDollarSign />, color: 'secondary' },
    { id: 3, title: 'Références en attente', value: '3', icon: <FiClock />, color: 'warning' },
    { id: 4, title: 'Dossiers complétés', value: '24', icon: <FiCheckCircle />, color: 'success' },
  ];

  const activities = [
    { id: 1, title: 'Approbation conditionnelle', description: 'Dossier #12345 - Client Dupont', time: 'Il y a 2 heures', icon: <FiCheckCircle className="text-secondary" /> },
    { id: 2, title: 'Nouvelle référence acceptée', description: 'Client Martin - Courtier Tremblay', time: 'Il y a 5 heures', icon: <FiPlusCircle className="text-primary" /> },
    { id: 3, title: 'Documents reçus', description: 'Dossier #12346 - Client Tremblay', time: 'Hier', icon: <FiFileText className="text-primary" /> },
    { id: 4, title: 'Approbation finale', description: 'Dossier #12340 - Client Lavoie', time: 'Il y a 2 jours', icon: <FiCheckCircle className="text-secondary" /> },
  ];

  const tasks = [
    { id: 1, title: 'Envoyer documents au prêteur', dossier: 'Dossier #12345', deadline: 'Aujourd\'hui' },
    { id: 2, title: 'Confirmer rendez-vous notaire', dossier: 'Dossier #12346', deadline: 'Demain' },
    { id: 3, title: 'Vérifier conditions d\'approbation', dossier: 'Dossier #12347', deadline: '25 juin' },
  ];

  const statusData = {
    labels: ['Soumission initiale', 'Documentation', 'Évaluation', 'Envoi prêteur', 'Approbation cond.', 'Approbation finale', 'Notaire'],
    datasets: [
      {
        data: [2, 3, 1, 4, 2, 0, 0],
        backgroundColor: [
          '#2D5BFF', // primary
          '#5B7EFF', // primary-light
          '#34D399', // secondary
          '#6EE7B7', // secondary-light
          '#F59E0B', // warning
          '#FBBF24', // warning-light
          '#EF4444', // danger
        ],
      },
    ],
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Tableau de bord</h1>
        <Link to="/references/new" className="btn-primary flex items-center">
          <FiPlusCircle className="mr-2" />
          Nouvelle référence
        </Link>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat) => (
          <StatCard key={stat.id} title={stat.title} value={stat.value} icon={stat.icon} color={stat.color} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Activité récente */}
        <div className="lg:col-span-2">
          <div className="card">
            <h2 className="text-lg font-medium text-gray-800 mb-4">Activité récente</h2>
            <RecentActivity activities={activities} />
          </div>
        </div>

        {/* Tâches à faire */}
        <div>
          <div className="card">
            <h2 className="text-lg font-medium text-gray-800 mb-4">Tâches à faire</h2>
            <TaskList tasks={tasks} />
          </div>
        </div>
      </div>

      {/* Statut des dossiers */}
      <div className="card mt-6">
        <h2 className="text-lg font-medium text-gray-800 mb-4">Statut des dossiers</h2>
        <DossierStatusChart data={statusData} />
      </div>
    </div>
  );
};

export default Dashboard;
