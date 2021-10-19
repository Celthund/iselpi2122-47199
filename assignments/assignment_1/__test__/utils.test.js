'use strict'

const { expect } = require('@jest/globals')
const { filterProperties, filterPropertiesN } = require('../lib/utils.js')

/**
 * filterProperties test
 */
test('Filter properties of an object with names in a array.', () => {
  const o = { a: 1, b: 'Thor', c: [1, 2, 3], d: { x: 10 }, e: 2, f: 'Captain America' }
  const props1 = ['b', 'd', 'g', 'a']

  const oFiltered = filterProperties(props1, o)
  expect(oFiltered).toEqual({ "a": 1, "b": "Thor", "d": { "x": 10 } })
}
)


/**
 * filterPropertiesN test
 */
test('Filter properties of each object in a array with names given by another array.', () => {
  const objs = [
    { a: 1, b: 'Thor', c: [1, 2, 3], d: { x: 10 }, e: 2, f: 'Captain America' },
    { b: 'Hulk', a: [1, 2, 3], d: { x: 10 }, e: 2, g: false },
    { x: 'Vision', y: false }
  ]

  const props2 = ['b', 'd', 'g', 'a']
  const objsFiltered = filterPropertiesN(props2, objs)
  expect(objsFiltered).toEqual([{ "a": 1, "b": "Thor", "d": { "x": 10 } }, { "a": [1, 2, 3], "b": "Hulk", "d": { "x": 10 }, "g": false }, {}])
}
)
/**
 * zip test
 */
test('Zip 2 arrays with a given function.', () => {

  let array = [1, 2, 3].zip([4, 5, 6], function (left, right) { return left + right })
  expect(array).toEqual([5, 7, 9])

  array = [1, 2, 3].zip([4, 5, 6, 7, 8], (left, right) => left + right)
  expect(array).toEqual([5, 7, 9])

  array = [1, 2, 3].zip([4, 5], (left, right) => left + right)
  expect(array).toEqual([5, 7])

  array = [1, 2, 3].zip([], (left, right) => left + right)
  expect(array).toEqual([])

  array = [].zip([1, 2, 3], (left, right) => left + right)
  expect(array).toEqual([])
}
)



