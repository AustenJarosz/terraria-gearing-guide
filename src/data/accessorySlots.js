import { itemNotes } from './itemNotes.js'

const worldAlternatives = {
  wormScarf: {
    id: 'brainConfusion',
    text: 'Crimson-world alternative to Worm Scarf for this slot. It offers a chance to dodge instead of constant damage reduction.',
  },
  brainConfusion: {
    id: 'wormScarf',
    text: 'Corruption-world alternative to Brain of Confusion for this slot. It offers constant damage reduction instead of a chance to dodge.',
  },
}

// A choice and a swap both replace one equipped accessory. Keep them together
// so the visible row count always matches the number of available slots.
export function getAccessorySlots(loadout) {
  return loadout.accessories.map(id => {
    const choice = loadout.accessoryChoices?.[id]
    const options = new Map()
    const addOption = (optionId, text) => {
      if (!options.has(optionId)) {
        const notes = loadout.itemNotes?.[optionId] ?? itemNotes[optionId] ?? []
        options.set(optionId, { id: optionId, notes: notes.map(note => ({ ...note })) })
      }
      const option = options.get(optionId)
      if (text && !option.notes.some(note => note.text === text)) {
        option.notes.push({ label: 'Alternative', text })
      }
    }

    addOption(id)
    for (const optionId of choice?.ids ?? []) addOption(optionId)
    for (const swap of loadout.accessorySwaps ?? []) {
      if (swap.replaces !== id) continue
      addOption(swap.id, swap.text)
      const worldAlternative = worldAlternatives[swap.id]
      if (worldAlternative) addOption(worldAlternative.id, worldAlternative.text)
    }

    return {
      id,
      options: [...options.values()],
      note: choice?.text ?? '',
      label: (choice?.label ?? '').replace(/\s*·?\s*choose one\s*$/i, '').trim(),
    }
  })
}
