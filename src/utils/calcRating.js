const calcRating = (value) => {

    let result = 0
    let arr = []

    if (value) {
        value.forEach(element => {
            arr.push(element.rating)
        })

        result = arr.reduce((accumulator, currentValue) => accumulator + currentValue, 0) / arr.length
    }

    return result.toFixed(2)
}

export default calcRating
