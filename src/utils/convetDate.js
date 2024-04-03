export const useConvertDate = () => {

    const general = (date) => {
        const split = date.split("T")[0].split("-")
        return `${split[0]}-${split[1]}-${split[2]}` // YYYY-MM-DD
    }

    const yearCatch = (date) => {
        const split = date.split("-")
        return parseInt(split[0])
    }

    const age = (date) => {
        const dateConv = general(date)
        const year = yearCatch(dateConv)
        const today = new Date();
        return today.getFullYear() - year
    }

    return {
        general,
        yearCatch,
        age
    }
}