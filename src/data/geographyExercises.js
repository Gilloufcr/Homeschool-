// ═══════════════════════════════════════════════════════════════
// GEOGRAPHIE — Multiples chapitres par niveau scolaire
// Chaque grade (CE2→5eme) a 5 niveaux thematiques
// ═══════════════════════════════════════════════════════════════

export const geographyLevels = [
  // ─── CE2 ─────────────────────────────────────────────────────
  {
    id: 'geo-ce2-1', grade: 'CE2', minLevel: 1,
    name: 'CE2 - Lire une carte',
    nameMinecraft: 'Carte - Legendes', nameLalilo: 'Voyage - Legendes',
    description: 'Legendes, points cardinaux, echelle',
    exercises: [
      { id: 'gce2-1-1', type: 'choice', question: 'Tu trouves une carte au tresor mais il y a des symboles bizarres dessus. Heureusement il y a une legende ! A quoi sert-elle ?', answer: 'A expliquer les symboles utilises', options: ['A decorer la carte', 'A expliquer les symboles utilises', 'A donner le nom du cartographe', 'A indiquer la date'], xp: 10 },
      { id: 'gce2-1-2', type: 'choice', question: 'Tu es perdu en pleine foret avec ta boussole. Elle indique 4 directions. Quels sont les 4 points cardinaux ?', answer: 'Nord, Sud, Est, Ouest', options: ['Haut, Bas, Gauche, Droite', 'Nord, Sud, Est, Ouest', 'Devant, Derriere, Gauche, Droite', 'Nord, Sud, Milieu, Cote'], xp: 10 },
      { id: 'gce2-1-3', type: 'choice', question: 'Tu deploies ta carte d\'explorateur. De quel cote se trouve generalement le Nord ?', answer: 'en haut', options: ['en haut', 'en bas', 'a gauche', 'a droite'], xp: 10 },
      { id: 'gce2-1-4', type: 'choice', question: 'Tu veux savoir combien de kilometres separent deux villes sur ta carte d\'aventurier. Tu utilises...', answer: 'connaitre la distance reelle entre deux points', options: ['peser la carte', 'connaitre la distance reelle entre deux points', 'mesurer la hauteur', 'compter les villes'], xp: 15 },
      { id: 'gce2-1-5', type: 'choice', question: 'Tu survoles ton quartier en drone et tu prends une photo. Le resultat ressemble beaucoup a un...', answer: 'un espace vu de dessus a grande echelle (quartier, ville)', options: ['le monde entier', 'un espace vu de dessus a grande echelle (quartier, ville)', 'un paysage en photo', 'une montagne'], xp: 15 },
      { id: 'gce2-1-m1', type: 'matching', question: 'Relie chaque pays a sa capitale !', pairs: [{ left: 'France', right: 'Paris' }, { left: 'Espagne', right: 'Madrid' }, { left: 'Italie', right: 'Rome' }, { left: 'Allemagne', right: 'Berlin' }], xp: 15 },
      { id: 'gce2-1-fb1', type: 'fill-blank', question: 'Complete avec le bon mot !', sentence: 'Sur une carte, le ___ est toujours en haut.', blanks: ['Nord'], wordBank: ['Nord', 'Sud', 'Est', 'Ouest'], xp: 15 },
      { id: 'gce2-1-c1', type: 'coloring', question: 'Colorie la carte !', regions: [{ id: 'nord', name: 'Nord', path: 'M70,15 L110,15 L115,45 L65,45 Z', correctColor: 'blue', label: 'Le Nord en bleu' }, { id: 'ouest', name: 'Ouest', path: 'M20,45 L65,45 L60,85 L15,85 Z', correctColor: 'green', label: 'L\'Ouest en vert' }, { id: 'est', name: 'Est', path: 'M115,45 L155,45 L150,85 L110,85 Z', correctColor: 'orange', label: 'L\'Est en orange' }, { id: 'sud', name: 'Sud', path: 'M40,85 L130,85 L120,120 L50,120 Z', correctColor: 'red', label: 'Le Sud en rouge' }], palette: ['red', 'blue', 'green', 'yellow', 'orange', 'purple'], xp: 15 },
    ],
  },
  {
    id: 'geo-ce2-2', grade: 'CE2', minLevel: 1,
    name: 'CE2 - Les paysages',
    nameMinecraft: 'Carte - Paysages', nameLalilo: 'Voyage - Paysages',
    description: 'Littoral, montagne, campagne, ville',
    exercises: [
      { id: 'gce2-2-1', type: 'choice', question: 'Tu embarques sur un bateau et tu longes la cote. Le paysage que tu vois depuis la mer s\'appelle comment ?', answer: 'Un paysage littoral', options: ['Un paysage montagnard', 'Un paysage urbain', 'Un paysage littoral', 'Un paysage rural'], xp: 10 },
      { id: 'gce2-2-2', type: 'choice', question: 'Tu traverses de grands champs de ble et des prairies verdoyantes. Ce paysage de campagne, c\'est un paysage...', answer: 'Un paysage rural', options: ['Un paysage urbain', 'Un paysage rural', 'Un paysage littoral', 'Un paysage industriel'], xp: 10 },
      { id: 'gce2-2-3', type: 'choice', question: 'Tu te retrouves au milieu des immeubles, du bruit et de la circulation. Tu es dans un paysage...', answer: 'un paysage de ville', options: ['un paysage de montagne', 'un paysage de ville', 'un paysage de campagne', 'un paysage de foret'], xp: 10 },
      { id: 'gce2-2-4', type: 'choice', question: 'Tu fais une randonnee en montagne et tu remarques que les arbres disparaissent quand tu montes. Pourquoi la vegetation change-t-elle ?', answer: 'l\'altitude (plus on monte, moins il y a d\'arbres)', options: ['la saison uniquement', 'l\'altitude (plus on monte, moins il y a d\'arbres)', 'la couleur du sol', 'la taille des rochers'], xp: 15 },
      { id: 'gce2-2-5', type: 'choice', question: 'Tu passes d\'un petit village tranquille a une grande ville animee. Quelle est la vraie difference entre les deux ?', answer: 'La ville a beaucoup plus d\'habitants et de services', options: ['Le village est plus grand', 'La ville a beaucoup plus d\'habitants et de services', 'Il n\'y a pas de difference', 'Le village est plus moderne'], xp: 15 },,
      { id: 'gce2-2-mm1', type: 'memory', question: 'Retrouve les paires : chaque paysage et sa caracteristique !', pairs: [{ left: 'Littoral', right: 'Bord de mer' }, { left: 'Montagne', right: 'Sommets enneiges' }, { left: 'Campagne', right: 'Champs et prairies' }, { left: 'Ville', right: 'Immeubles et circulation' }], xp: 15 },
      { id: 'gce2-2-m1', type: 'matching', question: 'Relie chaque type de paysage a ce qu\'on y trouve !', pairs: [{ left: 'Paysage rural', right: 'Des fermes et des champs' }, { left: 'Paysage urbain', right: 'Des immeubles et des magasins' }, { left: 'Paysage littoral', right: 'Des plages et des falaises' }, { left: 'Paysage montagnard', right: 'Des forets et des sommets' }], xp: 15 }
    ],
  },
  {
    id: 'geo-ce2-3', grade: 'CE2', minLevel: 1,
    name: 'CE2 - La commune',
    nameMinecraft: 'Carte - Commune', nameLalilo: 'Voyage - Commune',
    description: 'Organisation de la commune, mairie, services',
    exercises: [
      { id: 'gce2-3-1', type: 'choice', question: 'Tu arrives dans un village et tu vois un panneau avec un nom et un code postal. Tu es entre dans une "commune". C\'est quoi exactement ?', answer: 'La plus petite division administrative (ville ou village)', options: ['Un pays', 'Une region', 'La plus petite division administrative (ville ou village)', 'Un quartier'], xp: 15 },
      { id: 'gce2-3-2', type: 'choice', question: 'Tu veux savoir qui est le chef de cette commune. Tu te rends a la mairie et tu decouvres que c\'est...', answer: 'Le maire et le conseil municipal', options: ['Le president', 'Le maire et le conseil municipal', 'Le prefet', 'Le directeur d\'ecole'], xp: 10 },
      { id: 'gce2-3-3', type: 'choice', question: 'Tu fais un stage a la mairie pendant une journee. Tu decouvres que la mairie gere plein de choses. Lesquelles ?', answer: 'l\'etat civil, les ecoles, les routes communales', options: ['l\'armee', 'l\'etat civil, les ecoles, les routes communales', 'les hopitaux uniquement', 'la television'], xp: 15 },
      { id: 'gce2-3-4', type: 'choice', question: 'Mission : compter toutes les communes de France ! Tu vas etre surpris par le nombre. Il y en a environ...', answer: 'Plus de 34 000', options: ['1 000', 'Plus de 34 000', '100', '500'], xp: 15 },
      { id: 'gce2-3-5', type: 'choice', question: 'Tu utilises l\'ecole gratuite, tu appelles les pompiers... tout ca, ce sont des services offerts a tous. Comment les appelle-t-on ?', answer: 'un service offert a tous les habitants (ecole, pompiers...)', options: ['un magasin', 'un service offert a tous les habitants (ecole, pompiers...)', 'un service prive payant', 'un restaurant'], xp: 10 },,
      { id: 'gce2-3-fb1', type: 'fill-blank', question: 'Complete la phrase !', sentence: 'Le chef de la commune est le ___ qui travaille a la mairie.', blanks: ['maire'], wordBank: ['maire', 'president', 'prefet', 'directeur'], xp: 15 },
      { id: 'gce2-3-o1', type: 'ordering', question: 'Remets les divisions administratives de la plus petite a la plus grande !', items: ['La commune', 'Le departement', 'La region', 'Le pays (France)'], correctOrder: [0, 1, 2, 3], xp: 15 }
    ],
  },
  {
    id: 'geo-ce2-4', grade: 'CE2', minLevel: 1,
    name: 'CE2 - La France',
    nameMinecraft: 'Carte - France', nameLalilo: 'Voyage - France',
    description: 'Relief, fleuves, grandes villes',
    exercises: [
      { id: 'gce2-4-1', type: 'choice', question: 'Tu es un explorateur qui arrive en France. Dans quelle ville dois-tu te rendre pour visiter la capitale ?', answer: 'Paris', options: ['Lyon', 'Paris', 'Marseille', 'Bordeaux'], xp: 10 },
      { id: 'gce2-4-2', type: 'choice', question: 'Tu regardes la France depuis l\'espace et tu remarques sa forme geometrique. Elle ressemble a quel polygone ?', answer: 'Un hexagone (6 cotes)', options: ['Un triangle', 'Un carre', 'Un hexagone (6 cotes)', 'Un pentagone'], xp: 10 },
      { id: 'gce2-4-3', type: 'choice', question: 'Defi alpiniste : tu veux gravir le plus haut sommet de France ! Quel est-il ?', answer: 'Le Mont Blanc (4 808 m)', options: ['La Tour Eiffel', 'Le Mont Blanc (4 808 m)', 'Le Pic du Midi', 'Le Puy de Dome'], xp: 15 },
      { id: 'gce2-4-4', type: 'choice', question: 'Tu decides de descendre le plus long fleuve de France en canoe. Sur quel fleuve te lances-tu ?', answer: 'La Loire', options: ['La Seine', 'Le Rhone', 'La Loire', 'La Garonne'], xp: 10 },
      { id: 'gce2-4-5', type: 'choice', question: 'Mission navigation : tu fais le tour de la France par la mer. Combien de mers et oceans differents vas-tu croiser ?', answer: '3 (Manche, Atlantique, Mediterranee)', options: ['1', '2', '3 (Manche, Atlantique, Mediterranee)', '4'], xp: 15 },,
      { id: 'gce2-4-m1', type: 'matching', question: 'Relie chaque fleuve francais a la mer ou il se jette !', pairs: [{ left: 'La Seine', right: 'La Manche' }, { left: 'La Loire', right: 'L\'ocean Atlantique' }, { left: 'Le Rhone', right: 'La mer Mediterranee' }, { left: 'La Garonne', right: 'L\'ocean Atlantique' }], xp: 15 },
      { id: 'gce2-4-mm1', type: 'memory', question: 'Retrouve les paires : villes et leur particularite !', pairs: [{ left: 'Paris', right: 'Capitale de la France' }, { left: 'Marseille', right: 'Grand port mediterraneen' }, { left: 'Lyon', right: 'Capitale de la gastronomie' }, { left: 'Toulouse', right: 'Cite de l\'aeronautique' }], xp: 15 }
    ],
  },
  {
    id: 'geo-ce2-5', grade: 'CE2', minLevel: 1,
    name: 'CE2 - Habiter en France',
    nameMinecraft: 'Carte - Habitat', nameLalilo: 'Voyage - Habitat',
    description: 'Comparer des lieux de vie en France',
    exercises: [
      { id: 'gce2-5-1', type: 'choice', question: 'Tu explores un quartier calme avec des maisons et des immeubles ou les gens habitent. Ce quartier est surtout compose de...', answer: 'maisons et immeubles d\'habitation', options: ['usines', 'maisons et immeubles d\'habitation', 'magasins uniquement', 'parcs uniquement'], xp: 10 },
      { id: 'gce2-5-2', type: 'choice', question: 'Tu vis en ville et tu dois aller a l\'ecole. Quel moyen de transport utilises-tu probablement ?', answer: 'transports en commun (bus, metro, tram)', options: ['tracteur', 'transports en commun (bus, metro, tram)', 'bateau', 'avion'], xp: 10 },
      { id: 'gce2-5-3', type: 'choice', question: 'Tu quittes la ville pour passer tes vacances a la campagne. Qu\'y trouves-tu surtout ?', answer: 'des champs, des fermes et de la nature', options: ['des gratte-ciels', 'des champs, des fermes et de la nature', 'des metros', 'des autoroutes'], xp: 10 },
      { id: 'gce2-5-4', type: 'choice', question: 'Tu prends l\'avion et tu atterris a la Guadeloupe. C\'est toujours la France mais tres loin ! Comment appelle-t-on ces territoires ?', answer: 'des territoires francais eloignes (Guadeloupe, Reunion...)', options: ['des regions de France metropolitaine', 'des territoires francais eloignes (Guadeloupe, Reunion...)', 'des pays etrangers', 'des iles imaginaires'], xp: 15 },
      { id: 'gce2-5-5', type: 'choice', question: 'Tu compares la vie a la montagne et la vie au bord de la mer. Qu\'est-ce qui change entre ces deux endroits ?', answer: 'le climat, les activites et les paysages', options: ['rien du tout', 'le climat, les activites et les paysages', 'la langue', 'le fuseau horaire'], xp: 15 },,
      { id: 'gce2-5-fb1', type: 'fill-blank', question: 'Complete la phrase !', sentence: 'En ville, on utilise surtout les transports en ___ comme le bus ou le metro.', blanks: ['commun'], wordBank: ['commun', 'voiture', 'velo', 'avion'], xp: 15 },
      { id: 'gce2-5-m1', type: 'matching', question: 'Relie chaque lieu de vie a son moyen de transport typique !', pairs: [{ left: 'Grande ville', right: 'Metro et bus' }, { left: 'Campagne', right: 'Voiture' }, { left: 'Montagne', right: 'Telepherique' }, { left: 'Ile lointaine', right: 'Avion ou bateau' }], xp: 15 }
    ],
  },

  // ─── CM1 ─────────────────────────────────────────────────────
  {
    id: 'geo-cm1-1', grade: 'CM1', minLevel: 1,
    name: 'CM1 - Regions et departements',
    nameMinecraft: 'Exploration - Regions', nameLalilo: 'Tour - Regions',
    description: 'L\'organisation du territoire francais',
    exercises: [
      { id: 'gcm1-1-1', type: 'choice', question: 'Tu veux visiter toutes les regions de France metropolitaine. Combien d\'etapes dois-tu prevoir ?', answer: '13', options: ['10', '13', '18', '22'], xp: 10 },
      { id: 'gcm1-1-2', type: 'choice', question: 'Defi geographie : tu dois traverser tous les departements de France metropolitaine. Combien y en a-t-il ?', answer: '96', options: ['50', '75', '96', '101'], xp: 15 },
      { id: 'gcm1-1-3', type: 'choice', question: 'Tu arrives dans un departement et tu veux savoir qui le dirige. Qui est le chef ?', answer: 'Le president du conseil departemental', options: ['Le maire', 'Le president du conseil departemental', 'Le prefet', 'Le president de la Republique'], xp: 15 },
      { id: 'gcm1-1-4', type: 'choice', question: 'Tu rencontres un personnage important dans le departement : le prefet. Qui represente-t-il ?', answer: 'l\'Etat dans le departement', options: ['le maire', 'l\'Etat dans le departement', 'le president du conseil regional', 'l\'Union europeenne'], xp: 15 },
      { id: 'gcm1-1-5', type: 'choice', question: 'Tu prends le TER et tu passes devant un lycee. Tu decouvres que c\'est la region qui gere tout ca ! De quoi s\'occupe-t-elle ?', answer: 'les lycees et les transports regionaux (TER)', options: ['les ecoles primaires', 'les lycees et les transports regionaux (TER)', 'la police', 'l\'armee'], xp: 15 },,
      { id: 'gcm1-1-m1', type: 'matching', question: 'Relie chaque region francaise a sa capitale !', pairs: [{ left: 'Ile-de-France', right: 'Paris' }, { left: 'Auvergne-Rhone-Alpes', right: 'Lyon' }, { left: 'Nouvelle-Aquitaine', right: 'Bordeaux' }, { left: 'Occitanie', right: 'Toulouse' }], xp: 15 },
      { id: 'gcm1-1-fb1', type: 'fill-blank', question: 'Complete la phrase !', sentence: 'La France metropolitaine compte ___ regions administratives.', blanks: ['13'], wordBank: ['13', '22', '5', '101'], xp: 15 }
    ],
  },
  {
    id: 'geo-cm1-2', grade: 'CM1', minLevel: 1,
    name: 'CM1 - Activites economiques',
    nameMinecraft: 'Exploration - Economie', nameLalilo: 'Tour - Economie',
    description: 'Agriculture, industrie, services, tourisme',
    exercises: [
      { id: 'gcm1-2-1', type: 'choice', question: 'Tu pars en vacances a la montagne en hiver. Quelle activite economique te permet de skier et de randonner ?', answer: 'Les stations de ski et la randonnee', options: ['La peche en mer', 'Les stations de ski et la randonnee', 'La culture du ble', 'L\'industrie automobile'], xp: 15 },
      { id: 'gcm1-2-2', type: 'choice', question: 'Tu survoles les immenses champs de ble de la Beauce. Pourquoi la France est-elle un grand pays agricole ?', answer: 'ses plaines fertiles et son climat tempere', options: ['son industrie', 'ses plaines fertiles et son climat tempere', 'ses mines', 'son petrole'], xp: 15 },
      { id: 'gcm1-2-3', type: 'choice', question: 'Tu travailles un jour comme medecin, le lendemain comme vendeur, puis comme prof. Tous ces metiers font partie du secteur...', answer: 'les services (commerce, sante, education...)', options: ['l\'agriculture', 'l\'industrie', 'les services (commerce, sante, education...)', 'la peche'], xp: 10 },
      { id: 'gcm1-2-4', type: 'choice', question: 'Tu croises des touristes de tous les pays en France ! Pourquoi le tourisme est-il si important ici ?', answer: 'la France est le pays le plus visite au monde', options: ['elle n\'a pas d\'industrie', 'la France est le pays le plus visite au monde', 'il fait toujours beau', 'il n\'y a que des plages'], xp: 15 },
      { id: 'gcm1-2-5', type: 'choice', question: 'Tu quittes la ville mais tu n\'es pas encore a la campagne. Tu traverses une zone avec des lotissements et des centres commerciaux. C\'est un espace...', answer: 'La zone entre la ville et la campagne', options: ['Le centre-ville', 'La zone entre la ville et la campagne', 'Un parc naturel', 'Un quartier industriel'], xp: 15 },,
      { id: 'gcm1-2-mm1', type: 'memory', question: 'Retrouve les paires : pays europeens et capitales !', pairs: [{ left: 'Royaume-Uni', right: 'Londres' }, { left: 'Espagne', right: 'Madrid' }, { left: 'Italie', right: 'Rome' }, { left: 'Allemagne', right: 'Berlin' }], xp: 15 },
      { id: 'gcm1-2-m1', type: 'matching', question: 'Relie chaque pays a son drapeau ou symbole !', pairs: [{ left: 'France', right: 'Bleu-blanc-rouge' }, { left: 'Italie', right: 'Vert-blanc-rouge' }, { left: 'Allemagne', right: 'Noir-rouge-or' }, { left: 'Espagne', right: 'Rouge-jaune-rouge' }], xp: 15 }
    ],
  },
  {
    id: 'geo-cm1-3', grade: 'CM1', minLevel: 1,
    name: 'CM1 - Transports et mobilite',
    nameMinecraft: 'Exploration - Transports', nameLalilo: 'Tour - Transports',
    description: 'Reseaux de transport en France',
    exercises: [
      { id: 'gcm1-3-1', type: 'choice', question: 'Tu dois aller de Paris a Lyon le plus vite possible. Quel train super rapide vas-tu prendre ?', answer: 'Le TGV', options: ['Le velo', 'Le TGV', 'Le bateau', 'L\'avion uniquement'], xp: 10 },
      { id: 'gcm1-3-2', type: 'choice', question: 'Tu arrives dans un gigantesque port avec des conteneurs enormes. A quoi sert un port maritime ?', answer: 'Au commerce international et a la peche', options: ['Uniquement aux bateaux de plaisance', 'Au commerce international et a la peche', 'A stocker de l\'eau', 'A produire de l\'electricite'], xp: 15 },
      { id: 'gcm1-3-3', type: 'choice', question: 'Tu prends l\'avion en France et tu atterris dans le plus grand aeroport du pays. Comment s\'appelle-t-il ?', answer: 'Roissy-Charles de Gaulle', options: ['Orly', 'Roissy-Charles de Gaulle', 'Lyon-Saint Exupery', 'Nice'], xp: 10 },
      { id: 'gcm1-3-4', type: 'choice', question: 'Tu roules sur une grande route et tu lis le panneau : A6. Par quelle lettre les autoroutes sont-elles identifiees ?', answer: 'A (ex: A1, A6, A10)', options: ['N', 'A (ex: A1, A6, A10)', 'D', 'M'], xp: 10 },
      { id: 'gcm1-3-5', type: 'choice', question: 'Tu es bloque dans un embouteillage monstre ! Pourquoi les transports en commun sont-ils une meilleure solution ?', answer: 'Ils reduisent la pollution et les embouteillages', options: ['Ils sont plus rapides que l\'avion', 'Ils reduisent la pollution et les embouteillages', 'Ils sont gratuits', 'Ils remplacent les voitures partout'], xp: 15 },,
      { id: 'gcm1-3-fb1', type: 'fill-blank', question: 'Complete la phrase !', sentence: 'Les quatre grands fleuves de France sont la Seine, la Loire, le Rhone et la ___.', blanks: ['Garonne'], wordBank: ['Garonne', 'Marne', 'Dordogne', 'Moselle'], xp: 15 },
      { id: 'gcm1-3-o1', type: 'ordering', question: 'Remets les fleuves francais du plus court au plus long !', items: ['La Garonne (575 km)', 'La Seine (776 km)', 'Le Rhone (812 km)', 'La Loire (1 012 km)'], correctOrder: [0, 1, 2, 3], xp: 15 }
    ],
  },
  {
    id: 'geo-cm1-4', grade: 'CM1', minLevel: 1,
    name: 'CM1 - L\'Europe',
    nameMinecraft: 'Exploration - Europe', nameLalilo: 'Tour - Europe',
    description: 'Les pays europeens et l\'Union europeenne',
    exercises: [
      { id: 'gcm1-4-1', type: 'choice', question: 'Tu veux visiter tous les pays de l\'Union europeenne. Combien de drapeaux differents vas-tu collectionner ?', answer: '27', options: ['15', '27', '50', '12'], xp: 10 },
      { id: 'gcm1-4-2', type: 'choice', question: 'Tu passes la frontiere entre la France et l\'Allemagne et tu n\'as pas besoin de changer de monnaie. Quelle monnaie partagent-ils ?', answer: 'l\'euro', options: ['le dollar', 'l\'euro', 'la livre', 'le franc'], xp: 10 },
      { id: 'gcm1-4-3', type: 'choice', question: 'Tu prepares ton voyage en Allemagne et tu reserves un hotel dans la capitale. Dans quelle ville vas-tu dormir ?', answer: 'Berlin', options: ['Munich', 'Berlin', 'Francfort', 'Hambourg'], xp: 10 },
      { id: 'gcm1-4-4', type: 'choice', question: 'Tu apprends qu\'un pays a quitte l\'Union europeenne en 2020. Tout le monde en a parle ! Comment appelle-t-on cet evenement ?', answer: 'le Brexit', options: ['le Frexit', 'le Brexit', 'le Grexit', 'l\'Euxit'], xp: 15 },
      { id: 'gcm1-4-5', type: 'choice', question: 'Tu cherches le pays le plus peuple de l\'Union europeenne. Lequel a le plus d\'habitants ?', answer: 'l\'Allemagne', options: ['la France', 'l\'Allemagne', 'l\'Italie', 'l\'Espagne'], xp: 15 },,
      { id: 'gcm1-4-m1', type: 'matching', question: 'Relie chaque chaine de montagnes a sa localisation !', pairs: [{ left: 'Les Alpes', right: 'Sud-Est de la France' }, { left: 'Les Pyrenees', right: 'Frontiere avec l\'Espagne' }, { left: 'Le Massif central', right: 'Centre de la France' }, { left: 'Les Vosges', right: 'Nord-Est de la France' }], xp: 15 },
      { id: 'gcm1-4-mm1', type: 'memory', question: 'Retrouve les paires : sommets et massifs !', pairs: [{ left: 'Mont Blanc', right: 'Alpes' }, { left: 'Pic du Midi', right: 'Pyrenees' }, { left: 'Puy de Dome', right: 'Massif central' }, { left: 'Grand Ballon', right: 'Vosges' }], xp: 15 }
    ],
  },
  {
    id: 'geo-cm1-5', grade: 'CM1', minLevel: 1,
    name: 'CM1 - Espaces touristiques',
    nameMinecraft: 'Exploration - Tourisme', nameLalilo: 'Tour - Tourisme',
    description: 'Le tourisme en France et ses impacts',
    exercises: [
      { id: 'gcm1-5-1', type: 'choice', question: 'Tu dois guider un groupe de touristes vers le monument le plus visite de France. Ou les emmenes-tu ?', answer: 'La Tour Eiffel (ou le Louvre)', options: ['Le Mont-Saint-Michel', 'La Tour Eiffel (ou le Louvre)', 'Le chateau de Versailles', 'Disneyland'], xp: 10 },
      { id: 'gcm1-5-2', type: 'choice', question: 'Tu mets ton maillot de bain et ta creme solaire pour tes vacances a la plage. Ce type de tourisme s\'appelle...', answer: 'le tourisme de bord de mer (plages)', options: ['le tourisme de montagne', 'le tourisme de bord de mer (plages)', 'le tourisme culturel', 'le tourisme vert'], xp: 10 },
      { id: 'gcm1-5-3', type: 'choice', question: 'Tu pars en vacances dans un gite a la campagne pour faire de la randonnee et observer les oiseaux. C\'est du tourisme...', answer: 'la campagne et la nature (randonnee, gites...)', options: ['les parcs d\'attractions', 'la campagne et la nature (randonnee, gites...)', 'les grandes villes', 'les aeroports'], xp: 15 },
      { id: 'gcm1-5-4', type: 'choice', question: 'Tu arrives sur une plage paradisiaque mais elle est couverte de dechets laisses par les touristes. Quel est cet impact negatif du tourisme de masse ?', answer: 'la pollution et la degradation des sites', options: ['la creation d\'emplois', 'la pollution et la degradation des sites', 'la decouverte de nouvelles cultures', 'l\'amelioration des transports'], xp: 15 },
      { id: 'gcm1-5-5', type: 'choice', question: 'Tu decouvres un nouveau type de voyage qui respecte la nature et les habitants. C\'est l\'ecotourisme ! Il cherche a...', answer: 'voyager en respectant l\'environnement', options: ['voyager le moins cher possible', 'voyager en respectant l\'environnement', 'visiter uniquement les musees', 'ne jamais voyager'], xp: 15 },,
      { id: 'gcm1-5-fb1', type: 'fill-blank', question: 'Complete la phrase !', sentence: 'La France a la forme d\'un ___ a six cotes.', blanks: ['hexagone'], wordBank: ['hexagone', 'triangle', 'carre', 'rectangle'], xp: 15 },
      { id: 'gcm1-5-m1', type: 'matching', question: 'Relie chaque facade maritime de la France a son ocean ou mer !', pairs: [{ left: 'Facade nord', right: 'La Manche' }, { left: 'Facade ouest', right: 'Ocean Atlantique' }, { left: 'Facade sud', right: 'Mer Mediterranee' }, { left: 'Corse', right: 'Mer Mediterranee aussi' }], xp: 15 }
    ],
  },

  // ─── CM2 ─────────────────────────────────────────────────────
  {
    id: 'geo-cm2-1', grade: 'CM2', minLevel: 1,
    name: 'CM2 - Communiquer et se deplacer',
    nameMinecraft: 'Tour du Monde - Communication', nameLalilo: 'Globe - Communication',
    description: 'Reseaux de communication et numerique',
    exercises: [
      { id: 'gcm2-1-1', type: 'choice', question: 'Tu decouvres que certains enfants dans le monde n\'ont pas internet. Comment appelle-t-on ces inegalites d\'acces ?', answer: 'La fracture numerique', options: ['Le bug internet', 'La fracture numerique', 'La panne mondiale', 'Le piratage'], xp: 15 },
      { id: 'gcm2-1-2', type: 'choice', question: 'Tu envoies un message a ton correspondant au Japon et il repond en 2 secondes ! Que permet internet ?', answer: 'communiquer instantanement dans le monde entier', options: ['voyager physiquement', 'communiquer instantanement dans le monde entier', 'produire de l\'electricite', 'construire des routes'], xp: 10 },
      { id: 'gcm2-1-3', type: 'choice', question: 'Tu plonges au fond de l\'ocean et tu decouvres d\'enormes cables ! A quoi servent ces cables sous-marins ?', answer: 'transporter les donnees internet entre les continents', options: ['pecher', 'transporter les donnees internet entre les continents', 'produire de l\'electricite', 'relier les iles par la route'], xp: 15 },
      { id: 'gcm2-1-4', type: 'choice', question: 'Tu voyages dans un pays en developpement et tu vois que tout le monde a un telephone. Internet s\'y diffuse surtout grace a quoi ?', answer: 'au telephone mobile', options: ['aux ordinateurs fixes', 'au telephone mobile', 'aux tablettes', 'aux televiseurs'], xp: 15 },
      { id: 'gcm2-1-5', type: 'choice', question: 'Ton parent travaille de la maison aujourd\'hui au lieu de prendre la voiture. C\'est le teletravail ! Son avantage est...', answer: 'moins de deplacements et de pollution', options: ['plus de trafic routier', 'moins de deplacements et de pollution', 'plus de reunions en personne', 'aucun avantage'], xp: 10 },,
      { id: 'gcm2-1-m1', type: 'matching', question: 'Relie chaque zone climatique a ses caracteristiques !', pairs: [{ left: 'Zone tropicale', right: 'Chaud et humide toute l\'annee' }, { left: 'Zone temperee', right: 'Quatre saisons distinctes' }, { left: 'Zone polaire', right: 'Froid extreme et glace' }, { left: 'Zone aride', right: 'Tres sec et peu de pluie' }], xp: 15 },
      { id: 'gcm2-1-fb1', type: 'fill-blank', question: 'Complete la phrase !', sentence: 'La France se situe dans la zone climatique ___.', blanks: ['temperee'], wordBank: ['temperee', 'tropicale', 'polaire', 'aride'], xp: 15 }
    ],
  },
  {
    id: 'geo-cm2-2', grade: 'CM2', minLevel: 1,
    name: 'CM2 - Developpement durable',
    nameMinecraft: 'Tour du Monde - Durable', nameLalilo: 'Globe - Durable',
    description: 'Les 3 piliers du developpement durable',
    exercises: [
      { id: 'gcm2-2-1', type: 'choice', question: 'Tu es nomme "gardien de la planete" et tu dois expliquer le developpement durable aux autres eleves. C\'est quoi ?', answer: 'Un developpement qui repond aux besoins actuels sans compromettre ceux des generations futures', options: ['Construire le plus vite possible', 'Un developpement qui repond aux besoins actuels sans compromettre ceux des generations futures', 'Ne plus rien construire', 'Developper uniquement l\'economie'], xp: 20 },
      { id: 'gcm2-2-2', type: 'choice', question: 'Tu construis un projet de ville ideale et tu dois respecter les 3 piliers du developpement durable. Quels sont-ils ?', answer: 'economique, social et environnemental', options: ['eau, air, terre', 'economique, social et environnemental', 'passe, present, futur', 'local, national, mondial'], xp: 15 },
      { id: 'gcm2-2-3', type: 'choice', question: 'Tu tries tes dechets dans les bonnes poubelles comme un pro. Le tri selectif, ca sert a quoi ?', answer: 'recycler les materiaux et reduire la pollution', options: ['augmenter les dechets', 'recycler les materiaux et reduire la pollution', 'rien du tout', 'jeter plus vite'], xp: 10 },
      { id: 'gcm2-2-4', type: 'choice', question: 'Tu visites un quartier ultra-moderne avec des panneaux solaires et des jardins partout. C\'est un "eco-quartier" ! C\'est quoi ?', answer: 'un quartier concu pour etre respectueux de l\'environnement', options: ['un quartier tres cher', 'un quartier concu pour etre respectueux de l\'environnement', 'un quartier sans voitures', 'un quartier sans habitants'], xp: 15 },
      { id: 'gcm2-2-5', type: 'choice', question: 'Tu dois te deplacer dans une ville ecoresponsable. Comment te deplacerais-tu idealement ?', answer: 'En transports en commun, velo, marche a pied', options: ['En voiture individuelle uniquement', 'En avion', 'En transports en commun, velo, marche a pied', 'En moto'], xp: 15 },,
      { id: 'gcm2-2-mm1', type: 'memory', question: 'Retrouve les paires : oceans et leur position !', pairs: [{ left: 'Atlantique', right: 'Entre Amerique et Europe' }, { left: 'Pacifique', right: 'Le plus grand ocean' }, { left: 'Indien', right: 'Au sud de l\'Asie' }, { left: 'Arctique', right: 'Au pole Nord' }], xp: 15 },
      { id: 'gcm2-2-m1', type: 'matching', question: 'Relie chaque continent a une de ses particularites !', pairs: [{ left: 'Afrique', right: 'Continent le plus chaud' }, { left: 'Asie', right: 'Le plus peuple' }, { left: 'Amerique', right: 'S\'etend du Nord au Sud' }, { left: 'Antarctique', right: 'Couvert de glace' }], xp: 15 }
    ],
  },
  {
    id: 'geo-cm2-3', grade: 'CM2', minLevel: 1,
    name: 'CM2 - Recycler et economiser',
    nameMinecraft: 'Tour du Monde - Recyclage', nameLalilo: 'Globe - Recyclage',
    description: 'Gestion des dechets, economie d\'energie',
    exercises: [
      { id: 'gcm2-3-1', type: 'choice', question: 'Tu lances une mission "zero dechet" dans ta classe. Que permet le recyclage concretement ?', answer: 'Reduire les dechets et reutiliser des matieres premieres', options: ['Produire plus de dechets', 'Reduire les dechets et reutiliser des matieres premieres', 'Rendre les objets plus chers', 'Rien de special'], xp: 10 },
      { id: 'gcm2-3-2', type: 'choice', question: 'Tu jettes une bouteille en plastique dans la nature. Combien de temps faudra-t-il pour qu\'elle disparaisse ?', answer: 'Plusieurs centaines d\'annees', options: ['1 mois', '1 an', 'Plusieurs centaines d\'annees', 'Il ne se decompose jamais'], xp: 15 },
      { id: 'gcm2-3-3', type: 'choice', question: 'Tu deviens ambassadeur de l\'ecologie et tu enseignes la regle des 3R. C\'est quoi ?', answer: 'Reduire, Reutiliser, Recycler', options: ['Rouge, Rose, Roux', 'Reduire, Reutiliser, Recycler', 'Ranger, Ramasser, Redonner', 'Reparer, Revendre, Racheter'], xp: 15 },
      { id: 'gcm2-3-4', type: 'choice', question: 'Mission economies d\'energie a la maison ! Que peux-tu faire pour depenser moins d\'electricite ?', answer: 'eteindre les lumieres et les appareils en veille', options: ['laisser les lumieres allumees', 'eteindre les lumieres et les appareils en veille', 'utiliser plus d\'appareils', 'ouvrir les fenetres en hiver'], xp: 10 },
      { id: 'gcm2-3-5', type: 'choice', question: 'Tu ouvres le robinet et l\'eau coule. Mais attention, l\'eau potable est...', answer: 'une ressource precieuse a economiser', options: ['inepuisable', 'une ressource precieuse a economiser', 'gratuite partout', 'disponible partout'], xp: 15 },,
      { id: 'gcm2-3-fb1', type: 'fill-blank', question: 'Complete la phrase !', sentence: 'La Terre compte ___ continents et 5 oceans.', blanks: ['6'], wordBank: ['4', '5', '6', '7'], xp: 15 },
      { id: 'gcm2-3-o1', type: 'ordering', question: 'Remets les continents du moins peuple au plus peuple !', items: ['Oceanie', 'Amerique du Sud', 'Europe', 'Afrique', 'Asie'], correctOrder: [0, 1, 2, 3, 4], xp: 15 }
    ],
  },
  {
    id: 'geo-cm2-4', grade: 'CM2', minLevel: 1,
    name: 'CM2 - Les continents et oceans',
    nameMinecraft: 'Tour du Monde - Continents', nameLalilo: 'Globe - Continents',
    description: 'La Terre : continents, oceans, grands reperes',
    exercises: [
      { id: 'gcm2-4-1', type: 'choice', question: 'Mission tour du monde ! Combien de continents dois-tu traverser pour faire le tour complet ?', answer: '6 (Europe, Asie, Afrique, Amerique, Oceanie, Antarctique)', options: ['4', '5', '6 (Europe, Asie, Afrique, Amerique, Oceanie, Antarctique)', '7'], xp: 10 },
      { id: 'gcm2-4-2', type: 'choice', question: 'Tu navigues en bateau et tu traverses l\'ocean le plus vaste de la planete. Lequel est-ce ?', answer: 'L\'ocean Pacifique', options: ['L\'ocean Atlantique', 'L\'ocean Pacifique', 'L\'ocean Indien', 'L\'ocean Arctique'], xp: 10 },
      { id: 'gcm2-4-3', type: 'choice', question: 'Ta fusee survole l\'equateur. Cette ligne imaginaire divise la Terre en quelles deux parties ?', answer: 'hemisphere Nord et hemisphere Sud', options: ['Est et Ouest', 'hemisphere Nord et hemisphere Sud', 'jour et nuit', 'terre et mer'], xp: 15 },
      { id: 'gcm2-4-4', type: 'choice', question: 'Tu veux aller sur le continent ou vivent le plus de gens sur Terre. Ou mets-tu le cap ?', answer: 'l\'Asie', options: ['l\'Afrique', 'l\'Asie', 'l\'Europe', 'l\'Amerique'], xp: 10 },
      { id: 'gcm2-4-5', type: 'choice', question: 'Tu poses le pied sur l\'Antarctique et il fait -50 degres ! C\'est quoi exactement, l\'Antarctique ?', answer: 'un continent couvert de glace, sans habitants permanents', options: ['un pays tres froid', 'un continent couvert de glace, sans habitants permanents', 'une ile au nord', 'un ocean gele'], xp: 15 },,
      { id: 'gcm2-4-m1', type: 'matching', question: 'Relie chaque terme de population a sa definition !', pairs: [{ left: 'Densite', right: 'Nombre d\'habitants par km2' }, { left: 'Exode rural', right: 'Depart des campagnes vers les villes' }, { left: 'Urbanisation', right: 'Croissance des villes' }, { left: 'Immigration', right: 'Arrivee dans un nouveau pays' }], xp: 15 },
      { id: 'gcm2-4-mm1', type: 'memory', question: 'Retrouve les paires : grandes villes et leur pays !', pairs: [{ left: 'Tokyo', right: 'Japon' }, { left: 'New York', right: 'Etats-Unis' }, { left: 'Le Caire', right: 'Egypte' }, { left: 'Sao Paulo', right: 'Bresil' }], xp: 15 }
    ],
  },
  {
    id: 'geo-cm2-5', grade: 'CM2', minLevel: 1,
    name: 'CM2 - Outre-mer et francophonie',
    nameMinecraft: 'Tour du Monde - Outre-mer', nameLalilo: 'Globe - Outre-mer',
    description: 'Les territoires francais dans le monde',
    exercises: [
      { id: 'gcm2-5-1', type: 'choice', question: 'Tu prends l\'avion pour la Guadeloupe et la Martinique. Dans quelle partie du monde atterris-tu ?', answer: 'dans les Caraibes (Amerique)', options: ['en Afrique', 'dans les Caraibes (Amerique)', 'en Asie', 'en Europe'], xp: 10 },
      { id: 'gcm2-5-2', type: 'choice', question: 'Tu fais escale a la Reunion, une ile tropicale francaise. Dans quel ocean se trouve-t-elle ?', answer: 'Indien', options: ['Atlantique', 'Pacifique', 'Indien', 'Arctique'], xp: 10 },
      { id: 'gcm2-5-3', type: 'choice', question: 'Tu voyages dans plein de pays et tu entends parler francais un peu partout ! Comment appelle-t-on l\'ensemble de ces pays ?', answer: 'l\'ensemble des pays ou l\'on parle francais', options: ['la France uniquement', 'l\'ensemble des pays ou l\'on parle francais', 'l\'Europe', 'les anciennes colonies'], xp: 15 },
      { id: 'gcm2-5-4', type: 'choice', question: 'Mission comptage : combien de personnes dans le monde peuvent parler francais avec toi ?', answer: 'Plus de 300 millions', options: ['50 millions', '100 millions', 'Plus de 300 millions', '1 milliard'], xp: 15 },
      { id: 'gcm2-5-5', type: 'choice', question: 'Tu voles jusqu\'en Nouvelle-Caledonie, un territoire francais au bout du monde. Dans quel ocean et quelle region se trouve-t-elle ?', answer: 'dans le Pacifique (Oceanie)', options: ['en Afrique', 'dans l\'Atlantique', 'dans le Pacifique (Oceanie)', 'en Europe'], xp: 15 },,
      { id: 'gcm2-5-fb1', type: 'fill-blank', question: 'Complete la phrase !', sentence: 'Le recyclage des dechets est un geste important pour le developpement ___.', blanks: ['durable'], wordBank: ['durable', 'rapide', 'industriel', 'urbain'], xp: 15 },
      { id: 'gcm2-5-m1', type: 'matching', question: 'Relie chaque action ecologique a son benefice !', pairs: [{ left: 'Recycler', right: 'Moins de dechets' }, { left: 'Economiser l\'eau', right: 'Preserver les ressources' }, { left: 'Transports en commun', right: 'Moins de pollution' }, { left: 'Energies renouvelables', right: 'Moins de CO2' }], xp: 15 }
    ],
  },

  // ─── 6eme ────────────────────────────────────────────────────
  {
    id: 'geo-6e-1', grade: '6eme', minLevel: 1,
    name: '6eme - Les metropoles mondiales',
    nameMinecraft: 'Biomes - Metropoles', nameLalilo: 'Saisons - Metropoles',
    description: 'Qu\'est-ce qu\'une metropole ? Les villes mondiales',
    exercises: [
      { id: 'g6e-1-1', type: 'choice', question: 'Tu atterris dans une ville geante avec des gratte-ciels partout et des millions d\'habitants. Comment appelle-t-on ce type de ville ?', answer: 'Une grande ville qui concentre population, activites et pouvoirs', options: ['N\'importe quelle ville', 'Une grande ville qui concentre population, activites et pouvoirs', 'Une ville de campagne', 'Un village touristique'], xp: 15 },
      { id: 'g6e-1-2', type: 'choice', question: 'Tu cherches la ville la plus peuplee du monde pour y mener ton enquete. Ou dois-tu acheter ton billet d\'avion ?', answer: 'Tokyo', options: ['New York', 'Tokyo', 'Paris', 'Shanghai'], xp: 10 },
      { id: 'g6e-1-3', type: 'choice', question: 'Tu observes des familles quitter la campagne pour s\'installer en ville. Ce grand mouvement de population s\'appelle...', answer: 'le depart des habitants de la campagne vers la ville', options: ['la construction de villages', 'le depart des habitants de la campagne vers la ville', 'l\'arrivee de citadins a la campagne', 'le deplacement entre pays'], xp: 15 },
      { id: 'g6e-1-4', type: 'choice', question: 'Tu explores les quartiers d\'une grande ville et tu tombes sur des habitations precaires faites de tole et de carton. C\'est un...', answer: 'un quartier tres pauvre construit avec des materiaux de recuperation', options: ['un quartier riche', 'un quartier tres pauvre construit avec des materiaux de recuperation', 'un centre commercial', 'un parc'], xp: 15 },
      { id: 'g6e-1-5', type: 'choice', question: 'Tu regardes des photos satellites et tu vois les villes s\'etendre d\'annee en annee. Ce phenomene s\'appelle...', answer: 'la croissance des villes et de leur population', options: ['la disparition des villes', 'la croissance des villes et de leur population', 'la construction de routes', 'la protection de la nature'], xp: 10 },,
      { id: 'g6e-1-m1', type: 'matching', question: 'Relie chaque type d\'espace a sa definition !', pairs: [{ left: 'Urbain', right: 'Espace de ville' }, { left: 'Rural', right: 'Espace de campagne' }, { left: 'Periurbain', right: 'Entre ville et campagne' }, { left: 'Littoral', right: 'Bord de mer' }], xp: 15 },
      { id: 'g6e-1-fb1', type: 'fill-blank', question: 'Complete la phrase !', sentence: 'Plus de la moitie de la population mondiale vit aujourd\'hui en zone ___.', blanks: ['urbaine'], wordBank: ['urbaine', 'rurale', 'montagnarde', 'desertique'], xp: 15 }
    ],
  },
  {
    id: 'geo-6e-2', grade: '6eme', minLevel: 1,
    name: '6eme - Habiter des espaces contraints',
    nameMinecraft: 'Biomes - Contraintes', nameLalilo: 'Saisons - Contraintes',
    description: 'Vivre avec des contraintes naturelles',
    exercises: [
      { id: 'g6e-2-1', type: 'choice', question: 'Tu tentes de construire une maison mais le terrain est hostile ! Quels types d\'espaces rendent l\'habitation tres difficile ?', answer: 'Le desert, la haute montagne, les zones polaires', options: ['Les plaines fertiles', 'Le desert, la haute montagne, les zones polaires', 'Les bords de riviere', 'Les forets temperees'], xp: 15 },
      { id: 'g6e-2-2', type: 'choice', question: 'Tu atterris en plein desert et pourtant des gens vivent la ! Comment se sont-ils adaptes a la chaleur extreme ?', answer: 'Oasis, irrigation, habitat adapte au soleil', options: ['Ils ne vivent pas dans le desert', 'Oasis, irrigation, habitat adapte au soleil', 'Ils construisent des gratte-ciels', 'Ils creent des lacs artificiels'], xp: 15 },
      { id: 'g6e-2-3', type: 'choice', question: 'Tu explores les montagnes et tu cherches les villages. Ou sont-ils generalement construits en haute montagne ?', answer: 'dans les vallees, a l\'abri du vent', options: ['au sommet des pics', 'dans les vallees, a l\'abri du vent', 'sur les glaciers', 'dans les grottes'], xp: 15 },
      { id: 'g6e-2-4', type: 'choice', question: 'Tu arrives au pole Nord et tu ne vois presque personne. Pourquoi les zones polaires sont-elles si peu peuplees ?', answer: 'il fait tres froid et les ressources sont limitees', options: ['il y a trop de monde', 'il fait tres froid et les ressources sont limitees', 'il n\'y a pas d\'eau', 'il fait trop chaud'], xp: 10 },
      { id: 'g6e-2-5', type: 'choice', question: 'Tu habites au bord de la mer et une tempete arrive. Quel risque naturel menace ta maison sur la cote ?', answer: 'les inondations et la montee des eaux', options: ['les avalanches', 'les inondations et la montee des eaux', 'les tremblements de terre uniquement', 'les secheresses'], xp: 15 },,
      { id: 'g6e-2-mm1', type: 'memory', question: 'Retrouve les paires : grandes metropoles mondiales !', pairs: [{ left: 'Paris', right: 'France' }, { left: 'Londres', right: 'Royaume-Uni' }, { left: 'Shanghai', right: 'Chine' }, { left: 'Mumbai', right: 'Inde' }], xp: 15 },
      { id: 'g6e-2-m1', type: 'matching', question: 'Relie chaque metropole a sa particularite !', pairs: [{ left: 'New York', right: 'Capitale financiere mondiale' }, { left: 'Tokyo', right: 'Ville la plus peuplee' }, { left: 'Dubai', right: 'Gratte-ciels dans le desert' }, { left: 'Paris', right: 'Capitale du tourisme' }], xp: 15 }
    ],
  },
  {
    id: 'geo-6e-3', grade: '6eme', minLevel: 1,
    name: '6eme - Repartition de la population',
    nameMinecraft: 'Biomes - Population', nameLalilo: 'Saisons - Population',
    description: 'Foyers de peuplement et espaces vides',
    exercises: [
      { id: 'g6e-3-1', type: 'choice', question: 'Tu regardes une carte mondiale de la population et tu vois une zone rouge immense : c\'est la ou vivent le plus de gens. Ou est-ce ?', answer: 'En Asie (Chine, Inde, Asie du Sud-Est)', options: ['En Europe', 'En Amerique', 'En Asie (Chine, Inde, Asie du Sud-Est)', 'En Afrique'], xp: 15 },
      { id: 'g6e-3-2', type: 'choice', question: 'Tu survoles une region immense sans aucun village ni ville. Comment appelle-t-on une zone presque sans habitants ?', answer: 'Un desert humain', options: ['Une megapole', 'Un desert humain', 'Une banlieue', 'Un espace rural'], xp: 20 },
      { id: 'g6e-3-3', type: 'choice', question: 'Tu cherches les endroits ou les gens aiment le plus s\'installer sur Terre. Ou se trouvent les grands foyers de peuplement ?', answer: 'pres des cotes, des fleuves et dans les plaines', options: ['en haute montagne', 'pres des cotes, des fleuves et dans les plaines', 'dans les deserts', 'aux poles'], xp: 15 },
      { id: 'g6e-3-4', type: 'choice', question: 'Tu veux comparer deux regions : laquelle est la plus peuplee par rapport a sa surface ? Tu calcules la...', answer: 'le nombre d\'habitants par km²', options: ['la surface d\'un pays', 'le nombre d\'habitants par km²', 'la richesse d\'un pays', 'le nombre de villes'], xp: 10 },
      { id: 'g6e-3-5', type: 'choice', question: 'Tu survoles l\'Amazonie en avion et tu ne vois que de la foret a perte de vue, presque aucun village. Pourquoi est-elle si peu peuplee ?', answer: 'la foret dense et le climat equatorial', options: ['le froid extreme', 'la foret dense et le climat equatorial', 'les guerres', 'le manque d\'eau'], xp: 15 },,
      { id: 'g6e-3-fb1', type: 'fill-blank', question: 'Complete la phrase !', sentence: 'Les pays les plus pauvres sont souvent appeles pays en voie de ___.', blanks: ['developpement'], wordBank: ['developpement', 'construction', 'evolution', 'modernisation'], xp: 15 },
      { id: 'g6e-3-o1', type: 'ordering', question: 'Remets ces indicateurs du plus bas au plus eleve pour un pays developpe !', items: ['Taux de mortalite infantile', 'Taux de natalite', 'Taux d\'alphabetisation', 'Esperance de vie', 'IDH (indice de developpement)'], correctOrder: [0, 1, 2, 3, 4], xp: 20 }
    ],
  },
  {
    id: 'geo-6e-4', grade: '6eme', minLevel: 1,
    name: '6eme - Habiter un espace agricole',
    nameMinecraft: 'Biomes - Agriculture', nameLalilo: 'Saisons - Agriculture',
    description: 'L\'agriculture dans le monde',
    exercises: [
      { id: 'g6e-4-1', type: 'choice', question: 'Tu rencontres un paysan qui cultive juste assez pour nourrir sa famille. Ce type d\'agriculture s\'appelle...', answer: 'nourrir la famille du paysan', options: ['exporter a l\'etranger', 'nourrir la famille du paysan', 'produire des biocarburants', 'faire du commerce'], xp: 15 },
      { id: 'g6e-4-2', type: 'choice', question: 'Tu visites une enorme exploitation agricole qui vend ses recoltes dans le monde entier. Cette agriculture commerciale vise a...', answer: 'vendre la production sur les marches', options: ['nourrir la famille', 'vendre la production sur les marches', 'ne rien produire', 'proteger la nature'], xp: 10 },
      { id: 'g6e-4-3', type: 'choice', question: 'Tu voyages en Asie et dans chaque repas tu retrouves le meme aliment de base. Lequel ?', answer: 'Asie', options: ['Europe', 'Asie', 'Amerique du Nord', 'Afrique du Nord'], xp: 10 },
      { id: 'g6e-4-4', type: 'choice', question: 'Tu visites une ferme bio et tu remarques qu\'il n\'y a aucun produit chimique. L\'agriculture biologique refuse...', answer: 'les pesticides et engrais chimiques', options: ['l\'eau', 'les pesticides et engrais chimiques', 'les tracteurs', 'la vente'], xp: 15 },
      { id: 'g6e-4-5', type: 'choice', question: 'Tu survoles l\'Amazonie et tu vois des hectares de foret bruler pour faire place a des fermes. La deforestation ici est liee a quoi ?', answer: 'l\'elevage de bovins et la culture du soja', options: ['le tourisme', 'l\'elevage de bovins et la culture du soja', 'la construction de villes', 'les mines d\'or uniquement'], xp: 20 },,
      { id: 'g6e-4-m1', type: 'matching', question: 'Relie chaque secteur economique a ses activites !', pairs: [{ left: 'Primaire', right: 'Agriculture et peche' }, { left: 'Secondaire', right: 'Industrie et construction' }, { left: 'Tertiaire', right: 'Services et commerce' }, { left: 'Quaternaire', right: 'Recherche et numerique' }], xp: 20 },
      { id: 'g6e-4-mm1', type: 'memory', question: 'Retrouve les paires : ressources et pays producteurs !', pairs: [{ left: 'Petrole', right: 'Arabie saoudite' }, { left: 'Diamants', right: 'Afrique du Sud' }, { left: 'Riz', right: 'Chine' }, { left: 'Cafe', right: 'Bresil' }], xp: 15 }
    ],
  },
  {
    id: 'geo-6e-5', grade: '6eme', minLevel: 1,
    name: '6eme - Habiter un littoral',
    nameMinecraft: 'Biomes - Littoral', nameLalilo: 'Saisons - Littoral',
    description: 'Littoraux industriels et touristiques',
    exercises: [
      { id: 'g6e-5-1', type: 'choice', question: 'Tu marches sur la plage, les pieds dans l\'eau et le regard vers la terre. Tu es exactement sur un...', answer: 'la zone de contact entre la terre et la mer', options: ['une montagne', 'la zone de contact entre la terre et la mer', 'un fleuve', 'un desert'], xp: 10 },
      { id: 'g6e-5-2', type: 'choice', question: 'Tu explores un littoral avec d\'enormes grues, des conteneurs et des navires. C\'est un littoral industriel ! Il concentre...', answer: 'des ports, des usines et des zones de commerce', options: ['des plages de sable', 'des ports, des usines et des zones de commerce', 'des forets', 'des deserts'], xp: 15 },
      { id: 'g6e-5-3', type: 'choice', question: 'Tu arrives sur un autre littoral, tout different : des hotels, des restaurants et des activites nautiques. C\'est un littoral amenage pour...', answer: 'des hotels, restaurants et activites de loisirs', options: ['des usines', 'des hotels, restaurants et activites de loisirs', 'des mines', 'des autoroutes'], xp: 10 },
      { id: 'g6e-5-4', type: 'choice', question: 'ALERTE : le niveau de la mer monte et menace les habitations cotieres ! Quelle est la cause de cette montee des eaux ?', answer: 'du rechauffement climatique', options: ['de la Lune', 'du rechauffement climatique', 'des bateaux', 'de la pollution sonore'], xp: 15 },
      { id: 'g6e-5-5', type: 'choice', question: 'Tu remarques que de plus en plus de gens s\'installent sur les cotes. Ce phenomene de concentration sur les littoraux s\'appelle...', answer: 'la concentration des populations et activites sur les cotes', options: ['la disparition des cotes', 'la concentration des populations et activites sur les cotes', 'la construction de phares', 'la protection des plages'], xp: 20 },,
      { id: 'g6e-5-fb1', type: 'fill-blank', question: 'Complete la phrase !', sentence: 'Le rechauffement ___ est cause par les emissions de gaz a effet de serre.', blanks: ['climatique'], wordBank: ['climatique', 'solaire', 'terrestre', 'mondial'], xp: 15 },
      { id: 'g6e-5-m1', type: 'matching', question: 'Relie chaque probleme environnemental a sa cause !', pairs: [{ left: 'Deforestation', right: 'Agriculture intensive' }, { left: 'Pollution des oceans', right: 'Plastique et dechets' }, { left: 'Rechauffement climatique', right: 'Gaz a effet de serre' }, { left: 'Extinction d\'especes', right: 'Destruction des habitats' }], xp: 15 }
    ],
  },

  // ─── 5eme ────────────────────────────────────────────────────
  {
    id: 'geo-5e-1', grade: '5eme', minLevel: 1,
    name: '5eme - Croissance demographique',
    nameMinecraft: 'Megapoles - Demographie', nameLalilo: 'Cite - Demographie',
    description: 'La population mondiale et sa croissance',
    exercises: [
      { id: 'g5e-1-1', type: 'choice', question: 'Tu regardes le compteur de population mondiale en direct. Combien d\'humains partagent la Terre avec toi (environ) ?', answer: 'Plus de 8 milliards', options: ['3 milliards', '5 milliards', 'Plus de 8 milliards', '12 milliards'], xp: 10 },
      { id: 'g5e-1-2', type: 'choice', question: 'Tu etudies comment les pays passent d\'une population qui nait et meurt beaucoup a une population stable. Ce passage s\'appelle la transition demographique. C\'est quoi exactement ?', answer: 'd\'une forte natalite/mortalite a une faible natalite/mortalite', options: ['d\'un pays a un autre', 'd\'une forte natalite/mortalite a une faible natalite/mortalite', 'de la ville a la campagne', 'du Nord au Sud'], xp: 20 },
      { id: 'g5e-1-3', type: 'choice', question: 'Tu analyses les courbes de population par continent. Sur lequel la population augmente-t-elle le plus vite ?', answer: 'l\'Afrique', options: ['l\'Europe', 'l\'Asie', 'l\'Afrique', 'l\'Amerique'], xp: 15 },
      { id: 'g5e-1-4', type: 'choice', question: 'Tu visites l\'Europe et tu remarques beaucoup de personnes agees et peu de bebes. Que se passe-t-il en Europe ?', answer: 'vieillit et augmente peu', options: ['augmente tres vite', 'vieillit et augmente peu', 'diminue rapidement', 'est tres jeune'], xp: 15 },
      { id: 'g5e-1-5', type: 'choice', question: 'Tu compares deux pays : dans l\'un les gens vivent jusqu\'a 80 ans, dans l\'autre jusqu\'a 55 ans. Tu mesures quoi exactement ?', answer: 'le nombre moyen d\'annees qu\'une personne peut vivre', options: ['le nombre d\'enfants', 'le nombre moyen d\'annees qu\'une personne peut vivre', 'la richesse d\'un pays', 'la taille d\'un pays'], xp: 10 },,
      { id: 'g5e-1-m1', type: 'matching', question: 'Relie chaque ressource naturelle a son type !', pairs: [{ left: 'Petrole', right: 'Energie fossile' }, { left: 'Soleil', right: 'Energie renouvelable' }, { left: 'Forets', right: 'Ressource biologique' }, { left: 'Eau douce', right: 'Ressource vitale limitee' }], xp: 15 },
      { id: 'g5e-1-fb1', type: 'fill-blank', question: 'Complete la phrase !', sentence: 'L\'eau douce ne represente que ___% de toute l\'eau sur Terre.', blanks: ['3'], wordBank: ['3', '30', '50', '75'], xp: 15 }
    ],
  },
  {
    id: 'geo-5e-2', grade: '5eme', minLevel: 1,
    name: '5eme - Richesse et pauvrete',
    nameMinecraft: 'Megapoles - Inegalites', nameLalilo: 'Cite - Inegalites',
    description: 'Les inegalites de richesse dans le monde',
    exercises: [
      { id: 'g5e-2-1', type: 'choice', question: 'Tu voyages entre un pays tres riche et un pays tres pauvre. Quelle est la vraie difference entre un pays developpe et un pays en developpement ?', answer: 'Le niveau de richesse, de sante et d\'education de la population', options: ['La taille du pays', 'Le niveau de richesse, de sante et d\'education de la population', 'Le nombre de monuments', 'Le climat'], xp: 15 },
      { id: 'g5e-2-2', type: 'choice', question: 'Tu decouvres un indicateur magique qui mesure le bien-etre d\'un pays : l\'IDH. Que prend-il en compte ?', answer: 'la sante, l\'education et le niveau de vie', options: ['la superficie', 'la sante, l\'education et le niveau de vie', 'le PIB uniquement', 'la population'], xp: 15 },
      { id: 'g5e-2-3', type: 'choice', question: 'Tu enquetes sur la pauvrete dans le monde. Quelle proportion de la population mondiale vit dans l\'extreme pauvrete ?', answer: '10% de la population mondiale (extreme pauvrete)', options: ['personne', '10% de la population mondiale (extreme pauvrete)', '90% de la population', 'uniquement l\'Afrique'], xp: 15 },
      { id: 'g5e-2-4', type: 'choice', question: 'Tu decouvres que des pays riches envoient de l\'aide aux pays pauvres. Cette aide au developpement vise a...', answer: 'aider les pays pauvres a ameliorer les conditions de vie', options: ['enrichir les pays riches', 'aider les pays pauvres a ameliorer les conditions de vie', 'construire des armes', 'reduire la population'], xp: 10 },
      { id: 'g5e-2-5', type: 'choice', question: 'Tu colories sur une carte les pays les plus riches du monde. Dans quelles regions du globe concentres-tu tes couleurs ?', answer: 'en Amerique du Nord, Europe et Asie de l\'Est', options: ['en Afrique', 'en Amerique du Nord, Europe et Asie de l\'Est', 'en Amerique du Sud', 'en Oceanie uniquement'], xp: 15 },,
      { id: 'g5e-2-mm1', type: 'memory', question: 'Retrouve les paires : la mondialisation !', pairs: [{ left: 'Made in China', right: 'Delocalisation' }, { left: 'Internet', right: 'Communication mondiale' }, { left: 'Conteneur', right: 'Transport maritime' }, { left: 'Multinationale', right: 'Entreprise mondiale' }], xp: 15 },
      { id: 'g5e-2-m1', type: 'matching', question: 'Relie chaque flux de la mondialisation a son exemple !', pairs: [{ left: 'Flux de marchandises', right: 'Conteneurs sur les oceans' }, { left: 'Flux financiers', right: 'Bourses et investissements' }, { left: 'Flux d\'informations', right: 'Internet et reseaux sociaux' }, { left: 'Flux de personnes', right: 'Tourisme et migrations' }], xp: 20 }
    ],
  },
  {
    id: 'geo-5e-3', grade: '5eme', minLevel: 1,
    name: '5eme - L\'eau dans le monde',
    nameMinecraft: 'Megapoles - Eau', nameLalilo: 'Cite - Eau',
    description: 'L\'eau, une ressource inegalement repartie',
    exercises: [
      { id: 'g5e-3-1', type: 'choice', question: 'Tu es nomme "ambassadeur de l\'eau" et tu dois expliquer pourquoi l\'eau est un enjeu majeur. Que reponds-tu ?', answer: 'L\'eau douce est rare et inegalement repartie', options: ['Il y a trop d\'eau sur Terre', 'L\'eau douce est rare et inegalement repartie', 'L\'eau n\'est pas importante', 'Tous les pays ont assez d\'eau'], xp: 20 },
      { id: 'g5e-3-2', type: 'choice', question: 'Tu regardes la Terre depuis l\'espace : elle est toute bleue ! Mais quel pourcentage de cette eau est de l\'eau douce utilisable ?', answer: 'Environ 3%', options: ['50%', 'Environ 3%', '25%', '10%'], xp: 15 },
      { id: 'g5e-3-3', type: 'choice', question: 'Tu decouvres que des pays se disputent a cause de l\'eau. Ces conflits concernent souvent...', answer: 'le partage de fleuves entre pays voisins', options: ['les oceans', 'le partage de fleuves entre pays voisins', 'les glaciers', 'les piscines'], xp: 15 },
      { id: 'g5e-3-4', type: 'choice', question: 'Tu visites une usine au bord de la mer qui transforme l\'eau salee en eau potable. Ce procede de dessalement permet...', answer: 'de produire de l\'eau douce a partir de l\'eau salee', options: ['de rendre l\'eau plus salee', 'de produire de l\'eau douce a partir de l\'eau salee', 'de chauffer l\'eau', 'de colorer l\'eau'], xp: 15 },
      { id: 'g5e-3-5', type: 'choice', question: 'Tu prepares un expose sur l\'acces a l\'eau potable. Combien de personnes dans le monde n\'y ont pas acces ?', answer: 'Environ 2 milliards', options: ['Quelques milliers', 'Environ 2 milliards', 'La moitie de l\'humanite', 'Personne'], xp: 15 },,
      { id: 'g5e-3-fb1', type: 'fill-blank', question: 'Complete la phrase !', sentence: 'Le developpement ___ vise a repondre aux besoins du present sans compromettre ceux du futur.', blanks: ['durable'], wordBank: ['durable', 'rapide', 'economique', 'industriel'], xp: 15 },
      { id: 'g5e-3-o1', type: 'ordering', question: 'Remets les etapes du cycle de l\'eau dans l\'ordre !', items: ['Evaporation des oceans', 'Formation des nuages', 'Precipitations (pluie/neige)', 'Ruissellement vers les rivieres', 'Retour a l\'ocean'], correctOrder: [0, 1, 2, 3, 4], xp: 15 }
    ],
  },
  {
    id: 'geo-5e-4', grade: '5eme', minLevel: 1,
    name: '5eme - Energie et changement climatique',
    nameMinecraft: 'Megapoles - Energie', nameLalilo: 'Cite - Energie',
    description: 'Les sources d\'energie et le defi climatique',
    exercises: [
      { id: 'g5e-4-1', type: 'choice', question: 'Tu descends dans une mine et tu trouves du charbon, du petrole et du gaz. Ces energies tirees du sol s\'appellent les energies...', answer: 'petrole, charbon, gaz naturel', options: ['soleil, vent, eau', 'petrole, charbon, gaz naturel', 'nucleaire uniquement', 'bois et biomasse'], xp: 10 },
      { id: 'g5e-4-2', type: 'choice', question: 'Tu remarques que la temperature moyenne de la Terre augmente. Le rechauffement climatique est cause par...', answer: 'l\'augmentation des gaz a effet de serre (CO2)', options: ['le trou dans la couche d\'ozone', 'l\'augmentation des gaz a effet de serre (CO2)', 'le Soleil uniquement', 'les volcans'], xp: 15 },
      { id: 'g5e-4-3', type: 'choice', question: 'Tu visites un parc d\'eoliennes et de panneaux solaires. Ces energies qui ne s\'epuisent pas s\'appellent les energies...', answer: 'solaire, eolienne, hydraulique, geothermique', options: ['petrole et charbon', 'solaire, eolienne, hydraulique, geothermique', 'nucleaire', 'gaz naturel'], xp: 10 },
      { id: 'g5e-4-4', type: 'choice', question: 'Tu assistes a la conference de Paris en 2015 ou les dirigeants du monde signent un accord historique. Il vise a...', answer: 'limiter le rechauffement climatique a 1,5-2°C', options: ['augmenter la production de petrole', 'limiter le rechauffement climatique a 1,5-2°C', 'interdire les voitures', 'construire des centrales nucleaires'], xp: 20 },
      { id: 'g5e-4-5', type: 'choice', question: 'Tu consultes le classement des plus gros pollueurs de la planete. Quels pays emettent le plus de CO2 ?', answer: 'la Chine, les Etats-Unis, l\'Inde', options: ['la France et l\'Allemagne', 'la Chine, les Etats-Unis, l\'Inde', 'le Bresil et l\'Australie', 'le Japon et le Canada'], xp: 15 },,
      { id: 'g5e-4-m1', type: 'matching', question: 'Relie chaque defi alimentaire a sa region du monde !', pairs: [{ left: 'Famines recurrentes', right: 'Afrique subsaharienne' }, { left: 'Surproduction agricole', right: 'Amerique du Nord' }, { left: 'Riziculture intensive', right: 'Asie du Sud-Est' }, { left: 'Agriculture biologique', right: 'Europe occidentale' }], xp: 20 },
      { id: 'g5e-4-mm1', type: 'memory', question: 'Retrouve les paires : alimentation et geographie !', pairs: [{ left: 'Ble', right: 'Europe et Amerique' }, { left: 'Riz', right: 'Asie' }, { left: 'Mais', right: 'Amerique latine' }, { left: 'Manioc', right: 'Afrique' }], xp: 15 }
    ],
  },
  {
    id: 'geo-5e-5', grade: '5eme', minLevel: 1,
    name: '5eme - Risques et nourrir l\'humanite',
    nameMinecraft: 'Megapoles - Risques', nameLalilo: 'Cite - Risques',
    description: 'Risques naturels, securite alimentaire',
    exercises: [
      { id: 'g5e-5-1', type: 'choice', question: 'La terre tremble sous tes pieds ! Tu vis un risque naturel. C\'est quoi exactement ?', answer: 'Un evenement naturel dangereux (seisme, inondation, cyclone...)', options: ['Un sport extreme', 'Un evenement naturel dangereux (seisme, inondation, cyclone...)', 'Un animal sauvage', 'Une maladie'], xp: 15 },
      { id: 'g5e-5-2', type: 'choice', question: 'Tu compares deux pays frappes par le meme seisme : l\'un s\'en sort bien, l\'autre est devaste. Lesquels sont les plus vulnerables ?', answer: 'les pays pauvres (moins de moyens de prevention)', options: ['les pays riches', 'les pays pauvres (moins de moyens de prevention)', 'les petits pays', 'les iles uniquement'], xp: 15 },
      { id: 'g5e-5-3', type: 'choice', question: 'Mission planete : tu dois trouver comment nourrir 8 milliards d\'humains sans detruire la Terre. Quelle est la solution ?', answer: 'Agriculture raisonnee, moins de gaspillage, circuits courts', options: ['Augmenter les pesticides', 'Agriculture raisonnee, moins de gaspillage, circuits courts', 'Importer toute la nourriture', 'Manger moins'], xp: 20 },
      { id: 'g5e-5-4', type: 'choice', question: 'Tu entends parler de "securite alimentaire" aux informations. C\'est quand...', answer: 'tout le monde a acces a une nourriture suffisante et saine', options: ['il y a beaucoup de supermarches', 'tout le monde a acces a une nourriture suffisante et saine', 'la nourriture est chere', 'on produit trop de nourriture'], xp: 15 },
      { id: 'g5e-5-5', type: 'choice', question: 'Tu decouvres qu\'on jette une quantite enorme de nourriture chaque annee. Le gaspillage alimentaire dans le monde represente environ...', answer: 'un tiers de la production alimentaire', options: ['presque rien', 'un tiers de la production alimentaire', 'la moitie', 'la totalite'], xp: 15 },,
      { id: 'g5e-5-fb1', type: 'fill-blank', question: 'Complete la phrase !', sentence: 'Les energies ___ comme le solaire et l\'eolien ne s\'epuisent pas.', blanks: ['renouvelables'], wordBank: ['renouvelables', 'fossiles', 'nucleaires', 'chimiques'], xp: 15 },
      { id: 'g5e-5-m1', type: 'matching', question: 'Relie chaque energie a son type !', pairs: [{ left: 'Petrole', right: 'Fossile et polluante' }, { left: 'Eolien', right: 'Renouvelable (vent)' }, { left: 'Solaire', right: 'Renouvelable (soleil)' }, { left: 'Nucleaire', right: 'Puissante mais risquee' }], xp: 15 }
    ],
  },
]
