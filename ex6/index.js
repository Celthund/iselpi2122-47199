let arrays = [[1, 2, 3], [4, 5], [6]];
// Your code here.
function flatten(array) {
    return array.reduce((p, c) => p.concat(c), [])
}
// → [1, 2, 3, 4, 5, 6]
arrays = flatten(arrays)
console.log(JSON.stringify(arrays))


// Your code here.
function loop(value, test_function, update_function, body_function) {
    while (test_function(value)) {
        body_function(value)
        value = update_function(value)
    }
    return false
}

function loop_recursive(value, test_function, update_function, body_function) {
    if (!test_function(value)) return false
    body_function(value)
    value = update_function(value)
    loop(value, test_function, update_function, body_function)
}
loop(3, n => n > 0, n => n - 1, console.log);
// → 3
// → 2
// → 1

function every_loop(array, test) {
    for (i = 0; i < array.length; i++) {
        if (!test(array[i])) return false
    }
    return true
}


function every_some(array, test) {
    return !array.some(value => !test(value))
}

console.log(every_loop([1, 3, 5], n => n < 10));
// → true
console.log(every_loop([2, 4, 16], n => n < 10));
// → false
console.log(every_loop([], n => n < 10));
// → true

console.log(every_some([1, 3, 5], n => n < 10));
// → true
console.log(every_some([2, 4, 16], n => n < 10));
// → false
console.log(every_some([], n => n < 10));
// → true