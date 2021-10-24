'use strict'

const { expect } = require('@jest/globals')
const { fetchGameInfoAsync, fetchGameInfoPromise, Game, responseToGameArray, gamesInfoFromIdsFileAsync, gamesInfoFromIdsFilePromise } = require('../lib/foreword.js')
const fsPromises = require('fs').promises
jest.mock("fs", () => ({
  promises: {
    writeFile: jest.fn((filename, data)=> new Promise((resolve, reject) => {
      if(filename == "output.json")
        resolve(data)
      else
        reject(Error("Filename doesn't exist"))
    })),
    readFile: jest.fn((filename, options) => new Promise((resolve, reject) => {
      if(filename == "input.txt")
        resolve("TAAifFP590\nyqR4PtpO8X\n5H5JS0KLzK")
      else
        reject(Error("Filename doesn't exist"))
    })),
  },
}));


test('Using Async/Await to get game info with 3 ids', async () => {
  // Root, Scythe, Wingspan
  const gameids = ["TAAifFP590", "yqR4PtpO8X", "5H5JS0KLzK"]
  let gamesInfo = await fetchGameInfoAsync(gameids)
  const result = [
    new Game("TAAifFP590", "Root", "https://www.boardgameatlas.com/game/TAAifFP590/root"),
    new Game("yqR4PtpO8X", "Scythe", "https://www.boardgameatlas.com/game/yqR4PtpO8X/scythe"),
    new Game("5H5JS0KLzK", "Wingspan", "https://www.boardgameatlas.com/game/5H5JS0KLzK/wingspan")
  ]
  expect(gamesInfo).toEqual(result)
})

test('Using Async/Await to get game info with 0 ids', async () => {
  // Root, Scythe, Wingspan
  const gameids = []
  let gamesInfo = await fetchGameInfoAsync(gameids)
  const result = []
  expect(gamesInfo).toEqual(result)
})

test('Using Promises to get game info with 3 ids', () => {
  const gameids = ["TAAifFP590", "yqR4PtpO8X", "5H5JS0KLzK"]
  const result = [
    new Game("TAAifFP590", "Root", "https://www.boardgameatlas.com/game/TAAifFP590/root"),
    new Game("yqR4PtpO8X", "Scythe", "https://www.boardgameatlas.com/game/yqR4PtpO8X/scythe"),
    new Game("5H5JS0KLzK", "Wingspan", "https://www.boardgameatlas.com/game/5H5JS0KLzK/wingspan")
  ]
  const promise = fetchGameInfoPromise(gameids)
  return promise.then(value => expect(value).toEqual(result))
})

test('Using Promises to get game info with 0 ids', () => {
  const gameids = []
  const result = []
  const promise = fetchGameInfoPromise(gameids)
  return promise.catch(value => expect(value).toEqual(result))
})

test('Testing responseToGameArray with empty object argument.', () => {
  expect(responseToGameArray({})).toEqual({})
})

test('Testing responseToGameArray with object with empty games property.', () => {
  expect(responseToGameArray({"games": []})).toEqual([])
})

test('Testing gamesInfoFromIdsFilePromise with invalid input file.', () => {
  return gamesInfoFromIdsFilePromise("", "output.json").catch(res => expect(res).toEqual(Error ("Filename doesn't exist")))
})

test('Testing gamesInfoFromIdsFilePromise with valid input file and invalid output file.', () => {
  return gamesInfoFromIdsFilePromise("input.txt", "").catch(res => expect(res).toEqual(Error ("Filename doesn't exist")))
})
 
test('Testing gamesInfoFromIdsFilePromise with valid input file and output file.', () => {
  return gamesInfoFromIdsFilePromise("input.txt", "output.json").then(value => expect(value).toEqual(true))
})

test('Testing gamesInfoFromIdsFileAsync with invalid input file.', async () => {
  const result = await gamesInfoFromIdsFileAsync("", "output.json")
  expect(result).toEqual(false)
})

test('Testing gamesInfoFromIdsFileAsync with valid input file and invalid output file.', async () => {
  const result = await gamesInfoFromIdsFileAsync("input.txt", "")
  expect(result).toEqual(false)
})
 
test('Testing gamesInfoFromIdsFileAsync with valid input file and output file.', async () => {
  const value = await gamesInfoFromIdsFileAsync("input.txt", "output.json")
  expect(value).toEqual(true)
})