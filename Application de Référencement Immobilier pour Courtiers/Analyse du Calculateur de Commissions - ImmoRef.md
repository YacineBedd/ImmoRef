# Analyse du Calculateur de Commissions - ImmoRef

## Objectif
Développer une section interactive permettant aux utilisateurs de calculer et visualiser les commissions de référencement en fonction du montant financé/acheté, du pourcentage de commission et du volume total pour les bonus supplémentaires.

## Exigences fonctionnelles

### 1. Calculateur interactif
- Champ pour saisir le montant total financé ou acheté
- Champ pour saisir le pourcentage de commission souhaité
- Champ pour saisir le volume total (pour les bonus supplémentaires)
- Bouton de calcul pour générer les résultats
- Affichage des résultats en temps réel

### 2. Visualisations graphiques
- Graphique montrant l'évolution des commissions en fonction du montant
- Graphique montrant l'impact des différents pourcentages sur la commission
- Visualisation des paliers de bonus en fonction du volume total

### 3. Variables de calcul
- Montant total financé ou acheté (en $)
- Pourcentage de commission de base (%)
- Volume total pour les bonus supplémentaires (en $)
- Paliers de bonus (à définir)

### 4. Formules de calcul
- Commission de base = Montant total × Pourcentage de commission
- Bonus supplémentaires basés sur des paliers de volume total
- Commission totale = Commission de base + Bonus

### 5. Accessibilité
- Fonctionnalité accessible à tous les utilisateurs
- Interface intuitive et réactive

### 6. Intégration dans l'application
- Ajout d'un nouvel élément dans le menu principal : "Calculateur de commissions"
- Page dédiée avec le calculateur et les visualisations

## Conception technique

### Structure de données
```javascript
{
  montantTotal: Number,        // Montant financé ou acheté
  pourcentageCommission: Number, // Pourcentage de commission
  volumeTotal: Number,         // Volume total pour les bonus
  commissionBase: Number,      // Résultat du calcul de base
  bonus: Number,               // Bonus calculé
  commissionTotale: Number     // Commission totale
}
```

### Paliers de bonus (proposition)
- Volume < 1 000 000 $ : Pas de bonus
- Volume entre 1 000 000 $ et 5 000 000 $ : +0.1% de bonus
- Volume entre 5 000 000 $ et 10 000 000 $ : +0.2% de bonus
- Volume > 10 000 000 $ : +0.5% de bonus

### Composants UI nécessaires
1. Formulaire de saisie des données
2. Section d'affichage des résultats
3. Composants de visualisation graphique
4. Tableau récapitulatif des calculs

### Bibliothèques à utiliser
- React pour l'interface utilisateur
- Chart.js ou D3.js pour les visualisations graphiques
- Formik pour la gestion des formulaires
- Tailwind CSS pour le style (cohérent avec le reste de l'application)

## Maquette conceptuelle

### Page du calculateur
```
+-----------------------------------------------+
|                   ImmoRef                     |
+-----------------------------------------------+
| [Menu] | Tableau de bord | ... | Calculateur |
+-----------------------------------------------+
|                                               |
|  Calculateur de Commissions de Référencement  |
|                                               |
|  +---------------------------------------+    |
|  | Montant total ($): [____________]     |    |
|  | Pourcentage de commission (%): [____] |    |
|  | Volume total ($): [____________]      |    |
|  |                                       |    |
|  | [Calculer]                            |    |
|  +---------------------------------------+    |
|                                               |
|  Résultats:                                   |
|                                               |
|  Commission de base: 5 000,00 $               |
|  Bonus: 500,00 $                              |
|  Commission totale: 5 500,00 $                |
|                                               |
|  +---------------------------------------+    |
|  |                                       |    |
|  |       [Graphique d'évolution]         |    |
|  |                                       |    |
|  +---------------------------------------+    |
|                                               |
|  +---------------------------------------+    |
|  |                                       |    |
|  |       [Graphique des paliers]         |    |
|  |                                       |    |
|  +---------------------------------------+    |
|                                               |
+-----------------------------------------------+
```

## Prochaines étapes
1. Valider les paliers de bonus et les formules de calcul avec l'utilisateur
2. Développer le composant React pour le calculateur
3. Intégrer les visualisations graphiques
4. Tester la fonctionnalité avec différents scénarios
5. Intégrer la nouvelle section dans l'application ImmoRef
6. Déployer la mise à jour
