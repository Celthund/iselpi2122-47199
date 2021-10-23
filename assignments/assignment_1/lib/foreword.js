const fetch = require('node-fetch')
const fsPromises = require('fs').promises

module.exports = {
    'getGamesInfo': fetchGameInfoAsync,
    'getGamesInfoPromise': fetchGameInfoPromise,
    'Game': Game,
    'responseToGameArray': objectArrayToGameArray,
    'gamesInfoFromIdsFileAsync': gamesInfoFromIdsFileAsync,
    'gamesInfoFromIdsFilePromise': gamesInfoFromIdsFilePromise
}

function Game(id, name, url) {
    this.id = id
    this.name = name
    this.url = url
}

function getUrl(gameids) {
    const ids = gameids.reduce((prev, curr) => prev + "," + curr)
    const url = "https://api.boardgameatlas.com/api/search?client_id=iLW2r2Ar8g&ids="
    return url + ids
}

function objectArrayToGameArray(data) {
    if (!data["games"]) return []
    return data["games"].map((value) => new Game(value["id"], value["name"], value["url"]))
}

async function fetchGameInfoAsync(gameids) {
    if (gameids.length == 0) return []
    const response = await fetch(getUrl(gameids))
    const data = await response.json()
    return objectArrayToGameArray(data)
}

function fetchGameInfoPromise(gameids) {
    if (gameids.length == 0) return new Promise((resolve) => resolve([]))
    return fetch(getUrl(gameids))
        .then(response => response.json())
        .then(json => objectArrayToGameArray(json))
}

async function gamesInfoFromIdsFileAsync(filename_origin, filename_destination) {
    try {
        const data = await fsPromises.readFile(filename_origin, {"encoding": "utf-8"})
        const gameids = data.split(/\r?\n/)
        const games = await fetchGameInfoAsync(gameids)
        await fsPromises.writeFile(filename_destination, JSON.stringify(games))
        return true
    } catch {
        return false
    }
}

function gamesInfoFromIdsFilePromise(filename_origin, filename_destination) {
    return fsPromises.readFile(filename_origin, {"encoding": "utf-8"}).then(
        (data) => {
            const gameids = data.split(/\r?\n/)
            return fetchGameInfoPromise(gameids)
        })
        .then(
            (games) => {
                return fsPromises.writeFile(filename_destination, JSON.stringify(games))
        })
        .then(_ => true)
        .catch(_ => false)
}