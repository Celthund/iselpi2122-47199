function min(a, b){
    if (a < b)
        return a
    return b    
}
console.log(min(0, 10));
console.log(min(0, -10));

function isEven(number){
    if (number < 0 )
        return undefined
    if (number == 0)
        return true
    if (number == 1)
        return false
    return isEven(number - 2)
}
console.log(isEven(50));
// → true
console.log(isEven(75));
// → false
console.log(isEven(-1));
// → ??

// Your code here.
countChar = (string, char) => {
    let count = 0
    for (let c of string) {
        if (c == char)
            count++
    }
    return count
}


countBs = string => {
    return countChar(string, "B")
}


function countCharRecursive (string, char) {
    if (string.length == 0)
        return 0
    if (string.charAt(0) == char)
        return countCharRecursive(string.substring(1), char) + 1
    return countCharRecursive(string.substring(1), char)
}


countBsRecursive = string => {
    return countCharRecursive(string, "B")
}
console.log(countBs("BBC"));
// → 2
console.log(countChar("kakkerlak", "k"));
// → 4

console.log(countBsRecursive("BBC"));
// → 2
console.log(countCharRecursive("kakkerlak", "k"));
// → 4
