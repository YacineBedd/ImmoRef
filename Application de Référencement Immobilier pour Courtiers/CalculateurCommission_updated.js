import React, { useState, useEffect } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import axios from 'axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Enregistrement des composants nécessaires pour Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const CalculateurCommission = () => {
  // États pour les entrées utilisateur
  const [montantTotal, setMontantTotal] = useState(500000);
  const [pourcentageCommission, setPourcentageCommission] = useState(1);
  const [volumeTotal, setVolumeTotal] = useState(1000000);
  const [institutionFinanciere, setInstitutionFinanciere] = useState('default');
  
  // États pour les résultats calculés
  const [commissionBase, setCommissionBase] = useState(0);
  const [bonus, setBonus] = useState(0);
  const [commissionTotale, setCommissionTotale] = useState(0);
  
  // États pour les données dynamiques
  const [institutions, setInstitutions] = useState([
    { id: 'default', nom: 'Standard', pourcentage: 1 }
  ]);
  const [paliers, setPaliers] = useState([
    { seuil: 0, bonus: 0 },
    { seuil: 2000000, bonus: 0.1 },
    { seuil: 7000000, bonus: 0.3 },
    { seuil: 10000000, bonus: 0.5 },
  ]);
  
  // État pour le chargement
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Charger les institutions et paliers au chargement du composant
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Récupérer les institutions
        const institutionsResponse = await axios.get('/api/institutions');
        if (institutionsResponse.data.success && institutionsResponse.data.data.length > 0) {
          const fetchedInstitutions = institutionsResponse.data.data.map(inst => ({
            id: inst._id,
            nom: inst.nom,
            pourcentage: inst.pourcentage
          }));
          // Ajouter l'option standard
          fetchedInstitutions.unshift({ id: 'default', nom: 'Standard', pourcentage: 1 });
          setInstitutions(fetchedInstitutions);
        }
        
        // Récupérer les paliers
        const paliersResponse = await axios.get('/api/paliers');
        if (paliersResponse.data.success && paliersResponse.data.data.length > 0) {
          // Trier les paliers par seuil
          const fetchedPaliers = paliersResponse.data.data
            .sort((a, b) => a.seuil - b.seuil)
            .map(palier => ({
              seuil: palier.seuil,
              bonus: palier.bonus
            }));
          setPaliers(fetchedPaliers);
        }
        
        setError(null);
      } catch (err) {
        console.error("Erreur lors du chargement des données:", err);
        setError("Impossible de charger les données personnalisées. Utilisation des valeurs par défaut.");
        // Utiliser les valeurs par défaut en cas d'erreur
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  // Fonction pour calculer le bonus basé sur le volume total
  const calculerBonus = (volume) => {
    let bonusPourcentage = 0;
    
    for (let i = paliers.length - 1; i >= 0; i--) {
      if (volume >= paliers[i].seuil) {
        bonusPourcentage = paliers[i].bonus;
        break;
      }
    }
    
    return bonusPourcentage;
  };

  // Fonction pour calculer la commission
  const calculerCommission = () => {
    // Trouver le pourcentage de l'institution sélectionnée
    const institution = institutions.find(inst => inst.id === institutionFinanciere);
    const pourcentageEffectif = institution ? institution.pourcentage : pourcentageCommission;
    
    // Calculer la commission de base
    const commBase = montantTotal * (pourcentageEffectif / 100);
    
    // Calculer le bonus basé sur le volume total
    const bonusPourcentage = calculerBonus(volumeTotal);
    const bonusAmount = montantTotal * (bonusPourcentage / 100);
    
    // Calculer la commission totale
    const commTotale = commBase + bonusAmount;
    
    // Mettre à jour les états
    setCommissionBase(commBase);
    setBonus(bonusAmount);
    setCommissionTotale(commTotale);
  };

  // Effet pour recalculer lorsque les entrées changent
  useEffect(() => {
    calculerCommission();
  }, [montantTotal, pourcentageCommission, volumeTotal, institutionFinanciere, institutions, paliers]);

  // Données pour le graphique d'évolution des commissions
  const evolutionData = {
    labels: ['100K$', '250K$', '500K$', '750K$', '1M$', '1.5M$', '2M$'],
    datasets: [
      {
        label: 'Commission totale',
        data: [100000, 250000, 500000, 750000, 1000000, 1500000, 2000000].map(montant => {
          const institution = institutions.find(inst => inst.id === institutionFinanciere);
          const pourcentageEffectif = institution ? institution.pourcentage : pourcentageCommission;
          const commBase = montant * (pourcentageEffectif / 100);
          const bonusPourcentage = calculerBonus(volumeTotal);
          const bonusAmount = montant * (bonusPourcentage / 100);
          return commBase + bonusAmount;
        }),
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
      },
    ],
  };

  // Données pour le graphique des paliers de bonus
  const paliersData = {
    labels: paliers.map(p => p.seuil === 0 ? '0' : `${p.seuil / 1000000}M$`),
    datasets: [
      {
        label: 'Bonus (%)',
        data: paliers.map(p => p.bonus),
        backgroundColor: 'rgba(153, 102, 255, 0.5)',
        borderColor: 'rgb(153, 102, 255)',
        borderWidth: 1,
      },
    ],
  };

  // Options pour les graphiques
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Évolution des commissions',
      },
    },
  };

  const paliersOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Paliers de bonus',
      },
    },
  };

  // Formater les montants en dollars
  const formatMontant = (montant) => {
    return new Intl.NumberFormat('fr-CA', { style: 'currency', currency: 'CAD' }).format(montant);
  };

  return (
    <div className="p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">Calculateur de Commissions de Référencement</h2>
      
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <>
          {error && (
            <div className="bg-yellow-100 dark:bg-yellow-900 border-l-4 border-yellow-500 text-yellow-700 dark:text-yellow-300 p-4 mb-6">
              <p>{error}</p>
            </div>
          )}
          
          {/* Formulaire de saisie */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-700 dark:text-gray-200 mb-4">Paramètres de calcul</h3>
              
              <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-300 mb-2">Montant total financé/acheté ($)</label>
                <input
                  type="number"
                  value={montantTotal}
                  onChange={(e) => setMontantTotal(Number(e.target.value))}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-300 mb-2">Institution financière</label>
                <select
                  value={institutionFinanciere}
                  onChange={(e) => setInstitutionFinanciere(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                >
                  {institutions.map((inst) => (
                    <option key={inst.id} value={inst.id}>
                      {inst.nom} ({inst.pourcentage}%)
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-300 mb-2">Pourcentage de commission personnalisé (%)</label>
                <input
                  type="number"
                  step="0.1"
                  value={pourcentageCommission}
                  onChange={(e) => setPourcentageCommission(Number(e.target.value))}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                />
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Ce pourcentage sera utilisé si vous sélectionnez "Standard" comme institution.
                </p>
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-300 mb-2">Volume total pour bonus ($)</label>
                <input
                  type="number"
                  value={volumeTotal}
                  onChange={(e) => setVolumeTotal(Number(e.target.value))}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                />
              </div>
              
              <button
                onClick={calculerCommission}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-300"
              >
                Calculer
              </button>
            </div>
            
            {/* Résultats */}
            <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-700 dark:text-gray-200 mb-4">Résultats</h3>
              
              <div className="mb-6">
                <div className="flex justify-between py-3 border-b border-gray-200 dark:border-gray-600">
                  <span className="text-gray-600 dark:text-gray-300">Commission de base:</span>
                  <span className="font-medium text-gray-800 dark:text-white">{formatMontant(commissionBase)}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-gray-200 dark:border-gray-600">
                  <span className="text-gray-600 dark:text-gray-300">Bonus:</span>
                  <span className="font-medium text-gray-800 dark:text-white">{formatMontant(bonus)}</span>
                </div>
                <div className="flex justify-between py-3">
                  <span className="text-gray-600 dark:text-gray-300 font-medium">Commission totale:</span>
                  <span className="font-bold text-blue-600 dark:text-blue-400 text-xl">{formatMontant(commissionTotale)}</span>
                </div>
              </div>
              
              <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Détails du calcul</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Montant: {formatMontant(montantTotal)}<br />
                  Pourcentage: {institutionFinanciere !== 'default' 
                    ? `${institutions.find(inst => inst.id === institutionFinanciere)?.pourcentage}% (${institutions.find(inst => inst.id === institutionFinanciere)?.nom})` 
                    : `${pourcentageCommission}%`}<br />
                  Palier de bonus: {calculerBonus(volumeTotal)}% (Volume: {formatMontant(volumeTotal)})
                </p>
              </div>
            </div>
          </div>
          
          {/* Graphiques */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow">
              <Line options={options} data={evolutionData} />
            </div>
            <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow">
              <Bar options={paliersOptions} data={paliersData} />
            </div>
          </div>
          
          {/* Tableau des paliers */}
          <div className="mt-8 bg-white dark:bg-gray-700 p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-700 dark:text-gray-200 mb-4">Paliers de bonus</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Volume</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Bonus (%)</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Exemple sur {formatMontant(montantTotal)}</th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-700 divide-y divide-gray-200 dark:divide-gray-600">
                  {paliers.map((palier, index) => {
                    // Déterminer la description du palier
                    let palierDescription = '';
                    if (index === 0) {
                      palierDescription = `Moins de ${formatMontant(paliers[1]?.seuil || 0)}`;
                    } else if (index === paliers.length - 1) {
                      palierDescription = `Plus de ${formatMontant(palier.seuil)}`;
                    } else {
                      palierDescription = `${formatMontant(palier.seuil)} à ${formatMontant(paliers[index + 1]?.seuil || 0)}`;
                    }
                    
                    return (
                      <tr key={index} className={volumeTotal >= palier.seuil && (index === paliers.length - 1 || volumeTotal < paliers[index + 1]?.seuil) ? "bg-blue-50 dark:bg-blue-900/20" : ""}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                          {palierDescription}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">{palier.bonus}%</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                          {formatMontant(montantTotal * (palier.bonus / 100))}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
          
          {/* Note sur la personnalisation */}
          <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-md border-l-4 border-blue-500">
            <p className="text-sm text-blue-700 dark:text-blue-300">
              <strong>Note:</strong> Les administrateurs peuvent personnaliser les institutions financières et les paliers de bonus dans la section d'administration.
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default CalculateurCommission;
