// ═══════════════════════════════════════════════════════════════════
// PROGRAMMES OFFICIELS Education Nationale - Cycles 2 et 3
// Sources : eduscol.education.fr, education.gouv.fr (2024-2025)
// ═══════════════════════════════════════════════════════════════════

export const curriculum = {
  // ─── CYCLE 2 : CP, CE1, CE2 ────────────────────────────────────────
  CE2: {
    math: {
      label: 'Mathematiques CE2',
      domains: [
        {
          name: 'Nombres et numeration',
          topics: [
            'Nombres jusqu\'a 10 000',
            'Comparer, ranger, encadrer des nombres',
            'Lire et ecrire les nombres en lettres',
            'La droite numerique',
          ],
        },
        {
          name: 'Calcul',
          topics: [
            'Addition posee avec retenue',
            'Soustraction posee avec retenue',
            'Tables de multiplication (6, 7, 8, 9)',
            'Calcul mental : doubles, moities, complements a 100',
            'Introduction a la multiplication posee',
          ],
        },
        {
          name: 'Grandeurs et mesures',
          topics: [
            'Mesurer des longueurs (m, cm, mm)',
            'Monnaie (euros, centimes)',
            'Lire l\'heure',
            'Mesurer des masses (g, kg)',
            'Contenances (L, dL, cL)',
          ],
        },
        {
          name: 'Geometrie',
          topics: [
            'Carres, rectangles, triangles, losanges',
            'Angles droits et equerre',
            'Symetrie axiale',
            'Reproduire des figures sur quadrillage',
            'Solides : cube, pave',
          ],
        },
        {
          name: 'Resolution de problemes',
          topics: [
            'Problemes additifs et soustractifs',
            'Problemes multiplicatifs simples',
            'Problemes a etapes',
            'Tableaux et graphiques',
          ],
        },
      ],
    },
    french: {
      label: 'Francais CE2',
      domains: [
        {
          name: 'Orthographe',
          topics: [
            'Accords sujet-verbe',
            'Pluriel des noms (reguliers et en -al, -eau, -ou)',
            'Accord dans le groupe nominal (determinant, nom, adjectif)',
            'Homophones : a/a, et/est, on/ont, son/sont',
          ],
        },
        {
          name: 'Conjugaison',
          topics: [
            'Present des verbes en -er, -ir, etre, avoir',
            'Futur simple',
            'Imparfait',
            'Passe compose avec avoir',
          ],
        },
        {
          name: 'Grammaire',
          topics: [
            'La phrase : sujet, verbe, complement',
            'Types de phrases (declarative, interrogative, exclamative)',
            'Formes de phrases (affirmative, negative)',
            'Noms, determinants, adjectifs',
          ],
        },
        {
          name: 'Vocabulaire',
          topics: [
            'Synonymes et antonymes',
            'Familles de mots',
            'L\'ordre alphabetique et le dictionnaire',
            'Mots generiques et specifiques',
          ],
        },
      ],
    },
    history: {
      label: 'Questionner le monde - Temps CE2',
      domains: [
        {
          name: 'Se reperer dans le temps',
          topics: [
            'La frise chronologique',
            'Les grandes periodes de l\'histoire',
            'Avant / apres, siecle, millenaire',
            'Les traces du passe (monuments, objets)',
          ],
        },
      ],
    },
    geography: {
      label: 'Questionner le monde - Espace CE2',
      domains: [
        {
          name: 'Se reperer dans l\'espace',
          topics: [
            'Mon quartier, ma commune',
            'Lire un plan, une carte simple',
            'Paysages : littoral, montagne, campagne, ville',
            'Comparer des lieux de vie',
          ],
        },
      ],
    },
    science: {
      label: 'Questionner le monde - Sciences CE2',
      domains: [
        {
          name: 'Le vivant',
          topics: [
            'Les besoins des etres vivants',
            'Les stades de la vie (naissance, croissance)',
            'Regimes alimentaires',
            'Les chaines alimentaires simples',
          ],
        },
        {
          name: 'La matiere',
          topics: [
            'Les etats de l\'eau (solide, liquide, gaz)',
            'Le cycle de l\'eau',
            'Melanges et solutions',
          ],
        },
        {
          name: 'Les objets techniques',
          topics: [
            'Circuits electriques simples',
            'Leviers et engrenages',
          ],
        },
      ],
    },
    english: {
      label: 'Langues vivantes CE2',
      domains: [
        {
          name: 'Communication',
          topics: [
            'Se presenter (nom, age, famille)',
            'Les salutations',
            'Les couleurs et les nombres (1-20)',
            'Les animaux domestiques',
            'La nourriture (fruits, legumes)',
            'Les jours de la semaine',
          ],
        },
      ],
    },
  },

  // ─── CYCLE 3 : CM1 ─────────────────────────────────────────────────
  CM1: {
    math: {
      label: 'Mathematiques CM1',
      domains: [
        {
          name: 'Nombres et numeration',
          topics: [
            'Nombres jusqu\'a 999 999',
            'Fractions simples (1/2, 1/4, 1/3, 3/4)',
            'Fractions decimales (1/10, 1/100)',
            'Introduction des nombres decimaux',
            'Comparer et ranger des grands nombres',
          ],
        },
        {
          name: 'Calcul',
          topics: [
            'Multiplication posee par un nombre a 2 chiffres',
            'Division euclidienne (diviseur a 1 chiffre)',
            'Calcul mental : multiplier/diviser par 10, 100, 1000',
            'Addition et soustraction de fractions simples',
            'Multiples et diviseurs',
          ],
        },
        {
          name: 'Grandeurs et mesures',
          topics: [
            'Perimetre du carre et du rectangle',
            'Conversions de longueurs (km, m, cm, mm)',
            'Conversions de masses (t, kg, g)',
            'Durees et calculs d\'horaires',
            'Introduction a l\'aire (pavages)',
          ],
        },
        {
          name: 'Geometrie',
          topics: [
            'Droites paralleles et perpendiculaires',
            'Triangles : construction et proprietes',
            'Cercle : centre, rayon, diametre',
            'Programmes de construction',
            'Symetrie axiale',
          ],
        },
        {
          name: 'Proportionnalite et donnees',
          topics: [
            'Tableaux de proportionnalite',
            'Lire et interpreter un graphique',
            'Situations de proportionnalite simples',
          ],
        },
      ],
    },
    french: {
      label: 'Francais CM1',
      domains: [
        {
          name: 'Conjugaison',
          topics: [
            'Present, futur, imparfait de tous les groupes',
            'Passe compose (avoir et etre)',
            'Passe simple (3eme personne)',
            'Imperatif present',
          ],
        },
        {
          name: 'Grammaire',
          topics: [
            'Complements du verbe : COD, COI',
            'Complements de phrase (CCL, CCT)',
            'Propositions : phrase simple / phrase complexe',
            'Les pronoms personnels sujets et complements',
            'La voix active',
          ],
        },
        {
          name: 'Orthographe',
          topics: [
            'Accord du participe passe avec etre',
            'Homophones grammaticaux (ce/se, c\'est/s\'est, leur/leurs)',
            'Les mots invariables',
            'Le feminin et le pluriel des adjectifs',
          ],
        },
        {
          name: 'Vocabulaire et expression',
          topics: [
            'Prefixes et suffixes',
            'Sens propre et sens figure',
            'Niveaux de langue',
            'Rediger un recit court',
            'Le compte rendu',
          ],
        },
      ],
    },
    history: {
      label: 'Histoire CM1',
      domains: [
        {
          name: 'Avant la France',
          topics: [
            'Les premieres traces de vie humaine',
            'La maitrise du fer et les debuts de l\'agriculture',
            'Les Gaulois',
            'La romanisation de la Gaule',
          ],
        },
        {
          name: 'Le temps des rois',
          topics: [
            'Clovis et les Merovingiens',
            'Charlemagne et les Carolingiens',
            'Les Capetiens et la construction du royaume',
          ],
        },
      ],
    },
    geography: {
      label: 'Geographie CM1',
      domains: [
        {
          name: 'Decouvrir les lieux ou j\'habite',
          topics: [
            'Mon lieu de vie : quartier, commune, departement, region',
            'Les activites economiques locales',
          ],
        },
        {
          name: 'Se loger, travailler, se cultiver',
          topics: [
            'Dans un espace urbain',
            'Dans un espace touristique',
            'Les transports',
          ],
        },
      ],
    },
    science: {
      label: 'Sciences et technologie CM1',
      domains: [
        {
          name: 'Matiere, mouvement, energie',
          topics: [
            'Etats et changements d\'etat de la matiere',
            'Melanges : separations et dissolutions',
            'Sources d\'energie et conversions',
            'Le mouvement : vitesse et trajectoire',
          ],
        },
        {
          name: 'Le vivant',
          topics: [
            'Classification des etres vivants',
            'Les besoins nutritifs des vegetaux',
            'La digestion et la respiration',
            'Les chaines et reseaux alimentaires',
          ],
        },
        {
          name: 'La planete Terre',
          topics: [
            'Le systeme solaire',
            'La rotation de la Terre (jour/nuit)',
            'La revolution de la Terre (saisons)',
          ],
        },
      ],
    },
    english: {
      label: 'Anglais CM1',
      domains: [
        {
          name: 'Communication',
          topics: [
            'Se presenter et presenter quelqu\'un',
            'Decrire un lieu, un objet',
            'Demander et donner l\'heure',
            'Present simple et present continu',
            'Les vetements et le corps',
            'Les metiers',
          ],
        },
      ],
    },
  },

  // ─── CYCLE 3 : CM2 ─────────────────────────────────────────────────
  CM2: {
    math: {
      label: 'Mathematiques CM2',
      domains: [
        {
          name: 'Nombres',
          topics: [
            'Nombres decimaux : comparaison, encadrement',
            'Fractions : egalites, comparaisons, decompositions',
            'Placer des fractions et decimaux sur une droite',
            'Grands nombres (millions, milliards)',
          ],
        },
        {
          name: 'Calcul',
          topics: [
            'Division posee (diviseur a 2 chiffres)',
            'Operations sur les nombres decimaux',
            'Calcul mental avance (strategies)',
            'Priorites operatoires',
            'Multiples, diviseurs, criteres de divisibilite',
          ],
        },
        {
          name: 'Grandeurs et mesures',
          topics: [
            'Aire du carre, du rectangle, du triangle',
            'Conversions d\'aires',
            'Volumes : introduction (cm3, dm3)',
            'Contenances et volumes',
            'Perimetre du cercle',
          ],
        },
        {
          name: 'Geometrie',
          topics: [
            'Les angles : aigu, droit, obtus, mesure au rapporteur',
            'Reproduction et construction de figures complexes',
            'Patrons de solides (cube, pave)',
            'Agrandissement et reduction',
            'Symetrie axiale : constructions',
          ],
        },
        {
          name: 'Proportionnalite',
          topics: [
            'Reconnaitre une situation de proportionnalite',
            'Pourcentages simples',
            'Echelles et plans',
            'Vitesse, distance, temps',
          ],
        },
      ],
    },
    french: {
      label: 'Francais CM2',
      domains: [
        {
          name: 'Conjugaison',
          topics: [
            'Passe simple (toutes les personnes)',
            'Plus-que-parfait',
            'Conditionnel present',
            'Concordance des temps dans le recit',
          ],
        },
        {
          name: 'Grammaire',
          topics: [
            'La phrase complexe : juxtaposition, coordination, subordination',
            'Propositions relatives',
            'La voix passive',
            'Les complements du nom',
            'Les adverbes',
          ],
        },
        {
          name: 'Orthographe',
          topics: [
            'Accord du participe passe avec avoir (cas simples)',
            'Les homophones : quand/quant/qu\'en, dans/d\'en, sans/s\'en',
            'Mots avec prefixes et suffixes',
            'Dictee preparee et auto-correction',
          ],
        },
        {
          name: 'Expression et comprehension',
          topics: [
            'Rediger un recit complet (5 etapes)',
            'Le dialogue dans le recit',
            'Les figures de style (comparaison, metaphore)',
            'Argumenter : donner son avis',
            'Comprehension de textes litteraires',
          ],
        },
      ],
    },
    history: {
      label: 'Histoire CM2',
      domains: [
        {
          name: 'Le temps de la Revolution et de l\'Empire',
          topics: [
            'Les causes de la Revolution',
            'La prise de la Bastille et la DDHC',
            'La Republique et la Terreur',
            'Napoleon et l\'Empire',
          ],
        },
        {
          name: 'Le temps de la Republique',
          topics: [
            'L\'ecole de la Republique (Jules Ferry)',
            'La separation de l\'Eglise et de l\'Etat',
            'Les deux guerres mondiales',
            'La construction europeenne',
          ],
        },
      ],
    },
    geography: {
      label: 'Geographie CM2',
      domains: [
        {
          name: 'Se deplacer',
          topics: [
            'Se deplacer en France et en Europe',
            'Les reseaux de transport',
          ],
        },
        {
          name: 'Communiquer d\'un bout a l\'autre du monde',
          topics: [
            'Les moyens de communication numeriques',
            'Les inegalites d\'acces a Internet',
          ],
        },
        {
          name: 'Mieux habiter',
          topics: [
            'Le developpement durable',
            'Recycler, economiser l\'energie',
            'Les espaces verts en ville',
          ],
        },
      ],
    },
    science: {
      label: 'Sciences et technologie CM2',
      domains: [
        {
          name: 'Matiere et energie',
          topics: [
            'Les proprietes de la matiere',
            'Les energies renouvelables et non renouvelables',
            'Les circuits electriques (series, derivation)',
            'Economiser l\'energie',
          ],
        },
        {
          name: 'Le vivant',
          topics: [
            'La reproduction (animaux, vegetaux)',
            'Les micro-organismes',
            'L\'evolution et l\'adaptation',
            'La biodiversite et sa preservation',
          ],
        },
        {
          name: 'La Terre et l\'environnement',
          topics: [
            'Les risques naturels (volcans, seismes, inondations)',
            'L\'impact de l\'homme sur l\'environnement',
            'Le rechauffement climatique',
          ],
        },
      ],
    },
    english: {
      label: 'Anglais CM2',
      domains: [
        {
          name: 'Communication',
          topics: [
            'Raconter une histoire au passe (past simple)',
            'Comparer des choses (comparatifs, superlatifs)',
            'Exprimer ses gouts et preferences',
            'Decrire sa routine quotidienne',
            'Les prepositions de lieu (in, on, under, next to)',
            'Comprendre un texte court en anglais',
          ],
        },
      ],
    },
  },

  // ─── CYCLE 3 : 6eme ────────────────────────────────────────────────
  '6eme': {
    math: {
      label: 'Mathematiques 6eme',
      domains: [
        {
          name: 'Nombres et calcul',
          topics: [
            'Nombres entiers, decimaux et fractions',
            'Operations sur les decimaux',
            'Division decimale',
            'Criteres de divisibilite',
            'Ordre de grandeur',
          ],
        },
        {
          name: 'Geometrie',
          topics: [
            'Droites paralleles et perpendiculaires',
            'Cercle et ses proprietes',
            'Triangles : construction et medianes',
            'Symetrie axiale avancee',
            'Angles : mesure et classification',
            'Patrons de solides',
          ],
        },
        {
          name: 'Grandeurs et mesures',
          topics: [
            'Aires et perimetres de figures complexes',
            'Volumes du pave droit',
            'Conversions (longueurs, masses, capacites, aires)',
            'Durees et vitesses',
          ],
        },
        {
          name: 'Proportionnalite et statistiques',
          topics: [
            'Proportionnalite : coefficient, produit en croix',
            'Pourcentages',
            'Moyennes',
            'Diagrammes et graphiques',
            'Introduction aux probabilites',
          ],
        },
      ],
    },
    french: {
      label: 'Francais 6eme',
      domains: [
        {
          name: 'Langue',
          topics: [
            'Classes grammaticales approfondies',
            'Analyse logique de la phrase',
            'Conjugaison complete (tous les temps de l\'indicatif)',
            'Le subjonctif present',
            'Accords complexes',
          ],
        },
        {
          name: 'Lecture et culture litteraire',
          topics: [
            'Les recits de creation (mythes)',
            'Les contes merveilleux',
            'La poesie : formes et figures',
            'Le theatre : lire et jouer',
            'Les textes documentaires',
          ],
        },
        {
          name: 'Expression',
          topics: [
            'Ecrire un recit complet et structure',
            'Decrire un lieu, un personnage',
            'Le portrait',
            'La lettre',
            'Debattre et argumenter a l\'oral',
          ],
        },
      ],
    },
    history: {
      label: 'Histoire 6eme',
      domains: [
        {
          name: 'La longue histoire de l\'humanite',
          topics: [
            'Les debuts de l\'humanite',
            'La "revolution" neolithique',
            'Premiers Etats, premieres ecritures',
          ],
        },
        {
          name: 'Recits fondateurs et citoyennete',
          topics: [
            'Le monde des cites grecques',
            'Rome, du mythe a l\'histoire',
            'La naissance du monotheisme juif',
            'Les debuts du christianisme',
          ],
        },
      ],
    },
    geography: {
      label: 'Geographie 6eme',
      domains: [
        {
          name: 'Habiter une metropole',
          topics: [
            'Les metropoles et leurs habitants',
            'La ville de demain',
          ],
        },
        {
          name: 'Habiter un espace a forte(s) contrainte(s)',
          topics: [
            'Habiter un espace a forte contrainte naturelle (deserts, montagnes, iles)',
            'Habiter un littoral',
          ],
        },
        {
          name: 'Le monde habite',
          topics: [
            'La repartition de la population mondiale',
            'Les grands foyers de peuplement',
            'Les espaces faiblement peuples',
          ],
        },
      ],
    },
    science: {
      label: 'Sciences et technologie 6eme',
      domains: [
        {
          name: 'Matiere, mouvement, energie, information',
          topics: [
            'Proprietes de la matiere',
            'Mouvements et vitesses',
            'Les signaux (sonores, lumineux)',
            'Le numerique (codage binaire)',
          ],
        },
        {
          name: 'Le vivant, sa diversite, ses fonctions',
          topics: [
            'La cellule : unite du vivant',
            'La nutrition des animaux et des vegetaux',
            'La reproduction sexuee et asexuee',
            'Micro-organismes et hygiene',
          ],
        },
        {
          name: 'La planete Terre',
          topics: [
            'Les phenomenes geologiques (volcans, seismes)',
            'Les phenomenes meteorologiques',
            'L\'exploitation des ressources naturelles',
          ],
        },
      ],
    },
    english: {
      label: 'Anglais 6eme',
      domains: [
        {
          name: 'Communication',
          topics: [
            'Present simple vs present continu',
            'Past simple (regulier et irregulier)',
            'Futur avec will et going to',
            'Les quantifieurs (some, any, much, many)',
            'Decrire et comparer (comparatif, superlatif)',
            'Exprimer une obligation (must, have to)',
            'Lire et comprendre un texte de 150 mots',
            'Ecrire un court paragraphe (50 mots)',
          ],
        },
      ],
    },
  },

  // ─── CYCLE 4 : 5eme (debut) ────────────────────────────────────────
  '5eme': {
    math: {
      label: 'Mathematiques 5eme',
      domains: [
        {
          name: 'Nombres et calcul',
          topics: [
            'Nombres relatifs (positifs et negatifs)',
            'Addition et soustraction de relatifs',
            'Fractions : operations completes',
            'Enchainement d\'operations',
            'Priorites operatoires avec parentheses',
          ],
        },
        {
          name: 'Geometrie',
          topics: [
            'Angles alternes-internes, correspondants',
            'Somme des angles d\'un triangle = 180°',
            'Symetrie centrale',
            'Parallelogrammes et proprietes',
            'Prismes et cylindres',
          ],
        },
        {
          name: 'Grandeurs et proportionnalite',
          topics: [
            'Calcul d\'aires (disque, figures composees)',
            'Volumes (prismes, cylindres)',
            'Vitesse, distance, temps',
            'Echelles',
            'Proportionnalite avancee',
          ],
        },
        {
          name: 'Statistiques et probabilites',
          topics: [
            'Frequences',
            'Diagrammes circulaires',
            'Probabilites simples',
          ],
        },
      ],
    },
    french: {
      label: 'Francais 5eme',
      domains: [
        {
          name: 'Langue',
          topics: [
            'Les propositions subordonnees',
            'Le conditionnel et le subjonctif',
            'Les valeurs des temps (narration)',
            'Orthographe lexicale avancee',
          ],
        },
        {
          name: 'Litterature',
          topics: [
            'Les recits d\'aventure',
            'Le voyage et l\'ailleurs',
            'Vivre en societe (la famille, les amis)',
            'Imaginer des univers nouveaux',
          ],
        },
      ],
    },
    history: {
      label: 'Histoire 5eme',
      domains: [
        {
          name: 'Chretientes et Islam (VIe-XIIIe siecles)',
          topics: [
            'Byzance et l\'Europe carolingienne',
            'De la naissance de l\'Islam a la prise de Bagdad',
          ],
        },
        {
          name: 'Societe, Eglise et pouvoir dans l\'Occident feodal',
          topics: [
            'L\'ordre seigneurial',
            'L\'emergence d\'une nouvelle societe urbaine',
            'L\'affirmation de l\'Etat monarchique en France',
          ],
        },
        {
          name: 'Transformations de l\'Europe',
          topics: [
            'Le monde au temps de Charles Quint et Soliman',
            'Humanisme, reformes et conflits religieux',
            'Du Prince de la Renaissance au roi absolu',
          ],
        },
      ],
    },
    geography: {
      label: 'Geographie 5eme',
      domains: [
        {
          name: 'Developpement durable',
          topics: [
            'La croissance demographique et ses effets',
            'Richesse et pauvrete dans le monde',
            'L\'energie et l\'eau : des ressources a menager',
            'Nourrir l\'humanite',
            'Prevenir les risques',
          ],
        },
      ],
    },
    science: {
      label: 'Sciences 5eme',
      domains: [
        {
          name: 'Physique-Chimie',
          topics: [
            'L\'eau dans notre environnement (melanges, corps purs)',
            'Les circuits electriques en serie et en derivation',
            'La lumiere (sources, propagation)',
          ],
        },
        {
          name: 'SVT',
          topics: [
            'La nutrition des organismes',
            'La respiration',
            'La reproduction',
            'Les ecosystemes et la biodiversite',
          ],
        },
      ],
    },
    english: {
      label: 'Anglais 5eme',
      domains: [
        {
          name: 'Communication',
          topics: [
            'Present perfect',
            'Past continu',
            'Les modaux (can, could, may, might, should)',
            'Exprimer des hypotheses (if + present)',
            'Raconter une experience passee',
            'Donner des conseils',
            'Comprendre un texte de 250 mots',
            'Ecrire un texte de 80-100 mots',
          ],
        },
      ],
    },
  },
}

// ─── Helper pour generer le texte du programme pour le prompt IA ────
export function getCurriculumForLevel(level, subject) {
  const levelData = curriculum[level]
  if (!levelData || !levelData[subject]) return ''

  const subjectData = levelData[subject]
  let text = `\n\nPROGRAMME OFFICIEL (${subjectData.label}) :\n`
  for (const domain of subjectData.domains) {
    text += `\n${domain.name} :`
    for (const topic of domain.topics) {
      text += `\n  - ${topic}`
    }
  }
  return text
}

// ─── Helper pour lister les topics en suggestions ────────────────────
export function getTopicSuggestions(level, subject) {
  const levelData = curriculum[level]
  if (!levelData || !levelData[subject]) return []

  const subjectData = levelData[subject]
  const topics = []
  for (const domain of subjectData.domains) {
    for (const topic of domain.topics) {
      topics.push(topic)
    }
  }
  return topics
}
