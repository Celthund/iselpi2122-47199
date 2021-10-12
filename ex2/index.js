function looping_triangle(number_of_lines){
    const triangle = "#"
    for (let number_of_times = 1; number_of_times <= number_of_lines; number_of_times++) {
        console.log(triangle.repeat(number_of_times))
    }
}
looping_triangle(7)

function fizz_buzz(max_number){
    let string = ""
    for (let number = 1; number <= max_number; number++) {
        if (number % 3 == 0)
            string += "Fizz"
        if (number % 5 == 0)
            string += "Buzz"
        if (string.length == 0)
            string = number
        console.log(string)
        string = ""
    }
}
fizz_buzz(100)

function create_chessboard(size){
    let string = ""
    for (let i = 0; i <= size; i++) {
        for (let j = 0; j <= size; j++) {
            string += (i + j) % 2 == 0  ? " " : "#"
        }
        string += "\n"
    }
    console.log(string)
}
create_chessboard(8)

