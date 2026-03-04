# Homeschool - Application d'apprentissage interactive

Application web educative pour enfants en IEF (Instruction En Famille), avec deux themes au choix : **Minecraft** et **Lalilo**.

## Fonctionnalites

### 6 matieres - 5 niveaux chacune (150+ exercices)
- **Maths** : Operations, geometrie, problemes
- **Francais** : Grammaire, conjugaison, vocabulaire
- **Histoire** : Prehistoire a Revolution francaise
- **Geographie** : France, Europe, Monde, Climats, Populations
- **Sciences** : Corps humain, Systeme solaire, Nature, Energie, Matiere
- **Anglais** : Vocabulary, Daily Life, Grammar, Reading, Conversation

### Carte Interactive (Leaflet.js)
- **Mode Histoire** : 15 lieux historiques (Lascaux, Alesia, Versailles, Pyramides, Colisee...)
- **Mode Geographie** : 12 points d'interet (Mont Blanc, Paris, Londres, Everest, Sahara...)
- Quiz interactif pour chaque lieu (+20 XP par decouverte)
- Filtrage par periode/categorie
- Progression sauvegardee

### Systeme de progression
- XP et niveaux
- Serie de jours consecutifs
- Badges et recompenses
- Confettis de celebration

### Generation IA (optionnel)
- Le parent peut generer des exercices personnalises via l'API Anthropic
- Dashboard parent avec code PIN

### 2 themes
- **Minecraft** : Pixel art, polices retro, couleurs bloc
- **Lalilo** : Doux, colore, adapte aux plus jeunes

## Demarrage rapide

```bash
# Installer les dependances
npm install

# Lancer en mode dev
npm run dev

# (Optionnel) Lancer avec le serveur IA
# Creer un fichier .env avec ANTHROPIC_API_KEY=votre-cle
npm run dev:full
```

## Deploiement sur GitHub Pages

```bash
# Build et deploy en une commande
npm run deploy
```

Le site sera accessible sur : `https://<votre-username>.github.io/Homeschool-/`

## Stack technique

- **React 19** + Vite
- **Leaflet.js** + React-Leaflet (carte interactive)
- **Canvas Confetti** (animations)
- **Express** (serveur IA optionnel)
- **Anthropic Claude API** (generation d'exercices)

## Structure du projet

```
src/
  components/    # Composants reutilisables (LoginScreen, XPBar, BadgeDisplay...)
  pages/         # Pages principales (Dashboard, SubjectPage, InteractiveMap...)
  data/          # Exercices par matiere + donnees de la carte
  hooks/         # useProgress (gestion XP/niveaux)
  api.js         # Communication avec le serveur IA
server.js        # Serveur Express pour generation IA
```
