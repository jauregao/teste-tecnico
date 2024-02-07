import * as fs from 'fs';

const leitura = (): unknown => {
  return JSON.parse(fs.readFileSync('./faturamento.json', 'utf8'));
}

type Data = {
  estado: string,
  faturamento: number
}

function calculatePercentage(): Array<Object> {

  const data = leitura() as Array<Data>
  let percentageList: Array<Object> = []

  let totalTurnhover = 0

  for (let item of data) {
    totalTurnhover += item.faturamento
  }

  for (let item of data) {
    const percentage = ((item.faturamento / totalTurnhover) * 100).toFixed(2)
    percentageList.push({ estado: item.estado, faturamento: "R$ " + item.faturamento.toString(), percentual: percentage + "%" })
  }

  return percentageList
}

console.log(calculatePercentage())
