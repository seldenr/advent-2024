import * as fs from "node:fs/promises"

const input = await fs.readFile("./input.txt", "utf-8")

const lines = input.split("\n").map((line) => line.split("   ").map(Number))

const sides = lines.reduce(([a, b], [aVal, bVal]) => {
  return [[...a, aVal], [...b, bVal]]
}, [[], []])

const [a, b] = sides.map((side) => {
  return [...side].sort((a, b) => a - b)
})

const partOne = a.reduce((totalDistance, aVal, index) => {
  const bVal = b[index]

  return totalDistance + Math.abs(aVal - bVal)
}, 0)

console.log('partOne', partOne)

const bQuantityMap = b.reduce((quantityMap, value) => {
  return {
    ...quantityMap,
    [value]: (quantityMap[value] ?? 0) + 1
  }
}, {})

const partTwo = a.reduce((totalSimilarity, value) => {
  const quantityInB = bQuantityMap[value] ?? 0

  return totalSimilarity + (quantityInB * value)
}, 0)

console.log('partTwo', partTwo)
