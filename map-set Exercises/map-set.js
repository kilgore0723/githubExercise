// Quick Question #1
// What does the following code return?
// new Set([1,1,2,2,3,4]) // {1,2,3,4}

// Quick Question #2
// What does the following code return?
// [...new Set("referee")].join("") // 'ref'

// Quick Questions #3
// What does the Map m look like after running the following code?
// let m = new Map();
// m.set([1,2,3], true);
// m.set([1,2,3], false);
// 0:{Array(3) => true}
// 1:{Array(3) => false}

function hasDuplicate(arr) {
  return new Set(arr).size !== arr.length;
}

function vowelCount(str) {
  const vowels = "aeiouAEIOU";
  let strMap = new Map();
  for (let char of str) {
    if (vowels.includes(char)) {
      strMap.set(char, (strMap.get(char) || 0) + 1);
    }
  }
  return strMap;
}
