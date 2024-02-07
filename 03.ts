import * as fs from 'fs';

const leitura = (): unknown => {
  return JSON.parse(fs.readFileSync('./dados.json', 'utf8'));
}

type Data = {
  dia: number,
  valor: number
}

function findMinTurnover(): string {

  const data = leitura() as Array<Data>

  let minTurnover = Infinity
  let dayMin = Infinity

  for (let item of data) {
    if (item.valor < minTurnover) {
      if (item.valor > 0) {
        minTurnover = item.valor;
        dayMin = item.dia
      }
    }
  }

  return `O menor valor de faturamento foi de ${minTurnover} no dia ${dayMin}.`
}


function findMaxTurnover(): string {

  const data = leitura() as Array<Data>

  let maxTurnover = 0
  let dayMax = 0

  for (let item of data) {
    if (item.valor > maxTurnover) {
      maxTurnover = item.valor
      dayMax = item.dia
    }
  }

  return `O maior valor de faturamento foi de ${maxTurnover} no dia ${dayMax}.`
}

function turnoverHigherThanAverage(): string {

  const data = leitura() as Array<Data>

  let totalTurnhover = 0
  let daysOfWork = 0
  let result: Array<string> = []
  let daysWithHigherTurnover = 0

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
      daysWithHigherTurnover++
    }
  }

  if (result.length === 0) {
    return 'Não há dias com faturamento superior ao média.'
  }

  return `Tivemos ${daysWithHigherTurnover} dias onde o faturamento foi superior a média.
Foram eles:\n${result.join('\n')}`
}

console.log(findMinTurnover())
console.log(findMaxTurnover())
console.log(turnoverHigherThanAverage())

