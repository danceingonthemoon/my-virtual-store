function mergeAndExtract(array1, array2) {
  // Your implementation here
  const mergedArrays = [...array1, ...array2];
  let result = { first: 0, second: 0, remaining: 0 };
  //   const [first, second, ...remaining] = mergedArrays;

  //   return {
  //     first: first,
  //     second: second,
  //     remaining: remaining,
  //   };

  function firstSec() {
    result.first = mergedArrays[0];
    console.log(result.first);
    result.second = mergedArrays[1];
    result.remaining = mergedArrays.slice(2);
  }
  firstSec();
  return result;
}

array1 = [1, 2, 3];
array2 = [3, 4, 5];
const result = mergeAndExtract(array1, array2);
console.log(result);
