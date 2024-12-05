import * as fs from "node:fs/promises"

const inputFile = await fs.readFile("./input.txt", "utf-8")

const rows = inputFile.split('\n').map((line) => line.split(''))

const rowCount = rows.length
const columnCount = rows[0].length

let total = 0

const testPair = (charA, charB) => {
  return [charA, charB].includes('S') && [charA, charB].includes('M')
}

rows.forEach((row, rowIndex) => {
  if (rowIndex === 0 || rowIndex === rowCount - 1) return
  row.forEach((char, colIndex) => {
    if (colIndex === 0 || colIndex === columnCount - 1) return

    if (char === 'A') {
      const northRow = rows[rowIndex - 1]
      const southRow = rows[rowIndex + 1]
      
      const NW = northRow[colIndex - 1]
      const NE = northRow[colIndex + 1]
      const SW = southRow[colIndex - 1]
      const SE = southRow[colIndex + 1]

      if (testPair(NW, SE) && testPair(NE, SW)) {
        total++
      }
    }
  })
})

console.log(total)
