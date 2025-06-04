import React, { useState, useEffect } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiAlertCircle } from 'react-icons/fi';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import { toast } from 'react-toastify';

const PalierManagement = () => {
  const [paliers, setPaliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // État pour le formulaire
  const [formData, setFormData] = useState({
    seuil: '',
    bonus: '',
    description: ''
  });
  
  // État pour le mode d'édition
  const [editMode, setEditMode] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  
  // État pour le modal de confirmation de suppression
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [palierToDelete, setPalierToDelete] = useState(null);

  // Charger les paliers au chargement du composant
  useEffect(() => {
    fetchPaliers();
  }, []);

  // Fonction pour récupérer les paliers
  const fetchPaliers = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/api/admin/paliers');
      // Trier les paliers par seuil
      const sortedPaliers = response.data.data.sort((a, b) => a.seuil - b.seuil);
      setPaliers(sortedPaliers);
      setError(null);
    } catch (err) {
      setError('Erreur lors du chargement des paliers');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Gérer les changements dans le formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Soumettre le formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (editMode) {
        // Mise à jour d'un palier existant
        await axios.put(`/api/admin/paliers/${currentId}`, formData);
        toast.success('Palier mis à jour avec succès');
      } else {
        // Création d'un nouveau palier
        await axios.post('/api/admin/paliers', formData);
        toast.success('Palier créé avec succès');
      }
      
      // Réinitialiser le formulaire et rafraîchir la liste
      resetForm();
      fetchPaliers();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Une erreur est survenue');
      console.error(err);
    }
  };

  // Préparer l'édition d'un palier
  const handleEdit = (palier) => {
    setFormData({
      seuil: palier.seuil,
      bonus: palier.bonus,
      description: palier.description || ''
    });
    setCurrentId(palier._id);
    setEditMode(true);
  };

  // Préparer la suppression d'un palier
  const handleDeleteClick = (palier) => {
    setPalierToDelete(palier);
    setShowDeleteModal(true);
  };

  // Confirmer la suppression d'un palier
  const confirmDelete = async () => {
    try {
      await axios.delete(`/api/admin/paliers/${palierToDelete._id}`);
      toast.success('Palier supprimé avec succès');
      setShowDeleteModal(false);
      setPalierToDelete(null);
      fetchPaliers();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Une erreur est survenue');
      console.error(err);
    }
  };

  // Annuler la suppression
  const cancelDelete = () => {
    setShowDeleteModal(false);
    setPalierToDelete(null);
  };

  // Réinitialiser le formulaire
  const resetForm = () => {
    setFormData({
      seuil: '',
      bonus: '',
      description: ''
    });
    setCurrentId(null);
    setEditMode(false);
  };

  // Formater les montants en dollars
  const formatMontant = (montant) => {
    return new Intl.NumberFormat('fr-CA', { style: 'currency', currency: 'CAD' }).format(montant);
  };

  // Données pour le graphique des paliers
  const chartData = {
    labels: paliers.map(p => formatMontant(p.seuil)),
    datasets: [
      {
        label: 'Bonus (%)',
        data: paliers.map(p => p.bonus),
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        borderColor: 'rgb(54, 162, 235)',
        borderWidth: 1,
      },
    ],
  };

  // Options pour le graphique
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Paliers de bonus',
        color: document.documentElement.classList.contains('dark') ? 'white' : 'black',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Bonus (%)',
          color: document.documentElement.classList.contains('dark') ? 'white' : 'black',
        },
        ticks: {
          color: document.documentElement.classList.contains('dark') ? 'white' : 'black',
        },
        grid: {
          color: document.documentElement.classList.contains('dark') ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Seuil de volume',
          color: document.documentElement.classList.contains('dark') ? 'white' : 'black',
        },
        ticks: {
          color: document.documentElement.classList.contains('dark') ? 'white' : 'black',
        },
        grid: {
          color: document.documentElement.classList.contains('dark') ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        },
      },
    },
  };

  return (
    <div className="p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">Gestion des paliers de bonus</h2>
      
      {/* Formulaire */}
      <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow mb-8">
        <h3 className="text-lg font-medium text-gray-700 dark:text-gray-200 mb-4">
          {editMode ? 'Modifier un palier' : 'Ajouter un palier'}
        </h3>
        
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-2">Seuil de volume ($)</label>
              <input
                type="number"
                name="seuil"
                value={formData.seuil}
                onChange={handleChange}
                min="0"
                step="1000"
                required
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
              />
            </div>
            
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-2">Pourcentage de bonus (%)</label>
              <input
                type="number"
                name="bonus"
                value={formData.bonus}
                onChange={handleChange}
                step="0.1"
                min="0"
                max="5"
                required
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
              />
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-gray-700 dark:text-gray-300 mb-2">Description (optionnel)</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="3"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
              ></textarea>
            </div>
          </div>
          
          <div className="flex justify-end mt-6 space-x-3">
            {editMode && (
              <button
                type="button"
                onClick={resetForm}
                className="px-4 py-2 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-md hover:bg-gray-300 dark:hover:bg-gray-500 transition duration-300"
              >
                Annuler
              </button>
            )}
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
            >
              {editMode ? 'Mettre à jour' : 'Ajouter'}
            </button>
          </div>
        </form>
      </div>
      
      {/* Visualisation des paliers */}
      {!loading && !error && paliers.length > 0 && (
        <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow mb-8">
          <h3 className="text-lg font-medium text-gray-700 dark:text-gray-200 mb-4">Visualisation des paliers</h3>
          <div className="h-64">
            <Bar data={chartData} options={chartOptions} />
          </div>
        </div>
      )}
      
      {/* Liste des paliers */}
      <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow">
        <h3 className="text-lg font-medium text-gray-700 dark:text-gray-200 mb-4">Paliers de bonus</h3>
        
        {loading ? (
          <div className="text-center py-4">
            <p className="text-gray-600 dark:text-gray-400">Chargement...</p>
          </div>
        ) : error ? (
          <div className="text-center py-4 text-red-500">
            <FiAlertCircle className="mx-auto mb-2" size={24} />
            <p>{error}</p>
          </div>
        ) : paliers.length === 0 ? (
          <div className="text-center py-4">
            <p className="text-gray-600 dark:text-gray-400">Aucun palier de bonus trouvé.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Seuil</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Bonus</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Description</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-700 divide-y divide-gray-200 dark:divide-gray-600">
                {paliers.map((palier) => (
                  <tr key={palier._id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                      {formatMontant(palier.seuil)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                      {palier.bonus}%
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                      {palier.description || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleEdit(palier)}
                        className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 mr-3"
                      >
                        <FiEdit2 size={18} />
                      </button>
                      <button
                        onClick={() => handleDeleteClick(palier)}
                        className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300"
                      >
                        <FiTrash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      
      {/* Modal de confirmation de suppression */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Confirmer la suppression</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              Êtes-vous sûr de vouloir supprimer le palier de {formatMontant(palierToDelete?.seuil)} ? Cette action est irréversible.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600"
              >
                Annuler
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PalierManagement;
