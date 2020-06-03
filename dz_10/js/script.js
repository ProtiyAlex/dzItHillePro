const calc = createCalculator(10);

function createCalculator(argumentA) {
  let result = argumentA;
  const calcObj = {
    sum: (argumentB) => (result += argumentB),
    mult: (argumentB) => (result *= argumentB),
    div: (argumentB) => (result /= argumentB),
    sub: (argumentB) => (result -= argumentB),
    set: (argumentB) => (result = argumentB),
  };
  return calcObj;
}

calc.sum(5);
calc.mult(10);
calc.sub(40);

console.log(calc.div(10));
calc.set(0);
