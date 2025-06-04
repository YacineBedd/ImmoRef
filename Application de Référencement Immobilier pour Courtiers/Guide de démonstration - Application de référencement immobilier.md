# Guide de démonstration - Application de référencement immobilier

## Introduction

Ce guide présente les principales fonctionnalités de l'application de référencement immobilier développée pour faciliter la collaboration entre courtiers immobiliers et courtiers hypothécaires.

## Accès à la démonstration

- **URL de démonstration** : [https://refeimmo-demo.example.com](https://refeimmo-demo.example.com)
- **Identifiants de test** :
  - Courtier immobilier : `immobilier@demo.com` / `demo1234`
  - Courtier hypothécaire : `hypothecaire@demo.com` / `demo1234`
  - Administrateur : `admin@demo.com` / `admin1234`

## Fonctionnalités principales

### 1. Interface utilisateur adaptative

- **Mode clair/sombre** : Basculez entre les deux modes via l'icône dans la barre de navigation
- **Design épuré** : Interface inspirée de Notion, minimaliste et fonctionnelle
- **Responsive** : Fonctionne sur ordinateurs, tablettes et smartphones

### 2. Tableau de bord

- Vue d'ensemble des activités
- Statistiques personnalisées selon le rôle (courtier immobilier ou hypothécaire)
- Accès rapide aux dossiers actifs et tâches prioritaires

### 3. Gestion des références

#### Pour les courtiers immobiliers
- Créer une nouvelle référence vers un courtier hypothécaire
- Sélectionner un client existant ou en créer un nouveau
- Ajouter les informations de la propriété
- Confirmer l'obtention du consentement client (conformité AMF)
- Suivre le statut des références envoyées

#### Pour les courtiers hypothécaires
- Recevoir et accepter/refuser des références
- Créer des dossiers à partir des références acceptées
- Référer des clients à des courtiers immobiliers

### 4. Suivi des dossiers

- Visualisation claire des 7 étapes du processus :
  1. Soumission initiale
  2. Réception de la documentation
  3. Évaluation du dossier
  4. Envoi chez le prêteur
  5. Approbation conditionnelle
  6. Approbation finale
  7. Instructions envoyées au notaire
- Mise à jour du statut en temps réel
- Notifications automatiques lors des changements d'étape

### 5. Gestion documentaire

- Téléchargement sécurisé de documents
- Organisation par dossier et par client
- Intégration avec Google Drive
- Contrôle des accès et partage sélectif

### 6. Messagerie contextuelle

- Conversations par dossier
- Notifications en temps réel
- Partage de documents dans les conversations
- Historique des communications

### 7. Gestion financière

- Calcul automatique des commissions selon le modèle validé :
  - 25% de la commission pour les références immobilier → hypothécaire
  - 25% de la commission pour les références hypothécaire → immobilier
- Tableau de bord des commissions à recevoir/à payer
- Suivi des paiements
- Rapports financiers

## Scénarios de démonstration

### Scénario 1 : Référencement d'un client (courtier immobilier)
1. Connexion en tant que courtier immobilier
2. Création d'une nouvelle référence
3. Sélection d'un courtier hypothécaire partenaire
4. Suivi du statut de la référence

### Scénario 2 : Traitement d'un dossier (courtier hypothécaire)
1. Connexion en tant que courtier hypothécaire
2. Acceptation d'une référence
3. Création d'un dossier
4. Mise à jour des étapes du processus
5. Partage de documents
6. Communication avec le courtier immobilier

### Scénario 3 : Gestion des commissions
1. Finalisation d'un dossier
2. Calcul automatique de la commission
3. Approbation et suivi du paiement
4. Génération de rapports

## Prochaines étapes

- Déploiement en production
- Formation des utilisateurs
- Support technique et maintenance
- Évolutions futures (application mobile, intégrations supplémentaires)
