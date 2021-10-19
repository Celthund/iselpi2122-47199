'use strict'
module.exports = {
    'filterProperties': filterProperties,
    'filterPropertiesN': filterPropertiesN
}

function filterProperties(propNames, obj) {
    // Receives a string array in propNames and an object in obj. Returns a new object with the properties from obj whose names are present in propNames.
    // If propNames contains names that do not exist in obj, those properties are not added to the returned object.
    propNames.sort()
    let return_object = {}
    propNames.forEach((prop) => {
        if (obj[prop] != undefined)
            return_object[prop] = obj[prop]
    })
    return return_object
}

function filterPropertiesN(propNames, objs) {
    //Receives a string array in propNames and an object array in objs. Returns a new object array with objects produced by applying the filterProperties function with propNames to each object in objs.
    //NOTE: In this implementation, the usage of any cycle instruction (for/while) or the Array.forEach method reduces the grade in 50%.
    return objs.map(obj => filterProperties(propNames, obj))
}

function zip(a, combiner) {
    /*
    Add the zip(a, combiner) method to the Array type.

    The zip function receives another array as argument a and a combiner function as combiner.
    The combiner function takes two arguments and returns the combination of those arguments.
    Function zip returns an array with every combination of elements at the same position in both arrays (this and a).
    The returned array has the length of the smallest of the combined arrays. Some usage examples of zip function follow:
    */
    let smallest_array, biggest_array
    if (this.length > a.length) {
        smallest_array = a
        biggest_array = this
    } else {
        smallest_array = this
        biggest_array = a
    }

    return smallest_array.map((curr_value, index) => combiner(curr_value, biggest_array[index]))
}

Array.prototype.zip = zip