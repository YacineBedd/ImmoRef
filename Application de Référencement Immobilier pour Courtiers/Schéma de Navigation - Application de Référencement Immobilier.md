# Schéma de Navigation - Application de Référencement Immobilier

Ce document présente la structure de navigation et les maquettes conceptuelles pour l'application de référencement entre courtiers immobiliers et hypothécaires.

## Structure de Navigation

```
+------------------+
|    CONNEXION     |
+------------------+
         |
         v
+------------------+
|  TABLEAU DE BORD |
+------------------+
         |
    +----+----+----+----+----+
    |         |         |         |         |
    v         v         v         v         v
+--------+ +--------+ +--------+ +--------+ +--------+
| PROFIL | | CLIENTS| |RÉFÉRENCES| |DOSSIERS| |FINANCES|
+--------+ +--------+ +--------+ +--------+ +--------+
                |         |         |
                |         |    +----+----+----+
                |         |    |         |         |
                |         |    v         v         v
                |         | +--------+ +--------+ +--------+
                |         | |DOCUMENTS| |MESSAGES| | ÉTAPES |
                |         | +--------+ +--------+ +--------+
                |         |
                |    +----+----+
                |    |         |
                v    v         v
            +--------+     +--------+
            |NOUVELLE|     |HISTORIQUE|
            |RÉFÉRENCE|     |RÉFÉRENCES|
            +--------+     +--------+
```

## Écrans Principaux

### 1. Page de Connexion

Interface épurée avec:
- Logo de l'application
- Formulaire de connexion (email/mot de passe)
- Option "Se souvenir de moi"
- Lien "Mot de passe oublié"
- Bouton de connexion
- Option d'authentification à deux facteurs

### 2. Tableau de Bord

#### Pour Courtiers Immobiliers:
- Vue d'ensemble des références actives
- Statut des dossiers en cours (représentation visuelle)
- Commissions à recevoir
- Activité récente
- Notifications importantes
- Accès rapide aux fonctions principales

#### Pour Courtiers Hypothécaires:
- Nouvelles références reçues
- Dossiers en cours par étape
- Tâches à effectuer
- Commissions à payer
- Activité récente
- Notifications importantes

### 3. Profil Utilisateur

- Informations personnelles
- Paramètres de notification
- Préférences de l'application
- Gestion des partenaires préférés
- Historique d'activité

### 4. Gestion des Clients

- Liste des clients (avec filtres et recherche)
- Fiche détaillée client
- Historique des interactions
- Documents associés
- Formulaire d'ajout/modification client

### 5. Gestion des Références

#### Nouvelle Référence:
- Formulaire de création
- Sélection du client (existant ou nouveau)
- Sélection du partenaire
- Détails de la propriété
- Consentement client (conformité AMF)

#### Historique des Références:
- Liste des références (avec filtres et recherche)
- Statut des références
- Commissions associées
- Accès aux dossiers liés

### 6. Gestion des Dossiers

- Vue d'ensemble des dossiers
- Filtres par statut, date, montant
- Fiche détaillée du dossier avec:
  - Informations client et propriété
  - Étapes du processus avec statut
  - Documents associés
  - Messagerie contextuelle
  - Historique des modifications

#### Module Étapes:
- Représentation visuelle du processus
- Mise à jour du statut
- Échéances et rappels
- Conditions à remplir

#### Module Documents:
- Liste des documents requis/reçus
- Interface de téléchargement
- Prévisualisation intégrée
- Intégration Google Drive
- Signature électronique (OneSpan)

#### Module Messages:
- Conversation par dossier
- Mentions des participants
- Partage de documents dans la conversation
- Notifications en temps réel

### 7. Module Finances

- Tableau des commissions à recevoir/payer
- Calculateur de commission
- Historique des transactions
- Rapports financiers
- Graphiques de performance

## Maquettes Conceptuelles

### Tableau de Bord (Courtier Immobilier)

```
+---------------------------------------------------------------+
|  LOGO   Recherche...                      Notifications Profil |
+---------------------------------------------------------------+
|                                                               |
| MENU    | Bienvenue, [Nom]                      Date actuelle |
| LATÉRAL |                                                     |
|         | +-------------------+ +------------------------+    |
| Tableau | | DOSSIERS ACTIFS   | | COMMISSIONS À RECEVOIR |    |
| de bord | | 12 dossiers       | | 3 200 $                |    |
|         | +-------------------+ +------------------------+    |
| Clients |                                                     |
|         | +---------------------------------------------------+
| Référen-| | ACTIVITÉ RÉCENTE                                 |
| ces     | | • Approbation conditionnelle - Client Dupont     |
|         | | • Nouvelle référence acceptée - Client Martin    |
| Dossiers| | • Documents reçus - Client Tremblay              |
|         | +---------------------------------------------------+
| Finances|                                                     |
|         | +-------------------+ +------------------------+    |
| Paramè- | | TÂCHES À FAIRE    | | STATUT DES DOSSIERS    |    |
| tres    | | • Envoyer doc...  | | [Graphique par étape]  |    |
|         | | • Confirmer RDV.. | |                        |    |
|         | +-------------------+ +------------------------+    |
+---------------------------------------------------------------+
```

### Page de Dossier

```
+---------------------------------------------------------------+
|  LOGO   Recherche...                      Notifications Profil |
+---------------------------------------------------------------+
|                                                               |
| MENU    | Dossier #12345 - Client Dupont                      |
| LATÉRAL | Propriété: 123 Rue Principale, Montréal             |
|         |                                                     |
| Tableau | +---------------------------------------------------+
| de bord | | ÉTAPES DU PROCESSUS                              |
|         | | [O] Soumission initiale       - Complété 12/05   |
| Clients | | [O] Réception documentation   - Complété 15/05   |
|         | | [O] Évaluation du dossier     - Complété 18/05   |
| Référen-| | [O] Envoi chez le prêteur     - Complété 20/05   |
| ces     | | [X] Approbation conditionnelle- En cours         |
|         | | [ ] Approbation finale        - À venir          |
| Dossiers| | [ ] Instructions au notaire   - À venir          |
|         | +---------------------------------------------------+
| Finances|                                                     |
|         | +-------------------+ +------------------------+    |
| Paramè- | | DOCUMENTS         | | MESSAGES (3 nouveaux)  |    |
| tres    | | • Préapprobation  | | [Interface de chat]    |    |
|         | | • Offre d'achat   | |                        |    |
|         | | • Relevés bancaires| |                        |    |
|         | +-------------------+ +------------------------+    |
+---------------------------------------------------------------+
```

### Nouvelle Référence

```
+---------------------------------------------------------------+
|  LOGO   Recherche...                      Notifications Profil |
+---------------------------------------------------------------+
|                                                               |
| MENU    | Nouvelle Référence                                   |
| LATÉRAL |                                                     |
|         | +---------------------------------------------------+
| Tableau | | INFORMATIONS CLIENT                               |
| de bord | | [ ] Client existant   [ ] Nouveau client          |
|         | |                                                   |
| Clients | | Nom: ______________ Prénom: ________________      |
|         | | Email: ____________ Téléphone: _____________      |
| Référen-| +---------------------------------------------------+
| ces     |                                                     |
|         | +---------------------------------------------------+
| Dossiers| | INFORMATIONS PROPRIÉTÉ                            |
|         | | Adresse: ___________________________________      |
| Finances| | Ville: _____________ Code postal: __________      |
|         | | Prix d'achat: _______ Mise de fonds: _______      |
| Paramè- | +---------------------------------------------------+
| tres    |                                                     |
|         | +---------------------------------------------------+
|         | | COURTIER HYPOTHÉCAIRE                             |
|         | | [ ] Partenaire préféré   [ ] Autre courtier       |
|         | | Sélectionner: [Liste déroulante]                  |
|         | +---------------------------------------------------+
|         |                                                     |
|         | [ ] J'ai obtenu le consentement du client           |
|         |                                                     |
|         | [    Annuler    ]     [    Créer référence    ]     |
+---------------------------------------------------------------+
```

### Module Finances

```
+---------------------------------------------------------------+
|  LOGO   Recherche...                      Notifications Profil |
+---------------------------------------------------------------+
|                                                               |
| MENU    | Finances                                             |
| LATÉRAL |                                                     |
|         | +---------------------------------------------------+
| Tableau | | COMMISSIONS                                       |
| de bord | | [Onglet: À recevoir] [Onglet: À payer] [Historique]|
|         | |                                                   |
| Clients | | +-------+----------+--------+--------+---------+  |
|         | | |Client |Propriété |Montant |Statut  |Date     |  |
| Référen-| | +-------+----------+--------+--------+---------+  |
| ces     | | |Dupont |123 Rue...|800 $   |En attente|25/06  |  |
|         | | |Martin |456 Ave...|1 200 $ |Payé     |12/05  |  |
| Dossiers| | |Tremblay|789 Boul.|950 $   |Approuvé |30/06  |  |
|         | | +-------+----------+--------+--------+---------+  |
| Finances| +---------------------------------------------------+
|         |                                                     |
| Paramè- | +---------------------------------------------------+
| tres    | | PERFORMANCE                                       |
|         | | [Graphique: Commissions par mois]                 |
|         | | [Graphique: Taux de conversion des références]    |
|         | +---------------------------------------------------+
|         |                                                     |
|         | [    Exporter rapport    ]  [    Calculatrice    ]  |
+---------------------------------------------------------------+
```

## Principes d'Interface

### Style Notion
- Interface épurée et minimaliste
- Espacement généreux
- Typographie claire et lisible
- Blocs de contenu bien délimités
- Palette de couleurs limitée et cohérente

### Navigation
- Menu latéral fixe pour la navigation principale
- Fil d'Ariane pour la navigation contextuelle
- Accès rapide aux fonctions fréquentes
- Recherche globale

### Responsive Design
- Adaptation fluide aux différentes tailles d'écran
- Réorganisation des éléments sur mobile
- Fonctionnalités essentielles accessibles sur tous les appareils

### Interactions
- Glisser-déposer pour les documents
- Mise à jour en temps réel des statuts
- Notifications contextuelles
- Formulaires progressifs (étape par étape)

## Thème Visuel

### Palette de Couleurs
- Couleur principale: Bleu professionnel (#2D5BFF)
- Couleur secondaire: Vert succès (#34D399)
- Couleur d'alerte: Orange (#F59E0B)
- Couleur d'erreur: Rouge (#EF4444)
- Fond: Blanc (#FFFFFF)
- Texte: Gris foncé (#1F2937)
- Éléments d'interface: Gris clair (#F3F4F6)

### Typographie
- Police principale: Inter (sans-serif)
- Titres: Semi-bold
- Corps de texte: Regular
- Hiérarchie claire avec différentes tailles

### Iconographie
- Icônes linéaires minimalistes
- Style cohérent
- Signification intuitive
- Utilisation modérée
