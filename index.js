const mergeSort = (unsortedArray) => {
    // In order to divide the array in half, we need to figure out the middle
    const middle = Math.floor(unsortedArray.length / 2);
  
    // This is where we will be dividing the array into left and right
    const left = unsortedArray.slice(0, middle);    
    const right = unsortedArray.slice(middle);

    // No need to sort the array if the array only has one element or empty
    if (unsortedArray.length <= 1) {
        console.log('return from mergeSort: ', unsortedArray)
      return unsortedArray;
    }

    // Using recursion to combine the left and right (base case)
    return merge(
      mergeSort(left), mergeSort(right)
    );
  }
  
  // Merge the two arrays: left and right
  const merge = (left, right) => {

    let result = []; 
    let leftIndex = 0; 
    let rightIndex = 0;
    console.log('merge', left, right)

    // We will concatenate values into the result in order
    while (leftIndex < left.length && rightIndex < right.length) {
      if (left[leftIndex] < right[rightIndex]) {
        result.push(left[leftIndex]);
        console.log('left', left[leftIndex])
        leftIndex++; // move left array cursor
      } else {
        result.push(right[rightIndex]);
        console.log('right', right[rightIndex])
        rightIndex++; // move right array cursor
      }
    }

    console.log('return merge ', result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex)))
    // We need to concat to the result because there will be one element left over after the while loop
    return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
  }

//   console.log(mergeSort([3,1,4,2]));

const merge2 = (left, right) => {
    let result = [];
    let i = 0;
    let j = 0;

    while (left.length > i  && right.length > j) {
        if (left[i] <= right[j]) {
            result.push(left[i])
            i++
        } else {
            result.push(right[j])
            j++
        }
    }
    return result.concat(left.slice(i)).concat(right.slice(j));
}

const mergeSort2 = (arr) => { 
    let left = [];
    let right = [];
    let result;

    if (arr.length <= 1) {
       return arr;
    }

    let mid = Math.floor(arr.length / 2);
    
    for (let i = 0; i < mid; i++) {
       left.push(arr[i]);
    }

    for (let j = mid; j < arr.length; j++) {
       right.push(arr[j]);
    }

    let leftValue = mergeSort2(left);
    let rightValue = mergeSort2(right);

    if (leftValue <= rightValue) {
        result = merge2(leftValue, rightValue);
    } else {
        result = merge2(rightValue, leftValue);
    }


    return result;
} 





  
  console.log(mergeSort([2,1,100,4,3,9]))
