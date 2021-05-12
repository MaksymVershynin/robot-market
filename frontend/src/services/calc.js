export const formatDate = (date) => {
    return `${date.slice(8,10)}-${date.slice(5,7)}-${date.slice(0,4)}`
}

// function isObject(object) {
//     return object != null && typeof object === 'object';
// }

// export const isObjectsOfArrayEqual = (object1, object2) => {
//     const keys1 = Object.keys(object1);
//     const keys2 = Object.keys(object2);

//     if (keys1.length !== keys2.length) {
//       return false;
//     }
  
//     for (const key of keys1) {
//       const val1 = object1[key];
//       const val2 = object2[key];
//       const areObjects = isObject(val1) && isObject(val2);
//       if (
//         areObjects && !isObjectsOfArrayEqual(val1, val2) ||
//         !areObjects && val1 !== val2
//       ) {
//         return false;
//       }
//     }
  
//     return true;
// }

export const deletedDublicates_array = (array) => {
    return array.filter((value, index) => array.indexOf(value) === index);
}

export const summElements_array = (array) => {
  var sum = 0;
  for(var i = 0; i < array.length; i++){
    sum += Number(array[i]);
  }
  return sum
}