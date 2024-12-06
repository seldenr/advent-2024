import * as fs from "node:fs/promises"

const inputFile = await fs.readFile("./input.txt", "utf-8")

const rules = []
const updates = []

inputFile.split('\n').forEach((line) => {
  if (line.includes('|')) {
    rules.push(line.split('|').map(Number))
  } else if (line.includes(',')) {
    updates.push(line.split(',').map(Number))
  }
})

const [valid, invalid] = updates.reduce(([valid, invalid], update) => {
  const indexLookup = update.reduce((lookup, value, index) => ({ ...lookup, [value]: index }), {})
  const set = new Set(update)

  const isValid = rules.every(([a, b]) => {
    if (!set.has(a) || !set.has(b)) return true

    return indexLookup[a] < indexLookup[b]
  })

  return isValid ? [[...valid, update], invalid] : [valid, [...invalid, update]]
}, [[], []])


const partOne = valid.reduce((total, update) => total + update[Math.floor(update.length / 2)], 0)

console.log('partOne', partOne)

const partTwo = invalid.map((update) => update.sort((a, b) => {
  const rule = rules.find((rule) => {
    const set = new Set(rule)

    return set.has(a) && set.has(b)
  })

  if (!rule) return 0
  return a === rule[0] ? -1 : 1
})).reduce((total, update) => total + update[Math.floor(update.length / 2)], 0)

console.log('partTwo', partTwo)
