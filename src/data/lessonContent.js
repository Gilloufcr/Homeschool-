// ═══════════════════════════════════════════════════════════════════
// LECONS PEDAGOGIQUES — contenu affiche avant les exercices
// Chaque lecon a un titre et des pages avec emoji, texte, astuces
// ═══════════════════════════════════════════════════════════════════

export const lessons = {
  // ─── MATHS ────────────────────────────────────────────────────────
  'math-ce2-1': {
    title: 'CE2 - Nombres et Calculs',
    pages: [
      {
        emoji: '🧮',
        title: 'L\'addition',
        content: 'L\'addition, c\'est mettre ensemble ! Quand tu as 3 pommes et que tu en recois 5, tu en as 3 + 5 = 8.',
        highlights: ['3 + 5 = 8', '12 + 7 = 19', '100 + 250 = 350'],
        tip: 'Astuce : pour additionner des grands nombres, commence par les unites (a droite), puis les dizaines, puis les centaines !',
      },
      {
        emoji: '➖',
        title: 'La soustraction',
        content: 'La soustraction, c\'est enlever ! Si tu as 10 bonbons et que tu en manges 4, il t\'en reste 10 - 4 = 6.',
        highlights: ['10 - 4 = 6', '85 - 29 = 56', '500 - 167 = 333'],
        tip: 'Astuce : si un chiffre est trop petit pour soustraire, emprunte une dizaine au chiffre de gauche !',
        example: '85 - 29 : on ne peut pas faire 5 - 9, donc on emprunte → 15 - 9 = 6 (unites), 7 - 2 = 5 (dizaines) → 56',
      },
    ],
  },
  'math-cm1-1': {
    title: 'CM1 - Fractions et Grands Nombres',
    pages: [
      {
        emoji: '✖️',
        title: 'Qu\'est-ce que multiplier ?',
        content: 'Multiplier, c\'est additionner plusieurs fois le meme nombre. 4 x 3 veut dire "3 + 3 + 3 + 3" ou "4 paquets de 3".',
        highlights: ['4 x 3 = 12', '7 x 8 = 56', '12 x 9 = 108'],
        tip: 'La table de 9 a un secret : la somme des chiffres du resultat fait toujours 9 ! (9, 18, 27, 36, 45, 54, 63, 72, 81)',
      },
      {
        emoji: '🎯',
        title: 'Astuces pour multiplier',
        content: 'Multiplier par 10 : ajoute un 0. Multiplier par 100 : ajoute deux 0. Multiplier par 5 : multiplie par 10 et divise par 2.',
        example: '25 x 4 = 100 (c\'est comme 4 pieces de 25 centimes = 1 euro !)\n15 x 15 = 225 (astuce : 15 x 10 = 150, 15 x 5 = 75, total = 225)',
        tip: 'Pour multiplier par 11 : ecris le nombre et insere la somme des chiffres au milieu. 36 x 11 → 3_(3+6)_6 → 396 !',
      },
    ],
  },
  'math-cm2-1': {
    title: 'CM2 - Decimaux et Mesures',
    pages: [
      {
        emoji: '➗',
        title: 'Qu\'est-ce que diviser ?',
        content: 'Diviser, c\'est partager en parts egales. Si tu as 12 bonbons pour 4 amis, chacun recoit 12 / 4 = 3 bonbons.',
        highlights: ['12 / 4 = 3', '144 / 12 = 12', '256 / 8 = 32'],
        tip: 'Division et multiplication sont liees : si 8 x 7 = 56, alors 56 / 7 = 8 et 56 / 8 = 7 !',
      },
      {
        emoji: '🔢',
        title: 'Le reste de la division',
        content: 'Parfois le partage n\'est pas exact. 47 / 5 = 9 reste 2, car 9 x 5 = 45, et il reste 2.',
        example: '47 / 5 : combien de fois 5 dans 47 ? → 9 fois (9 x 5 = 45). Reste : 47 - 45 = 2.',
        tip: 'Le reste est toujours plus petit que le diviseur ! Si le reste est plus grand, c\'est que tu peux encore diviser.',
      },
    ],
  },
  'math-6e-1': {
    title: '6eme - Proportionnalite et Geometrie',
    pages: [
      {
        emoji: '🍕',
        title: 'Qu\'est-ce qu\'une fraction ?',
        content: 'Une fraction represente une partie d\'un tout. Si tu coupes une pizza en 4 parts et que tu en prends 3, tu as mange 3/4 de la pizza. Le nombre du haut (numerateur) dit combien de parts on prend. Le nombre du bas (denominateur) dit en combien de parts on a coupe.',
        highlights: ['1/2 = la moitie', '1/4 = un quart', '3/4 = trois quarts'],
      },
      {
        emoji: '🤝',
        title: 'Additionner des fractions',
        content: 'Pour additionner des fractions avec le meme denominateur, on additionne juste les numerateurs ! Pour des denominateurs differents, il faut d\'abord les rendre egaux.',
        example: '1/4 + 2/4 = 3/4 (meme denominateur, facile !)\n1/2 + 1/4 = 2/4 + 1/4 = 3/4 (on transforme 1/2 en 2/4)',
        tip: 'Fractions equivalentes : 1/2 = 2/4 = 3/6 = 4/8. On multiplie le haut ET le bas par le meme nombre !',
      },
    ],
  },
  'math-5e-1': {
    title: '5eme - Nombres Relatifs et Calcul Litteral',
    pages: [
      {
        emoji: '📐',
        title: 'Perimetre et aire',
        content: 'Le perimetre est le tour d\'une forme (la longueur de la cloture autour d\'un jardin). L\'aire est la surface a l\'interieur (la quantite de gazon dans le jardin).',
        highlights: ['Perimetre carre = 4 x cote', 'Aire rectangle = longueur x largeur', 'Aire triangle = base x hauteur / 2'],
      },
      {
        emoji: '⭕',
        title: 'Le cercle',
        content: 'Le cercle a un nombre magique : Pi (π) ≈ 3,14. Le perimetre d\'un cercle = 2 x π x rayon. L\'aire d\'un cercle = π x rayon x rayon.',
        example: 'Cercle de rayon 7 cm :\nPerimetre = 2 x 3,14 x 7 ≈ 44 cm\nAire = 3,14 x 7 x 7 ≈ 154 cm²',
        tip: 'Le rayon va du centre au bord. Le diametre va d\'un bord a l\'autre en passant par le centre : diametre = 2 x rayon.',
      },
    ],
  },

  // ─── FRANCAIS ─────────────────────────────────────────────────────
  'fr-ce2-1': {
    title: 'CE2 - Orthographe et Grammaire',
    pages: [
      {
        emoji: '✏️',
        title: 'L\'accord du verbe avec le sujet',
        content: 'Le verbe s\'accorde toujours avec son sujet. Si le sujet est au pluriel, le verbe prend la marque du pluriel.',
        example: 'Les enfants jouent dans le jardin. (sujet pluriel → jouent avec -ent)\nL\'enfant joue dans le jardin. (sujet singulier → joue)',
        tip: 'Pour trouver le sujet, pose la question "Qui est-ce qui ?" devant le verbe.',
      },
      {
        emoji: '📝',
        title: 'Les pluriels particuliers',
        content: 'La plupart des mots prennent un "s" au pluriel, mais certains sont speciaux !',
        highlights: ['-al → -aux', '-eau → -eaux', '-ou → -ous (sauf 7 mots)'],
        example: 'cheval → chevaux, bateau → bateaux, genou → genoux\nLes 7 mots en -ou qui prennent -x : bijou, caillou, chou, genou, hibou, joujou, pou',
        tip: 'Les mots en -s, -x, -z ne changent pas au pluriel : une souris → des souris, une voix → des voix.',
      },
    ],
  },
  'fr-cm1-1': {
    title: 'CM1 - Conjugaison et Complements',
    pages: [
      {
        emoji: '⏰',
        title: 'Les temps de base',
        content: 'Le present : maintenant. L\'imparfait : avant, ca durait. Le futur : plus tard. Le passe compose : avant, c\'est fini.',
        highlights: ['Je mange (present)', 'Je mangeais (imparfait)', 'Je mangerai (futur)', 'J\'ai mange (passe compose)'],
      },
      {
        emoji: '🔑',
        title: 'Les terminaisons',
        content: 'Au present, les verbes en -er : -e, -es, -e, -ons, -ez, -ent. Au futur : -ai, -as, -a, -ons, -ez, -ont. A l\'imparfait : -ais, -ais, -ait, -ions, -iez, -aient.',
        tip: 'Le futur se forme souvent avec l\'infinitif + les terminaisons : manger + ai = mangerai. Mais attention aux verbes irreguliers : aller → ira, etre → sera, avoir → aura !',
        example: 'Aller au futur : j\'irai, tu iras, il ira, nous irons, vous irez, ils iront',
      },
    ],
  },
  'fr-cm2-1': {
    title: 'CM2 - Passe Simple et Voix Passive',
    pages: [
      {
        emoji: '🧩',
        title: 'La nature des mots',
        content: 'Chaque mot a une nature (ce qu\'il est) : nom, verbe, adjectif, adverbe, pronom, determinant, preposition, conjonction.',
        highlights: ['Nom : chat', 'Verbe : mange', 'Adjectif : noir', 'Adverbe : rapidement'],
        tip: 'L\'adverbe modifie le verbe ou l\'adjectif. Il est souvent en "-ment" : rapide → rapidement, doux → doucement.',
      },
      {
        emoji: '🏗️',
        title: 'La fonction des mots',
        content: 'La fonction, c\'est le role du mot dans la phrase. Le sujet fait l\'action. Le COD recoit l\'action (il repond a "quoi ?"). Le COI est relie au verbe par une preposition (a, de).',
        example: 'Marie mange une pomme.\n- Marie = sujet (qui mange ?)\n- mange = verbe\n- une pomme = COD (mange quoi ?)',
      },
    ],
  },
  'fr-6e-1': {
    title: '6eme - Analyse Grammaticale',
    pages: [
      {
        emoji: '📚',
        title: 'Synonymes et antonymes',
        content: 'Les synonymes sont des mots de meme sens : content = heureux = ravi. Les antonymes sont des mots de sens contraire : genereux ≠ avare, grand ≠ petit.',
        highlights: ['Synonymes : pareil', 'Antonymes : contraire'],
        tip: 'Utiliser des synonymes rend tes textes plus riches. Au lieu de repeter "dit", essaie : murmura, s\'exclama, chuchota, declara...',
      },
      {
        emoji: '🌳',
        title: 'Les familles de mots',
        content: 'Les mots d\'une meme famille partagent un radical (racine) commun. Connaitre les familles aide a comprendre et orthographier les mots.',
        example: 'Famille de "terre" : terrain, terrasse, enterrer, souterrain, atterrir\nFamille de "fleur" : fleurir, fleuriste, defleurir, effleurer',
        tip: 'Les prefixes changent le sens : re- = encore, de-/des- = contraire, pre- = avant. "Prehistoire" = avant l\'histoire !',
      },
    ],
  },
  'fr-5e-1': {
    title: '5eme - Propositions et Temps Avances',
    pages: [
      {
        emoji: '🎭',
        title: 'Les figures de style',
        content: 'Les figures de style rendent le texte plus expressif. La comparaison utilise "comme" : "rapide comme l\'eclair". La metaphore dit directement : "cet homme est un lion".',
        highlights: ['Comparaison = avec "comme"', 'Metaphore = sans "comme"', 'Personnification = objet vivant'],
        example: '"Blanc comme neige" = comparaison\n"La mer en colere" = personnification\n"J\'ai mille choses a faire" = hyperbole',
      },
      {
        emoji: '📖',
        title: 'Construire un recit',
        content: 'Un recit a 5 etapes : situation initiale (le debut tranquille), element perturbateur (le probleme), peripeties (les aventures), denouement (la solution), situation finale (la fin).',
        tip: 'Au passe, on utilise l\'imparfait pour decrire (il faisait beau, les oiseaux chantaient) et le passe simple pour les actions (soudain, il entendit un bruit).',
      },
    ],
  },

  // ─── HISTOIRE ─────────────────────────────────────────────────────
  'hist-ce2-1': {
    title: 'CE2 - Se Reperer dans le Temps',
    pages: [
      {
        emoji: '🦴',
        title: 'Les premiers humains',
        content: 'La Prehistoire commence il y a environ 3 millions d\'annees avec les premiers humains en Afrique. Ils etaient nomades : ils se deplacaient pour trouver de la nourriture. Ils chassaient, pechaient et cueillaient des fruits et plantes.',
        tip: 'La Prehistoire s\'appelle ainsi car elle est AVANT l\'invention de l\'ecriture (vers -3300). Pas d\'ecriture = pas d\'histoire ecrite !',
      },
      {
        emoji: '🎨',
        title: 'L\'art et les decouvertes',
        content: 'Les hommes prehistoriques ont invente des outils en pierre, decouvert le feu (vers -400 000 ans), et peint les murs des grottes. Les peintures de Lascaux (-17 000 ans) montrent des animaux : chevaux, bisons, cerfs.',
        example: 'Grandes inventions de la Prehistoire :\n- Le feu → cuire, se chauffer, s\'eclairer\n- L\'agriculture → se nourrir sans bouger\n- La poterie → conserver la nourriture',
        tip: 'C\'est l\'invention de l\'agriculture (vers -10 000 ans) qui a permis aux humains de se sedentariser et de creer les premiers villages.',
      },
    ],
  },
  'hist-cm1-1': {
    title: 'CM1 - De la Prehistoire aux Carolingiens',
    pages: [
      {
        emoji: '🏛️',
        title: 'La Grece et Rome',
        content: 'L\'Antiquite commence avec l\'invention de l\'ecriture (vers -3300). Les Grecs ont invente la democratie a Athenes : le peuple vote les lois. Les Romains ont bati un immense empire autour de la Mediterranee.',
        highlights: ['Democratie = pouvoir du peuple', 'Republique = chose publique', 'Empire = dirige par un empereur'],
      },
      {
        emoji: '⚔️',
        title: 'La Gaule et les Romains',
        content: 'La France s\'appelait la Gaule. En 52 avant J.-C., Jules Cesar a conquis la Gaule apres le siege d\'Alesia. Vercingetorix, le chef gaulois, s\'est rendu. La Gaule est devenue gallo-romaine : un melange des deux cultures.',
        tip: 'Les Gaulois n\'etaient pas des barbares ! Ils etaient d\'excellents artisans, forgerons et agriculteurs. Ils ont invente le tonneau et la moissonneuse !',
      },
    ],
  },
  'hist-cm2-1': {
    title: 'CM2 - Revolution, Republique et Guerres',
    pages: [
      {
        emoji: '🏰',
        title: 'Chevaliers et chateaux forts',
        content: 'Le Moyen Age dure environ 1000 ans (du Ve au XVe siecle). La societe est organisee en 3 ordres : ceux qui prient (le clerge), ceux qui combattent (les seigneurs), ceux qui travaillent (les paysans). Les chateaux forts protegent les seigneurs et leurs sujets.',
        highlights: ['476 : chute de Rome', '800 : sacre de Charlemagne', '1453 : fin du Moyen Age'],
      },
      {
        emoji: '⚜️',
        title: 'Les grands evenements',
        content: 'Charlemagne est sacre empereur en 800 et cree des ecoles. La Guerre de Cent Ans (1337-1453) oppose la France et l\'Angleterre. Jeanne d\'Arc libere Orleans en 1429 et fait sacrer Charles VII a Reims.',
        tip: 'La feodalite est un systeme ou le seigneur protege ses vassaux en echange de leur service. C\'est une pyramide : roi → seigneurs → chevaliers → paysans.',
      },
    ],
  },
  'hist-6e-1': {
    title: '6eme - Antiquite et Premieres Civilisations',
    pages: [
      {
        emoji: '🎨',
        title: 'Un monde nouveau',
        content: 'La Renaissance (XVe-XVIe siecle) est une periode de renouveau en art, science et pensee. Nee en Italie, elle se repand en Europe. Les artistes comme Leonard de Vinci et Michel-Ange revolutionnent la peinture et la sculpture.',
        highlights: ['1450 : imprimerie de Gutenberg', '1492 : decouverte de l\'Amerique', '1519 : Chateau de Chambord'],
      },
      {
        emoji: '🌍',
        title: 'Les grandes decouvertes',
        content: 'Les Europeens explorent le monde : Christophe Colomb decouvre l\'Amerique (1492), Vasco de Gama atteint l\'Inde par la mer (1498), Magellan fait le premier tour du monde (1519-1522).',
        tip: 'L\'imprimerie de Gutenberg (1450) est peut-etre LA plus grande invention de l\'epoque : elle permet de diffuser les livres et le savoir a tous, pas seulement aux riches !',
        example: 'Francois Ier, roi de France, invite Leonard de Vinci qui s\'installe au Clos Luce. Il emporte la Joconde avec lui — c\'est pour ca qu\'elle est au Louvre !',
      },
    ],
  },
  'hist-5e-1': {
    title: '5eme - Moyen Age et Renaissance',
    pages: [
      {
        emoji: '🗡️',
        title: 'Pourquoi la Revolution ?',
        content: 'En 1789, la France est en crise : le peuple a faim, les impots sont enormes, et seuls les nobles et le clerge ont des privileges. Le 14 juillet, le peuple prend la Bastille, symbole du pouvoir royal.',
        highlights: ['14 juillet 1789 : prise de la Bastille', '26 aout 1789 : Declaration des droits de l\'homme', '21 janvier 1793 : execution de Louis XVI'],
      },
      {
        emoji: '🇫🇷',
        title: 'Les consequences',
        content: 'La Revolution abolit les privileges, proclame les droits de l\'homme et cree la Republique. La devise "Liberte, Egalite, Fraternite" devient le symbole de la France. Napoleon Bonaparte prend le pouvoir en 1799 et devient empereur en 1804.',
        tip: 'La Declaration des droits de l\'homme et du citoyen (1789) inspire encore aujourd\'hui les lois dans le monde entier. Elle affirme que tous les humains naissent libres et egaux en droits.',
      },
    ],
  },

  // ─── GEOGRAPHIE ───────────────────────────────────────────────────
  'geo-ce2-1': {
    title: 'CE2 - Mon Quartier et les Paysages',
    pages: [
      {
        emoji: '🇫🇷',
        title: 'Notre pays',
        content: 'La France est le plus grand pays d\'Europe de l\'Ouest. Elle a la forme d\'un hexagone (6 cotes). Elle est bordee par la Manche, l\'ocean Atlantique et la mer Mediterranee.',
        highlights: ['Capitale : Paris', 'Population : 68 millions', 'Superficie : 643 000 km²'],
      },
      {
        emoji: '⛰️',
        title: 'Le relief de la France',
        content: 'La France a des paysages tres varies : des montagnes (Alpes, Pyrenees, Massif Central, Vosges, Jura), des plaines (Beauce, Bassin parisien), des cotes (falaises, plages, calanques).',
        tip: 'Le Mont Blanc (4 808 m) dans les Alpes est le plus haut sommet de France et d\'Europe occidentale. Les 5 grands fleuves sont : Seine, Loire, Garonne, Rhone et Rhin.',
      },
    ],
  },
  'geo-cm1-1': {
    title: 'CM1 - Region, Economie et Transports',
    pages: [
      {
        emoji: '🇪🇺',
        title: 'Notre continent',
        content: 'L\'Europe est un continent de 50 pays et 750 millions d\'habitants. L\'Union Europeenne regroupe 27 pays qui cooperent. La monnaie commune est l\'euro, utilise par 20 pays.',
        highlights: ['27 pays dans l\'UE', '24 langues officielles', 'Euro = monnaie commune'],
      },
      {
        emoji: '🏙️',
        title: 'Les grandes capitales',
        content: 'Chaque pays a une capitale : Paris (France), Berlin (Allemagne), Madrid (Espagne), Rome (Italie), Londres (Royaume-Uni — hors UE depuis 2020).',
        tip: 'Le plus grand pays d\'Europe est la Russie (partie europeenne), le plus petit est le Vatican (0,44 km², dans Rome !). Le pays le plus peuple est l\'Allemagne (83 millions).',
      },
    ],
  },
  'geo-cm2-1': {
    title: 'CM2 - Se Deplacer et Developper Durable',
    pages: [
      {
        emoji: '🌍',
        title: 'Les continents',
        content: 'La Terre a 6 continents : Europe, Asie, Afrique, Amerique, Oceanie et Antarctique. L\'Asie est le plus grand et le plus peuple. L\'Antarctique est le seul continent sans habitants permanents.',
        highlights: ['Asie : 4,5 milliards hab.', 'Afrique : 1,4 milliard', 'Europe : 750 millions'],
      },
      {
        emoji: '🌊',
        title: 'Oceans et records',
        content: 'Il y a 5 oceans : Pacifique (le plus grand), Atlantique, Indien, Arctique et Antarctique. Le Nil est le plus long fleuve (6 650 km) et l\'Everest le plus haut sommet (8 849 m).',
        tip: 'L\'ocean recouvre 71% de la surface de la Terre ! Le point le plus profond est la fosse des Mariannes : 10 994 m sous la mer (plus profond que l\'Everest n\'est haut !).',
      },
    ],
  },
  'geo-6e-1': {
    title: '6eme - Habiter le Monde',
    pages: [
      {
        emoji: '☀️',
        title: 'Les grands types de climats',
        content: 'Le climat depend de la distance a l\'equateur. Pres de l\'equateur : chaud et humide (tropical). Aux poles : tres froid (polaire). Entre les deux : tempere (comme en France).',
        highlights: ['Tropical : chaud + pluie', 'Tempere : 4 saisons', 'Polaire : glace et froid', 'Desertique : sec'],
      },
      {
        emoji: '🌱',
        title: 'Proteger la planete',
        content: 'L\'effet de serre est un phenomene naturel : des gaz dans l\'atmosphere gardent la chaleur du Soleil (comme une serre de jardin). Le probleme : les activites humaines (voitures, usines) produisent trop de ces gaz, ce qui rechauffe la Terre.',
        tip: 'Des gestes simples pour la planete : trier ses dechets, economiser l\'eau et l\'electricite, utiliser les transports en commun, manger local et de saison.',
      },
    ],
  },
  'geo-5e-1': {
    title: '5eme - Ressources et Inegalites Mondiales',
    pages: [
      {
        emoji: '👥',
        title: 'La population mondiale',
        content: 'Nous sommes environ 8 milliards d\'humains sur Terre. La population n\'est pas repartie uniformement : l\'Asie concentre plus de la moitie de l\'humanite.',
        highlights: ['Inde : pays le + peuple', 'Tokyo : ville la + peuplee', 'Vatican : pays le + petit'],
      },
      {
        emoji: '🏙️',
        title: 'Les megalopoles',
        content: 'Une megalopole est une ville geante de plus de 10 millions d\'habitants. Tokyo (37 millions), Delhi (32 millions), Shanghai (28 millions) sont les plus grandes. L\'urbanisation augmente : plus de la moitie des humains vivent en ville.',
        tip: 'En France, Paris concentre 12 millions d\'habitants dans son agglomeration, soit presque 1 Francais sur 5 !',
      },
    ],
  },

  // ─── SCIENCES ─────────────────────────────────────────────────────
  'sci-ce2-1': {
    title: 'CE2 - Vivant, Matiere et Electricite',
    pages: [
      {
        emoji: '🫀',
        title: 'Un corps etonnant',
        content: 'Le corps humain a environ 206 os (a l\'age adulte) et plus de 600 muscles ! Le squelette soutient le corps, les muscles permettent de bouger, et le coeur fait circuler le sang.',
        highlights: ['206 os', '600+ muscles', '100 000 km de vaisseaux sanguins'],
      },
      {
        emoji: '🧠',
        title: 'Le cerveau, chef d\'orchestre',
        content: 'Le cerveau contient environ 86 milliards de neurones ! Il controle tout : les mouvements, les sens, la memoire, les emotions. Les 5 sens (vue, ouie, odorat, gout, toucher) envoient des informations au cerveau.',
        tip: 'Le cerveau consomme 20% de l\'energie du corps alors qu\'il ne represente que 2% du poids ! Bien dormir et bien manger aide le cerveau a fonctionner.',
      },
    ],
  },
  'sci-cm1-1': {
    title: 'CM1 - Systeme Solaire et Vivant',
    pages: [
      {
        emoji: '☀️',
        title: 'Notre etoile et ses planetes',
        content: 'Le Soleil est une etoile au centre de notre systeme solaire. 8 planetes tournent autour : Mercure, Venus, Terre, Mars, Jupiter, Saturne, Uranus, Neptune.',
        highlights: ['4 planetes rocheuses', '4 geantes gazeuses', '1 etoile : le Soleil'],
        tip: 'Moyen mnemotechnique : "Mon Vieux Tu M\'as Jete Sur Une Navette" (Mercure, Venus, Terre, Mars, Jupiter, Saturne, Uranus, Neptune).',
      },
      {
        emoji: '🌍',
        title: 'La Terre, notre maison',
        content: 'La Terre est la seule planete connue a abriter la vie. Elle est a la bonne distance du Soleil (ni trop chaud, ni trop froid) et possede de l\'eau liquide et une atmosphere protectrice.',
        example: 'Distances au Soleil :\n- Terre : 150 millions de km\n- Mars : 228 millions de km\n- Jupiter : 778 millions de km',
      },
    ],
  },
  'sci-cm2-1': {
    title: 'CM2 - Energie, Reproduction et Environnement',
    pages: [
      {
        emoji: '🌿',
        title: 'La chaine alimentaire',
        content: 'Dans la nature, les etres vivants dependent les uns des autres. Les plantes produisent leur nourriture grace au soleil (photosynthese). Les herbivores mangent les plantes. Les carnivores mangent les herbivores.',
        highlights: ['Plantes → Herbivores → Carnivores', 'Producteurs → Consommateurs → Decomposeurs'],
      },
      {
        emoji: '🦋',
        title: 'Metamorphoses et pollinisation',
        content: 'Certains animaux se transforment completement en grandissant : la chenille devient papillon, le tetard devient grenouille. C\'est la metamorphose ! Les abeilles transportent le pollen de fleur en fleur (pollinisation), ce qui permet aux plantes de se reproduire.',
        tip: 'Sans les abeilles, on perdrait un tiers de notre alimentation ! Elles pollinisent les fruits, les legumes et les fleurs.',
      },
    ],
  },
  'sci-6e-1': {
    title: '6eme - Matiere, Mouvement et Cellule',
    pages: [
      {
        emoji: '⚡',
        title: 'Les sources d\'energie',
        content: 'L\'energie fait fonctionner les machines, eclaire nos maisons et chauffe nos repas. Il y a deux types : les energies renouvelables (soleil, vent, eau) qui ne s\'epuisent pas, et les energies fossiles (petrole, charbon, gaz) qui sont limitees.',
        highlights: ['Solaire ☀️', 'Eolienne 💨', 'Hydraulique 💧', 'Fossile ⛽'],
      },
      {
        emoji: '💡',
        title: 'L\'electricite',
        content: 'Un circuit electrique est un chemin ferme dans lequel le courant circule. Il faut une source (pile ou prise), des fils conducteurs et un appareil (ampoule, moteur). Si le circuit est ouvert (interrupteur), le courant ne passe plus.',
        tip: 'Le petrole, le charbon et le gaz sont des energies "fossiles" car ils se sont formes a partir d\'organismes morts il y a des millions d\'annees. Ils mettent des millions d\'annees a se former mais on les utilise en quelques siecles !',
      },
    ],
  },
  'sci-5e-1': {
    title: '5eme - Eau, Electricite et Ecosystemes',
    pages: [
      {
        emoji: '🧊',
        title: 'Les 3 etats de la matiere',
        content: 'Toute matiere existe sous 3 etats : solide (forme fixe), liquide (prend la forme du recipient), gazeux (se repand partout). L\'eau est l\'exemple parfait : glace (solide), eau (liquide), vapeur (gaz).',
        highlights: ['0°C : eau gele', '100°C : eau bout', 'Fusion : solide → liquide', 'Evaporation : liquide → gaz'],
      },
      {
        emoji: '🧪',
        title: 'Melanges et transformations',
        content: 'Un melange homogene : on ne voit pas les composants (eau + sucre). Un melange heterogene : on voit les composants (eau + huile). Pour separer un melange, on peut filtrer, decanter ou evaporer.',
        tip: 'Les plantes sont des usines chimiques ! Elles absorbent du CO2 et de l\'eau, et grace a la lumiere du soleil (photosynthese), elles produisent du glucose (nourriture) et de l\'oxygene (ce qu\'on respire).',
      },
    ],
  },

  // ─── ANGLAIS ──────────────────────────────────────────────────────
  'eng-ce2-1': {
    title: 'CE2 - Se Presenter en Anglais',
    pages: [
      {
        emoji: '👋',
        title: 'Greetings and basics',
        content: 'Hello = Bonjour. Goodbye = Au revoir. Please = S\'il vous plait. Thank you = Merci. Yes = Oui. No = Non. My name is... = Je m\'appelle...',
        highlights: ['Hello! 👋', 'Thank you! 🙏', 'Please! 😊', 'Sorry! 🙇'],
        tip: 'En anglais, on tutoie tout le monde ! Il n\'y a qu\'un seul mot pour "tu" et "vous" : YOU.',
      },
      {
        emoji: '🔢',
        title: 'Numbers and colors',
        content: 'Les nombres de 1 a 10 : one, two, three, four, five, six, seven, eight, nine, ten. Les couleurs : red (rouge), blue (bleu), green (vert), yellow (jaune), black (noir), white (blanc).',
        example: 'I have two red apples = J\'ai deux pommes rouges\nThe sky is blue = Le ciel est bleu',
        tip: 'En anglais, l\'adjectif se place AVANT le nom : a big house (une grande maison), a red car (une voiture rouge).',
      },
    ],
  },
  'eng-cm1-1': {
    title: 'CM1 - Decrire et Raconter',
    pages: [
      {
        emoji: '🏠',
        title: 'At home',
        content: 'Les pieces : bedroom (chambre), kitchen (cuisine), bathroom (salle de bain), living room (salon). Les repas : breakfast (petit dejeuner), lunch (dejeuner), dinner (diner).',
        highlights: ['I wake up', 'I eat breakfast', 'I go to school', 'I go to bed'],
      },
      {
        emoji: '🎒',
        title: 'Describing your day',
        content: 'Le present simple decrit les habitudes : "I play football every day" (je joue au foot tous les jours). On ajoute un -s a la 3eme personne : "She plays football".',
        example: 'I wake up at 7. I eat breakfast. I go to school.\nShe wakes up at 7. She eats breakfast. She goes to school.',
        tip: 'Les mots contraires sont tres utiles : big/small (grand/petit), hot/cold (chaud/froid), old/new (vieux/neuf), fast/slow (rapide/lent).',
      },
    ],
  },
  'eng-cm2-1': {
    title: 'CM2 - Passe et Comparaisons',
    pages: [
      {
        emoji: '📖',
        title: 'Past tense',
        content: 'Pour parler du passe, on ajoute -ed aux verbes reguliers : played, walked, talked. Mais beaucoup de verbes sont irreguliers : go → went, eat → ate, see → saw, have → had.',
        highlights: ['Regular: play → played', 'Irregular: go → went', 'Irregular: eat → ate', 'Irregular: see → saw'],
      },
      {
        emoji: '🔮',
        title: 'Future and questions',
        content: 'Pour le futur, on utilise "will" : I will travel. Pour les questions, on utilise do/does : "Do you like pizza?" (au present) ou did (au passe) : "Did you go to school?"',
        example: '"Is there any milk?" → Y a-t-il du lait ?\n"Are there three cats?" → Y a-t-il trois chats ?\nIs = singulier, Are = pluriel',
        tip: 'There is + singulier, There are + pluriel. C\'est different du francais "il y a" qui ne change jamais !',
      },
    ],
  },
  'eng-6e-1': {
    title: '6eme - Temps et Quantifieurs',
    pages: [
      {
        emoji: '📚',
        title: 'Understanding a text',
        content: 'Pour comprendre un texte en anglais, lis d\'abord en entier sans t\'arreter. Cherche les mots-cles. Utilise le contexte pour deviner les mots inconnus. Relis ensuite pour les details.',
        highlights: ['Who? (Qui?)', 'What? (Quoi?)', 'Where? (Ou?)', 'When? (Quand?)'],
        tip: '"Once upon a time" = "Il etait une fois". C\'est le debut des contes en anglais, comme "Once upon a time, there was a princess..."',
      },
      {
        emoji: '🔤',
        title: 'Les faux amis',
        content: 'Attention aux mots qui ressemblent au francais mais ont un sens different ! "Actually" = en fait (pas actuellement). "Library" = bibliotheque (pas librairie). "Exciting" = passionnant (pas excitant).',
        example: 'The children are playing = Les enfants jouent\nChild → children (pluriel irregulier, comme man → men, woman → women)',
      },
    ],
  },
  'eng-5e-1': {
    title: '5eme - Present Perfect et Modaux',
    pages: [
      {
        emoji: '💬',
        title: 'Polite expressions',
        content: 'Les Anglais sont tres polis ! "Could you help me, please?" est plus poli que "Help me". "I would like" est plus poli que "I want". "Excuse me" sert a attirer l\'attention poliment.',
        highlights: ['Could you...? (Pourriez-vous)', 'I would like... (Je voudrais)', 'Excuse me (Excusez-moi)', 'I\'m sorry (Je suis desole)'],
      },
      {
        emoji: '🛒',
        title: 'Useful phrases',
        content: 'Au magasin : "How much is it?" (Combien ca coute ?). Au restaurant : "Can I have the menu, please?" Pour donner ton avis : "I agree" (je suis d\'accord) / "I disagree" (je ne suis pas d\'accord).',
        example: 'How are you? → I\'m fine, thank you!\nWhat time is it? → It\'s 3 o\'clock.\nHow much is it? → It\'s 5 pounds.',
        tip: '"I\'m looking forward to it" = "J\'ai hate". C\'est une expression tres courante. "Looking forward" ne veut PAS dire "regarder devant" !',
      },
    ],
  },

  // ─── EMC ──────────────────────────────────────────────────────────
  'emc-ce2-1': {
    title: 'CE2 - Vivre ensemble',
    pages: [
      {
        emoji: '🤝',
        title: 'Les regles de vie',
        content: 'Dans une classe, comme dans la societe, il y a des regles. Elles existent pour que tout le monde puisse vivre ensemble, apprendre et se sentir en securite. Ces regles sont decidees ensemble !',
        highlights: ['Respecter les autres', 'Lever la main pour parler', 'Ecouter quand quelqu\'un parle'],
        tip: 'Un droit, c\'est ce que tu peux faire (aller a l\'ecole, jouer). Un devoir, c\'est ce que tu dois faire (respecter les autres, etre poli).',
      },
      {
        emoji: '💬',
        title: 'Le respect',
        content: 'Respecter quelqu\'un, c\'est accepter qu\'il soit different de toi : une autre couleur de peau, une autre langue, un handicap... La difference, c\'est une richesse !',
        highlights: ['Chacun est unique', 'La difference est une richesse', 'Etre poli et bienveillant'],
        tip: 'Si un camarade est triste ou seul, un simple "Ca va ?" peut changer sa journee. L\'empathie, c\'est se mettre a la place de l\'autre.',
      },
    ],
  },
  'emc-cm1-1': {
    title: 'CM1 - Les droits de l\'enfant',
    pages: [
      {
        emoji: '📜',
        title: 'La Convention des droits de l\'enfant',
        content: 'En 1989, presque tous les pays du monde ont signe la Convention internationale des droits de l\'enfant. Ce texte protege tous les enfants jusqu\'a 18 ans : droit a l\'education, a la sante, a la protection, aux loisirs...',
        highlights: ['Adoptee en 1989', 'Protege tous les enfants de moins de 18 ans', 'Droit a l\'education, a la sante, aux loisirs'],
        tip: 'L\'UNICEF est l\'organisme de l\'ONU qui veille au respect des droits des enfants dans le monde. Son nom signifie "Fonds des Nations Unies pour l\'Enfance".',
      },
      {
        emoji: '⚖️',
        title: 'Droits et devoirs',
        content: 'Avoir des droits, c\'est aussi avoir des devoirs. Tu as le droit d\'aller a l\'ecole, mais tu as le devoir de travailler. Tu as le droit de jouer, mais tu as le devoir de respecter les regles du jeu.',
        highlights: ['Droit a l\'education → devoir de travailler', 'Droit de s\'exprimer → devoir d\'ecouter les autres'],
        tip: 'Le travail des enfants est interdit ! Aucun enfant ne devrait travailler au lieu d\'aller a l\'ecole. Malheureusement, 160 millions d\'enfants travaillent encore dans le monde.',
      },
    ],
  },
  'emc-cm2-1': {
    title: 'CM2 - La Republique francaise',
    pages: [
      {
        emoji: '🏛️',
        title: 'Les institutions',
        content: 'La France est une Republique democratique. Le President est elu pour 5 ans (quinquennat) au suffrage universel. Il nomme le Premier ministre. Le Parlement (Assemblee nationale + Senat) vote les lois.',
        highlights: ['President elu pour 5 ans', 'Premier ministre nomme par le President', 'Le Parlement vote les lois'],
        tip: 'La Constitution de la Ve Republique date de 1958. C\'est le texte supreme qui organise tous les pouvoirs en France.',
      },
      {
        emoji: '🇫🇷',
        title: 'Les valeurs de la Republique',
        content: 'Liberte, Egalite, Fraternite : c\'est la devise de la France. Le drapeau tricolore (bleu, blanc, rouge), La Marseillaise (hymne national) et Marianne (symbole de la Republique) sont nos symboles.',
        highlights: ['Liberte, Egalite, Fraternite', 'Drapeau bleu, blanc, rouge', 'La Marseillaise', 'Marianne'],
        tip: 'La fete nationale du 14 juillet commemore la prise de la Bastille en 1789, symbole de la fin de l\'Ancien Regime.',
      },
    ],
  },
  'emc-6e-1': {
    title: '6eme - Identite et diversite',
    pages: [
      {
        emoji: '🌈',
        title: 'Identite et diversite',
        content: 'Ton identite, c\'est ce qui te definit : ton nom, ta nationalite, ta culture, tes gouts, tes valeurs... Chaque personne est unique. La diversite de nos identites est une richesse pour la societe.',
        highlights: ['Chaque personne est unique', 'La diversite est une richesse', 'Identite = nom, culture, valeurs, gouts...'],
        tip: 'La discrimination (traiter differemment quelqu\'un a cause de son origine, son sexe, son handicap...) est interdite et punie par la loi en France. Plus de 25 criteres de discrimination sont reconnus.',
      },
      {
        emoji: '⚖️',
        title: 'Lutter contre les discriminations',
        content: 'Le racisme, le sexisme, l\'homophobie sont des formes de discrimination. En France, le Defenseur des droits est une autorite independante qui aide les victimes. Tu peux aussi appeler le 3928.',
        highlights: ['Le Defenseur des droits protege les victimes', 'Numero : 3928', 'Toute discrimination est punie par la loi'],
        tip: 'Face a une situation de discrimination, ne reste jamais silencieux. Parles-en a un adulte de confiance. Tu peux aussi contacter le Defenseur des droits sur antidiscriminations.fr.',
      },
    ],
  },
  'emc-5e-1': {
    title: '5eme - Egalite et discrimination',
    pages: [
      {
        emoji: '⚖️',
        title: 'L\'egalite en droit',
        content: 'L\'egalite en droit signifie que la loi s\'applique de la meme facon a tous, sans distinction d\'origine, de sexe, de religion ou de handicap. La parite vise a avoir autant de femmes que d\'hommes dans les instances de decision.',
        highlights: ['La loi est la meme pour tous', 'La parite : autant de femmes que d\'hommes', 'Plus de 25 criteres de discrimination reconnus par la loi'],
        tip: 'Le Defenseur des droits est une autorite independante creee en 2011. Il peut etre saisi par n\'importe qui, meme un mineur, via antidiscriminations.fr ou le 3928.',
      },
      {
        emoji: '🌍',
        title: 'Solidarite internationale',
        content: 'L\'ONU (creee en 1945) reunit 193 pays pour la paix et la cooperation. Les ONG comme Medecins Sans Frontieres ou la Croix-Rouge agissent dans les zones de crise. Les 17 Objectifs de Developpement Durable guident l\'action mondiale.',
        highlights: ['ONU : 193 pays', '17 Objectifs de Developpement Durable', 'ONG : organisations independantes d\'interet general'],
        tip: 'Le service civique permet aux jeunes de 16 a 25 ans de s\'engager dans une mission d\'interet general pendant 6 a 12 mois. C\'est volontaire et indemnise.',
      },
    ],
  },
}
