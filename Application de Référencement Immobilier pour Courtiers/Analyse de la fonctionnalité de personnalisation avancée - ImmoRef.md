# Analyse de la fonctionnalité de personnalisation avancée - ImmoRef

## Objectif
Permettre aux administrateurs de définir leurs propres paliers de bonus et pourcentages par institution financière dans le calculateur de commissions de l'application ImmoRef.

## Exigences fonctionnelles

### 1. Gestion des institutions financières
- Interface d'administration pour créer, modifier et supprimer des institutions financières
- Champs requis : nom de l'institution, pourcentage de commission par défaut, description (optionnel)
- Liste des institutions avec options de tri et de filtrage
- Validation des données saisies

### 2. Gestion des paliers de bonus
- Interface pour définir des paliers de bonus personnalisés
- Possibilité d'ajouter, modifier ou supprimer des paliers
- Champs requis : seuil de volume (en $), pourcentage de bonus associé
- Validation pour éviter les chevauchements ou incohérences entre paliers

### 3. Contrôle d'accès
- Restriction de ces fonctionnalités aux utilisateurs avec rôle administrateur
- Protection des routes d'administration
- Journalisation des modifications pour audit

### 4. Intégration avec le calculateur existant
- Utilisation automatique des institutions et paliers personnalisés dans le calculateur
- Mise à jour en temps réel des calculs lors de modifications des paramètres
- Option de revenir aux valeurs par défaut si nécessaire

## Conception technique

### Modèle de données

#### Institution financière
```javascript
{
  id: String,           // Identifiant unique
  nom: String,          // Nom de l'institution
  pourcentage: Number,  // Pourcentage de commission
  description: String,  // Description (optionnel)
  actif: Boolean,       // État actif/inactif
  dateCreation: Date,   // Date de création
  derniereMaj: Date     // Date de dernière modification
}
```

#### Palier de bonus
```javascript
{
  id: String,           // Identifiant unique
  seuil: Number,        // Seuil de volume en $
  bonus: Number,        // Pourcentage de bonus
  description: String,  // Description (optionnel)
  actif: Boolean,       // État actif/inactif
  dateCreation: Date,   // Date de création
  derniereMaj: Date     // Date de dernière modification
}
```

### API Backend

#### Routes pour les institutions
- `GET /api/admin/institutions` - Récupérer toutes les institutions
- `GET /api/admin/institutions/:id` - Récupérer une institution spécifique
- `POST /api/admin/institutions` - Créer une nouvelle institution
- `PUT /api/admin/institutions/:id` - Mettre à jour une institution
- `DELETE /api/admin/institutions/:id` - Supprimer une institution

#### Routes pour les paliers
- `GET /api/admin/paliers` - Récupérer tous les paliers
- `GET /api/admin/paliers/:id` - Récupérer un palier spécifique
- `POST /api/admin/paliers` - Créer un nouveau palier
- `PUT /api/admin/paliers/:id` - Mettre à jour un palier
- `DELETE /api/admin/paliers/:id` - Supprimer un palier

### Composants Frontend

#### Page d'administration des institutions
- Tableau des institutions existantes
- Formulaire d'ajout/modification
- Fonctionnalités de tri et filtrage
- Confirmation pour suppression

#### Page d'administration des paliers
- Tableau des paliers existants
- Formulaire d'ajout/modification
- Visualisation graphique des paliers
- Validation pour éviter les chevauchements

#### Intégration dans le menu
- Nouvelle section "Administration" dans le menu principal (visible uniquement pour les administrateurs)
- Sous-menus pour "Institutions financières" et "Paliers de bonus"

## Maquettes conceptuelles

### Page d'administration des institutions
```
+-----------------------------------------------+
|                   ImmoRef                     |
+-----------------------------------------------+
| [Menu] | ... | Administration | Calculateur   |
+-----------------------------------------------+
|                                               |
|  Gestion des institutions financières         |
|                                               |
|  [+ Ajouter une institution]                  |
|                                               |
|  +---------------------------------------+    |
|  | Nom       | Pourcentage | Actions     |    |
|  +---------------------------------------+    |
|  | Banque A  | 0.8%        | [Éditer][X] |    |
|  | Banque B  | 1.2%        | [Éditer][X] |    |
|  | Banque C  | 1.5%        | [Éditer][X] |    |
|  | ...       | ...         | ...         |    |
|  +---------------------------------------+    |
|                                               |
+-----------------------------------------------+
```

### Formulaire d'ajout/modification d'institution
```
+-----------------------------------------------+
|                   ImmoRef                     |
+-----------------------------------------------+
| [Menu] | ... | Administration | Calculateur   |
+-----------------------------------------------+
|                                               |
|  Ajouter une institution financière           |
|                                               |
|  +---------------------------------------+    |
|  | Nom de l'institution:                 |    |
|  | [________________________]            |    |
|  |                                       |    |
|  | Pourcentage de commission (%):        |    |
|  | [____]                                |    |
|  |                                       |    |
|  | Description (optionnel):              |    |
|  | [________________________]            |    |
|  |                                       |    |
|  | [Annuler]        [Enregistrer]        |    |
|  +---------------------------------------+    |
|                                               |
+-----------------------------------------------+
```

### Page d'administration des paliers
```
+-----------------------------------------------+
|                   ImmoRef                     |
+-----------------------------------------------+
| [Menu] | ... | Administration | Calculateur   |
+-----------------------------------------------+
|                                               |
|  Gestion des paliers de bonus                 |
|                                               |
|  [+ Ajouter un palier]                        |
|                                               |
|  +---------------------------------------+    |
|  | Seuil      | Bonus (%) | Actions      |    |
|  +---------------------------------------+    |
|  | 2 000 000$ | 0.1%      | [Éditer][X]  |    |
|  | 7 000 000$ | 0.3%      | [Éditer][X]  |    |
|  | 10 000 000$| 0.5%      | [Éditer][X]  |    |
|  | ...        | ...       | ...          |    |
|  +---------------------------------------+    |
|                                               |
|  +---------------------------------------+    |
|  |                                       |    |
|  |    [Visualisation des paliers]        |    |
|  |                                       |    |
|  +---------------------------------------+    |
|                                               |
+-----------------------------------------------+
```

## Prochaines étapes
1. Valider cette conception avec l'utilisateur
2. Développer les modèles de données et l'API backend
3. Créer les interfaces d'administration frontend
4. Intégrer avec le calculateur existant
5. Tester avec différents scénarios
6. Déployer la mise à jour
