const fetch = require('node-fetch')
const fsPromises = require('fs').promises

module.exports = {
    'fetchGameInfoAsync': fetchGameInfoAsync,
    'fetchGameInfoPromise': fetchGameInfoPromise,
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
    let ids = ""
    if (typeof gameids == 'string')
        ids = gameids
    else
        ids = gameids.reduce((prev, curr) => prev + "," + curr)
    const url = "https://api.boardgameatlas.com/api/search?client_id=" + process.env.ATLAS_CLIENT_ID + "&ids="
    return url + ids
}

function objectArrayToGameArray(data) {
    if (!data["games"]) return {}
    const result = data["games"].map((value) => new Game(value["id"], value["name"], value["url"]))
    if (result.length == 1)
       return result[0]
    return result 
}

async function fetchGameInfoAsync(gameids) {
    if (gameids.length == 0) return []
    const response = await fetch(getUrl(gameids))
    const data = await response.json()
    return objectArrayToGameArray(data)
}

async function gamesInfoFromIdsFileAsync(filename_origin, filename_destination) {
    try {
        const data = await fsPromises.readFile(filename_origin, { "encoding": "utf-8" })
        const games = await Promise.all(
            data.split(/\r?\n/).map(async ele => await fetchGameInfoAsync(ele)
        ))
        await fsPromises.writeFile(filename_destination, JSON.stringify(games))
        return true
    } catch {
        return false
    }
}

function fetchGameInfoPromise(gameids) {
    if (gameids.length == 0) return new Promise((resolve) => resolve([]))
    return fetch(getUrl(gameids))
        .then(response => response.json())
        .then(json => objectArrayToGameArray(json))
}

function gamesInfoFromIdsFilePromise(filename_origin, filename_destination) {
    return fsPromises.readFile(filename_origin, { "encoding": "utf-8" }).then(
        (data) => {
            return Promise.all(data.split(/\r?\n/).map(ele => fetchGameInfoPromise(ele)))
        })
        .then(
            (games) => fsPromises.writeFile(filename_destination, JSON.stringify(games)))
        .then(() => true)
        .catch(() => false)
}