const setFlag = (data) => {

    let result = ""

    countries.map((country) => {
        if (country.name === data.name) {
            result = country.flag
        }
    })

    return result
}