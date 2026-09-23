// One mapping controls the artwork class and root tokens for each visible page.
export const stageEnvironments = {
  'pre-boss': ['eye-forest', 'environment-eye'],
  'pre-skeletron': ['dungeon-entrance', 'environment-entrance'],
  'pre-wof': ['underworld', 'environment-underworld'],
  'pre-mechanicals': ['mechanical-night', 'environment-mechanical'],
  'pre-plantera': ['jungle', 'environment-jungle'],
  'pre-golem': ['temple', 'environment-temple'],
  'event-upgrades': ['event-night', 'environment-events'],
  'optional-bosses': ['optional-day', 'environment-optional'],
  'pre-lunatic': ['cult-ritual', 'environment-cult'],
  'celestial-pillars': ['celestial', 'environment-celestial'],
  'pre-moon-lord': ['moon-lord', 'environment-moon-lord'],
}

export function getEnvironment(view, stageId) {
  if (view === 'gear') return stageEnvironments[stageId] || null
  if (view === 'npcs') return ['town', '']
  if (view === 'fishing') return ['snow-fishing', '']
  return null
}
