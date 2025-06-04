import React, { useState, useEffect } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiAlertCircle } from 'react-icons/fi';
import axios from 'axios';
import { toast } from 'react-toastify';

const InstitutionManagement = () => {
  const [institutions, setInstitutions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // État pour le formulaire
  const [formData, setFormData] = useState({
    nom: '',
    pourcentage: '',
    description: ''
  });
  
  // État pour le mode d'édition
  const [editMode, setEditMode] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  
  // État pour le modal de confirmation de suppression
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [institutionToDelete, setInstitutionToDelete] = useState(null);

  // Charger les institutions au chargement du composant
  useEffect(() => {
    fetchInstitutions();
  }, []);

  // Fonction pour récupérer les institutions
  const fetchInstitutions = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/api/admin/institutions');
      setInstitutions(response.data.data);
      setError(null);
    } catch (err) {
      setError('Erreur lors du chargement des institutions');
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
        // Mise à jour d'une institution existante
        await axios.put(`/api/admin/institutions/${currentId}`, formData);
        toast.success('Institution mise à jour avec succès');
      } else {
        // Création d'une nouvelle institution
        await axios.post('/api/admin/institutions', formData);
        toast.success('Institution créée avec succès');
      }
      
      // Réinitialiser le formulaire et rafraîchir la liste
      resetForm();
      fetchInstitutions();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Une erreur est survenue');
      console.error(err);
    }
  };

  // Préparer l'édition d'une institution
  const handleEdit = (institution) => {
    setFormData({
      nom: institution.nom,
      pourcentage: institution.pourcentage,
      description: institution.description || ''
    });
    setCurrentId(institution._id);
    setEditMode(true);
  };

  // Préparer la suppression d'une institution
  const handleDeleteClick = (institution) => {
    setInstitutionToDelete(institution);
    setShowDeleteModal(true);
  };

  // Confirmer la suppression d'une institution
  const confirmDelete = async () => {
    try {
      await axios.delete(`/api/admin/institutions/${institutionToDelete._id}`);
      toast.success('Institution supprimée avec succès');
      setShowDeleteModal(false);
      setInstitutionToDelete(null);
      fetchInstitutions();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Une erreur est survenue');
      console.error(err);
    }
  };

  // Annuler la suppression
  const cancelDelete = () => {
    setShowDeleteModal(false);
    setInstitutionToDelete(null);
  };

  // Réinitialiser le formulaire
  const resetForm = () => {
    setFormData({
      nom: '',
      pourcentage: '',
      description: ''
    });
    setCurrentId(null);
    setEditMode(false);
  };

  return (
    <div className="p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">Gestion des institutions financières</h2>
      
      {/* Formulaire */}
      <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow mb-8">
        <h3 className="text-lg font-medium text-gray-700 dark:text-gray-200 mb-4">
          {editMode ? 'Modifier une institution' : 'Ajouter une institution'}
        </h3>
        
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-2">Nom de l'institution</label>
              <input
                type="text"
                name="nom"
                value={formData.nom}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
              />
            </div>
            
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-2">Pourcentage de commission (%)</label>
              <input
                type="number"
                name="pourcentage"
                value={formData.pourcentage}
                onChange={handleChange}
                step="0.1"
                min="0"
                max="10"
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
      
      {/* Liste des institutions */}
      <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow">
        <h3 className="text-lg font-medium text-gray-700 dark:text-gray-200 mb-4">Institutions financières</h3>
        
        {loading ? (
          <div className="text-center py-4">
            <p className="text-gray-600 dark:text-gray-400">Chargement...</p>
          </div>
        ) : error ? (
          <div className="text-center py-4 text-red-500">
            <FiAlertCircle className="mx-auto mb-2" size={24} />
            <p>{error}</p>
          </div>
        ) : institutions.length === 0 ? (
          <div className="text-center py-4">
            <p className="text-gray-600 dark:text-gray-400">Aucune institution financière trouvée.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Nom</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Pourcentage</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Description</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-700 divide-y divide-gray-200 dark:divide-gray-600">
                {institutions.map((institution) => (
                  <tr key={institution._id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                      {institution.nom}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                      {institution.pourcentage}%
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                      {institution.description || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleEdit(institution)}
                        className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 mr-3"
                      >
                        <FiEdit2 size={18} />
                      </button>
                      <button
                        onClick={() => handleDeleteClick(institution)}
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
              Êtes-vous sûr de vouloir supprimer l'institution "{institutionToDelete?.nom}" ? Cette action est irréversible.
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

export default InstitutionManagement;
