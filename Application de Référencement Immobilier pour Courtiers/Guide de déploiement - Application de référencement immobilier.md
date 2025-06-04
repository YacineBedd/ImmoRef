# Guide de déploiement - Application de référencement immobilier

## Déploiement sur Vercel

L'application de référencement immobilier est configurée pour un déploiement facile sur la plateforme Vercel, qui offre un hébergement gratuit pour les projets Next.js et Node.js.

### Prérequis

1. Un compte [Vercel](https://vercel.com)
2. Un compte [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) pour la base de données
3. Git installé sur votre machine

### Étapes de déploiement

#### 1. Préparation de la base de données MongoDB

1. Créez un compte sur [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) si vous n'en avez pas déjà un
2. Créez un nouveau cluster (l'option gratuite est suffisante pour commencer)
3. Configurez un utilisateur de base de données avec un mot de passe sécurisé
4. Configurez les règles de réseau pour autoriser l'accès depuis n'importe où (0.0.0.0/0)
5. Obtenez votre chaîne de connexion MongoDB qui ressemblera à :
   ```
   mongodb+srv://<username>:<password>@cluster0.mongodb.net/referencement_immobilier?retryWrites=true&w=majority
   ```

#### 2. Déploiement sur Vercel

1. Connectez-vous à [Vercel](https://vercel.com)
2. Cliquez sur "New Project"
3. Importez votre dépôt Git contenant le projet
4. Configurez les variables d'environnement suivantes :
   - `MONGODB_URI` : Votre chaîne de connexion MongoDB
   - `JWT_SECRET` : Une chaîne aléatoire pour sécuriser les tokens JWT
   - `REFRESH_TOKEN_SECRET` : Une autre chaîne aléatoire pour les tokens de rafraîchissement
   - `NODE_ENV` : "production"
5. Cliquez sur "Deploy"

Vercel détectera automatiquement la configuration Next.js et Node.js grâce au fichier `vercel.json` à la racine du projet.

#### 3. Après le déploiement

Une fois le déploiement terminé, Vercel vous fournira une URL pour accéder à votre application, généralement sous la forme :
```
https://referencement-immobilier.vercel.app
```

Vous pouvez également configurer un domaine personnalisé dans les paramètres du projet sur Vercel.

### Utilisation de l'application déployée

1. Accédez à l'URL fournie par Vercel
2. Utilisez les identifiants de démonstration pour vous connecter :
   - Courtier immobilier : `immobilier@demo.com` / `demo1234`
   - Courtier hypothécaire : `hypothecaire@demo.com` / `demo1234`
   - Administrateur : `admin@demo.com` / `admin1234`

### Mise à jour de l'application

Pour mettre à jour l'application déployée :

1. Effectuez vos modifications dans le code source
2. Committez et poussez vos changements vers le dépôt Git
3. Vercel détectera automatiquement les changements et redéploiera l'application

## Déploiement alternatif sur Netlify

Si vous préférez utiliser Netlify, suivez ces étapes :

1. Créez un compte sur [Netlify](https://www.netlify.com)
2. Cliquez sur "New site from Git"
3. Sélectionnez votre dépôt Git
4. Configurez les paramètres de build :
   - Build command : `cd src/frontend && npm run build`
   - Publish directory : `src/frontend/out`
5. Configurez les mêmes variables d'environnement que pour Vercel
6. Cliquez sur "Deploy site"

## Support et maintenance

Pour toute question ou problème concernant le déploiement, n'hésitez pas à nous contacter. Nous proposons également des services de maintenance et d'évolution de l'application selon vos besoins.
