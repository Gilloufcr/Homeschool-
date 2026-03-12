// ═══════════════════════════════════════════════════════════════
// HISTOIRE — Multiples chapitres par niveau scolaire
// Chaque grade (CE2→5eme) a 5 niveaux thematiques
// ═══════════════════════════════════════════════════════════════

export const historyLevels = [
  // ─── CE2 ─────────────────────────────────────────────────────
  {
    id: 'hist-ce2-1', grade: 'CE2', minLevel: 1,
    name: 'CE2 - Frise chronologique',
    nameMinecraft: 'Mine du Temps - Frise', nameLalilo: 'Voyage - Frise',
    description: 'Se reperer dans le temps, siecles et millenaires',
    exercises: [
      { id: 'hce2-1-1', type: 'choice', question: 'Tu voyages dans le temps ! Combien d\'annees dois-tu reculer pour remonter exactement un siecle ?', answer: '100 ans', options: ['10 ans', '100 ans', '1000 ans', '50 ans'], xp: 10 },
      { id: 'hce2-1-2', type: 'choice', question: 'Ta machine a remonter le temps affiche "1 millenaire". Ca represente combien d\'annees de voyage ?', answer: '1 000 ans', options: ['100 ans', '500 ans', '1 000 ans', '10 000 ans'], xp: 10 },
      { id: 'hce2-1-3', type: 'choice', question: 'Tu deroules une frise chronologique geante au sol. De quel cote dois-tu aller pour trouver le passe ?', answer: 'A gauche', options: ['A gauche', 'A droite', 'En haut', 'En bas'], xp: 10 },
      { id: 'hce2-1-4', type: 'choice', question: 'Ta machine a voyager dans le temps affiche "XXIe siecle". C\'est bien notre epoque actuelle ?', answer: 'Le XXIe siecle (21e)', options: ['Le XXe siecle (20e)', 'Le XXIe siecle (21e)', 'Le XIXe siecle (19e)', 'Le XXIIe siecle (22e)'], xp: 10 },
      { id: 'hce2-1-5', type: 'choice', question: 'Tu atterris en 1515, juste a temps pour la bataille de Marignan ! Tu es dans quel siecle ?', answer: 'Le XVIe siecle (16e)', options: ['Le XVe siecle (15e)', 'Le XVIe siecle (16e)', 'Le XVIIe siecle (17e)', 'Le XIVe siecle (14e)'], xp: 15 },
      { id: 'hce2-1-o1', type: 'ordering', question: 'Remets les grandes periodes dans l\'ordre chronologique !', items: ['Prehistoire', 'Antiquite', 'Moyen Age', 'Temps modernes', 'Epoque contemporaine'], correctOrder: [0, 1, 2, 3, 4], xp: 15 },
      { id: 'hce2-1-m1', type: 'matching', question: 'Relie chaque periode a un evenement celebre !', pairs: [{ left: 'Prehistoire', right: 'Peintures de Lascaux' }, { left: 'Antiquite', right: 'Construction des pyramides' }, { left: 'Moyen Age', right: 'Les chevaliers et chateaux forts' }, { left: 'Temps modernes', right: 'Decouverte de l\'Amerique' }], xp: 15 },
    ],
  },
  {
    id: 'hist-ce2-2', grade: 'CE2', minLevel: 1,
    name: 'CE2 - Les grandes periodes',
    nameMinecraft: 'Mine du Temps - Periodes', nameLalilo: 'Voyage - Periodes',
    description: 'Les 4 grandes periodes de l\'histoire',
    exercises: [
      { id: 'hce2-2-1', type: 'choice', question: 'Tu dois traverser toutes les grandes periodes de l\'histoire dans ta machine a voyager. Combien d\'arrets dois-tu faire ?', answer: '4 (Antiquite, Moyen Age, Temps modernes, Epoque contemporaine)', options: ['2 (Avant et apres)', '4 (Antiquite, Moyen Age, Temps modernes, Epoque contemporaine)', '6 periodes', '3 periodes'], xp: 10 },
      { id: 'hce2-2-2', type: 'choice', question: 'Alerte detective ! Tu cherches l\'evenement qui a mis fin a la Prehistoire. Quel est le coupable ?', answer: 'L\'invention de l\'ecriture', options: ['La decouverte du feu', 'L\'invention de l\'ecriture', 'La construction des pyramides', 'L\'apparition de l\'Homme'], xp: 15 },
      { id: 'hce2-2-3', type: 'choice', question: 'Tu quittes l\'Antiquite dans ta machine temporelle. Dans quelle periode atterris-tu juste apres ?', answer: 'Le Moyen Age', options: ['La Prehistoire', 'Le Moyen Age', 'Les Temps modernes', 'L\'Epoque contemporaine'], xp: 10 },
      { id: 'hce2-2-4', type: 'choice', question: 'Mission : retrouver l\'evenement qui a lance l\'Antiquite ! Quel est-il ?', answer: 'L\'invention de l\'ecriture (vers -3300)', options: ['La chute de Rome', 'L\'invention de l\'ecriture (vers -3300)', 'La Revolution francaise', 'La naissance de Jesus'], xp: 15 },
      { id: 'hce2-2-5', type: 'choice', question: 'Tu dois programmer ta machine pour atterrir pile au debut de l\'Epoque contemporaine. Quel evenement dois-tu viser ?', answer: 'La Revolution francaise (1789)', options: ['La decouverte de l\'Amerique', 'La Revolution francaise (1789)', 'La Premiere Guerre mondiale', 'La Renaissance'], xp: 15 },,
      { id: 'hce2-2-m1', type: 'matching', question: 'Relie chaque grande periode a ce qui la termine !', pairs: [{ left: 'Prehistoire', right: 'Invention de l\'ecriture' }, { left: 'Antiquite', right: 'Chute de Rome (476)' }, { left: 'Moyen Age', right: 'Decouverte de l\'Amerique (1492)' }, { left: 'Temps modernes', right: 'Revolution francaise (1789)' }], xp: 15 },
      { id: 'hce2-2-fb1', type: 'fill-blank', question: 'Complete avec le bon mot !', sentence: 'La ___ est la periode la plus longue de l\'histoire humaine.', blanks: ['Prehistoire'], wordBank: ['Prehistoire', 'Antiquite', 'Moyen Age', 'Renaissance'], xp: 15 }
    ],
  },
  {
    id: 'hist-ce2-3', grade: 'CE2', minLevel: 1,
    name: 'CE2 - Traces du passe',
    nameMinecraft: 'Mine du Temps - Traces', nameLalilo: 'Voyage - Traces',
    description: 'Monuments, documents et patrimoine',
    exercises: [
      { id: 'hce2-3-1', type: 'choice', question: 'Tu es detective du passe et tu cherches des "traces" laissees par les anciens. Quel monument ancien pourrais-tu examiner ?', answer: 'Les arenes de Nimes', options: ['La Tour Eiffel', 'Les arenes de Nimes', 'Le Stade de France', 'Le metro de Paris'], xp: 15 },
      { id: 'hce2-3-2', type: 'choice', question: 'Ton chef detective te demande : pourquoi etudier les traces du passe ? Que lui reponds-tu ?', answer: 'A connaitre l\'histoire des hommes avant nous', options: ['A rien', 'A connaitre l\'histoire des hommes avant nous', 'A decorer les villes', 'A faire du tourisme uniquement'], xp: 10 },
      { id: 'hce2-3-3', type: 'choice', question: 'Tu explores les grottes de Lascaux avec ta lampe torche. Que decouvres-tu sur les murs ?', answer: 'des peintures prehistoriques', options: ['des statues romaines', 'des peintures prehistoriques', 'des tresors medievaux', 'des fossiles de dinosaures'], xp: 15 },
      { id: 'hce2-3-4', type: 'choice', question: 'Tu rencontres un specialiste qui creuse la terre avec des pinceaux pour trouver des objets anciens. C\'est un...', answer: 'fouille le sol pour trouver des objets du passe', options: ['etudie les etoiles', 'fouille le sol pour trouver des objets du passe', 'dessine des cartes', 'ecrit des romans'], xp: 10 },
      { id: 'hce2-3-5', type: 'choice', question: 'Ton guide du musee te parle du "patrimoine". Il s\'agit de quoi exactement ?', answer: 'l\'ensemble des richesses heritees du passe', options: ['l\'argent de la famille', 'l\'ensemble des richesses heritees du passe', 'les animaux d\'un pays', 'les forets protegees'], xp: 15 },,
      { id: 'hce2-3-o1', type: 'ordering', question: 'Remets ces traces du passe de la plus ancienne a la plus recente !', items: ['Peintures de Lascaux', 'Arenes de Nimes', 'Chateau fort medieval', 'Cathedrale Notre-Dame', 'Tour Eiffel'], correctOrder: [0, 1, 2, 3, 4], xp: 15 },
      { id: 'hce2-3-mm1', type: 'memory', question: 'Retrouve les paires : chaque trace du passe et son epoque !', pairs: [{ left: 'Grotte de Lascaux', right: 'Prehistoire' }, { left: 'Arenes', right: 'Antiquite' }, { left: 'Chateau fort', right: 'Moyen Age' }, { left: 'Tour Eiffel', right: 'Epoque contemporaine' }], xp: 15 }
    ],
  },
  {
    id: 'hist-ce2-4', grade: 'CE2', minLevel: 1,
    name: 'CE2 - Prehistoire',
    nameMinecraft: 'Mine du Temps - Prehistoire', nameLalilo: 'Voyage - Prehistoire',
    description: 'Les premiers hommes, le feu, l\'agriculture',
    exercises: [
      { id: 'hce2-4-1', type: 'choice', question: 'Tu debarques a la Prehistoire et tu vois des humains qui se deplacent sans arret pour trouver de la nourriture. Ils sont donc...', answer: 'nomades (ils se deplacaient)', options: ['sedentaires (ils restaient au meme endroit)', 'nomades (ils se deplacaient)', 'des agriculteurs', 'des batisseurs de villes'], xp: 10 },
      { id: 'hce2-4-2', type: 'choice', question: 'La nuit tombe a la Prehistoire et tu as froid. Quelle grande decouverte va te sauver en permettant aussi de cuire les aliments ?', answer: 'Le feu', options: ['La roue', 'Le feu', 'L\'electricite', 'Le fer'], xp: 10 },
      { id: 'hce2-4-3', type: 'choice', question: 'Un homme prehistorique te montre son tout premier outil. En quoi est-il fabrique ?', answer: 'pierre taillee', options: ['fer', 'pierre taillee', 'bois uniquement', 'plastique'], xp: 10 },
      { id: 'hce2-4-4', type: 'choice', question: 'Flash info depuis la Prehistoire : les humains viennent d\'inventer l\'agriculture ! Qu\'est-ce que ca va changer pour eux ?', answer: 'se sedentariser et creer des villages', options: ['voyager plus loin', 'se sedentariser et creer des villages', 'chasser plus d\'animaux', 'naviguer sur les mers'], xp: 15 },
      { id: 'hce2-4-5', type: 'choice', question: 'Tu braques ta lampe torche dans la grotte de Lascaux. Les peintures sur les murs representent surtout...', answer: 'des animaux (chevaux, bisons, cerfs)', options: ['des maisons', 'des animaux (chevaux, bisons, cerfs)', 'des guerres', 'des paysages'], xp: 15 },,
      { id: 'hce2-4-m1', type: 'matching', question: 'Relie chaque invention de la Prehistoire a son utilite !', pairs: [{ left: 'Le feu', right: 'Se rechauffer et cuire' }, { left: 'La pierre taillee', right: 'Couper et chasser' }, { left: 'L\'agriculture', right: 'Cultiver la nourriture' }, { left: 'La poterie', right: 'Stocker les aliments' }], xp: 15 },
      { id: 'hce2-4-fb1', type: 'fill-blank', question: 'Complete la phrase !', sentence: 'Les hommes prehistoriques sont devenus ___ quand ils ont invente l\'agriculture.', blanks: ['sedentaires'], wordBank: ['sedentaires', 'nomades', 'guerriers', 'artistes'], xp: 15 }
    ],
  },
  {
    id: 'hist-ce2-5', grade: 'CE2', minLevel: 1,
    name: 'CE2 - Memoire et commemoration',
    nameMinecraft: 'Mine du Temps - Memoire', nameLalilo: 'Voyage - Memoire',
    description: 'Fetes nationales et jours feries historiques',
    exercises: [
      { id: 'hce2-5-1', type: 'choice', question: 'FLASH INFO depuis le passe : le peuple de Paris prend une celebre prison le 14 juillet ! Quel evenement commemorons-nous ce jour-la ?', answer: 'la prise de la Bastille (1789)', options: ['la fin de la guerre', 'la prise de la Bastille (1789)', 'Noel', 'la fete du travail'], xp: 10 },
      { id: 'hce2-5-2', type: 'choice', question: 'Tu voyages au 11 novembre et tout le monde se recueille. Quel evenement cette date rappelle-t-elle ?', answer: 'l\'armistice de 1918 (fin de la 1ere Guerre mondiale)', options: ['la prise de la Bastille', 'l\'armistice de 1918 (fin de la 1ere Guerre mondiale)', 'le debut de la Revolution', 'la fete nationale'], xp: 15 },
      { id: 'hce2-5-3', type: 'choice', question: 'Ta machine a voyager dans le temps s\'arrete le 8 mai. Les cloches sonnent partout en France. Que celebre-t-on ?', answer: 'la fin de la 2e Guerre mondiale (1945)', options: ['le 1er mai', 'la fin de la 2e Guerre mondiale (1945)', 'la fete des meres', 'la fete de la musique'], xp: 15 },
      { id: 'hce2-5-4', type: 'choice', question: 'Ton ami te demande : "Pourquoi on se souvient de ces vieux evenements ?" Que lui reponds-tu ?', answer: 'Pour se souvenir et ne pas oublier le passe', options: ['Pour avoir des jours feries', 'Pour se souvenir et ne pas oublier le passe', 'Pour faire la fete', 'Pour ne pas aller a l\'ecole'], xp: 10 },
      { id: 'hce2-5-5', type: 'choice', question: 'Tu passes devant un grand monument avec des noms graves dessus, dans le centre du village. A quoi sert ce monument aux morts ?', answer: 'honorer les soldats morts pour la France', options: ['decorer la ville', 'honorer les soldats morts pour la France', 'indiquer une direction', 'accueillir les touristes'], xp: 15 },,
      { id: 'hce2-5-o1', type: 'ordering', question: 'Remets ces dates commemoratives dans l\'ordre chronologique !', items: ['Prise de la Bastille (1789)', 'Armistice 1918 (11 nov)', 'Fin 2e Guerre mondiale (8 mai 1945)', 'Fete nationale actuelle (14 juillet)'], correctOrder: [0, 1, 2, 3], xp: 15 },
      { id: 'hce2-5-m1', type: 'matching', question: 'Relie chaque date a l\'evenement qu\'elle commemore !', pairs: [{ left: '14 juillet', right: 'Prise de la Bastille' }, { left: '11 novembre', right: 'Armistice de 1918' }, { left: '8 mai', right: 'Fin de la 2e Guerre mondiale' }, { left: '1er mai', right: 'Fete du travail' }], xp: 15 }
    ],
  },

  // ─── CM1 ─────────────────────────────────────────────────────
  {
    id: 'hist-cm1-1', grade: 'CM1', minLevel: 1,
    name: 'CM1 - Revolution neolithique',
    nameMinecraft: 'Temple - Neolithique', nameLalilo: 'Royaume - Neolithique',
    description: 'L\'agriculture, l\'elevage et la sedentarisation',
    exercises: [
      { id: 'hcm1-1-1', type: 'choice', question: 'Tu debarques au Neolithique et tout a change ! Les gens cultivent la terre et elevent des animaux. Comment appelle-t-on cette grande revolution ?', answer: 'La revolution neolithique (agriculture et elevage)', options: ['La revolution industrielle', 'La revolution neolithique (agriculture et elevage)', 'La revolution francaise', 'La revolution numerique'], xp: 15 },
      { id: 'hcm1-1-2', type: 'choice', question: 'Tu fouilles un campement neolithique et tu trouves des pots en terre et du tissu. Ce sont les premieres inventions du Neolithique ! Lesquelles ?', answer: 'la poterie et le tissage', options: ['l\'ecriture', 'la poterie et le tissage', 'l\'imprimerie', 'l\'electricite'], xp: 10 },
      { id: 'hcm1-1-3', type: 'choice', question: 'Tu decouvres d\'enormes pierres dressees par les hommes du Neolithique. Comment appelle-t-on ces monuments comme les dolmens et menhirs ?', answer: 'megalithiques (en grandes pierres)', options: ['romains', 'megalithiques (en grandes pierres)', 'medievaux', 'modernes'], xp: 15 },
      { id: 'hcm1-1-4', type: 'choice', question: 'Les gens que tu rencontres au Neolithique ne bougent plus comme avant. Ils se sont "sedentarises". Ca veut dire quoi ?', answer: 's\'installer durablement au meme endroit', options: ['voyager constamment', 's\'installer durablement au meme endroit', 'vivre dans des grottes', 'chasser les animaux'], xp: 10 },
      { id: 'hcm1-1-5', type: 'choice', question: 'Tu arrives dans un village neolithique et des animaux vivent avec les humains ! Quels ont ete les premiers animaux domestiques ?', answer: 'le chien, le mouton, la chevre', options: ['le chat et le perroquet', 'le chien, le mouton, la chevre', 'le cheval et le cochon uniquement', 'les poissons'], xp: 15 },,
      { id: 'hcm1-1-o1', type: 'ordering', question: 'Remets les etapes de la Prehistoire dans l\'ordre !', items: ['Vie nomade et chasse', 'Decouverte du feu', 'Invention des outils en pierre', 'Debut de l\'agriculture', 'Creation des premiers villages'], correctOrder: [0, 1, 2, 3, 4], xp: 15 },
      { id: 'hcm1-1-m1', type: 'matching', question: 'Relie chaque changement du Neolithique a sa consequence !', pairs: [{ left: 'Agriculture', right: 'On cultive la terre' }, { left: 'Elevage', right: 'On domestique les animaux' }, { left: 'Sedentarisation', right: 'On construit des villages' }, { left: 'Poterie', right: 'On stocke les aliments' }], xp: 15 }
    ],
  },
  {
    id: 'hist-cm1-2', grade: 'CM1', minLevel: 1,
    name: 'CM1 - Gaulois et Romains',
    nameMinecraft: 'Temple - Gaule', nameLalilo: 'Royaume - Gaule',
    description: 'Les Gaulois, la conquete romaine, la Gaule romaine',
    exercises: [
      { id: 'hcm1-2-1', type: 'choice', question: 'Tu te promenes en Gaule apres la conquete romaine. Les gens parlent latin et se baignent dans des thermes. Comment appelle-t-on cette nouvelle Gaule ?', answer: 'La Gaule romaine', options: ['La France', 'La Gaule romaine', 'L\'Empire gaulois', 'La Bretagne'], xp: 10 },
      { id: 'hcm1-2-2', type: 'choice', question: 'Tu voyages en Gaule romaine et tu vois des routes pavees, des thermes et des arenes partout. Qu\'est-ce que les Romains ont apporte ?', answer: 'Les routes, les thermes, les arenes, le latin', options: ['Les chateaux forts', 'Les routes, les thermes, les arenes, le latin', 'L\'imprimerie', 'Les cathedrales'], xp: 20 },
      { id: 'hcm1-2-3', type: 'choice', question: 'Tu debarques en 52 av. J.-C. et un chef gaulois resiste bravement a Jules Cesar a Alesia. Qui est-ce ?', answer: 'Vercingetorix', options: ['Clovis', 'Vercingetorix', 'Charlemagne', 'Asterix'], xp: 10 },
      { id: 'hcm1-2-4', type: 'choice', question: 'Tu assistes a la bataille d\'Alesia en direct ! En quelle annee ta machine temporelle t\'a-t-elle amene ?', answer: '52 avant J.-C.', options: ['100 apres J.-C.', '52 avant J.-C.', '476 apres J.-C.', '800 apres J.-C.'], xp: 15 },
      { id: 'hcm1-2-5', type: 'choice', question: 'Tu rencontres des Gaulois et tu es surpris : ce ne sont pas du tout des brutes ! En realite, ils sont...', answer: 'd\'excellents artisans et agriculteurs', options: ['des barbares sans culture', 'd\'excellents artisans et agriculteurs', 'des Romains', 'des nomades du desert'], xp: 15 },,
      { id: 'hcm1-2-m1', type: 'matching', question: 'Relie chaque personnage a son role dans l\'histoire gauloise !', pairs: [{ left: 'Vercingetorix', right: 'Chef gaulois a Alesia' }, { left: 'Jules Cesar', right: 'General romain conquerant' }, { left: 'Les druides', right: 'Pretres et savants gaulois' }, { left: 'Les legionnaires', right: 'Soldats romains' }], xp: 15 },
      { id: 'hcm1-2-fb1', type: 'fill-blank', question: 'Complete la phrase !', sentence: 'La bataille d\'Alesia a eu lieu en ___ avant J.-C.', blanks: ['52'], wordBank: ['52', '100', '476', '800'], xp: 15 }
    ],
  },
  {
    id: 'hist-cm1-3', grade: 'CM1', minLevel: 1,
    name: 'CM1 - Clovis et les Merovingiens',
    nameMinecraft: 'Temple - Clovis', nameLalilo: 'Royaume - Clovis',
    description: 'Les Francs, le bapteme de Clovis',
    exercises: [
      { id: 'hcm1-3-1', type: 'choice', question: 'Tu arrives a l\'epoque des Francs et tu vois un roi se faire baptiser. Qui est ce fameux Clovis ?', answer: 'Le premier roi des Francs converti au christianisme', options: ['Un empereur romain', 'Le premier roi des Francs converti au christianisme', 'Un chef gaulois', 'Un moine du Moyen Age'], xp: 15 },
      { id: 'hcm1-3-2', type: 'choice', question: 'Tu suis Clovis le jour de son bapteme. Dans quelle ville te retrouves-tu ?', answer: 'Reims', options: ['Paris', 'Reims', 'Rome', 'Lyon'], xp: 10 },
      { id: 'hcm1-3-3', type: 'choice', question: 'Un historien que tu croises dans le passe te dit que Clovis a fonde une dynastie. Comment s\'appelle-t-elle ?', answer: 'les Merovingiens', options: ['les Carolingiens', 'les Merovingiens', 'les Capetiens', 'les Bourbons'], xp: 15 },
      { id: 'hcm1-3-4', type: 'choice', question: 'Rome vient de tomber en 476 ! Tu observes la Gaule en plein chaos. Quel peuple va finir par dominer ?', answer: 'Les Francs', options: ['Les Romains', 'Les Francs', 'Les Grecs', 'Les Vikings'], xp: 15 },
      { id: 'hcm1-3-5', type: 'choice', question: 'Enquete historique : pourquoi le bapteme de Clovis est-il si important pour l\'avenir du royaume ?', answer: 'il unit le pouvoir royal et l\'Eglise', options: ['il met fin aux guerres', 'il unit le pouvoir royal et l\'Eglise', 'il cree la Republique', 'il invente l\'ecriture'], xp: 20 },,
      { id: 'hcm1-3-o1', type: 'ordering', question: 'Remets ces evenements des Francs dans l\'ordre !', items: ['Chute de Rome (476)', 'Clovis roi des Francs', 'Bapteme de Clovis a Reims', 'Dynastie des Merovingiens', 'Montee des Carolingiens'], correctOrder: [0, 1, 2, 3, 4], xp: 15 },
      { id: 'hcm1-3-mm1', type: 'memory', question: 'Retrouve les paires : rois et dynasties !', pairs: [{ left: 'Clovis', right: 'Merovingiens' }, { left: 'Charlemagne', right: 'Carolingiens' }, { left: 'Hugues Capet', right: 'Capetiens' }, { left: 'Louis XVI', right: 'Bourbons' }], xp: 15 }
    ],
  },
  {
    id: 'hist-cm1-4', grade: 'CM1', minLevel: 1,
    name: 'CM1 - Charlemagne',
    nameMinecraft: 'Temple - Charlemagne', nameLalilo: 'Royaume - Charlemagne',
    description: 'L\'Empire carolingien, les ecoles',
    exercises: [
      { id: 'hcm1-4-1', type: 'choice', question: 'Tu assistes a une ceremonie grandiose : Charlemagne est sacre empereur ! En quelle annee es-tu ?', answer: '800', options: ['500', '800', '1000', '1200'], xp: 15 },
      { id: 'hcm1-4-2', type: 'choice', question: 'Tu te promenes dans l\'empire de Charlemagne et tu vois des ecoles partout ! Qu\'a-t-il encourage ?', answer: 'la creation d\'ecoles dans tout l\'empire', options: ['les guerres uniquement', 'la creation d\'ecoles dans tout l\'empire', 'la construction de pyramides', 'l\'exploration maritime'], xp: 15 },
      { id: 'hcm1-4-3', type: 'choice', question: 'Tu rencontres un moine qui te parle de la famille royale de Charlemagne. Comment s\'appelle sa dynastie ?', answer: 'les Carolingiens', options: ['les Merovingiens', 'les Carolingiens', 'les Capetiens', 'les Valois'], xp: 10 },
      { id: 'hcm1-4-4', type: 'choice', question: 'Charlemagne vient de mourir et tu observes la suite. Que va-t-il arriver a son immense empire ?', answer: 'est partage entre ses petits-fils', options: ['devient la France', 'est partage entre ses petits-fils', 'est conquis par les Romains', 'reste uni pendant des siecles'], xp: 15 },
      { id: 'hcm1-4-5', type: 'choice', question: 'Tu assistes a la signature du traite de Verdun en 843. L\'empire est coupe en combien de morceaux ?', answer: '3 royaumes', options: ['2 royaumes', '3 royaumes', '4 royaumes', '5 royaumes'], xp: 20 },,
      { id: 'hcm1-4-m1', type: 'matching', question: 'Relie chaque action de Charlemagne a son domaine !', pairs: [{ left: 'Ecoles partout', right: 'Education' }, { left: 'Sacre empereur', right: 'Pouvoir politique' }, { left: 'Conquetes militaires', right: 'Expansion de l\'empire' }, { left: 'Traite de Verdun', right: 'Partage de l\'empire' }], xp: 15 },
      { id: 'hcm1-4-fb1', type: 'fill-blank', question: 'Complete la phrase !', sentence: 'Charlemagne a ete sacre empereur en l\'an ___.', blanks: ['800'], wordBank: ['476', '800', '987', '1066'], xp: 15 }
    ],
  },
  {
    id: 'hist-cm1-5', grade: 'CM1', minLevel: 1,
    name: 'CM1 - Premiers Capetiens',
    nameMinecraft: 'Temple - Capetiens', nameLalilo: 'Royaume - Capetiens',
    description: 'Hugues Capet et le debut de la royaute capetienne',
    exercises: [
      { id: 'hcm1-5-1', type: 'choice', question: 'Tu arrives a une assemblee ou un nouveau roi est elu. C\'est Hugues Capet ! En quelle annee sommes-nous ?', answer: '987', options: ['800', '987', '1066', '1100'], xp: 15 },
      { id: 'hcm1-5-2', type: 'choice', question: 'Ce nouveau roi Hugues Capet fonde une dynastie qui portera son nom. Comment s\'appelle-t-elle ?', answer: 'Capetiens', options: ['Merovingiens', 'Carolingiens', 'Capetiens', 'Bourbons'], xp: 10 },
      { id: 'hcm1-5-3', type: 'choice', question: 'Tu regardes la carte du royaume d\'Hugues Capet et tu es surpris : il ne controle qu\'un tout petit territoire ! Lequel ?', answer: 'la region autour de Paris (Ile-de-France)', options: ['toute la France', 'la region autour de Paris (Ile-de-France)', 'le sud de la France', 'la Bretagne'], xp: 15 },
      { id: 'hcm1-5-4', type: 'choice', question: 'Tu decouvres la ruse des Capetiens pour garder le pouvoir dans la famille. Quelle est leur strategie secrete ?', answer: 'sacrant leur fils de leur vivant', options: ['faisant la guerre a tous', 'sacrant leur fils de leur vivant', 'construisant des pyramides', 'voyageant en Amerique'], xp: 20 },
      { id: 'hcm1-5-5', type: 'choice', question: 'Incroyable record ! Tu decouvres que la dynastie capetienne a dure un temps enorme. Combien ?', answer: 'plus de 800 ans (directe et branches)', options: ['50 ans', '200 ans', 'plus de 800 ans (directe et branches)', 'exactement 100 ans'], xp: 15 },,
      { id: 'hcm1-5-o1', type: 'ordering', question: 'Remets les dynasties royales francaises dans l\'ordre !', items: ['Merovingiens (Clovis)', 'Carolingiens (Charlemagne)', 'Capetiens (Hugues Capet)', 'Valois', 'Bourbons (Louis XIV)'], correctOrder: [0, 1, 2, 3, 4], xp: 15 },
      { id: 'hcm1-5-m1', type: 'matching', question: 'Relie chaque roi a sa dynastie !', pairs: [{ left: 'Clovis', right: 'Merovingiens' }, { left: 'Charlemagne', right: 'Carolingiens' }, { left: 'Hugues Capet', right: 'Capetiens' }, { left: 'Louis XIV', right: 'Bourbons' }], xp: 15 }
    ],
  },

  // ─── CM2 ─────────────────────────────────────────────────────
  {
    id: 'hist-cm2-1', grade: 'CM2', minLevel: 1,
    name: 'CM2 - Revolution francaise',
    nameMinecraft: 'Donjon - Revolution', nameLalilo: 'Chateau - Revolution',
    description: '1789, les droits de l\'homme, la Republique',
    exercises: [
      { id: 'hcm2-1-1', type: 'choice', question: 'Tu debarques en 1789 et le peuple est furieux ! Pourquoi la Revolution francaise eclate-t-elle ?', answer: 'Les inegalites entre les trois ordres (clerge, noblesse, tiers-etat)', options: ['Une invasion etrangere', 'Les inegalites entre les trois ordres (clerge, noblesse, tiers-etat)', 'Un tremblement de terre', 'La decouverte de l\'Amerique'], xp: 15 },
      { id: 'hcm2-1-2', type: 'choice', question: 'Tu assistes a la redaction d\'un texte historique en 1789 : la Declaration des Droits de l\'Homme. Que proclame-t-elle ?', answer: 'La liberte et l\'egalite de tous les citoyens', options: ['Le droit du roi a gouverner seul', 'La liberte et l\'egalite de tous les citoyens', 'L\'abolition de l\'ecole', 'Le retour a la monarchie'], xp: 15 },
      { id: 'hcm2-1-3', type: 'choice', question: 'FLASH INFO depuis le passe : le peuple de Paris prend une celebre prison ! Quelle est la date exacte ?', answer: '14 juillet 1789', options: ['1er janvier 1789', '14 juillet 1789', '21 septembre 1792', '11 novembre 1789'], xp: 10 },
      { id: 'hcm2-1-4', type: 'choice', question: 'Tu lis une banderole sur un batiment de la Republique francaise. Il y a trois mots dessus. Lesquels ?', answer: 'Liberte, Egalite, Fraternite', options: ['Travail, Famille, Patrie', 'Liberte, Egalite, Fraternite', 'Force et Honneur', 'Paix et Prosperite'], xp: 10 },
      { id: 'hcm2-1-5', type: 'choice', question: 'Tu voyages jusqu\'au jour sombre ou Louis XVI est execute. En quelle annee ta machine t\'a-t-elle depose ?', answer: '1793', options: ['1789', '1791', '1793', '1799'], xp: 15 },,
      { id: 'hcm2-1-o1', type: 'ordering', question: 'Remets les evenements de la Revolution dans l\'ordre !', items: ['Reunion des Etats generaux', 'Prise de la Bastille (14 juillet)', 'Declaration des Droits de l\'Homme', 'Abolition de la monarchie', 'Execution de Louis XVI (1793)'], correctOrder: [0, 1, 2, 3, 4], xp: 20 },
      { id: 'hcm2-1-m1', type: 'matching', question: 'Relie chaque symbole de la Revolution a sa signification !', pairs: [{ left: 'Cocarde tricolore', right: 'Bleu-blanc-rouge' }, { left: 'Bonnet phrygien', right: 'La liberte' }, { left: 'Marianne', right: 'La Republique' }, { left: 'La Bastille', right: 'La tyrannie renversee' }], xp: 15 }
    ],
  },
  {
    id: 'hist-cm2-2', grade: 'CM2', minLevel: 1,
    name: 'CM2 - Napoleon et la Republique',
    nameMinecraft: 'Donjon - Napoleon', nameLalilo: 'Chateau - Napoleon',
    description: 'Napoleon, le Code civil, les symboles republicains',
    exercises: [
      { id: 'hcm2-2-1', type: 'choice', question: 'Tu assistes au couronnement spectaculaire de Napoleon Bonaparte. Il se proclame empereur en quelle annee ?', answer: '1804', options: ['1789', '1799', '1804', '1815'], xp: 15 },
      { id: 'hcm2-2-2', type: 'choice', question: 'Tu trouves un gros livre ecrit par Napoleon. C\'est le Code civil ! A quoi sert-il ?', answer: 'un ensemble de lois qui organise la societe', options: ['un livre de recettes', 'un ensemble de lois qui organise la societe', 'un code militaire', 'un code secret'], xp: 15 },
      { id: 'hcm2-2-3', type: 'choice', question: 'Tu suis Napoleon sur le champ de bataille et c\'est sa derniere defaite ! Ou et quand es-tu ?', answer: 'Waterloo (1815)', options: ['Austerlitz', 'Waterloo (1815)', 'Paris', 'Moscou'], xp: 15 },
      { id: 'hcm2-2-4', type: 'choice', question: 'Tu vois une statue d\'une femme portant un bonnet phrygien dans toutes les mairies. Qui est "Marianne" ?', answer: 'le symbole de la Republique francaise', options: ['une reine de France', 'le symbole de la Republique francaise', 'la femme de Napoleon', 'une sainte'], xp: 10 },
      { id: 'hcm2-2-5', type: 'choice', question: 'Tu entends un chant puissant retentir lors d\'une ceremonie officielle. C\'est l\'hymne national ! Comment s\'appelle-t-il ?', answer: 'La Marseillaise', options: ['La Marseillaise', 'God Save the Queen', 'L\'Internationale', 'Le Chant du Depart'], xp: 10 },,
      { id: 'hcm2-2-m1', type: 'matching', question: 'Relie chaque element a Napoleon ou a la Republique !', pairs: [{ left: 'Code civil', right: 'Napoleon' }, { left: 'La Marseillaise', right: 'Hymne republicain' }, { left: 'Waterloo', right: 'Derniere defaite de Napoleon' }, { left: 'Marianne', right: 'Symbole de la Republique' }], xp: 15 },
      { id: 'hcm2-2-fb1', type: 'fill-blank', question: 'Complete la phrase !', sentence: 'Napoleon a ete sacre ___ des Francais en 1804.', blanks: ['empereur'], wordBank: ['empereur', 'roi', 'president', 'consul'], xp: 15 }
    ],
  },
  {
    id: 'hist-cm2-3', grade: 'CM2', minLevel: 1,
    name: 'CM2 - L\'ecole de Jules Ferry',
    nameMinecraft: 'Donjon - Ecole', nameLalilo: 'Chateau - Ecole',
    description: 'L\'ecole gratuite, laique et obligatoire',
    exercises: [
      { id: 'hcm2-3-1', type: 'choice', question: 'Tu atterris dans les annees 1880 et tu vois un homme ouvrir des ecoles partout. C\'est Jules Ferry ! Qu\'a-t-il fait ?', answer: 'Rendu l\'ecole gratuite, laique et obligatoire', options: ['Construit la Tour Eiffel', 'Rendu l\'ecole gratuite, laique et obligatoire', 'Fonde la Republique', 'Abolit l\'esclavage'], xp: 15 },
      { id: 'hcm2-3-2', type: 'choice', question: 'Un mot mystere apparu sur les ecoles : "laique". Tu menes l\'enquete. Ca signifie quoi ?', answer: 'independant de toute religion', options: ['religieux', 'independant de toute religion', 'gratuit', 'obligatoire'], xp: 15 },
      { id: 'hcm2-3-3', type: 'choice', question: 'Tu te retrouves en 1905 et une grande loi vient d\'etre votee. Comment s\'appelle cette loi qui separe l\'Eglise et l\'Etat ?', answer: 'La loi de separation des Eglises et de l\'Etat', options: ['La loi sur l\'ecole', 'La loi de separation des Eglises et de l\'Etat', 'La Declaration des droits', 'Le Code civil'], xp: 20 },
      { id: 'hcm2-3-4', type: 'choice', question: 'Tu voyages juste avant Jules Ferry et tu vois des enfants qui travaillent au lieu d\'aller a l\'ecole. Pourquoi ? Parce que l\'ecole etait...', answer: 'payante et pas obligatoire', options: ['gratuite et obligatoire', 'payante et pas obligatoire', 'interdite', 'reservee aux filles'], xp: 10 },
      { id: 'hcm2-3-5', type: 'choice', question: 'Tu enquetes sur la laicite en France. Que garantit-elle aux citoyens ?', answer: 'la liberte de croire ou ne pas croire', options: ['l\'obligation d\'etre religieux', 'la liberte de croire ou ne pas croire', 'l\'interdiction des religions', 'le pouvoir de l\'Eglise'], xp: 15 },,
      { id: 'hcm2-3-o1', type: 'ordering', question: 'Remets ces avancees scolaires dans l\'ordre !', items: ['Ecole payante et non obligatoire', 'Lois Jules Ferry (1881-1882)', 'Ecole gratuite et obligatoire', 'Loi de separation Eglise-Etat (1905)', 'Ecole laique pour tous'], correctOrder: [0, 1, 2, 3, 4], xp: 15 },
      { id: 'hcm2-3-mm1', type: 'memory', question: 'Retrouve les paires : mots de l\'ecole republicaine !', pairs: [{ left: 'Gratuite', right: 'Pas besoin de payer' }, { left: 'Obligatoire', right: 'Tous les enfants y vont' }, { left: 'Laique', right: 'Independante des religions' }, { left: 'Publique', right: 'Ouverte a tous' }], xp: 15 }
    ],
  },
  {
    id: 'hist-cm2-4', grade: 'CM2', minLevel: 1,
    name: 'CM2 - Les deux guerres mondiales',
    nameMinecraft: 'Donjon - Guerres', nameLalilo: 'Chateau - Guerres',
    description: '1914-1918 et 1939-1945',
    exercises: [
      { id: 'hcm2-4-1', type: 'choice', question: 'Tu programmes ta machine temporelle pour voir la Premiere Guerre mondiale. Quelles dates dois-tu entrer ?', answer: '1914 a 1918', options: ['1900 a 1910', '1914 a 1918', '1939 a 1945', '1870 a 1871'], xp: 10 },
      { id: 'hcm2-4-2', type: 'choice', question: 'Alerte dans le passe ! La Seconde Guerre mondiale vient d\'eclater. Quel pays et quel dirigeant l\'ont declenchee ?', answer: 'l\'Allemagne nazie d\'Hitler', options: ['la France', 'l\'Allemagne nazie d\'Hitler', 'les Etats-Unis', 'l\'Angleterre'], xp: 15 },
      { id: 'hcm2-4-3', type: 'choice', question: 'Tu es sur une plage de Normandie le 6 juin 1944. Des milliers de soldats debarquent des bateaux. C\'est le jour...', answer: 'du Debarquement en Normandie', options: ['de la fin de la guerre', 'du Debarquement en Normandie', 'de la prise de Berlin', 'de la liberation de Paris'], xp: 15 },
      { id: 'hcm2-4-4', type: 'choice', question: 'Tu decouvres les pages les plus sombres de l\'histoire : la Shoah. De quoi s\'agit-il ?', answer: 'le genocide des Juifs par les nazis', options: ['une bataille', 'le genocide des Juifs par les nazis', 'une loi', 'un traite de paix'], xp: 20 },
      { id: 'hcm2-4-5', type: 'choice', question: 'Tu croises des soldats de 14-18 dans les tranchees. Ils sont couverts de boue. Comment les surnomme-t-on ?', answer: 'les Poilus', options: ['les Grognards', 'les Poilus', 'les Resistants', 'les Maquisards'], xp: 10 },,
      { id: 'hcm2-4-m1', type: 'matching', question: 'Relie chaque guerre a ses dates !', pairs: [{ left: 'Premiere Guerre mondiale', right: '1914-1918' }, { left: 'Seconde Guerre mondiale', right: '1939-1945' }, { left: 'Debarquement en Normandie', right: '6 juin 1944' }, { left: 'Armistice', right: '11 novembre 1918' }], xp: 15 },
      { id: 'hcm2-4-fb1', type: 'fill-blank', question: 'Complete la phrase !', sentence: 'Les soldats de la Premiere Guerre mondiale etaient surnommes les ___.', blanks: ['Poilus'], wordBank: ['Poilus', 'Grognards', 'Mousquetaires', 'Resistants'], xp: 15 }
    ],
  },
  {
    id: 'hist-cm2-5', grade: 'CM2', minLevel: 1,
    name: 'CM2 - Construction europeenne',
    nameMinecraft: 'Donjon - Europe', nameLalilo: 'Chateau - Europe',
    description: 'De la paix a l\'Union europeenne',
    exercises: [
      { id: 'hcm2-5-1', type: 'choice', question: 'Apres deux guerres terribles, tu vois les dirigeants europeens se reunir pour que ca n\'arrive plus jamais. Quel grand projet est ne ?', answer: 'La construction europeenne (future UE)', options: ['L\'ONU uniquement', 'La construction europeenne (future UE)', 'La conquete spatiale', 'La Societe des Nations'], xp: 20 },
      { id: 'hcm2-5-2', type: 'choice', question: 'Tu assistes a la naissance de la CECA en 1951. Autour de quelles ressources les pays se sont-ils unis ?', answer: 'du charbon et de l\'acier', options: ['de la nourriture', 'du charbon et de l\'acier', 'du petrole', 'de l\'or'], xp: 15 },
      { id: 'hcm2-5-3', type: 'choice', question: 'Tu es a Rome en 1957 pour la signature du traite creant la CEE. Combien de pays sont autour de la table ?', answer: '6', options: ['4', '6', '12', '27'], xp: 15 },
      { id: 'hcm2-5-4', type: 'choice', question: 'Tu fais un saut dans le temps et tu vois de nouvelles pieces de monnaie partout en Europe. Depuis quand utilise-t-on l\'euro ?', answer: '2002', options: ['1992', '1999', '2002', '2010'], xp: 15 },
      { id: 'hcm2-5-5', type: 'choice', question: 'Enquete historique : quel etait le but numero un des pays europeens en se reunissant apres les guerres ?', answer: 'maintenir la paix entre les pays europeens', options: ['gagner de l\'argent', 'maintenir la paix entre les pays europeens', 'creer une armee', 'coloniser d\'autres pays'], xp: 15 },,
      { id: 'hcm2-5-o1', type: 'ordering', question: 'Remets les etapes de la construction europeenne dans l\'ordre !', items: ['Fin de la 2e Guerre mondiale (1945)', 'Creation de la CECA (1951)', 'Traite de Rome - CEE (1957)', 'Traite de Maastricht - UE (1992)', 'Passage a l\'euro (2002)'], correctOrder: [0, 1, 2, 3, 4], xp: 20 },
      { id: 'hcm2-5-m1', type: 'matching', question: 'Relie chaque etape europeenne a son annee !', pairs: [{ left: 'CECA', right: '1951' }, { left: 'Traite de Rome', right: '1957' }, { left: 'Traite de Maastricht', right: '1992' }, { left: 'Euro en circulation', right: '2002' }], xp: 15 }
    ],
  },

  // ─── 6eme ────────────────────────────────────────────────────
  {
    id: 'hist-6e-1', grade: '6eme', minLevel: 1,
    name: '6eme - Origines de l\'humanite',
    nameMinecraft: 'Atelier - Origines', nameLalilo: 'Epoque - Origines',
    description: 'Les premiers humains et leur migration',
    exercises: [
      { id: 'h6e-1-1', type: 'choice', question: 'Tu remontes des millions d\'annees en arriere pour rencontrer les tout premiers humains. Sur quel continent atterris-tu ?', answer: 'L\'Afrique', options: ['L\'Europe', 'L\'Asie', 'L\'Afrique', 'L\'Amerique'], xp: 10 },
      { id: 'h6e-1-2', type: 'choice', question: 'Ta machine affiche le compteur d\'annees quand tu rencontres le premier Homo sapiens. Il est apparu il y a environ...', answer: '300 000 ans', options: ['10 000 ans', '100 000 ans', '300 000 ans', '3 millions d\'annees'], xp: 15 },
      { id: 'h6e-1-3', type: 'choice', question: 'Tu observes les premiers humains se repandre sur toute la planete au fil du temps. Comment ont-ils fait ?', answer: 'Par des migrations sur des milliers d\'annees', options: ['En avion', 'Par des migrations sur des milliers d\'annees', 'Ils etaient deja partout', 'Par bateau uniquement'], xp: 15 },
      { id: 'h6e-1-4', type: 'choice', question: 'Tu debarques en Mesopotamie et tu vois des gens graver des signes en forme de coins sur des tablettes d\'argile. Quel peuple a invente cette ecriture cuneiforme ?', answer: 'Les Sumeriens (Mesopotamie)', options: ['Les Egyptiens', 'Les Grecs', 'Les Sumeriens (Mesopotamie)', 'Les Romains'], xp: 20 },
      { id: 'h6e-1-5', type: 'choice', question: 'Tu cherches les tout premiers Etats organises de l\'histoire. Ou dois-tu voyager ?', answer: 'en Mesopotamie et en Egypte', options: ['en Europe', 'en Mesopotamie et en Egypte', 'en Chine uniquement', 'en Amerique'], xp: 15 },,
      { id: 'h6e-1-o1', type: 'ordering', question: 'Remets ces etapes de l\'humanite dans l\'ordre !', items: ['Premiers hominides en Afrique', 'Maitrise du feu', 'Homo sapiens apparait', 'Migrations hors d\'Afrique', 'Premieres civilisations (Mesopotamie)'], correctOrder: [0, 1, 2, 3, 4], xp: 20 },
      { id: 'h6e-1-m1', type: 'matching', question: 'Relie chaque civilisation a son invention !', pairs: [{ left: 'Sumeriens', right: 'Ecriture cuneiforme' }, { left: 'Egyptiens', right: 'Hieroglyphes' }, { left: 'Pheniciens', right: 'Alphabet' }, { left: 'Chinois', right: 'Papier' }], xp: 20 }
    ],
  },
  {
    id: 'hist-6e-2', grade: '6eme', minLevel: 1,
    name: '6eme - Egypte et Mesopotamie',
    nameMinecraft: 'Atelier - Egypte', nameLalilo: 'Epoque - Egypte',
    description: 'Les premieres grandes civilisations',
    exercises: [
      { id: 'h6e-2-1', type: 'choice', question: 'Tu te tiens devant les immenses pyramides d\'Egypte. A quoi servaient ces monuments colossaux ?', answer: 'tombeaux pour les pharaons', options: ['temples', 'tombeaux pour les pharaons', 'palais', 'ecoles'], xp: 10 },
      { id: 'h6e-2-2', type: 'choice', question: 'Tu rencontres le pharaon et tout le monde se prosterne devant lui. Pourquoi est-il si venere ?', answer: 'un dieu vivant', options: ['un simple roi', 'un dieu vivant', 'un pretre', 'un general'], xp: 15 },
      { id: 'h6e-2-3', type: 'choice', question: 'Tu observes des scribes egyptiens dessiner de mysterieux symboles sur les murs d\'un temple. Comment appelle-t-on cette ecriture ?', answer: 'les hieroglyphes', options: ['le cuneiforme', 'les hieroglyphes', 'l\'alphabet', 'le latin'], xp: 10 },
      { id: 'h6e-2-4', type: 'choice', question: 'Tu survoles l\'Egypte ancienne et tu vois un immense fleuve qui deborde chaque annee. Pourquoi le Nil etait-il si important ?', answer: 'ses crues fertilisaient les terres', options: ['il etait sacre', 'ses crues fertilisaient les terres', 'il etait le plus long', 'il separait deux pays'], xp: 15 },
      { id: 'h6e-2-5', type: 'choice', question: 'Tu trouves une enorme stele gravee en Mesopotamie : c\'est le Code de Hammurabi ! Qu\'est-ce que c\'est ?', answer: 'un des premiers codes de lois ecrits', options: ['un livre de mathematiques', 'un des premiers codes de lois ecrits', 'un recit mythologique', 'un calendrier'], xp: 20 },,
      { id: 'h6e-2-m1', type: 'matching', question: 'Relie chaque element a sa civilisation !', pairs: [{ left: 'Pyramides', right: 'Egypte' }, { left: 'Ziggourat', right: 'Mesopotamie' }, { left: 'Pharaon', right: 'Egypte' }, { left: 'Code de Hammurabi', right: 'Mesopotamie' }], xp: 20 },
      { id: 'h6e-2-fb1', type: 'fill-blank', question: 'Complete la phrase !', sentence: 'Le ___ etait considere comme un dieu vivant en Egypte ancienne.', blanks: ['pharaon'], wordBank: ['pharaon', 'pretre', 'scribe', 'vizir'], xp: 15 }
    ],
  },
  {
    id: 'hist-6e-3', grade: '6eme', minLevel: 1,
    name: '6eme - Grece antique',
    nameMinecraft: 'Atelier - Grece', nameLalilo: 'Epoque - Grece',
    description: 'Cites grecques, democratie, mythologie',
    exercises: [
      { id: 'h6e-3-1', type: 'choice', question: 'Tu atterris en Grece antique et tu decouvres que chaque ville fonctionne comme un petit pays independant. Comment appelle-t-on une cite grecque (polis) ?', answer: 'Une ville independante avec son territoire et ses lois', options: ['Un empire immense', 'Une ville independante avec son territoire et ses lois', 'Un village de pecheurs', 'Une colonie romaine'], xp: 15 },
      { id: 'h6e-3-2', type: 'choice', question: 'Tu assistes a la naissance d\'un systeme revolutionnaire : les citoyens votent eux-memes les lois ! Dans quelle cite es-tu ?', answer: 'Athenes', options: ['Rome', 'Athenes', 'Sparte', 'Paris'], xp: 10 },
      { id: 'h6e-3-3', type: 'choice', question: 'Tu veux voter a Athenes mais on te demande qui tu es. Tu decouvres que tout le monde ne peut pas voter. Qui a ce droit ?', answer: 'Les citoyens hommes adultes (pas les femmes, esclaves, etrangers)', options: ['Tout le monde', 'Les citoyens hommes adultes (pas les femmes, esclaves, etrangers)', 'Les riches uniquement', 'Le roi'], xp: 20 },
      { id: 'h6e-3-4', type: 'choice', question: 'Tu grimpes au sommet de l\'Olympe et tu rencontres le chef de tous les dieux grecs. Qui est-il ?', answer: 'le roi des dieux grecs', options: ['un heros', 'le roi des dieux grecs', 'un philosophe', 'un roi de Sparte'], xp: 10 },
      { id: 'h6e-3-5', type: 'choice', question: 'Tu te retrouves aux premiers Jeux Olympiques de l\'Antiquite ! Les athletes se retrouvent dans quelle ville sacree ?', answer: 'Olympie', options: ['Athenes', 'Olympie', 'Sparte', 'Rome'], xp: 15 },,
      { id: 'h6e-3-o1', type: 'ordering', question: 'Remets ces evenements grecs dans l\'ordre chronologique !', items: ['Premiers Jeux Olympiques (-776)', 'Naissance de la democratie a Athenes', 'Guerres mediques contre les Perses', 'Siecle de Pericles', 'Conquetes d\'Alexandre le Grand'], correctOrder: [0, 1, 2, 3, 4], xp: 20 },
      { id: 'h6e-3-mm1', type: 'memory', question: 'Retrouve les paires : dieux grecs et leur domaine !', pairs: [{ left: 'Zeus', right: 'Roi des dieux' }, { left: 'Poseidon', right: 'Mer et oceans' }, { left: 'Athena', right: 'Sagesse et guerre' }, { left: 'Apollon', right: 'Soleil et arts' }], xp: 15 }
    ],
  },
  {
    id: 'hist-6e-4', grade: '6eme', minLevel: 1,
    name: '6eme - Rome antique',
    nameMinecraft: 'Atelier - Rome', nameLalilo: 'Epoque - Rome',
    description: 'De la Republique a l\'Empire romain',
    exercises: [
      { id: 'h6e-4-1', type: 'choice', question: 'Tu arrives au tout debut de Rome et on te raconte la legende de sa fondation. Quels deux freres sont au coeur de l\'histoire ?', answer: 'Romulus et Remus', options: ['Ulysse', 'Cesar', 'Romulus et Remus', 'Alexandre le Grand'], xp: 10 },
      { id: 'h6e-4-2', type: 'choice', question: 'Tu visites Rome a ses debuts et tu vois des senateurs debattre au forum. Rome n\'a pas de roi, c\'est d\'abord une...', answer: 'Republique dirigee par le Senat', options: ['Monarchie', 'Republique dirigee par le Senat', 'Democratie comme Athenes', 'Theocrate'], xp: 15 },
      { id: 'h6e-4-3', type: 'choice', question: 'Tu es au Senat romain et tu assistes a la scene choquante de l\'assassinat de Jules Cesar. En quelle annee es-tu ?', answer: '44 avant J.-C.', options: ['100 avant J.-C.', '44 avant J.-C.', '27 avant J.-C.', '476 apres J.-C.'], xp: 15 },
      { id: 'h6e-4-4', type: 'choice', question: 'Tu vois un homme recevoir le titre de premier empereur de Rome. Qui est ce personnage historique ?', answer: 'Auguste (Octave)', options: ['Jules Cesar', 'Auguste (Octave)', 'Neron', 'Constantin'], xp: 15 },
      { id: 'h6e-4-5', type: 'choice', question: 'Tu assistes a l\'evenement qui marque la fin de l\'Empire romain d\'Occident. Les barbares sont aux portes ! En quelle annee es-tu ?', answer: '476', options: ['27 av. J.-C.', '313', '476', '800'], xp: 20 },,
      { id: 'h6e-4-m1', type: 'matching', question: 'Relie chaque personnage romain a son role !', pairs: [{ left: 'Romulus', right: 'Fondateur legendaire de Rome' }, { left: 'Jules Cesar', right: 'General et dictateur' }, { left: 'Auguste', right: 'Premier empereur' }, { left: 'Constantin', right: 'Legalise le christianisme' }], xp: 20 },
      { id: 'h6e-4-fb1', type: 'fill-blank', question: 'Complete la phrase !', sentence: 'L\'Empire romain d\'Occident chute en ___ apres J.-C.', blanks: ['476'], wordBank: ['44', '313', '476', '800'], xp: 15 }
    ],
  },
  {
    id: 'hist-6e-5', grade: '6eme', minLevel: 1,
    name: '6eme - Debuts du monotheisme',
    nameMinecraft: 'Atelier - Monotheismes', nameLalilo: 'Epoque - Monotheismes',
    description: 'Judaisme et christianisme dans l\'Antiquite',
    exercises: [
      { id: 'h6e-5-1', type: 'choice', question: 'Tu voyages au Proche-Orient ancien et tu decouvres quelque chose de nouveau : un peuple qui ne croit qu\'en un seul dieu. Comment appelle-t-on cette croyance ?', answer: 'La croyance en un seul dieu', options: ['La croyance en plusieurs dieux', 'La croyance en un seul dieu', 'Le refus de toute religion', 'Le culte des ancetres'], xp: 15 },
      { id: 'h6e-5-2', type: 'choice', question: 'Tu cherches le lieu de naissance du judaisme, la plus ancienne religion monotheiste. Ou dois-tu aller ?', answer: 'au Proche-Orient ancien (peuple hebreu)', options: ['en Grece', 'au Proche-Orient ancien (peuple hebreu)', 'a Rome', 'en Egypte'], xp: 15 },
      { id: 'h6e-5-3', type: 'choice', question: 'Tu rencontres un sage juif qui tient un rouleau sacre entre ses mains. Comment s\'appelle ce livre ?', answer: 'la Torah (ou Bible hebraique)', options: ['le Coran', 'la Torah (ou Bible hebraique)', 'l\'Evangile', 'les Vedas'], xp: 10 },
      { id: 'h6e-5-4', type: 'choice', question: 'Tu enquetes sur la naissance du christianisme. A quelle epoque et dans quel contexte est-il apparu ?', answer: 'Ier siecle (epoque romaine)', options: ['Ve siecle av. J.-C.', 'Ier siecle (epoque romaine)', 'VIIe siecle', 'Moyen Age'], xp: 15 },
      { id: 'h6e-5-5', type: 'choice', question: 'Tu te retrouves a Milan et l\'empereur Constantin vient de signer un texte important qui legalise le christianisme. En quelle annee ?', answer: '313 (edit de Milan)', options: ['100', '313 (edit de Milan)', '476', '800'], xp: 20 },,
      { id: 'h6e-5-o1', type: 'ordering', question: 'Remets les religions monotheistes dans l\'ordre d\'apparition !', items: ['Judaisme (peuple hebreu)', 'Christianisme (Ier siecle)', 'Edit de Milan - christianisme legal (313)', 'Christianisme religion officielle de Rome (380)'], correctOrder: [0, 1, 2, 3], xp: 20 },
      { id: 'h6e-5-m1', type: 'matching', question: 'Relie chaque religion a son livre sacre !', pairs: [{ left: 'Judaisme', right: 'Torah' }, { left: 'Christianisme', right: 'Bible' }, { left: 'Islam', right: 'Coran' }, { left: 'Hindouisme', right: 'Vedas' }], xp: 15 }
    ],
  },

  // ─── 5eme ────────────────────────────────────────────────────
  {
    id: 'hist-5e-1', grade: '5eme', minLevel: 1,
    name: '5eme - Empire byzantin',
    nameMinecraft: 'Assaut - Byzance', nameLalilo: 'Vent - Byzance',
    description: 'Constantinople et l\'Empire byzantin',
    exercises: [
      { id: 'h5e-1-1', type: 'choice', question: 'Tu arrives dans une ville magnifique aux coupoles dorees : c\'est la capitale de l\'Empire byzantin ! Comment s\'appelle-t-elle ?', answer: 'Constantinople', options: ['Rome', 'Constantinople', 'Athenes', 'Alexandrie'], xp: 15 },
      { id: 'h5e-1-2', type: 'choice', question: 'Tu enquetes sur les origines de cet empire. L\'Empire byzantin est en fait la continuation de quel empire ?', answer: 'l\'Empire romain d\'Orient', options: ['l\'Empire romain d\'Occident', 'l\'Empire romain d\'Orient', 'l\'Empire grec', 'l\'Empire perse'], xp: 15 },
      { id: 'h5e-1-3', type: 'choice', question: 'DERNIERE HEURE : Constantinople est assiegee et sur le point de tomber ! En quelle annee cette grande capitale chute-t-elle ?', answer: '1453', options: ['476', '1066', '1453', '1789'], xp: 15 },
      { id: 'h5e-1-4', type: 'choice', question: 'Tu entres dans la basilique Sainte-Sophie et tu restes bouche bee. Pourquoi est-elle si celebre ?', answer: 'son immense coupole et sa mosaique', options: ['sa tour de 100 metres', 'son immense coupole et sa mosaique', 'ses vitraux gothiques', 'ses pyramides'], xp: 15 },
      { id: 'h5e-1-5', type: 'choice', question: 'Tu rencontres l\'empereur Justinien en personne. Pour quelle grande realisation est-il passe a l\'histoire ?', answer: 'avoir compile le droit romain', options: ['avoir conquis l\'Amerique', 'avoir compile le droit romain', 'avoir invente l\'imprimerie', 'avoir construit les pyramides'], xp: 20 },,
      { id: 'h5e-1-o1', type: 'ordering', question: 'Remets ces evenements de l\'Empire byzantin dans l\'ordre !', items: ['Chute de Rome d\'Occident (476)', 'Regne de Justinien (527-565)', 'Construction de Sainte-Sophie', 'Les croisades traversent Byzance', 'Chute de Constantinople (1453)'], correctOrder: [0, 1, 2, 3, 4], xp: 20 },
      { id: 'h5e-1-m1', type: 'matching', question: 'Relie chaque element a l\'Empire byzantin !', pairs: [{ left: 'Constantinople', right: 'Capitale de l\'empire' }, { left: 'Justinien', right: 'Grand empereur legislateur' }, { left: 'Sainte-Sophie', right: 'Basilique celebre' }, { left: '1453', right: 'Chute de l\'empire' }], xp: 15 }
    ],
  },
  {
    id: 'hist-5e-2', grade: '5eme', minLevel: 1,
    name: '5eme - Islam et monde musulman',
    nameMinecraft: 'Assaut - Islam', nameLalilo: 'Vent - Islam',
    description: 'Naissance et expansion de l\'Islam',
    exercises: [
      { id: 'h5e-2-1', type: 'choice', question: 'Tu programmes ta machine pour assister a la naissance de l\'Islam. A quel siecle et ou dois-tu atterrir ?', answer: 'VIIe siecle en Arabie', options: ['Ve siecle en Europe', 'VIIe siecle en Arabie', 'Ier siecle a Rome', 'IIIe siecle en Egypte'], xp: 15 },
      { id: 'h5e-2-2', type: 'choice', question: 'Tu arrives en Arabie et tu rencontres l\'homme qui transmet le message de l\'Islam. Quel est le nom de ce prophete ?', answer: 'Mahomet (Muhammad)', options: ['Jesus', 'Mahomet (Muhammad)', 'Moise', 'Abraham'], xp: 10 },
      { id: 'h5e-2-3', type: 'choice', question: 'Tu vois des savants musulmans recopier soigneusement un livre sacre. Comment s\'appelle-t-il ?', answer: 'le Coran', options: ['la Bible', 'le Coran', 'la Torah', 'les Evangiles'], xp: 10 },
      { id: 'h5e-2-4', type: 'choice', question: 'Un sage musulman t\'explique que l\'Islam repose sur cinq piliers fondamentaux. Quels sont-ils ?', answer: 'la foi, la priere, l\'aumone, le jeune, le pelerinage', options: ['cinq mosquees', 'la foi, la priere, l\'aumone, le jeune, le pelerinage', 'cinq prophetes', 'cinq livres sacres'], xp: 20 },
      { id: 'h5e-2-5', type: 'choice', question: 'Tu visites la bibliotheque de Bagdad et tu es impressionne par les decouvertes des savants musulmans. Dans quels domaines ont-ils excelle ?', answer: 'les mathematiques, l\'astronomie, la medecine', options: ['rien de particulier', 'les mathematiques, l\'astronomie, la medecine', 'uniquement la religion', 'uniquement l\'architecture'], xp: 15 },,
      { id: 'h5e-2-m1', type: 'matching', question: 'Relie chaque pilier de l\'Islam a sa description !', pairs: [{ left: 'Chahada', right: 'Profession de foi' }, { left: 'Salat', right: 'Priere cinq fois par jour' }, { left: 'Zakat', right: 'Aumone aux pauvres' }, { left: 'Hajj', right: 'Pelerinage a La Mecque' }], xp: 20 },
      { id: 'h5e-2-fb1', type: 'fill-blank', question: 'Complete la phrase !', sentence: 'Le livre sacre de l\'Islam s\'appelle le ___.', blanks: ['Coran'], wordBank: ['Coran', 'Bible', 'Torah', 'Vedas'], xp: 15 }
    ],
  },
  {
    id: 'hist-5e-3', grade: '5eme', minLevel: 1,
    name: '5eme - Feodalite',
    nameMinecraft: 'Assaut - Feodalite', nameLalilo: 'Vent - Feodalite',
    description: 'Seigneurs, vassaux, chateaux forts',
    exercises: [
      { id: 'h5e-3-1', type: 'choice', question: 'Tu atterris au Moyen Age et tu vois un chevalier jurer fidelite a un seigneur en echange de terres. Comment appelle-t-on ce systeme ?', answer: 'La feodalite', options: ['La democratie', 'La feodalite', 'La republique', 'Le communisme'], xp: 15 },
      { id: 'h5e-3-2', type: 'choice', question: 'Tu deviens vassal d\'un seigneur pour une journee ! Qu\'es-tu oblige de lui donner en echange ?', answer: 'aide militaire et conseil', options: ['de l\'argent uniquement', 'aide militaire et conseil', 'rien du tout', 'son chateau'], xp: 15 },
      { id: 'h5e-3-3', type: 'choice', question: 'En echange de ta fidelite de vassal, ton seigneur doit te donner quelque chose. Quoi ?', answer: 'protection et un fief (terre)', options: ['rien', 'protection et un fief (terre)', 'de l\'or', 'un titre de roi'], xp: 15 },
      { id: 'h5e-3-4', type: 'choice', question: 'Tu vois des paysans qui ne peuvent pas quitter la terre du seigneur. On les appelle les serfs. Qui sont-ils exactement ?', answer: 'des paysans attaches a la terre du seigneur', options: ['des chevaliers', 'des paysans attaches a la terre du seigneur', 'des moines', 'des marchands'], xp: 15 },
      { id: 'h5e-3-5', type: 'choice', question: 'Tu assistes a une ceremonie solennelle : un jeune ecuyer recoit son epee et devient chevalier. Comment appelle-t-on cette ceremonie ?', answer: 'un ecuyer devient chevalier', options: ['un roi est couronne', 'un ecuyer devient chevalier', 'un paysan est libere', 'un moine prononce ses voeux'], xp: 20 },,
      { id: 'h5e-3-o1', type: 'ordering', question: 'Remets la hierarchie feodale dans l\'ordre, du plus puissant au moins puissant !', items: ['Le roi', 'Les grands seigneurs', 'Les vassaux (petits seigneurs)', 'Les chevaliers', 'Les paysans et serfs'], correctOrder: [0, 1, 2, 3, 4], xp: 20 },
      { id: 'h5e-3-mm1', type: 'memory', question: 'Retrouve les paires : la vie au Moyen Age !', pairs: [{ left: 'Seigneur', right: 'Possede le fief' }, { left: 'Vassal', right: 'Jure fidelite' }, { left: 'Serf', right: 'Attache a la terre' }, { left: 'Chevalier', right: 'Combat a cheval' }], xp: 15 }
    ],
  },
  {
    id: 'hist-5e-4', grade: '5eme', minLevel: 1,
    name: '5eme - Villes et commerce medieval',
    nameMinecraft: 'Assaut - Villes', nameLalilo: 'Vent - Villes',
    description: 'Essor des villes, foires, cathedrales',
    exercises: [
      { id: 'h5e-4-1', type: 'choice', question: 'Tu voyages entre le XIe et le XIIIe siecle et tu vois des villes pousser partout comme des champignons. Pourquoi ?', answer: 'Grace au commerce et a l\'artisanat', options: ['A cause des guerres', 'Grace au commerce et a l\'artisanat', 'A cause des epidemies', 'Grace aux rois uniquement'], xp: 20 },
      { id: 'h5e-4-2', type: 'choice', question: 'Tu te promenes dans un bourg medieval et tu croises des marchands et artisans qui vivent bien. On les appelle les bourgeois. Qui sont-ils ?', answer: 'les habitants des bourgs (villes) souvent marchands', options: ['des nobles', 'les habitants des bourgs (villes) souvent marchands', 'des paysans', 'des religieux'], xp: 15 },
      { id: 'h5e-4-3', type: 'choice', question: 'Tu leves la tete dans une cathedrale gothique et tu es fascine. Qu\'est-ce qui la rend si speciale ?', answer: 'des arcs brises, des vitraux et de la hauteur', options: ['des murs epais et peu de fenetres', 'des arcs brises, des vitraux et de la hauteur', 'des coupoles rondes', 'des pyramides'], xp: 15 },
      { id: 'h5e-4-4', type: 'choice', question: 'Tu arrives en Champagne au Moyen Age et c\'est la foire ! Des marchands viennent de toute l\'Europe. Que sont ces fameuses foires ?', answer: 'de grands marches internationaux', options: ['des fetes foraines', 'de grands marches internationaux', 'des tournois de chevaliers', 'des ceremonies religieuses'], xp: 15 },
      { id: 'h5e-4-5', type: 'choice', question: 'ALERTE HISTORIQUE : la peste noire frappe l\'Europe entre 1347 et 1352 ! Quelle proportion de la population a-t-elle emportee ?', answer: 'un tiers de la population europeenne', options: ['quelques centaines de personnes', 'un tiers de la population europeenne', 'la moitie du monde', 'uniquement en Italie'], xp: 20 },,
      { id: 'h5e-4-m1', type: 'matching', question: 'Relie chaque element medieval a sa description !', pairs: [{ left: 'Les foires de Champagne', right: 'Grands marches internationaux' }, { left: 'Les bourgeois', right: 'Habitants des villes' }, { left: 'Les cathedrales gothiques', right: 'Arcs brises et vitraux' }, { left: 'La peste noire', right: 'Epidemie de 1347-1352' }], xp: 20 },
      { id: 'h5e-4-fb1', type: 'fill-blank', question: 'Complete la phrase !', sentence: 'La peste noire a emporte environ un ___ de la population europeenne.', blanks: ['tiers'], wordBank: ['tiers', 'quart', 'dixieme', 'moitie'], xp: 15 }
    ],
  },
  {
    id: 'hist-5e-5', grade: '5eme', minLevel: 1,
    name: '5eme - Renaissance et humanisme',
    nameMinecraft: 'Assaut - Renaissance', nameLalilo: 'Vent - Renaissance',
    description: 'Humanisme, grandes decouvertes, Reforme',
    exercises: [
      { id: 'h5e-5-1', type: 'choice', question: 'Tu debarques a la Renaissance et les intellectuels ne parlent que de l\'Homme et de la raison. Comment appelle-t-on ce mouvement d\'idees ?', answer: 'Un mouvement intellectuel placant l\'Homme au centre', options: ['Un mouvement artistique uniquement', 'Un mouvement intellectuel placant l\'Homme au centre', 'Une religion nouvelle', 'Un parti politique'], xp: 20 },
      { id: 'h5e-5-2', type: 'choice', question: 'Tu visites l\'atelier de Gutenberg vers 1450 et tu vois une machine incroyable qui imprime des livres ! Quelle invention revolutionnaire est-ce ?', answer: 'L\'imprimerie a caracteres mobiles', options: ['Le telescope', 'L\'imprimerie a caracteres mobiles', 'La boussole', 'La poudre a canon'], xp: 15 },
      { id: 'h5e-5-3', type: 'choice', question: 'Tu montes a bord d\'un navire avec Christophe Colomb et apres des semaines en mer, terre en vue ! En quelle annee decouvre-t-il l\'Amerique ?', answer: '1492', options: ['1450', '1492', '1519', '1600'], xp: 10 },
      { id: 'h5e-5-4', type: 'choice', question: 'Tu entres dans l\'atelier d\'un genie italien a Florence : il peint, invente des machines et etudie le corps humain. Qui est Leonard de Vinci ?', answer: 'peintre, inventeur et scientifique', options: ['roi de France', 'peintre, inventeur et scientifique', 'explorateur', 'pape'], xp: 10 },
      { id: 'h5e-5-5', type: 'choice', question: 'Tu arrives en 1517 et un moine affiche 95 theses sur la porte d\'une eglise. C\'est le debut de la Reforme protestante ! Qui est-il ?', answer: 'Martin Luther (1517)', options: ['le pape', 'Martin Luther (1517)', 'Christophe Colomb', 'Francois Ier'], xp: 15 },,
      { id: 'h5e-5-o1', type: 'ordering', question: 'Remets les grandes decouvertes et inventions dans l\'ordre !', items: ['Imprimerie de Gutenberg (vers 1450)', 'Decouverte de l\'Amerique (1492)', 'Reforme de Luther (1517)', 'Tour du monde de Magellan (1519-1522)', 'Leonard de Vinci a la cour de France'], correctOrder: [0, 1, 2, 3, 4], xp: 20 },
      { id: 'h5e-5-m1', type: 'matching', question: 'Relie chaque personnage de la Renaissance a son domaine !', pairs: [{ left: 'Gutenberg', right: 'Imprimerie' }, { left: 'Christophe Colomb', right: 'Exploration maritime' }, { left: 'Leonard de Vinci', right: 'Art et sciences' }, { left: 'Martin Luther', right: 'Reforme protestante' }], xp: 15 }
    ],
  },
]
