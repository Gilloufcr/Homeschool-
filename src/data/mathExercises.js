// ═══════════════════════════════════════════════════════════════
// MATHEMATIQUES — Multiples chapitres par niveau scolaire
// Chaque grade (CE2→5eme) a 5 niveaux thematiques
// ═══════════════════════════════════════════════════════════════

export const mathLevels = [
  // ─── CE2 ─────────────────────────────────────────────────────
  {
    id: 'math-ce2-1', grade: 'CE2', minLevel: 1,
    name: 'CE2 - Nombres jusqu\'a 10 000',
    nameMinecraft: 'Mine - Nombres', nameLalilo: 'Jardin - Nombres',
    description: 'Lire, ecrire et comparer les nombres',
    exercises: [
      { id: 'mce2-1-1', type: 'calculate', question: 'Quel nombre vient juste apres 2 999 ?', answer: 3000, options: [3000, 2998, 3001, 2900], xp: 10 },
      { id: 'mce2-1-2', type: 'choice', question: 'Range du plus petit au plus grand : 4 512 - 1 203 - 3 078', answer: '1203 - 3078 - 4512', options: ['1203 - 3078 - 4512', '3078 - 1203 - 4512', '4512 - 3078 - 1203', '1203 - 4512 - 3078'], xp: 10 },
      { id: 'mce2-1-3', type: 'calculate', question: 'Dans 5 637, quel est le chiffre des centaines ?', answer: 6, options: [5, 6, 3, 7], xp: 10 },
      { id: 'mce2-1-4', type: 'choice', question: 'Quel nombre est le plus grand : 7 089 ou 7 098 ?', answer: '7 098', options: ['7 089', '7 098', 'Ils sont egaux', 'On ne peut pas savoir'], xp: 10 },
      { id: 'mce2-1-5', type: 'calculate', question: 'Decompose : 3 405 = 3 000 + ___ + 5', answer: 400, options: [40, 400, 4000, 45], xp: 15 },
    ],
  },
  {
    id: 'math-ce2-2', grade: 'CE2', minLevel: 1,
    name: 'CE2 - Additions et soustractions',
    nameMinecraft: 'Forge - Calculs', nameLalilo: 'Arc-en-ciel - Calculs',
    description: 'Additionner et soustraire avec retenue',
    exercises: [
      { id: 'mce2-2-1', type: 'calculate', question: 'Combien font 487 + 356 ?', answer: 843, options: [833, 843, 853, 743], xp: 10 },
      { id: 'mce2-2-2', type: 'calculate', question: 'Combien font 1 204 - 567 ?', answer: 637, options: [637, 647, 737, 627], xp: 15 },
      { id: 'mce2-2-3', type: 'calculate', question: 'Combien font 2 365 + 1 478 ?', answer: 3843, options: [3843, 3743, 3943, 3833], xp: 15 },
      { id: 'mce2-2-4', type: 'calculate', question: 'Pierre a 250 billes. Il en perd 87. Combien lui en reste-t-il ?', answer: 163, options: [163, 173, 153, 337], xp: 15 },
      { id: 'mce2-2-5', type: 'calculate', question: 'Combien font 5 000 - 1 234 ?', answer: 3766, options: [3766, 3876, 3666, 3776], xp: 20 },
    ],
  },
  {
    id: 'math-ce2-3', grade: 'CE2', minLevel: 1,
    name: 'CE2 - Tables de multiplication',
    nameMinecraft: 'Caverne - Tables', nameLalilo: 'Cascade - Tables',
    description: 'Maitriser les tables de 2 a 9',
    exercises: [
      { id: 'mce2-3-1', type: 'calculate', question: 'Combien font 7 x 8 ?', answer: 56, options: [48, 54, 56, 63], xp: 10 },
      { id: 'mce2-3-2', type: 'calculate', question: 'Combien font 6 x 9 ?', answer: 54, options: [45, 54, 56, 63], xp: 10 },
      { id: 'mce2-3-3', type: 'calculate', question: 'Combien font 8 x 4 ?', answer: 32, options: [28, 32, 36, 24], xp: 10 },
      { id: 'mce2-3-4', type: 'calculate', question: 'Un paquet a 6 biscuits. Combien de biscuits dans 7 paquets ?', answer: 42, options: [36, 42, 48, 13], xp: 15 },
      { id: 'mce2-3-5', type: 'calculate', question: 'Quel nombre multiplie par 9 donne 72 ?', answer: 8, options: [7, 8, 9, 6], xp: 15 },
    ],
  },
  {
    id: 'math-ce2-4', grade: 'CE2', minLevel: 1,
    name: 'CE2 - Mesures',
    nameMinecraft: 'Atelier - Mesures', nameLalilo: 'Feerie - Mesures',
    description: 'Longueurs, masses, monnaie et temps',
    exercises: [
      { id: 'mce2-4-1', type: 'calculate', question: 'Combien de centimetres dans 1 metre ?', answer: 100, options: [10, 100, 1000, 50], xp: 10 },
      { id: 'mce2-4-2', type: 'calculate', question: 'Combien de minutes dans 1 heure ?', answer: 60, options: [30, 60, 100, 90], xp: 10 },
      { id: 'mce2-4-3', type: 'choice', question: 'J\'achete un livre a 8€ et un cahier a 3€. Je paye avec 20€. Combien me rend-on ?', answer: '9 euros', options: ['9 euros', '11 euros', '7 euros', '12 euros'], xp: 15 },
      { id: 'mce2-4-4', type: 'calculate', question: 'Combien de grammes dans 2 kilogrammes ?', answer: 2000, options: [200, 2000, 20, 20000], xp: 10 },
      { id: 'mce2-4-5', type: 'choice', question: 'Il est 14h45. Dans combien de minutes sera-t-il 15h ?', answer: '15 minutes', options: ['15 minutes', '45 minutes', '30 minutes', '10 minutes'], xp: 15 },
    ],
  },
  {
    id: 'math-ce2-5', grade: 'CE2', minLevel: 1,
    name: 'CE2 - Geometrie',
    nameMinecraft: 'Construction - Formes', nameLalilo: 'Formes Enchantees',
    description: 'Carres, rectangles, triangles et symetrie',
    exercises: [
      { id: 'mce2-5-1', type: 'calculate', question: 'Combien de cotes a un rectangle ?', answer: 4, options: [3, 4, 5, 6], xp: 10 },
      { id: 'mce2-5-2', type: 'choice', question: 'Un carre a un cote de 5 cm. Quel est son perimetre ?', answer: '20 cm', options: ['15 cm', '20 cm', '25 cm', '10 cm'], xp: 10 },
      { id: 'mce2-5-3', type: 'choice', question: 'Qu\'est-ce qu\'un axe de symetrie ?', answer: 'Une ligne qui partage une figure en deux parties identiques', options: ['Un cote du carre', 'Une ligne qui partage une figure en deux parties identiques', 'La diagonale', 'Le perimetre'], xp: 15 },
      { id: 'mce2-5-4', type: 'choice', question: 'Quelle figure a 3 cotes et 3 sommets ?', answer: 'Un triangle', options: ['Un carre', 'Un rectangle', 'Un triangle', 'Un cercle'], xp: 10 },
      { id: 'mce2-5-5', type: 'choice', question: 'Qu\'est-ce qu\'un angle droit ?', answer: 'Un angle qui forme un coin de carre (90 degres)', options: ['Un angle pointu', 'Un angle qui forme un coin de carre (90 degres)', 'Un angle plat', 'Un angle tres grand'], xp: 15 },
    ],
  },

  // ─── CM1 ─────────────────────────────────────────────────────
  {
    id: 'math-cm1-1', grade: 'CM1', minLevel: 1,
    name: 'CM1 - Grands nombres', nameMinecraft: 'Mine - Grands Nombres', nameLalilo: 'Jardin - Grands Nombres',
    description: 'Nombres jusqu\'a 999 999, decomposition',
    exercises: [
      { id: 'mcm1-1-1', type: 'calculate', question: 'Combien font 45 000 + 7 800 ?', answer: 52800, options: [52800, 51800, 53800, 52700], xp: 10 },
      { id: 'mcm1-1-2', type: 'choice', question: '3 centaines de mille + 5 dizaines de mille + 2 unites = ?', answer: '350 002', options: ['350 002', '35 002', '352 000', '305 002'], xp: 15 },
      { id: 'mcm1-1-3', type: 'calculate', question: 'Combien font 500 000 - 123 456 ?', answer: 376544, options: [376544, 377544, 376454, 375544], xp: 20 },
      { id: 'mcm1-1-4', type: 'calculate', question: 'Arrondis 47 856 a la dizaine de mille pres.', answer: 50000, options: [47000, 48000, 50000, 47900], xp: 15 },
      { id: 'mcm1-1-5', type: 'choice', question: 'Range : 678 900 - 679 000 - 670 999', answer: '670 999 - 678 900 - 679 000', options: ['670 999 - 678 900 - 679 000', '678 900 - 670 999 - 679 000', '679 000 - 678 900 - 670 999', '670 999 - 679 000 - 678 900'], xp: 15 },
    ],
  },
  {
    id: 'math-cm1-2', grade: 'CM1', minLevel: 1,
    name: 'CM1 - Multiplication posee', nameMinecraft: 'Forge - Multi', nameLalilo: 'Arc - Multi',
    description: 'Multiplier par un nombre a 2 chiffres',
    exercises: [
      { id: 'mcm1-2-1', type: 'calculate', question: 'Combien font 47 x 23 ?', answer: 1081, options: [1081, 1071, 981, 1181], xp: 15 },
      { id: 'mcm1-2-2', type: 'calculate', question: 'Combien font 65 x 14 ?', answer: 910, options: [910, 920, 900, 810], xp: 15 },
      { id: 'mcm1-2-3', type: 'calculate', question: 'Un cinema a 32 rangees de 28 fauteuils. Combien de places ?', answer: 896, options: [896, 886, 996, 856], xp: 20 },
      { id: 'mcm1-2-4', type: 'calculate', question: 'Combien font 125 x 16 ?', answer: 2000, options: [2000, 1500, 1800, 2100], xp: 20 },
      { id: 'mcm1-2-5', type: 'calculate', question: 'Combien font 250 x 40 ?', answer: 10000, options: [10000, 1000, 9000, 100000], xp: 15 },
    ],
  },
  {
    id: 'math-cm1-3', grade: 'CM1', minLevel: 1,
    name: 'CM1 - Fractions simples', nameMinecraft: 'Portail - Fractions', nameLalilo: 'Parts Magiques',
    description: '1/2, 1/4, 1/3, fractions sur une droite',
    exercises: [
      { id: 'mcm1-3-1', type: 'choice', question: 'Quelle fraction represente la moitie ?', answer: '1/2', options: ['1/2', '1/3', '1/4', '2/3'], xp: 10 },
      { id: 'mcm1-3-2', type: 'choice', question: 'Combien font 1/4 + 1/4 ?', answer: '2/4 (ou 1/2)', options: ['2/4 (ou 1/2)', '2/8', '1/8', '1/2'], xp: 10 },
      { id: 'mcm1-3-3', type: 'choice', question: '3/4 ou 2/3, lequel est le plus grand ?', answer: '3/4', options: ['3/4', '2/3', 'Egaux', 'Impossible a dire'], xp: 15 },
      { id: 'mcm1-3-4', type: 'choice', question: 'Simplifie 2/6.', answer: '1/3', options: ['1/3', '1/2', '2/3', '1/6'], xp: 15 },
      { id: 'mcm1-3-5', type: 'choice', question: 'Ou se place 3/4 sur une droite de 0 a 1 ?', answer: 'Entre 1/2 et 1', options: ['Avant 1/2', 'Entre 1/2 et 1', 'Apres 1', 'A 1/2'], xp: 15 },
    ],
  },
  {
    id: 'math-cm1-4', grade: 'CM1', minLevel: 1,
    name: 'CM1 - Perimetre et conversions', nameMinecraft: 'Mesures - Perimetre', nameLalilo: 'Mesures Feerie',
    description: 'Perimetres, conversions km/m/cm',
    exercises: [
      { id: 'mcm1-4-1', type: 'calculate', question: 'Perimetre d\'un rectangle de 12 cm par 8 cm ?', answer: 40, options: [40, 96, 20, 32], xp: 10 },
      { id: 'mcm1-4-2', type: 'calculate', question: 'Combien de metres dans 3,5 km ?', answer: 3500, options: [350, 3500, 35000, 35], xp: 10 },
      { id: 'mcm1-4-3', type: 'calculate', question: 'Un carre a un perimetre de 36 cm. Longueur d\'un cote ?', answer: 9, options: [6, 9, 12, 18], xp: 15 },
      { id: 'mcm1-4-4', type: 'calculate', question: '2 m 45 cm = combien de cm ?', answer: 245, options: [245, 2045, 2450, 24], xp: 15 },
      { id: 'mcm1-4-5', type: 'calculate', question: 'Perimetre d\'un triangle : 15 m + 20 m + 25 m = ?', answer: 60, options: [55, 60, 65, 50], xp: 10 },
    ],
  },
  {
    id: 'math-cm1-5', grade: 'CM1', minLevel: 1,
    name: 'CM1 - Geometrie et droites', nameMinecraft: 'Batiment - Geometrie', nameLalilo: 'Geometrie Magique',
    description: 'Paralleles, perpendiculaires, cercles',
    exercises: [
      { id: 'mcm1-5-1', type: 'choice', question: 'Deux droites paralleles...', answer: 'Ne se croisent jamais', options: ['Se croisent', 'Ne se croisent jamais', 'Sont verticales', 'Forment un angle droit'], xp: 10 },
      { id: 'mcm1-5-2', type: 'choice', question: 'Deux droites perpendiculaires forment...', answer: 'Un angle droit (90°)', options: ['Un angle aigu', 'Un angle droit (90°)', 'Un angle obtus', 'Aucun angle'], xp: 10 },
      { id: 'mcm1-5-3', type: 'choice', question: 'Le segment du centre du cercle au bord s\'appelle...', answer: 'Le rayon', options: ['Le diametre', 'Le rayon', 'La corde', 'L\'arc'], xp: 10 },
      { id: 'mcm1-5-4', type: 'calculate', question: 'Diametre = 10 cm. Rayon = ?', answer: 5, options: [5, 10, 20, 15], xp: 10 },
      { id: 'mcm1-5-5', type: 'choice', question: 'Un losange a...', answer: '4 cotes egaux', options: ['4 angles droits', '4 cotes egaux', '3 cotes egaux', '2 paires paralleles seulement'], xp: 15 },
    ],
  },

  // ─── CM2 ─────────────────────────────────────────────────────
  {
    id: 'math-cm2-1', grade: 'CM2', minLevel: 1,
    name: 'CM2 - Nombres decimaux', nameMinecraft: 'Mine - Decimaux', nameLalilo: 'Jardin - Decimaux',
    description: 'Lire, comparer et calculer avec des decimaux',
    exercises: [
      { id: 'mcm2-1-1', type: 'calculate', question: 'Combien font 3,45 + 12,7 ?', answer: '16,15', options: ['16,15', '15,15', '16,25', '46,2'], xp: 15 },
      { id: 'mcm2-1-2', type: 'choice', question: 'Range : 3,09 - 3,1 - 3,019', answer: '3,019 - 3,09 - 3,1', options: ['3,019 - 3,09 - 3,1', '3,09 - 3,019 - 3,1', '3,1 - 3,09 - 3,019', '3,019 - 3,1 - 3,09'], xp: 15 },
      { id: 'mcm2-1-3', type: 'calculate', question: 'Combien font 15,8 - 7,35 ?', answer: '8,45', options: ['8,45', '8,55', '7,45', '9,45'], xp: 15 },
      { id: 'mcm2-1-4', type: 'calculate', question: 'Combien font 4,5 x 3 ?', answer: '13,5', options: ['13,5', '12,5', '13,0', '14,5'], xp: 15 },
      { id: 'mcm2-1-5', type: 'calculate', question: 'Arrondis 7,847 au dixieme.', answer: '7,8', options: ['7,8', '7,9', '7,85', '8,0'], xp: 20 },
    ],
  },
  {
    id: 'math-cm2-2', grade: 'CM2', minLevel: 1,
    name: 'CM2 - Division posee', nameMinecraft: 'Caverne - Division', nameLalilo: 'Cascade - Division',
    description: 'Diviser par 1 ou 2 chiffres',
    exercises: [
      { id: 'mcm2-2-1', type: 'calculate', question: '846 / 12 = ?', answer: '70,5', options: ['70,5', '70', '71', '7,05'], xp: 20 },
      { id: 'mcm2-2-2', type: 'calculate', question: '256 / 8 = ?', answer: 32, options: [28, 32, 34, 30], xp: 15 },
      { id: 'mcm2-2-3', type: 'calculate', question: 'Reste de 157 / 6 ?', answer: 1, options: [1, 2, 3, 5], xp: 15 },
      { id: 'mcm2-2-4', type: 'calculate', question: '945 bonbons pour 15 enfants = ?', answer: 63, options: [63, 53, 73, 60], xp: 20 },
      { id: 'mcm2-2-5', type: 'calculate', question: '1 000 / 25 = ?', answer: 40, options: [35, 40, 45, 50], xp: 15 },
    ],
  },
  {
    id: 'math-cm2-3', grade: 'CM2', minLevel: 1,
    name: 'CM2 - Fractions et pourcentages', nameMinecraft: 'Portail - %', nameLalilo: 'Magie - %',
    description: 'Comparer des fractions, calculer des pourcentages',
    exercises: [
      { id: 'mcm2-3-1', type: 'calculate', question: '25% de 240 ?', answer: 60, options: [60, 48, 80, 24], xp: 15 },
      { id: 'mcm2-3-2', type: 'calculate', question: '10% de 350 ?', answer: 35, options: [35, 3.5, 350, 70], xp: 10 },
      { id: 'mcm2-3-3', type: 'choice', question: 'Range : 3/5 - 1/2 - 2/3', answer: '1/2 - 3/5 - 2/3', options: ['1/2 - 3/5 - 2/3', '3/5 - 1/2 - 2/3', '2/3 - 3/5 - 1/2', '1/2 - 2/3 - 3/5'], xp: 20 },
      { id: 'mcm2-3-4', type: 'choice', question: 'Jeu a 60€ avec -20%. Nouveau prix ?', answer: '48 euros', options: ['48 euros', '40 euros', '52 euros', '50 euros'], xp: 20 },
      { id: 'mcm2-3-5', type: 'choice', question: '50% en fraction ?', answer: '1/2', options: ['1/3', '1/2', '2/3', '1/4'], xp: 10 },
    ],
  },
  {
    id: 'math-cm2-4', grade: 'CM2', minLevel: 1,
    name: 'CM2 - Aires et surfaces', nameMinecraft: 'Terrain - Aires', nameLalilo: 'Surfaces Magiques',
    description: 'Aire du carre, rectangle, triangle',
    exercises: [
      { id: 'mcm2-4-1', type: 'calculate', question: 'Aire d\'un carre de 9 cm ?', answer: 81, options: [81, 36, 18, 72], xp: 10 },
      { id: 'mcm2-4-2', type: 'calculate', question: 'Aire d\'un rectangle 12x7 cm ?', answer: 84, options: [84, 38, 76, 96], xp: 10 },
      { id: 'mcm2-4-3', type: 'calculate', question: 'Aire d\'un triangle base 14, hauteur 8 cm ?', answer: 56, options: [56, 112, 22, 44], xp: 15 },
      { id: 'mcm2-4-4', type: 'choice', question: 'L\'aire se mesure en...', answer: 'cm2', options: ['cm', 'cm2', 'cm3', 'kg'], xp: 10 },
      { id: 'mcm2-4-5', type: 'calculate', question: 'Terrain 25 m x 40 m. Aire ?', answer: 1000, options: [1000, 130, 650, 100], xp: 15 },
    ],
  },
  {
    id: 'math-cm2-5', grade: 'CM2', minLevel: 1,
    name: 'CM2 - Angles et symetrie', nameMinecraft: 'Construction - Angles', nameLalilo: 'Angles Enchantes',
    description: 'Types d\'angles, symetrie axiale',
    exercises: [
      { id: 'mcm2-5-1', type: 'choice', question: 'Un angle de 45° est...', answer: 'Aigu', options: ['Droit', 'Aigu', 'Obtus', 'Plat'], xp: 10 },
      { id: 'mcm2-5-2', type: 'choice', question: 'Un angle de 120° est...', answer: 'Obtus', options: ['Droit', 'Aigu', 'Obtus', 'Plat'], xp: 10 },
      { id: 'mcm2-5-3', type: 'choice', question: 'La lettre "A" a-t-elle un axe de symetrie ?', answer: 'Oui, vertical', options: ['Non', 'Oui, vertical', 'Oui, horizontal', 'Oui, deux axes'], xp: 15 },
      { id: 'mcm2-5-4', type: 'calculate', question: 'Combien mesure un angle plat ?', answer: 180, options: [90, 180, 360, 270], xp: 10 },
      { id: 'mcm2-5-5', type: 'choice', question: 'Quelle figure a 4 axes de symetrie ?', answer: 'Le carre', options: ['Le rectangle', 'Le carre', 'Le triangle', 'Le losange'], xp: 15 },
    ],
  },

  // ─── 6EME ────────────────────────────────────────────────────
  {
    id: 'math-6e-1', grade: '6eme', minLevel: 1,
    name: '6e - Fractions avancees', nameMinecraft: 'Mine - Fractions+', nameLalilo: 'Jardin - Fractions+',
    description: 'Addition, soustraction, simplification',
    exercises: [
      { id: 'm6e-1-1', type: 'choice', question: '2/3 + 3/4 = ?', answer: '17/12', options: ['17/12', '5/7', '5/12', '6/12'], xp: 20 },
      { id: 'm6e-1-2', type: 'choice', question: '5/6 - 1/3 = ?', answer: '1/2', options: ['1/2', '4/3', '4/6', '2/3'], xp: 20 },
      { id: 'm6e-1-3', type: 'choice', question: 'Simplifie 12/18.', answer: '2/3', options: ['2/3', '3/4', '4/6', '6/9'], xp: 15 },
      { id: 'm6e-1-4', type: 'choice', question: '0,75 en fraction ?', answer: '3/4', options: ['3/4', '7/5', '7/10', '1/4'], xp: 15 },
      { id: 'm6e-1-5', type: 'choice', question: '2/5 x 3/4 = ?', answer: '3/10', options: ['3/10', '5/9', '6/9', '5/20'], xp: 20 },
    ],
  },
  {
    id: 'math-6e-2', grade: '6eme', minLevel: 1,
    name: '6e - Proportionnalite', nameMinecraft: 'Forge - Proportions', nameLalilo: 'Arc - Proportions',
    description: 'Tableaux, produit en croix, echelles',
    exercises: [
      { id: 'm6e-2-1', type: 'choice', question: '3 kg a 6,75€. Combien pour 5 kg ?', answer: '11,25€', options: ['11,25€', '10,75€', '12,50€', '33,75€'], xp: 20 },
      { id: 'm6e-2-2', type: 'calculate', question: 'Carte 1/50000 : 3 cm = combien de km ?', answer: '1,5', options: ['1,5', '15', '150', '0,15'], xp: 20 },
      { id: 'm6e-2-3', type: 'calculate', question: 'Recette pour 4 : 300g de farine. Pour 6 ?', answer: 450, options: [450, 400, 500, 600], xp: 15 },
      { id: 'm6e-2-4', type: 'choice', question: '2→6, 3→9, 5→15. Proportionnel ?', answer: 'Oui, coefficient x3', options: ['Oui, coefficient x3', 'Non', 'Oui, coefficient x2', 'Impossible a dire'], xp: 15 },
      { id: 'm6e-2-5', type: 'calculate', question: 'Un trajet de 210 km en 3h. Vitesse moyenne ?', answer: 70, options: [70, 630, 60, 80], xp: 15 },
    ],
  },
  {
    id: 'math-6e-3', grade: '6eme', minLevel: 1,
    name: '6e - Divisibilite', nameMinecraft: 'Caverne - Divisibilite', nameLalilo: 'Cascade - Divisibilite',
    description: 'Criteres, multiples et diviseurs',
    exercises: [
      { id: 'm6e-3-1', type: 'choice', question: '738 est divisible par 9 ?', answer: 'Oui (7+3+8=18)', options: ['Oui (7+3+8=18)', 'Non', 'Oui (car pair)', 'On ne sait pas'], xp: 15 },
      { id: 'm6e-3-2', type: 'choice', question: 'PGCD de 12 et 18 ?', answer: '6', options: ['3', '6', '9', '12'], xp: 20 },
      { id: 'm6e-3-3', type: 'choice', question: 'Diviseurs de 24 ?', answer: '1, 2, 3, 4, 6, 8, 12, 24', options: ['1, 2, 3, 4, 6, 8, 12, 24', '1, 2, 4, 8, 24', '2, 3, 4, 6, 8, 12', '1, 24'], xp: 20 },
      { id: 'm6e-3-4', type: 'choice', question: '135 divisible par 5 car...', answer: 'Se termine par 5', options: ['Est impair', 'Se termine par 5', 'Somme = 9', 'Plus grand que 100'], xp: 10 },
      { id: 'm6e-3-5', type: 'choice', question: '111 divisible par 3 ?', answer: 'Oui (1+1+1=3)', options: ['Oui (1+1+1=3)', 'Non', 'Oui car impair', 'Oui car termine par 1'], xp: 10 },
    ],
  },
  {
    id: 'math-6e-4', grade: '6eme', minLevel: 1,
    name: '6e - Geometrie du cercle et aires', nameMinecraft: 'Terrain - Disque', nameLalilo: 'Cercle Magique',
    description: 'Aire du disque, perimetres complexes',
    exercises: [
      { id: 'm6e-4-1', type: 'choice', question: 'Aire d\'un disque rayon 5 cm (pi=3,14) ?', answer: '78,5 cm2', options: ['78,5 cm2', '31,4 cm2', '15,7 cm2', '157 cm2'], xp: 20 },
      { id: 'm6e-4-2', type: 'choice', question: 'Perimetre d\'un cercle rayon 10 cm ?', answer: '62,8 cm', options: ['62,8 cm', '31,4 cm', '314 cm', '20 cm'], xp: 15 },
      { id: 'm6e-4-3', type: 'calculate', question: '1 hectare = combien de m2 ?', answer: 10000, options: [100, 1000, 10000, 100000], xp: 10 },
      { id: 'm6e-4-4', type: 'calculate', question: 'Aire parallelogramme base 8, hauteur 5 cm ?', answer: 40, options: [40, 26, 20, 13], xp: 15 },
      { id: 'm6e-4-5', type: 'choice', question: '200m x 50m = 10000 m2 = combien d\'hectares ?', answer: '1', options: ['1', '10', '0,1', '100'], xp: 15 },
    ],
  },
  {
    id: 'math-6e-5', grade: '6eme', minLevel: 1,
    name: '6e - Statistiques', nameMinecraft: 'Stats - Donnees', nameLalilo: 'Chiffres Magiques',
    description: 'Moyenne, graphiques, frequences',
    exercises: [
      { id: 'm6e-5-1', type: 'calculate', question: 'Notes : 12, 15, 9, 18, 11. Moyenne ?', answer: 13, options: [13, 12, 14, 15], xp: 15 },
      { id: 'm6e-5-2', type: 'calculate', question: 'Temperatures : 5, 7, 3, 8, 6, 4, 9. Moyenne ?', answer: 6, options: [5, 6, 7, 8], xp: 15 },
      { id: 'm6e-5-3', type: 'calculate', question: 'Moyenne 14 avec 4 notes. Somme des notes ?', answer: 56, options: [56, 48, 42, 52], xp: 20 },
      { id: 'm6e-5-4', type: 'choice', question: 'Un diagramme circulaire est aussi appele...', answer: 'Camembert', options: ['Histogramme', 'Courbe', 'Camembert', 'Nuage de points'], xp: 10 },
      { id: 'm6e-5-5', type: 'choice', question: 'Dans un diagramme en barres, la hauteur represente...', answer: 'La valeur ou frequence', options: ['La couleur', 'La valeur ou frequence', 'Le nom', 'L\'annee'], xp: 10 },
    ],
  },

  // ─── 5EME ────────────────────────────────────────────────────
  {
    id: 'math-5e-1', grade: '5eme', minLevel: 1,
    name: '5e - Nombres relatifs', nameMinecraft: 'Mine - Relatifs', nameLalilo: 'Jardin - Relatifs',
    description: 'Positifs et negatifs, operations',
    exercises: [
      { id: 'm5e-1-1', type: 'calculate', question: '(-7) + (+3) = ?', answer: -4, options: [-4, -10, 4, 10], xp: 15 },
      { id: 'm5e-1-2', type: 'calculate', question: '(-12) - (-5) = ?', answer: -7, options: [-7, -17, 7, 17], xp: 20 },
      { id: 'm5e-1-3', type: 'calculate', question: '(+8) + (-15) = ?', answer: -7, options: [-7, 7, 23, -23], xp: 15 },
      { id: 'm5e-1-4', type: 'choice', question: 'Range : -3, +1, -7, +4', answer: '-7 < -3 < +1 < +4', options: ['-7 < -3 < +1 < +4', '-3 < -7 < +1 < +4', '+1 < +4 < -3 < -7', '-7 < -3 < +4 < +1'], xp: 15 },
      { id: 'm5e-1-5', type: 'calculate', question: 'Temperature -8°. Monte de 12°. Resultat ?', answer: 4, options: [4, -20, 20, -4], xp: 15 },
    ],
  },
  {
    id: 'math-5e-2', grade: '5eme', minLevel: 1,
    name: '5e - Operations sur fractions', nameMinecraft: 'Forge - Fractions', nameLalilo: 'Arc - Fractions',
    description: 'Multiplier, diviser des fractions',
    exercises: [
      { id: 'm5e-2-1', type: 'choice', question: '3/4 x 2/5 = ?', answer: '3/10', options: ['3/10', '5/9', '6/9', '5/20'], xp: 20 },
      { id: 'm5e-2-2', type: 'choice', question: '2/3 + 1/4 = ?', answer: '11/12', options: ['11/12', '3/7', '3/12', '8/12'], xp: 20 },
      { id: 'm5e-2-3', type: 'choice', question: '5/6 - 2/3 = ?', answer: '1/6', options: ['1/6', '3/3', '3/6', '1/3'], xp: 20 },
      { id: 'm5e-2-4', type: 'choice', question: 'Inverse de 3/7 ?', answer: '7/3', options: ['7/3', '3/7', '-3/7', '1/3'], xp: 15 },
      { id: 'm5e-2-5', type: 'choice', question: '4/5 ÷ 2/3 = ?', answer: '6/5', options: ['6/5', '8/15', '6/8', '2/5'], xp: 25 },
    ],
  },
  {
    id: 'math-5e-3', grade: '5eme', minLevel: 1,
    name: '5e - Angles et triangles', nameMinecraft: 'Batiment - Angles', nameLalilo: 'Triangles Enchantes',
    description: 'Somme des angles, alternes-internes',
    exercises: [
      { id: 'm5e-3-1', type: 'calculate', question: 'Triangle : angles de 65° et 48°. Le 3eme ?', answer: 67, options: [67, 77, 57, 113], xp: 15 },
      { id: 'm5e-3-2', type: 'choice', question: 'Somme des angles d\'un triangle ?', answer: '180°', options: ['90°', '180°', '360°', 'Variable'], xp: 10 },
      { id: 'm5e-3-3', type: 'choice', question: 'Angles alternes-internes avec paralleles ?', answer: 'Egaux', options: ['Toujours egaux', 'Egaux', 'Supplementaires', 'Complementaires'], xp: 20 },
      { id: 'm5e-3-4', type: 'calculate', question: 'Triangle isocele, sommet 40°. Chaque base ?', answer: 70, options: [70, 80, 60, 40], xp: 20 },
      { id: 'm5e-3-5', type: 'choice', question: 'Angles d\'un triangle equilateral ?', answer: '60° chacun', options: ['90°', '60° chacun', '45°', '120°'], xp: 10 },
    ],
  },
  {
    id: 'math-5e-4', grade: '5eme', minLevel: 1,
    name: '5e - Volumes et symetrie centrale', nameMinecraft: 'Dimension - Volumes', nameLalilo: 'Volumes Magiques',
    description: 'Pave droit, prisme, cylindre',
    exercises: [
      { id: 'm5e-4-1', type: 'choice', question: 'Volume pave 6x4x3 cm ?', answer: '72 cm3', options: ['72 cm3', '13 cm3', '48 cm3', '24 cm3'], xp: 15 },
      { id: 'm5e-4-2', type: 'choice', question: 'Le volume se mesure en...', answer: 'cm3 ou litres', options: ['cm2', 'cm3 ou litres', 'cm', 'kg'], xp: 10 },
      { id: 'm5e-4-3', type: 'calculate', question: 'Aquarium 50x30x40 cm = combien de litres ?', answer: 60, options: [60, 6, 600, 120], xp: 20 },
      { id: 'm5e-4-4', type: 'choice', question: 'Un parallelogramme a un centre de symetrie ?', answer: 'Oui, croisement des diagonales', options: ['Non', 'Oui, croisement des diagonales', 'Oui, un sommet', 'Seulement si carre'], xp: 20 },
      { id: 'm5e-4-5', type: 'calculate', question: '1 litre = combien de cm3 ?', answer: 1000, options: [100, 1000, 10, 10000], xp: 10 },
    ],
  },
  {
    id: 'math-5e-5', grade: '5eme', minLevel: 1,
    name: '5e - Probabilites', nameMinecraft: 'Hasard - Probas', nameLalilo: 'Chance Magique',
    description: 'Experiences aleatoires, calculs',
    exercises: [
      { id: 'm5e-5-1', type: 'choice', question: 'De a 6 faces : probabilite d\'un nombre pair ?', answer: '1/2', options: ['1/2', '1/3', '1/6', '2/3'], xp: 15 },
      { id: 'm5e-5-2', type: 'choice', question: 'Carte dans un jeu de 52 : probabilite d\'un as ?', answer: '1/13', options: ['1/13', '1/52', '1/4', '13/52'], xp: 20 },
      { id: 'm5e-5-3', type: 'choice', question: 'Piece : probabilite de "pile" ?', answer: '1/2', options: ['1/2', '1/4', '1/3', '1'], xp: 10 },
      { id: 'm5e-5-4', type: 'choice', question: '3 boules rouges + 7 bleues. Probabilite rouge ?', answer: '3/10', options: ['3/10', '3/7', '7/10', '1/3'], xp: 15 },
      { id: 'm5e-5-5', type: 'choice', question: 'Evenement certain = probabilite...', answer: '1', options: ['0', '1/2', '1', 'Variable'], xp: 10 },
    ],
  },
]
