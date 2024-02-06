const primeiro = 0
const segundo = 1


function isInFibonacciSequence(number: number): string {
  if (number < 0) {
    return `${number} Não é um número válido, informe outro.`
  }
  let fibSeq = [primeiro, segundo];
  while (fibSeq[fibSeq.length - 1] + fibSeq[fibSeq.length - 2] <= number) {
    fibSeq.push(fibSeq[fibSeq.length - 1] + fibSeq[fibSeq.length - 2])
  }

  for (const element of fibSeq) {
    if (element === number) {
      return `Número ${number} está na sequência.`
    }
  }
  return `Número ${number} não está na sequência.`
}


console.log(isInFibonacciSequence(56))