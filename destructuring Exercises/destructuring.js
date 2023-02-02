// Object Destructuring 1
// console.log(numPlanets); // 8
// console.log(yearNeptuneDiscovered); // 1846

// Object Destructuring 2
/*console.log(discoveryYears); // 
{ yearNeptuneDiscovered: 1846, yearMarsDiscovered: 1659 }*/

// Object Destructuring 3
// 'Your name is Alejandro and you like purple'
// 'Your name is Melissa and you like green'
// 'Your name is undefined and you like green'

// Array Destructuring 1
// console.log(first); // Maya
// console.log(second); // Marissa
// console.log(third); // Chi

// Array Destructuring 2
// console.log(raindrops); // "Raindrops on roses"
// console.log(whiskers); // "whiskers on kittens"
// console.log(aFewOfMyFavoriteThings); // ["Bright copper kettles",
// "warm woolen mittens",
// "Brown paper packages tied up with strings"]

// Array Destructuring 3
// console.log(numbers) // [10, 30, 20]

// ES2015 Refactoring
// ES5 Assigning Variables to Object Properties
const obj = {
  numbers: {
    a: 1,
    b: 2,
  },
};

// var a = obj.numbers.a;
// const {
//   numbers: { a },
// } = obj;

// // var b = obj.numbers.b;
// const {
//   numbers: { b },
// } = obj;

const { a, b } = obj.numbers;

// ES5 Array Swap
// var arr = [1, 2];
// var temp = arr[0];
// arr[0] = arr[1];
// arr[1] = temp;
const arr = [1, 2];
[arr[0], arr[1]] = [arr[1], arr[0]];

// Write a function called raceResults which accepts a single array argument.
// It should return an object with the keys first, second, third, and rest.
const raceResults = ([first, second, third, ...results]) => ({
  first,
  second,
  third,
  results,
});
