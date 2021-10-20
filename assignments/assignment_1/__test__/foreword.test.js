'use strict'

const { expect } = require('@jest/globals')
const { getGamesInfo, getGamesInfoPromise, Game, responseToGameArray } = require('../lib/foreword.js')



test('Using Async/Await to get game info with 3 ids', async () => {
  // Root, Scythe, Wingspan
  const gameids = ["TAAifFP590", "yqR4PtpO8X", "5H5JS0KLzK"]
  let gamesInfo = await getGamesInfo(gameids)
  const result = [
    new Game("TAAifFP590", "Root", "https://www.boardgameatlas.com/game/TAAifFP590/root"),
    new Game("yqR4PtpO8X", "Scythe", "https://www.boardgameatlas.com/game/yqR4PtpO8X/scythe"),
    new Game("5H5JS0KLzK", "Wingspan", "https://www.boardgameatlas.com/game/5H5JS0KLzK/wingspan")
  ]
  expect(gamesInfo).toEqual(result)
}
)

test('Using Async/Await to get game info with 0 ids', async () => {
  // Root, Scythe, Wingspan
  const gameids = []
  let gamesInfo = await getGamesInfo(gameids)
  const result = []
  expect(gamesInfo).toEqual(result)
}
)

test('Using Promises to get game info with 3 ids', () => {
  const gameids = ["TAAifFP590", "yqR4PtpO8X", "5H5JS0KLzK"]
  const result = [
    new Game("TAAifFP590", "Root", "https://www.boardgameatlas.com/game/TAAifFP590/root"),
    new Game("yqR4PtpO8X", "Scythe", "https://www.boardgameatlas.com/game/yqR4PtpO8X/scythe"),
    new Game("5H5JS0KLzK", "Wingspan", "https://www.boardgameatlas.com/game/5H5JS0KLzK/wingspan")
  ]
  const promise = getGamesInfoPromise([gameids])
  return promise.then(value => expect(value).toEqual(result))
}
)

test('Using Promises to get game info with 0 ids', () => {
  const gameids = []
  const result = []
  const promise = getGamesInfoPromise(gameids)
  return promise.catch(value => expect(value).toEqual(result))
}
)

test('Testing responseToGameArray with empty object argument.', () => {
  expect(responseToGameArray({})).toEqual([])
})


test('Testing responseToGameArray with object with empty games property.', () => {
  expect(responseToGameArray({"games": []})).toEqual([])
})
