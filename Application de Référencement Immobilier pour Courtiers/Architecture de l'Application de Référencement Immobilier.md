# Architecture de l'Application de Référencement Immobilier

## Architecture Globale

L'application sera conçue selon une architecture moderne, évolutive et sécurisée, avec une séparation claire entre le frontend et le backend.

### Vue d'ensemble

```
+----------------------------------+
|           UTILISATEURS           |
| (Courtiers immobiliers/hypothécaires) |
+----------------------------------+
               |
               v
+----------------------------------+
|        INTERFACE FRONTEND        |
|  (Application Web Responsive)    |
+----------------------------------+
               |
               v
+----------------------------------+
|         API GATEWAY              |
| (Authentification, Autorisation) |
+----------------------------------+
               |
       +-------+-------+
       |               |
       v               v
+-------------+  +-------------+
|  SERVICES   |  |  SERVICES   |
| MÉTIER      |  | EXTERNES    |
+-------------+  +-------------+
       |               |
       v               v
+-------------+  +-------------+
| BASE DE     |  | STOCKAGE    |
| DONNÉES     |  | DOCUMENTS   |
+-------------+  +-------------+
```

## Stack Technologique

### Frontend
- **Framework** : React.js avec TypeScript
- **UI/UX** : Styled Components + TailwindCSS (pour un design épuré similaire à Notion)
- **État** : Redux ou Context API
- **Requêtes API** : Axios ou React Query
- **Authentification** : JWT avec stockage sécurisé

### Backend
- **Framework** : Node.js avec Express ou NestJS
- **API** : RESTful avec documentation OpenAPI/Swagger
- **Authentification** : JWT avec refresh tokens
- **Validation** : Joi ou class-validator

### Base de données
- **Principale** : PostgreSQL (pour les données structurées)
- **Cache** : Redis (pour les sessions et données temporaires)

### Stockage de documents
- **Service** : Intégration avec Google Drive API
- **Stockage local** : MinIO ou solution similaire pour les documents temporaires

### Intégrations
- **Signature électronique** : OneSpan API
- **Services bancaires** : APIs spécifiques aux prêteurs
- **Notifications** : Service d'emails (SendGrid) et WebSockets pour les notifications en temps réel

## Structure de la Base de Données

### Schéma Conceptuel

```
+----------------+       +----------------+       +----------------+
|  UTILISATEURS  |       |   RÉFÉRENCES   |       |    DOSSIERS    |
+----------------+       +----------------+       +----------------+
| id             |<----->| id             |<----->| id             |
| type           |       | date_creation  |       | propriete_id   |
| nom            |       | referent_id    |       | statut         |
| prenom         |       | refere_id      |       | montant_hypo   |
| email          |       | client_id      |       | date_maj       |
| telephone      |       | statut         |       | documents[]    |
| organisation   |       | commission     |       | etapes[]       |
| role           |       | propriete_id   |       | commentaires[] |
+----------------+       +----------------+       +----------------+
        |                        |                        |
        v                        v                        v
+----------------+       +----------------+       +----------------+
|    CLIENTS     |       |   PROPRIÉTÉS   |       |   COMMISSIONS  |
+----------------+       +----------------+       +----------------+
| id             |       | id             |       | id             |
| nom            |       | adresse        |       | reference_id   |
| prenom         |       | ville          |       | montant        |
| email          |       | province       |       | pourcentage    |
| telephone      |       | code_postal    |       | payeur_id      |
| consentements[]|       | prix_achat     |       | receveur_id    |
| documents[]    |       | mise_de_fond   |       | statut         |
+----------------+       +----------------+       | date_paiement  |
                                                 +----------------+
```

### Tables Principales

1. **Utilisateurs**
   - Stocke les informations sur tous les professionnels (courtiers, notaires, etc.)
   - Gère les rôles et permissions

2. **Clients**
   - Informations sur les clients référés
   - Liens vers les consentements et documents

3. **Références**
   - Relation entre un courtier référent et un courtier référé
   - Statut de la référence et commission associée

4. **Propriétés**
   - Détails de la propriété concernée
   - Informations financières (prix, mise de fonds)

5. **Dossiers**
   - Suivi du processus de financement
   - Étapes et statuts

6. **Commissions**
   - Calcul et suivi des commissions
   - Statut des paiements

7. **Documents**
   - Métadonnées des documents
   - Liens vers le stockage (Google Drive ou local)

8. **Messages**
   - Communication entre professionnels
   - Historique des conversations par dossier

## Modules Fonctionnels

### Module d'Authentification et Gestion des Utilisateurs
- Inscription et validation des professionnels
- Authentification sécurisée (2FA)
- Gestion des rôles et permissions
- Profils utilisateurs

### Module de Référencement
- Création de références
- Formulaire de consentement client
- Assignation des références
- Suivi des statuts

### Module de Gestion des Dossiers
- Création et mise à jour des dossiers
- Suivi des étapes du processus
- Notifications automatiques
- Tableaux de bord personnalisés

### Module de Gestion Documentaire
- Téléchargement et stockage sécurisé
- Intégration avec Google Drive
- Prévisualisation des documents
- Contrôle des versions

### Module de Communication
- Messagerie interne par dossier
- Notifications en temps réel
- Historique des communications

### Module Financier
- Calcul automatique des commissions
- Suivi des paiements
- Rapports financiers
- Historique des transactions

### Module d'Intégration
- Connecteurs pour services externes (OneSpan, etc.)
- API pour futures extensions
- Webhooks pour notifications

## Sécurité et Conformité

### Authentification et Autorisation
- JWT avec refresh tokens
- Sessions sécurisées
- Contrôle d'accès basé sur les rôles (RBAC)

### Protection des Données
- Chiffrement des données sensibles au repos et en transit (AES-256, TLS)
- Hachage sécurisé des mots de passe (bcrypt)
- Anonymisation des données pour les rapports

### Conformité AMF
- Gestion des consentements avec horodatage
- Journalisation des accès aux données sensibles
- Procédures de suppression sécurisée
- Pistes d'audit complètes

### Sécurité de l'Infrastructure
- Protection contre les attaques CSRF, XSS, injection SQL
- Rate limiting pour prévenir les attaques par force brute
- Validation des entrées côté serveur
- Sanitisation des sorties

## API et Intégrations

### API RESTful
- Endpoints sécurisés pour toutes les fonctionnalités
- Versionnement des API
- Documentation complète avec Swagger/OpenAPI

### Intégration Google Drive
- Authentification OAuth 2.0
- Synchronisation bidirectionnelle
- Gestion des permissions

### Intégration OneSpan
- API pour la signature électronique
- Suivi des documents signés
- Notifications de signature

### Webhooks
- Points d'entrée pour notifications externes
- Callbacks pour intégrations tierces

## Évolutivité et Maintenance

### Scalabilité
- Architecture modulaire permettant l'ajout de nouveaux types d'utilisateurs
- Séparation claire des préoccupations pour faciliter les extensions
- API bien documentée pour les intégrations futures

### Déploiement
- Conteneurisation avec Docker
- CI/CD pour déploiements automatisés
- Environnements de développement, test et production

### Monitoring
- Journalisation centralisée
- Métriques de performance
- Alertes sur incidents

### Sauvegarde et Reprise
- Sauvegardes régulières de la base de données
- Stratégie de reprise après sinistre
- Rétention des données conforme aux exigences réglementaires
