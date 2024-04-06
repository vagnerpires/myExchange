export const useConvertDate = () => {

    // convert date to general format
    const general = (date) => {
        const split = date.split("T")[0].split("-")
        return `${split[2]}-${split[1]}-${split[0]}` 
    }

    // catch year from date
    const yearCatch = (date) => {
        const split = date.split("-")
        return parseInt(split[0])
    }

    // calculate age from birthdate
    const age = (birthdate) => {
        const today = new Date();
        const birthDate = new Date(birthdate);
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }

    return {
        general,
        yearCatch,
        age
    }
}