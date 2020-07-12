function createCalc(baseValue) {
  return {
    add: (value) => (baseValue += value),
    sub: (value) => (baseValue -= value),
    div: (value) => (baseValue /= value),
    mult: (value) => (baseValue *= value),
    set: (value) => (baseValue = value),
  };
}

module.exports = createCalc();
