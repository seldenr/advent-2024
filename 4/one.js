import * as fs from "node:fs/promises"

const inputFile = await fs.readFile("./input.txt", "utf-8")

const rows = inputFile.split('\n').map((line) => line.split(''))

const rowCount = rows.length
const colCount = rows[0].length

let maxCount = Math.ceil(Math.sqrt((rowCount * rowCount) + (colCount * colCount)))
console.log(maxCount)

let total = 0

rows.forEach((row, rowIndex) => {
  row.forEach((char, colIndex) => {
    if (char !== 'X') return

    const horizontalRight = row.slice(colIndex)
    const horizontalLeft = row.slice(0, colIndex)
    const verticalDown = Array(maxCount).fill().map((_, index) => rows[rowIndex + index]?.[colIndex])
    const verticalUp = Array(maxCount).fill().map((_, index) => rows[rowIndex - index]?.[colIndex])

    const toNW = Array(maxCount).fill().map((_, index) => rows[rowIndex - index]?.[colIndex - index])
    const toNE = Array(maxCount).fill().map((_, index) => rows[rowIndex - index]?.[colIndex + index])
    const toSW = Array(maxCount).fill().map((_, index) => rows[rowIndex + index]?.[colIndex - index])
    const toSE = Array(maxCount).fill().map((_, index) => rows[rowIndex + index]?.[colIndex + index])

    const tests = [
      horizontalRight,
      horizontalLeft,
      verticalDown,
      verticalUp,
      toNW,
      toNE,
      toSW,
      toSE,
    ]

    total += tests.filter((test) => {
      let current = ''
      let matches = false
      test.forEach((char) => {
        const charTest = current += char

        if ('XMAS'.startsWith(charTest)) {
          current = charTest
        }

        if (current === 'XMAS') {
          matches = true
        }
      })

      return matches
    }).length
  })
})

console.log(total)
