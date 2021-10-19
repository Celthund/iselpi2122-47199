'use strict'

const { expect } = require('@jest/globals')
const { getGamesInfo, getGamesInfoPromise, Game } = require('../lib/foreword.js')



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
  expect(promise).resolves.toEqual(result)
}
)

test('Using Promises to get game info with 0 ids', () => {
  const gameids = []
  const result = []
  const promise = getGamesInfoPromise([gameids])
  expect(promise).resolves.toEqual(result)
}
)




