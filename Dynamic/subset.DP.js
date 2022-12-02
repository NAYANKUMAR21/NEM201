// A Dynamic Programming solution for subset sum problem

// Returns true if there is a subset of
// set[] with sum equal to given sum
function isSubsetSum(set, n, sum) {
  // The value of subset[i][j] will be
  // true if there is a subset of
  // set[0..j-1] with sum equal to i
  let subset = new Array(sum + 1);
  console.log(subset, "array of subset");
  for (let i = 0; i < sum + 1; i++) {
    subset[i] = new Array(sum + 1);
    for (let j = 0; j < n + 1; j++) {
      subset[i][j] = 0;
    }
  }
  console.log(subset, "array modify of subset");

  // If sum is 0, then answer is true
  for (let i = 0; i <= n; i++) subset[0][i] = true;

  // If sum is not 0 and set is empty,
  // then answer is false
  for (let i = 1; i <= sum; i++) subset[i][0] = false;

  // Fill the subset table in bottom
  // up manner
  for (let i = 1; i <= sum; i++) {
    for (let j = 1; j <= n; j++) {
      subset[i][j] = subset[i][j - 1];
      console.log(subset);
      if (i >= set[j - 1])
        subset[i][j] = subset[i][j] || subset[i - set[j - 1]][j - 1];
    }
  }

  /* // uncomment this code to print table
		for (int i = 0; i <= sum; i++)
		{
		for (int j = 0; j <= n; j++)
			System.out.println (subset[i][j]);
		} */

  return subset[sum][n];
}

let set = [3, 34, 4, 12, 5, 2];
let sum = 21;
let n = set.length;
// if (isSubsetSum(set, n, sum) == true)
// console.log("Found a subset" + " with given sum");
// else
// console.log("No subset with" + " given sum");

// This code is contributed by decode2207.

function call(arr, n) {
  let ans = [];
  check(0);
  function check(x) {
    console.log(ans);
    if (x > arr.length) {
      return;
    }
    for (let i = x; i < arr.length; i++) {
      ans.push(arr[i]);
      check(i + 1);
      ans.pop();
    }
  }
}
let arr = [1,2,3,4,5]
call(arr,arr.length)


