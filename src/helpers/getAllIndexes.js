export default function getAllIndexes(arr, val) {
    var indexes = [],
      i;
    // for (i = 0; i < arr.length; i++) if (arr[i] === val) indexes.push(i);
    indexes.forEach(() => indexes.push(val));
    return indexes;
  }