# Frontend SaaS Ferme Immobilière

## Description

Interface utilisateur moderne et responsive pour le SaaS de ferme immobilière, développée avec React et Tailwind CSS. Cette application web fournit une expérience utilisateur complète pour la gestion immobilière avec intelligence artificielle.

## Fonctionnalités

### 🏠 Tableau de Bord
- Vue d'ensemble des statistiques clés
- Graphiques et indicateurs de performance
- Activités récentes
- Quartiers à fort potentiel

### 🏢 Gestion des Propriétés
- Liste complète des biens immobiliers
- Filtres avancés (type, ville, prix)
- Cartes détaillées de chaque propriété
- Statistiques automatiques

### 👥 Gestion des Prospects
- Système de scoring IA visuel
- Filtrage par statut et type
- Profils détaillés des prospects
- Suivi des conversions

### 🗺️ Analyse des Quartiers
- Scores de potentiel de farming
- Visualisation cartographique
- Analyses IA prédictives
- Recommandations personnalisées

### 📊 Génération de Rapports
- Interface de création de rapports
- Assistant de rédaction IA
- Historique des rapports générés
- Export et partage

### 🤖 Chatbot Intelligent
- Interface de conversation en temps réel
- Pré-qualification automatique des prospects
- Analyse d'intentions
- Génération de leads

## Technologies

- **React 18** - Framework JavaScript moderne
- **Vite** - Build tool ultra-rapide
- **Tailwind CSS** - Framework CSS utility-first
- **Lucide React** - Icônes modernes
- **React Router** - Navigation SPA

## Structure du Projet

```
src/
├── components/          # Composants React
│   ├── ui/             # Composants UI réutilisables
│   │   ├── button.jsx
│   │   ├── card.jsx
│   │   ├── input.jsx
│   │   ├── badge.jsx
│   │   ├── progress.jsx
│   │   └── textarea.jsx
│   ├── Dashboard.jsx   # Tableau de bord principal
│   ├── Login.jsx       # Page de connexion
│   ├── Navbar.jsx      # Barre de navigation
│   ├── Properties.jsx  # Gestion des propriétés
│   ├── Leads.jsx       # Gestion des prospects
│   ├── Neighborhoods.jsx # Analyse des quartiers
│   ├── Reports.jsx     # Génération de rapports
│   └── Chatbot.jsx     # Interface chatbot
├── lib/                # Utilitaires
│   └── utils.js        # Fonctions utilitaires
├── App.jsx             # Composant principal
├── App.css             # Styles globaux
└── main.jsx            # Point d'entrée
```

## Installation

### Prérequis
- Node.js 18+ 
- npm ou yarn

### Étapes d'installation

1. **Installer les dépendances**
```bash
npm install
```

2. **Lancer en développement**
```bash
npm run dev
```

3. **Construire pour la production**
```bash
npm run build
```

4. **Prévisualiser la build**
```bash
npm run preview
```

## Configuration

### Variables d'environnement
Créer un fichier `.env` :
```
VITE_API_URL=http://localhost:5000/api
VITE_APP_NAME=Ferme Immobilière SaaS
```

### Personnalisation
- **Couleurs** : Modifier dans `src/App.css`
- **Logo** : Remplacer dans `src/components/Navbar.jsx`
- **Données** : Connecter à l'API backend

## Fonctionnalités Détaillées

### Interface de Connexion
- Design moderne et responsive
- Validation des formulaires
- Messages d'erreur clairs
- Simulation d'authentification

### Tableau de Bord
- **Statistiques en temps réel** : Propriétés, prospects, quartiers
- **Graphiques interactifs** : Évolution des ventes et prospects
- **Quartiers à potentiel** : Scores IA et recommandations
- **Activités récentes** : Timeline des dernières actions

### Gestion des Propriétés
- **Vue en grille** : Cartes détaillées de chaque bien
- **Filtres avancés** : Par type, ville, prix, statut
- **Recherche intelligente** : Par adresse ou code postal
- **Actions rapides** : Modifier, voir sur carte

### Gestion des Prospects
- **Scoring visuel** : Étoiles et couleurs selon le score IA
- **Filtres par statut** : Nouveau, contacté, qualifié, converti, perdu
- **Profils complets** : Coordonnées, budget, préférences
- **Suivi temporel** : Dates de création et dernier contact

### Analyse des Quartiers
- **Scores multiples** : Potentiel, rotation, demande
- **Barres de progression** : Visualisation intuitive des scores
- **Modal d'analyse IA** : Insights détaillés et recommandations
- **Données démographiques** : Population, âge moyen, revenus

### Génération de Rapports
- **Types multiples** : Marché, prédictions, profils acquéreurs
- **Assistant IA** : Suggestions de contenu automatiques
- **Historique complet** : Tous les rapports générés
- **Statuts visuels** : En cours, terminé, erreur

### Chatbot Intelligent
- **Interface conversationnelle** : Messages en temps réel
- **Suggestions contextuelles** : Boutons de réponse rapide
- **Analyse d'intentions** : Reconnaissance automatique des besoins
- **Contexte IA** : Suivi des informations collectées
- **Génération de leads** : Création automatique de prospects

## Responsive Design

L'application est entièrement responsive :
- **Mobile** : Interface optimisée pour smartphones
- **Tablette** : Adaptation des layouts pour tablettes
- **Desktop** : Expérience complète sur grand écran

## Accessibilité

- **Contraste élevé** : Respect des standards WCAG
- **Navigation clavier** : Support complet
- **Lecteurs d'écran** : Attributs ARIA appropriés
- **Focus visible** : Indicateurs clairs

## Performance

- **Lazy loading** : Chargement à la demande des composants
- **Optimisation images** : Formats modernes et compression
- **Bundle splitting** : Séparation du code pour un chargement rapide
- **Cache intelligent** : Mise en cache des ressources statiques

## Tests

### Tests recommandés
```bash
# Tests unitaires (à implémenter)
npm run test

# Tests e2e (à implémenter)
npm run test:e2e
```

### Structure de tests suggérée
```
tests/
├── unit/
│   ├── components/
│   └── utils/
├── integration/
└── e2e/
```

## Déploiement

### Build de production
```bash
npm run build
```

### Déploiement sur Netlify/Vercel
1. Connecter le repository Git
2. Configurer les variables d'environnement
3. Déployer automatiquement

### Déploiement manuel
```bash
# Après build
npm run preview
# Ou servir le dossier dist/
```

## Intégration Backend

### Configuration API
```javascript
// Dans src/lib/api.js
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

export const api = {
  get: (endpoint) => fetch(`${API_BASE_URL}${endpoint}`),
  post: (endpoint, data) => fetch(`${API_BASE_URL}${endpoint}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
}
```

### Gestion des erreurs
```javascript
// Gestion centralisée des erreurs API
const handleApiError = (error) => {
  console.error('API Error:', error)
  // Afficher notification à l'utilisateur
}
```

## Personnalisation

### Thème et couleurs
```css
/* Dans src/App.css */
:root {
  --primary-color: #3b82f6;
  --secondary-color: #10b981;
  --accent-color: #f59e0b;
  --text-color: #1f2937;
  --background-color: #f9fafb;
}
```

### Ajout de nouvelles pages
1. Créer le composant dans `src/components/`
2. Ajouter la route dans `src/App.jsx`
3. Mettre à jour la navigation dans `src/components/Navbar.jsx`

## Maintenance

### Mise à jour des dépendances
```bash
npm update
npm audit fix
```

### Monitoring des performances
- Utiliser React DevTools
- Analyser les bundles avec `npm run build -- --analyze`
- Surveiller les Core Web Vitals

## Support

### Navigateurs supportés
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### Résolution de problèmes
1. **Build échoue** : Vérifier les versions Node.js et npm
2. **Styles cassés** : Reconstruire avec `npm run build`
3. **API non accessible** : Vérifier l'URL dans `.env`

## Évolutions Futures

### Fonctionnalités prévues
- [ ] Mode sombre
- [ ] Notifications push
- [ ] Export PDF des rapports
- [ ] Carte interactive avec Mapbox
- [ ] Upload de documents
- [ ] Calendrier intégré
- [ ] Messagerie interne

### Améliorations techniques
- [ ] Tests automatisés complets
- [ ] PWA (Progressive Web App)
- [ ] Internationalisation (i18n)
- [ ] State management (Redux/Zustand)
- [ ] WebSockets pour temps réel

## Licence

Ce projet est développé pour Pierre Bournet - Spécialiste Immobilier Toulouse Sud.

---

**Version** : 1.0.0  
**Dernière mise à jour** : Mars 2024  
**Framework** : React 18 + Vite + Tailwind CSS

