// ═══════════════════════════════════════════════════════════════════
// Resources audio/video pour les langues
// Videos YouTube educatives + prononciation via Web Speech API
// ═══════════════════════════════════════════════════════════════════

// ─── Videos educatives pour l'anglais ────────────────────────────────
export const englishVideos = {
  'eng-1': [
    {
      title: 'Apprendre les salutations en anglais',
      url: 'https://www.youtube.com/watch?v=tVlcKp3bWH8',
      channel: 'English Singsing',
      duration: '5 min',
      icon: '👋',
    },
    {
      title: 'Les couleurs en anglais - chanson',
      url: 'https://www.youtube.com/watch?v=jYAWf8Y91hA',
      channel: 'Maple Leaf Learning',
      duration: '3 min',
      icon: '🎨',
    },
  ],
  'eng-2': [
    {
      title: 'Ma routine quotidienne en anglais',
      url: 'https://www.youtube.com/watch?v=eUXkj6j6Ezw',
      channel: 'English Singsing',
      duration: '6 min',
      icon: '🏠',
    },
    {
      title: 'Les contraires en anglais',
      url: 'https://www.youtube.com/watch?v=JGN54kg_pVQ',
      channel: 'Maple Leaf Learning',
      duration: '4 min',
      icon: '↔️',
    },
  ],
  'eng-3': [
    {
      title: 'Le passe simple en anglais (Past Simple)',
      url: 'https://www.youtube.com/watch?v=KMteEuOpmTQ',
      channel: 'English with Lucy',
      duration: '8 min',
      icon: '⏰',
    },
    {
      title: 'Les verbes irreguliers - chanson',
      url: 'https://www.youtube.com/watch?v=e0q96N3bRcA',
      channel: 'Fluency MC',
      duration: '4 min',
      icon: '🎵',
    },
  ],
  'eng-4': [
    {
      title: 'Comprendre un texte en anglais - methode',
      url: 'https://www.youtube.com/watch?v=pQs_kOC4eFg',
      channel: 'Learn English',
      duration: '10 min',
      icon: '📚',
    },
  ],
  'eng-5': [
    {
      title: 'Conversations en anglais pour debutants',
      url: 'https://www.youtube.com/watch?v=juKd26qkNAw',
      channel: 'Easy English',
      duration: '12 min',
      icon: '💬',
    },
    {
      title: 'Expressions polies en anglais',
      url: 'https://www.youtube.com/watch?v=Qmvnk3ISdIE',
      channel: 'BBC Learning English',
      duration: '6 min',
      icon: '🎩',
    },
  ],
}

// ─── Videos educatives pour le francais ──────────────────────────────
export const frenchVideos = {
  'fr-1': [
    {
      title: 'Les accords sujet-verbe',
      url: 'https://www.youtube.com/watch?v=iP9ElUTOvPg',
      channel: 'Les Fondamentaux (Canope)',
      duration: '3 min',
      icon: '✏️',
    },
  ],
  'fr-2': [
    {
      title: 'Le present, l\'imparfait et le futur',
      url: 'https://www.youtube.com/watch?v=Ao1hEBMHj6s',
      channel: 'Les Fondamentaux (Canope)',
      duration: '4 min',
      icon: '⏰',
    },
  ],
  'fr-3': [
    {
      title: 'Le sujet, le verbe et le complement',
      url: 'https://www.youtube.com/watch?v=5kZK1N3Tuqg',
      channel: 'Les Fondamentaux (Canope)',
      duration: '3 min',
      icon: '🧩',
    },
  ],
  'fr-4': [
    {
      title: 'Synonymes et antonymes',
      url: 'https://www.youtube.com/watch?v=0UYCEpDMPhA',
      channel: 'Les Fondamentaux (Canope)',
      duration: '3 min',
      icon: '📚',
    },
  ],
  'fr-5': [
    {
      title: 'Les figures de style',
      url: 'https://www.youtube.com/watch?v=PvTsJsl3USk',
      channel: 'Les Fondamentaux (Canope)',
      duration: '5 min',
      icon: '🎭',
    },
  ],
}

// ─── Mots-cles a prononcer par niveau ────────────────────────────────
export const pronunciationWords = {
  'eng-1': [
    { word: 'Hello', translation: 'Bonjour' },
    { word: 'Goodbye', translation: 'Au revoir' },
    { word: 'Thank you', translation: 'Merci' },
    { word: 'Please', translation: 'S\'il vous plait' },
    { word: 'Red', translation: 'Rouge' },
    { word: 'Blue', translation: 'Bleu' },
    { word: 'Green', translation: 'Vert' },
    { word: 'One, two, three', translation: 'Un, deux, trois' },
  ],
  'eng-2': [
    { word: 'I wake up at seven', translation: 'Je me reveille a sept heures' },
    { word: 'I go to school', translation: 'Je vais a l\'ecole' },
    { word: 'She plays football', translation: 'Elle joue au football' },
    { word: 'What is your name?', translation: 'Comment tu t\'appelles ?' },
    { word: 'Big and small', translation: 'Grand et petit' },
    { word: 'Hot and cold', translation: 'Chaud et froid' },
  ],
  'eng-3': [
    { word: 'I went to school yesterday', translation: 'Je suis alle a l\'ecole hier' },
    { word: 'She ate breakfast', translation: 'Elle a mange le petit dejeuner' },
    { word: 'Did you go?', translation: 'Es-tu alle ?' },
    { word: 'I will travel next summer', translation: 'Je voyagerai l\'ete prochain' },
    { word: 'There are three cats', translation: 'Il y a trois chats' },
  ],
  'eng-4': [
    { word: 'Once upon a time', translation: 'Il etait une fois' },
    { word: 'The children are playing', translation: 'Les enfants jouent' },
    { word: 'I\'m looking forward to it', translation: 'J\'ai hate' },
    { word: 'She was tired, so she went to bed', translation: 'Elle etait fatiguee, alors elle est allee au lit' },
  ],
  'eng-5': [
    { word: 'Could you help me, please?', translation: 'Pourriez-vous m\'aider, s\'il vous plait ?' },
    { word: 'I would like a glass of water', translation: 'Je voudrais un verre d\'eau' },
    { word: 'How much is it?', translation: 'Combien ca coute ?' },
    { word: 'I disagree', translation: 'Je ne suis pas d\'accord' },
    { word: 'Excuse me, where is the station?', translation: 'Excusez-moi, ou est la gare ?' },
  ],
}

// ─── Fonction de pronunciation via Web Speech API ────────────────────
export function speak(text, lang = 'en-US') {
  if (!('speechSynthesis' in window)) return false

  window.speechSynthesis.cancel()
  const utterance = new SpeechSynthesisUtterance(text)
  utterance.lang = lang
  utterance.rate = 0.85 // Slightly slower for learners
  utterance.pitch = 1

  // Try to find a native voice for the language
  const voices = window.speechSynthesis.getVoices()
  const nativeVoice = voices.find(v => v.lang.startsWith(lang.split('-')[0]) && v.localService)
  if (nativeVoice) utterance.voice = nativeVoice

  window.speechSynthesis.speak(utterance)
  return true
}

export function hasSpeechSupport() {
  return 'speechSynthesis' in window
}
