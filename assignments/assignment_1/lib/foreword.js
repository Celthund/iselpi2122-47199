const fetch = require('node-fetch');

module.exports = {
    'getGamesInfo': getGamesInfo,
    'getGamesInfoPromise': getGamesInfoPromise,
    'Game': Game
}


function getUrl(gameids) {
    const ids = gameids.reduce((prev, curr) => prev + "," + curr)
    const url = "https://api.boardgameatlas.com/api/search?order_by=rank&ascending=false&client_id=iLW2r2Ar8g&ids="
    return url + ids
}

function Game(id, name, url) {
    this.id = id
    this.name = name
    this.url = url
}

function responseToGameArray(data) {
    if (!data["games"]) return []
    return data["games"].map((value) => new Game(value["id"], value["name"], value["url"]))
}

/**
 *
 * @param {Array} gameids
 */
async function getGamesInfo(gameids) {
    if (gameids.length == 0) return []
    const response = await fetch(getUrl(gameids))
    const data = await response.json()
    return responseToGameArray(data)
}



function getGamesInfoPromise(gameids) {
    return new Promise((resolved, reject) => {
        if (gameids.length == 0)
            reject([])
        else
            return fetch(getUrl(gameids)).then(response => response.json())
                .then(json => resolved(responseToGameArray(json)))
    })

}