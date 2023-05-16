export default function getAllIndexes(arr, val) {
    let indexes = []
    arr.forEach((element, index) => element === val && indexes.push(index));
    return indexes;
  }