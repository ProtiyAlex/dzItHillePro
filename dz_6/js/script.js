const students = [
  {
    name: "John Smith",
    marks: [10, 8, 6, 9, 8, 7],
  },
  {
    name: "John Doe",
    marks: [9, 8, 7, 6, 7],
  },
  {
    name: "Thomas Anderson",
    marks: [6, 7, 10, 8],
  },
  {
    name: "Jean-Baptiste Emanuel Zorg",
    marks: [10, 9, 8, 9],
  },
];

middleStudents(students);
middleGroup(students);

function middleStudents(arr) {
  arr.forEach((item) =>
    console.log(
      `Имя: ${item.name}, средняя оценка - ${middleValue(item.marks)} `
    )
  );
}

function middleGroup(arr) {
  let joinArr = [];

  arr.forEach((item) => (joinArr = joinArr.concat(item.marks)));

  console.log(`Средний балл группы = ${middleValue(joinArr)}`);
}

function middleValue(arr) {
  debugger;
  return arr.reduce((sum, item) => sum + item) / arr.length;
}
