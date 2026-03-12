// ═══════════════════════════════════════════════════════════════════
// Videos educatives pour TOUTES les matieres
// Organisees par matiere puis par niveau scolaire
//
// NOTE: Les URLs sont des liens de recherche YouTube (pas des IDs de video)
// afin que les parents puissent facilement trouver la bonne video.
// Format: https://www.youtube.com/results?search_query=...
// ═══════════════════════════════════════════════════════════════════

export const educationalVideos = {
  // ─── Mathematiques ──────────────────────────────────────────────
  math: {
    ce2: [
      { title: 'Les tables de multiplication', channel: 'Maitre Lucas', url: 'https://www.youtube.com/results?search_query=Maitre+Lucas+tables+multiplication+CE2', topic: 'Multiplication' },
      { title: 'La soustraction posee', channel: 'Maitre Lucas', url: 'https://www.youtube.com/results?search_query=Maitre+Lucas+soustraction+posee+CE2', topic: 'Soustraction' },
      { title: 'Les nombres jusqu\'a 9999', channel: 'Les Fondamentaux (Canope)', url: 'https://www.youtube.com/results?search_query=Canope+fondamentaux+nombres+9999+CE2', topic: 'Numeration' },
      { title: 'Lire l\'heure', channel: 'Maitre Lucas', url: 'https://www.youtube.com/results?search_query=Maitre+Lucas+lire+heure+CE2', topic: 'Mesures' },
    ],
    cm1: [
      { title: 'Les fractions - introduction', channel: 'Maitre Lucas', url: 'https://www.youtube.com/results?search_query=Maitre+Lucas+fractions+CM1', topic: 'Fractions' },
      { title: 'La division posee', channel: 'Maitre Lucas', url: 'https://www.youtube.com/results?search_query=Maitre+Lucas+division+posee+CM1', topic: 'Division' },
      { title: 'Les angles droits, aigus, obtus', channel: 'Les Fondamentaux (Canope)', url: 'https://www.youtube.com/results?search_query=Canope+fondamentaux+angles+CM1', topic: 'Geometrie' },
      { title: 'Le perimetre des figures', channel: 'Lumni', url: 'https://www.youtube.com/results?search_query=Lumni+perimetre+figures+CM1', topic: 'Mesures' },
    ],
    cm2: [
      { title: 'Les nombres decimaux', channel: 'Maitre Lucas', url: 'https://www.youtube.com/results?search_query=Maitre+Lucas+nombres+decimaux+CM2', topic: 'Decimaux' },
      { title: 'La proportionnalite', channel: 'Les Fondamentaux (Canope)', url: 'https://www.youtube.com/results?search_query=Canope+fondamentaux+proportionnalite+CM2', topic: 'Proportionnalite' },
      { title: 'L\'aire des figures', channel: 'Lumni', url: 'https://www.youtube.com/results?search_query=Lumni+aire+figures+CM2', topic: 'Mesures' },
      { title: 'La symetrie axiale', channel: 'Maitre Lucas', url: 'https://www.youtube.com/results?search_query=Maitre+Lucas+symetrie+axiale+CM2', topic: 'Geometrie' },
    ],
    '6e': [
      { title: 'Les fractions et operations', channel: 'Lumni', url: 'https://www.youtube.com/results?search_query=Lumni+fractions+operations+6eme', topic: 'Fractions' },
      { title: 'La geometrie dans l\'espace', channel: 'Lumni', url: 'https://www.youtube.com/results?search_query=Lumni+geometrie+espace+6eme', topic: 'Geometrie' },
      { title: 'Les nombres relatifs', channel: 'Lumni', url: 'https://www.youtube.com/results?search_query=Lumni+nombres+relatifs+6eme', topic: 'Numeration' },
      { title: 'Initiation aux statistiques', channel: 'Lumni', url: 'https://www.youtube.com/results?search_query=Lumni+statistiques+6eme+maths', topic: 'Statistiques' },
    ],
    '5e': [
      { title: 'Le calcul litteral', channel: 'Lumni', url: 'https://www.youtube.com/results?search_query=Lumni+calcul+litteral+5eme', topic: 'Algebre' },
      { title: 'Les triangles et proprietes', channel: 'Lumni', url: 'https://www.youtube.com/results?search_query=Lumni+triangles+proprietes+5eme', topic: 'Geometrie' },
      { title: 'Les pourcentages', channel: 'Lumni', url: 'https://www.youtube.com/results?search_query=Lumni+pourcentages+5eme+maths', topic: 'Proportionnalite' },
    ],
  },

  // ─── Francais ───────────────────────────────────────────────────
  french: {
    ce2: [
      { title: 'Le present des verbes du 1er groupe', channel: 'Les Fondamentaux (Canope)', url: 'https://www.youtube.com/results?search_query=Canope+fondamentaux+present+1er+groupe+CE2', topic: 'Conjugaison' },
      { title: 'Le nom et le determinant', channel: 'Maitre Lucas', url: 'https://www.youtube.com/results?search_query=Maitre+Lucas+nom+determinant+CE2', topic: 'Grammaire' },
      { title: 'Les sons et les syllabes', channel: 'Les Fondamentaux (Canope)', url: 'https://www.youtube.com/results?search_query=Canope+fondamentaux+sons+syllabes+CE2', topic: 'Orthographe' },
      { title: 'Raconter une histoire', channel: 'Lumni', url: 'https://www.youtube.com/results?search_query=Lumni+raconter+histoire+CE2+francais', topic: 'Expression' },
    ],
    cm1: [
      { title: 'L\'imparfait de l\'indicatif', channel: 'Les Fondamentaux (Canope)', url: 'https://www.youtube.com/results?search_query=Canope+fondamentaux+imparfait+CM1', topic: 'Conjugaison' },
      { title: 'Les complements du verbe (COD/COI)', channel: 'Maitre Lucas', url: 'https://www.youtube.com/results?search_query=Maitre+Lucas+COD+COI+CM1', topic: 'Grammaire' },
      { title: 'Les homophones grammaticaux', channel: 'Les Fondamentaux (Canope)', url: 'https://www.youtube.com/results?search_query=Canope+fondamentaux+homophones+CM1', topic: 'Orthographe' },
      { title: 'Ecrire un texte descriptif', channel: 'Lumni', url: 'https://www.youtube.com/results?search_query=Lumni+ecrire+texte+descriptif+CM1', topic: 'Expression' },
    ],
    cm2: [
      { title: 'Le passe simple', channel: 'Les Fondamentaux (Canope)', url: 'https://www.youtube.com/results?search_query=Canope+fondamentaux+passe+simple+CM2', topic: 'Conjugaison' },
      { title: 'Les propositions (principale, subordonnee)', channel: 'Lumni', url: 'https://www.youtube.com/results?search_query=Lumni+propositions+principale+subordonnee+CM2', topic: 'Grammaire' },
      { title: 'Les prefixes et suffixes', channel: 'Les Fondamentaux (Canope)', url: 'https://www.youtube.com/results?search_query=Canope+fondamentaux+prefixes+suffixes+CM2', topic: 'Vocabulaire' },
    ],
    '6e': [
      { title: 'Les classes grammaticales', channel: 'Lumni', url: 'https://www.youtube.com/results?search_query=Lumni+classes+grammaticales+6eme', topic: 'Grammaire' },
      { title: 'Le recit et ses caracteristiques', channel: 'Lumni', url: 'https://www.youtube.com/results?search_query=Lumni+recit+caracteristiques+6eme', topic: 'Litterature' },
      { title: 'Conjuguer au passe compose et imparfait', channel: 'Lumni', url: 'https://www.youtube.com/results?search_query=Lumni+passe+compose+imparfait+6eme', topic: 'Conjugaison' },
    ],
    '5e': [
      { title: 'Les figures de style', channel: 'Lumni', url: 'https://www.youtube.com/results?search_query=Lumni+figures+de+style+5eme+francais', topic: 'Litterature' },
      { title: 'Le subjonctif present', channel: 'Lumni', url: 'https://www.youtube.com/results?search_query=Lumni+subjonctif+present+5eme', topic: 'Conjugaison' },
      { title: 'L\'argumentation', channel: 'Lumni', url: 'https://www.youtube.com/results?search_query=Lumni+argumentation+5eme+francais', topic: 'Expression' },
    ],
  },

  // ─── Histoire ───────────────────────────────────────────────────
  history: {
    ce2: [
      { title: 'La Prehistoire pour les enfants', channel: 'C\'est pas sorcier', url: 'https://www.youtube.com/results?search_query=C+est+pas+sorcier+prehistoire', topic: 'Prehistoire' },
      { title: 'Les premiers hommes', channel: 'Il etait une fois l\'Homme', url: 'https://www.youtube.com/results?search_query=Il+etait+une+fois+homme+premiers+hommes', topic: 'Prehistoire' },
      { title: 'L\'invention de l\'ecriture', channel: 'Lumni', url: 'https://www.youtube.com/results?search_query=Lumni+invention+ecriture+CE2+histoire', topic: 'Antiquite' },
    ],
    cm1: [
      { title: 'Les Gaulois et les Romains', channel: 'C\'est pas sorcier', url: 'https://www.youtube.com/results?search_query=C+est+pas+sorcier+Gaulois+Romains', topic: 'Antiquite' },
      { title: 'Clovis et les Merovingiens', channel: 'Lumni', url: 'https://www.youtube.com/results?search_query=Lumni+Clovis+Merovingiens+CM1', topic: 'Moyen Age' },
      { title: 'Le Moyen Age pour les enfants', channel: 'Il etait une fois l\'Homme', url: 'https://www.youtube.com/results?search_query=Il+etait+une+fois+homme+Moyen+Age', topic: 'Moyen Age' },
      { title: 'Charlemagne et son empire', channel: 'Lumni', url: 'https://www.youtube.com/results?search_query=Lumni+Charlemagne+empire+CM1', topic: 'Moyen Age' },
    ],
    cm2: [
      { title: 'La Revolution francaise', channel: 'C\'est pas sorcier', url: 'https://www.youtube.com/results?search_query=C+est+pas+sorcier+Revolution+francaise', topic: 'Revolution' },
      { title: 'Napoleon Bonaparte', channel: 'Lumni', url: 'https://www.youtube.com/results?search_query=Lumni+Napoleon+Bonaparte+CM2', topic: 'XIXe siecle' },
      { title: 'La Renaissance et les grandes decouvertes', channel: 'Il etait une fois l\'Homme', url: 'https://www.youtube.com/results?search_query=Il+etait+une+fois+homme+Renaissance+grandes+decouvertes', topic: 'Renaissance' },
      { title: 'Louis XIV, le Roi Soleil', channel: 'Lumni', url: 'https://www.youtube.com/results?search_query=Lumni+Louis+XIV+Roi+Soleil+CM2', topic: 'Temps modernes' },
    ],
    '6e': [
      { title: 'L\'Egypte ancienne et les pharaons', channel: 'C\'est pas sorcier', url: 'https://www.youtube.com/results?search_query=C+est+pas+sorcier+Egypte+pharaons', topic: 'Antiquite' },
      { title: 'La Grece antique - Athenes et Sparte', channel: 'Lumni', url: 'https://www.youtube.com/results?search_query=Lumni+Grece+antique+Athenes+Sparte+6eme', topic: 'Antiquite' },
      { title: 'Rome, de la Republique a l\'Empire', channel: 'Lumni', url: 'https://www.youtube.com/results?search_query=Lumni+Rome+Republique+Empire+6eme', topic: 'Antiquite' },
    ],
    '5e': [
      { title: 'L\'Islam et le monde musulman', channel: 'Lumni', url: 'https://www.youtube.com/results?search_query=Lumni+Islam+monde+musulman+5eme+histoire', topic: 'Moyen Age' },
      { title: 'Les grandes decouvertes (XVe-XVIe)', channel: 'Lumni', url: 'https://www.youtube.com/results?search_query=Lumni+grandes+decouvertes+XVe+XVIe+5eme', topic: 'Renaissance' },
      { title: 'La Renaissance artistique', channel: 'Lumni', url: 'https://www.youtube.com/results?search_query=Lumni+Renaissance+artistique+5eme+histoire', topic: 'Renaissance' },
    ],
  },

  // ─── Geographie ─────────────────────────────────────────────────
  geography: {
    ce2: [
      { title: 'Se reperer dans l\'espace - la carte', channel: 'Maitre Lucas', url: 'https://www.youtube.com/results?search_query=Maitre+Lucas+se+reperer+espace+carte+CE2', topic: 'Reperage' },
      { title: 'La ville et la campagne', channel: 'Les Fondamentaux (Canope)', url: 'https://www.youtube.com/results?search_query=Canope+fondamentaux+ville+campagne+CE2', topic: 'Paysages' },
      { title: 'Les paysages de France', channel: 'Lumni', url: 'https://www.youtube.com/results?search_query=Lumni+paysages+France+CE2+geographie', topic: 'Paysages' },
    ],
    cm1: [
      { title: 'Les grandes villes de France', channel: 'Lumni', url: 'https://www.youtube.com/results?search_query=Lumni+grandes+villes+France+CM1', topic: 'France' },
      { title: 'Les fleuves et les montagnes de France', channel: 'C\'est pas sorcier', url: 'https://www.youtube.com/results?search_query=C+est+pas+sorcier+fleuves+montagnes+France', topic: 'Relief' },
      { title: 'Se deplacer en France', channel: 'Lumni', url: 'https://www.youtube.com/results?search_query=Lumni+se+deplacer+France+CM1+geographie', topic: 'Transports' },
    ],
    cm2: [
      { title: 'La France dans le monde', channel: 'Lumni', url: 'https://www.youtube.com/results?search_query=Lumni+France+dans+le+monde+CM2', topic: 'France/Monde' },
      { title: 'Les continents et les oceans', channel: 'C\'est pas sorcier', url: 'https://www.youtube.com/results?search_query=C+est+pas+sorcier+continents+oceans', topic: 'Monde' },
      { title: 'Le developpement durable', channel: 'Lumni', url: 'https://www.youtube.com/results?search_query=Lumni+developpement+durable+CM2', topic: 'Environnement' },
      { title: 'Les territoires d\'outre-mer', channel: 'Lumni', url: 'https://www.youtube.com/results?search_query=Lumni+territoires+outre+mer+CM2', topic: 'France' },
    ],
    '6e': [
      { title: 'Habiter une metropole', channel: 'Lumni', url: 'https://www.youtube.com/results?search_query=Lumni+habiter+metropole+6eme+geographie', topic: 'Urbanisation' },
      { title: 'Habiter les littoraux', channel: 'Lumni', url: 'https://www.youtube.com/results?search_query=Lumni+habiter+littoraux+6eme', topic: 'Littoraux' },
      { title: 'La repartition de la population mondiale', channel: 'Lumni', url: 'https://www.youtube.com/results?search_query=Lumni+repartition+population+mondiale+6eme', topic: 'Population' },
    ],
    '5e': [
      { title: 'Le changement climatique', channel: 'C\'est pas sorcier', url: 'https://www.youtube.com/results?search_query=C+est+pas+sorcier+changement+climatique', topic: 'Climat' },
      { title: 'Les ressources en eau dans le monde', channel: 'Lumni', url: 'https://www.youtube.com/results?search_query=Lumni+ressources+eau+monde+5eme', topic: 'Ressources' },
      { title: 'Les risques naturels et technologiques', channel: 'Lumni', url: 'https://www.youtube.com/results?search_query=Lumni+risques+naturels+technologiques+5eme', topic: 'Risques' },
    ],
  },

  // ─── Sciences ───────────────────────────────────────────────────
  science: {
    ce2: [
      { title: 'Le corps humain - les organes', channel: 'C\'est pas sorcier', url: 'https://www.youtube.com/results?search_query=C+est+pas+sorcier+corps+humain+organes', topic: 'Corps humain' },
      { title: 'Les etats de l\'eau', channel: 'Maitre Lucas', url: 'https://www.youtube.com/results?search_query=Maitre+Lucas+etats+eau+CE2+sciences', topic: 'Matiere' },
      { title: 'Les animaux et leur milieu', channel: 'C\'est pas sorcier', url: 'https://www.youtube.com/results?search_query=C+est+pas+sorcier+animaux+milieu+vie', topic: 'Vivant' },
      { title: 'Le cycle de l\'eau', channel: 'Les Fondamentaux (Canope)', url: 'https://www.youtube.com/results?search_query=Canope+fondamentaux+cycle+eau+CE2', topic: 'Matiere' },
    ],
    cm1: [
      { title: 'Les volcans', channel: 'C\'est pas sorcier', url: 'https://www.youtube.com/results?search_query=C+est+pas+sorcier+volcans', topic: 'Terre' },
      { title: 'L\'electricite - les circuits', channel: 'Maitre Lucas', url: 'https://www.youtube.com/results?search_query=Maitre+Lucas+electricite+circuits+CM1', topic: 'Electricite' },
      { title: 'La digestion', channel: 'C\'est pas sorcier', url: 'https://www.youtube.com/results?search_query=C+est+pas+sorcier+digestion', topic: 'Corps humain' },
      { title: 'Les chaines alimentaires', channel: 'Lumni', url: 'https://www.youtube.com/results?search_query=Lumni+chaines+alimentaires+CM1+sciences', topic: 'Vivant' },
    ],
    cm2: [
      { title: 'Le systeme solaire', channel: 'C\'est pas sorcier', url: 'https://www.youtube.com/results?search_query=C+est+pas+sorcier+systeme+solaire', topic: 'Espace' },
      { title: 'La reproduction des plantes', channel: 'Les Fondamentaux (Canope)', url: 'https://www.youtube.com/results?search_query=Canope+fondamentaux+reproduction+plantes+CM2', topic: 'Vivant' },
      { title: 'Les energies renouvelables', channel: 'C\'est pas sorcier', url: 'https://www.youtube.com/results?search_query=C+est+pas+sorcier+energies+renouvelables', topic: 'Energie' },
      { title: 'Les melanges et solutions', channel: 'Lumni', url: 'https://www.youtube.com/results?search_query=Lumni+melanges+solutions+CM2+sciences', topic: 'Matiere' },
    ],
    '6e': [
      { title: 'La cellule, unite du vivant', channel: 'Lumni', url: 'https://www.youtube.com/results?search_query=Lumni+cellule+unite+vivant+6eme+SVT', topic: 'Vivant' },
      { title: 'Les seismes et les volcans', channel: 'C\'est pas sorcier', url: 'https://www.youtube.com/results?search_query=C+est+pas+sorcier+seismes+volcans', topic: 'Terre' },
      { title: 'La classification des etres vivants', channel: 'Lumni', url: 'https://www.youtube.com/results?search_query=Lumni+classification+etres+vivants+6eme', topic: 'Vivant' },
    ],
    '5e': [
      { title: 'La nutrition des organes', channel: 'Lumni', url: 'https://www.youtube.com/results?search_query=Lumni+nutrition+organes+5eme+SVT', topic: 'Corps humain' },
      { title: 'La respiration et les echanges gazeux', channel: 'C\'est pas sorcier', url: 'https://www.youtube.com/results?search_query=C+est+pas+sorcier+respiration+echanges+gazeux', topic: 'Corps humain' },
      { title: 'Les ecosystemes et la biodiversite', channel: 'Lumni', url: 'https://www.youtube.com/results?search_query=Lumni+ecosystemes+biodiversite+5eme', topic: 'Vivant' },
    ],
  },

  // ─── Anglais ────────────────────────────────────────────────────
  english: {
    ce2: [
      { title: 'Les salutations et presentations', channel: 'Maitre Lucas', url: 'https://www.youtube.com/results?search_query=Maitre+Lucas+anglais+salutations+CE2', topic: 'Greetings' },
      { title: 'Les couleurs en anglais', channel: 'Les Fondamentaux (Canope)', url: 'https://www.youtube.com/results?search_query=Canope+fondamentaux+couleurs+anglais+CE2', topic: 'Colors' },
      { title: 'Les nombres de 1 a 20', channel: 'Maitre Lucas', url: 'https://www.youtube.com/results?search_query=Maitre+Lucas+anglais+nombres+1+20+CE2', topic: 'Numbers' },
    ],
    cm1: [
      { title: 'Decrire sa famille en anglais', channel: 'Maitre Lucas', url: 'https://www.youtube.com/results?search_query=Maitre+Lucas+anglais+famille+CM1', topic: 'Family' },
      { title: 'Les aliments en anglais', channel: 'Les Fondamentaux (Canope)', url: 'https://www.youtube.com/results?search_query=Canope+fondamentaux+aliments+food+anglais+CM1', topic: 'Food' },
      { title: 'L\'heure en anglais', channel: 'Lumni', url: 'https://www.youtube.com/results?search_query=Lumni+heure+anglais+CM1', topic: 'Time' },
    ],
    cm2: [
      { title: 'Se presenter en anglais', channel: 'Lumni', url: 'https://www.youtube.com/results?search_query=Lumni+se+presenter+anglais+CM2', topic: 'Introduction' },
      { title: 'Les verbes d\'action en anglais', channel: 'Les Fondamentaux (Canope)', url: 'https://www.youtube.com/results?search_query=Canope+fondamentaux+verbes+action+anglais+CM2', topic: 'Verbs' },
      { title: 'Decrire un lieu en anglais', channel: 'Lumni', url: 'https://www.youtube.com/results?search_query=Lumni+decrire+lieu+anglais+CM2', topic: 'Places' },
    ],
    '6e': [
      { title: 'Le present simple en anglais', channel: 'English with Lucy', url: 'https://www.youtube.com/results?search_query=English+with+Lucy+present+simple+debutant', topic: 'Present simple' },
      { title: 'Le vocabulaire du quotidien', channel: 'Lumni', url: 'https://www.youtube.com/results?search_query=Lumni+anglais+vocabulaire+quotidien+6eme', topic: 'Daily life' },
      { title: 'Les questions en anglais (who, what, where)', channel: 'Lumni', url: 'https://www.youtube.com/results?search_query=Lumni+anglais+questions+who+what+where+6eme', topic: 'Questions' },
    ],
    '5e': [
      { title: 'Le passe simple anglais (past simple)', channel: 'English with Lucy', url: 'https://www.youtube.com/results?search_query=English+with+Lucy+past+simple+beginner', topic: 'Past simple' },
      { title: 'Ecrire un email en anglais', channel: 'Easy English', url: 'https://www.youtube.com/results?search_query=Easy+English+ecrire+email+debutant', topic: 'Writing' },
      { title: 'Conversations simples en anglais', channel: 'Easy English', url: 'https://www.youtube.com/results?search_query=Easy+English+conversations+simples+debutant', topic: 'Speaking' },
    ],
  },

  // ─── EMC (Enseignement Moral et Civique) ────────────────────────
  emc: {
    ce2: [
      { title: 'Les regles de vie en societe', channel: 'Les Fondamentaux (Canope)', url: 'https://www.youtube.com/results?search_query=Canope+fondamentaux+regles+vie+societe+CE2', topic: 'Vivre ensemble' },
      { title: 'Les droits de l\'enfant', channel: 'Lumni', url: 'https://www.youtube.com/results?search_query=Lumni+droits+enfant+CE2+EMC', topic: 'Droits' },
      { title: 'L\'egalite filles-garcons', channel: 'Lumni', url: 'https://www.youtube.com/results?search_query=Lumni+egalite+filles+garcons+CE2', topic: 'Egalite' },
    ],
    cm1: [
      { title: 'La laicite expliquee aux enfants', channel: 'Lumni', url: 'https://www.youtube.com/results?search_query=Lumni+laicite+expliquee+enfants+CM1', topic: 'Laicite' },
      { title: 'Le harcelement scolaire', channel: 'Lumni', url: 'https://www.youtube.com/results?search_query=Lumni+harcelement+scolaire+CM1', topic: 'Harcelement' },
      { title: 'Les emotions et l\'empathie', channel: 'Les Fondamentaux (Canope)', url: 'https://www.youtube.com/results?search_query=Canope+fondamentaux+emotions+empathie+CM1', topic: 'Emotions' },
    ],
    cm2: [
      { title: 'La Republique et ses symboles', channel: 'Lumni', url: 'https://www.youtube.com/results?search_query=Lumni+Republique+symboles+CM2', topic: 'Republique' },
      { title: 'Internet et les dangers du web', channel: 'Lumni', url: 'https://www.youtube.com/results?search_query=Lumni+internet+dangers+web+CM2+EMC', topic: 'Numerique' },
      { title: 'La solidarite et l\'entraide', channel: 'Les Fondamentaux (Canope)', url: 'https://www.youtube.com/results?search_query=Canope+fondamentaux+solidarite+entraide+CM2', topic: 'Solidarite' },
    ],
    '6e': [
      { title: 'La citoyennete et la democratie', channel: 'Lumni', url: 'https://www.youtube.com/results?search_query=Lumni+citoyennete+democratie+6eme+EMC', topic: 'Citoyennete' },
      { title: 'Liberte, egalite, fraternite', channel: 'Lumni', url: 'https://www.youtube.com/results?search_query=Lumni+liberte+egalite+fraternite+6eme', topic: 'Valeurs' },
      { title: 'Les discriminations', channel: 'Lumni', url: 'https://www.youtube.com/results?search_query=Lumni+discriminations+6eme+EMC', topic: 'Discriminations' },
    ],
    '5e': [
      { title: 'Les droits et devoirs du citoyen', channel: 'Lumni', url: 'https://www.youtube.com/results?search_query=Lumni+droits+devoirs+citoyen+5eme+EMC', topic: 'Citoyennete' },
      { title: 'La justice en France', channel: 'Lumni', url: 'https://www.youtube.com/results?search_query=Lumni+justice+France+5eme+EMC', topic: 'Justice' },
      { title: 'L\'engagement associatif et citoyen', channel: 'Lumni', url: 'https://www.youtube.com/results?search_query=Lumni+engagement+associatif+citoyen+5eme', topic: 'Engagement' },
    ],
  },
}

// ─── Mapping grade du profil vers cle dans educationalVideos ──────
// profile.grade = 'CE2', 'CM1', 'CM2', '6e', '5e'
// Level IDs contain grade info: 'math-1' (CE2), 'math-2' (CM1), etc.
export function gradeToKey(grade) {
  if (!grade) return 'ce2'
  const g = grade.toLowerCase().replace('eme', 'e').replace('è', 'e')
  if (g.includes('ce2')) return 'ce2'
  if (g.includes('cm1')) return 'cm1'
  if (g.includes('cm2')) return 'cm2'
  if (g.includes('6')) return '6e'
  if (g.includes('5')) return '5e'
  return 'ce2'
}

// ─── Icones par matiere ──────────────────────────────────────────
export const subjectVideoIcons = {
  math: '🔢',
  french: '📖',
  history: '🏛️',
  geography: '🌍',
  science: '🔬',
  english: '🇬🇧',
  emc: '⚖️',
}
