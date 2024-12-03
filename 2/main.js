import * as fs from "node:fs/promises"

const input = await fs.readFile("./input.txt", "utf-8")

const lines = input.split('\n').map((line) => line.split(' ').map(Number))

const evaluateLine = (line) => {
  if (line.length !== (new Set(line)).size) return false

  let valid = true
  let asc = null
  let lastValue = null

  line.forEach((value, index) => {
    if (index === 1) {
      asc = (value > lastValue) ? true : false
    } else if (index > 1) {
      const nowAsc = (value > lastValue) ? true : false

      if (nowAsc !== asc) {
        valid = false
      }
    }

    if (index > 0) {
      const diff = Math.abs(value - lastValue)
      if (diff > 3) {
        valid = false
      }
    }
    
    lastValue = value
  })

  return valid
}

const partOne = lines.reduce((total, line) => total + (evaluateLine(line) ? 1 : 0), 0)

console.log('partOne', partOne)

const evaluateLine2 = (line) => {
  if (evaluateLine(line)) return true

  const setDiff = line.length - (new Set(line)).size

  if (setDiff > 1) {
    return false
  }

  let ascs = 0
  let descs = 0
  let lastValue = null
  line.forEach((value, index) => {
    if (index > 0) {
      if (value > lastValue) {
        ascs++
      } else {
        descs++
      }
    }

    lastValue = value
  })

  if (ascs > 1 && descs > 1) return false

  if (ascs === 1 || descs === 1) {
    const correctDirection = descs === 1
    let lastValue = null
    let removeIndex = null
    line.forEach((value, index) => {
      if (index === 0) {
        lastValue = value
        return
      } else {
        const thisValueAsc = value > lastValue
        lastValue = value
        if (thisValueAsc !== correctDirection) {
          removeIndex = index - 1
        }
      }
    })
    
    const potentialCandidate = line.filter((_, index) => index !== removeIndex)
    const extraCandidate = line.filter((_, index) => index !== (removeIndex + 1))

    const candidate = potentialCandidate.length === line.length ? line.slice(1) : potentialCandidate

    return evaluateLine(candidate) || evaluateLine(extraCandidate)
  }

  lastValue = null
  const unpairedCandidate = line.map((value, index) => {
    if (index === 0) {
      lastValue = value
      return value
    } else {
      const ret = value === lastValue ? null : value
      lastValue = value
      return ret
    }
  }).filter((value) => value != null)

  if (evaluateLine(unpairedCandidate)) {
    return true
  } else if (unpairedCandidate.length !== line.length) {
    return false
  }

  let valid = true
  lastValue = null
  let clippedCandidate = null
  line.forEach((value, index) => {
    if (index === 0) {
      lastValue = value
    } else {
      const diff = Math.abs(value - lastValue)

      if (diff > 3 && index > 1 && index !== line.length - 1) {
        valid = false
      } else if (diff > 3 && clippedCandidate) {
        valid = false
      } else if (diff > 3) {
        clippedCandidate = index === 1 ? line.slice(1) : line.slice(0, line.length - 1)
      }

      lastValue = value
    }
  })

  return valid && (!clippedCandidate || evaluateLine(clippedCandidate))
}

const partTwo = lines.reduce((total, line) => {
  return total + (evaluateLine2(line) ? 1 : 0)
}, 0)

console.log('partTwo', partTwo)
