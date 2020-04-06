
/**
 * Merge Implementation
 * Shared merge function for both Merg Sort implementations
 * @param {array} (left) 
 * @param {array} (right) 
 */
const merge = (left, right) => {

    // Initialize a result array where the final sorted array is pushed to
    // Initialize 2 iteration variables i & j
    let result = [];
    let i = 0;
    let j = 0;

    // A while loop that pushes the lowest number between the left and right array into the result array
    // This loop stops running when either iterator (i or j) becomes greater than then length of the array its tracking
    // Because of the exit condition to the while loop there is always a remaining element in one of the arrays (left or right)
    while (left.length > i  && right.length > j) {
        if (left[i] <= right[j]) {
            result.push(left[i])
            i++
        } else {
            result.push(right[j])
            j++
        }
    }

    // We return the sorted array and add on the remaning element of both left and right arrays
    // We use .concat() to join them
    // The .slice() method creates a copy of the each array starting at some index indicated by the iterators
    // This means that the remaing element is added on to the end of the left or right away before concatenation
    // Returning sorted array
    return result.concat(left.slice(i)).concat(right.slice(j));
}


/**
 * Recursive Merge Sort Implementation
 * Version 1
 * @param {array} (unsortedArray)
 * @return {function} (merge function)
 */
const recursiveMergeSort1 = (unsortedArray) => {

    // Find the the middle index of the unsortedArray
    const middle = Math.floor(unsortedArray.length / 2); 

    // Create 2 arrays 
    // The left array contains elements from the 1st half of the sortedArray
    // The righ array contains elements from the 2nd half of the sortedArray
    const left = unsortedArray.slice(0, middle);   
    const right = unsortedArray.slice(middle);

    // Once the unsorted array only contains 1 elements we return it
    if (unsortedArray.length <= 1) {
      return unsortedArray;
    }

    // Using recursion
    // We continually call recursiveMergeSort() the left and right until the array's are reduced to 1 element each
    // Once the left and right are 1 element each the recursiveMergeSort() returns the base case shown above at line 21
    // These base cases become the params for the merge function called below
    return merge(recursiveMergeSort1(left), recursiveMergeSort1(right));
  }

  
/**
 * Recursive Merge Sort Implementation
 * Version 2
 * @param {array} (unsorted array) 
 * @return {array} (sorted array) 
 */
const recursiveMergeSort2 = (arr) => { 

    // Initialize left and right sub arrays that split the arr param
    // Initialize the result variable
    let left = [];
    let right = [];
    let result;

    // Once the arr only contains 1 elements we return it
    if (arr.length <= 1) {
        return arr;
    }

    // Initialize mid variable that tracks middle index of arr
    let mid = Math.floor(arr.length / 2);

    // Add all elements before middle index to left array
    for (let i = 0; i < mid; i++) {
        left.push(arr[i]);
    }

    // Add all elements affter middle index to right array
    for (let j = mid; j < arr.length; j++) {
        right.push(arr[j]);
    }

    // Initializ left and right values using 
    let leftValue = recursiveMergeSort2(left);
    let rightValue = recursiveMergeSort2(right);

    if (leftValue <= rightValue) {
        result = merge(leftValue, rightValue);
    } else {
        result = merge(rightValue, leftValue);
    }

    return result;
} 


console.log('Recursive Version 1: ', recursiveMergeSort1([2,1,100,4,3,9]))
console.log('Recursive Version 2: ', recursiveMergeSort2([2,1,100,4,3,9]))



/**
 * Iterative Merge Sort Implementation
 * Version 1
 * @param {array} (arr) 
 * @return {array} (sorted arrary) 
 */
const iterativeMergeSort = (arr) => {
    // make a copy of the arr 
    let result = arr;

    // length of the sort arr
    let len = result.length;

    // Creates a buffer to push all result elements into on each iteration
    let buffer = [];

    // size increases by 2 every loop
    for (let size = 1; size < len; size *= 2) {
        // leftStart increases by 2 * size every loop
        // This acts as the first index of each pair in the arr
        for (let leftStart = 0; leftStart < len; leftStart += 2 * size) {
            
            // The left index is a copy of the leftStart
            let left = leftStart;
            // The right index will be the smaller of the left + the current size or the length of the array 
            let right = Math.min(left + size, len);
            // The left limit will be whatever the right index is
            let leftLimit = right; 
            // The right limit will be the smaller of the right + the current size or the length of the array
            let rightLimit = Math.min(right + size, len);
            // The iterator will be a copy of the left
            let i = left;

            // The first while loop will check if the left and right indexes are both less than their limits
            // Then it will push which ever value is smaller into the buffer array, increases the iterator and the index values, exit the loop
            while (left < leftLimit && right < rightLimit) {
                if (result[left] <= result[right]) {
                    buffer[i] = result[left];
                    left++
                    i++
                } else {
                    buffer[i] = result[right];
                    right++
                    i++
                }
            }

            // These while loops clean up the remaining value (the larger of 2 values compared above) 
            // The loops check to see which index has not been increased

            // This loop checks if the left index is smaller than its limit and if so adds that value to the buffer 
            while (left < leftLimit) {
                buffer[i] = result[left];
                left++
                i++
            }

            // This loop checks if the right index is smaller than its limit and if so adds that value to the buffer 
            while (right < rightLimit) {
                buffer[i] = result[right];
                right++
                i++
            }
        }

        // These are initialized after each inner loop completes
        // Create a temp array that is a copy of the original result array (unsorted values)
        // The result array replaces all of its values with the buffer array (fully or partially sorted)
        // The buffer then copies the unsorted temp array, which is used again in the next inner loop iteration
        let temp = result;
            result = buffer;
            buffer = temp;
    }

    return result;
}

console.log('Iterative: ', iterativeMergeSort([2,1,100,4,3,9]))