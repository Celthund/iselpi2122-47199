


function range(start, end, step){
    const array = []
    for (let i = start; step > 0 ? i <= end : i >= end ; i += step) {
        array.push(i)
    }
    return array
}

console.log(range(1, 10, 2)) // [1, 3, 5, 7, 9]
console.log(range(5, 2, -1)) // [5, 4, 3, 2]
console.log(range(5, 2, 1))
console.log(range(2, 2, 1))

function prepend(value, rest){
    return {
        "value": value,
        "rest": rest
    }
}

function arrayToList(array){
    list = null
    for (let i = array.length - 1; i >= 0; i--){
        list = prepend(array[i], list)
    }
    return list
}

function listToArray(list){
    array = []
    while(list != null){
        array.push(list.value)
        list = list.rest
    }
    return array
}

function nth(list, index){
    respond = list
    for (let i = 0; i < index && list != null; i++){
        list = list.rest
    }
    return list == null ? undefined : list.value
}


function nth(list, index){
    if (list == null) return undefined
    if (index == 0) return list.value
    return nth(list.rest, --index)
}

console.log(JSON.stringify(arrayToList([10, 20])));
// → {value: 10, rest: {value: 20, rest: null}}
console.log(JSON.stringify(listToArray(arrayToList([10, 20, 30]))));
// → [10, 20, 30]
console.log(JSON.stringify(prepend(10, prepend(20, null))));
// → {value: 10, rest: {value: 20, rest: null}}
console.log(nth(arrayToList([10, 20, 30]), 1));
// → 20



function deepEqual(obj1, obj2){
    if (obj1 === obj2) return true
    if (!(obj1 && obj2)) return false
    for (const key in obj1) {
        if (deepEqual(obj1[key], obj2[key]) == false) return false
    }
    return true
}


let obj = {here: {is: "an"}, object: 2};
console.log(deepEqual(obj, obj));
// → true
console.log(deepEqual(obj, {here: 1, object: 2}));
// → false
console.log(deepEqual(obj, {here: {is: "an"}, object: 2}));
// → true
