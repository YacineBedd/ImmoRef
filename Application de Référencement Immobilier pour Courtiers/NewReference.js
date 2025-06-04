import React, { useState } from 'react';
import { FiUser, FiHome, FiDollarSign, FiCalendar } from 'react-icons/fi';

const NewReference = () => {
  const [clientType, setClientType] = useState('existing');
  const [partnerType, setPartnerType] = useState('preferred');
  const [consentObtained, setConsentObtained] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logique de soumission du formulaire
    alert('Référence créée avec succès!');
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Nouvelle Référence</h1>
      
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Informations client */}
        <div className="card">
          <h2 className="text-lg font-medium text-gray-800 mb-4">Informations client</h2>
          
          <div className="flex space-x-4 mb-4">
            <div className="flex items-center">
              <input
                id="client-existing"
                name="client-type"
                type="radio"
                checked={clientType === 'existing'}
                onChange={() => setClientType('existing')}
                className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
              />
              <label htmlFor="client-existing" className="ml-2 block text-sm text-gray-700">
                Client existant
              </label>
            </div>
            <div className="flex items-center">
              <input
                id="client-new"
                name="client-type"
                type="radio"
                checked={clientType === 'new'}
                onChange={() => setClientType('new')}
                className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
              />
              <label htmlFor="client-new" className="ml-2 block text-sm text-gray-700">
                Nouveau client
              </label>
            </div>
          </div>
          
          {clientType === 'existing' ? (
            <div className="mb-4">
              <label htmlFor="client-select" className="block text-sm font-medium text-gray-700 mb-1">
                Sélectionner un client
              </label>
              <select
                id="client-select"
                name="client-select"
                className="input-field"
              >
                <option value="">Sélectionner un client</option>
                <option value="1">Dupont, Jean</option>
                <option value="2">Martin, Sophie</option>
                <option value="3">Tremblay, Marc</option>
              </select>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="nom" className="block text-sm font-medium text-gray-700 mb-1">
                  Nom
                </label>
                <input
                  type="text"
                  name="nom"
                  id="nom"
                  className="input-field"
                  placeholder="Nom de famille"
                />
              </div>
              <div>
                <label htmlFor="prenom" className="block text-sm font-medium text-gray-700 mb-1">
                  Prénom
                </label>
                <input
                  type="text"
                  name="prenom"
                  id="prenom"
                  className="input-field"
                  placeholder="Prénom"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="input-field"
                  placeholder="exemple@domaine.com"
                />
              </div>
              <div>
                <label htmlFor="telephone" className="block text-sm font-medium text-gray-700 mb-1">
                  Téléphone
                </label>
                <input
                  type="tel"
                  name="telephone"
                  id="telephone"
                  className="input-field"
                  placeholder="(514) 123-4567"
                />
              </div>
            </div>
          )}
        </div>
        
        {/* Informations propriété */}
        <div className="card">
          <h2 className="text-lg font-medium text-gray-800 mb-4">Informations propriété</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label htmlFor="adresse" className="block text-sm font-medium text-gray-700 mb-1">
                Adresse
              </label>
              <input
                type="text"
                name="adresse"
                id="adresse"
                className="input-field"
                placeholder="123 Rue Principale"
              />
            </div>
            <div>
              <label htmlFor="ville" className="block text-sm font-medium text-gray-700 mb-1">
                Ville
              </label>
              <input
                type="text"
                name="ville"
                id="ville"
                className="input-field"
                placeholder="Montréal"
              />
            </div>
            <div>
              <label htmlFor="code-postal" className="block text-sm font-medium text-gray-700 mb-1">
                Code postal
              </label>
              <input
                type="text"
                name="code-postal"
                id="code-postal"
                className="input-field"
                placeholder="H2X 1Y2"
              />
            </div>
            <div>
              <label htmlFor="prix-achat" className="block text-sm font-medium text-gray-700 mb-1">
                Prix d'achat
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiDollarSign className="text-gray-400" />
                </div>
                <input
                  type="text"
                  name="prix-achat"
                  id="prix-achat"
                  className="input-field pl-8"
                  placeholder="500 000"
                />
              </div>
            </div>
            <div>
              <label htmlFor="mise-de-fonds" className="block text-sm font-medium text-gray-700 mb-1">
                Mise de fonds
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiDollarSign className="text-gray-400" />
                </div>
                <input
                  type="text"
                  name="mise-de-fonds"
                  id="mise-de-fonds"
                  className="input-field pl-8"
                  placeholder="100 000"
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Courtier hypothécaire */}
        <div className="card">
          <h2 className="text-lg font-medium text-gray-800 mb-4">Courtier hypothécaire</h2>
          
          <div className="flex space-x-4 mb-4">
            <div className="flex items-center">
              <input
                id="partner-preferred"
                name="partner-type"
                type="radio"
                checked={partnerType === 'preferred'}
                onChange={() => setPartnerType('preferred')}
                className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
              />
              <label htmlFor="partner-preferred" className="ml-2 block text-sm text-gray-700">
                Partenaire préféré
              </label>
            </div>
            <div className="flex items-center">
              <input
                id="partner-other"
                name="partner-type"
                type="radio"
                checked={partnerType === 'other'}
                onChange={() => setPartnerType('other')}
                className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
              />
              <label htmlFor="partner-other" className="ml-2 block text-sm text-gray-700">
                Autre courtier
              </label>
            </div>
          </div>
          
          <div>
            <label htmlFor="courtier-select" className="block text-sm font-medium text-gray-700 mb-1">
              Sélectionner un courtier
            </label>
            <select
              id="courtier-select"
              name="courtier-select"
              className="input-field"
            >
              <option value="">Sélectionner un courtier</option>
              {partnerType === 'preferred' ? (
                <>
                  <option value="1">Tremblay, Marie (Préféré)</option>
                  <option value="2">Lavoie, Pierre (Préféré)</option>
                  <option value="3">Gagnon, Julie (Préféré)</option>
                </>
              ) : (
                <>
                  <option value="4">Morin, Luc</option>
                  <option value="5">Côté, Sylvie</option>
                  <option value="6">Bouchard, Michel</option>
                </>
              )}
            </select>
          </div>
        </div>
        
        {/* Consentement */}
        <div className="flex items-center">
          <input
            id="consent"
            name="consent"
            type="checkbox"
            checked={consentObtained}
            onChange={(e) => setConsentObtained(e.target.checked)}
            className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
            required
          />
          <label htmlFor="consent" className="ml-2 block text-sm text-gray-700">
            J'ai obtenu le consentement du client pour partager ses informations (conformité AMF)
          </label>
        </div>
        
        {/* Boutons */}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            className="btn-secondary"
          >
            Annuler
          </button>
          <button
            type="submit"
            className="btn-primary"
            disabled={!consentObtained}
          >
            Créer référence
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewReference;
