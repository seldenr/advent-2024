import * as fs from "node:fs/promises"

const inputFile = await fs.readFile("./input.txt", "utf-8")

const input = inputFile.split('\n').join('').split('')

let total = 0
let enabledTotal = 0
let current = ''
let inSequence = false
let hasComma = false
let a = ''
let b = ''
let enabled = true

const reset = () => {
  current = ''
  inSequence = false
  hasComma = false
  a = ''
  b = ''
}

input.forEach((char) => {
  const test = current + char
  if (inSequence) {
    if (char === ',') {
      if (hasComma) {
        reset()
        return
      } else {
        hasComma = true
        return
      }
    }
    if (char === ')') {
      const result = (Number(a) * Number(b))
      total += result
      if (enabled) {
        enabledTotal += result
      }
      reset()
      return
    }
    if (isNaN(Number(char))) {
      reset()
      return
    } else {
      if (hasComma) {
        b += char
      } else {
        a += char
      }
    }
  } else {
    if (test === 'mul(') {
      inSequence = true
      return
    }

    if (test === "don't()") {
      enabled = false
      reset()
      return
    }
    if (test === 'do()') {
      enabled = true
      reset()
      return
    }

    if ('mul('.startsWith(test) || "don't()".startsWith(test) || 'do()'.startsWith(test)) {
      current += char
      return
    } else {
      reset()
      return
    }
  }
})

console.log('partOne', total)
console.log('partTwo', enabledTotal)
