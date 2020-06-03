const SIZE_SMALL = { price: 50, calories: 20 },
  SIZE_MED = { price: 75, calories: 30 },
  SIZE_BIG = { price: 100, calories: 40 },
  TOPPING_CHEESE = { price: 10, calories: 20 },
  TOPPING_SALAD = { price: 20, calories: 5 },
  TOPPING_POTATO = { price: 15, calories: 10 },
  TOPPING_FLAVORING = { price: 15, calories: 0 },
  TOPPING_MAYON = { price: 20, calories: 5 };

function Hamburger(hamgSizeObj) {
  this.price = [hamgSizeObj.price];
  this.calories = [hamgSizeObj.calories];
}

Hamburger.prototype.getPrice = function () {
  return sum(this.price);
};
Hamburger.prototype.getCalories = function () {
  return sum(this.calories);
};
function sum(arr) {
  return arr.reduce((sum, item) => sum + item);
}
Hamburger.prototype.addTopping = function (toppingObj) {
  this.price.push(toppingObj.price);
  this.calories.push(toppingObj.calories);
};

const hamburger = new Hamburger(SIZE_SMALL);
hamburger.addTopping(TOPPING_MAYON);
hamburger.addTopping(TOPPING_POTATO);

console.log("Price with sauce: " + hamburger.getPrice());
console.log("Calories with sauce: " + hamburger.getCalories());
