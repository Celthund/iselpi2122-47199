function inspect(obj){
    for (let p in obj)
        console.log(p + "=" + obj[p] + ";")
}
inspect("a")
inspect({
    "a": 2
})
