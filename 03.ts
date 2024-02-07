import * as fs from 'fs'

const leitura = (): unknown => {
  return JSON.parse(fs.readFileSync('./dados.json', 'utf8'))
}

type Data = {
  dia: number,
  valor: number
}

function findMinAndMaxTurnover(data: Array<Data>): { min: string, max: string } {
  let minTurnover = Infinity
  let dayMin = 0
  let maxTurnover = 0
  let dayMax = 0

  for (let item of data) {
    if (item.valor < minTurnover && item.valor > 0) {
      minTurnover = item.valor
      dayMin = item.dia
    }
    if (item.valor > maxTurnover) {
      maxTurnover = item.valor
      dayMax = item.dia
    }
  }

  return {
    min: `O menor valor de faturamento foi de R$ ${minTurnover.toFixed(2).replace(".", ",")} no dia ${dayMin}.`,
    max: `O maior valor de faturamento foi de R$ ${maxTurnover.toFixed(2).replace(".", ",")} no dia ${dayMax}.`
  }
}

function turnoverHigherThanAverage(data: Array<Data>): string {
  let totalTurnhover = 0
  let daysOfWork = 0
  let result: Array<string> = []

  for (let item of data) {
    if (item.valor !== 0) {
      totalTurnhover += item.valor
      daysOfWork += 1
    }
  }

  const averageTurnover = Math.floor(totalTurnhover / daysOfWork)

  for (let item of data) {
    if (item.valor > averageTurnover && item.valor != 0) {
      result.push(`${item.dia}: R$ ${item.valor.toFixed(2).replace(".", ",")}`)
    }
  }

  if (result.length === 0) {
    return 'Não há dias com faturamento superior à média.'
  }

  return `Tivemos ${result.length} dias onde o faturamento foi superior à média. Foram eles:\n${result.join('\n')}`
}

const data = leitura() as Array<Data>
const { min, max } = findMinAndMaxTurnover(data)
console.log(min)
console.log(max)
console.log(turnoverHigherThanAverage(data))
