import { summonAcquisition } from './summonAcquisition.js'

export const summonItems = summonAcquisition

export const summonWiki = name => `https://terraria.wiki.gg/wiki/${encodeURIComponent(name.replaceAll('’', "'").replaceAll(' ', '_'))}`
const names = Object.keys(summonItems).sort((a, b) => b.length - a.length)
const pattern = new RegExp(`(${names.map(name => name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'g')
export const splitSummonText = text => text.split(pattern)
