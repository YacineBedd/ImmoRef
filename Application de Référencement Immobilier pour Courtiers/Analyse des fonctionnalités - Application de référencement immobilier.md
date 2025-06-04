# Analyse des fonctionnalités - Application de référencement immobilier

## Types d'utilisateurs et rôles

### Utilisateurs principaux
1. **Courtiers immobiliers**
   - Référer des clients aux courtiers hypothécaires
   - Suivre l'avancement des dossiers de financement
   - Consulter les commissions à recevoir
   - Communiquer avec les courtiers hypothécaires
   - Partager des documents

2. **Courtiers hypothécaires**
   - Recevoir et traiter les références de clients
   - Mettre à jour le statut des dossiers
   - Calculer et gérer les commissions
   - Communiquer avec les courtiers immobiliers
   - Partager des documents

### Utilisateurs futurs
3. **Notaires**
   - Recevoir les instructions
   - Mettre à jour le statut des dossiers
   - Communiquer avec les autres professionnels

4. **Planificateurs financiers**
   - Accéder aux dossiers partagés
   - Offrir des services complémentaires

5. **Administrateurs**
   - Gérer les utilisateurs et leurs droits
   - Superviser les transactions
   - Générer des rapports

## Étapes du processus de financement

1. **Soumission initiale**
   - Formulaire de référencement avec informations client
   - Consentement du client (conformité AMF)
   - Assignation au courtier hypothécaire

2. **Réception de la documentation**
   - Liste de contrôle des documents requis
   - Téléchargement et stockage sécurisé
   - Notification de documents manquants

3. **Évaluation du dossier**
   - Analyse des documents
   - Calcul préliminaire du montant d'hypothèque
   - Évaluation de la faisabilité

4. **Envoi chez le prêteur**
   - Sélection du prêteur
   - Soumission du dossier
   - Suivi de la demande

5. **Approbation conditionnelle**
   - Réception des conditions du prêteur
   - Liste des conditions à remplir
   - Suivi des conditions remplies

6. **Approbation finale**
   - Confirmation du financement
   - Calcul des commissions
   - Notification aux parties

7. **Instructions envoyées au notaire**
   - Génération des instructions
   - Partage des documents pertinents
   - Planification de la signature

## Modèle de rémunération

### Référencement courtier immobilier → courtier hypothécaire
- Base de calcul : 80 points de base (0,8%) sur le montant de l'hypothèque
- Part du courtier immobilier : 25% de la commission reçue
- Exemple : 
  - Propriété de 500 000 $
  - Mise de fonds de 100 000 $
  - Hypothèque de 400 000 $
  - Commission totale : 400 000 $ × 0,8% = 3 200 $
  - Part du courtier immobilier : 3 200 $ × 25% = 800 $

### Référencement courtier hypothécaire → courtier immobilier
- Base de calcul : 2% du montant total de la transaction
- Part du courtier hypothécaire : 25% de la commission reçue
- Exemple :
  - Propriété de 500 000 $
  - Commission totale : 500 000 $ × 2% = 10 000 $
  - Part du courtier hypothécaire : 10 000 $ × 25% = 2 500 $

### Fonctionnalités associées
- Calculateur automatique de commissions
- Tableau de bord des commissions à recevoir/à payer
- Historique des transactions et commissions
- Rapports financiers

## Sécurité et confidentialité (conformité AMF)

### Gestion du consentement
- Formulaire de consentement électronique
- Stockage sécurisé des consentements
- Piste d'audit des accès aux informations

### Protection des données
- Chiffrement des données sensibles
- Authentification à deux facteurs
- Journalisation des accès et modifications

### Conformité réglementaire
- Respect des exigences de l'AMF
- Gestion des périodes de conservation des données
- Procédures de suppression sécurisée

## Intégrations externes

### Stockage de documents
- Google Drive pour le stockage et le partage de documents
- Synchronisation bidirectionnelle

### Services bancaires
- API pour la vérification des informations bancaires
- Intégration avec les systèmes des prêteurs (si disponible)

### Signature électronique
- Intégration avec OneSpan pour les signatures électroniques
- Suivi des documents signés

### Autres intégrations potentielles
- Outils d'évaluation immobilière
- Services de vérification de crédit
- Systèmes de gestion des courtiers

## Principes de design UI/UX

### Inspiration Notion
- Interface épurée et minimaliste
- Organisation hiérarchique de l'information
- Blocs de contenu modulaires

### Expérience utilisateur
- Navigation intuitive et fluide
- Tableaux de bord personnalisables
- Notifications contextuelles

### Responsive design
- Adaptation à tous les appareils (ordinateurs, tablettes, smartphones)
- Expérience cohérente sur toutes les plateformes

### Accessibilité
- Conformité aux normes d'accessibilité
- Support des lecteurs d'écran
- Contraste et lisibilité optimisés

## Fonctionnalités de communication

### Messagerie interne
- Conversations par dossier
- Notifications en temps réel
- Historique des échanges

### Partage de documents
- Téléchargement sécurisé
- Prévisualisation intégrée
- Contrôle des versions

### Notifications
- Alertes par email
- Notifications push (version future)
- Centre de notifications dans l'application

## Tableaux de bord et rapports

### Tableau de bord courtier immobilier
- Vue d'ensemble des dossiers référés
- Statut des financements en cours
- Commissions à recevoir

### Tableau de bord courtier hypothécaire
- Nouvelles références reçues
- Dossiers en cours par étape
- Commissions à payer

### Rapports
- Performance des référencements
- Analyse des commissions
- Temps de traitement des dossiers
